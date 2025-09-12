import { Card, Typography, Table, Tag, Tabs, Space, Button } from "antd";
import { Navigate } from "react-router";
import { useAuth } from "../context/AuthContext";
import { useEvents } from "../context/EventContext";

const { Title } = Typography;

export default function AdminEventsPage() {
  const { user } = useAuth();
  const { events, approveEvent, rejectEvent } = useEvents();
  if (!user || user.role !== "admin") return <Navigate to="/login" replace />;

  const columns = [
    {
      title: 'Event',
      dataIndex: 'title',
      key: 'title',
    },
    {
      title: 'Organizer',
      dataIndex: 'organizer',
      key: 'organizer',
    },
    {
      title: 'Date',
      key: 'date',
      render: (_: any, r: any) => `${r.startDate || ''}${r.endDate ? ' - ' + r.endDate : ''}`,
    },
    {
      title: 'Status',
      dataIndex: 'status',
      key: 'status',
      render: (status: string) => (
        <Tag color={status === 'approved' ? 'green' : status === 'pending' ? 'orange' : 'red'}>
          {status === 'approved' ? 'Approved' : status === 'pending' ? 'Pending' : 'Rejected'}
        </Tag>
      ),
    },
  ];

  return (
    <div className="p-6">
      <div style={{ marginBottom: 16 }}>
        <Title level={2} style={{ margin: 0 }}>Event Management</Title>
      </div>
      <Tabs
        items={[
          {
            key: 'all',
            label: 'All Events',
            children: (
              <Card title="Events" className="shadow-lg border-0">
                <Table dataSource={events} columns={columns as any} rowKey="id" pagination={{ pageSize: 10 }} />
              </Card>
            )
          },
          {
            key: 'approvals',
            label: 'Approvals',
            children: (
              <Card title="Approval Queue" className="shadow-lg border-0">
                <Table
                  dataSource={events}
                  rowKey="id"
                  pagination={{ pageSize: 10 }}
                  columns={[
                    {
                      title: 'Event',
                      dataIndex: 'title',
                      key: 'title',
                    },
                    {
                      title: 'Status',
                      dataIndex: 'status',
                      key: 'status',
                      render: (status: string) => (
                        <Tag color={status === 'approved' ? 'green' : status === 'pending' ? 'orange' : 'red'}>
                          {status === 'approved' ? 'Approved' : status === 'pending' ? 'Pending' : 'Rejected'}
                        </Tag>
                      ),
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
                      ),
                    },
                  ] as any}
                />
              </Card>
            )
          },
          {
            key: 'rejected',
            label: 'Rejected',
            children: (
              <Card title="Rejected Events" className="shadow-lg border-0">
                <Table
                  dataSource={events.filter(e => e.status === 'rejected')}
                  columns={columns as any}
                  rowKey="id"
                  pagination={{ pageSize: 10 }}
                />
              </Card>
            )
          }
        ]}
      />
    </div>
  );
}
