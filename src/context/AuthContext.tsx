import { createContext, useContext, useState, useEffect } from "react";
import type { ReactNode } from "react";

interface User {
  email: string;
  password: string;
}

interface AuthContextType {
  isAuthenticated: boolean;
  login: (email: string, password: string) => boolean;
  signup: (email: string, password: string) => boolean;
  logout: () => void;
  userEmail: string | null;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) throw new Error("useAuth must be used within AuthProvider");
  return context;
};

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [userEmail, setUserEmail] = useState<string | null>(null);

  useEffect(() => {
    const authData = localStorage.getItem("auth");
    if (authData) {
      const parsed = JSON.parse(authData);
      setIsAuthenticated(parsed.isAuthenticated);
      setUserEmail(parsed.userEmail);
    }
  }, []);

  const getUsers = (): User[] => {
    const users = localStorage.getItem("users");
    return users ? JSON.parse(users) : [];
  };

  const signup = (email: string, password: string) => {
    const users = getUsers();
    const exists = users.find((u) => u.email === email);
    if (exists) return false; 

    const newUser = { email, password };
    localStorage.setItem("users", JSON.stringify([...users, newUser]));
    return true;
  };

  // Login function
  const login = (email: string, password: string) => {
    const users = getUsers();
    const user = users.find((u) => u.email === email && u.password === password);
    if (user) {
      setIsAuthenticated(true);
      setUserEmail(email);
      localStorage.setItem(
        "auth",
        JSON.stringify({ isAuthenticated: true, userEmail: email })
      );
      return true;
    }
    return false;
  };

  const logout = () => {
    setIsAuthenticated(false);
    setUserEmail(null);
    localStorage.removeItem("auth");
  };

  return (
    <AuthContext.Provider value={{ isAuthenticated, login, signup, logout, userEmail }}>
      {children}
    </AuthContext.Provider>
  );
};
