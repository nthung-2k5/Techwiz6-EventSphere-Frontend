import React, { createContext, useContext, useState, useEffect } from "react";
import { useAuth } from "./AuthContext";

export interface Event {
    id: number;
    title: string;
    description: string;
    location: string;
    date?: string;
    startDate?: string;
    endDate?: string;
    startTime: string;
    endTime: string;
    organizer: string;
    image?: string; 
}

interface EventContextProps {
    events: Event[];
    addEvent: (event: Omit<Event, "id" | "organizer">) => void;
    updateEvent: (eventId: number, updated: Partial<Event>) => void;
    deleteEvent: (eventId: number) => void;
}

const EventContext = createContext<EventContextProps | undefined>(undefined);

export function EventProvider({ children }: { children: React.ReactNode }) {
    const { user } = useAuth();

    const [events, setEvents] = useState<Event[]>([
        {
            id: 1,
            title: "Tech Conference 2025",
            description: "A conference about the latest in technology.",
            location: "Hanoi University",
            startDate: "2025-09-01",
            endDate: "2025-09-01",
            startTime: "09:00",
            endTime: "17:00",
            organizer: "admin",
            image: "https://picsum.photos/600/300?random=1",
        },
        {
            id: 2,
            title: "Cultural Festival",
            description: "Annual student cultural event with music and food.",
            location: "Ho Chi Minh City",
            startDate: "2025-09-15",
            endDate: "2025-09-17",
            startTime: "08:00",
            endTime: "22:00",
            organizer: "organizer1",
            image: "https://picsum.photos/600/300?random=2",
        },
        {
            id: 3,
            title: "Job Fair 2025",
            description: "Meet top companies and apply for jobs.",
            location: "Da Nang",
            startDate: "2025-08-20",
            endDate: "2025-08-20",
            startTime: "08:00",
            endTime: "17:00",
            organizer: "organizer2",
            image: "https://picsum.photos/600/300?random=3",
        },
    ]);

    useEffect(() => {
        const stored = localStorage.getItem("events");
        if (stored) {
            const parsed = JSON.parse(stored);
            if (parsed.length > 0) {
                setEvents(parsed);
            }
        }
    }, []);

    useEffect(() => {
        localStorage.setItem("events", JSON.stringify(events));
    }, [events]);

    const addEvent = (event: Omit<Event, "id" | "organizer">) => {
        if (!user) return;

        const newEvent: Event = {
            ...event,
            id: events.length > 0 ? Math.max(...events.map((e) => e.id)) + 1 : 1,
            organizer: user.username,
        };

        setEvents((prev) => [...prev, newEvent]);
    };

    const updateEvent = (eventId: number, updated: Partial<Event>) => {
        setEvents((prev) =>
            prev.map((e) => (e.id === eventId ? { ...e, ...updated } : e))
        );
    };

    const deleteEvent = (eventId: number) => {
        setEvents((prev) => prev.filter((e) => e.id !== eventId));
    };

    return (
        <EventContext.Provider value={{ events, addEvent, updateEvent, deleteEvent }}>
            {children}
        </EventContext.Provider>
    );
}

export function useEvents() {
    const ctx = useContext(EventContext);
    if (!ctx) throw new Error("useEvents must be used within EventProvider");
    return ctx;
}
