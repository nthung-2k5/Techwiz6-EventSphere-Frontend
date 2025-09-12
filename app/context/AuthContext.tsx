import React, { createContext, useContext, useState, useEffect } from "react";

export type UserRole = "guest" | "participant" | "organizer" | "admin";

export interface User {
    username: string;
    password: string;
    role: UserRole;
    registeredEvents: number[];
    organizedEvents?: number[];
    email: string;
    fullName: string;
    department: string;
    enrollmentNumber?: string;
    yearOfStudy?: string;
    bio?: string;
    joinDate: string;
    avatar?: string;
    isActive: boolean;
}

// Mock users for demo
const mockUsers: User[] = [
    {
        username: "admin",
        password: "admin123",
        email: "admin@university.edu",
        role: "admin",
        fullName: "System Administrator",
        department: "Administration",
        joinDate: "2020-01-01",
        isActive: true,
        registeredEvents: [],
        organizedEvents: []
    },
    {
        username: "john_doe",
        password: "password123",
        email: "john.doe@student.university.edu",
        role: "participant",
        fullName: "John Doe",
        department: "Computer Science",
        enrollmentNumber: "CS2023001",
        yearOfStudy: "3rd Year",
        bio: "Passionate about AI and machine learning. Active participant in tech events and hackathons.",
        joinDate: "2023-01-15",
        isActive: true,
        registeredEvents: [1, 2, 3, 5, 6],
        avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=387&q=80"
    },
    {
        username: "jane_smith",
        password: "password123",
        email: "jane.smith@university.edu",
        role: "organizer",
        fullName: "Jane Smith",
        department: "Student Affairs",
        bio: "Dedicated to creating engaging campus experiences and fostering student community.",
        joinDate: "2021-08-15",
        isActive: true,
        registeredEvents: [],
        organizedEvents: [1, 2, 4],
        avatar: "https://images.unsplash.com/photo-1494790108755-2616b612b786?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=387&q=80"
    },
    {
        username: "alex_chen",
        password: "password123",
        email: "alex.chen@student.university.edu",
        role: "participant",
        fullName: "Alex Chen",
        department: "Business Administration",
        enrollmentNumber: "BA2024002",
        yearOfStudy: "2nd Year",
        bio: "Entrepreneur at heart with interests in startups, sustainability, and cultural events.",
        joinDate: "2024-01-10",
        isActive: true,
        registeredEvents: [2, 4, 7, 8, 9, 11],
        avatar: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=387&q=80"
    },
    {
        username: "maria_garcia",
        password: "password123",
        email: "maria.garcia@student.university.edu",
        role: "participant",
        fullName: "Maria Garcia",
        department: "Creative Arts",
        enrollmentNumber: "CA2022003",
        yearOfStudy: "4th Year",
        bio: "Visual artist and photographer passionate about digital creativity and mental health advocacy.",
        joinDate: "2022-09-01",
        isActive: true,
        registeredEvents: [1, 3, 8, 10, 12, 13],
        avatar: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=387&q=80"
    },
    {
        username: "dr_johnson",
        password: "password123",
        email: "prof.johnson@university.edu",
        role: "organizer",
        fullName: "Dr. Michael Johnson",
        department: "Computer Science",
        bio: "Professor specializing in cybersecurity and data science. Passionate about hands-on learning experiences.",
        joinDate: "2018-03-15",
        isActive: true,
        registeredEvents: [],
        organizedEvents: [4, 11, 13],
        avatar: "https://images.unsplash.com/photo-1560250097-0b93528c311a?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=387&q=80"
    },
    {
        username: "sarah_wilson",
        password: "password123",
        email: "sarah.wilson@student.university.edu",
        role: "participant",
        fullName: "Sarah Wilson",
        department: "Music",
        enrollmentNumber: "MU2025004",
        yearOfStudy: "1st Year",
        bio: "Music enthusiast and gamer. Love attending festivals and competitive gaming events.",
        joinDate: "2025-01-05",
        isActive: true,
        registeredEvents: [5, 6, 10, 14, 15],
        avatar: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=387&q=80"
    },
    {
        username: "david_kim",
        password: "password123",
        email: "david.kim@student.university.edu",
        role: "participant",
        fullName: "David Kim",
        department: "Mechanical Engineering",
        enrollmentNumber: "ME2023005",
        yearOfStudy: "3rd Year",
        bio: "Engineering student with passion for robotics, blockchain technology, and career development.",
        joinDate: "2023-08-20",
        isActive: true,
        registeredEvents: [3, 6, 11, 13, 14],
        avatar: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=387&q=80"
    },
    {
        username: "lisa_brown",
        password: "password123",
        email: "lisa.brown@university.edu",
        role: "organizer",
        fullName: "Lisa Brown",
        department: "Student Activities",
        bio: "Event coordinator focused on entertainment, cultural events, and student engagement activities.",
        joinDate: "2020-06-10",
        isActive: true,
        registeredEvents: [],
        organizedEvents: [5, 8, 12, 15],
        avatar: "https://images.unsplash.com/photo-1487412720507-e7ab37603c6f?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=387&q=80"
    },
    {
        username: "emma_taylor",
        password: "password123",
        email: "emma.taylor@student.university.edu",
        role: "participant",
        fullName: "Emma Taylor",
        department: "Environmental Science",
        enrollmentNumber: "ES2024006",
        yearOfStudy: "2nd Year",
        bio: "Environmental advocate interested in sustainability, wellness, and creative arts.",
        joinDate: "2024-02-15",
        isActive: true,
        registeredEvents: [7, 9, 10, 12],
        avatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=387&q=80"
    }
];

interface AuthContextProps {
    user: User | null;
    users: User[];
    login: (email: string, password: string) => boolean;
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
        const storedUser = localStorage.getItem("currentUser");

        setUsers(mockUsers);
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

    const login = (email: string, password: string) => {
        const found = users.find((u) => u.email.toLowerCase() === email.toLowerCase() && u.password === password && u.isActive);
        if (found) {
            setUser(found);
            return true;
        }
        return false;
    };

    const register = (userData: Omit<User, "registeredEvents" | "joinDate" | "isActive">) => {
        const exists = users.some((u) => u.username === userData.username || u.email === userData.email);
        if (exists) return false;

        // Only allow participant registration - organizers are created by admin
        if (userData.role !== "participant") return false;

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
