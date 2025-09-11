import React, { createContext, useContext, useState, useEffect } from "react";

export type UserRole = "guest" | "participant" | "organizer" | "admin";

export interface User {
    username: string;
    password: string;
    role: UserRole;
    registeredEvents: number[];
    email: string;
    fullName: string;
    department: string;
    enrollmentNumber?: string;
    joinDate: string;
    avatar?: string;
    isActive: boolean;
}

// Mock users for demo
const mockUsers: User[] = [
    {
        username: "participant",
        password: "password",
        role: "participant",
        registeredEvents: [1, 3, 5],
        email: "participant@university.edu",
        fullName: "Alice Johnson",
        department: "Computer Science",
        enrollmentNumber: "CS2023001",
        joinDate: "2023-01-15",
        isActive: true
    },
    {
        username: "organizer",
        password: "password",
        role: "organizer",
        registeredEvents: [],
        email: "organizer@university.edu",
        fullName: "Dr. Bob Smith",
        department: "Computer Science",
        joinDate: "2020-08-01",
        isActive: true
    },
    {
        username: "admin",
        password: "password",
        role: "admin",
        registeredEvents: [],
        email: "admin@university.edu",
        fullName: "Admin User",
        department: "Administration",
        joinDate: "2019-01-01",
        isActive: true
    },
    {
        username: "john_doe",
        password: "password123",
        role: "participant",
        registeredEvents: [2, 4, 6, 8],
        email: "john.doe@university.edu",
        fullName: "John Doe",
        department: "Business",
        enrollmentNumber: "BUS2022045",
        joinDate: "2022-09-01",
        isActive: true
    },
    {
        username: "maria_garcia",
        password: "maria2023",
        role: "participant",
        registeredEvents: [1, 7, 9],
        email: "maria.garcia@university.edu",
        fullName: "Maria Garcia",
        department: "Engineering",
        enrollmentNumber: "ENG2023012",
        joinDate: "2023-01-20",
        isActive: true
    },
    {
        username: "prof_wilson",
        password: "wilson_pass",
        role: "organizer",
        registeredEvents: [],
        email: "wilson@university.edu",
        fullName: "Prof. David Wilson",
        department: "Environmental Science",
        joinDate: "2018-03-15",
        isActive: true
    }
];

interface AuthContextProps {
    user: User | null;
    users: User[];
    login: (username: string, password: string) => boolean;
    register: (userData: Omit<User, "registeredEvents" | "joinDate" | "isActive">) => boolean;
    logout: () => void;
    registerEvent: (eventId: number) => void;
    unregisterEvent: (eventId: number) => void;
    updateProfile: (updates: Partial<User>) => void;
    getAllUsers: () => User[];
    updateUserRole: (username: string, role: UserRole) => void;
    toggleUserStatus: (username: string) => void;
    deleteUser: (username: string) => void;
}

const AuthContext = createContext<AuthContextProps | undefined>(undefined);

export function AuthProvider({ children }: { children: React.ReactNode }) {
    const [user, setUser] = useState<User | null>(null);
    const [users, setUsers] = useState<User[]>([]);

    // Load from localStorage when component mounts
    useEffect(() => {
        const storedUsers = localStorage.getItem("users");
        const storedUser = localStorage.getItem("currentUser");

        if (storedUsers) {
            setUsers(JSON.parse(storedUsers));
        } else {
            // Initialize with mock users if no stored users
            setUsers(mockUsers);
        }
        if (storedUser) setUser(JSON.parse(storedUser));
    }, []);

    // Save users list to localStorage when it changes
    useEffect(() => {
        localStorage.setItem("users", JSON.stringify(users));
    }, [users]);

    // Save current user to localStorage
    useEffect(() => {
        if (user) {
            localStorage.setItem("currentUser", JSON.stringify(user));
        } else {
            localStorage.removeItem("currentUser");
        }
    }, [user]);

    const login = (username: string, password: string) => {
        const found = users.find((u) => u.username === username && u.password === password && u.isActive);
        if (found) {
            setUser(found);
            return true;
        }
        return false;
    };

    const register = (userData: Omit<User, "registeredEvents" | "joinDate" | "isActive">) => {
        const exists = users.some((u) => u.username === userData.username || u.email === userData.email);
        if (exists) return false;

        const newUser: User = { 
            ...userData, 
            registeredEvents: [], 
            joinDate: new Date().toISOString().split('T')[0],
            isActive: true
        };
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

            setUser(updatedUser);
            setUsers((prev) =>
                prev.map((u) => (u.username === user.username ? updatedUser : u))
            );
        }
    };

    const unregisterEvent = (eventId: number) => {
        if (!user) return;

        const updatedUser: User = {
            ...user,
            registeredEvents: user.registeredEvents.filter(id => id !== eventId),
        };

        setUser(updatedUser);
        setUsers((prev) =>
            prev.map((u) => (u.username === user.username ? updatedUser : u))
        );
    };

    const updateProfile = (updates: Partial<User>) => {
        if (!user) return;

        const updatedUser: User = { ...user, ...updates };
        setUser(updatedUser);
        setUsers((prev) =>
            prev.map((u) => (u.username === user.username ? updatedUser : u))
        );
    };

    const getAllUsers = () => users;

    const updateUserRole = (username: string, role: UserRole) => {
        setUsers(prev => prev.map(u => 
            u.username === username ? { ...u, role } : u
        ));
        if (user && user.username === username) {
            setUser({ ...user, role });
        }
    };

    const toggleUserStatus = (username: string) => {
        setUsers(prev => prev.map(u => 
            u.username === username ? { ...u, isActive: !u.isActive } : u
        ));
    };

    const deleteUser = (username: string) => {
        setUsers(prev => prev.filter(u => u.username !== username));
        if (user && user.username === username) {
            setUser(null);
        }
    };

    return (
        <AuthContext.Provider value={{ 
            user, 
            users,
            login, 
            register, 
            logout, 
            registerEvent, 
            unregisterEvent,
            updateProfile,
            getAllUsers,
            updateUserRole,
            toggleUserStatus,
            deleteUser
        }}>
            {children}
        </AuthContext.Provider>
    );
}

export function useAuth() {
    const ctx = useContext(AuthContext);
    if (!ctx) throw new Error("useAuth must be used within AuthProvider");
    return ctx;
}
