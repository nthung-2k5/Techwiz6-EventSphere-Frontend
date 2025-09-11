import {
    Card,
    Typography,
    Button,
    Row,
    Col,
    Table,
    Tag,
    Space,
    message,
    Modal,
    Form,
    Input,
    Select,
    Empty,
    Badge,
    Tooltip
} from "antd";
import {
    DownloadOutlined,
    FileOutlined,
    TrophyOutlined,
    UserOutlined,
    ArrowLeftOutlined,
    PlusOutlined,
    EyeOutlined,
    CheckCircleOutlined,
    ClockCircleOutlined,
    ExclamationCircleOutlined
} from "@ant-design/icons";
import { useAuth } from "../context/AuthContext";
import { useEvents } from "../context/EventContext";
import { useNavigate } from "react-router";
import { useState } from "react";
import type { ColumnsType } from 'antd/es/table';

const { Title, Text } = Typography;
const { Option } = Select;

interface Certificate {
    id: number;
    eventId: number;
    eventTitle: string;
    participantId: string;
    participantName: string;
    status: 'pending' | 'generated' | 'issued';
    issueDate?: string;
    certificateUrl?: string;
    template: string;
}

export default function ManageCertificatesPage() {
    const { user } = useAuth();
    const { events } = useEvents();
    const navigate = useNavigate();
    const [isModalVisible, setIsModalVisible] = useState(false);
    const [selectedEvent, setSelectedEvent] = useState<number | null>(null);
    const [form] = Form.useForm();

    // Only show events organized by current user
    const organizedEvents = events.filter(event => 
        user && event.organizer === user.username && event.status === 'approved'
    );

    // Mock certificates data - in a real app, this would come from an API
    const [certificates, setCertificates] = useState<Certificate[]>([
        {
            id: 1,
            eventId: 1,
            eventTitle: "AI & Machine Learning Workshop",
            participantId: "participant",
            participantName: "John Doe",
            status: 'issued',
            issueDate: '2024-01-15',
            certificateUrl: '/certificates/cert-1.pdf',
            template: 'modern'
        },
        {
            id: 2,
            eventId: 1,
            eventTitle: "AI & Machine Learning Workshop",
            participantId: "student123",
            participantName: "Jane Smith",
            status: 'generated',
            template: 'modern'
        },
        {
            id: 3,
            eventId: 2,
            eventTitle: "Cultural Night 2025",
            participantId: "participant",
            participantName: "John Doe",
            status: 'pending',
            template: 'elegant'
        }
    ]);

    if (!user || user.role !== "organizer") {
        return (
            <div className="min-h-screen bg-gradient-to-br from-red-50 to-red-100 flex items-center justify-center p-4">
                <Card className="max-w-md w-full text-center">
                    <Title level={3} className="text-red-600">Access Restricted</Title>
                    <Text className="text-gray-600 mb-6">
                        Only organizers can manage certificates. Please contact an administrator if you need access.
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

    const handleGenerateCertificates = () => {
        if (!selectedEvent) {
            message.error("Please select an event first");
            return;
        }

        const event = events.find(e => e.id === selectedEvent);
        if (!event) {
            message.error("Event not found");
            return;
        }

        // Mock generating certificates for all participants
        message.success(`Generating certificates for ${event.title}...`);
        
        // Simulate certificate generation
        setTimeout(() => {
            message.success("Certificates generated successfully!");
            setIsModalVisible(false);
            form.resetFields();
        }, 2000);
    };

    const handleIssueCertificate = (certificateId: number) => {
        setCertificates(prev => prev.map(cert => 
            cert.id === certificateId 
                ? { ...cert, status: 'issued' as const, issueDate: new Date().toISOString().split('T')[0] }
                : cert
        ));
        message.success("Certificate issued successfully!");
    };

    const handleDownloadCertificate = (certificate: Certificate) => {
        message.success(`Downloading certificate for ${certificate.participantName}`);
    };

    const columns: ColumnsType<Certificate> = [
        {
            title: 'Event',
            dataIndex: 'eventTitle',
            key: 'eventTitle',
            render: (text: string) => <Text strong>{text}</Text>
        },
        {
            title: 'Participant',
            dataIndex: 'participantName',
            key: 'participantName',
            render: (text: string, record: Certificate) => (
                <Space>
                    <UserOutlined className="text-gray-400" />
                    <span>{text}</span>
                    <Text type="secondary" className="text-xs">({record.participantId})</Text>
                </Space>
            )
        },
        {
            title: 'Template',
            dataIndex: 'template',
            key: 'template',
            render: (template: string) => (
                <Tag color="blue">{template.charAt(0).toUpperCase() + template.slice(1)}</Tag>
            )
        },
        {
            title: 'Status',
            dataIndex: 'status',
            key: 'status',
            render: (status: string) => {
                const statusConfig = {
                    pending: { color: 'orange', icon: <ClockCircleOutlined />, text: 'Pending' },
                    generated: { color: 'blue', icon: <FileOutlined />, text: 'Generated' },
                    issued: { color: 'green', icon: <CheckCircleOutlined />, text: 'Issued' }
                };
                const config = statusConfig[status as keyof typeof statusConfig];
                return (
                    <Badge 
                        status={config.color as "success" | "processing" | "default" | "error" | "warning"} 
                        text={
                            <Space>
                                {config.icon}
                                {config.text}
                            </Space>
                        } 
                    />
                );
            }
        },
        {
            title: 'Issue Date',
            dataIndex: 'issueDate',
            key: 'issueDate',
            render: (date: string) => date || '-'
        },
        {
            title: 'Actions',
            key: 'actions',
            render: (_, record: Certificate) => (
                <Space>
                    {record.status === 'generated' && (
                        <Tooltip title="Issue Certificate">
                            <Button 
                                type="primary" 
                                size="small"
                                icon={<TrophyOutlined />}
                                onClick={() => handleIssueCertificate(record.id)}
                                className="bg-green-600 border-green-600"
                            >
                                Issue
                            </Button>
                        </Tooltip>
                    )}
                    {(record.status === 'generated' || record.status === 'issued') && (
                        <Tooltip title="Download Certificate">
                            <Button 
                                size="small"
                                icon={<DownloadOutlined />}
                                onClick={() => handleDownloadCertificate(record)}
                            >
                                Download
                            </Button>
                        </Tooltip>
                    )}
                    <Tooltip title="View Details">
                        <Button 
                            size="small"
                            icon={<EyeOutlined />}
                        >
                            View
                        </Button>
                    </Tooltip>
                </Space>
            )
        }
    ];

    const eventCertificatesCount = certificates.reduce((acc, cert) => {
        acc[cert.eventId] = (acc[cert.eventId] || 0) + 1;
        return acc;
    }, {} as Record<number, number>);

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
                                    <TrophyOutlined className="text-2xl" />
                                </div>
                                <div>
                                    <Title level={2} className="text-white mb-1">
                                        Manage Certificates
                                    </Title>
                                    <Text className="text-white/90">
                                        Generate, issue, and manage certificates for your events
                                    </Text>
                                </div>
                            </div>
                        </div>
                        
                        {/* Quick Stats */}
                        <Row gutter={[16, 16]}>
                            <Col xs={24} sm={8}>
                                <div className="text-center p-4 bg-blue-50 rounded-lg">
                                    <div className="text-blue-500 text-2xl mb-2">{certificates.filter(c => c.status === 'issued').length}</div>
                                    <Text>Issued Certificates</Text>
                                </div>
                            </Col>
                            <Col xs={24} sm={8}>
                                <div className="text-center p-4 bg-green-50 rounded-lg">
                                    <div className="text-green-500 text-2xl mb-2">{certificates.filter(c => c.status === 'generated').length}</div>
                                    <Text>Ready to Issue</Text>
                                </div>
                            </Col>
                            <Col xs={24} sm={8}>
                                <div className="text-center p-4 bg-orange-50 rounded-lg">
                                    <div className="text-orange-500 text-2xl mb-2">{certificates.filter(c => c.status === 'pending').length}</div>
                                    <Text>Pending Generation</Text>
                                </div>
                            </Col>
                        </Row>
                    </Card>
                </div>

                <Row gutter={[24, 24]}>
                    {/* Events Overview */}
                    <Col xs={24} lg={8}>
                        <Card title="Your Events" className="shadow-lg border-0">
                            {organizedEvents.length === 0 ? (
                                <Empty 
                                    description="No events found"
                                    image={Empty.PRESENTED_IMAGE_SIMPLE}
                                />
                            ) : (
                                <Space direction="vertical" className="w-full">
                                    {organizedEvents.map(event => (
                                        <Card 
                                            key={event.id} 
                                            size="small"
                                            className="hover:shadow-md transition-shadow cursor-pointer"
                                            onClick={() => setSelectedEvent(event.id)}
                                            style={{ 
                                                backgroundColor: selectedEvent === event.id ? '#f0f5ff' : 'white',
                                                border: selectedEvent === event.id ? '2px solid #1890ff' : '1px solid #f0f0f0'
                                            }}
                                        >
                                            <div className="flex justify-between items-start">
                                                <div className="flex-1">
                                                    <Text strong className="block">{event.title}</Text>
                                                    <Text type="secondary" className="text-sm">
                                                        {event.date || `${event.startDate} - ${event.endDate}`}
                                                    </Text>
                                                </div>
                                                <div className="text-right">
                                                    <Badge 
                                                        count={eventCertificatesCount[event.id] || 0} 
                                                        showZero 
                                                        color="#52c41a"
                                                    />
                                                    <div className="text-xs text-gray-500 mt-1">
                                                        certificates
                                                    </div>
                                                </div>
                                            </div>
                                        </Card>
                                    ))}
                                </Space>
                            )}
                            
                            <Button 
                                type="primary" 
                                block 
                                icon={<PlusOutlined />}
                                className="mt-4 bg-gradient-to-r from-blue-500 to-purple-600 border-none"
                                onClick={() => setIsModalVisible(true)}
                                disabled={!selectedEvent}
                            >
                                Generate Certificates
                            </Button>
                        </Card>
                    </Col>

                    {/* Certificates Table */}
                    <Col xs={24} lg={16}>
                        <Card 
                            title={
                                <Space>
                                    <TrophyOutlined />
                                    <span>Certificate Management</span>
                                </Space>
                            } 
                            className="shadow-lg border-0"
                        >
                            {certificates.length === 0 ? (
                                <Empty 
                                    description="No certificates found"
                                    image={Empty.PRESENTED_IMAGE_SIMPLE}
                                >
                                    <Text type="secondary">
                                        Generate certificates for your events to get started.
                                    </Text>
                                </Empty>
                            ) : (
                                <Table
                                    columns={columns}
                                    dataSource={certificates}
                                    rowKey="id"
                                    pagination={{ pageSize: 10 }}
                                    scroll={{ x: 800 }}
                                />
                            )}
                        </Card>
                    </Col>
                </Row>

                {/* Generate Certificates Modal */}
                <Modal
                    title="Generate Certificates"
                    open={isModalVisible}
                    onOk={handleGenerateCertificates}
                    onCancel={() => setIsModalVisible(false)}
                    okText="Generate"
                    okButtonProps={{
                        className: "bg-gradient-to-r from-blue-500 to-purple-600 border-none"
                    }}
                >
                    <Form form={form} layout="vertical">
                        <Form.Item
                            label="Event"
                            name="eventId"
                            initialValue={selectedEvent}
                        >
                            <Select placeholder="Select an event">
                                {organizedEvents.map(event => (
                                    <Option key={event.id} value={event.id}>
                                        {event.title}
                                    </Option>
                                ))}
                            </Select>
                        </Form.Item>

                        <Form.Item
                            label="Certificate Template"
                            name="template"
                            initialValue="modern"
                        >
                            <Select>
                                <Option value="modern">Modern Template</Option>
                                <Option value="elegant">Elegant Template</Option>
                                <Option value="classic">Classic Template</Option>
                                <Option value="minimal">Minimal Template</Option>
                            </Select>
                        </Form.Item>

                        <Form.Item
                            label="Additional Notes"
                            name="notes"
                        >
                            <Input.TextArea 
                                rows={3} 
                                placeholder="Any special instructions or notes for certificate generation..."
                            />
                        </Form.Item>

                        <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4">
                            <Space>
                                <ExclamationCircleOutlined className="text-yellow-600" />
                                <Text className="text-yellow-800">
                                    This will generate certificates for all registered participants of the selected event.
                                </Text>
                            </Space>
                        </div>
                    </Form>
                </Modal>
            </div>
        </div>
    );
}
  