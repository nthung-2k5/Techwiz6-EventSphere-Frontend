import { useParams, useNavigate } from "react-router";
import { Card, Button, message } from "antd";
import { useEvents } from "../context/EventContext";
import { useAuth } from "../context/AuthContext";

export default function EventDetailPage() {
  const { id } = useParams();
  const { events } = useEvents();
  const { user, registerEvent } = useAuth();
  const navigate = useNavigate();

  const event = events.find((e) => e.id === Number(id));

  if (!event) {
    return <h2>❌ Event not found</h2>;
  }

  const handleRegister = () => {
    if (!user) {
      message.warning("You must login to register.");
      navigate("/login");
      return;
    }

    if (user.role === "organizer") {
      message.info("Organizers cannot register for events.");
      return;
    }

    if (user.registeredEvents.includes(event.id)) {
      message.info("Already registered.");
      return;
    }

    registerEvent(event.id);
    message.success("Registered successfully!");
  };

  return (
    <div style={{ maxWidth: 800, margin: "2rem auto" }}>
      <Card
        title={event.title}
        cover={
          event.image ? (
            <img
              src={event.image}
              alt={event.title}
              style={{ height: 300, objectFit: "cover" }}
            />
          ) : null
        }
      >
        <p><strong>Description:</strong> {event.description}</p>
        <p><strong>📍 Location:</strong> {event.location}</p>
        <p>
          <strong>📅 Date:</strong>{" "}
          {event.startDate ? `${event.startDate} → ${event.endDate}` : event.date}
        </p>
        <p><strong>⏰ Time:</strong> {event.startTime} - {event.endTime}</p>
        <p><strong>Organizer:</strong> {event.organizer}</p>

        {(!user || user.role === "participant") && (
          <Button type="primary" onClick={handleRegister}>
            Register
          </Button>
        )}
      </Card>
    </div>
  );
}
