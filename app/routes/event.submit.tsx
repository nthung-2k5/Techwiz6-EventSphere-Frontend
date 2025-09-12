import {
    Card,
    Typography,
    Button,
    Row,
    Col,
    Table,
    Tag,
    Space,
    Modal,
    message,
    Tooltip,
    Empty,
    Badge,
    Form,
    Input,
    Select
} from "antd";
import {
    SendOutlined,
    ClockCircleOutlined,
    CheckCircleOutlined,
    CloseCircleOutlined,
    EyeOutlined,
    EditOutlined,
    DeleteOutlined,
    ArrowLeftOutlined,
    FileTextOutlined,
    ExclamationCircleOutlined
} from "@ant-design/icons";
import { useAuth } from "../context/AuthContext";
import { useEvents } from "../context/EventContext";
import { useNavigate } from "react-router";
import { useState } from "react";
import type { ColumnsType } from 'antd/es/table';

const { Title, Text, Paragraph } = Typography;
const { TextArea } = Input;
const { Option } = Select;

interface SubmissionRequest {
    id: number;
    eventId: number;
    eventTitle: string;
    submissionType: 'new-event' | 'event-update' | 'event-cancellation';
    status: 'pending' | 'approved' | 'rejected' | 'needs-revision';
    submissionDate: string;
    reviewDate?: string;
    adminComments?: string;
    requestDescription: string;
}

