import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom"
import { toast } from "react-toastify";
import api from "../services/api";


function LoanHistory() {
  const [loans, setLoans] = useState([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    fetchLoans();
  }, []);

  const fetchLoans = async () => {
    try {
      const response = await api.get("/loans");
      setLoans(response.data);
    } catch (error) {
      console.error("Error loading loans:", error);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return <div className="p-8">Loading loans...</div>;
  }
  const deleteLoan = async (id) => {
  const confirmDelete = window.confirm(
    "Are you sure you want to delete this loan?"
  );

  if (!confirmDelete) return;

  try {
    await api.delete(`/loan/${id}`);

    setLoans(loans.filter((loan) => loan.id !== id));

    toast.success("Loan deleted successfully!");
  } catch (err) {
    console.error(err);
   toast.error("Delete failed.");
  }
};
const filteredLoans = loans.filter((loan) =>
  loan.borrower_name.toLowerCase().includes(search.toLowerCase())
);

  return (
    <div className="p-8 min-h-screen bg-gray-100">

      <h1 className="text-3xl font-bold mb-6">
        Loan History
      </h1>
      <div className="mb-6">
  <input
    type="text"
    placeholder="🔍 Search borrower..."
    value={search}
    onChange={(e) => setSearch(e.target.value)}
    className="w-full border rounded-lg p-3"
  />
</div>

      {loans.length === 0 ? (
        <div className="bg-white rounded-lg shadow p-6">
          No loans found.
        </div>
      ) : (
        <div className="bg-white rounded-lg shadow overflow-x-auto">

          <table className="min-w-full">

            <thead className="bg-indigo-600 text-white">
              <tr>
                <th className="p-3 text-left">Borrower</th>
                <th className="p-3 text-left">Loan Amount</th>
                <th className="p-3 text-left">Monthly Income</th>
                <th className="p-3 text-left">EMI</th>
                <th className="p-3 text-left">Overdue Months</th>
                <th className="p-3 text-center">Actions</th>
              </tr>
            </thead>

            <tbody>

              {filteredLoans.map((loan) => (

                <tr
                  key={loan.id}
                  className="border-b hover:bg-gray-50"
                >
                  <td className="p-3">{loan.borrower_name}</td>
                  <td className="p-3">₹{loan.loan_amount}</td>
                  <td className="p-3">₹{loan.monthly_income}</td>
                  <td className="p-3">₹{loan.emi}</td>
                  <td className="p-3">{loan.overdue_months}</td>
                  <td className="p-3 text-center">

 <button
  className="bg-blue-500 text-white px-3 py-1 rounded mr-2 hover:bg-blue-600"
  onClick={() => navigate(`/loan/edit/${loan.id}`)}
>
  Edit
</button>

  <button
    className="bg-red-500 text-white px-3 py-1 rounded hover:bg-red-600"
    onClick={() => deleteLoan(loan.id)}
  >
    Delete
  </button>

</td>
                </tr>

              ))}

            </tbody>

          </table>

        </div>
      )}

    </div>
  );
}

export default LoanHistory;