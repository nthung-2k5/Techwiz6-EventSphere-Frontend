import { Card, Row, Col, Typography, Statistic, List, Avatar } from "antd";
import { Navigate, Link } from "react-router";
import { useAuth } from "../context/AuthContext";
import { useEvents } from "../context/EventContext";
import { CalendarOutlined, TeamOutlined, PictureOutlined, NotificationOutlined } from "@ant-design/icons";

const { Title, Text } = Typography;

export default function OrganizerDashboardPage() {
  const { user } = useAuth();
  const { events } = useEvents();

  if (!user || user.role !== "organizer") return <Navigate to="/login" replace />;

  const myEvents = events.filter(e => e.organizer === user.fullName || e.organizer === user.username);
  const upcoming = myEvents.filter(e => !e.endDate || new Date(e.endDate) >= new Date());

  return (
    <div className="p-6">
      <div style={{ marginBottom: 16 }}>
        <Title level={2} style={{ margin: 0 }}>Organizer Dashboard</Title>
        <Text type="secondary">Overview of your events and quick actions</Text>
      </div>

      <Row gutter={[16, 16]}>
        <Col xs={24} sm={12} lg={6}>
          <Card><Statistic title="My Events" value={myEvents.length} prefix={<CalendarOutlined />} /></Card>
        </Col>
        <Col xs={24} sm={12} lg={6}>
          <Card><Statistic title="Upcoming" value={upcoming.length} prefix={<CalendarOutlined />} /></Card>
        </Col>
        <Col xs={24} sm={12} lg={6}>
          <Card><Statistic title="Media Items" value={0} prefix={<PictureOutlined />} /></Card>
        </Col>
        <Col xs={24} sm={12} lg={6}>
          <Card><Statistic title="Registrations" value={myEvents.reduce((s,e)=>s+(e.currentParticipants||0),0)} prefix={<TeamOutlined />} /></Card>
        </Col>
      </Row>

      <Card title="Quick Links" className="shadow-lg border-0 mt-6">
        <Row gutter={[12,12]}>
          <Col xs={24} sm={12} md={6}><Link to="/organizer/events">📋 Events Overview</Link></Col>
          <Col xs={24} sm={12} md={6}><Link to="/organizer/event/create">➕ Create Event</Link></Col>
          <Col xs={24} sm={12} md={6}><Link to="/organizer/registrations">👥 Registrations</Link></Col>
          <Col xs={24} sm={12} md={6}><Link to="/organizer/media/upload">🖼️ Upload Media</Link></Col>
        </Row>
      </Card>

      <Card title="Recent Events" className="shadow-lg border-0 mt-6">
        <List
          dataSource={myEvents.slice(0,5)}
          renderItem={(ev) => (
            <List.Item actions={[<Link to={`/events/${ev.id}`}>View</Link>, <Link to={`/organizer/event/edit?id=${ev.id}`}>Edit</Link>]}> 
              <List.Item.Meta title={ev.title} description={`${ev.startDate || ''} ${ev.endDate ? '→ '+ev.endDate:''}`} avatar={<Avatar icon={<CalendarOutlined />} />} />
            </List.Item>
          )}
        />
      </Card>
    </div>
  );
}
