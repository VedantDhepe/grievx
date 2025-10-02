import { useNavigate } from "react-router-dom";
import { FaUserShield, FaUserAlt, FaRegEye } from "react-icons/fa";

export default function Home() {
  const navigate = useNavigate();

  return (
    <div className="relative min-h-screen w-full flex flex-col items-center justify-center">
      {/* Video BG */}
      <video
        className="absolute inset-0 w-full h-full object-cover min-h-screen"
        src="/Video.mp4"
        autoPlay
        loop
        muted
        playsInline
      />
      {/* Overlay for readability */}
      <div className="absolute inset-0 w-full h-full bg-black/50 backdrop-blur-sm" />

      {/* Foreground Content */}
      <div className="relative z-20 w-full flex flex-col items-center justify-center min-h-screen px-4">
        <div className="max-w-3xl w-full mx-auto text-center mt-16">
          <h1 className="text-4xl md:text-5xl font-extrabold text-white mb-4 drop-shadow-lg">
            Welcome to GrievX
          </h1>
          <p className="text-lg md:text-xl text-gray-100 mb-6 font-medium">
            Your one-stop solution for grievance management and citizen complaints.&nbsp;
            Empowering transparency for <span className="font-semibold text-lime-300">Admins</span>, <span className="font-semibold text-lime-300">Citizens</span>, and <span className="font-semibold text-lime-300">Supervisors</span>.
          </p>
          <button
            className="bg-purple-700/90 backdrop-blur-lg text-white font-bold px-8 py-3 rounded-full shadow-lg text-lg hover:bg-purple-800 transition"
            onClick={() => navigate("/register")}
          >
            Start Now
          </button>
        </div>

        <div className="max-w-2xl w-full mx-auto mt-12 grid grid-cols-1 sm:grid-cols-3 gap-8">
          {/* Admin Card */}
          <div
            onClick={() => navigate("/dashboard")}
            className="cursor-pointer flex flex-col items-center justify-center text-center bg-white/[.5] backdrop-blur-lg rounded-xl py-8 transition hover:scale-105 h-56 border-2 border-white/30 shadow-lg"
          >
            <FaUserShield size={38} className="text-blue-600 mb-3" />
            <div className="text-xl font-bold text-purple-900 mb-1">Admin</div>
            <div className="text-gray-900 text-sm px-2">
              Resolve complaints & manage teams
            </div>
          </div>
          {/* Citizen Card */}
          <div
            onClick={() => navigate("/citizenDashboard")}
            className="cursor-pointer flex flex-col items-center justify-center text-center bg-white/[.5] backdrop-blur-lg rounded-xl py-8 transition hover:scale-105 h-56 border-2 border-white/30 shadow-lg"
          >
            <FaUserAlt size={38} className="text-green-600 mb-3" />
            <div className="text-xl font-bold text-purple-900 mb-1">Citizen</div>
            <div className="text-gray-900 text-sm px-2">
              View, create, and track your complaints
            </div>
          </div>
          {/* Chief/Senior Card */}
          <div
            onClick={() => navigate("/chiefDashboard")}
            className="cursor-pointer flex flex-col items-center justify-center text-center bg-white/[.5] backdrop-blur-lg rounded-xl py-8 transition hover:scale-105 h-56 border-2 border-white/30 shadow-lg"
          >
            <FaRegEye size={38} className="text-purple-700 mb-3" />
            <div className="text-xl font-bold text-purple-900 mb-1">Chief</div>
            <div className="text-gray-900 text-sm px-2">
              Monitor analytics & overdue complaints
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
