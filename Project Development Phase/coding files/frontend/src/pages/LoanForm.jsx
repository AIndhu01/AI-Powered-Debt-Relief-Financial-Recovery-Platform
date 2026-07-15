import { useState } from "react";
import { toast } from "react-toastify";
import api from "../services/api";

function LoanForm() {
  const [formData, setFormData] = useState({
    borrower_name: "",
    loan_amount: "",
    monthly_income: "",
    emi: "",
    overdue_months: "",
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await api.post("/loan", formData);

      toast.success("Loan added successfully!");

      setFormData({
        borrower_name: "",
        loan_amount: "",
        monthly_income: "",
        emi: "",
        overdue_months: "",
      });

    } catch (err) {
      console.error(err);
      toast.error("Failed to add loan.");
    }
  };

  return (
    <div className="max-w-xl mx-auto mt-10 bg-white p-8 rounded-xl shadow-lg">
      <h2 className="text-3xl font-bold mb-6 text-center">
        Add Loan
      </h2>

      <form onSubmit={handleSubmit} className="space-y-4">

        <input
          name="borrower_name"
          placeholder="Borrower Name"
          value={formData.borrower_name}
          onChange={handleChange}
          className="w-full border rounded-lg p-3"
        />

        <input
          type="number"
          name="loan_amount"
          placeholder="Loan Amount"
          value={formData.loan_amount}
          onChange={handleChange}
          className="w-full border rounded-lg p-3"
        />

        <input
          type="number"
          name="monthly_income"
          placeholder="Monthly Income"
          value={formData.monthly_income}
          onChange={handleChange}
          className="w-full border rounded-lg p-3"
        />

        <input
          type="number"
          name="emi"
          placeholder="Monthly EMI"
          value={formData.emi}
          onChange={handleChange}
          className="w-full border rounded-lg p-3"
        />

        <input
          type="number"
          name="overdue_months"
          placeholder="Overdue Months"
          value={formData.overdue_months}
          onChange={handleChange}
          className="w-full border rounded-lg p-3"
        />

        <button
          type="submit"
          className="w-full bg-indigo-600 text-white py-3 rounded-lg"
        >
          Add Loan
        </button>

      </form>
    </div>
  );
}

export default LoanForm;