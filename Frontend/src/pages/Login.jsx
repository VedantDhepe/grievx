import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../Context/AuthContext";

export default function Login() {
  const { login, user } = useAuth();
  const navigate = useNavigate();
  const [form, setForm] = useState({ email: "", password: "" });
  const [error, setError] = useState("");

  function handleChange(e) {
    setForm({ ...form, [e.target.name]: e.target.value });
  }

  function handleSubmit(e) {
  e.preventDefault();
  const loggedInUser = login(form.email, form.password);
  if (loggedInUser) {
    if (loggedInUser.role === "admin") navigate("/dashboard");
    else if (loggedInUser.role === "citizen") navigate("/citizenDashboard");
    else if (loggedInUser.role === "chief") navigate("/chiefDashboard");
    else navigate("/");
  } else {
    setError("Invalid credentials");
  }
}


  return (
    <div className="max-w-md mx-auto mt-16 p-8 bg-white/90 rounded-xl shadow">
      <h2 className="text-xl font-bold mb-6 text-purple-700 text-center">Login</h2>
      {error && <div className="mb-4 text-red-600">{error}</div>}
      <form onSubmit={handleSubmit} className="flex flex-col gap-4">
        <input
          name="email"
          type="email"
          value={form.email}
          onChange={handleChange}
          placeholder="Eg: admin@grievx.com"
          required
          className="border px-3 py-2 rounded"
        />
        <input
          name="password"
          type="password"
          value={form.password}
          onChange={handleChange}
          placeholder="Enter password"
          required
          className="border px-3 py-2 rounded"
        />
        <button
          type="submit"
          className="bg-purple-700 text-white rounded py-2 font-semibold"
        >
          Login
        </button>
      </form>
    </div>
  );
}
