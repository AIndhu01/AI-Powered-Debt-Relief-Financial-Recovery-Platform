import joblib
import pandas as pd

# Load the trained AI model
model = joblib.load("loan_model.pkl")


def predict(data):
    # Convert input data into a DataFrame
    df = pd.DataFrame([{
        "loan_amount": data.loan_amount,
        "monthly_income": data.monthly_income,
        "emi": data.emi,
        "overdue_months": data.overdue_months
    }])

    # Get prediction from the model
    prediction = model.predict(df)[0]

    # Generate recommendation based on prediction
    if prediction == "High":
        recommendation = "Eligible for debt restructuring. Contact a financial advisor immediately."

    elif prediction == "Medium":
        recommendation = "Reduce EMI burden and avoid further overdue payments."

    else:
        recommendation = "Financial condition is healthy. Continue regular payments."

    # Return both prediction and recommendation
    return {
        "risk": prediction,
        "recommendation": recommendation
    }