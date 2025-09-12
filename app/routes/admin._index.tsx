import { Card, Row, Col, Typography, Statistic, Button, Space, Table, Tag, Avatar, Progress, Badge, Tabs, List, Alert, Divider } from "antd";
import { useAuth } from "../context/AuthContext";
import { useEvents } from "../context/EventContext";
import { Navigate, Link } from "react-router";
import { useState } from "react";
import {
    UserOutlined,
    CalendarOutlined,
    ClockCircleOutlined,
    TrophyOutlined,
    SettingOutlined,
    TeamOutlined,
    SafetyOutlined,
    CheckCircleOutlined,
    EyeOutlined,
    DeleteOutlined,
    EditOutlined,
    MessageOutlined,
    PictureOutlined,
    SecurityScanOutlined,
    NotificationOutlined,
    BarChartOutlined,
    ExclamationCircleOutlined,
    RiseOutlined,
    FallOutlined,
    CrownOutlined,
    BellOutlined,
    FileTextOutlined,
    GlobalOutlined
} from "@ant-design/icons";

const { Title, Text } = Typography;
const { TabPane } = Tabs;

export default function AdminDashboard() {
    const { user, users, updateUserRole, toggleUserStatus } = useAuth();
    const { events, approveEvent, rejectEvent } = useEvents();
    const [activeTab, setActiveTab] = useState('overview');

    if (!user || user.role !== "admin") {
        return <Navigate to="/login" replace />;
    }

    // Statistics calculations
    const pendingEvents = events.filter(event => event.status === 'pending');
    const approvedEvents = events.filter(event => event.status === 'approved');
    const rejectedEvents = events.filter(event => event.status === 'rejected');
    const totalRegistrations = events.reduce((sum, event) => sum + event.currentParticipants, 0);
    
    const activeUsers = users.filter(u => u.isActive);
    const inactiveUsers = users.filter(u => !u.isActive);
    const organizers = users.filter(u => u.role === 'organizer');
    const participants = users.filter(u => u.role === 'participant');

    // Recent activities mock data
    const recentActivities = [
        { id: 1, type: 'user_register', message: 'New user registered: Emma Taylor', time: '2 minutes ago', icon: <UserOutlined /> },
        { id: 2, type: 'event_pending', message: 'New event pending approval: Gaming Tournament', time: '15 minutes ago', icon: <ClockCircleOutlined /> },
        { id: 3, type: 'event_approved', message: 'Event approved: Data Science Bootcamp', time: '1 hour ago', icon: <CheckCircleOutlined /> },
        { id: 4, type: 'content_report', message: 'Inappropriate content reported', time: '2 hours ago', icon: <ExclamationCircleOutlined /> },
    ];

    // User management columns
    const userColumns = [
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
                    <Button size="small" type="primary">Edit</Button>
                </Space>
            ),
        },
    ];

    // Event approval columns
    const eventColumns = [
        {
            title: 'Event',
            dataIndex: 'title',
            key: 'title',
            render: (text: string, record: any) => (
                <div>
                    <div style={{ fontWeight: 600 }}>{text}</div>
                    <div style={{ fontSize: '12px', color: '#666' }}>
                        {record.startDate} - {record.organizer}
                    </div>
                </div>
            ),
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
                            <Button size="small" type="primary" onClick={() => approveEvent(record.id)}>
                                Approve
                            </Button>
                            <Button size="small" danger onClick={() => rejectEvent(record.id)}>
                                Reject
                            </Button>
                        </>
                    )}
                    <Button size="small">View Details</Button>
                </Space>
            ),
        },
    ];

    return (
        <div>
            <div style={{ marginBottom: '24px' }}>
                <Title level={2} style={{ margin: 0, color: '#1f2937' }}>
                    <CrownOutlined style={{ marginRight: '12px', color: '#00afef' }} />
                    Admin Dashboard
                </Title>
                <Text type="secondary" style={{ fontSize: '16px' }}>
                    Manage the entire system, users, and events
                </Text>
            </div>

            <Tabs activeKey={activeTab} onChange={setActiveTab} size="large">
                <TabPane tab={<span><BarChartOutlined />Overview</span>} key="overview">
                    {/* Statistics Cards */}
                    <Row gutter={[16, 16]} style={{ marginBottom: '24px' }}>
                        <Col xs={24} sm={12} lg={6}>
                            <Card>
                                <Statistic
                                    title="Total Users"
                                    value={users.length}
                                    prefix={<TeamOutlined style={{ color: '#00afef' }} />}
                                    valueStyle={{ color: '#00afef' }}
                                />
                                <Progress 
                                    percent={Math.round((activeUsers.length / users.length) * 100)} 
                                    size="small" 
                                    format={() => `${activeUsers.length} active`}
                                />
                            </Card>
                        </Col>
                        <Col xs={24} sm={12} lg={6}>
                            <Card>
                                <Statistic
                                    title="Total Events"
                                    value={events.length}
                                    prefix={<CalendarOutlined style={{ color: '#52c41a' }} />}
                                    valueStyle={{ color: '#52c41a' }}
                                />
                                <Progress 
                                    percent={Math.round((approvedEvents.length / events.length) * 100)} 
                                    size="small" 
                                    format={() => `${approvedEvents.length} approved`}
                                />
                            </Card>
                        </Col>
                        <Col xs={24} sm={12} lg={6}>
                            <Card>
                                <Statistic
                                    title="Pending Approval"
                                    value={pendingEvents.length}
                                    prefix={<ClockCircleOutlined style={{ color: '#faad14' }} />}
                                    valueStyle={{ color: '#faad14' }}
                                />
                                {pendingEvents.length > 0 && (
                                    <Badge count={pendingEvents.length} style={{ backgroundColor: '#faad14' }}>
                                        <Button size="small" type="link">View Now</Button>
                                    </Badge>
                                )}
                            </Card>
                        </Col>
                        <Col xs={24} sm={12} lg={6}>
                            <Card>
                                <Statistic
                                    title="Total Registrations"
                                    value={totalRegistrations}
                                    prefix={<TrophyOutlined style={{ color: '#f5222d' }} />}
                                    valueStyle={{ color: '#f5222d' }}
                                />
                                <div style={{ fontSize: '12px', color: '#666', marginTop: '8px' }}>
                                    <RiseOutlined /> 12% increase from last month
                                </div>
                            </Card>
                        </Col>
                    </Row>

                    {/* Quick Actions and Recent Activities */}
                    <Row gutter={[16, 16]}>
                        <Col xs={24} lg={12}>
                            <Card title="Quick Actions" extra={<SettingOutlined />}>
                                <Space direction="vertical" style={{ width: '100%' }} size="middle">
                                    <Button 
                                        type="primary" 
                                        block 
                                        icon={<UserOutlined />}
                                        onClick={() => setActiveTab('users')}
                                    >
                                        User Management
                                    </Button>
                                    <Button 
                                        block 
                                        icon={<CalendarOutlined />}
                                        onClick={() => setActiveTab('events')}
                                    >
                                        Event Approval
                                    </Button>
                                    <Button 
                                        block 
                                        icon={<SecurityScanOutlined />}
                                        onClick={() => setActiveTab('content')}
                                    >
                                        Content Moderation
                                    </Button>
                                    <Button 
                                        block 
                                        icon={<NotificationOutlined />}
                                        onClick={() => setActiveTab('notifications')}
                                    >
                                        Send System Notifications
                                    </Button>
                                </Space>
                            </Card>
                        </Col>
                        <Col xs={24} lg={12}>
                            <Card title="Recent Activities" extra={<BellOutlined />}>
                                <List
                                    dataSource={recentActivities}
                                    renderItem={item => (
                                        <List.Item>
                                            <List.Item.Meta
                                                avatar={<Avatar icon={item.icon} style={{ backgroundColor: '#00afef' }} />}
                                                title={item.message}
                                                description={item.time}
                                            />
                                        </List.Item>
                                    )}
                                />
                            </Card>
                        </Col>
                    </Row>
                </TabPane>

                <TabPane tab={<span><TeamOutlined />User Management</span>} key="users">
                    <Row gutter={[16, 16]} style={{ marginBottom: '16px' }}>
                        <Col xs={24} sm={8}>
                            <Card>
                                <Statistic title="Students" value={participants.length} prefix={<UserOutlined />} />
                            </Card>
                        </Col>
                        <Col xs={24} sm={8}>
                            <Card>
                                <Statistic title="Organizers" value={organizers.length} prefix={<SafetyOutlined />} />
                            </Card>
                        </Col>
                        <Col xs={24} sm={8}>
                            <Card>
                                <Statistic title="Inactive Accounts" value={inactiveUsers.length} prefix={<ExclamationCircleOutlined />} />
                            </Card>
                        </Col>
                    </Row>
                    <Card title="User List">
                        <Table 
                            dataSource={users} 
                            columns={userColumns} 
                            rowKey="username"
                            pagination={{ pageSize: 10 }}
                        />
                    </Card>
                </TabPane>

                <TabPane tab={<span><CalendarOutlined />Event Management</span>} key="events">
                    {pendingEvents.length > 0 && (
                        <Alert
                            message={`There are ${pendingEvents.length} events pending approval`}
                            type="warning"
                            showIcon
                            style={{ marginBottom: '16px' }}
                        />
                    )}
                    <Card title="Event Approval">
                        <Table 
                            dataSource={events} 
                            columns={eventColumns} 
                            rowKey="id"
                            pagination={{ pageSize: 10 }}
                        />
                    </Card>
                </TabPane>

                <TabPane tab={<span><SecurityScanOutlined />Content Moderation</span>} key="content">
                    <Row gutter={[16, 16]}>
                        <Col xs={24} md={8}>
                            <Card title="Event Descriptions" extra={<EditOutlined />}>
                                <List
                                    dataSource={[
                                        { title: 'AI Workshop - Needs Review', status: 'pending' },
                                        { title: 'Music Festival - Approved', status: 'approved' },
                                    ]}
                                    renderItem={item => (
                                        <List.Item>
                                            <List.Item.Meta title={item.title} />
                                            <Tag color={item.status === 'pending' ? 'orange' : 'green'}>
                                                {item.status === 'pending' ? 'Pending' : 'Approved'}
                                            </Tag>
                                        </List.Item>
                                    )}
                                />
                            </Card>
                        </Col>
                        <Col xs={24} md={8}>
                            <Card title="User Feedback" extra={<MessageOutlined />}>
                                <List
                                    dataSource={[
                                        { title: 'Positive feedback about workshop', status: 'approved' },
                                        { title: 'Report of inappropriate content', status: 'pending' },
                                    ]}
                                    renderItem={item => (
                                        <List.Item>
                                            <List.Item.Meta title={item.title} />
                                            <Tag color={item.status === 'pending' ? 'red' : 'green'}>
                                                {item.status === 'pending' ? 'Needs Action' : 'Approved'}
                                            </Tag>
                                        </List.Item>
                                    )}
                                />
                            </Card>
                        </Col>
                        <Col xs={24} md={8}>
                            <Card title="Media Content" extra={<PictureOutlined />}>
                                <List
                                    dataSource={[
                                        { title: 'Cultural event images', status: 'approved' },
                                        { title: 'AI workshop video', status: 'pending' },
                                    ]}
                                    renderItem={item => (
                                        <List.Item>
                                            <List.Item.Meta title={item.title} />
                                            <Tag color={item.status === 'pending' ? 'orange' : 'green'}>
                                                {item.status === 'pending' ? 'Chờ duyệt' : 'Đã duyệt'}
                                            </Tag>
                                        </List.Item>
                                    )}
                                />
                            </Card>
                        </Col>
                    </Row>
                </TabPane>

                <TabPane tab={<span><NotificationOutlined />System Notifications</span>} key="notifications">
                    <Card title="Send System-wide Notifications">
                        <Alert
                            message="Notification Feature"
                            description="Send important notifications to all users in the system"
                            type="info"
                            showIcon
                            style={{ marginBottom: '16px' }}
                        />
                        <Space direction="vertical" style={{ width: '100%' }}>
                            <Button type="primary" icon={<GlobalOutlined />} size="large">
                                System Maintenance Notice
                            </Button>
                            <Button icon={<CalendarOutlined />} size="large">
                                New Event Announcement
                            </Button>
                            <Button icon={<FileTextOutlined />} size="large">
                                Policy Update
                            </Button>
                        </Space>
                    </Card>
                </TabPane>

                <TabPane tab={<span><BarChartOutlined />Statistics</span>} key="statistics">
                    <Row gutter={[16, 16]}>
                        <Col xs={24} lg={12}>
                            <Card title="User Statistics by Role">
                                <div style={{ textAlign: 'center' }}>
                                    <Progress type="circle" percent={Math.round((participants.length / users.length) * 100)} format={() => `${participants.length} Students`} />
                                    <Divider />
                                    <Progress type="circle" percent={Math.round((organizers.length / users.length) * 100)} format={() => `${organizers.length} Organizers`} />
                                </div>
                            </Card>
                        </Col>
                        <Col xs={24} lg={12}>
                            <Card title="Event Statistics by Status">
                                <div style={{ textAlign: 'center' }}>
                                    <Progress type="circle" percent={Math.round((approvedEvents.length / events.length) * 100)} format={() => `${approvedEvents.length} Approved`} strokeColor="#52c41a" />
                                    <Divider />
                                    <Progress type="circle" percent={Math.round((pendingEvents.length / events.length) * 100)} format={() => `${pendingEvents.length} Pending`} strokeColor="#faad14" />
                                </div>
                            </Card>
                        </Col>
                    </Row>
                </TabPane>
            </Tabs>
        </div>
    );
}
