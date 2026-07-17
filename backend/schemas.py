from pydantic import BaseModel, EmailStr
from typing import Optional


# =====================================================
# USER SCHEMAS
# =====================================================

class UserRegister(BaseModel):
    username: str
    email: EmailStr
    password: str


class UserLogin(BaseModel):
    email: EmailStr
    password: str


class UserResponse(BaseModel):
    id: int
    username: str
    email: EmailStr
    total_loans: int
    total_debt: float

    class Config:
        from_attributes = True


# =====================================================
# JWT TOKEN
# =====================================================

class Token(BaseModel):
    access_token: str
    token_type: str


# =====================================================
# LOAN SCHEMAS
# =====================================================

class LoanCreate(BaseModel):
    borrower_name: str
    loan_amount: float
    monthly_income: float
    emi: float
    overdue_months: int


class LoanUpdate(BaseModel):
    borrower_name: str
    loan_amount: float
    monthly_income: float
    emi: float
    overdue_months: int


class LoanResponse(BaseModel):
    id: int
    borrower_name: str
    loan_amount: float
    monthly_income: float
    emi: float
    overdue_months: int
    user_id: int

    class Config:
        from_attributes = True


# =====================================================
# AI PREDICTION RESPONSE
# =====================================================

class PredictionResponse(BaseModel):
    risk: str
    recommendation: str


# =====================================================
# DASHBOARD RESPONSE
# =====================================================

class DashboardResponse(BaseModel):
    total_loans: int
    total_debt: float
    total_monthly_income: float
    total_monthly_emi: float
    monthly_surplus: float
    emi_ratio: float
    debt_stress: str
    financial_health_score: int


# =====================================================
# SETTLEMENT RESPONSE
# =====================================================

class SettlementResponse(BaseModel):
    loan_id: int
    borrower_name: str
    loan_amount: float
    monthly_income: float
    emi: float
    overdue_months: int
    financial_health: Optional[str]
    debt_stress: Optional[str]
    settlement_recommendation: Optional[str]
    negotiation_strategy: Optional[str]
    estimated_settlement_percentage: Optional[str]