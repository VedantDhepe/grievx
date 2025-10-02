import { useState } from "react";
import { FaCheckCircle, FaExclamationCircle, FaClock } from "react-icons/fa";

// Sample complaints data
const initialComplaints = [
  {
    id: "C101",
    title: "Major pothole on 1st Street",
    department: "Roads",
    createdAt: Date.now() - 8 * 24 * 60 * 60 * 1000, // 8 days ago
    status: "Pending"
  },
  {
    id: "C102",
    title: "Water supply issue at Block C",
    department: "Water",
    createdAt: Date.now() - 3 * 24 * 60 * 60 * 1000, // 3 days ago
    status: "Resolved"
  },
  {
    id: "C103",
    title: "Street light malfunction",
    department: "Electricity",
    createdAt: Date.now() - 12 * 24 * 60 * 60 * 1000, // 12 days ago
    status: "Pending"
  },
  {
    id: "C104",
    title: "Unsafe crossing near school",
    department: "Public Safety",
    createdAt: Date.now() - 1 * 24 * 60 * 60 * 1000, // 1 day ago
    status: "Pending"
  }
];

const CROSS_LIMIT_DAYS = 7;

function getDaysAgo(ts) {
  return Math.floor((Date.now() - ts) / (24 * 60 * 60 * 1000));
}

export default function ChiefDashboard() {
  const [complaints, setComplaints] = useState(initialComplaints);

  function handleResolve(id) {
    setComplaints(complaints.map(c =>
      c.id === id ? { ...c, status: "Resolved" } : c
    ));
  }

  // Analytics
  const total = complaints.length;
  const resolved = complaints.filter(c => c.status === "Resolved").length;
  const crossed = complaints.filter(
    c => c.status !== "Resolved" && getDaysAgo(c.createdAt) > CROSS_LIMIT_DAYS
  ).length;

  return (
    <div className="max-w-6xl mx-auto py-10 px-4">
      <h2 className="text-3xl font-bold text-purple-900 mb-8 text-center">Chief Dashboard</h2>

      {/* Analytics */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 mb-10">
        <div className="bg-white/80 rounded-xl shadow-lg flex items-center gap-2 px-6 py-6">
          <FaClock size={32} className="text-blue-600 mr-2" />
          <div>
            <div className="text-2xl font-bold text-gray-900">{total}</div>
            <div className="text-lg text-gray-700 font-semibold">Total Complaints</div>
          </div>
        </div>
        <div className="bg-white/80 rounded-xl shadow-lg flex items-center gap-2 px-6 py-6">
          <FaCheckCircle size={32} className="text-green-600 mr-2" />
          <div>
            <div className="text-2xl font-bold text-gray-900">{resolved}</div>
            <div className="text-lg text-gray-700 font-semibold">Resolved</div>
          </div>
        </div>
        <div className="bg-white/80 rounded-xl shadow-lg flex items-center gap-2 px-6 py-6">
          <FaExclamationCircle size={32} className="text-red-600 mr-2" />
          <div>
            <div className="text-2xl font-bold text-gray-900">{crossed}</div>
            <div className="text-lg text-red-700 font-semibold">Crossed Complaints</div>
            <div className="text-xs text-gray-600">Unresolved {">"} {CROSS_LIMIT_DAYS} days</div>
          </div>
        </div>
      </div>

      {/* Complaint Table */}
      <div className="bg-white/90 rounded-xl shadow-xl p-6 border">
        <h3 className="text-xl font-bold text-purple-900 mb-6">All Complaints</h3>
        <table className="w-full text-center">
          <thead>
            <tr className="bg-purple-100">
              <th className="py-2 px-2 text-gray-800 font-semibold">ID</th>
              <th className="py-2 px-2 text-gray-800 font-semibold">Title</th>
              <th className="py-2 px-2 text-gray-800 font-semibold">Department</th>
              <th className="py-2 px-2 text-gray-800 font-semibold">Days</th>
              <th className="py-2 px-2 text-gray-800 font-semibold">Status</th>
              <th className="py-2 px-2 text-gray-800 font-semibold">Action</th>
            </tr>
          </thead>
          <tbody>
            {complaints.map((c) => {
              const days = getDaysAgo(c.createdAt);
              const crossed = c.status !== "Resolved" && days > CROSS_LIMIT_DAYS;
              return (
                <tr key={c.id} className="border-b hover:bg-purple-50 transition">
                  <td className="py-3 font-bold text-purple-900">{c.id}</td>
                  <td className="py-3">{c.title}</td>
                  <td className="py-3">{c.department}</td>
                  <td className={`py-3 font-bold ${crossed ? "text-red-600" : "text-gray-700"}`}>{days}</td>
                  <td>
                    <span className={`inline-block px-3 py-1 rounded-full text-white text-sm
                      ${c.status === "Resolved"
                        ? "bg-green-500"
                        : crossed
                        ? "bg-red-500"
                        : "bg-yellow-500"}`}>
                      {c.status}
                    </span>
                  </td>
                  <td>
                    {c.status !== "Resolved" && (
                      <button
                        className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg font-medium shadow"
                        onClick={() => handleResolve(c.id)}
                      >
                        Resolve
                      </button>
                    )}
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
}
