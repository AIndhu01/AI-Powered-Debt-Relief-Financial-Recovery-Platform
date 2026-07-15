import os
import json
from dotenv import load_dotenv
import google.generativeai as genai

# Load environment variables
load_dotenv()

# Get API Key
api_key = os.getenv("GEMINI_API_KEY")

if not api_key:
    raise ValueError("GEMINI_API_KEY not found in .env file")

# Configure Gemini
genai.configure(api_key=api_key)

# Load Gemini Model
model = genai.GenerativeModel("gemini-3-flash-preview")


def generate_settlement(loan):

    prompt = f"""
You are an expert financial advisor.

Analyze the following borrower information.

Borrower Name: {loan.borrower_name}
Loan Amount: {loan.loan_amount}
Monthly Income: {loan.monthly_income}
EMI: {loan.emi}
Overdue Months: {loan.overdue_months}

Return ONLY a valid JSON object.

Do NOT use markdown.
Do NOT use triple backticks.
Do NOT explain anything.

Return exactly in this format:

{{
  "financial_health": "",
  "debt_stress": "",
  "settlement_recommendation": "",
  "negotiation_strategy": "",
  "estimated_settlement_percentage": ""
}}
"""

    try:
        response = model.generate_content(prompt)

        result = response.text.strip()

        # Remove markdown if Gemini returns it
        if result.startswith("```json"):
            result = result.replace("```json", "").replace("```", "").strip()

        elif result.startswith("```"):
            result = result.replace("```", "").strip()

        return json.loads(result)

    except Exception as e:
        return {
            "financial_health": "Unavailable",
            "debt_stress": "Unavailable",
            "settlement_recommendation": f"Gemini Error: {str(e)}",
            "negotiation_strategy": "Unavailable",
            "estimated_settlement_percentage": "Unavailable"
        }