export default function SubmitEventPage() {
    const { user } = useAuth();
    const { events } = useEvents();
    const navigate = useNavigate();
    const [isModalVisible, setIsModalVisible] = useState(false);
    const [form] = Form.useForm();

    // Only show events organized by current user
    const organizedEvents = events.filter(event => 
        user && event.organizer === user.username
    );

    // Mock submissions data - in a real app, this would come from an API
    const [submissions, setSubmissions] = useState<SubmissionRequest[]>([
        {
            id: 1,
            eventId: 1,
            eventTitle: "AI & Machine Learning Workshop",
            submissionType: 'new-event',
            status: 'approved',
            submissionDate: "2024-01-05",
            reviewDate: "2024-01-06",
            adminComments: "Great event proposal! Approved with no changes needed.",
            requestDescription: "Initial submission for AI workshop focusing on practical applications"
        },
        {
            id: 2,
            eventId: 2,
            eventTitle: "Cultural Night 2025",
            submissionType: 'event-update',
            status: 'pending',
            submissionDate: "2024-01-12",
            requestDescription: "Request to extend registration deadline by 3 days due to high interest"
        },
        {
            id: 3,
            eventId: 3,
            eventTitle: "Startup Pitch Competition",
            submissionType: 'new-event',
            status: 'needs-revision',
            submissionDate: "2024-01-08",
            reviewDate: "2024-01-10",
            adminComments: "Please provide more details about the judging criteria and prize allocation.",
            requestDescription: "New startup competition with investor panel and cash prizes"
        }
    ]);

    if (!user || user.role !== "organizer") {
        return (
            <div className="min-h-screen bg-gradient-to-br from-red-50 to-red-100 flex items-center justify-center p-4">
                <Card className="max-w-md w-full text-center">
                    <Title level={3} className="text-red-600">Access Restricted</Title>
                    <Text className="text-gray-600 mb-6">
                        Only organizers can submit events for approval. Please contact an administrator if you need access.
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

    const handleSubmitRequest = () => {
        form.validateFields().then(values => {
            const newSubmission: SubmissionRequest = {
                id: Math.max(...submissions.map(s => s.id), 0) + 1,
                eventId: values.eventId,
                eventTitle: events.find(e => e.id === values.eventId)?.title || 'Unknown Event',
                submissionType: values.submissionType,
                status: 'pending',
                submissionDate: new Date().toISOString().split('T')[0],
                requestDescription: values.description
            };

            setSubmissions(prev => [...prev, newSubmission]);
            message.success("Submission sent for review!");
            setIsModalVisible(false);
            form.resetFields();
        });
    };

    const handleDeleteSubmission = (submissionId: number) => {
        Modal.confirm({
            title: 'Delete Submission',
            content: 'Are you sure you want to delete this submission? This action cannot be undone.',
            okText: 'Delete',
            okType: 'danger',
            onOk: () => {
                setSubmissions(prev => prev.filter(sub => sub.id !== submissionId));
                message.success('Submission deleted successfully');
            }
        });
    };

    const handleViewDetails = (submission: SubmissionRequest) => {
        Modal.info({
            title: 'Submission Details',
            width: 600,
            content: (
                <div>
                    <div className="mb-4">
                        <Text strong>Event:</Text> {submission.eventTitle}
                    </div>
                    <div className="mb-4">
                        <Text strong>Type:</Text> {submission.submissionType.replace('-', ' ').toUpperCase()}
                    </div>
                    <div className="mb-4">
                        <Text strong>Status:</Text> <Tag color={
                            submission.status === 'approved' ? 'green' :
                                submission.status === 'rejected' ? 'red' :
                                    submission.status === 'needs-revision' ? 'orange' : 'blue'
                        }>{submission.status.toUpperCase()}</Tag>
                    </div>
                    <div className="mb-4">
                        <Text strong>Submission Date:</Text> {submission.submissionDate}
                    </div>
                    {submission.reviewDate && (
                        <div className="mb-4">
                            <Text strong>Review Date:</Text> {submission.reviewDate}
                        </div>
                    )}
                    <div className="mb-4">
                        <Text strong>Description:</Text>
                        <div className="mt-2 p-3 bg-gray-50 rounded">
                            {submission.requestDescription}
                        </div>
                    </div>
                    {submission.adminComments && (
                        <div>
                            <Text strong>Admin Comments:</Text>
                            <div className="mt-2 p-3 bg-yellow-50 border border-yellow-200 rounded">
                                {submission.adminComments}
                            </div>
                        </div>
                    )}
                </div>
            )
        });
    };

    const columns: ColumnsType<SubmissionRequest> = [
        {
            title: 'Event',
            dataIndex: 'eventTitle',
            key: 'eventTitle',
            render: (text: string) => <Text strong>{text}</Text>,
            width: 250
        },
        {
            title: 'Type',
            dataIndex: 'submissionType',
            key: 'submissionType',
            render: (type: string) => {
                const typeConfig = {
                    'new-event': { color: 'blue', text: 'New Event' },
                    'event-update': { color: 'green', text: 'Update' },
                    'event-cancellation': { color: 'red', text: 'Cancellation' }
                };
                const config = typeConfig[type as keyof typeof typeConfig];
                return <Tag color={config.color}>{config.text}</Tag>;
            },
            width: 120
        },
        {
            title: 'Status',
            dataIndex: 'status',
            key: 'status',
            render: (status: string) => {
                const statusConfig = {
                    pending: { color: 'blue', icon: <ClockCircleOutlined /> },
                    approved: { color: 'green', icon: <CheckCircleOutlined /> },
                    rejected: { color: 'red', icon: <CloseCircleOutlined /> },
                    'needs-revision': { color: 'orange', icon: <ExclamationCircleOutlined /> }
                };
                const config = statusConfig[status as keyof typeof statusConfig];
                return (
                    <Space>
                        <Badge status={config.color as "success" | "processing" | "default" | "error" | "warning"} />
                        {config.icon}
                        <span>{status.replace('-', ' ').toUpperCase()}</span>
                    </Space>
                );
            },
            width: 150
        },
        {
            title: 'Submitted',
            dataIndex: 'submissionDate',
            key: 'submissionDate',
            width: 120
        },
        {
            title: 'Description',
            dataIndex: 'requestDescription',
            key: 'requestDescription',
            render: (text: string) => (
                <Paragraph ellipsis={{ rows: 2 }} className="mb-0">
                    {text}
                </Paragraph>
            ),
            width: 200
        },
        {
            title: 'Actions',
            key: 'actions',
            render: (_, record: SubmissionRequest) => (
                <Space>
                    <Tooltip title="View Details">
                        <Button 
                            size="small"
                            icon={<EyeOutlined />}
                            onClick={() => handleViewDetails(record)}
                        />
                    </Tooltip>
                    {record.status === 'needs-revision' && (
                        <Tooltip title="Edit Submission">
                            <Button 
                                size="small"
                                type="primary"
                                icon={<EditOutlined />}
                                className="bg-blue-600"
                            />
                        </Tooltip>
                    )}
                    {record.status === 'pending' && (
                        <Tooltip title="Delete Submission">
                            <Button 
                                size="small"
                                danger
                                icon={<DeleteOutlined />}
                                onClick={() => handleDeleteSubmission(record.id)}
                            />
                        </Tooltip>
                    )}
                </Space>
            ),
            width: 150
        }
    ];

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
                                    <SendOutlined className="text-2xl" />
                                </div>
                                <div>
                                    <Title level={2} className="text-white mb-1">
                                        Submit for Approval
                                    </Title>
                                    <Text className="text-white/90">
                                        Submit events and changes for administrative review
                                    </Text>
                                </div>
                            </div>
                        </div>
                        
                        {/* Quick Stats */}
                        <Row gutter={[16, 16]}>
                            <Col xs={24} sm={6}>
                                <div className="text-center p-4 bg-blue-50 rounded-lg">
                                    <div className="text-blue-500 text-2xl mb-2">{submissions.filter(s => s.status === 'pending').length}</div>
                                    <Text>Pending Review</Text>
                                </div>
                            </Col>
                            <Col xs={24} sm={6}>
                                <div className="text-center p-4 bg-green-50 rounded-lg">
                                    <div className="text-green-500 text-2xl mb-2">{submissions.filter(s => s.status === 'approved').length}</div>
                                    <Text>Approved</Text>
                                </div>
                            </Col>
                            <Col xs={24} sm={6}>
                                <div className="text-center p-4 bg-orange-50 rounded-lg">
                                    <div className="text-orange-500 text-2xl mb-2">{submissions.filter(s => s.status === 'needs-revision').length}</div>
                                    <Text>Needs Revision</Text>
                                </div>
                            </Col>
                            <Col xs={24} sm={6}>
                                <div className="text-center p-4 bg-red-50 rounded-lg">
                                    <div className="text-red-500 text-2xl mb-2">{submissions.filter(s => s.status === 'rejected').length}</div>
                                    <Text>Rejected</Text>
                                </div>
                            </Col>
                        </Row>
                    </Card>
                </div>

                <Row gutter={[24, 24]}>
                    {/* Quick Actions */}
                    <Col xs={24} lg={8}>
                        <Card title="Quick Actions" className="shadow-lg border-0 mb-6">
                            <Space direction="vertical" className="w-full">
                                <Button 
                                    type="primary" 
                                    block 
                                    icon={<SendOutlined />}
                                    onClick={() => setIsModalVisible(true)}
                                    className="bg-gradient-to-r from-blue-500 to-purple-600 border-none h-12"
                                    size="large"
                                >
                                    New Submission
                                </Button>
                                <Button 
                                    block 
                                    icon={<FileTextOutlined />}
                                    onClick={() => navigate("/event/create")}
                                    size="large"
                                    className="h-12"
                                >
                                    Create New Event
                                </Button>
                            </Space>
                        </Card>

                        <Card title="Submission Guidelines" className="shadow-lg border-0">
                            <Space direction="vertical" className="w-full">
                                <div>
                                    <Text strong className="text-blue-600">📝 New Events</Text>
                                    <div className="text-sm text-gray-600 mt-1">
                                        Submit completely new events for approval
                                    </div>
                                </div>
                                <div>
                                    <Text strong className="text-green-600">✏️ Event Updates</Text>
                                    <div className="text-sm text-gray-600 mt-1">
                                        Request changes to existing approved events
                                    </div>
                                </div>
                                <div>
                                    <Text strong className="text-red-600">❌ Cancellations</Text>
                                    <div className="text-sm text-gray-600 mt-1">
                                        Request cancellation of scheduled events
                                    </div>
                                </div>
                            </Space>
                        </Card>
                    </Col>

                    {/* Submissions Table */}
                    <Col xs={24} lg={16}>
                        <Card 
                            title={
                                <Space>
                                    <FileTextOutlined />
                                    <span>Your Submissions</span>
                                    <Badge count={submissions.length} color="blue" />
                                </Space>
                            } 
                            className="shadow-lg border-0"
                        >
                            {submissions.length === 0 ? (
                                <Empty 
                                    description="No submissions found"
                                    image={Empty.PRESENTED_IMAGE_SIMPLE}
                                >
                                    <Text type="secondary">
                                        You haven&apos;t submitted any events for approval yet.
                                    </Text>
                                    <br />
                                    <Button 
                                        type="primary" 
                                        onClick={() => setIsModalVisible(true)}
                                        className="mt-4"
                                    >
                                        Create Your First Submission
                                    </Button>
                                </Empty>
                            ) : (
                                <Table
                                    columns={columns}
                                    dataSource={submissions}
                                    rowKey="id"
                                    pagination={{ 
                                        pageSize: 10,
                                        showTotal: (total, range) => 
                                            `${range[0]}-${range[1]} of ${total} submissions`
                                    }}
                                    scroll={{ x: 1000 }}
                                />
                            )}
                        </Card>
                    </Col>
                </Row>

                {/* New Submission Modal */}
                <Modal
                    title="Submit for Approval"
                    open={isModalVisible}
                    onOk={handleSubmitRequest}
                    onCancel={() => {
                        setIsModalVisible(false);
                        form.resetFields();
                    }}
                    okText="Submit"
                    okButtonProps={{
                        className: "bg-gradient-to-r from-blue-500 to-purple-600 border-none"
                    }}
                    width={600}
                >
                    <Form form={form} layout="vertical">
                        <Form.Item
                            label="Submission Type"
                            name="submissionType"
                            rules={[{ required: true, message: "Please select a submission type" }]}
                        >
                            <Select placeholder="What type of request is this?">
                                <Option value="new-event">New Event Approval</Option>
                                <Option value="event-update">Event Update Request</Option>
                                <Option value="event-cancellation">Event Cancellation Request</Option>
                            </Select>
                        </Form.Item>

                        <Form.Item
                            label="Event"
                            name="eventId"
                            rules={[{ required: true, message: "Please select an event" }]}
                        >
                            <Select placeholder="Select the event">
                                {organizedEvents.map(event => (
                                    <Option key={event.id} value={event.id}>
                                        {event.title} - {event.status}
                                    </Option>
                                ))}
                            </Select>
                        </Form.Item>

                        <Form.Item
                            label="Description"
                            name="description"
                            rules={[
                                { required: true, message: "Please provide a description" },
                                { min: 20, message: "Please provide at least 20 characters" }
                            ]}
                        >
                            <TextArea
                                rows={4}
                                placeholder="Describe your request in detail. Include any specific changes, reasons for the request, or additional information that will help the review process."
                                showCount
                                maxLength={500}
                            />
                        </Form.Item>

                        <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
                            <Space>
                                <ExclamationCircleOutlined className="text-blue-600" />
                                <Text className="text-blue-800">
                                    <strong>Review Process:</strong> Submissions are typically reviewed within 1-2 business days. 
                                    You&apos;ll receive email notifications about status changes.
                                </Text>
                            </Space>
                        </div>
                    </Form>
                </Modal>
            </div>
        </div>
    );
}
  