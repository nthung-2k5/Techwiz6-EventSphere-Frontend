import { Card, Row, Col, Typography, Button, Alert, Divider, Empty } from "antd";
import { Link } from "react-router";
import { useEvents } from "../context/EventContext";

const { Title, Paragraph } = Typography;

export default function HomePage() {
  const { events } = useEvents();

  // Get hot and latest events
  const hotEvents = events.slice(0, 2);
  const latestEvents = events.slice(-3);

  return (
    <div style={{ padding: "2rem" }}>
      {/* Banner nhỏ */}
      <Alert
        message="🎉 Welcome to EventSphere"
        description="Discover and join the hottest and newest events at your university!"
        type="info"
        showIcon
        style={{ marginBottom: "2rem" }}
      />

      {/* Hot Events */}
      <Title level={2}>🔥 Hot Events</Title>
      <Row gutter={[16, 16]}>
        {hotEvents.map((event) => (
          <Col span={12} key={event.id}>
            <Card
              title={event.title}
              bordered={false}
              hoverable
              extra={<Link to={`/events/${event.id}`}>View Details</Link>}
            >
              <Paragraph ellipsis={{ rows: 2 }}>
                {event.description}
              </Paragraph>
              <p><strong>📍 {event.location}</strong></p>
              {event.date ? (
                <p>Date: {event.date}</p>
              ) : (
                <p>Date: {event.startDate} → {event.endDate}</p>
              )}
              <p>Time: {event.startTime} - {event.endTime}</p>
              <p>Organizer: {event.organizer}</p>
            </Card>
          </Col>
        ))}
      </Row>

      {/* Latest Events */}
      <Title level={2} style={{ marginTop: "2rem" }}>
        🆕 Latest Events
      </Title>
      <Row gutter={[16, 16]}>
        {latestEvents.map((event) => (
          <Col span={8} key={event.id}>
            <Card
              title={event.title}
              bordered={false}
              hoverable
              extra={<Link to={`/events/${event.id}`}>View Details</Link>}
            >
              <Paragraph ellipsis={{ rows: 2 }}>
                {event.description}
              </Paragraph>
              <p><strong>📍 {event.location}</strong></p>
              {event.date ? (
                <p>Date: {event.date}</p>
              ) : (
                <p>Date: {event.startDate} → {event.endDate}</p>
              )}
              <p>Time: {event.startTime} - {event.endTime}</p>
              <p>Organizer: {event.organizer}</p>
            </Card>
          </Col>
        ))}
      </Row>

      {/* All Events */}
      <Title level={2} style={{ marginTop: "2rem" }}>
        📅 All Events
      </Title>
      {events.length === 0 ? (
        <Empty description="No events available." />
      ) : (
        <Row gutter={[16, 16]}>
          {events.map((event) => (
            <Col xs={24} sm={12} md={8} lg={8} xl={6} key={event.id}>
              <Card
                title={event.title}
                bordered={false}
                hoverable
                extra={<Link to={`/events/${event.id}`}>View Details</Link>}
              >
                <Paragraph ellipsis={{ rows: 2 }}>
                  {event.description}
                </Paragraph>
                <p><strong>📍 {event.location}</strong></p>
                {event.date ? (
                  <p>Date: {event.date}</p>
                ) : (
                  <p>Date: {event.startDate} → {event.endDate}</p>
                )}
                <p>Time: {event.startTime} - {event.endTime}</p>
                <p>Organizer: {event.organizer}</p>
              </Card>
            </Col>
          ))}
        </Row>
      )}
    </div>
  );
}
