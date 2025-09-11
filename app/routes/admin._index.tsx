import { Card, Row, Col, Typography, Statistic, Button, Space } from "antd";
import { useAuth } from "../context/AuthContext";
import { useEvents } from "../context/EventContext";
import { Navigate } from "react-router";
import {
    UserOutlined,
    CalendarOutlined,
    ClockCircleOutlined,
    TrophyOutlined,
    SettingOutlined
} from "@ant-design/icons";

const { Title, Text } = Typography;

export default function AdminDashboard() {
    const { user, users } = useAuth();
    const { events } = useEvents();

    if (!user || user.role !== "admin") {
        return <Navigate to="/login" replace />;
    }

    const pendingEvents = events.filter(event => event.status === 'pending');
    const totalRegistrations = events.reduce((sum, event) => sum + event.currentParticipants, 0);

    return (
        <div className="p-0">
            <div className="mb-8">
                <Title level={2} className="text-gray-800 mb-2">Admin Dashboard</Title>
                <Text type="secondary" className="text-lg">Manage users, events, and system settings</Text>
            </div>

            {/* Statistics */}
            <Row gutter={[24, 24]} className="mb-8">
                <Col xs={24} sm={12} md={6}>
                    <Card className="text-center rounded-xl shadow-lg border-0 bg-gradient-to-br from-blue-50 to-blue-100 hover:shadow-xl transition-shadow duration-300">
                        <Statistic
                            title="Total Users"
                            value={users.length}
                            prefix={<UserOutlined className="text-blue-500" />}
                            valueStyle={{ color: '#1890ff' }}
                        />
                    </Card>
                </Col>
                <Col xs={24} sm={12} md={6}>
                    <Card className="text-center rounded-xl shadow-lg border-0 bg-gradient-to-br from-green-50 to-green-100 hover:shadow-xl transition-shadow duration-300">
                        <Statistic
                            title="Total Events"
                            value={events.length}
                            prefix={<CalendarOutlined className="text-green-500" />}
                            valueStyle={{ color: '#52c41a' }}
                        />
                    </Card>
                </Col>
                <Col xs={24} sm={12} md={6}>
                    <Card className="text-center rounded-xl shadow-lg border-0 bg-gradient-to-br from-yellow-50 to-yellow-100 hover:shadow-xl transition-shadow duration-300">
                        <Statistic
                            title="Pending Approvals"
                            value={pendingEvents.length}
                            prefix={<ClockCircleOutlined className="text-yellow-500" />}
                            valueStyle={{ color: '#faad14' }}
                        />
                    </Card>
                </Col>
                <Col xs={24} sm={12} md={6}>
                    <Card className="text-center rounded-xl shadow-lg border-0 bg-gradient-to-br from-red-50 to-red-100 hover:shadow-xl transition-shadow duration-300">
                        <Statistic
                            title="Total Registrations"
                            value={totalRegistrations}
                            prefix={<TrophyOutlined className="text-red-500" />}
                            valueStyle={{ color: '#f5222d' }}
                        />
                    </Card>
                </Col>
            </Row>

            {/* Quick Admin Actions */}
            <Card className="rounded-xl shadow-lg border-0 bg-white hover:shadow-xl transition-shadow duration-300">
                <Title level={3} className="text-gray-800 mb-4">Administrative Tools</Title>
                <Text type="secondary" className="block mb-6 text-base">
                    Access key administrative functions and system management tools
                </Text>
                <Space direction="vertical" className="w-full" size="middle">
                    <Button 
                        type="primary" 
                        block 
                        size="large"
                        icon={<SettingOutlined />}
                        href="/admin/settings"
                        className="h-14 rounded-lg bg-gradient-to-r from-blue-500 to-purple-600 border-0 hover:from-blue-600 hover:to-purple-700 transition-all duration-300 text-lg font-semibold"
                    >
                        System Settings
                    </Button>
                    <Button 
                        block 
                        size="large"
                        icon={<CalendarOutlined />}
                        href="/events"
                        className="h-14 rounded-lg border-2 border-gray-300 hover:border-blue-500 hover:text-blue-500 transition-all duration-300 text-lg font-semibold"
                    >
                        View All Events
                    </Button>
                    <Button 
                        block 
                        size="large"
                        icon={<UserOutlined />}
                        href="/event/create"
                        className="h-14 rounded-lg border-2 border-gray-300 hover:border-green-500 hover:text-green-500 transition-all duration-300 text-lg font-semibold"
                    >
                        Create Event
                    </Button>
                </Space>
            </Card>
        </div>
    );
}
