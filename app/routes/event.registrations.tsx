import {
    Card,
    Typography,
    Button,
    Row,
    Col,
    Table,
    Tag,
    Space,
    Input,
    Select,
    Badge,
    Modal,
    message,
    Tooltip,
    Avatar,
    Statistic,
    Empty
} from "antd";
import {
    UserOutlined,
    MailOutlined,
    CalendarOutlined,
    SearchOutlined,
    FilterOutlined,
    ExportOutlined,
    CheckCircleOutlined,
    CloseCircleOutlined,
    ArrowLeftOutlined,
    TeamOutlined,
    EyeOutlined
} from "@ant-design/icons";
import { useAuth } from "../context/AuthContext";
import { useEvents } from "../context/EventContext";
import { useNavigate } from "react-router";
import { useState } from "react";
import type { ColumnsType } from 'antd/es/table';

const { Title, Text } = Typography;
const { Option } = Select;
const { Search } = Input;

interface Registration {
    id: number;
    eventId: number;
    eventTitle: string;
    participantId: string;
    participantName: string;
    participantEmail: string;
    registrationDate: string;
    status: 'confirmed' | 'pending' | 'cancelled';
    checkInStatus: 'checked-in' | 'not-checked-in';
    paymentStatus: 'paid' | 'pending' | 'not-required';
    department: string;
    enrollmentNumber?: string;
}

