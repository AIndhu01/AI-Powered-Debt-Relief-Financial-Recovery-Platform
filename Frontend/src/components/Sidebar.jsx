import { NavLink } from "react-router-dom";
import {
  FaChartPie,
  FaMoneyBillWave,
  FaHistory,
  FaRobot,
  FaUser
} from "react-icons/fa";

function Sidebar() {
  const linkClass = ({ isActive }) =>
    `flex items-center gap-3 px-6 py-3 ${
      isActive
        ? "bg-indigo-800"
        : "hover:bg-indigo-600"
    }`;

  return (
    <aside className="w-64 bg-indigo-700 text-white min-h-screen">

      <div className="text-2xl font-bold text-center py-6 border-b border-indigo-500">
        FinRelief AI
      </div>

      <nav className="mt-4">

        <NavLink to="/dashboard" className={linkClass}>
          <FaChartPie />
          Dashboard
        </NavLink>

        <NavLink to="/loan" className={linkClass}>
          <FaMoneyBillWave />
          Add Loan
        </NavLink>

        <NavLink to="/history" className={linkClass}>
          <FaHistory />
          Loan History
        </NavLink>

        <NavLink to="/settlement" className={linkClass}>
          <FaRobot />
          AI Settlement
        </NavLink>

        <NavLink to="/profile" className={linkClass}>
          <FaUser />
          Profile
        </NavLink>

      </nav>

    </aside>
  );
}

export default Sidebar;