import { useAuth } from "../context/AuthContext";
import { useEvents } from "../context/EventContext";
import { List, Card, Typography, Empty, Row, Col } from "antd";

const { Title } = Typography;

export default function DashboardPage() {
  const { user } = useAuth();
  const { events } = useEvents();

    if (!user) {
        return <h2>You must login to access the dashboard.</h2>;
    }

  // Nếu participant → hiển thị tất cả events
  if (user.role === "participant") {
    return (
      <div style={{ padding: "1rem" }}>
        <Title level={2}>Participant Dashboard</Title>
        <p>Welcome, {user.username}!</p>

        <Title level={4} style={{ marginTop: "1.5rem" }}>Available Events</Title>
        {events.length === 0 ? (
          <Empty 
            description="No events are currently available."
            image={Empty.PRESENTED_IMAGE_SIMPLE}
          />
        ) : (
          <List
            grid={{ 
              gutter: 16,
              xs: 1,
              sm: 1,
              md: 2,
              lg: 2,
              xl: 3,
              xxl: 3,
            }}
            dataSource={events}
            renderItem={(event) => (
              <List.Item>
                <Card title={event.title} hoverable>
                  <p>{event.description}</p>
                  <p>Location: {event.location}</p>
                  {event.date ? (
                    <p>Date: {event.date}</p>
                  ) : (
                    <p>Date: {event.startDate} → {event.endDate}</p>
                  )}
                  <p>Time: {event.startTime} - {event.endTime}</p>
                  <p>Organizer: {event.organizer}</p>
                </Card>
              </List.Item>
            )}
          />
        )}
      </div>
    );
  }

  // Nếu organizer → chỉ hiển thị event do mình tạo
  if (user.role === "organizer") {
    const myEvents = events.filter((e) => e.organizer === user.username);

    return (
      <div style={{ padding: "1rem" }}>
        <Title level={2}>Organizer Dashboard</Title>
        <p>Welcome, {user.username}!</p>

        <Title level={4} style={{ marginTop: "1.5rem" }}>My Events</Title>
        {myEvents.length === 0 ? (
          <Empty
            description={
              <span>
                You haven't created any events yet.
                <br />
                <a href="/event/create" style={{ color: '#1890ff' }}>Create your first event</a>
              </span>
            }
            image={Empty.PRESENTED_IMAGE_SIMPLE}
          />
        ) : (
          <List
            grid={{ 
              gutter: 16,
              xs: 1,
              sm: 1,
              md: 2,
              lg: 2,
              xl: 3,
              xxl: 3,
            }}
            dataSource={myEvents}
            renderItem={(event) => (
              <List.Item>
                <Card 
                  title={event.title} 
                  hoverable
                  extra={<a href={`/events/${event.id}`}>Manage</a>}
                >
                  <p>{event.description}</p>
                  <p>Location: {event.location}</p>
                  {event.date ? (
                    <p>Date: {event.date}</p>
                  ) : (
                    <p>Date: {event.startDate} → {event.endDate}</p>
                  )}
                  <p>Time: {event.startTime} - {event.endTime}</p>
                </Card>
              </List.Item>
            )}
          />
        )}
      </div>
    );
  }

  return <h2>Dashboard</h2>;
}
