import { useEffect, useState } from "react";
import api from "../services/api";

import DashboardCard from "../components/DashboardCard";
import PieChartCard from "../components/PieChartCard";
import BarChartCard from "../components/BarChartCard";

function Dashboard() {
  const [dashboard, setDashboard] = useState(null);
  const [loans, setLoans] = useState([]);

  useEffect(() => {
    fetchDashboard();
    fetchLoans();
  }, []);

  const fetchDashboard = async () => {
    try {
      const response = await api.get("/dashboard");
      setDashboard(response.data);
    } catch (err) {
      console.error(err);
    }
  };

  const fetchLoans = async () => {
    try {
      const response = await api.get("/loans");
      setLoans(response.data);
    } catch (err) {
      console.error(err);
    }
  };

  if (!dashboard) {
    return (
      <div className="text-center text-xl mt-10">
        Loading Dashboard...
      </div>
    );
  }

  const pieData = loans.map((loan) => ({
    name: loan.borrower_name,
    value: loan.loan_amount,
  }));

  const barData = loans.map((loan) => ({
    name: loan.borrower_name,
    income: loan.monthly_income,
    emi: loan.emi,
  }));

  return (
    <div className="space-y-8">

      <div>
        <h1 className="text-4xl font-bold text-indigo-700">
          AI Debt Relief Dashboard
        </h1>

        <p className="text-gray-500 mt-2">
          Financial overview of your loans
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">

        <DashboardCard
          title="Total Loans"
          value={dashboard.total_loans}
          color="text-indigo-600"
        />

        <DashboardCard
          title="Total Debt"
          value={`₹${dashboard.total_debt}`}
          color="text-red-600"
        />

        <DashboardCard
          title="Monthly EMI"
          value={`₹${dashboard.total_monthly_emi}`}
          color="text-orange-600"
        />

        <DashboardCard
          title="Health Score"
          value={dashboard.financial_health_score}
          color="text-green-600"
        />

      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">

        <PieChartCard data={pieData} />

        <BarChartCard data={barData} />

      </div>

      <div className="bg-white rounded-xl shadow-md p-6">

        <h2 className="text-2xl font-bold mb-4">
          Recent Loans
        </h2>

        <table className="w-full">

          <thead>

            <tr className="border-b">

              <th className="text-left py-3">Borrower</th>

              <th className="text-left">Amount</th>

              <th className="text-left">EMI</th>

              <th className="text-left">Overdue</th>

            </tr>

          </thead>

          <tbody>

            {loans.map((loan) => (

              <tr
                key={loan.id}
                className="border-b"
              >

                <td className="py-3">
                  {loan.borrower_name}
                </td>

                <td>
                  ₹{loan.loan_amount}
                </td>

                <td>
                  ₹{loan.emi}
                </td>

                <td>
                  {loan.overdue_months} months
                </td>

              </tr>

            ))}

          </tbody>

        </table>

      </div>

    </div>
  );
}

export default Dashboard;