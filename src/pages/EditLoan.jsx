import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { toast } from "react-toastify";
import api from "../services/api";

function EditLoan() {
  const { id } = useParams();
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    borrower_name: "",
    loan_amount: "",
    monthly_income: "",
    emi: "",
    overdue_months: "",
  });

  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchLoan();
  }, []);

  const fetchLoan = async () => {
    try {
      const response = await api.get(`/loan/${id}`);

      setFormData({
        borrower_name: response.data.borrower_name,
        loan_amount: response.data.loan_amount,
        monthly_income: response.data.monthly_income,
        emi: response.data.emi,
        overdue_months: response.data.overdue_months,
      });
    } catch (err) {
      console.error(err);
      alert("Failed to load loan.");
    } finally {
      setLoading(false);
    }
  };

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      await api.put(`/loan/${id}`, formData);

      toast.success("Loan updated successfully!");

      navigate("/history");
    } catch (err) {
      console.error(err);
      toast.error("Update failed.");
    }
  };

  if (loading) {
    return <div className="p-8">Loading...</div>;
  }

  return (
    <div className="max-w-xl mx-auto mt-10 bg-white p-8 rounded-xl shadow-lg">
      <h2 className="text-3xl font-bold mb-6 text-center">
        Edit Loan
      </h2>

      <form onSubmit={handleSubmit} className="space-y-4">

        <input
          type="text"
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
          className="w-full bg-green-600 text-white py-3 rounded-lg hover:bg-green-700"
        >
          Update Loan
        </button>

      </form>
    </div>
  );
}

export default EditLoan;
