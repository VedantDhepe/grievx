import { useState, useRef, useEffect } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import { useAuth } from "../Context/AuthContext";
import { FaUserCircle } from "react-icons/fa";

export default function Navbar() {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const [open, setOpen] = useState(false);
  const ref = useRef();

  useEffect(() => {
    const listener = (e) => {
      if (ref.current && !ref.current.contains(e.target)) setOpen(false);
    };
    document.addEventListener("mousedown", listener);
    return () => document.removeEventListener("mousedown", listener);
  }, []);

  return (
    <nav className="w-full bg-white border-b border-gray-200 sticky top-0 left-0 z-50">
      <div className="max-w-7xl mx-auto flex items-center justify-between py-2 px-4 sm:px-6">
        <div className="text-2xl font-bold text-purple-900 tracking-wide">GrievX</div>
        <div className="sm:flex items-center gap-3">
          {user ? (
            <>
              {user.role === "admin" && (
                <NavLink to="/dashboard" className="mx-2 px-3 py-1 rounded bg-purple-50 text-purple-700 font-medium">Admin</NavLink>
              )}
              {user.role === "citizen" && (
                <NavLink to="/citizenDashboard" className="mx-2 px-3 py-1 rounded bg-purple-50 text-purple-700 font-medium">Citizen</NavLink>
              )}
              {user.role === "chief" && (
                <NavLink to="/chiefDashboard" className="mx-2 px-3 py-1 rounded bg-purple-50 text-purple-700 font-medium">Chief</NavLink>
              )}
              {/* Profile dropdown */}
              <div className="relative ml-4" ref={ref}>
                <button
                  className="flex items-center focus:outline-none"
                  onClick={() => setOpen((v) => !v)}
                  aria-label="Account menu"
                >
                  <FaUserCircle size={34} className="text-purple-700" />
                </button>
                {open && (
                  <div className="absolute right-0 mt-2 w-48 bg-white rounded-xl shadow-xl border border-gray-200 py-3 z-50">
                    <div className="px-4 pb-2 border-b">
                      <div className="font-bold text-purple-900 text-lg">{user.name}</div>
                      <div className="text-gray-700 text-sm capitalize">{user.role}</div>
                    </div>
                    <button
                      className="w-full text-left px-4 py-2 mt-2 bg-red-100 hover:bg-red-200 text-red-700 rounded-lg font-semibold transition"
                      onClick={() => { setOpen(false); logout(); navigate("/login"); }}
                    >
                      Logout
                    </button>
                  </div>
                )}
              </div>
            </>
          ) : (
            <>
              <NavLink to="/login" className="mx-2 px-3 py-2 rounded-lg text-purple-700 font-medium hover:bg-purple-100">Login</NavLink>
              <NavLink to="/register" className="mx-2 px-3 py-2 rounded-lg text-purple-700 font-medium hover:bg-purple-100">Register</NavLink>
            </>
          )}
        </div>
      </div>
    </nav>
  );
}
