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

    const dashboardPath = user
        ? (user.role === 'admin' ? '/admin' : user.role === 'organizer' ? '/organizer/dashboard' : '/dashboard')
        : '/dashboard';

    return (
        <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-100">
            {/* Hero Section */}
            <div className="relative bg-gradient-to-br from-blue-600 via-purple-600 to-indigo-700 text-white overflow-hidden">
                <div className="absolute inset-0 bg-black/10"></div>
                <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent"></div>
                
                {/* Floating Elements */}
                <div className="absolute top-20 left-10 w-20 h-20 bg-white/10 rounded-full animate-float"></div>
                <div className="absolute top-40 right-20 w-16 h-16 bg-purple-400/20 rounded-full animate-float" style={{animationDelay: '1s'}}></div>
                <div className="absolute bottom-32 left-1/4 w-12 h-12 bg-blue-400/20 rounded-full animate-float" style={{animationDelay: '2s'}}></div>
                
                <div className="relative max-w-7xl mx-auto px-4 py-24 lg:py-32 text-center animate-fade-in-up">
                    <Title level={1} className="text-display text-white text-5xl lg:text-7xl font-bold mb-6 text-shadow-lg">
                        Welcome to <span className="text-gradient-secondary">EventSphere</span>
                    </Title>
                    <Paragraph className="text-xl lg:text-2xl text-white/90 mb-12 max-w-4xl mx-auto leading-relaxed text-shadow">
                        Discover, create, and participate in amazing university events. 
                        Connect with your community and make lasting memories through seamless event management.
                    </Paragraph>
                    
                    <Space size="large" wrap className="justify-center animate-slide-in-right">
                        {!user ? (
                            <>
                                <Link to="/events">
                                    <Button 
                                        type="primary" 
                                        size="large"
                                        icon={<CalendarOutlined />}
                                        className="h-16 px-10 text-lg font-semibold bg-white text-blue-600 border-0 hover:bg-gray-100 hover:text-blue-700 rounded-2xl shadow-2xl hover:shadow-3xl transform hover:scale-105 transition-all duration-300 animate-pulse-glow"
                                    >
                                        Explore Events
                                    </Button>
                                </Link>
                                <Link to="/register">
                                    <Button 
                                        size="large"
                                        icon={<UserOutlined />}
                                        className="h-16 px-10 text-lg font-semibold btn-glass rounded-2xl shadow-xl hover:shadow-2xl transform hover:scale-105 transition-all duration-300"
                                    >
                                        Join Now
                                    </Button>
                                </Link>
                            </>
                        ) : (
                            <>
                                <Link to={dashboardPath}>
                                    <Button 
                                        type="primary" 
                                        size="large"
                                        icon={<RocketOutlined />}
                                        className="h-16 px-10 text-lg font-semibold bg-white text-blue-600 border-0 hover:bg-gray-100 hover:text-blue-700 rounded-2xl shadow-2xl hover:shadow-3xl transform hover:scale-105 transition-all duration-300 animate-pulse-glow"
                                    >
                                        Go to Dashboard
                                    </Button>
                                </Link>
                                <Link to="/events">
                                    <Button 
                                        size="large"
                                        icon={<CalendarOutlined />}
                                        className="h-16 px-10 text-lg font-semibold btn-glass rounded-2xl shadow-xl hover:shadow-2xl transform hover:scale-105 transition-all duration-300"
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
            <div className="max-w-7xl mx-auto px-4 py-16 -mt-20 relative z-10">
                <Row gutter={[32, 32]} className="animate-fade-in-up">
                    <Col xs={24} sm={8}>
                        <Card className="text-center card-elevated rounded-3xl hover:transform hover:scale-105 transition-all duration-500 group">
                            <div className="bg-gradient-to-br from-blue-50 to-blue-100 w-20 h-20 rounded-2xl flex items-center justify-center mx-auto mb-6 group-hover:scale-110 transition-transform duration-300">
                                <CalendarOutlined className="text-4xl text-blue-600" />
                            </div>
                            <Statistic
                                title={<span className="text-gray-600 font-semibold text-lg">Active Events</span>}
                                value={totalEvents}
                                valueStyle={{ 
                                    color: '#2563eb', 
                                    fontSize: '3rem', 
                                    fontWeight: '800',
                                    fontFamily: 'Poppins'
                                }}
                            />
                        </Card>
                    </Col>
                    <Col xs={24} sm={8}>
                        <Card className="text-center card-elevated rounded-3xl hover:transform hover:scale-105 transition-all duration-500 group">
                            <div className="bg-gradient-to-br from-emerald-50 to-emerald-100 w-20 h-20 rounded-2xl flex items-center justify-center mx-auto mb-6 group-hover:scale-110 transition-transform duration-300">
                                <TeamOutlined className="text-4xl text-emerald-600" />
                            </div>
                            <Statistic
                                title={<span className="text-gray-600 font-semibold text-lg">Total Participants</span>}
                                value={totalParticipants}
                                valueStyle={{ 
                                    color: '#059669', 
                                    fontSize: '3rem', 
                                    fontWeight: '800',
                                    fontFamily: 'Poppins'
                                }}
                            />
                        </Card>
                    </Col>
                    <Col xs={24} sm={8}>
                        <Card className="text-center card-elevated rounded-3xl hover:transform hover:scale-105 transition-all duration-500 group">
                            <div className="bg-gradient-to-br from-amber-50 to-amber-100 w-20 h-20 rounded-2xl flex items-center justify-center mx-auto mb-6 group-hover:scale-110 transition-transform duration-300">
                                <TrophyOutlined className="text-4xl text-amber-600" />
                            </div>
                            <Statistic
                                title={<span className="text-gray-600 font-semibold text-lg">Success Rate</span>}
                                value={98}
                                suffix="%"
                                valueStyle={{ 
                                    color: '#d97706', 
                                    fontSize: '3rem', 
                                    fontWeight: '800',
                                    fontFamily: 'Poppins'
                                }}
                            />
                        </Card>
                    </Col>
                </Row>
            </div>

            {/* Features Section */}
            <div className="max-w-7xl mx-auto px-4 py-20">
                <div className="text-center mb-20 animate-fade-in-up">
                    <Title level={2} className="text-display text-4xl lg:text-5xl text-gray-800 mb-6">
                        Why Choose <span className="text-gradient">EventSphere</span>?
                    </Title>
                    <Paragraph className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
                        Built specifically for university communities with features that matter most to students and organizers.
                        Experience seamless event management like never before.
                    </Paragraph>
                </div>

                <Row gutter={[40, 40]} className="animate-slide-in-right">
                    <Col xs={24} md={8}>
                        <Card className="text-center h-full card-gradient rounded-3xl hover:transform hover:scale-105 hover:rotate-1 transition-all duration-500 group overflow-hidden">
                            <div className="bg-gradient-to-br from-blue-500 to-blue-600 w-24 h-24 rounded-3xl flex items-center justify-center mx-auto mb-8 group-hover:scale-110 group-hover:rotate-12 transition-all duration-300 shadow-xl">
                                <CalendarOutlined className="text-4xl text-white" />
                            </div>
                            <Title level={3} className="text-gray-800 mb-6 text-display">Easy Event Discovery</Title>
                            <Paragraph className="text-gray-600 text-lg leading-relaxed">
                                Find events that match your interests with powerful filtering, advanced search capabilities, and personalized recommendations.
                            </Paragraph>
                        </Card>
                    </Col>
                    <Col xs={24} md={8}>
                        <Card className="text-center h-full card-gradient rounded-3xl hover:transform hover:scale-105 hover:-rotate-1 transition-all duration-500 group overflow-hidden">
                            <div className="bg-gradient-to-br from-emerald-500 to-emerald-600 w-24 h-24 rounded-3xl flex items-center justify-center mx-auto mb-8 group-hover:scale-110 group-hover:rotate-12 transition-all duration-300 shadow-xl">
                                <RocketOutlined className="text-4xl text-white" />
                            </div>
                            <Title level={3} className="text-gray-800 mb-6 text-display">Simple Event Creation</Title>
                            <Paragraph className="text-gray-600 text-lg leading-relaxed">
                                Organizers can create and manage events with our intuitive interface, powerful tools, and comprehensive analytics dashboard.
                            </Paragraph>
                        </Card>
                    </Col>
                    <Col xs={24} md={8}>
                        <Card className="text-center h-full card-gradient rounded-3xl hover:transform hover:scale-105 hover:rotate-1 transition-all duration-500 group overflow-hidden">
                            <div className="bg-gradient-to-br from-purple-500 to-purple-600 w-24 h-24 rounded-3xl flex items-center justify-center mx-auto mb-8 group-hover:scale-110 group-hover:rotate-12 transition-all duration-300 shadow-xl">
                                <StarOutlined className="text-4xl text-white" />
                            </div>
                            <Title level={3} className="text-gray-800 mb-6 text-display">Community Driven</Title>
                            <Paragraph className="text-gray-600 text-lg leading-relaxed">
                                Built by students, for students. Features that enhance university life, foster community engagement, and create lasting connections.
                            </Paragraph>
                        </Card>
                    </Col>
                </Row>
            </div>

            {/* Events Section */}
            <div className="bg-white py-20">
                <div className="max-w-7xl mx-auto px-4">
                    <div className="text-center mb-16 animate-fade-in-up">
                        <Title level={2} className="text-display text-4xl lg:text-5xl text-gray-800 mb-6">
                            {!user ? (
                                <>Discover Amazing <span className="text-gradient">Events</span></>
                            ) : user.role === "participant" ? (
                                <>Your <span className="text-gradient">Events</span> & Discoveries</>
                            ) : (
                                <>Upcoming <span className="text-gradient">Events</span></>
                            )}
                        </Title>
                        <Paragraph className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
                            {!user 
                                ? "Explore all the exciting events happening at our university. Join the community and participate in amazing experiences!"
                                : user.role === "participant"
                                ? "Your registered events and new opportunities to explore and join."
                                : "Don't miss these exciting events happening soon!"
                            }
                        </Paragraph>
                    </div>

                    <Row gutter={[32, 32]} className="animate-slide-in-right">
                        {(!user ? events.filter(event => event.status === 'approved').slice(0, 6) : 
                          user.role === "participant" ? 
                            [...events.filter(event => user.registeredEvents.includes(event.id)), 
                             ...events.filter(event => event.status === 'approved' && !user.registeredEvents.includes(event.id))].slice(0, 6) :
                            upcomingEvents
                         ).map((event, index) => (
                            <Col xs={24} md={12} lg={8} key={event.id}>
                                <Card 
                                    hoverable
                                    className="h-full card-elevated rounded-3xl overflow-hidden hover:transform hover:scale-105 transition-all duration-500 group"
                                    cover={
                                        <div className="relative h-56 overflow-hidden">
                                            {event.bannerImage ? (
                                                <img 
                                                    src={event.bannerImage} 
                                                    alt={event.title}
                                                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                                                />
                                            ) : (
                                                <div className="h-full bg-gradient-to-br from-blue-500 via-purple-500 to-indigo-600 flex items-center justify-center">
                                                    <Title level={4} className="text-white text-center px-4 text-shadow">
                                                        {event.title}
                                                    </Title>
                                                </div>
                                            )}
                                            <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                                            {user && user.registeredEvents.includes(event.id) && (
                                                <div className="absolute top-4 right-4 bg-green-500 text-white px-3 py-1 rounded-full text-sm font-semibold shadow-lg">
                                                    Registered
                                                </div>
                                            )}
                                        </div>
                                    }
                                    actions={[
                                        <Link to={`/events/${event.id}`} key="view">
                                            <Button type="primary" className="btn-primary-gradient border-0 rounded-xl">
                                                View Details
                                            </Button>
                                        </Link>
                                    ]}
                                >
                                    <div className="p-2">
                                        <Title level={4} className="text-gray-800 mb-3 text-display line-clamp-2">
                                            {event.title}
                                        </Title>
                                        <Paragraph ellipsis={{ rows: 2 }} className="text-gray-600 mb-4 leading-relaxed">
                                            {event.description}
                                        </Paragraph>
                                        <Space direction="vertical" size="small" className="w-full">
                                            <div className="flex items-center text-gray-500">
                                                <CalendarOutlined className="mr-2 text-blue-500" />
                                                <span className="font-medium">
                                                    {event.date || `${event.startDate} - ${event.endDate}`}
                                                </span>
                                            </div>
                                            <div className="flex items-center text-gray-500">
                                                <UserOutlined className="mr-2 text-green-500" />
                                                <span className="font-medium">
                                                    {event.currentParticipants}/{event.maxParticipants} registered
                                                </span>
                                            </div>
                                            <div className="flex items-center justify-between mt-3">
                                                <div className="flex flex-wrap gap-1">
                                                    {event.tags.slice(0, 2).map(tag => (
                                                        <span key={tag} className="px-2 py-1 bg-blue-100 text-blue-700 text-xs rounded-lg font-medium">
                                                            {tag}
                                                        </span>
                                                    ))}
                                                </div>
                                                {event.rating && (
                                                    <div className="flex items-center text-yellow-500">
                                                        <StarOutlined className="mr-1" />
                                                        <span className="font-semibold">{event.rating}</span>
                                                    </div>
                                                )}
                                            </div>
                                        </Space>
                                    </div>
                                </Card>
                            </Col>
                        ))}
                    </Row>

                    <div className="text-center mt-16">
                        <Link to="/events">
                            <Button 
                                type="primary" 
                                size="large"
                                icon={<CalendarOutlined />}
                                style={{
                                    background: 'linear-gradient(135deg, #00afef 0%, #0099d6 100%)',
                                    border: 'none',
                                    color: 'white',
                                    fontWeight: '600',
                                    padding: '16px 32px',
                                    borderRadius: '12px',
                                    boxShadow: '0 8px 24px rgba(0, 175, 239, 0.3)',
                                    transform: 'scale(1)',
                                    transition: 'all 0.3s ease'
                                }}
                                onMouseEnter={(e) => {
                                    e.currentTarget.style.transform = 'scale(1.05)';
                                    e.currentTarget.style.boxShadow = '0 12px 32px rgba(0, 175, 239, 0.4)';
                                }}
                                onMouseLeave={(e) => {
                                    e.currentTarget.style.transform = 'scale(1)';
                                    e.currentTarget.style.boxShadow = '0 8px 24px rgba(0, 175, 239, 0.3)';
                                }}
                            >
                                {!user ? "View All Events" : "Browse More Events"}
                            </Button>
                        </Link>
                    </div>
                </div>
            </div>

            {/* CTA Section */}
            <div style={{ 
                background: 'linear-gradient(135deg, #00afef 0%, #0099d6 100%)', 
                padding: '64px 0' 
            }}>
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
                        <Link to={dashboardPath}>
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