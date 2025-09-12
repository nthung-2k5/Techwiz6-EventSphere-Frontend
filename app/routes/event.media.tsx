import {
    Card,
    Typography,
    Button,
    Row,
    Col,
    Upload,
    message,
    Image,
    Space,
    Tag,
    Modal,
    Form,
    Input,
    Select,
    Empty,
    Pagination,
    Tooltip
} from "antd";
import {
    PictureOutlined,
    VideoCameraOutlined,
    DeleteOutlined,
    EyeOutlined,
    ArrowLeftOutlined,
    PlusOutlined,
    FolderOutlined,
    DownloadOutlined
} from "@ant-design/icons";
import { useAuth } from "../context/AuthContext";
import { useEvents } from "../context/EventContext";
import { useNavigate } from "react-router";
import { useState } from "react";
import type { UploadFile } from "antd";

const { Title, Text, Paragraph } = Typography;
const { Dragger } = Upload;
const { Option } = Select;

interface MediaItem {
    id: number;
    eventId: number;
    eventTitle: string;
    fileName: string;
    fileType: 'image' | 'video';
    fileSize: string;
    uploadDate: string;
    url: string;
    thumbnail?: string;
    description?: string;
    tags: string[];
}

export default function UploadMediaPage() {
    const { user } = useAuth();
    const { events } = useEvents();
    const navigate = useNavigate();
    const [selectedEvent, setSelectedEvent] = useState<number | null>(null);
    const [isModalVisible, setIsModalVisible] = useState(false);
    const [fileList, setFileList] = useState<UploadFile[]>([]);
    const [form] = Form.useForm();
    const [currentPage, setCurrentPage] = useState(1);
    const pageSize = 12;

    // Only show events organized by current user
    const organizedEvents = events.filter(event => 
        user && event.organizer === user.username
    );

    // Mock media data - in a real app, this would come from an API
    const [mediaItems, setMediaItems] = useState<MediaItem[]>([
        {
            id: 1,
            eventId: 1,
            eventTitle: "AI & Machine Learning Workshop",
            fileName: "workshop-session-1.jpg",
            fileType: 'image',
            fileSize: "2.3 MB",
            uploadDate: "2024-01-15",
            url: "https://via.placeholder.com/300x200/1890ff/white?text=Workshop+Session",
            description: "Participants working on ML algorithms",
            tags: ["workshop", "learning", "coding"]
        },
        {
            id: 2,
            eventId: 1,
            eventTitle: "AI & Machine Learning Workshop",
            fileName: "group-photo.jpg",
            fileType: 'image',
            fileSize: "4.1 MB",
            uploadDate: "2024-01-15",
            url: "https://via.placeholder.com/300x200/52c41a/white?text=Group+Photo",
            description: "Final group photo with certificates",
            tags: ["group", "certificates", "completion"]
        },
        {
            id: 3,
            eventId: 2,
            eventTitle: "Cultural Night 2025",
            fileName: "dance-performance.mp4",
            fileType: 'video',
            fileSize: "145.2 MB",
            uploadDate: "2024-01-10",
            url: "https://via.placeholder.com/300x200/722ed1/white?text=Dance+Video",
            thumbnail: "https://via.placeholder.com/300x200/722ed1/white?text=Dance+Thumbnail",
            description: "Traditional dance performance",
            tags: ["dance", "cultural", "performance"]
        },
        {
            id: 4,
            eventId: 2,
            eventTitle: "Cultural Night 2025",
            fileName: "food-stalls.jpg",
            fileType: 'image',
            fileSize: "3.7 MB",
            uploadDate: "2024-01-10",
            url: "https://via.placeholder.com/300x200/faad14/white?text=Food+Stalls",
            description: "International food stalls",
            tags: ["food", "international", "culture"]
        },
        {
            id: 5,
            eventId: 3,
            eventTitle: "Startup Pitch Competition",
            fileName: "pitch-presentation.jpg",
            fileType: 'image',
            fileSize: "1.9 MB",
            uploadDate: "2024-01-08",
            url: "https://via.placeholder.com/300x200/f5222d/white?text=Pitch+Stage",
            description: "Startup pitch in progress",
            tags: ["startup", "pitch", "presentation"]
        },
        {
            id: 6,
            eventId: 3,
            eventTitle: "Startup Pitch Competition",
            fileName: "winners-announcement.mp4",
            fileType: 'video',
            fileSize: "89.5 MB",
            uploadDate: "2024-01-08",
            url: "https://via.placeholder.com/300x200/13c2c2/white?text=Winners+Video",
            thumbnail: "https://via.placeholder.com/300x200/13c2c2/white?text=Winners+Thumb",
            description: "Winner announcement ceremony",
            tags: ["winners", "announcement", "ceremony"]
        }
    ]);

    if (!user || user.role !== "organizer") {
        return (
            <div className="min-h-screen bg-gradient-to-br from-red-50 to-red-100 flex items-center justify-center p-4">
                <Card className="max-w-md w-full text-center">
                    <Title level={3} className="text-red-600">Access Restricted</Title>
                    <Text className="text-gray-600 mb-6">
                        Only organizers can upload media. Please contact an administrator if you need access.
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

    const filteredMediaItems = selectedEvent 
        ? mediaItems.filter(item => item.eventId === selectedEvent)
        : mediaItems;

    const paginatedItems = filteredMediaItems.slice(
        (currentPage - 1) * pageSize,
        currentPage * pageSize
    );

    const handleUpload = () => {
        if (!selectedEvent) {
            message.error("Please select an event first");
            return;
        }

        if (fileList.length === 0) {
            message.error("Please select files to upload");
            return;
        }

        // Mock upload process
        message.loading("Uploading files...", 2);
        
        setTimeout(() => {
            message.success(`Successfully uploaded ${fileList.length} file(s)!`);
            setFileList([]);
            setIsModalVisible(false);
            form.resetFields();
        }, 2000);
    };

    const handleDeleteMedia = (mediaId: number) => {
        Modal.confirm({
            title: 'Delete Media',
            content: 'Are you sure you want to delete this media file? This action cannot be undone.',
            okText: 'Delete',
            okType: 'danger',
            onOk: () => {
                setMediaItems(prev => prev.filter(item => item.id !== mediaId));
                message.success('Media deleted successfully');
            }
        });
    };

    const uploadProps = {
        fileList,
        onChange: ({ fileList: newFileList }: { fileList: UploadFile[] }) => setFileList(newFileList),
        beforeUpload: () => false, // Prevent auto upload
        multiple: true,
        accept: "image/*,video/*"
    };

    const eventMediaCount = mediaItems.reduce((acc, item) => {
        acc[item.eventId] = (acc[item.eventId] || 0) + 1;
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
                                    <PictureOutlined className="text-2xl" />
                                </div>
                                <div>
                                    <Title level={2} className="text-white mb-1">
                                        Media Gallery
                                    </Title>
                                    <Text className="text-white/90">
                                        Upload and manage photos and videos from your events
                                    </Text>
                                </div>
                            </div>
                        </div>
                        
                        {/* Quick Stats */}
                        <Row gutter={[16, 16]}>
                            <Col xs={24} sm={8}>
                                <div className="text-center p-4 bg-blue-50 rounded-lg">
                                    <div className="text-blue-500 text-2xl mb-2">
                                        {mediaItems.filter(item => item.fileType === 'image').length}
                                    </div>
                                    <Text>Photos</Text>
                                </div>
                            </Col>
                            <Col xs={24} sm={8}>
                                <div className="text-center p-4 bg-purple-50 rounded-lg">
                                    <div className="text-purple-500 text-2xl mb-2">
                                        {mediaItems.filter(item => item.fileType === 'video').length}
                                    </div>
                                    <Text>Videos</Text>
                                </div>
                            </Col>
                            <Col xs={24} sm={8}>
                                <div className="text-center p-4 bg-green-50 rounded-lg">
                                    <div className="text-green-500 text-2xl mb-2">{organizedEvents.length}</div>
                                    <Text>Events</Text>
                                </div>
                            </Col>
                        </Row>
                    </Card>
                </div>

                <Row gutter={[24, 24]}>
                    {/* Event Selection & Upload */}
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
                                        All Events
                                    </Button>
                                    {organizedEvents.map(event => (
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
                                                        {event.date || `${event.startDate} - ${event.endDate}`}
                                                    </div>
                                                </div>
                                                <Tag color="blue" className="ml-2">
                                                    {eventMediaCount[event.id] || 0}
                                                </Tag>
                                            </div>
                                        </Button>
                                    ))}
                                </Space>
                            )}
                        </Card>

                        <Card title="Quick Upload" className="shadow-lg border-0">
                            <Space direction="vertical" className="w-full">
                                <Button 
                                    type="primary" 
                                    block 
                                    icon={<PlusOutlined />}
                                    onClick={() => setIsModalVisible(true)}
                                    className="bg-gradient-to-r from-blue-500 to-purple-600 border-none h-12"
                                >
                                    Upload Media
                                </Button>
                                <Text type="secondary" className="text-center block text-sm">
                                    Supported formats: JPG, PNG, MP4, MOV
                                </Text>
                            </Space>
                        </Card>
                    </Col>

                    {/* Media Gallery */}
                    <Col xs={24} lg={16}>
                        <Card 
                            title={
                                <Space>
                                    <FolderOutlined />
                                    <span>
                                        {selectedEvent 
                                            ? `Media for ${organizedEvents.find(e => e.id === selectedEvent)?.title || 'Unknown Event'}`
                                            : 'All Media'
                                        }
                                    </span>
                                    <Tag color="blue">{filteredMediaItems.length} items</Tag>
                                </Space>
                            } 
                            className="shadow-lg border-0"
                        >
                            {filteredMediaItems.length === 0 ? (
                                <Empty 
                                    description="No media files found"
                                    image={Empty.PRESENTED_IMAGE_SIMPLE}
                                >
                                    <Text type="secondary">
                                        Upload photos and videos to create a gallery for your events.
                                    </Text>
                                </Empty>
                            ) : (
                                <>
                                    <Row gutter={[16, 16]}>
                                        {paginatedItems.map(item => (
                                            <Col xs={24} sm={12} md={8} key={item.id}>
                                                <Card 
                                                    hoverable
                                                    className="overflow-hidden"
                                                    cover={
                                                        <div className="relative h-48 bg-gray-100">
                                                            {item.fileType === 'image' ? (
                                                                <Image
                                                                    alt={item.fileName}
                                                                    src={item.url}
                                                                    className="w-full h-full object-cover"
                                                                    preview={{
                                                                        mask: <div className="flex items-center justify-center text-white"><EyeOutlined className="mr-2" />Preview</div>
                                                                    }}
                                                                />
                                                            ) : (
                                                                <div className="w-full h-full flex items-center justify-center bg-gray-200 relative">
                                                                    <VideoCameraOutlined className="text-4xl text-gray-400" />
                                                                    <div className="absolute bottom-2 right-2 bg-black/60 text-white px-2 py-1 rounded text-xs">
                                                                        VIDEO
                                                                    </div>
                                                                </div>
                                                            )}
                                                        </div>
                                                    }
                                                    actions={[
                                                        <Tooltip title="Download" key="download">
                                                            <Button 
                                                                type="text" 
                                                                icon={<DownloadOutlined />} 
                                                                onClick={() => message.success(`Downloading ${item.fileName}`)}
                                                            />
                                                        </Tooltip>,
                                                        <Tooltip title="View Details" key="view">
                                                            <Button type="text" icon={<EyeOutlined />} />
                                                        </Tooltip>,
                                                        <Tooltip title="Delete" key="delete">
                                                            <Button 
                                                                type="text" 
                                                                danger 
                                                                icon={<DeleteOutlined />} 
                                                                onClick={() => handleDeleteMedia(item.id)}
                                                            />
                                                        </Tooltip>
                                                    ]}
                                                >
                                                    <Card.Meta
                                                        title={
                                                            <div className="truncate" title={item.fileName}>
                                                                {item.fileName}
                                                            </div>
                                                        }
                                                        description={
                                                            <Space direction="vertical" size="small" className="w-full">
                                                                <Text type="secondary" className="text-xs">
                                                                    {item.fileSize} • {item.uploadDate}
                                                                </Text>
                                                                {item.description && (
                                                                    <Paragraph 
                                                                        ellipsis={{ rows: 2 }} 
                                                                        className="text-xs mb-2"
                                                                    >
                                                                        {item.description}
                                                                    </Paragraph>
                                                                )}
                                                                <div>
                                                                    {item.tags.map(tag => (
                                                                        <Tag key={tag} color="blue">
                                                                            {tag}
                                                                        </Tag>
                                                                    ))}
                                                                </div>
                                                            </Space>
                                                        }
                                                    />
                                                </Card>
                                            </Col>
                                        ))}
                                    </Row>

                                    {filteredMediaItems.length > pageSize && (
                                        <div className="text-center mt-6">
                                            <Pagination
                                                current={currentPage}
                                                total={filteredMediaItems.length}
                                                pageSize={pageSize}
                                                onChange={setCurrentPage}
                                                showSizeChanger={false}
                                                showTotal={(total, range) => 
                                                    `${range[0]}-${range[1]} of ${total} items`
                                                }
                                            />
                                        </div>
                                    )}
                                </>
                            )}
                        </Card>
                    </Col>
                </Row>

                {/* Upload Modal */}
                <Modal
                    title="Upload Media Files"
                    open={isModalVisible}
                    onOk={handleUpload}
                    onCancel={() => {
                        setIsModalVisible(false);
                        setFileList([]);
                        form.resetFields();
                    }}
                    okText="Upload"
                    okButtonProps={{
                        className: "bg-gradient-to-r from-blue-500 to-purple-600 border-none",
                        disabled: fileList.length === 0
                    }}
                    width={700}
                >
                    <Form form={form} layout="vertical">
                        <Form.Item
                            label="Event"
                            name="eventId"
                            rules={[{ required: true, message: "Please select an event" }]}
                        >
                            <Select placeholder="Select an event">
                                {organizedEvents.map(event => (
                                    <Option key={event.id} value={event.id}>
                                        {event.title}
                                    </Option>
                                ))}
                            </Select>
                        </Form.Item>

                        <Form.Item label="Files">
                            <Dragger {...uploadProps} className="rounded-lg">
                                <p className="ant-upload-drag-icon">
                                    <PictureOutlined className="text-4xl text-blue-500" />
                                </p>
                                <p className="ant-upload-text">
                                    Click or drag files to this area to upload
                                </p>
                                <p className="ant-upload-hint">
                                    Support for single or bulk upload. You can upload images (JPG, PNG) and videos (MP4, MOV).
                                    Maximum file size: 100MB per file.
                                </p>
                            </Dragger>
                        </Form.Item>

                        <Form.Item
                            label="Description"
                            name="description"
                        >
                            <Input.TextArea 
                                rows={3} 
                                placeholder="Add a description for these media files..."
                            />
                        </Form.Item>

                        <Form.Item
                            label="Tags"
                            name="tags"
                        >
                            <Select
                                mode="tags"
                                placeholder="Add tags to help organize your media"
                                maxTagCount={5}
                            >
                                <Option value="highlights">Highlights</Option>
                                <Option value="presentation">Presentation</Option>
                                <Option value="networking">Networking</Option>
                                <Option value="group-photo">Group Photo</Option>
                                <Option value="ceremony">Ceremony</Option>
                            </Select>
                        </Form.Item>
                    </Form>
                </Modal>
            </div>
        </div>
    );
}
  