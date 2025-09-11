import { Card, Row, Col, Typography, Statistic, List, Tag, Space, Button, Empty } from "antd";
import { useAuth } from "../context/AuthContext";
import { useEvents } from "../context/EventContext";
import { Link } from "react-router";
import {
    CalendarOutlined,
    UserOutlined,
    TrophyOutlined,
    ClockCircleOutlined,
    PlusOutlined,
    EyeOutlined,
    EnvironmentOutlined,
} from "@ant-design/icons";

const { Title, Text } = Typography;

export default function DashboardHome() {
    const { user } = useAuth();
    const { events } = useEvents();

    if (!user) {
        return (
            <div style={{ textAlign: 'center', padding: '4rem' }}>
                <Title level={3}>Please log in to view your dashboard</Title>
            </div>
        );
    }

    const userEvents = events.filter(event => user.registeredEvents.includes(event.id));
    const organizedEvents = events.filter(event => event.organizer === user.username);
    const upcomingEvents = userEvents.filter(event => {
        const eventDate = new Date(event.date || event.startDate || '');
        return eventDate > new Date();
    });

    const getDashboardContent = () => {
        if (user.role === "participant") {
            return (
                <>
                    <Row gutter={[24, 24]} style={{ marginBottom: '2rem' }}>
                        <Col xs={24} sm={8}>
                            <Card style={{ textAlign: 'center', borderRadius: '12px' }}>
                                <Statistic
                                    title="Registered Events"
                                    value={userEvents.length}
                                    prefix={<CalendarOutlined style={{ color: '#1890ff' }} />}
                                    valueStyle={{ color: '#1890ff' }}
                                />
                            </Card>
                        </Col>
                        <Col xs={24} sm={8}>
                            <Card style={{ textAlign: 'center', borderRadius: '12px' }}>
                                <Statistic
                                    title="Upcoming Events"
                                    value={upcomingEvents.length}
                                    prefix={<ClockCircleOutlined style={{ color: '#52c41a' }} />}
                                    valueStyle={{ color: '#52c41a' }}
                                />
                            </Card>
                        </Col>
                        <Col xs={24} sm={8}>
                            <Card style={{ textAlign: 'center', borderRadius: '12px' }}>
                                <Statistic
                                    title="Certificates Earned"
                                    value={userEvents.length - upcomingEvents.length}
                                    prefix={<TrophyOutlined style={{ color: '#faad14' }} />}
                                    valueStyle={{ color: '#faad14' }}
                                />
                            </Card>
                        </Col>
                    </Row>

                    <Row gutter={[24, 24]}>
                        <Col xs={24} lg={12}>
                            <Card 
                                title="Your Registered Events" 
                                style={{ borderRadius: '12px' }}
                                extra={
                                    <Link to="/events">
                                        <Button type="primary" size="small" icon={<PlusOutlined />}>
                                            Find More Events
                                        </Button>
                                    </Link>
                                }
                            >
                                {userEvents.length === 0 ? (
                                    <Empty 
                                        description="No events registered yet"
                                        image={Empty.PRESENTED_IMAGE_SIMPLE}
                                    >
                                        <Link to="/events">
                                            <Button type="primary">Browse Events</Button>
                                        </Link>
                                    </Empty>
                                ) : (
                                    <List
                                        dataSource={userEvents.slice(0, 5)}
                                        renderItem={(event) => (
                                            <List.Item
                                                actions={[
                                                    <Link to={`/events/${event.id}`} key="view">
                                                        <Button type="link" icon={<EyeOutlined />}>
                                                            View
                                                        </Button>
                                                    </Link>
                                                ]}
                                            >
                                                <List.Item.Meta
                                                    title={event.title}
                                                    description={
                                                        <Space wrap>
                                                            <Tag icon={<EnvironmentOutlined />} color="blue">
                                                                {event.location}
                                                            </Tag>
                                                            <Tag icon={<CalendarOutlined />} color="green">
                                                                {event.date || `${event.startDate} - ${event.endDate}`}
                                                            </Tag>
                                                        </Space>
                                                    }
                                                />
                                            </List.Item>
                                        )}
                                    />
                                )}
                            </Card>
                        </Col>
                        <Col xs={24} lg={12}>
                            <Card 
                                title="Quick Actions" 
                                style={{ borderRadius: '12px' }}
                            >
                                <Space direction="vertical" style={{ width: '100%' }} size="middle">
                                    <Link to="/events">
                                        <Button type="primary" block size="large" icon={<CalendarOutlined />}>
                                            Browse All Events
                                        </Button>
                                    </Link>
                                    <Link to="/checkin">
                                        <Button block size="large" icon={<ClockCircleOutlined />}>
                                            Check-in to Event
                                        </Button>
                                    </Link>
                                    <Link to="/certificate">
                                        <Button block size="large" icon={<TrophyOutlined />}>
                                            View Certificates
                                        </Button>
                                    </Link>
                                    <Link to="/feedback">
                                        <Button block size="large" icon={<UserOutlined />}>
                                            Give Feedback
                                        </Button>
                                    </Link>
                                </Space>
                            </Card>
                        </Col>
                    </Row>
                </>
            );
        } else if (user.role === "organizer") {
            return (
                <>
                    <Row gutter={[24, 24]} style={{ marginBottom: '2rem' }}>
                        <Col xs={24} sm={8}>
                            <Card style={{ textAlign: 'center', borderRadius: '12px' }}>
                                <Statistic
                                    title="Events Created"
                                    value={organizedEvents.length}
                                    prefix={<CalendarOutlined style={{ color: '#1890ff' }} />}
                                    valueStyle={{ color: '#1890ff' }}
                                />
                            </Card>
                        </Col>
                        <Col xs={24} sm={8}>
                            <Card style={{ textAlign: 'center', borderRadius: '12px' }}>
                                <Statistic
                                    title="Total Registrations"
                                    value={organizedEvents.length * 25}
                                    prefix={<UserOutlined style={{ color: '#52c41a' }} />}
                                    valueStyle={{ color: '#52c41a' }}
                                />
                            </Card>
                        </Col>
                        <Col xs={24} sm={8}>
                            <Card style={{ textAlign: 'center', borderRadius: '12px' }}>
                                <Statistic
                                    title="Success Rate"
                                    value={95}
                                    suffix="%"
                                    prefix={<TrophyOutlined style={{ color: '#faad14' }} />}
                                    valueStyle={{ color: '#faad14' }}
                                />
                            </Card>
                        </Col>
                    </Row>

                    <Row gutter={[24, 24]}>
                        <Col xs={24} lg={12}>
                            <Card 
                                title="Your Events" 
                                style={{ borderRadius: '12px' }}
                                extra={
                                    <Link to="/event/create">
                                        <Button type="primary" size="small" icon={<PlusOutlined />}>
                                            Create Event
                                        </Button>
                                    </Link>
                                }
                            >
                                {organizedEvents.length === 0 ? (
                                    <Empty 
                                        description="No events created yet"
                                        image={Empty.PRESENTED_IMAGE_SIMPLE}
                                    >
                                        <Link to="/event/create">
                                            <Button type="primary">Create Your First Event</Button>
                                        </Link>
                                    </Empty>
                                ) : (
                                    <List
                                        dataSource={organizedEvents.slice(0, 5)}
                                        renderItem={(event) => (
                                            <List.Item
                                                actions={[
                                                    <Link to={`/events/${event.id}`} key="view">
                                                        <Button type="link" icon={<EyeOutlined />}>
                                                            View
                                                        </Button>
                                                    </Link>
                                                ]}
                                            >
                                                <List.Item.Meta
                                                    title={event.title}
                                                    description={
                                                        <Space wrap>
                                                            <Tag icon={<EnvironmentOutlined />} color="blue">
                                                                {event.location}
                                                            </Tag>
                                                            <Tag icon={<CalendarOutlined />} color="green">
                                                                {event.date || `${event.startDate} - ${event.endDate}`}
                                                            </Tag>
                                                        </Space>
                                                    }
                                                />
                                            </List.Item>
                                        )}
                                    />
                                )}
                            </Card>
                        </Col>
                        <Col xs={24} lg={12}>
                            <Card 
                                title="Organizer Tools" 
                                style={{ borderRadius: '12px' }}
                            >
                                <Space direction="vertical" style={{ width: '100%' }} size="middle">
                                    <Link to="/event/create">
                                        <Button type="primary" block size="large" icon={<PlusOutlined />}>
                                            Create New Event
                                        </Button>
                                    </Link>
                                    <Link to="/event/registrations">
                                        <Button block size="large" icon={<UserOutlined />}>
                                            View Registrations
                                        </Button>
                                    </Link>
                                    <Link to="/event/media">
                                        <Button block size="large" icon={<CalendarOutlined />}>
                                            Upload Media
                                        </Button>
                                    </Link>
                                    <Link to="/event/certificates">
                                        <Button block size="large" icon={<TrophyOutlined />}>
                                            Manage Certificates
                                        </Button>
                                    </Link>
                                </Space>
                            </Card>
                        </Col>
                    </Row>
                </>
            );
        }

        return <Empty description="Role not recognized" />;
    };

    return (
        <div>
            <div style={{ marginBottom: '2rem' }}>
                <Title level={2} style={{ marginBottom: '0.5rem' }}>
                    Welcome back, {user.username}! 👋
                </Title>
                <Text type="secondary" style={{ fontSize: '16px' }}>
                    {user.role === "participant" 
                        ? "Here's your event activity and upcoming events"
                        : "Manage your events and track your organizing success"
                    }
                </Text>
            </div>

            {getDashboardContent()}
        </div>
    );
}
  