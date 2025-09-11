import { Card, Typography, Button, Row, Col, Space, Statistic } from "antd";
import { Link } from "react-router";
import { 
    CalendarOutlined, 
    UserOutlined, 
    RocketOutlined,
    StarOutlined,
    TeamOutlined,
    TrophyOutlined 
} from "@ant-design/icons";
import { useEvents } from "../context/EventContext";
import { useAuth } from "../context/AuthContext";

const { Title, Paragraph } = Typography;

export default function HomePage() {
    const { events } = useEvents();
    const { user } = useAuth();

    const upcomingEvents = events.filter(event => {
        const eventDate = new Date(event.date || event.startDate || '');
        return eventDate > new Date() && event.status === 'approved';
    }).slice(0, 3);

    const totalEvents = events.filter(event => event.status === 'approved').length;
    const totalParticipants = events.reduce((sum, event) => sum + event.currentParticipants, 0);

    return (
        <div className="min-h-screen bg-gradient-to-br from-blue-50 via-purple-50 to-pink-50">
            {/* Hero Section */}
            <div className="relative bg-gradient-to-r from-blue-600 via-purple-600 to-violet-700 text-white overflow-hidden">
                <div className="absolute inset-0 bg-black/20"></div>
                <div className="relative max-w-7xl mx-auto px-4 py-24 lg:py-32 text-center">
                    <Title level={1} className="text-white text-5xl lg:text-6xl font-bold mb-6">
                        Welcome to EventSphere
                    </Title>
                    <Paragraph className="text-xl lg:text-2xl text-white/90 mb-12 max-w-3xl mx-auto">
                        Discover, create, and participate in amazing university events. 
                        Connect with your community and make lasting memories.
                    </Paragraph>
                    
                    <Space size="large" wrap className="justify-center">
                        {!user ? (
                            <>
                                <Link to="/events">
                                    <Button 
                                        type="primary" 
                                        size="large"
                                        icon={<CalendarOutlined />}
                                        className="h-14 px-8 text-lg font-semibold bg-white text-blue-600 border-0 hover:bg-gray-100 hover:text-blue-700"
                                    >
                                        Explore Events
                                    </Button>
                                </Link>
                                <Link to="/register">
                                    <Button 
                                        size="large"
                                        icon={<UserOutlined />}
                                        className="h-14 px-8 text-lg font-semibold bg-transparent border-2 border-white text-white hover:bg-white hover:text-blue-600"
                                    >
                                        Join Now
                                    </Button>
                                </Link>
                            </>
                        ) : (
                            <>
                                <Link to="/dashboard">
                                    <Button 
                                        type="primary" 
                                        size="large"
                                        icon={<RocketOutlined />}
                                        className="h-14 px-8 text-lg font-semibold bg-white text-blue-600 border-0 hover:bg-gray-100 hover:text-blue-700"
                                    >
                                        Go to Dashboard
                                    </Button>
                                </Link>
                                <Link to="/events">
                                    <Button 
                                        size="large"
                                        icon={<CalendarOutlined />}
                                        className="h-14 px-8 text-lg font-semibold bg-transparent border-2 border-white text-white hover:bg-white hover:text-blue-600"
                                    >
                                        Browse Events
                                    </Button>
                                </Link>
                            </>
                        )}
                    </Space>
                </div>
            </div>

            {/* Stats Section */}
            <div className="max-w-7xl mx-auto px-4 py-16 -mt-16 relative z-10">
                <Row gutter={[24, 24]}>
                    <Col xs={24} sm={8}>
                        <Card className="text-center shadow-2xl border-0 rounded-2xl bg-white/95 backdrop-blur">
                            <Statistic
                                title="Active Events"
                                value={totalEvents}
                                prefix={<CalendarOutlined className="text-blue-500" />}
                                valueStyle={{ color: '#1890ff', fontSize: '2.5rem', fontWeight: 'bold' }}
                            />
                        </Card>
                    </Col>
                    <Col xs={24} sm={8}>
                        <Card className="text-center shadow-2xl border-0 rounded-2xl bg-white/95 backdrop-blur">
                            <Statistic
                                title="Total Participants"
                                value={totalParticipants}
                                prefix={<TeamOutlined className="text-green-500" />}
                                valueStyle={{ color: '#52c41a', fontSize: '2.5rem', fontWeight: 'bold' }}
                            />
                        </Card>
                    </Col>
                    <Col xs={24} sm={8}>
                        <Card className="text-center shadow-2xl border-0 rounded-2xl bg-white/95 backdrop-blur">
                            <Statistic
                                title="Success Rate"
                                value={98}
                                suffix="%"
                                prefix={<TrophyOutlined className="text-yellow-500" />}
                                valueStyle={{ color: '#faad14', fontSize: '2.5rem', fontWeight: 'bold' }}
                            />
                        </Card>
                    </Col>
                </Row>
            </div>

            {/* Features Section */}
            <div className="max-w-7xl mx-auto px-4 py-16">
                <div className="text-center mb-16">
                    <Title level={2} className="text-gray-800 mb-4">
                        Why Choose EventSphere?
                    </Title>
                    <Paragraph className="text-xl text-gray-600 max-w-2xl mx-auto">
                        Built specifically for university communities with features that matter most to students and organizers.
                    </Paragraph>
                </div>

                <Row gutter={[32, 32]}>
                    <Col xs={24} md={8}>
                        <Card className="text-center h-full shadow-lg border-0 rounded-xl hover:shadow-xl transition-shadow">
                            <div className="bg-blue-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-6">
                                <CalendarOutlined className="text-3xl text-blue-600" />
                            </div>
                            <Title level={4} className="text-gray-800 mb-4">Easy Event Discovery</Title>
                            <Paragraph className="text-gray-600">
                                Find events that match your interests with powerful filtering and search capabilities.
                            </Paragraph>
                        </Card>
                    </Col>
                    <Col xs={24} md={8}>
                        <Card className="text-center h-full shadow-lg border-0 rounded-xl hover:shadow-xl transition-shadow">
                            <div className="bg-green-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-6">
                                <RocketOutlined className="text-3xl text-green-600" />
                            </div>
                            <Title level={4} className="text-gray-800 mb-4">Simple Event Creation</Title>
                            <Paragraph className="text-gray-600">
                                Organizers can create and manage events with our intuitive interface and powerful tools.
                            </Paragraph>
                        </Card>
                    </Col>
                    <Col xs={24} md={8}>
                        <Card className="text-center h-full shadow-lg border-0 rounded-xl hover:shadow-xl transition-shadow">
                            <div className="bg-purple-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-6">
                                <StarOutlined className="text-3xl text-purple-600" />
                            </div>
                            <Title level={4} className="text-gray-800 mb-4">Community Driven</Title>
                            <Paragraph className="text-gray-600">
                                Built by students, for students. Features that enhance university life and community engagement.
                            </Paragraph>
                        </Card>
                    </Col>
                </Row>
            </div>

            {/* Upcoming Events Section */}
            {upcomingEvents.length > 0 && (
                <div className="bg-white py-16">
                    <div className="max-w-7xl mx-auto px-4">
                        <div className="text-center mb-12">
                            <Title level={2} className="text-gray-800 mb-4">
                                Upcoming Events
                            </Title>
                            <Paragraph className="text-xl text-gray-600">
                                Don&apos;t miss these exciting events happening soon!
                            </Paragraph>
                        </div>

                        <Row gutter={[24, 24]}>
                            {upcomingEvents.map(event => (
                                <Col xs={24} md={8} key={event.id}>
                                    <Card 
                                        hoverable
                                        className="h-full shadow-lg border-0 rounded-xl"
                                        cover={
                                            <div className="h-48 bg-gradient-to-r from-blue-400 to-purple-500 flex items-center justify-center">
                                                <Title level={4} className="text-white text-center px-4">
                                                    {event.title}
                                                </Title>
                                            </div>
                                        }
                                        actions={[
                                            <Link to={`/events/${event.id}`} key="view">
                                                <Button type="primary" className="bg-blue-600 border-0">
                                                    View Details
                                                </Button>
                                            </Link>
                                        ]}
                                    >
                                        <Card.Meta
                                            description={
                                                <div>
                                                    <Paragraph ellipsis={{ rows: 2 }} className="text-gray-600 mb-3">
                                                        {event.description}
                                                    </Paragraph>
                                                    <Space direction="vertical" size="small" className="w-full">
                                                        <div className="flex items-center text-gray-500">
                                                            <CalendarOutlined className="mr-2" />
                                                            {event.date || event.startDate}
                                                        </div>
                                                        <div className="flex items-center text-gray-500">
                                                            <UserOutlined className="mr-2" />
                                                            {event.currentParticipants}/{event.maxParticipants} registered
                                                        </div>
                                                    </Space>
                                                </div>
                                            }
                                        />
                                    </Card>
                                </Col>
                            ))}
                        </Row>

                        <div className="text-center mt-12">
                            <Link to="/events">
                                <Button 
                                    type="primary" 
                                    size="large"
                                    icon={<CalendarOutlined />}
                                    className="bg-gradient-to-r from-blue-500 to-purple-600 border-0 h-12 px-8 text-lg font-semibold"
                                >
                                    View All Events
                                </Button>
                            </Link>
                        </div>
                    </div>
                </div>
            )}

            {/* CTA Section */}
            <div className="bg-gradient-to-r from-blue-600 to-purple-600 py-16">
                <div className="max-w-4xl mx-auto px-4 text-center">
                    <Title level={2} className="text-white mb-6">
                        Ready to Get Started?
                    </Title>
                    <Paragraph className="text-xl text-white/90 mb-8">
                        Join thousands of students who are already using EventSphere to discover and create amazing events.
                    </Paragraph>
                    
                    {!user ? (
                        <Space size="large">
                            <Link to="/register">
                                <Button 
                                    type="primary" 
                                    size="large"
                                    icon={<UserOutlined />}
                                    className="h-12 px-8 text-lg font-semibold bg-white text-blue-600 border-0 hover:bg-gray-100"
                                >
                                    Sign Up Free
                                </Button>
                            </Link>
                            <Link to="/login">
                                <Button 
                                    size="large"
                                    className="h-12 px-8 text-lg font-semibold bg-transparent border-2 border-white text-white hover:bg-white hover:text-blue-600"
                                >
                                    Sign In
                                </Button>
                            </Link>
                        </Space>
                    ) : (
                        <Link to="/dashboard">
                            <Button 
                                type="primary" 
                                size="large"
                                icon={<RocketOutlined />}
                                className="h-12 px-8 text-lg font-semibold bg-white text-blue-600 border-0 hover:bg-gray-100"
                            >
                                Go to Your Dashboard
                            </Button>
                        </Link>
                    )}
                </div>
            </div>
        </div>
    );
}