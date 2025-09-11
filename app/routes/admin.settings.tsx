import {
    Card,
    Typography,
    Button,
    Row,
    Col,
    Switch,
    Space,
    Divider,
    Alert,
    Statistic
} from "antd";
import {
    SettingOutlined,
    UserOutlined,
    BellOutlined,
    SecurityScanOutlined,
    ArrowLeftOutlined,
    DatabaseOutlined,
    GlobalOutlined
} from "@ant-design/icons";
import { useAuth } from "../context/AuthContext";
import { useEvents } from "../context/EventContext";
import { useNavigate } from "react-router";
import { useState } from "react";

const { Title, Text } = Typography;

export default function AdminSettingsPage() {
    const { user } = useAuth();
    const { events } = useEvents();
    const navigate = useNavigate();
    const [settings, setSettings] = useState({
        emailNotifications: true,
        pushNotifications: false,
        publicProfile: true,
        autoApproval: false,
        maintenanceMode: false
    });

    if (!user) {
        return (
            <div className="min-h-screen bg-gradient-to-br from-blue-50 to-purple-50 flex items-center justify-center p-4">
                <Card className="max-w-md w-full text-center">
                    <Title level={3} className="text-gray-800">Authentication Required</Title>
                    <Text className="text-gray-600 mb-6">
                        Please log in to access settings.
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

    const totalUsers = 1250; // Mock data
    const totalEvents = events.length;
    const activeEvents = events.filter(event => {
        const eventDate = new Date(event.date || event.startDate || '');
        return eventDate > new Date();
    }).length;

    const updateSetting = (key: string, value: boolean) => {
        setSettings(prev => ({ ...prev, [key]: value }));
    };

    return (
        <div className="min-h-screen bg-gradient-to-br from-blue-50 via-purple-50 to-pink-50 p-4 lg:p-8">
            <div className="max-w-6xl mx-auto">
                {/* Header */}
                <div className="mb-8">
                    <Button 
                        icon={<ArrowLeftOutlined />}
                        onClick={() => navigate("/dashboard")}
                        className="mb-4 hover:bg-blue-50"
                    >
                        Back to Dashboard
                    </Button>
                    <Card className="shadow-lg border-0 overflow-hidden">
                        <div className="bg-gradient-to-r from-blue-500 to-purple-600 -m-6 mb-6 p-8 text-white">
                            <div className="flex items-center gap-4">
                                <div className="bg-white/20 p-3 rounded-lg">
                                    <SettingOutlined className="text-2xl" />
                                </div>
                                <div>
                                    <Title level={2} className="text-white mb-1">
                                        Settings & Admin
                                    </Title>
                                    <Text className="text-white/90">
                                        Manage your preferences and system settings
                                    </Text>
                                </div>
                            </div>
                        </div>

                        {/* System Stats - Only for organizers */}
                        {user.role === 'organizer' && (
                            <Row gutter={[16, 16]}>
                                <Col xs={24} sm={8}>
                                    <div className="text-center p-4 bg-blue-50 rounded-lg">
                                        <Statistic
                                            title="Total Users"
                                            value={totalUsers}
                                            prefix={<UserOutlined className="text-blue-500" />}
                                            valueStyle={{ color: '#1890ff' }}
                                        />
                                    </div>
                                </Col>
                                <Col xs={24} sm={8}>
                                    <div className="text-center p-4 bg-green-50 rounded-lg">
                                        <Statistic
                                            title="Total Events"
                                            value={totalEvents}
                                            prefix={<DatabaseOutlined className="text-green-500" />}
                                            valueStyle={{ color: '#52c41a' }}
                                        />
                                    </div>
                                </Col>
                                <Col xs={24} sm={8}>
                                    <div className="text-center p-4 bg-purple-50 rounded-lg">
                                        <Statistic
                                            title="Active Events"
                                            value={activeEvents}
                                            prefix={<GlobalOutlined className="text-purple-500" />}
                                            valueStyle={{ color: '#722ed1' }}
                                        />
                                    </div>
                                </Col>
                            </Row>
                        )}
                    </Card>
                </div>

                <Row gutter={[24, 24]}>
                    {/* User Preferences */}
                    <Col xs={24} lg={12}>
                        <Card title="Personal Preferences" className="shadow-lg border-0">
                            <Space direction="vertical" className="w-full">
                                <div className="flex justify-between items-center">
                                    <div>
                                        <Text strong>Email Notifications</Text>
                                        <br />
                                        <Text className="text-gray-500 text-sm">
                                            Receive email updates about events
                                        </Text>
                                    </div>
                                    <Switch 
                                        checked={settings.emailNotifications}
                                        onChange={(checked) => updateSetting('emailNotifications', checked)}
                                    />
                                </div>

                                <Divider />

                                <div className="flex justify-between items-center">
                                    <div>
                                        <Text strong>Push Notifications</Text>
                                        <br />
                                        <Text className="text-gray-500 text-sm">
                                            Get instant notifications on your device
                                        </Text>
                                    </div>
                                    <Switch 
                                        checked={settings.pushNotifications}
                                        onChange={(checked) => updateSetting('pushNotifications', checked)}
                                    />
                                </div>

                                <Divider />

                                <div className="flex justify-between items-center">
                                    <div>
                                        <Text strong>Public Profile</Text>
                                        <br />
                                        <Text className="text-gray-500 text-sm">
                                            Make your profile visible to other users
                                        </Text>
                                    </div>
                                    <Switch 
                                        checked={settings.publicProfile}
                                        onChange={(checked) => updateSetting('publicProfile', checked)}
                                    />
                                </div>
                            </Space>
                        </Card>
                    </Col>

                    {/* Admin Settings - Only for organizers */}
                    {user.role === 'organizer' && (
                        <Col xs={24} lg={12}>
                            <Card 
                                title={
                                    <Space>
                                        <SecurityScanOutlined />
                                        <span>Admin Settings</span>
                                    </Space>
                                } 
                                className="shadow-lg border-0"
                            >
                                <Alert
                                    message="Admin Access"
                                    description="These settings affect the entire platform. Use with caution."
                                    type="warning"
                                    showIcon
                                    className="mb-4"
                                />

                                <Space direction="vertical" className="w-full">
                                    <div className="flex justify-between items-center">
                                        <div>
                                            <Text strong>Auto-approve Events</Text>
                                            <br />
                                            <Text className="text-gray-500 text-sm">
                                                Automatically approve new events without review
                                            </Text>
                                        </div>
                                        <Switch 
                                            checked={settings.autoApproval}
                                            onChange={(checked) => updateSetting('autoApproval', checked)}
                                        />
                                    </div>

                                    <Divider />

                                    <div className="flex justify-between items-center">
                                        <div>
                                            <Text strong>Maintenance Mode</Text>
                                            <br />
                                            <Text className="text-gray-500 text-sm">
                                                Enable maintenance mode for system updates
                                            </Text>
                                        </div>
                                        <Switch 
                                            checked={settings.maintenanceMode}
                                            onChange={(checked) => updateSetting('maintenanceMode', checked)}
                                            checkedChildren="ON"
                                            unCheckedChildren="OFF"
                                        />
                                    </div>
                                </Space>
                            </Card>
                        </Col>
                    )}

                    {/* Quick Actions */}
                    <Col xs={24} lg={user.role === 'organizer' ? 24 : 12}>
                        <Card title="Quick Actions" className="shadow-lg border-0">
                            <Row gutter={[16, 16]}>
                                <Col xs={24} sm={12}>
                                    <Button 
                                        block 
                                        icon={<UserOutlined />}
                                        className="h-12 text-left"
                                        onClick={() => navigate("/profile")}
                                    >
                                        Edit Profile
                                    </Button>
                                </Col>
                                <Col xs={24} sm={12}>
                                    <Button 
                                        block 
                                        icon={<BellOutlined />}
                                        className="h-12 text-left"
                                        onClick={() => navigate("/feedback")}
                                    >
                                        Send Feedback
                                    </Button>
                                </Col>
                                <Col xs={24} sm={12}>
                                    <Button 
                                        block 
                                        icon={<SecurityScanOutlined />}
                                        className="h-12 text-left"
                                    >
                                        Privacy Settings
                                    </Button>
                                </Col>
                                <Col xs={24} sm={12}>
                                    <Button 
                                        block 
                                        icon={<DatabaseOutlined />}
                                        className="h-12 text-left"
                                    >
                                        Export Data
                                    </Button>
                                </Col>
                            </Row>
                        </Card>
                    </Col>
                </Row>

                {/* Additional Info */}
                <Card className="shadow-lg border-0 mt-8">
                    <Title level={4} className="text-gray-800 mb-4">About EventSphere</Title>
                    <Row gutter={[16, 16]}>
                        <Col xs={24} md={8}>
                            <div className="text-center">
                                <Text className="text-gray-500">Version</Text>
                                <br />
                                <Text strong>1.0.0</Text>
                            </div>
                        </Col>
                        <Col xs={24} md={8}>
                            <div className="text-center">
                                <Text className="text-gray-500">Last Updated</Text>
                                <br />
                                <Text strong>January 2024</Text>
                            </div>
                        </Col>
                        <Col xs={24} md={8}>
                            <div className="text-center">
                                <Text className="text-gray-500">Built with</Text>
                                <br />
                                <Text strong>React Router v7</Text>
                            </div>
                        </Col>
                    </Row>
                </Card>
            </div>
        </div>
    );
}
