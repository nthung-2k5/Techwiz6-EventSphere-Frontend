import { useParams, useNavigate } from "react-router";
import type { Route } from "./+types/events.$id";
import { Card, Button, message, Typography, Tag, Space, Row, Col, Descriptions } from "antd";
import { useEvents } from "../context/EventContext";
import { useAuth } from "../context/AuthContext";
import {
  EnvironmentOutlined,
  CalendarOutlined,
  ClockCircleOutlined,
  UserOutlined,
  TeamOutlined,
} from '@ant-design/icons';

const { Title, Paragraph } = Typography;

export default function EventDetailPage({ params }: Route.ComponentProps) {
  const { id } = params;
  const { events } = useEvents();
  const { user, registerEvent } = useAuth();
  const navigate = useNavigate();

  const event = events.find((e) => e.id === Number(id));

  if (!event) {
    return (
      <div style={{ textAlign: "center", padding: "2rem" }}>
        <Title level={2}>Event not found</Title>
        <Button type="primary" onClick={() => navigate("/events")}>
          Back to Events
        </Button>
      </div>
    );
  }

  const isRegistered = user?.registeredEvents?.includes(event.id);

  const handleRegister = () => {
    if (!user) {
      message.warning("Please login to register for this event");
      localStorage.setItem("redirectAfterLogin", window.location.pathname);
      navigate("/login");
      return;
    }

    if (user.role === "organizer") {
      message.info("Organizers cannot register for events");
      return;
    }

    if (isRegistered) {
      message.info("You are already registered for this event");
      return;
    }

    registerEvent(event.id);
    message.success("Successfully registered for the event!");
  };

  return (
    <div style={{ padding: "2rem" }}>
      <Row gutter={[24, 24]}>
        {/* Main Event Information */}
        <Col xs={24} xl={16}>
          <Card
            style={{ height: "100%" }}
            title={
              <div>
                <Title level={2} style={{ margin: 0 }}>{event.title}</Title>
                {user?.role === "participant" && (
                  <Tag 
                    color={isRegistered ? "success" : "processing"} 
                    style={{ fontSize: '14px', padding: '4px 12px', marginTop: '8px' }}
                  >
                    {isRegistered ? "✓ Registered" : "Open for Registration"}
                  </Tag>
                )}
              </div>
            }
          >
            {/* Event Description */}
            <div style={{ marginBottom: "24px" }}>
              <Title level={4}>About this Event</Title>
              <Paragraph style={{ fontSize: '16px' }}>
                {event.description}
              </Paragraph>
            </div>

            {/* Event Details */}
            <Descriptions 
              title="Event Details" 
              bordered 
              column={{ xs: 1, sm: 2 }}
            >
              <Descriptions.Item 
                label={<Space><EnvironmentOutlined /> Location</Space>}
                span={2}
              >
                {event.location}
              </Descriptions.Item>
              
              <Descriptions.Item 
                label={<Space><CalendarOutlined /> Date</Space>}
              >
                {event.date || `${event.startDate} → ${event.endDate}`}
              </Descriptions.Item>
              
              <Descriptions.Item 
                label={<Space><ClockCircleOutlined /> Time</Space>}
              >
                {event.startTime} - {event.endTime}
              </Descriptions.Item>
              
              <Descriptions.Item 
                label={<Space><UserOutlined /> Organizer</Space>}
              >
                {event.organizer}
              </Descriptions.Item>
              
              <Descriptions.Item 
                label={<Space><TeamOutlined /> Status</Space>}
              >
                {isRegistered ? 
                  <Tag color="success">You are registered</Tag> : 
                  <Tag color="processing">Open for registration</Tag>
                }
              </Descriptions.Item>
            </Descriptions>
          </Card>
        </Col>

        {/* Registration Section */}
        <Col xs={24} xl={8}>
          <Card>
            <Title level={3}>Registration</Title>
            
            {!user && (
              <Paragraph>
                Please login to register for this event.
              </Paragraph>
            )}

            {user?.role === "organizer" && (
              <Paragraph type="warning">
                Organizers cannot register for events.
              </Paragraph>
            )}

            {isRegistered ? (
              <>
                <Button type="primary" size="large" block disabled>
                  ✓ You are Registered
                </Button>
                <Paragraph type="success" style={{ marginTop: '8px', textAlign: 'center' }}>
                  You have successfully registered for this event!
                </Paragraph>
              </>
            ) : (
              <Button 
                type="primary" 
                size="large" 
                block
                onClick={handleRegister}
                disabled={user?.role === "organizer"}
                style={{ marginBottom: '16px' }}
              >
                Register Now
              </Button>
            )}

            {/* Quick Links */}
            {!user && (
              <Space direction="vertical" style={{ width: "100%", marginTop: '16px' }}>
                <Button type="link" block onClick={() => navigate("/login")}>
                  Login to Register
                </Button>
                <Button type="link" block onClick={() => navigate("/register")}>
                  Create New Account
                </Button>
              </Space>
            )}
          </Card>
        </Col>
      </Row>
    </div>
  );
}
