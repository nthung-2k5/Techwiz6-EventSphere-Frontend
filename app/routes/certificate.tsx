import {
    Card,
    Typography,
    Button,
    Row,
    Col,
    Empty,
    Badge,
    Space,
    Avatar,
    Divider,
    message
} from "antd";
import {
    TrophyOutlined,
    DownloadOutlined,
    ShareAltOutlined,
    CalendarOutlined,
    ArrowLeftOutlined,
    CheckCircleOutlined,
    PrinterOutlined
} from "@ant-design/icons";
import { useAuth } from "../context/AuthContext";
import { useEvents } from "../context/EventContext";
import { useNavigate } from "react-router";

const { Title, Text, Paragraph } = Typography;

interface Certificate {
    id: number;
    eventTitle: string;
    eventDate: string;
    issueDate: string;
    certificateId: string;
    status: 'issued' | 'pending' | 'verified';
}

export default function CertificatePage() {
    const { user } = useAuth();
    const { events } = useEvents();
    const navigate = useNavigate();

    if (!user) {
        return (
            <div className="min-h-screen bg-gradient-to-br from-blue-50 to-purple-50 flex items-center justify-center p-4">
                <Card className="max-w-md w-full text-center">
                    <Title level={3} className="text-gray-800">Authentication Required</Title>
                    <Text className="text-gray-600 mb-6">
                        Please log in to view your certificates.
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

    // Mock certificates data - in a real app, this would come from an API
    const certificates: Certificate[] = user.registeredEvents?.map((eventId, index) => {
        const event = events.find(e => e.id === eventId);
        return {
            id: index + 1,
            eventTitle: event?.title || 'Unknown Event',
            eventDate: event?.date || event?.startDate || 'TBD',
            issueDate: '2024-01-15',
            certificateId: `CERT-${eventId}-${user.username.toUpperCase()}`,
            status: index % 3 === 0 ? 'verified' : index % 2 === 0 ? 'issued' : 'pending'
        };
    }) || [];

    const handleDownload = (certificate: Certificate) => {
        message.success(`Downloading certificate for ${certificate.eventTitle}`);
    };

    const handleShare = (certificate: Certificate) => {
        message.success(`Share link copied for ${certificate.eventTitle} certificate`);
    };

    const handlePrint = (certificate: Certificate) => {
        message.info(`Opening print dialog for ${certificate.eventTitle} certificate`);
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
                                    <TrophyOutlined className="text-2xl" />
                                </div>
                                <div>
                                    <Title level={2} className="text-white mb-1">
                                        My Certificates
                                    </Title>
                                    <Text className="text-white/90">
                                        View, download, and share your event participation certificates
                                    </Text>
                                </div>
                            </div>
                        </div>
                        
                        {/* Stats */}
                        <Row gutter={[16, 16]}>
                            <Col xs={24} sm={8}>
                                <div className="text-center p-4 bg-blue-50 rounded-lg">
                                    <div className="text-blue-500 text-2xl mb-2">{certificates.filter(c => c.status === 'verified').length}</div>
                                    <Text>Verified Certificates</Text>
                                </div>
                            </Col>
                            <Col xs={24} sm={8}>
                                <div className="text-center p-4 bg-green-50 rounded-lg">
                                    <div className="text-green-500 text-2xl mb-2">{certificates.filter(c => c.status === 'issued').length}</div>
                                    <Text>Issued Certificates</Text>
                                </div>
                            </Col>
                            <Col xs={24} sm={8}>
                                <div className="text-center p-4 bg-orange-50 rounded-lg">
                                    <div className="text-orange-500 text-2xl mb-2">{certificates.filter(c => c.status === 'pending').length}</div>
                                    <Text>Pending Certificates</Text>
                                </div>
                            </Col>
                        </Row>
                    </Card>
                </div>

                {/* Certificates List */}
                {certificates.length === 0 ? (
                    <Card className="shadow-lg border-0">
                        <Empty
                            image={<TrophyOutlined className="text-6xl text-gray-300" />}
                            description={
                                <div>
                                    <Title level={4} className="text-gray-500 mb-2">
                                        No Certificates Yet
                                    </Title>
                                    <Paragraph className="text-gray-400 mb-4">
                                        Participate in events to earn certificates and showcase your achievements.
                                    </Paragraph>
                                    <Button 
                                        type="primary" 
                                        onClick={() => navigate("/events")}
                                        className="bg-gradient-to-r from-blue-500 to-purple-600 border-none"
                                    >
                                        Explore Events
                                    </Button>
                                </div>
                            }
                        />
                    </Card>
                ) : (
                    <Row gutter={[24, 24]}>
                        {certificates.map((certificate) => (
                            <Col key={certificate.id} xs={24} lg={12}>
                                <Card className="shadow-lg border-0 hover:shadow-xl transition-shadow">
                                    {/* Certificate Header */}
                                    <div className="flex items-start justify-between mb-4">
                                        <div className="flex items-center gap-3">
                                            <Avatar 
                                                icon={<TrophyOutlined />}
                                                className="bg-gradient-to-r from-yellow-400 to-orange-500"
                                                size="large"
                                            />
                                            <div>
                                                <Title level={4} className="mb-1">
                                                    {certificate.eventTitle}
                                                </Title>
                                                <div className="flex items-center gap-2 text-gray-500">
                                                    <CalendarOutlined />
                                                    <Text>{certificate.eventDate}</Text>
                                                </div>
                                            </div>
                                        </div>
                                        <Badge 
                                            status={
                                                certificate.status === 'verified' ? 'success' :
                                                    certificate.status === 'issued' ? 'processing' : 'warning'
                                            }
                                            text={
                                                certificate.status === 'verified' ? 'Verified' :
                                                    certificate.status === 'issued' ? 'Issued' : 'Pending'
                                            }
                                        />
                                    </div>

                                    <Divider />

                                    {/* Certificate Details */}
                                    <div className="mb-4">
                                        <Row gutter={[16, 8]}>
                                            <Col span={24}>
                                                <Text className="text-gray-500">Certificate ID:</Text>
                                                <br />
                                                <Text code className="bg-gray-100">
                                                    {certificate.certificateId}
                                                </Text>
                                            </Col>
                                            <Col span={12}>
                                                <Text className="text-gray-500">Issue Date:</Text>
                                                <br />
                                                <Text>{certificate.issueDate}</Text>
                                            </Col>
                                            <Col span={12}>
                                                <Text className="text-gray-500">Status:</Text>
                                                <br />
                                                <Space>
                                                    {certificate.status === 'verified' && (
                                                        <CheckCircleOutlined className="text-green-500" />
                                                    )}
                                                    <Text>{certificate.status.charAt(0).toUpperCase() + certificate.status.slice(1)}</Text>
                                                </Space>
                                            </Col>
                                        </Row>
                                    </div>

                                    {/* Actions */}
                                    <div className="flex gap-2 flex-wrap">
                                        <Button 
                                            type="primary"
                                            icon={<DownloadOutlined />}
                                            onClick={() => handleDownload(certificate)}
                                            disabled={certificate.status === 'pending'}
                                            className="flex-1 bg-gradient-to-r from-blue-500 to-purple-600 border-none"
                                        >
                                            Download
                                        </Button>
                                        <Button 
                                            icon={<PrinterOutlined />}
                                            onClick={() => handlePrint(certificate)}
                                            disabled={certificate.status === 'pending'}
                                        >
                                            Print
                                        </Button>
                                        <Button 
                                            icon={<ShareAltOutlined />}
                                            onClick={() => handleShare(certificate)}
                                            disabled={certificate.status === 'pending'}
                                        >
                                            Share
                                        </Button>
                                    </div>

                                    {certificate.status === 'pending' && (
                                        <div className="mt-3 p-3 bg-orange-50 rounded-lg">
                                            <Text className="text-orange-600 text-sm">
                                                ⏳ Certificate is being processed. You&apos;ll be notified once it&apos;s ready.
                                            </Text>
                                        </div>
                                    )}
                                </Card>
                            </Col>
                        ))}
                    </Row>
                )}

                {/* Help Section */}
                <Card className="shadow-lg border-0 mt-8">
                    <Title level={4} className="text-gray-800 mb-4">Certificate Information</Title>
                    <Row gutter={[16, 16]}>
                        <Col xs={24} sm={8}>
                            <div className="text-center p-4 bg-blue-50 rounded-lg">
                                <CheckCircleOutlined className="text-blue-500 text-2xl mb-2" />
                                <Text strong>Verified</Text>
                                <div className="text-gray-600 text-sm mt-1">
                                    Certificate is authenticated and can be verified by third parties
                                </div>
                            </div>
                        </Col>
                        <Col xs={24} sm={8}>
                            <div className="text-center p-4 bg-green-50 rounded-lg">
                                <DownloadOutlined className="text-green-500 text-2xl mb-2" />
                                <Text strong>Issued</Text>
                                <div className="text-gray-600 text-sm mt-1">
                                    Certificate is ready for download and sharing
                                </div>
                            </div>
                        </Col>
                        <Col xs={24} sm={8}>
                            <div className="text-center p-4 bg-orange-50 rounded-lg">
                                <CalendarOutlined className="text-orange-500 text-2xl mb-2" />
                                <Text strong>Pending</Text>
                                <div className="text-gray-600 text-sm mt-1">
                                    Certificate is being processed after event completion
                                </div>
                            </div>
                        </Col>
                    </Row>
                </Card>
            </div>
        </div>
    );
}
