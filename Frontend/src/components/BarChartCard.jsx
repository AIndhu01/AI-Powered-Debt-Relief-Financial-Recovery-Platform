import {
  ResponsiveContainer,
  BarChart,
  XAxis,
  YAxis,
  Tooltip,
  Legend,
  Bar
} from "recharts";

function BarChartCard({ data }) {
  return (
    <div className="bg-white rounded-xl shadow-md p-6">
      <h2 className="text-xl font-bold mb-4">
        Income vs EMI
      </h2>

      <ResponsiveContainer width="100%" height={300}>
        <BarChart data={data}>
          <XAxis dataKey="name" />
          <YAxis />
          <Tooltip />
          <Legend />

          <Bar
            dataKey="income"
            fill="#4F46E5"
          />

          <Bar
            dataKey="emi"
            fill="#EF4444"
          />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
}

export default BarChartCard;