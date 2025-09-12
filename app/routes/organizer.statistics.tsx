import { Card, Typography, Row, Col, Statistic, Progress } from "antd";
import { Navigate } from "react-router";
import { useAuth } from "../context/AuthContext";
import { useEvents } from "../context/EventContext";
import { BarChartOutlined, TeamOutlined, CalendarOutlined } from "@ant-design/icons";

const { Title, Text } = Typography;

export default function OrganizerStatisticsPage() {
  const { user } = useAuth();
  const { events } = useEvents();
  if (!user || user.role !== "organizer") return <Navigate to="/login" replace />;

  const myEvents = events.filter(e => e.organizer === user.fullName || e.organizer === user.username);
  const totalRegs = myEvents.reduce((s, e) => s + (e.currentParticipants || 0), 0);
  const approved = myEvents.filter(e => e.status === 'approved').length;
  const pending = myEvents.filter(e => e.status === 'pending').length;

  return (
    <div className="p-6">
      <div style={{ marginBottom: 16 }}>
        <Title level={2} style={{ margin: 0 }}>Statistics</Title>
        <Text type="secondary">Overview of your events performance</Text>
      </div>

      <Row gutter={[16, 16]} style={{ marginBottom: 16 }}>
        <Col xs={24} sm={12} lg={6}><Card><Statistic title="My Events" value={myEvents.length} prefix={<CalendarOutlined />} /></Card></Col>
        <Col xs={24} sm={12} lg={6}><Card><Statistic title="Registrations" value={totalRegs} prefix={<TeamOutlined />} /></Card></Col>
        <Col xs={24} sm={12} lg={6}><Card><Statistic title="Approved" value={approved} /></Card></Col>
        <Col xs={24} sm={12} lg={6}><Card><Statistic title="Pending" value={pending} /></Card></Col>
      </Row>

      <Row gutter={[16, 16]}>
        <Col xs={24} md={12}>
          <Card title="Approval Ratio">
            <Progress type="circle" percent={myEvents.length ? Math.round((approved / myEvents.length) * 100) : 0} />
          </Card>
        </Col>
        <Col xs={24} md={12}>
          <Card title="Pending Ratio">
            <Progress type="circle" percent={myEvents.length ? Math.round((pending / myEvents.length) * 100) : 0} status="exception" />
          </Card>
        </Col>
      </Row>
    </div>
  );
}
