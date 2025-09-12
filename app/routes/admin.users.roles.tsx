import { Card, Typography, Table, Tag, Space, Button } from "antd";
import { Navigate } from "react-router";
import { useAuth, type UserRole } from "../context/AuthContext";

const { Title } = Typography;

export default function AdminUserRolesPage() {
  const { user, users, updateUserRole } = useAuth();
  if (!user || user.role !== "admin") return <Navigate to="/login" replace />;

  const setRole = (username: string, role: UserRole) => updateUserRole(username, role);

  const columns = [
    {
      title: 'User',
      dataIndex: 'fullName',
      key: 'fullName',
      render: (text: string, record: any) => (
        <span><b>{text || record.username}</b> <span style={{ color: '#888' }}>({record.email})</span></span>
      ),
    },
    {
      title: 'Current Role',
      dataIndex: 'role',
      key: 'role',
      render: (role: string) => (
        <Tag color={role === 'admin' ? 'red' : role === 'organizer' ? 'blue' : 'green'}>
          {role === 'admin' ? 'Administrator' : role === 'organizer' ? 'Organizer' : 'Student'}
        </Tag>
      ),
    },
    {
      title: 'Set Role',
      key: 'setRole',
      render: (record: any) => (
        <Space>
          <Button size="small" onClick={() => setRole(record.username, 'participant')}>Student</Button>
          <Button size="small" onClick={() => setRole(record.username, 'organizer')}>Organizer</Button>
          <Button size="small" danger onClick={() => setRole(record.username, 'admin')}>Admin</Button>
        </Space>
      ),
    },
  ];

  return (
    <div className="p-6">
      <div style={{ marginBottom: 16 }}>
        <Title level={2} style={{ margin: 0 }}>Roles</Title>
      </div>
      <Card title="Assign Roles" className="shadow-lg border-0">
        <Table dataSource={users} columns={columns as any} rowKey="username" pagination={{ pageSize: 10 }} />
      </Card>
    </div>
  );
}
