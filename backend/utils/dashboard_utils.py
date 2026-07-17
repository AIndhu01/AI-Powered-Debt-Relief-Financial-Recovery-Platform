def calculate_user_stats(loans):

    total_loans = len(loans)

    total_debt = sum(
        loan.loan_amount for loan in loans
    )

    total_monthly_income = sum(
        loan.monthly_income for loan in loans
    )

    total_monthly_emi = sum(
        loan.emi for loan in loans
    )

    monthly_surplus = (
        total_monthly_income -
        total_monthly_emi
    )

    if total_monthly_income > 0:
        emi_ratio = (
            total_monthly_emi /
            total_monthly_income
        ) * 100
    else:
        emi_ratio = 0

    if emi_ratio < 30:
        debt_stress = "Low"
        financial_health_score = 90

    elif emi_ratio < 50:
        debt_stress = "Medium"
        financial_health_score = 70

    else:
        debt_stress = "High"
        financial_health_score = 40

    return {
        "total_loans": total_loans,
        "total_debt": total_debt,
        "total_monthly_income": total_monthly_income,
        "total_monthly_emi": total_monthly_emi,
        "monthly_surplus": monthly_surplus,
        "emi_ratio": round(emi_ratio, 2),
        "debt_stress": debt_stress,
        "financial_health_score": financial_health_score
    }