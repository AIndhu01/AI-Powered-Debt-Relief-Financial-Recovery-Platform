from fastapi import FastAPI, Depends, HTTPException, status
from fastapi.middleware.cors import CORSMiddleware
from utils.dashboard_utils import calculate_user_stats
from sqlalchemy.orm import Session

from database import SessionLocal, engine, Base

import models
import schemas

from ai_model import predict
from gemini_ai import generate_settlement

from auth import (
    hash_password,
    verify_password,
    create_access_token,
    get_current_user,
)

# =====================================================
# CREATE DATABASE TABLES
# =====================================================

Base.metadata.create_all(bind=engine)

app = FastAPI(
    title="AI Powered Debt Relief & Financial Recovery Platform",
    version="2.0.0"
)
app.add_middleware(
    CORSMiddleware,
    allow_origins=[
        "http://localhost:5173",
    ],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)
# =====================================================
# DATABASE DEPENDENCY
# =====================================================

def get_db():
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()

# =====================================================
# HOME
# =====================================================

@app.get("/")
def home():
    return {
        "message": "Welcome to AI Powered Debt Relief & Financial Recovery Platform"
    }

# =====================================================
# REGISTER USER
# =====================================================

@app.post("/register")
def register(
    user: schemas.UserRegister,
    db: Session = Depends(get_db)
):

    existing_user = db.query(models.User).filter(
        models.User.email == user.email
    ).first()

    if existing_user:
        raise HTTPException(
            status_code=400,
            detail="Email already registered"
        )

    hashed_password = hash_password(user.password)

    new_user = models.User(
        username=user.username,
        email=user.email,
        hashed_password=hashed_password
    )

    db.add(new_user)
    db.commit()
    db.refresh(new_user)

    return {
        "message": "User registered successfully"
    }

# =====================================================
# LOGIN USER
# =====================================================

@app.post("/login", response_model=schemas.Token)
def login(
    user: schemas.UserLogin,
    db: Session = Depends(get_db)
):

    existing_user = db.query(models.User).filter(
        models.User.email == user.email
    ).first()

    if existing_user is None:
        raise HTTPException(
            status_code=401,
            detail="Invalid email or password"
        )

    if not verify_password(
        user.password,
        existing_user.hashed_password
    ):
        raise HTTPException(
            status_code=401,
            detail="Invalid email or password"
        )

    access_token = create_access_token(
        data={
            "sub": existing_user.email,
            "id": existing_user.id,
            "username": existing_user.username
        }
    )

    return {
        "access_token": access_token,
        "token_type": "bearer"
    }

# =====================================================
# USER PROFILE
# =====================================================

@app.get(
    "/profile",
    response_model=schemas.UserResponse
)
def profile(
    current_user=Depends(get_current_user),
    db: Session = Depends(get_db)
):

    user = db.query(models.User).filter(
        models.User.id == current_user["id"]
    ).first()

    if user is None:
        raise HTTPException(
            status_code=404,
            detail="User not found"
        )

    loans = db.query(models.Loan).filter(
        models.Loan.user_id == user.id
    ).all()

    stats = calculate_user_stats(loans)

    return {
        "id": user.id,
        "username": user.username,
        "email": user.email,
        "total_loans": stats["total_loans"],
        "total_debt": stats["total_debt"]
    }
# =====================================================
# CREATE LOAN
# =====================================================

@app.post("/loan")
def create_loan(
    loan: schemas.LoanCreate,
    current_user=Depends(get_current_user),
    db: Session = Depends(get_db)
):

    prediction = predict(loan)

    new_loan = models.Loan(
        borrower_name=loan.borrower_name,
        loan_amount=loan.loan_amount,
        monthly_income=loan.monthly_income,
        emi=loan.emi,
        overdue_months=loan.overdue_months,
        user_id=current_user["id"]
    )

    db.add(new_loan)
    db.commit()
    db.refresh(new_loan)

    return {
        "id": new_loan.id,
        "borrower_name": new_loan.borrower_name,
        "loan_amount": new_loan.loan_amount,
        "monthly_income": new_loan.monthly_income,
        "emi": new_loan.emi,
        "overdue_months": new_loan.overdue_months,
        "risk": prediction["risk"],
        "recommendation": prediction["recommendation"]
    }
# =====================================================
# GET MY LOANS
# =====================================================

@app.get("/loans")
def get_loans(
    current_user=Depends(get_current_user),
    db: Session = Depends(get_db)
):

    loans = db.query(models.Loan).filter(
        models.Loan.user_id == current_user["id"]
    ).all()

    return loans
# =====================================================
# GET LOAN BY ID
# =====================================================

@app.get("/loan/{loan_id}")
def get_loan(
    loan_id: int,
    current_user=Depends(get_current_user),
    db: Session = Depends(get_db)
):

    loan = db.query(models.Loan).filter(
        models.Loan.id == loan_id,
        models.Loan.user_id == current_user["id"]
    ).first()

    if loan is None:
        raise HTTPException(
            status_code=404,
            detail="Loan not found"
        )

    return loan
# =====================================================
# UPDATE LOAN
# =====================================================

