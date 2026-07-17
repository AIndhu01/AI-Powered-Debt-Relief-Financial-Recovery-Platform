import pandas as pd
from sklearn.tree import DecisionTreeClassifier
import joblib

# Sample training data
data = {
    "loan_amount": [100000, 500000, 300000, 800000, 150000],
    "monthly_income": [50000, 30000, 60000, 25000, 70000],
    "emi": [5000, 15000, 7000, 20000, 4000],
    "overdue_months": [0, 6, 1, 10, 0],
    "risk": ["Low", "High", "Low", "High", "Low"]
}

df = pd.DataFrame(data)

X = df[["loan_amount", "monthly_income", "emi", "overdue_months"]]
y = df["risk"]

model = DecisionTreeClassifier()
model.fit(X, y)

joblib.dump(model, "loan_model.pkl")

print("Model trained successfully!")