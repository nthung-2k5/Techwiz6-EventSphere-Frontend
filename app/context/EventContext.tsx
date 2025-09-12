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
    {
        id: 1,
        title: "AI & Machine Learning Workshop",
        description: "Join us for an intensive workshop on the latest AI and ML technologies. Learn about neural networks, deep learning, and practical applications in industry. This workshop includes hands-on coding sessions and real-world case studies.",
        location: "Computer Science Lab, Building A",
        date: "2025-09-25",
        startTime: "09:00",
        endTime: "17:00",
        organizer: "organizer",
        category: "Technical",
        maxParticipants: 50,
        currentParticipants: 32,
        status: "approved",
        tags: ["AI", "Machine Learning", "Workshop", "Programming"],
        department: "Computer Science",
        registrationDeadline: "2025-09-20",
        certificateFee: 25,
        requirements: ["Basic Python knowledge", "Laptop required"],
        contactEmail: "cs.events@university.edu",
        rating: 4.7,
        totalRatings: 89
    },
    {
        id: 2,
        title: "Cultural Night 2025",
        description: "Experience the rich diversity of our university community through performances, food, and cultural exhibitions from around the world. Join us for an evening of music, dance, and international cuisine.",
        location: "Main Auditorium",
        startDate: "2025-10-15",
        endDate: "2025-10-16",
        startTime: "18:00",
        endTime: "22:00",
        organizer: "organizer",
        category: "Cultural",
        maxParticipants: 500,
        currentParticipants: 387,
        status: "approved",
        tags: ["Culture", "Performance", "International", "Food"],
        department: "Student Affairs",
        registrationDeadline: "2025-10-10",
        contactEmail: "cultural@university.edu",
        rating: 4.9,
        totalRatings: 156
    },
    {
        id: 3,
        title: "Startup Pitch Competition",
        description: "Present your innovative startup ideas to a panel of investors and industry experts. Winners receive funding opportunities and mentorship programs. Open to all students with entrepreneurial aspirations.",
        location: "Business School Auditorium",
        date: "2025-11-08",
        startTime: "10:00",
        endTime: "16:00",
        organizer: "organizer",
        category: "Competition",
        maxParticipants: 30,
        currentParticipants: 18,
        status: "approved",
        tags: ["Startup", "Competition", "Business", "Innovation"],
        department: "Business School",
        registrationDeadline: "2025-11-01",
        certificateFee: 30,
        requirements: ["Business plan required", "Presentation slides"],
        contactEmail: "business.events@university.edu",
        rating: 4.6,
        totalRatings: 42
    },
    {
        id: 4,
        title: "Environmental Science Symposium",
        description: "Leading researchers present their latest findings on climate change, sustainability, and environmental conservation. Includes poster sessions and networking opportunities with environmental professionals.",
        location: "Science Complex, Hall 201",
        startDate: "2025-09-30",
        endDate: "2025-10-01",
        startTime: "08:30",
        endTime: "18:00",
        organizer: "organizer",
        category: "Seminar",
        maxParticipants: 200,
        currentParticipants: 156,
        status: "approved",
        tags: ["Environment", "Research", "Sustainability", "Science"],
        department: "Environmental Science",
        registrationDeadline: "2025-09-25",
        certificateFee: 20,
        contactEmail: "env.events@university.edu",
        rating: 4.5,
        totalRatings: 73
    },
    {
        id: 5,
        title: "Digital Marketing Bootcamp",
        description: "Learn essential digital marketing skills including SEO, social media marketing, content creation, and analytics. Industry professionals will share real-world strategies and tools.",
        location: "Marketing Lab, Building C",
        date: "2025-10-12",
        startTime: "09:00",
        endTime: "17:00",
        organizer: "organizer",
        category: "Workshop",
        maxParticipants: 40,
        currentParticipants: 35,
        status: "approved",
        tags: ["Marketing", "Digital", "SEO", "Social Media"],
        department: "Marketing",
        registrationDeadline: "2025-10-08",
        certificateFee: 35,
        requirements: ["Basic computer skills", "Social media accounts"],
        contactEmail: "marketing.events@university.edu",
        rating: 4.8,
        totalRatings: 67
    },
    {
        id: 6,
        title: "Music Festival 2025",
        description: "Annual university music festival featuring student bands, solo artists, and special guest performers. Multiple stages with diverse genres from rock to classical to electronic music.",
        location: "University Grounds",
        startDate: "2025-11-20",
        endDate: "2025-11-22",
        startTime: "14:00",
        endTime: "23:00",
        organizer: "organizer",
        category: "Cultural",
        maxParticipants: 2000,
        currentParticipants: 1456,
        status: "approved",
        tags: ["Music", "Festival", "Performance", "Entertainment"],
        department: "Music Department",
        registrationDeadline: "2025-11-15",
        contactEmail: "music.events@university.edu",
        rating: 4.9,
        totalRatings: 234
    },
    {
        id: 7,
        title: "Robotics Competition",
        description: "Teams compete to build and program robots for various challenges. Categories include autonomous navigation, object manipulation, and swarm robotics. Prizes for innovative solutions.",
        location: "Engineering Workshop",
        date: "2025-10-28",
        startTime: "08:00",
        endTime: "18:00",
        organizer: "organizer",
        category: "Competition",
        maxParticipants: 60,
        currentParticipants: 45,
        status: "approved",
        tags: ["Robotics", "Engineering", "Competition", "Technology"],
        department: "Mechanical Engineering",
        registrationDeadline: "2025-10-20",
        certificateFee: 40,
        requirements: ["Team of 3-4 members", "Basic programming knowledge"],
        contactEmail: "engineering.events@university.edu",
        rating: 4.7,
        totalRatings: 91
    },
    {
        id: 8,
        title: "Career Fair 2025",
        description: "Meet with representatives from top companies across various industries. Opportunities for internships, full-time positions, and career advice. Bring your resume and dress professionally.",
        location: "Student Center, Main Hall",
        date: "2025-10-05",
        startTime: "10:00",
        endTime: "16:00",
        organizer: "organizer",
        category: "Career",
        maxParticipants: 1000,
        currentParticipants: 789,
        status: "approved",
        tags: ["Career", "Jobs", "Internship", "Networking"],
        department: "Career Services",
        registrationDeadline: "2025-10-01",
        requirements: ["Professional attire", "Resume copies"],
        contactEmail: "career.services@university.edu",
        rating: 4.6,
        totalRatings: 312
    },
    {
        id: 9,
        title: "Web Development Hackathon",
        description: "48-hour coding marathon to build innovative web applications. Teams compete for prizes while learning new technologies. Mentors available for guidance and workshops on latest frameworks.",
        location: "Computer Lab, Building B",
        startDate: "2025-11-12",
        endDate: "2025-11-14",
        startTime: "18:00",
        endTime: "18:00",
        organizer: "organizer",
        category: "Competition",
        maxParticipants: 80,
        currentParticipants: 72,
        status: "approved",
        tags: ["Programming", "Web Development", "Hackathon", "Technology"],
        department: "Computer Science",
        registrationDeadline: "2025-11-05",
        certificateFee: 20,
        requirements: ["Programming experience", "Laptop required", "Team of 2-4"],
        contactEmail: "cs.events@university.edu",
        rating: 4.8,
        totalRatings: 128
    },
    {
        id: 10,
        title: "Mental Health Awareness Week",
        description: "Series of workshops, discussions, and activities focused on mental health awareness, stress management, and wellbeing. Features guest speakers and mental health professionals.",
        location: "Various Locations",
        startDate: "2025-10-18",
        endDate: "2025-10-22",
        startTime: "09:00",
        endTime: "17:00",
        organizer: "organizer",
        category: "Health",
        maxParticipants: 300,
        currentParticipants: 245,
        status: "approved",
        tags: ["Health", "Mental Health", "Wellness", "Support"],
        department: "Student Health Services",
        registrationDeadline: "2025-10-15",
        contactEmail: "health.services@university.edu",
        rating: 4.9,
        totalRatings: 89
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
        const storedEvents = localStorage.getItem("events");
        if (storedEvents) {
            setEvents(JSON.parse(storedEvents));
        } else {
            // Initialize with mock data if no stored events
            setEvents(mockEvents);
        }
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