@app.put("/loan/{loan_id}")
def update_loan(
    loan_id: int,
    loan: schemas.LoanUpdate,
    current_user=Depends(get_current_user),
    db: Session = Depends(get_db)
):

    existing = db.query(models.Loan).filter(
        models.Loan.id == loan_id,
        models.Loan.user_id == current_user["id"]
    ).first()

    if existing is None:
        raise HTTPException(
            status_code=404,
            detail="Loan not found"
        )

    existing.borrower_name = loan.borrower_name
    existing.loan_amount = loan.loan_amount
    existing.monthly_income = loan.monthly_income
    existing.emi = loan.emi
    existing.overdue_months = loan.overdue_months

    db.commit()
    db.refresh(existing)

    prediction = predict(loan)

    return {
        "message": "Loan updated successfully",
        "loan": {
            "id": existing.id,
            "borrower_name": existing.borrower_name,
            "loan_amount": existing.loan_amount,
            "monthly_income": existing.monthly_income,
            "emi": existing.emi,
            "overdue_months": existing.overdue_months,
            "risk": prediction["risk"],
            "recommendation": prediction["recommendation"]
        }
    }
# =====================================================
# DELETE LOAN
# =====================================================

@app.delete("/loan/{loan_id}")
def delete_loan(
    loan_id: int,
    current_user=Depends(get_current_user),
    db: Session = Depends(get_db)
):

    loan = db.query(models.Loan).filter(
        models.Loan.id == loan_id,
        models.Loan.user_id == current_user["id"]
    ).first()

    if loan is None:
        raise HTTPException(
            status_code=404,
            detail="Loan not found"
        )

    db.delete(loan)
    db.commit()

    return {
        "message": "Loan deleted successfully"
    }
# =====================================================
# DASHBOARD
# =====================================================

@app.get(
    "/dashboard",
    response_model=schemas.DashboardResponse
)
def dashboard(
    current_user=Depends(get_current_user),
    db: Session = Depends(get_db)
):

    loans = db.query(models.Loan).filter(
        models.Loan.user_id == current_user["id"]
    ).all()

    stats = calculate_user_stats(loans)

    return stats

    loans = db.query(models.Loan).filter(
        models.Loan.user_id == current_user["id"]
    ).all()

    if not loans:
        return {
            "total_loans": 0,
            "total_debt": 0,
            "total_monthly_income": 0,
            "total_monthly_emi": 0,
            "monthly_surplus": 0,
            "emi_ratio": 0,
            "debt_stress": "No Data",
            "financial_health_score": 100
        }

    total_loans = len(loans)

    total_debt = sum(loan.loan_amount for loan in loans)

    total_income = sum(loan.monthly_income for loan in loans)

    total_emi = sum(loan.emi for loan in loans)

    monthly_surplus = total_income - total_emi

    emi_ratio = (
        (total_emi / total_income) * 100
        if total_income > 0 else 0
    )

    if emi_ratio < 30:
        debt_stress = "Low"
    elif emi_ratio < 50:
        debt_stress = "Medium"
    else:
        debt_stress = "High"

    financial_health_score = max(
        0,
        min(100, round(100 - emi_ratio))
    )

    return {
        "total_loans": total_loans,
        "total_debt": round(total_debt, 2),
        "total_monthly_income": round(total_income, 2),
        "total_monthly_emi": round(total_emi, 2),
        "monthly_surplus": round(monthly_surplus, 2),
        "emi_ratio": round(emi_ratio, 2),
        "debt_stress": debt_stress,
        "financial_health_score": financial_health_score
    }
# =====================================================
# MY PROFILE
# =====================================================

@app.get("/profile")
def get_profile(
    current_user=Depends(get_current_user),
    db: Session = Depends(get_db)
):

    user = db.query(models.User).filter(
        models.User.id == current_user["id"]
    ).first()

    loans = db.query(models.Loan).filter(
        models.Loan.user_id == current_user["id"]
    ).all()

    total_loans = len(loans)
    total_debt = sum(loan.loan_amount for loan in loans)

    return {
        "username": user.username,
        "email": user.email,
        "total_loans": total_loans,
        "total_debt": total_debt
    }
# =====================================================
# AI SETTLEMENT REPORT
# =====================================================

@app.post("/settlement/{loan_id}")
def settlement(
    loan_id: int,
    current_user=Depends(get_current_user),
    db: Session = Depends(get_db)
):

    loan = db.query(models.Loan).filter(
        models.Loan.id == loan_id,
        models.Loan.user_id == current_user["id"]
    ).first()

    if loan is None:
        raise HTTPException(
            status_code=404,
            detail="Loan not found"
        )

    report = generate_settlement(loan)

    return {
        "loan_id": loan.id,
        "borrower_name": loan.borrower_name,
        "loan_amount": loan.loan_amount,
        "monthly_income": loan.monthly_income,
        "emi": loan.emi,
        "overdue_months": loan.overdue_months,
        "financial_health": report.get("financial_health"),
        "debt_stress": report.get("debt_stress"),
        "settlement_recommendation": report.get("settlement_recommendation"),
        "negotiation_strategy": report.get("negotiation_strategy"),
        "estimated_settlement_percentage": report.get("estimated_settlement_percentage")
    }
