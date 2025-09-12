import { Card, Typography, Table, Tag, Space, Avatar, Button, Row, Col, Statistic, Tabs } from "antd";
import { Navigate } from "react-router";
import { useAuth } from "../context/AuthContext";
import { UserOutlined, ExclamationCircleOutlined, SafetyOutlined, TeamOutlined } from "@ant-design/icons";
import { useEffect, useMemo, useState } from "react";

const { Title } = Typography;

export default function AdminUsersPage() {
  const { user, users, toggleUserStatus, updateUserRole } = useAuth();
  if (!user || user.role !== "admin") return <Navigate to="/login" replace />;

  const activeUsers = users.filter(u => u.isActive);
  const inactiveUsers = users.filter(u => !u.isActive);
  const organizers = users.filter(u => u.role === 'organizer');
  const participants = users.filter(u => u.role === 'participant');

  const columns = [
    {
      title: 'User',
      dataIndex: 'fullName',
      key: 'fullName',
      render: (text: string, record: any) => (
        <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
          <Avatar src={record.avatar} icon={<UserOutlined />} />
          <div>
            <div style={{ fontWeight: 600 }}>{text || record.username}</div>
            <div style={{ fontSize: '12px', color: '#666' }}>{record.email}</div>
          </div>
        </div>
      ),
    },
    {
      title: 'Role',
      dataIndex: 'role',
      key: 'role',
      render: (role: string) => (
        <Tag color={role === 'admin' ? 'red' : role === 'organizer' ? 'blue' : 'green'}>
          {role === 'admin' ? 'Administrator' : role === 'organizer' ? 'Organizer' : 'Student'}
        </Tag>
      ),
    },
    {
      title: 'Department',
      dataIndex: 'department',
      key: 'department',
    },
    {
      title: 'Status',
      dataIndex: 'isActive',
      key: 'isActive',
      render: (isActive: boolean) => (
        <Tag color={isActive ? 'green' : 'red'}>
          {isActive ? 'Active' : 'Inactive'}
        </Tag>
      ),
    },
    {
      title: 'Actions',
      key: 'actions',
      render: (record: any) => (
        <Space>
          <Button size="small" onClick={() => toggleUserStatus(record.username)}>
            {record.isActive ? 'Deactivate' : 'Activate'}
          </Button>
        </Space>
      ),
    },
  ];

  const roleColumns = [
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
          <Button size="small" onClick={() => updateUserRole(record.username, 'participant')}>Student</Button>
          <Button size="small" onClick={() => updateUserRole(record.username, 'organizer')}>Organizer</Button>
          <Button size="small" danger onClick={() => updateUserRole(record.username, 'admin')}>Admin</Button>
        </Space>
      ),
    },
  ];

  const statusColumns = [
    { title: 'User', dataIndex: 'fullName', key: 'fullName', render: (t: string, r: any) => (<span><b>{t || r.username}</b> <span style={{ color: '#888' }}>({r.email})</span></span>) },
    { title: 'Role', dataIndex: 'role', key: 'role' },
    { title: 'Status', dataIndex: 'isActive', key: 'isActive', render: (v: boolean) => (<Tag color={v ? 'green' : 'red'}>{v ? 'Active' : 'Inactive'}</Tag>) },
    { title: 'Actions', key: 'actions', render: (r: any) => (
      <Space>
        <Button size="small" onClick={() => toggleUserStatus(r.username)}>{r.isActive ? 'Deactivate' : 'Activate'}</Button>
      </Space>
    ) },
  ];

  const [activeKey, setActiveKey] = useState<string>(() => {
    const hash = typeof window !== 'undefined' ? window.location.hash.replace('#', '') : '';
    return hash || 'list';
  });

  useEffect(() => {
    const onHashChange = () => setActiveKey(window.location.hash.replace('#', '') || 'list');
    window.addEventListener('hashchange', onHashChange);
    return () => window.removeEventListener('hashchange', onHashChange);
  }, []);

  return (
    <div className="p-6">
      <div style={{ marginBottom: 16 }}>
        <Title level={2} style={{ margin: 0 }}>User Management</Title>
      </div>
      <Tabs
        activeKey={activeKey}
        onChange={(k) => {
          setActiveKey(k);
          if (typeof window !== 'undefined') {
            window.location.hash = k;
          }
        }}
        items={[
          {
            key: 'list',
            label: 'User List',
            children: (
              <>
                <Row gutter={[16, 16]} style={{ marginBottom: 16 }}>
                  <Col xs={24} sm={12} lg={6}>
                    <Card>
                      <Statistic title="Total Users" value={users.length} prefix={<TeamOutlined />} />
                    </Card>
                  </Col>
                  <Col xs={24} sm={12} lg={6}>
                    <Card>
                      <Statistic title="Participants" value={participants.length} prefix={<UserOutlined />} />
                    </Card>
                  </Col>
                  <Col xs={24} sm={12} lg={6}>
                    <Card>
                      <Statistic title="Organizers" value={organizers.length} prefix={<SafetyOutlined />} />
                    </Card>
                  </Col>
                  <Col xs={24} sm={12} lg={6}>
                    <Card>
                      <Statistic title="Inactive" value={inactiveUsers.length} prefix={<ExclamationCircleOutlined />} />
                    </Card>
                  </Col>
                </Row>
                <Card title="User List" className="shadow-lg border-0">
                  <Table dataSource={users} columns={columns as any} rowKey="username" pagination={{ pageSize: 10 }} />
                </Card>
              </>
            )
          },
          {
            key: 'roles',
            label: 'Roles',
            children: (
              <Card title="Assign Roles" className="shadow-lg border-0">
                <Table dataSource={users} columns={roleColumns as any} rowKey="username" pagination={{ pageSize: 10 }} />
              </Card>
            )
          },
          {
            key: 'status',
            label: 'Account Status',
            children: (
              <Card title="Users" className="shadow-lg border-0">
                <Table dataSource={users} columns={statusColumns as any} rowKey="username" pagination={{ pageSize: 10 }} />
              </Card>
            )
          }
        ]}
      />
    </div>
  );
}
