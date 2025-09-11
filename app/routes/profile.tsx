import { 
    Card, 
    Descriptions, 
    Button, 
    message, 
    Avatar, 
    Row, 
    Col, 
    Space, 
    Divider,
    Typography,
    Statistic
} from "antd";
import { 
    UserOutlined, 
    LogoutOutlined, 
    EditOutlined,
    CrownOutlined,
    CalendarOutlined,
    TrophyOutlined
} from "@ant-design/icons";
import { useAuth } from "../context/AuthContext";
import { useEvents } from "../context/EventContext";
import { useNavigate } from "react-router";

const { Title, Text } = Typography;

export default function ProfilePage() {
    const { user, logout } = useAuth();
    const { events } = useEvents();
    const navigate = useNavigate();

    if (!user) {
        return (
            <div className="min-h-screen bg-gradient-to-br from-blue-50 to-purple-50 flex items-center justify-center p-4">
                <Card className="max-w-md w-full text-center">
                    <Title level={3} className="text-gray-800">Authentication Required</Title>
                    <Text className="text-gray-600 mb-6">
                        You must login to view your profile.
                    </Text>
                    <Button 
                        type="primary" 
                        onClick={() => navigate("/login")}
                        className="bg-gradient-to-r from-blue-500 to-purple-600 border-none"
                    >
                        Go to Login
                    </Button>
                </Card>
            </div>
        );
    }

    const handleLogout = () => {
        logout();
        message.success("Logged out successfully!");
        navigate("/");
    };

    const registeredEvents = user.registeredEvents?.length || 0;
    const createdEvents = user.role === 'organizer' 
        ? events.filter(event => event.organizer === user.username).length 
        : 0;

    return (
        <div className="min-h-screen bg-gradient-to-br from-blue-50 via-purple-50 to-pink-50 p-4 lg:p-8">
            <div className="max-w-4xl mx-auto">
                <Row gutter={[24, 24]}>
                    {/* Profile Header */}
                    <Col span={24}>
                        <Card className="shadow-lg border-0 overflow-hidden">
                            <div className="bg-gradient-to-r from-blue-500 to-purple-600 -m-6 mb-6 p-8 text-white">
                                <div className="flex items-center flex-wrap gap-6">
                                    <Avatar 
                                        size={120} 
                                        icon={<UserOutlined />} 
                                        className="bg-white/20 border-4 border-white/30"
                                    />
                                    <div className="flex-1">
                                        <Title level={2} className="text-white mb-2">
                                            {user.username}
                                        </Title>
                                        <Space className="text-white/90">
                                            {user.role === 'organizer' ? (
                                                <CrownOutlined className="text-yellow-300" />
                                            ) : (
                                                <UserOutlined />
                                            )}
                                            <Text className="text-white text-lg">
                                                {user.role.charAt(0).toUpperCase() + user.role.slice(1)}
                                            </Text>
                                        </Space>
                                    </div>
                                    <Button 
                                        icon={<EditOutlined />}
                                        className="bg-white/20 border-white/40 text-white hover:bg-white/30"
                                    >
                                        Edit Profile
                                    </Button>
                                </div>
                            </div>

                            {/* Profile Stats */}
                            <Row gutter={[16, 16]} className="mb-6">
                                <Col xs={24} sm={8}>
                                    <div className="text-center p-4 bg-blue-50 rounded-lg">
                                        <Statistic
                                            title="Events Registered"
                                            value={registeredEvents}
                                            prefix={<CalendarOutlined className="text-blue-500" />}
                                            valueStyle={{ color: '#1890ff' }}
                                        />
                                    </div>
                                </Col>
                                {user.role === 'organizer' && (
                                    <Col xs={24} sm={8}>
                                        <div className="text-center p-4 bg-purple-50 rounded-lg">
                                            <Statistic
                                                title="Events Created"
                                                value={createdEvents}
                                                prefix={<CrownOutlined className="text-purple-500" />}
                                                valueStyle={{ color: '#722ed1' }}
                                            />
                                        </div>
                                    </Col>
                                )}
                                <Col xs={24} sm={user.role === 'organizer' ? 8 : 16}>
                                    <div className="text-center p-4 bg-green-50 rounded-lg">
                                        <Statistic
                                            title="Profile Score"
                                            value={85}
                                            suffix="/ 100"
                                            prefix={<TrophyOutlined className="text-green-500" />}
                                            valueStyle={{ color: '#52c41a' }}
                                        />
                                    </div>
                                </Col>
                            </Row>
                        </Card>
                    </Col>

                    {/* Profile Details */}
                    <Col xs={24} lg={16}>
                        <Card title="Profile Information" className="shadow-lg border-0">
                            <Descriptions bordered column={1} size="middle">
                                <Descriptions.Item 
                                    label={<span className="font-semibold">Username</span>}
                                >
                                    <Text strong>{user.username}</Text>
                                </Descriptions.Item>
                                <Descriptions.Item 
                                    label={<span className="font-semibold">Role</span>}
                                >
                                    <Space>
                                        {user.role === 'organizer' ? (
                                            <CrownOutlined className="text-yellow-500" />
                                        ) : (
                                            <UserOutlined className="text-blue-500" />
                                        )}
                                        <Text>{user.role.charAt(0).toUpperCase() + user.role.slice(1)}</Text>
                                    </Space>
                                </Descriptions.Item>
                                <Descriptions.Item 
                                    label={<span className="font-semibold">Member Since</span>}
                                >
                                    <Text>January 2024</Text>
                                </Descriptions.Item>
                                <Descriptions.Item 
                                    label={<span className="font-semibold">Last Active</span>}
                                >
                                    <Text>Today</Text>
                                </Descriptions.Item>
                            </Descriptions>
                        </Card>
                    </Col>

                    {/* Quick Actions */}
                    <Col xs={24} lg={8}>
                        <Card title="Quick Actions" className="shadow-lg border-0">
                            <Space direction="vertical" className="w-full">
                                <Button 
                                    block 
                                    icon={<EditOutlined />}
                                    className="text-left h-12"
                                >
                                    Edit Profile
                                </Button>
                                <Button 
                                    block 
                                    icon={<CalendarOutlined />}
                                    className="text-left h-12"
                                    onClick={() => navigate("/events")}
                                >
                                    Browse Events
                                </Button>
                                <Button 
                                    block 
                                    icon={<UserOutlined />}
                                    className="text-left h-12"
                                    onClick={() => navigate("/dashboard")}
                                >
                                    View Dashboard
                                </Button>
                                
                                <Divider />
                                
                                <Button 
                                    danger 
                                    block
                                    icon={<LogoutOutlined />}
                                    onClick={handleLogout}
                                    className="h-12 text-left"
                                >
                                    Logout
                                </Button>
                            </Space>
                        </Card>
                    </Col>
                </Row>
            </div>
        </div>
    );
}
