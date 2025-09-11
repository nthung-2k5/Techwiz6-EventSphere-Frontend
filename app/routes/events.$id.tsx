import { useParams, useNavigate } from "react-router";
import { useEvents } from "../context/EventContext";
import { useAuth } from "../context/AuthContext";
import { Card, Typography, Button, message } from "antd";

const { Title, Paragraph } = Typography;

export default function EventDetailPage() {
  const { id } = useParams();
  const { events } = useEvents();
  const { user, registerEvent } = useAuth();
  const navigate = useNavigate();

  const event = events.find((e) => e.id === Number(id));

  if (!event) {
    return <h2>Event not found</h2>;
  }

  const alreadyRegistered = user?.registeredEvents?.includes(event.id) ?? false;

  const handleRegister = () => {
    if (!user) {
      message.warning("Please login to register.");
      navigate("/login");
      return;
    }
    if (alreadyRegistered) {
      message.info("You are already registered.");
      return;
    }
    registerEvent(event.id);
    message.success("Successfully registered!");
  };

  return (
    <Card title={event.title} style={{ maxWidth: 800, margin: "2rem auto" }}>
      <Paragraph>{event.description}</Paragraph>
      <p><strong>📍 Location:</strong> {event.location}</p>
      {event.date ? (
        <p><strong>📅 Date:</strong> {event.date}</p>
      ) : (
        <p><strong>📅 Date:</strong> {event.startDate} → {event.endDate}</p>
      )}
      <p><strong>⏰ Time:</strong> {event.startTime} - {event.endTime}</p>
      <p><strong>👤 Organizer:</strong> {event.organizer}</p>

      {alreadyRegistered ? (
        <Button type="primary" disabled>
          ✅ You are registered
        </Button>
      ) : (
        <Button type="primary" onClick={handleRegister}>
          Register Now
        </Button>
      )}
    </Card>
  );
}
