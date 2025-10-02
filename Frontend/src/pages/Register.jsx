import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../Context/AuthContext";

export default function Register() {
  const { register } = useAuth();
  const navigate = useNavigate();
  const [form, setForm] = useState({
    name: "",
    email: "",
    password: "",
    role: "citizen"
  });
  const [error, setError] = useState("");
  const [success, setSuccess] = useState(false);

  function handleChange(e) {
    setForm({ ...form, [e.target.name]: e.target.value });
  }

  function handleSubmit(e) {
    e.preventDefault();
    const ok = register(form.name, form.email, form.password, form.role);
    if (ok) {
      setSuccess(true);
      setTimeout(() => navigate("/login"), 1200);
    } else {
      setError("Email already registered");
    }
  }

  return (
    <div className="max-w-md mx-auto mt-16 p-8 bg-white/90 rounded-xl shadow">
      <h2 className="text-xl font-bold mb-6 text-purple-700 text-center">Register</h2>
      {success && <div className="mb-4 text-green-600">Registration successful! Redirecting...</div>}
      {error && <div className="mb-4 text-red-600">{error}</div>}
      <form onSubmit={handleSubmit} className="flex flex-col gap-4">
        <input
          name="name"
          value={form.name}
          onChange={handleChange}
          placeholder="Your Name"
          required
          className="border px-3 py-2 rounded"
        />
        <input
          name="email"
          type="email"
          value={form.email}
          onChange={handleChange}
          placeholder="Eg: user@grievx.com"
          required
          className="border px-3 py-2 rounded"
        />
        <input
          name="password"
          type="password"
          value={form.password}
          onChange={handleChange}
          placeholder="Choose a password"
          required
          className="border px-3 py-2 rounded"
        />
        <select
          name="role"
          value={form.role}
          onChange={handleChange}
          className="border px-3 py-2 rounded"
        >
          <option value="citizen">Citizen</option>
          <option value="admin">Admin</option>
        </select>
        <button
          type="submit"
          className="bg-purple-700 text-white rounded py-2 font-semibold"
        >
          Register
        </button>
      </form>
    </div>
  );
}
