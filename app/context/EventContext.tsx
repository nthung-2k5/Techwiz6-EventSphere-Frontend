import React, { createContext, useContext, useState, useEffect } from "react";
import { useAuth } from "./AuthContext";

export interface Event {
    id: number;
    title: string;
    description: string;
    location: string;
    // single-day
    date?: string;
    // multi-day
    startDate?: string;
    endDate?: string;
    // common
    startTime: string;
    endTime: string;
    organizer: string; // username người tạo
    category: string;
    maxParticipants: number;
    currentParticipants: number;
    status: 'pending' | 'approved' | 'rejected' | 'completed';
    bannerImage?: string;
    tags: string[];
    department: string;
    registrationDeadline: string;
    certificateFee?: number;
    requirements?: string[];
    contactEmail: string;
    rating?: number;
    totalRatings?: number;
}

// Mock data for events
const mockEvents: Event[] = [
    // Current/Ongoing Events
    {
        id: 4,
        title: "Cybersecurity Bootcamp",
        description: "Intensive 3-day bootcamp covering ethical hacking, network security, and digital forensics. Learn from industry experts and get hands-on experience with real-world security challenges. Perfect for students interested in cybersecurity careers.",
        startDate: "2025-01-12",
        endDate: "2025-01-14",
        startTime: "09:00",
        endTime: "17:00",
        location: "IT Lab, Building C",
        organizer: "Prof. Johnson",
        maxParticipants: 30,
        currentParticipants: 22,
        status: "approved",
        category: "Technology",
        tags: ["Cybersecurity", "Ethical Hacking", "Network Security", "Bootcamp"],
        bannerImage: "https://images.unsplash.com/photo-1550751827-4bd374c3f58b?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80",
        department: "Computer Science",
        registrationDeadline: "2025-01-10",
        contactEmail: "cybersecurity@university.edu",
        certificateFee: 25
    },
    // Future Events
    {
        id: 5,
        title: "Music Festival 2025",
        description: "Rock out with fellow students at our annual music festival! Featuring live performances from student bands, local artists, and special guest performers. Food trucks, merchandise booths, and interactive music workshops will be available throughout the day.",
        startDate: "2025-03-15",
        endDate: "2025-03-16",
        startTime: "12:00",
        endTime: "23:00",
        location: "University Quad",
        organizer: "Music Society",
        maxParticipants: 500,
        currentParticipants: 287,
        status: "approved",
        category: "Entertainment",
        tags: ["Music", "Festival", "Live Performance", "Student Bands"],
        bannerImage: "https://images.unsplash.com/photo-1459749411175-04bf5292ceea?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80",
        department: "Music Department",
        registrationDeadline: "2025-03-10",
        contactEmail: "music.events@university.edu"
    },
    {
        id: 6,
        title: "Career Fair 2025",
        description: "Connect with top employers and explore career opportunities across various industries. Meet recruiters from tech companies, consulting firms, healthcare organizations, and more. Bring your resume and dress professionally for on-the-spot interviews and networking opportunities.",
        startDate: "2025-04-10",
        endDate: "2025-04-10",
        startTime: "10:00",
        endTime: "16:00",
        location: "Student Center Main Hall",
        organizer: "Career Services",
        maxParticipants: 300,
        currentParticipants: 156,
        status: "approved",
        category: "Career",
        tags: ["Career", "Jobs", "Networking", "Recruitment"],
        bannerImage: "https://images.unsplash.com/photo-1521737604893-d14cc237f11d?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2084&q=80",
        department: "Career Services",
        registrationDeadline: "2025-04-05",
        contactEmail: "career.services@university.edu",
        requirements: ["Professional attire", "Resume copies"]
    },
    {
        id: 7,
        title: "Environmental Sustainability Summit",
        description: "Join environmental experts, researchers, and activists for discussions on climate change, renewable energy, and sustainable practices. Interactive workshops on recycling, green technology, and environmental policy. Make a difference for our planet!",
        startDate: "2025-04-22",
        endDate: "2025-04-22",
        startTime: "08:00",
        endTime: "18:00",
        location: "Environmental Science Center",
        organizer: "Green Campus Initiative",
        maxParticipants: 150,
        currentParticipants: 89,
        status: "approved",
        category: "Environment",
        tags: ["Environment", "Sustainability", "Climate Change", "Green Tech"],
        bannerImage: "https://images.unsplash.com/photo-1569163139394-de4e4f43e4e3?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80",
        department: "Environmental Science",
        registrationDeadline: "2025-04-18",
        contactEmail: "green.campus@university.edu",
        certificateFee: 15
    },
    {
        id: 8,
        title: "International Food Festival",
        description: "Taste authentic cuisines from around the world! Student organizations will prepare traditional dishes from their home countries. Cooking demonstrations, cultural presentations, and recipe sharing. A delicious journey across continents!",
        startDate: "2025-05-05",
        endDate: "2025-05-05",
        startTime: "11:00",
        endTime: "16:00",
        location: "Campus Courtyard",
        organizer: "International Student Association",
        maxParticipants: 400,
        currentParticipants: 234,
        status: "approved",
        category: "Cultural",
        tags: ["Food", "International", "Culture", "Cooking"],
        bannerImage: "https://images.unsplash.com/photo-1555939594-58d7cb561ad1?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2087&q=80",
        department: "International Affairs",
        registrationDeadline: "2025-05-01",
        contactEmail: "international@university.edu"
    },
    {
        id: 9,
        title: "Digital Art & Design Workshop",
        description: "Explore the world of digital creativity! Learn Adobe Creative Suite, digital illustration, UI/UX design principles, and portfolio development. Industry professionals will share insights on design trends and career opportunities in creative fields.",
        startDate: "2025-05-20",
        endDate: "2025-05-21",
        startTime: "10:00",
        endTime: "16:00",
        location: "Art & Design Studio",
        organizer: "Creative Arts Department",
        maxParticipants: 40,
        currentParticipants: 28,
        status: "approved",
        category: "Arts",
        tags: ["Digital Art", "Design", "Adobe", "UI/UX", "Portfolio"],
        bannerImage: "https://images.unsplash.com/photo-1561070791-2526d30994b5?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2064&q=80",
        department: "Creative Arts",
        registrationDeadline: "2025-05-15",
        contactEmail: "arts@university.edu",
        certificateFee: 30,
        requirements: ["Laptop with Adobe Creative Suite", "Basic design knowledge"]
    },
    {
        id: 10,
        title: "Mental Health Awareness Week",
        description: "Prioritize your wellbeing! Join us for workshops on stress management, mindfulness meditation, healthy lifestyle habits, and mental health resources. Professional counselors and wellness experts will provide guidance and support.",
        startDate: "2025-06-02",
        endDate: "2025-06-06",
        startTime: "09:00",
        endTime: "17:00",
        location: "Student Wellness Center",
        organizer: "Health & Wellness Services",
        maxParticipants: 200,
        currentParticipants: 145,
        status: "approved",
        category: "Health",
        tags: ["Mental Health", "Wellness", "Mindfulness", "Stress Management"],
        bannerImage: "https://images.unsplash.com/photo-1544367567-0f2fcb009e0b?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2020&q=80",
        department: "Student Health Services",
        registrationDeadline: "2025-05-28",
        contactEmail: "wellness@university.edu"
    },
    {
        id: 11,
        title: "Robotics Competition 2025",
        description: "Build, program, and compete with autonomous robots! Teams will design robots to complete challenging tasks. Great opportunity to apply engineering principles, programming skills, and teamwork. Prizes for most innovative design and best performance.",
        startDate: "2025-06-15",
        endDate: "2025-06-16",
        startTime: "09:00",
        endTime: "18:00",
        location: "Engineering Workshop",
        organizer: "Robotics Club",
        maxParticipants: 60,
        currentParticipants: 42,
        status: "approved",
        category: "Technology",
        tags: ["Robotics", "Engineering", "Programming", "Competition", "Innovation"],
        bannerImage: "https://images.unsplash.com/photo-1485827404703-89b55fcc595e?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80",
        department: "Mechanical Engineering",
        registrationDeadline: "2025-06-10",
        contactEmail: "robotics@university.edu",
        certificateFee: 40,
        requirements: ["Team of 3-4 members", "Basic programming knowledge", "Engineering background preferred"]
    },
    {
        id: 12,
        title: "Photography Exhibition & Workshop",
        description: "Showcase your photographic talents and learn from professional photographers! Exhibition of student works, hands-on workshops on composition, lighting, and post-processing. Equipment demos and portfolio review sessions included.",
        startDate: "2025-07-01",
        endDate: "2025-07-03",
        startTime: "10:00",
        endTime: "18:00",
        location: "Art Gallery & Photography Studio",
        organizer: "Photography Society",
        maxParticipants: 80,
        currentParticipants: 56,
        status: "approved",
        category: "Arts",
        tags: ["Photography", "Exhibition", "Workshop", "Portfolio", "Visual Arts"],
        bannerImage: "https://images.unsplash.com/photo-1502920917128-1aa500764cbd?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80",
        department: "Visual Arts",
        registrationDeadline: "2025-06-25",
        contactEmail: "photography@university.edu",
        certificateFee: 20,
        requirements: ["Camera (DSLR or mirrorless preferred)", "Portfolio of 5-10 photos"]
    },
    {
        id: 13,
        title: "Data Science & Analytics Bootcamp",
        description: "Intensive training in data analysis, machine learning, and statistical modeling. Learn Python, R, SQL, and popular data science libraries. Hands-on projects with real datasets and industry case studies.",
        startDate: "2025-07-20",
        endDate: "2025-07-25",
        startTime: "09:00",
        endTime: "17:00",
        location: "Data Science Lab, Building A",
        organizer: "Dr. Analytics",
        maxParticipants: 35,
        currentParticipants: 28,
        status: "approved",
        category: "Technology",
        tags: ["Data Science", "Machine Learning", "Python", "Analytics", "Statistics"],
        bannerImage: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80",
        department: "Computer Science",
        registrationDeadline: "2025-07-15",
        contactEmail: "datascience@university.edu",
        certificateFee: 50,
        requirements: ["Basic programming knowledge", "Statistics background helpful", "Laptop required"]
    },
    {
        id: 14,
        title: "Blockchain & Cryptocurrency Summit",
        description: "Explore the future of finance and technology! Learn about blockchain fundamentals, cryptocurrency trading, smart contracts, and decentralized applications. Industry experts and successful crypto entrepreneurs will share insights.",
        startDate: "2025-08-10",
        endDate: "2025-08-11",
        startTime: "10:00",
        endTime: "18:00",
        location: "Business School Conference Center",
        organizer: "FinTech Society",
        maxParticipants: 120,
        currentParticipants: 89,
        status: "approved",
        category: "Business",
        tags: ["Blockchain", "Cryptocurrency", "FinTech", "Smart Contracts", "DeFi"],
        bannerImage: "https://images.unsplash.com/photo-1639762681485-074b7f938ba0?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80",
        department: "Business School",
        registrationDeadline: "2025-08-05",
        contactEmail: "fintech@university.edu",
        certificateFee: 35
    },
    {
        id: 15,
        title: "Gaming Tournament Championship",
        description: "Ultimate gaming showdown featuring multiple game categories! Compete in esports tournaments, retro gaming challenges, and indie game showcases. Prizes for winners and networking opportunities with game developers.",
        startDate: "2025-09-05",
        endDate: "2025-09-07",
        startTime: "12:00",
        endTime: "22:00",
        location: "Gaming Arena & Student Center",
        organizer: "Gaming Club",
        maxParticipants: 200,
        currentParticipants: 167,
        status: "approved",
        category: "Entertainment",
        tags: ["Gaming", "Esports", "Tournament", "Competition", "Technology"],
        bannerImage: "https://images.unsplash.com/photo-1542751371-adc38448a05e?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80",
        department: "Student Activities",
        registrationDeadline: "2025-09-01",
        contactEmail: "gaming@university.edu"
    }
];

