import { Card, Typography, Table, Tag, Button, Space } from "antd";
import { Navigate } from "react-router";
import { useAuth } from "../context/AuthContext";

const { Title } = Typography;

export default function AdminUserStatusPage() {
  const { user, users, toggleUserStatus } = useAuth();
  if (!user || user.role !== "admin") return <Navigate to="/login" replace />;

  const columns = [
    { title: 'User', dataIndex: 'fullName', key: 'fullName', render: (t: string, r: any) => (<span><b>{t || r.username}</b> <span style={{ color: '#888' }}>({r.email})</span></span>) },
    { title: 'Role', dataIndex: 'role', key: 'role' },
    { title: 'Status', dataIndex: 'isActive', key: 'isActive', render: (v: boolean) => (<Tag color={v ? 'green' : 'red'}>{v ? 'Active' : 'Inactive'}</Tag>) },
    { title: 'Actions', key: 'actions', render: (r: any) => (
      <Space>
        <Button size="small" onClick={() => toggleUserStatus(r.username)}>{r.isActive ? 'Deactivate' : 'Activate'}</Button>
      </Space>
    ) },
  ];

  return (
    <div className="p-6">
      <div style={{ marginBottom: 16 }}>
        <Title level={2} style={{ margin: 0 }}>Account Status</Title>
      </div>
      <Card title="Users" className="shadow-lg border-0">
        <Table dataSource={users} columns={columns as any} rowKey="username" pagination={{ pageSize: 10 }} />
      </Card>
    </div>
  );
}
