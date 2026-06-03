import { createContext, useContext, useState } from "react";

const AuthContext = createContext(null);

export function AuthProvider({ children }) {
  const [user, setUser] = useState(() => {
    try {
      const stored = localStorage.getItem("zoo_user");
      return stored ? JSON.parse(stored) : null;
    } catch {
      return null;
    }
  });

  function login(userData, token) {
    localStorage.setItem("zoo_token", token);
    localStorage.setItem("zoo_user", JSON.stringify(userData));
    setUser(userData);
  }

  function logout() {
    localStorage.removeItem("zoo_token");
    localStorage.removeItem("zoo_user");
    setUser(null);
  }

  return (
    <AuthContext.Provider value={{ user, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  return useContext(AuthContext);
}

export function getToken() {
  return localStorage.getItem("zoo_token");
}
