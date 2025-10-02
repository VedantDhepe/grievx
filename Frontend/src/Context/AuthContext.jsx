import { createContext, useState, useContext } from "react";

// Sample users
const MOCK_USERS = [
  { email: "admin@grievx.com", password: "admin123", role: "admin", name: "Nishant Bayaskar" },
  { email: "citizen@grievx.com", password: "citizen123", role: "citizen", name: "Bhumika Thakare" },
  { email: "chief@grievx.com", password: "chief123", role: "chief", name: "Vedant Dhepe" }, // Senior user
];

// Context & Provider
export const AuthContext = createContext();

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);

  // Login function (checks against MOCK_USERS)
  function login(email, password) {
    const found = MOCK_USERS.find(
      (u) => u.email === email && u.password === password
    );
    if (found) {
      setUser(found);
      return found;
    }
    return null;
  }

  // Register function (adds to MOCK_USERS for demo, not permanent)
  function register(name, email, password, role) {
    const exists = MOCK_USERS.find((u) => u.email === email);
    if (exists) return false;
    const newUser = { name, email, password, role };
    MOCK_USERS.push(newUser); // For demo only, not reset on reload!
    setUser(newUser);
    return true;
  }

  function logout() {
    setUser(null);
  }

  return (
    <AuthContext.Provider value={{ user, setUser, login, register, logout }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  return useContext(AuthContext);
}
