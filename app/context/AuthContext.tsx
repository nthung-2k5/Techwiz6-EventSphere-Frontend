import React, { createContext, useContext, useState, useEffect } from "react";

export type UserRole = "guest" | "participant" | "organizer";

export interface User {
  username: string;
  password: string;
  role: UserRole;
  registeredEvents: number[];
}

interface AuthContextProps {
  user: User | null;
  login: (username: string, password: string) => boolean;
  register: (username: string, password: string, role: UserRole) => boolean;
  logout: () => void;
  registerEvent: (eventId: number) => void;
}

const AuthContext = createContext<AuthContextProps | undefined>(undefined);

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [users, setUsers] = useState<User[]>([]);

  // 🔹 Load từ localStorage khi app khởi chạy
  useEffect(() => {
    const storedUsers = localStorage.getItem("users");
    const storedUser = localStorage.getItem("currentUser");

    if (storedUsers) setUsers(JSON.parse(storedUsers));
    if (storedUser) setUser(JSON.parse(storedUser));
  }, []);

  // 🔹 Lưu danh sách users vào localStorage khi thay đổi
  useEffect(() => {
    localStorage.setItem("users", JSON.stringify(users));
  }, [users]);

  // 🔹 Lưu user hiện tại vào localStorage
  useEffect(() => {
    if (user) {
      localStorage.setItem("currentUser", JSON.stringify(user));
    } else {
      localStorage.removeItem("currentUser");
    }
  }, [user]);

  const login = (username: string, password: string) => {
    const found = users.find((u) => u.username === username && u.password === password);
    if (found) {
      setUser(found);
      return true;
    }
    return false;
  };

  const register = (username: string, password: string, role: UserRole) => {
    const exists = users.some((u) => u.username === username);
    if (exists) return false;

    const newUser: User = { username, password, role, registeredEvents: [] };
    setUsers((prev) => [...prev, newUser]);
    setUser(newUser);
    return true;
  };

  const logout = () => setUser(null);

  const registerEvent = (eventId: number) => {
    if (!user) return;

    if (!user.registeredEvents.includes(eventId)) {
      const updatedUser: User = {
        ...user,
        registeredEvents: [...user.registeredEvents, eventId],
      };

      // cập nhật user đang login
      setUser(updatedUser);

      // cập nhật trong danh sách users
      setUsers((prev) =>
        prev.map((u) => (u.username === user.username ? updatedUser : u))
      );
    }
  };

  return (
    <AuthContext.Provider value={{ user, login, register, logout, registerEvent }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error("useAuth must be used within AuthProvider");
  return ctx;
}