interface EventContextProps {
    events: Event[];
    addEvent: (event: Omit<Event, "id" | "organizer">) => void;
    updateEvent: (id: number, updates: Partial<Event>) => void;
    deleteEvent: (id: number) => void;
    approveEvent: (id: number) => void;
    rejectEvent: (id: number) => void;
}const EventContext = createContext<EventContextProps | undefined>(undefined);

export function EventProvider({ children }: { children: React.ReactNode }) {
    const [events, setEvents] = useState<Event[]>([]);
    const { user } = useAuth();

    // Load events from localStorage when component mounts
    useEffect(() => {
        setEvents(mockEvents);
    }, []);

    // Save events to localStorage whenever they change
    useEffect(() => {
        localStorage.setItem("events", JSON.stringify(events));
    }, [events]);

    const addEvent = (event: Omit<Event, "id" | "organizer">) => {
        if (!user) return;
        const newEvent: Event = {
            ...event,
            id: Math.max(...events.map(e => e.id), 0) + 1,
            organizer: user.username,
            currentParticipants: 0,
            status: 'pending'
        };
        setEvents((prev) => [...prev, newEvent]);
    };

    const updateEvent = (id: number, updates: Partial<Event>) => {
        setEvents(prev => prev.map(event => 
            event.id === id ? { ...event, ...updates } : event
        ));
    };

    const deleteEvent = (id: number) => {
        setEvents(prev => prev.filter(event => event.id !== id));
    };

    const approveEvent = (id: number) => {
        updateEvent(id, { status: 'approved' });
    };

    const rejectEvent = (id: number) => {
        updateEvent(id, { status: 'rejected' });
    };

    return (
        <EventContext.Provider value={{ 
            events, 
            addEvent, 
            updateEvent, 
            deleteEvent, 
            approveEvent, 
            rejectEvent 
        }}>
            {children}
        </EventContext.Provider>
    );
}

export function useEvents() {
    const ctx = useContext(EventContext);
    if (!ctx) throw new Error("useEvents must be used within EventProvider");
    return ctx;
}
