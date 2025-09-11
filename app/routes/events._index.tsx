import { useEvents } from "../context/EventContext";
import { Card } from "antd";
import { Link } from "react-router";

export default function EventsPage() {
    const { events } = useEvents();

    return (
        <div style={{ padding: "2rem" }}>
            <h1>📅 All Events</h1>
            {events.map((event) => (
                <Card
                    key={event.id}
                    title={event.title}
                    hoverable
                    style={{ marginBottom: 16 }}
                    extra={<Link to={`/events/${event.id}`}>View Details</Link>}
                >
                    <p>{event.description}</p>
                    <p>📍 {event.location}</p>
                    <p>
                        📅 {event.startDate} → {event.endDate} ({event.startTime} - {event.endTime})
                    </p>
                </Card>
            ))}
        </div>
    );
}
