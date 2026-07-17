from sqlalchemy import Column, Integer, String, Float, ForeignKey
from sqlalchemy.orm import relationship

from database import Base


# =====================================================
# USER TABLE
# =====================================================

class User(Base):
    __tablename__ = "users"

    id = Column(Integer, primary_key=True, index=True)

    username = Column(
        String,
        unique=True,
        nullable=False,
        index=True
    )

    email = Column(
        String,
        unique=True,
        nullable=False,
        index=True
    )

    hashed_password = Column(
        String,
        nullable=False
    )

    # Relationship: One user can have many loans
    loans = relationship(
        "Loan",
        back_populates="user",
        cascade="all, delete-orphan"
    )


# =====================================================
# LOAN TABLE
# =====================================================

class Loan(Base):
    __tablename__ = "loans"

    id = Column(Integer, primary_key=True, index=True)

    borrower_name = Column(
        String,
        nullable=False,
        index=True
    )

    loan_amount = Column(
        Float,
        nullable=False
    )

    monthly_income = Column(
        Float,
        nullable=False
    )

    emi = Column(
        Float,
        nullable=False
    )

    overdue_months = Column(
        Integer,
        nullable=False
    )

    # Foreign Key -> User
    user_id = Column(
        Integer,
        ForeignKey("users.id"),
        nullable=False
    )

    # Relationship back to User
    user = relationship(
        "User",
        back_populates="loans"
    )