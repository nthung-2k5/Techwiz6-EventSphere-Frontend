import { Card, Typography, Table, Tag, Space, Button, Alert } from "antd";
import { Navigate } from "react-router";
import { useAuth } from "../context/AuthContext";
import { useEvents } from "../context/EventContext";

const { Title } = Typography;

export default function AdminEventsApprovalPage() {
  const { user } = useAuth();
  const { events, approveEvent, rejectEvent } = useEvents();
  if (!user || user.role !== "admin") return <Navigate to="/login" replace />;

  const columns = [
    {
      title: 'Event',
      dataIndex: 'title',
      key: 'title',
      render: (text: string, record: any) => (
        <div>
          <div style={{ fontWeight: 600 }}>{text}</div>
          <div style={{ fontSize: '12px', color: '#666' }}>{record.startDate} - {record.organizer}</div>
        </div>
      )
    },
    {
      title: 'Status',
      dataIndex: 'status',
      key: 'status',
      render: (status: string) => (
        <Tag color={status === 'approved' ? 'green' : status === 'pending' ? 'orange' : 'red'}>
          {status === 'approved' ? 'Approved' : status === 'pending' ? 'Pending' : 'Rejected'}
        </Tag>
      )
    },
    {
      title: 'Actions',
      key: 'actions',
      render: (record: any) => (
        <Space>
          {record.status === 'pending' && (
            <>
              <Button size="small" type="primary" onClick={() => approveEvent(record.id)}>Approve</Button>
              <Button size="small" danger onClick={() => rejectEvent(record.id)}>Reject</Button>
            </>
          )}
        </Space>
      )
    }
  ];

  const pending = events.filter(e => e.status === 'pending');

  return (
    <div className="p-6">
      <div style={{ marginBottom: 16 }}>
        <Title level={2} style={{ margin: 0 }}>Event Approvals</Title>
      </div>
      {pending.length > 0 && (
        <Alert type="warning" showIcon style={{ marginBottom: 16 }} message={`There are ${pending.length} events pending approval`} />
      )}
      <Card title="Approval Queue" className="shadow-lg border-0">
        <Table dataSource={events} columns={columns as any} rowKey="id" pagination={{ pageSize: 10 }} />
      </Card>
    </div>
  );
}
