import { useEffect, useState } from "react";
import jsPDF from "jspdf";
import api from "../services/api";

function Settlement() {
  const [loans, setLoans] = useState([]);
  const [selectedLoan, setSelectedLoan] = useState("");
  const [report, setReport] = useState(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    fetchLoans();
  }, []);

  const fetchLoans = async () => {
    try {
      const response = await api.get("/loans");
      setLoans(response.data);
    } catch (err) {
      console.error(err);
    }
  };

  const generateReport = async () => {
    if (!selectedLoan) {
      alert("Please select a loan.");
      return;
    }

    setLoading(true);

    try {
      const response = await api.post(`/settlement/${selectedLoan}`);
      setReport(response.data);
    } catch (err) {
      console.error(err);
      alert("Failed to generate settlement report.");
    } finally {
      setLoading(false);
    }
  };
  const downloadPDF = () => {
  const doc = new jsPDF();

  const pageWidth = doc.internal.pageSize.getWidth();
  const pageHeight = doc.internal.pageSize.getHeight();

  let y = 20;

  // Check if a new page is needed
  const checkPage = (space = 20) => {
    if (y + space > pageHeight - 20) {
      doc.addPage();
      y = 20;
    }
  };

  // ---------- Header ----------
  doc.setFont("helvetica", "bold");
  doc.setFontSize(20);
  doc.text("AI Debt Relief Platform", pageWidth / 2, y, {
    align: "center",
  });

  y += 10;

  doc.setFontSize(14);
  doc.text("AI Settlement Report", pageWidth / 2, y, {
    align: "center",
  });

  y += 10;

  doc.setFont("helvetica", "normal");
  doc.setFontSize(11);

  doc.text(
    `Generated on: ${new Date().toLocaleString()}`,
    20,
    y
  );

  y += 15;

  // ---------- Section Function ----------
  const addSection = (title, value) => {
    checkPage(35);

    doc.setFont("helvetica", "bold");
    doc.setFontSize(13);
    doc.text(title, 20, y);

    y += 8;

    doc.setFont("helvetica", "normal");
    doc.setFontSize(11);

    const lines = doc.splitTextToSize(
      String(value ?? "N/A"),
      170
    );

    doc.text(lines, 20, y);

    y += lines.length * 7 + 8;
  };

  // ---------- Report ----------
  addSection("Borrower Name", report.borrower_name);

  addSection("Loan Amount", `₹ ${report.loan_amount}`);

  addSection(
    "Monthly Income",
    `₹ ${report.monthly_income}`
  );

  addSection("Monthly EMI", `₹ ${report.emi}`);

  addSection(
    "Overdue Months",
    report.overdue_months
  );

  addSection(
    "Financial Health",
    report.financial_health
  );

  addSection(
    "Debt Stress",
    report.debt_stress
  );

  addSection(
    "Settlement Recommendation",
    report.settlement_recommendation
  );

  addSection(
    "Negotiation Strategy",
    report.negotiation_strategy
  );

  addSection(
    "Estimated Settlement Percentage",
    report.estimated_settlement_percentage
  );

  // ---------- Footer ----------
  const totalPages = doc.getNumberOfPages();

  for (let i = 1; i <= totalPages; i++) {
    doc.setPage(i);

    doc.setFontSize(10);

    doc.text(
      `Page ${i} of ${totalPages}`,
      pageWidth / 2,
      pageHeight - 10,
      { align: "center" }
    );
  }

  doc.save("AI_Settlement_Report.pdf");
};

  return (
    <div className="p-8 bg-gray-100 min-h-screen">

      <h1 className="text-3xl font-bold mb-6">
        AI Settlement Report
      </h1>

      <div className="bg-white rounded-xl shadow p-6">

        <label className="block font-semibold mb-2">
          Select Loan
        </label>

        <select
          value={selectedLoan}
          onChange={(e) => setSelectedLoan(e.target.value)}
          className="w-full border rounded-lg p-3 mb-4"
        >
          <option value="">Choose a loan</option>

          {loans.map((loan) => (
            <option key={loan.id} value={loan.id}>
              {loan.borrower_name} - ₹{loan.loan_amount}
            </option>
          ))}

        </select>

        <button
          onClick={generateReport}
          className="bg-indigo-600 text-white px-6 py-3 rounded-lg hover:bg-indigo-700"
        >
          {loading ? "Generating..." : "Generate AI Report"}
        </button>

      </div>

      {report && (

        <div className="bg-white rounded-xl shadow p-6 mt-8">

          <h2 className="text-2xl font-bold mb-4">
            AI Settlement Report
          </h2>

          <p><strong>Borrower:</strong> {report.borrower_name}</p>

          <p><strong>Loan Amount:</strong> ₹{report.loan_amount}</p>

          <p><strong>Monthly Income:</strong> ₹{report.monthly_income}</p>

          <p><strong>Monthly EMI:</strong> ₹{report.emi}</p>

          <p><strong>Overdue Months:</strong> {report.overdue_months}</p>

          <hr className="my-4"/>

          <p>
            <strong>Financial Health:</strong><br/>
            {report.financial_health}
          </p>

          <br/>

          <p>
            <strong>Debt Stress:</strong><br/>
            {report.debt_stress}
          </p>

          <br/>

          <p>
            <strong>Settlement Recommendation:</strong><br/>
            {report.settlement_recommendation}
          </p>

          <br/>

          <p>
            <strong>Negotiation Strategy:</strong><br/>
            {report.negotiation_strategy}
          </p>

          <br/>

          <p>
            <strong>Estimated Settlement %:</strong><br/>
            {report.estimated_settlement_percentage}
          </p>
          <button
  onClick={downloadPDF}
  className="mt-6 bg-green-600 hover:bg-green-700 text-white px-6 py-3 rounded-lg"
>
  Download PDF
</button>

        </div>

      )}

    </div>
  );
}

export default Settlement;