export default function EventRegistrationsPage() {
    const { user } = useAuth();
    const { events } = useEvents();
    const navigate = useNavigate();
    const [selectedEvent, setSelectedEvent] = useState<number | null>(null);
    const [searchText, setSearchText] = useState("");
    const [statusFilter, setStatusFilter] = useState<string>("");
    const [checkInFilter, setCheckInFilter] = useState<string>("");

    // Only show events organized by current user
    const organizedEvents = events.filter(event => 
        user && event.organizer === user.username
    );

    // Mock registrations data - in a real app, this would come from an API
    const [registrations] = useState<Registration[]>([
        {
            id: 1,
            eventId: 1,
            eventTitle: "AI & Machine Learning Workshop",
            participantId: "participant",
            participantName: "John Doe",
            participantEmail: "john.doe@university.edu",
            registrationDate: "2024-01-10",
            status: 'confirmed',
            checkInStatus: 'checked-in',
            paymentStatus: 'paid',
            department: "Computer Science",
            enrollmentNumber: "CS2023001"
        },
        {
            id: 2,
            eventId: 1,
            eventTitle: "AI & Machine Learning Workshop",
            participantId: "student123",
            participantName: "Jane Smith",
            participantEmail: "jane.smith@university.edu",
            registrationDate: "2024-01-12",
            status: 'confirmed',
            checkInStatus: 'not-checked-in',
            paymentStatus: 'paid',
            department: "Computer Science",
            enrollmentNumber: "CS2023045"
        },
        {
            id: 3,
            eventId: 1,
            eventTitle: "AI & Machine Learning Workshop",
            participantId: "alex789",
            participantName: "Alex Johnson",
            participantEmail: "alex.johnson@university.edu",
            registrationDate: "2024-01-08",
            status: 'pending',
            checkInStatus: 'not-checked-in',
            paymentStatus: 'pending',
            department: "Mathematics",
            enrollmentNumber: "MATH2023012"
        },
        {
            id: 4,
            eventId: 2,
            eventTitle: "Cultural Night 2025",
            participantId: "participant",
            participantName: "John Doe",
            participantEmail: "john.doe@university.edu",
            registrationDate: "2024-01-05",
            status: 'confirmed',
            checkInStatus: 'checked-in',
            paymentStatus: 'not-required',
            department: "Computer Science",
            enrollmentNumber: "CS2023001"
        },
        {
            id: 5,
            eventId: 2,
            eventTitle: "Cultural Night 2025",
            participantId: "sarah456",
            participantName: "Sarah Chen",
            participantEmail: "sarah.chen@university.edu",
            registrationDate: "2024-01-07",
            status: 'confirmed',
            checkInStatus: 'not-checked-in',
            paymentStatus: 'not-required',
            department: "Business",
            enrollmentNumber: "BUS2023089"
        },
        {
            id: 6,
            eventId: 3,
            eventTitle: "Startup Pitch Competition",
            participantId: "mike789",
            participantName: "Mike Rodriguez",
            participantEmail: "mike.rodriguez@university.edu",
            registrationDate: "2024-01-03",
            status: 'confirmed',
            checkInStatus: 'checked-in',
            paymentStatus: 'paid',
            department: "Business",
            enrollmentNumber: "BUS2023156"
        }
    ]);

    if (!user || user.role !== "organizer") {
        return (
            <div className="min-h-screen bg-gradient-to-br from-red-50 to-red-100 flex items-center justify-center p-4">
                <Card className="max-w-md w-full text-center">
                    <Title level={3} className="text-red-600">Access Restricted</Title>
                    <Text className="text-gray-600 mb-6">
                        Only organizers can view event registrations. Please contact an administrator if you need access.
                    </Text>
                    <Space>
                        <Button 
                            icon={<ArrowLeftOutlined />}
                            onClick={() => navigate("/dashboard")}
                        >
                            Back to Dashboard
                        </Button>
                        <Button 
                            type="primary" 
                            onClick={() => navigate("/events")}
                            className="bg-gradient-to-r from-blue-500 to-purple-600 border-none"
                        >
                            Browse Events
                        </Button>
                    </Space>
                </Card>
            </div>
        );
    }

    const filteredRegistrations = registrations.filter(reg => {
        const matchesEvent = !selectedEvent || reg.eventId === selectedEvent;
        const matchesSearch = !searchText || 
            reg.participantName.toLowerCase().includes(searchText.toLowerCase()) ||
            reg.participantEmail.toLowerCase().includes(searchText.toLowerCase()) ||
            reg.enrollmentNumber?.toLowerCase().includes(searchText.toLowerCase());
        const matchesStatus = !statusFilter || reg.status === statusFilter;
        const matchesCheckIn = !checkInFilter || reg.checkInStatus === checkInFilter;
        
        return matchesEvent && matchesSearch && matchesStatus && matchesCheckIn;
    });

    const handleApproveRegistration = () => {
        message.success("Registration approved successfully!");
    };

    const handleRejectRegistration = () => {
        Modal.confirm({
            title: 'Reject Registration',
            content: 'Are you sure you want to reject this registration?',
            okText: 'Reject',
            okType: 'danger',
            onOk: () => {
                message.success("Registration rejected");
            }
        });
    };

    const handleExportData = () => {
        message.success("Exporting registration data...");
    };

    const columns: ColumnsType<Registration> = [
        {
            title: 'Participant',
            key: 'participant',
            render: (_, record: Registration) => (
                <Space>
                    <Avatar icon={<UserOutlined />} className="bg-blue-500" />
                    <div>
                        <div className="font-semibold">{record.participantName}</div>
                        <div className="text-gray-500 text-sm">{record.enrollmentNumber}</div>
                    </div>
                </Space>
            ),
            width: 200
        },
        {
            title: 'Contact',
            key: 'contact',
            render: (_, record: Registration) => (
                <Space direction="vertical" size="small">
                    <Space>
                        <MailOutlined className="text-gray-400" />
                        <Text className="text-sm">{record.participantEmail}</Text>
                    </Space>
                    <Text className="text-gray-500 text-xs">{record.department}</Text>
                </Space>
            ),
            width: 250
        },
        {
            title: 'Registration Date',
            dataIndex: 'registrationDate',
            key: 'registrationDate',
            render: (date: string) => (
                <Space>
                    <CalendarOutlined className="text-gray-400" />
                    <Text>{date}</Text>
                </Space>
            ),
            width: 160
        },
        {
            title: 'Status',
            dataIndex: 'status',
            key: 'status',
            render: (status: string) => {
                const statusConfig = {
                    confirmed: { color: 'green', text: 'Confirmed' },
                    pending: { color: 'orange', text: 'Pending' },
                    cancelled: { color: 'red', text: 'Cancelled' }
                };
                const config = statusConfig[status as keyof typeof statusConfig];
                return <Tag color={config.color}>{config.text}</Tag>;
            },
            width: 120
        },
        {
            title: 'Check-in',
            dataIndex: 'checkInStatus',
            key: 'checkInStatus',
            render: (status: string) => (
                <Badge 
                    status={status === 'checked-in' ? 'success' : 'default'}
                    text={status === 'checked-in' ? 'Checked In' : 'Not Checked In'}
                />
            ),
            width: 130
        },
        {
            title: 'Payment',
            dataIndex: 'paymentStatus',
            key: 'paymentStatus',
            render: (status: string) => {
                const statusConfig = {
                    paid: { color: 'green', text: 'Paid' },
                    pending: { color: 'orange', text: 'Pending' },
                    'not-required': { color: 'blue', text: 'Free' }
                };
                const config = statusConfig[status as keyof typeof statusConfig];
                return <Tag color={config.color}>{config.text}</Tag>;
            },
            width: 100
        },
        {
            title: 'Actions',
            key: 'actions',
            render: (_, record: Registration) => (
                <Space>
                    {record.status === 'pending' && (
                        <>
                            <Tooltip title="Approve Registration">
                                <Button 
                                    size="small"
                                    type="primary"
                                    icon={<CheckCircleOutlined />}
                                    onClick={() => handleApproveRegistration()}
                                    className="bg-green-600 border-green-600"
                                >
                                    Approve
                                </Button>
                            </Tooltip>
                            <Tooltip title="Reject Registration">
                                <Button 
                                    size="small"
                                    danger
                                    icon={<CloseCircleOutlined />}
                                    onClick={() => handleRejectRegistration()}
                                >
                                    Reject
                                </Button>
                            </Tooltip>
                        </>
                    )}
                    <Tooltip title="View Details">
                        <Button size="small" icon={<EyeOutlined />} />
                    </Tooltip>
                </Space>
            ),
            width: 200
        }
    ];

    const getEventStats = (eventId: number) => {
        const eventRegs = registrations.filter(reg => reg.eventId === eventId);
        return {
            total: eventRegs.length,
            confirmed: eventRegs.filter(reg => reg.status === 'confirmed').length,
            pending: eventRegs.filter(reg => reg.status === 'pending').length,
            checkedIn: eventRegs.filter(reg => reg.checkInStatus === 'checked-in').length
        };
    };

    return (
        <div className="min-h-screen bg-gradient-to-br from-blue-50 via-purple-50 to-pink-50 p-4 lg:p-8">
            <div className="max-w-7xl mx-auto">
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
                                    <TeamOutlined className="text-2xl" />
                                </div>
                                <div>
                                    <Title level={2} className="text-white mb-1">
                                        Event Registrations
                                    </Title>
                                    <Text className="text-white/90">
                                        Manage participant registrations for your events
                                    </Text>
                                </div>
                            </div>
                        </div>
                        
                        {/* Summary Stats */}
                        <Row gutter={[16, 16]}>
                            <Col xs={24} sm={6}>
                                <div className="text-center p-4 bg-blue-50 rounded-lg">
                                    <Statistic
                                        title="Total Registrations"
                                        value={registrations.length}
                                        prefix={<UserOutlined className="text-blue-500" />}
                                        valueStyle={{ color: '#1890ff' }}
                                    />
                                </div>
                            </Col>
                            <Col xs={24} sm={6}>
                                <div className="text-center p-4 bg-green-50 rounded-lg">
                                    <Statistic
                                        title="Confirmed"
                                        value={registrations.filter(r => r.status === 'confirmed').length}
                                        prefix={<CheckCircleOutlined className="text-green-500" />}
                                        valueStyle={{ color: '#52c41a' }}
                                    />
                                </div>
                            </Col>
                            <Col xs={24} sm={6}>
                                <div className="text-center p-4 bg-orange-50 rounded-lg">
                                    <Statistic
                                        title="Pending"
                                        value={registrations.filter(r => r.status === 'pending').length}
                                        prefix={<CloseCircleOutlined className="text-orange-500" />}
                                        valueStyle={{ color: '#faad14' }}
                                    />
                                </div>
                            </Col>
                            <Col xs={24} sm={6}>
                                <div className="text-center p-4 bg-purple-50 rounded-lg">
                                    <Statistic
                                        title="Checked In"
                                        value={registrations.filter(r => r.checkInStatus === 'checked-in').length}
                                        prefix={<CalendarOutlined className="text-purple-500" />}
                                        valueStyle={{ color: '#722ed1' }}
                                    />
                                </div>
                            </Col>
                        </Row>
                    </Card>
                </div>

                <Row gutter={[24, 24]}>
                    {/* Event Selection */}
                    <Col xs={24} lg={8}>
                        <Card title="Your Events" className="shadow-lg border-0 mb-6">
                            {organizedEvents.length === 0 ? (
                                <Empty 
                                    description="No events found"
                                    image={Empty.PRESENTED_IMAGE_SIMPLE}
                                />
                            ) : (
                                <Space direction="vertical" className="w-full">
                                    <Button
                                        block
                                        type={selectedEvent === null ? "primary" : "default"}
                                        onClick={() => setSelectedEvent(null)}
                                        className={selectedEvent === null ? "bg-blue-600" : ""}
                                    >
                                        All Events ({registrations.length})
                                    </Button>
                                    {organizedEvents.map(event => {
                                        const stats = getEventStats(event.id);
                                        return (
                                            <Button
                                                key={event.id}
                                                block
                                                type={selectedEvent === event.id ? "primary" : "default"}
                                                onClick={() => setSelectedEvent(event.id)}
                                                className={`text-left ${selectedEvent === event.id ? "bg-blue-600" : ""}`}
                                            >
                                                <div className="flex justify-between items-center w-full">
                                                    <div className="flex-1 text-left">
                                                        <div className="font-medium">{event.title}</div>
                                                        <div className="text-xs opacity-70">
                                                            {stats.confirmed}/{stats.total} confirmed
                                                        </div>
                                                    </div>
                                                    <Badge count={stats.total} color="blue" />
                                                </div>
                                            </Button>
                                        );
                                    })}
                                </Space>
                            )}
                        </Card>

                        {/* Filters */}
                        <Card title="Filters" className="shadow-lg border-0">
                            <Space direction="vertical" className="w-full">
                                <div>
                                    <Text className="block mb-2">Search Participants</Text>
                                    <Search
                                        placeholder="Name, email, or enrollment number"
                                        value={searchText}
                                        onChange={(e) => setSearchText(e.target.value)}
                                        prefix={<SearchOutlined />}
                                    />
                                </div>
                                
                                <div>
                                    <Text className="block mb-2">Status</Text>
                                    <Select
                                        placeholder="All statuses"
                                        value={statusFilter}
                                        onChange={setStatusFilter}
                                        className="w-full"
                                        allowClear
                                    >
                                        <Option value="confirmed">Confirmed</Option>
                                        <Option value="pending">Pending</Option>
                                        <Option value="cancelled">Cancelled</Option>
                                    </Select>
                                </div>

                                <div>
                                    <Text className="block mb-2">Check-in Status</Text>
                                    <Select
                                        placeholder="All check-in statuses"
                                        value={checkInFilter}
                                        onChange={setCheckInFilter}
                                        className="w-full"
                                        allowClear
                                    >
                                        <Option value="checked-in">Checked In</Option>
                                        <Option value="not-checked-in">Not Checked In</Option>
                                    </Select>
                                </div>

                                <Button 
                                    block
                                    icon={<FilterOutlined />}
                                    onClick={() => {
                                        setSearchText("");
                                        setStatusFilter("");
                                        setCheckInFilter("");
                                    }}
                                >
                                    Clear Filters
                                </Button>
                            </Space>
                        </Card>
                    </Col>

                    {/* Registrations Table */}
                    <Col xs={24} lg={16}>
                        <Card 
                            title={
                                <div className="flex justify-between items-center">
                                    <Space>
                                        <TeamOutlined />
                                        <span>
                                            {selectedEvent 
                                                ? `${organizedEvents.find(e => e.id === selectedEvent)?.title || 'Unknown Event'} Registrations`
                                                : 'All Registrations'
                                            }
                                        </span>
                                        <Badge count={filteredRegistrations.length} color="blue" />
                                    </Space>
                                    <Button 
                                        type="primary" 
                                        icon={<ExportOutlined />}
                                        onClick={handleExportData}
                                        className="bg-green-600 border-green-600"
                                    >
                                        Export
                                    </Button>
                                </div>
                            } 
                            className="shadow-lg border-0"
                        >
                            {filteredRegistrations.length === 0 ? (
                                <Empty 
                                    description="No registrations found"
                                    image={Empty.PRESENTED_IMAGE_SIMPLE}
                                >
                                    <Text type="secondary">
                                        No registrations match your current filters.
                                    </Text>
                                </Empty>
                            ) : (
                                <Table
                                    columns={columns}
                                    dataSource={filteredRegistrations}
                                    rowKey="id"
                                    pagination={{ 
                                        pageSize: 10,
                                        showSizeChanger: true,
                                        showTotal: (total, range) => 
                                            `${range[0]}-${range[1]} of ${total} registrations`
                                    }}
                                    scroll={{ x: 1200 }}
                                />
                            )}
                        </Card>
                    </Col>
                </Row>
            </div>
        </div>
    );
}
  