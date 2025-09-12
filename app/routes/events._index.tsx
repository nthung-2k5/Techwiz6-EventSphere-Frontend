import { useState } from "react";
import { 
    Card, 
    Row, 
    Col, 
    Typography, 
    Input, 
    Select, 
    Button, 
    Tag, 
    Space, 
    Pagination,
    Empty,
    Badge
} from "antd";
import { Link } from "react-router";
import { useEvents, type Event } from "../context/EventContext";
import { 
    SearchOutlined, 
    CalendarOutlined, 
    EnvironmentOutlined, 
    UserOutlined,
    EyeOutlined,
    StarOutlined,
    FilterOutlined
} from "@ant-design/icons";

const { Title, Text, Paragraph } = Typography;
const { Option } = Select;

export default function EventsIndex() {
    const { events } = useEvents();
    const [searchTerm, setSearchTerm] = useState("");
    const [selectedCategory, setSelectedCategory] = useState<string>("");
    const [selectedDepartment, setSelectedDepartment] = useState<string>("");
    const [currentPage, setCurrentPage] = useState(1);
    const pageSize = 9;

    // Filter events
    const filteredEvents = events.filter(event => {
        const matchesSearch = event.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                            event.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
                            event.tags.some(tag => tag.toLowerCase().includes(searchTerm.toLowerCase()));
        const matchesCategory = !selectedCategory || event.category === selectedCategory;
        const matchesDepartment = !selectedDepartment || event.department === selectedDepartment;
        const isApproved = event.status === 'approved';
        
        return matchesSearch && matchesCategory && matchesDepartment && isApproved;
    });

    // Pagination
    const startIndex = (currentPage - 1) * pageSize;
    const paginatedEvents = filteredEvents.slice(startIndex, startIndex + pageSize);

    // Get unique categories and departments
    const categories = Array.from(new Set(events.map(event => event.category)));
    const departments = Array.from(new Set(events.map(event => event.department)));

    const renderEventCard = (event: Event) => (
        <Card
            key={event.id}
            hoverable
            className="rounded-xl h-full shadow-lg border-0 transition-all duration-300 ease-in-out hover:shadow-xl"
            cover={
                <div className="h-45 bg-gradient-to-br from-pink-400 via-purple-400 to-red-400 flex items-center justify-center relative rounded-t-xl">
                    {event.status === 'pending' && (
                        <Badge.Ribbon text="Pending Approval" color="orange">
                            <div></div>
                        </Badge.Ribbon>
                    )}
                    <Title level={4} className="text-white m-0 text-center px-4">
                        {event.title}
                    </Title>
                </div>
            }
            actions={[
                <Link to={`/events/${event.id}`} key="view">
                    <Button 
                        type="primary" 
                        icon={<EyeOutlined />}
                        className="bg-blue-600 hover:bg-blue-700 border-0"
                    >
                        View Details
                    </Button>
                </Link>
            ]}
        >
            <Card.Meta
                description={
                    <Space direction="vertical" size="small" className="w-full">
                        <Paragraph 
                            ellipsis={{ rows: 2 }} 
                            className="mb-2 min-h-[40px]"
                        >
                            {event.description}
                        </Paragraph>
                        
                        <Space wrap size="small">
                            <Tag icon={<EnvironmentOutlined />} color="blue" className="rounded-lg">
                                {event.location}
                            </Tag>
                            <Tag icon={<CalendarOutlined />} color="green" className="rounded-lg">
                                {event.startDate} {event.endDate && `- ${event.endDate}`}
                            </Tag>
                        </Space>

                        <Space wrap size="small">
                            <Tag color="purple" className="rounded-lg">{event.category}</Tag>
                            <Tag color="orange" className="rounded-lg">{event.department}</Tag>
                        </Space>
                        
                        <div className="flex justify-between items-center mt-3 pt-3 border-t border-gray-100">
                            <Space>
                                <UserOutlined className="text-gray-400" />
                                <Text type="secondary">{event.currentParticipants}/{event.maxParticipants}</Text>
                            </Space>
                            {event.rating && (
                                <Space>
                                    <StarOutlined className="text-yellow-400" />
                                    <Text type="secondary">{event.rating}</Text>
                                </Space>
                            )}
                        </div>
                    </Space>
                }
            />
        </Card>
    );

    return (
        <div className="p-0">
            {/* Header */}
            <div className="mb-8 text-center bg-gradient-to-br from-blue-500 via-purple-600 to-violet-700 rounded-2xl p-12 text-white">
                <Title level={1} className="text-white mb-4">
                    🎉 Discover Events
                </Title>
                <Text className="text-lg text-white/90">
                    Explore amazing events happening at your university
                </Text>
            </div>

            {/* Filters */}
            <Card className="mb-8 rounded-xl shadow-lg border-0">
                <Row gutter={[16, 16]}>
                    <Col xs={24} sm={12} md={6}>
                        <Input
                            placeholder="Search events..."
                            prefix={<SearchOutlined />}
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                            size="large"
                            className="rounded-lg"
                        />
                    </Col>
                    <Col xs={24} sm={12} md={6}>
                        <Select
                            placeholder="Category"
                            value={selectedCategory}
                            onChange={setSelectedCategory}
                            size="large"
                            className="w-full rounded-lg"
                            allowClear
                        >
                            {categories.map(category => (
                                <Option key={category} value={category}>{category}</Option>
                            ))}
                        </Select>
                    </Col>
                    <Col xs={24} sm={12} md={6}>
                        <Select
                            placeholder="Department"
                            value={selectedDepartment}
                            onChange={setSelectedDepartment}
                            size="large"
                            className="w-full rounded-lg"
                            allowClear
                        >
                            {departments.map(dept => (
                                <Option key={dept} value={dept}>{dept}</Option>
                            ))}
                        </Select>
                    </Col>
                    <Col xs={24} sm={12} md={6}>
                        <Button 
                            size="large" 
                            icon={<FilterOutlined />}
                            onClick={() => {
                                setSearchTerm("");
                                setSelectedCategory("");
                                setSelectedDepartment("");
                            }}
                            className="w-full rounded-lg bg-gray-100 hover:bg-gray-200 border-gray-200"
                        >
                            Clear Filters
                        </Button>
                    </Col>
                </Row>
            </Card>

            {/* Events Grid */}
            {filteredEvents.length === 0 ? (
                <Empty 
                    description="No events found"
                    image={Empty.PRESENTED_IMAGE_SIMPLE}
                    className="my-16"
                />
            ) : (
                <>
                    <Row gutter={[24, 24]} className="mb-8">
                        {paginatedEvents.map(event => (
                            <Col xs={24} sm={12} lg={8} key={event.id}>
                                {renderEventCard(event)}
                            </Col>
                        ))}
                    </Row>

                    {/* Pagination */}
                    <div className="text-center mt-8">
                        <Pagination
                            current={currentPage}
                            total={filteredEvents.length}
                            pageSize={pageSize}
                            onChange={setCurrentPage}
                            showSizeChanger={false}
                            showTotal={(total, range) => 
                                `${range[0]}-${range[1]} of ${total} events`
                            }
                        />
                    </div>
                </>
            )}
        </div>
    );
}