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
}

interface EventContextProps {
  events: Event[];
  addEvent: (event: Omit<Event, "id" | "organizer">) => void;
}

const EventContext = createContext<EventContextProps | undefined>(undefined);

export function EventProvider({ children }: { children: React.ReactNode }) {
  const [events, setEvents] = useState<Event[]>([]);
  const { user } = useAuth();

  // Load events from localStorage when component mounts
  useEffect(() => {
    const storedEvents = localStorage.getItem("events");
    if (storedEvents) {
      setEvents(JSON.parse(storedEvents));
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
      id: events.length + 1,
      organizer: user.username,
    };
    setEvents((prev) => [...prev, newEvent]);
  };

  return (
    <EventContext.Provider value={{ events, addEvent }}>
      {children}
    </EventContext.Provider>
  );
}

export function useEvents() {
  const ctx = useContext(EventContext);
  if (!ctx) throw new Error("useEvents must be used within EventProvider");
  return ctx;
}
