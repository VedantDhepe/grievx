import { FaClipboardList, FaCheckCircle, FaHourglassHalf, FaExclamationTriangle } from "react-icons/fa";

// Dummy stats & recent complaints data
const stats = {
  total: 145,
  resolved: 92,
  pending: 38,
  highPriority: 15
};

const recentComplaints = [
  {
    id: "C101",
    title: "Major pothole on 1st Street",
    department: "Roads",
    priority: "High",
    status: "Pending"
  },
  {
    id: "C102",
    title: "Water supply issue at Block C",
    department: "Water",
    priority: "Medium",
    status: "Resolved"
  },
  {
    id: "C103",
    title: "Street light malfunction",
    department: "Electricity",
    priority: "Low",
    status: "Pending"
  },
  {
    id: "C104",
    title: "Unsafe crossing near school",
    department: "Public Safety",
    priority: "High",
    status: "Pending"
  },
  {
    id: "C105",
    title: "Overflowing dustbin at Park",
    department: "Sanitation",
    priority: "Medium",
    status: "Resolved"
  }
];

function StatCard({ icon, value, label, color }) {
  return (
    <div className={`flex flex-col items-center justify-center rounded-xl shadow-lg px-6 py-5 bg-white/80`}>
      <div className={`mb-2 ${color}`}>
        {icon}
      </div>
      <span className="text-3xl font-extrabold text-gray-900">{value}</span>
      <span className="text-lg font-semibold text-gray-700 mt-1">{label}</span>
    </div>
  );
}

export default function AdminDashboard() {
  return (
    <div className="py-10 px-4 max-w-6xl mx-auto">
      <h2 className="text-3xl font-bold text-purple-900 mb-10 text-center">Admin Dashboard</h2>

      {/* Statistic Cards Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-8 mb-12">
        <StatCard
          icon={<FaClipboardList size={40} />}
          value={stats.total}
          label="Total Complaints"
          color="text-blue-600"
        />
        <StatCard
          icon={<FaCheckCircle size={40} />}
          value={stats.resolved}
          label="Resolved"
          color="text-green-500"
        />
        <StatCard
          icon={<FaHourglassHalf size={40} />}
          value={stats.pending}
          label="Pending"
          color="text-yellow-500"
        />
        <StatCard
          icon={<FaExclamationTriangle size={40} />}
          value={stats.highPriority}
          label="High Priority"
          color="text-red-500"
        />
      </div>

      {/* Recent Complaints Table */}
      <div className="bg-white/90 rounded-xl shadow-xl p-6 border">
        <h3 className="text-xl font-bold text-purple-900 mb-6">Recent Complaints</h3>
        <table className="w-full text-center">
          <thead>
            <tr className="bg-purple-100">
              <th className="py-2 px-2 text-gray-800 font-semibold">ID</th>
              <th className="py-2 px-2 text-gray-800 font-semibold">Title</th>
              <th className="py-2 px-2 text-gray-800 font-semibold">Department</th>
              <th className="py-2 px-2 text-gray-800 font-semibold">Priority</th>
              <th className="py-2 px-2 text-gray-800 font-semibold">Status</th>
            </tr>
          </thead>
          <tbody>
            {recentComplaints.map((c) => (
              <tr key={c.id} className="border-b hover:bg-purple-50 transition">
                <td className="py-3 font-bold text-purple-800">{c.id}</td>
                <td className="py-3">{c.title}</td>
                <td className="py-3">{c.department}</td>
                <td className={`py-3 font-semibold ${c.priority === "High" ? "text-red-600" : c.priority === "Medium" ? "text-yellow-600" : "text-green-600"}`}>
                  {c.priority}
                </td>
                <td>
                  <span
                    className={`inline-block px-3 py-1 rounded-full text-white text-sm 
                      ${c.status === "Resolved"
                        ? "bg-green-500"
                        : c.status === "Pending"
                        ? "bg-yellow-500"
                        : "bg-gray-400"
                    }`}
                  >
                    {c.status}
                  </span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
