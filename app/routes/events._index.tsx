import { useEvents } from "../context/EventContext";
import { Card, Row, Col, Typography } from "antd";
import { Link } from "react-router";

const { Title, Paragraph } = Typography;

export default function EventsPage() {
  const { events } = useEvents();

  return (
    <div>
      <Title level={2}>📅 All Events</Title>
      <Row gutter={[16, 16]}>
        {events.length === 0 && <p>No events available.</p>}
        {events.map((event) => (
          <Col span={8} key={event.id}>
            <Card
              title={event.title}
              bordered={false}
              extra={<Link to={`/events/${event.id}`}>View Details</Link>}
            >
              <Paragraph ellipsis={{ rows: 2 }}>
                {event.description}
              </Paragraph>
              <p><strong>📍 {event.location}</strong></p>
            </Card>
          </Col>
        ))}
      </Row>
    </div>
  );
}
