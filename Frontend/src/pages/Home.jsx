import { useNavigate } from "react-router-dom";
import { FaUserShield, FaUserAlt, FaRegEye } from "react-icons/fa";

export default function Home() {
  const navigate = useNavigate();

  return (
    <div className="w-full min-h-screen bg-lime-200 flex flex-col items-center justify-center py-12 px-4">
      <div className="max-w-3xl w-full mx-auto text-center">
        <h1 className="text-4xl md:text-5xl font-extrabold text-purple-900 mb-4 drop-shadow-lg">
          Welcome to GrievX
        </h1>
        <p className="text-lg md:text-xl text-gray-800 mb-6 font-medium">
          Your one-stop solution for grievance management and citizen complaints.  
          Empowering transparency for <span className="font-semibold text-purple-700">Admins</span>, <span className="font-semibold text-purple-700">Citizens</span>, and <span className="font-semibold text-purple-700">Supervisors</span>.
        </p>
        <button
          className="bg-purple-700 text-white font-bold px-8 py-3 rounded-full shadow-lg text-lg hover:bg-purple-800 transition"
          onClick={() => navigate("/register")}
        >
          Start Now
        </button>
      </div>

      <div className="max-w-2xl w-full mx-auto mt-12 grid grid-cols-1 sm:grid-cols-3 gap-8">
        {/* Admin card */}
        <div 
          onClick={() => navigate("/dashboard")}
          className="cursor-pointer flex flex-col items-center justify-center text-center bg-white/90 rounded-xl shadow-lg py-8 transition hover:scale-105 hover:bg-white h-56"
        >
          <FaUserShield size={38} className="text-blue-600 mb-3" />
          <div className="text-xl font-bold text-purple-800 mb-1">Admin</div>
          <div className="text-gray-700 text-sm px-2">
            Resolve complaints & manage teams
          </div>
        </div>
        {/* Citizen card */}
        <div 
          onClick={() => navigate("/citizenDashboard")}
          className="cursor-pointer flex flex-col items-center justify-center text-center bg-white/90 rounded-xl shadow-lg py-8 transition hover:scale-105 hover:bg-white h-56"
        >
          <FaUserAlt size={38} className="text-green-600 mb-3" />
          <div className="text-xl font-bold text-purple-800 mb-1">Citizen</div>
          <div className="text-gray-700 text-sm px-2">
            View, create, and track your complaints
          </div>
        </div>
        {/* Chief/Senior card */}
        <div 
          onClick={() => navigate("/chiefDashboard")}
          className="cursor-pointer flex flex-col items-center justify-center text-center bg-white/90 rounded-xl shadow-lg py-8 transition hover:scale-105 hover:bg-white h-56"
        >
          <FaRegEye size={38} className="text-purple-700 mb-3" />
          <div className="text-xl font-bold text-purple-800 mb-1">Chief</div>
          <div className="text-gray-700 text-sm px-2">
            Monitor analytics & overdue complaints
          </div>
        </div>
      </div>
    </div>
  );
}
