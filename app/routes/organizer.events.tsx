import { Card, Typography, Table, Space, Button, Tag } from "antd";
import { Navigate, Link } from "react-router";
import { useAuth } from "../context/AuthContext";
import { useEvents } from "../context/EventContext";

const { Title } = Typography;

export default function OrganizerEventsPage() {
  const { user } = useAuth();
  const { events } = useEvents();
  if (!user || user.role !== "organizer") return <Navigate to="/login" replace />;

  const myEvents = events.filter(e => e.organizer === user.fullName || e.organizer === user.username);

  const columns = [
    { title: 'Title', dataIndex: 'title', key: 'title' },
    { title: 'Date', key: 'date', render: (_: any, r: any) => `${r.startDate || ''}${r.endDate ? ' - ' + r.endDate : ''}` },
    { title: 'Status', dataIndex: 'status', key: 'status', render: (s: string) => (
        <Tag color={s === 'approved' ? 'green' : s === 'pending' ? 'orange' : 'red'}>{s}</Tag>
      )
    },
    { title: 'Participants', key: 'participants', render: (_: any, r: any) => `${r.currentParticipants || 0}/${r.maxParticipants || '-'}` },
    { title: 'Actions', key: 'actions', render: (_: any, r: any) => (
        <Space>
          <Link to={`/events/${r.id}`}><Button size="small">View</Button></Link>
          <Link to={`/organizer/event/edit?id=${r.id}`}><Button size="small" type="primary">Edit</Button></Link>
        </Space>
      )
    }
  ];

  return (
    <div className="p-6">
      <div style={{ marginBottom: 16 }}>
        <Title level={2} style={{ margin: 0 }}>My Events</Title>
      </div>
      <Card className="shadow-lg border-0">
        <Table dataSource={myEvents} columns={columns as any} rowKey="id" pagination={{ pageSize: 10 }} />
      </Card>
    </div>
  );
}
