import { useParams, useNavigate } from "react-router";
import { useEvents } from "../context/EventContext";
import { useAuth } from "../context/AuthContext";
import { 
    Card, 
    Typography, 
    Button, 
    message, 
    Row, 
    Col, 
    Tag, 
    Space, 
    Divider
} from "antd";
import { 
    CalendarOutlined, 
    ClockCircleOutlined, 
    EnvironmentOutlined, 
    UserOutlined,
    ArrowLeftOutlined,
    CheckCircleOutlined
} from "@ant-design/icons";

const { Title, Paragraph } = Typography;

export default function EventDetailPage() {
    const { id } = useParams();
    const { events } = useEvents();
    const { user, registerEvent } = useAuth();
    const navigate = useNavigate();

    const event = events.find((e) => e.id === Number(id));

    if (!event) {
        return (
            <div className="min-h-screen bg-gradient-to-br from-red-50 to-red-100 flex items-center justify-center p-4">
                <Card className="max-w-md w-full text-center">
                    <Title level={3} className="text-red-600">Event Not Found</Title>
                    <Paragraph className="text-gray-600 mb-6">
                        The event you&apos;re looking for doesn&apos;t exist or has been removed.
                    </Paragraph>
                    <Button 
                        type="primary" 
                        icon={<ArrowLeftOutlined />}
                        onClick={() => navigate("/events")}
                        className="bg-gradient-to-r from-blue-500 to-purple-600 border-none"
                    >
                        Back to Events
                    </Button>
                </Card>
            </div>
        );
    }

    const alreadyRegistered = user?.registeredEvents?.includes(event.id) ?? false;

    const handleRegister = () => {
        if (!user) {
            message.warning("Please login to register.");
            navigate("/login");
            return;
        }
        if (alreadyRegistered) {
            message.info("You are already registered.");
            return;
        }
        registerEvent(event.id);
        message.success("Successfully registered!");
    };

    const eventDate = event.date || `${event.startDate} → ${event.endDate}`;

    return (
        <div className="min-h-screen bg-gradient-to-br from-blue-50 via-purple-50 to-pink-50 p-4 lg:p-8">
            <div className="max-w-6xl mx-auto">
                {/* Back Button */}
                <Button 
                    icon={<ArrowLeftOutlined />}
                    onClick={() => navigate("/events")}
                    className="mb-6 hover:bg-blue-50"
                >
                    Back to Events
                </Button>

                <Row gutter={[24, 24]}>
                    {/* Main Content */}
                    <Col xs={24} lg={16}>
                        <Card className="shadow-lg border-0 overflow-hidden">
                            {/* Event Header */}
                            <div className="bg-gradient-to-r from-blue-500 to-purple-600 -m-6 mb-6 p-8 text-white">
                                <div className="flex items-start justify-between flex-wrap gap-4">
                                    <div className="flex-1">
                                        <Title level={2} className="text-white mb-2">
                                            {event.title}
                                        </Title>
                                        <Space wrap>
                                            {/* Add some default tags based on event type */}
                                            <Tag color="white" className="text-blue-600 border-white">
                                                University Event
                                            </Tag>
                                        </Space>
                                    </div>
                                    {/* Remove rating badge since it's not in Event type */}
                                </div>
                            </div>

                            {/* Event Description */}
                            <div className="mb-6">
                                <Title level={4} className="text-gray-800 mb-3">About This Event</Title>
                                <Paragraph className="text-gray-600 text-lg leading-relaxed">
                                    {event.description}
                                </Paragraph>
                            </div>

                            <Divider />

                            {/* Event Details Grid */}
                            <Row gutter={[16, 16]} className="mb-6">
                                <Col xs={24} sm={12}>
                                    <div className="flex items-center p-4 bg-blue-50 rounded-lg">
                                        <CalendarOutlined className="text-blue-500 text-xl mr-3" />
                                        <div>
                                            <div className="text-gray-500 text-sm">Date</div>
                                            <div className="font-semibold text-gray-800">{eventDate}</div>
                                        </div>
                                    </div>
                                </Col>
                                <Col xs={24} sm={12}>
                                    <div className="flex items-center p-4 bg-purple-50 rounded-lg">
                                        <ClockCircleOutlined className="text-purple-500 text-xl mr-3" />
                                        <div>
                                            <div className="text-gray-500 text-sm">Time</div>
                                            <div className="font-semibold text-gray-800">
                                                {event.startTime} - {event.endTime}
                                            </div>
                                        </div>
                                    </div>
                                </Col>
                                <Col xs={24} sm={12}>
                                    <div className="flex items-center p-4 bg-green-50 rounded-lg">
                                        <EnvironmentOutlined className="text-green-500 text-xl mr-3" />
                                        <div>
                                            <div className="text-gray-500 text-sm">Location</div>
                                            <div className="font-semibold text-gray-800">{event.location}</div>
                                        </div>
                                    </div>
                                </Col>
                                <Col xs={24} sm={12}>
                                    <div className="flex items-center p-4 bg-orange-50 rounded-lg">
                                        <UserOutlined className="text-orange-500 text-xl mr-3" />
                                        <div>
                                            <div className="text-gray-500 text-sm">Organizer</div>
                                            <div className="font-semibold text-gray-800">{event.organizer}</div>
                                        </div>
                                    </div>
                                </Col>
                            </Row>
                        </Card>
                    </Col>

                    {/* Sidebar */}
                    <Col xs={24} lg={8}>
                        <Card className="shadow-lg border-0 sticky top-4">
                            <div className="text-center">
                                <Title level={3} className="text-gray-800 mb-4">Registration</Title>
                                
                                {alreadyRegistered ? (
                                    <div className="bg-green-50 border border-green-200 rounded-lg p-6 mb-4">
                                        <CheckCircleOutlined className="text-green-500 text-3xl mb-3" />
                                        <div className="text-green-700 font-semibold mb-2">
                                            You&apos;re Registered!
                                        </div>
                                        <div className="text-green-600 text-sm">
                                            We&apos;ll send you updates about this event.
                                        </div>
                                    </div>
                                ) : (
                                    <div className="mb-4">
                                        <Paragraph className="text-gray-600 mb-4">
                                            Join this amazing event and be part of something great!
                                        </Paragraph>
                                        <Button 
                                            type="primary" 
                                            size="large"
                                            block
                                            onClick={handleRegister}
                                            className="bg-gradient-to-r from-blue-500 to-purple-600 border-none h-12 text-lg font-semibold"
                                        >
                                            Register Now
                                        </Button>
                                    </div>
                                )}

                                <Divider />

                                {/* Event Stats */}
                                <div className="space-y-3">
                                    <div className="flex justify-between items-center">
                                        <span className="text-gray-600">Status</span>
                                        <Tag color="green">Open</Tag>
                                    </div>
                                    <div className="flex justify-between items-center">
                                        <span className="text-gray-600">Category</span>
                                        <Tag color="blue">General</Tag>
                                    </div>
                                    {/* Show participant count if available */}
                                    <div className="flex justify-between items-center">
                                        <span className="text-gray-600">Registrations</span>
                                        <span className="font-semibold">Open</span>
                                    </div>
                                </div>
                            </div>
                        </Card>

                        {/* Quick Actions */}
                        {user && (
                            <Card className="shadow-lg border-0 mt-6">
                                <Title level={4} className="text-gray-800 mb-4">Quick Actions</Title>
                                <Space direction="vertical" className="w-full">
                                    <Button block className="text-left">
                                        📅 Add to Calendar
                                    </Button>
                                    <Button block className="text-left">
                                        📤 Share Event
                                    </Button>
                                    <Button block className="text-left">
                                        💬 Contact Organizer
                                    </Button>
                                </Space>
                            </Card>
                        )}
                    </Col>
                </Row>
            </div>
        </div>
    );
}
