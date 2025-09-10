import React, { createContext, useContext, useState } from "react";

type UserRole = "guest" | "participant" | "organizer";

interface User {
  username: string;
  password: string;
  role: UserRole;
}

interface AuthContextProps {
  user: User | null;
  users: User[];
  login: (username: string, password: string) => boolean;
  register: (username: string, password: string, role: UserRole) => boolean;
  logout: () => void;
}

const AuthContext = createContext<AuthContextProps | undefined>(undefined);

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [users, setUsers] = useState<User[]>([
    { username: "khoa", password: "123", role: "participant" },
    { username: "bao", password: "123", role: "organizer" },
  ]);
  const [user, setUser] = useState<User | null>(null);

  const login = (username: string, password: string) => {
    const found = users.find(
      (u) => u.username === username && u.password === password
    );
    if (found) {
      setUser(found);
      return true;
    }
    return false;
  };

  const register = (username: string, password: string, role: UserRole) => {
    const exists = users.some((u) => u.username === username);
    if (exists) return false;
    const newUser: User = { username, password, role };
    setUsers((prev) => [...prev, newUser]);
    setUser(newUser);
    return true;
  };

  const logout = () => setUser(null);

  return (
    <AuthContext.Provider value={{ user, users, login, register, logout }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error("useAuth must be used within AuthProvider");
  return ctx;
}
