import { Card, Typography, Table, Tag } from "antd";
import { Navigate } from "react-router";
import { useAuth } from "../context/AuthContext";
import { useEvents } from "../context/EventContext";

const { Title } = Typography;

export default function AdminEventsRejectedPage() {
  const { user } = useAuth();
  const { events } = useEvents();
  if (!user || user.role !== "admin") return <Navigate to="/login" replace />;

  const rejected = events.filter(e => e.status === 'rejected');

  const columns = [
    { title: 'Event', dataIndex: 'title', key: 'title' },
    { title: 'Organizer', dataIndex: 'organizer', key: 'organizer' },
    { title: 'Date', key: 'date', render: (_: any, r: any) => `${r.startDate || ''}${r.endDate ? ' - ' + r.endDate : ''}` },
    { title: 'Status', dataIndex: 'status', key: 'status', render: () => (<Tag color="red">Rejected</Tag>) },
  ];

  return (
    <div className="p-6">
      <div style={{ marginBottom: 16 }}>
        <Title level={2} style={{ margin: 0 }}>Rejected Events</Title>
      </div>
      <Card title="Rejected" className="shadow-lg border-0">
        <Table dataSource={rejected} columns={columns as any} rowKey="id" pagination={{ pageSize: 10 }} />
      </Card>
    </div>
  );
}
