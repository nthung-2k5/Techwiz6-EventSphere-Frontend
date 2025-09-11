import {
    Card,
    Form,
    Input,
    Button,
    DatePicker,
    TimePicker,
    Radio,
    message,
    Typography,
    Row,
    Col,
    Space,
    Select
} from "antd";
import {
    CalendarOutlined,
    EnvironmentOutlined,
    FileTextOutlined,
    PlusOutlined,
    ArrowLeftOutlined
} from "@ant-design/icons";
import type { Dayjs } from 'dayjs';
import dayjs from "dayjs";
import { useEvents } from "../context/EventContext";
import { useAuth } from "../context/AuthContext";
import { useNavigate } from "react-router";

const { Title, Text } = Typography;
const { TextArea } = Input;

interface EventFormValues {
    title: string;
    description: string;
    location: string;
    type: 'single' | 'multi';
    date?: Dayjs;
    daterange?: [Dayjs, Dayjs];
    time: [Dayjs, Dayjs];
    tags?: string[];
    category: string;
}

export default function CreateEventPage() {
    const { addEvent } = useEvents();
    const { user } = useAuth();
    const navigate = useNavigate();

    if (!user || user.role !== "organizer") {
        return (
            <div className="min-h-screen bg-gradient-to-br from-red-50 to-red-100 flex items-center justify-center p-4">
                <Card className="max-w-md w-full text-center">
                    <Title level={3} className="text-red-600">Access Restricted</Title>
                    <Text className="text-gray-600 mb-6">
                        Only organizers can create events. Please contact an administrator if you need organizer access.
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

    const onFinish = (values: EventFormValues) => {
        const eventData = {
            title: values.title,
            description: values.description,
            location: values.location,
            startTime: values.time[0].format("HH:mm"),
            endTime: values.time[1].format("HH:mm"),
            tags: values.tags || [],
            category: values.category
        };

        if (values.type === "single" && values.date) {
            Object.assign(eventData, {
                date: values.date.format("YYYY-MM-DD")
            });
        } else if (values.type === "multi" && values.daterange) {
            Object.assign(eventData, {
                startDate: values.daterange[0].format("YYYY-MM-DD"),
                endDate: values.daterange[1].format("YYYY-MM-DD")
            });
        }

        addEvent(eventData);
        message.success("Event created successfully!");
        navigate("/dashboard");
    };

    const eventCategories = [
        "Academic Conference",
        "Workshop",
        "Seminar",
        "Cultural Event",
        "Sports",
        "Technology",
        "Career Fair",
        "Social Event",
        "Competition",
        "Other"
    ];

    return (
        <div className="min-h-screen bg-gradient-to-br from-blue-50 via-purple-50 to-pink-50 p-4 lg:p-8">
            <div className="max-w-4xl mx-auto">
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
                                    <PlusOutlined className="text-2xl" />
                                </div>
                                <div>
                                    <Title level={2} className="text-white mb-1">
                                        Create New Event
                                    </Title>
                                    <Text className="text-white/90">
                                        Fill in the details to create an amazing event for your community
                                    </Text>
                                </div>
                            </div>
                        </div>
                    </Card>
                </div>

                {/* Form */}
                <Card className="shadow-lg border-0">
                    <Form 
                        layout="vertical" 
                        onFinish={onFinish} 
                        initialValues={{ type: "single" }}
                        size="large"
                    >
                        <Row gutter={[24, 0]}>
                            {/* Basic Information */}
                            <Col span={24}>
                                <Title level={4} className="text-gray-800 mb-4">
                                    <FileTextOutlined className="mr-2" />
                                    Basic Information
                                </Title>
                            </Col>

                            <Col xs={24} lg={16}>
                                <Form.Item 
                                    label="Event Title" 
                                    name="title" 
                                    rules={[{ required: true, message: "Please enter event title" }]}
                                >
                                    <Input 
                                        placeholder="Enter an engaging event title"
                                        className="h-12"
                                    />
                                </Form.Item>
                            </Col>

                            <Col xs={24} lg={8}>
                                <Form.Item 
                                    label="Category" 
                                    name="category"
                                    rules={[{ required: true, message: "Please select a category" }]}
                                >
                                    <Select 
                                        placeholder="Select category"
                                        className="h-12"
                                    >
                                        {eventCategories.map(category => (
                                            <Select.Option key={category} value={category}>
                                                {category}
                                            </Select.Option>
                                        ))}
                                    </Select>
                                </Form.Item>
                            </Col>

                            <Col span={24}>
                                <Form.Item 
                                    label="Description" 
                                    name="description" 
                                    rules={[{ required: true, message: "Please enter event description" }]}
                                >
                                    <TextArea 
                                        rows={4} 
                                        placeholder="Describe your event in detail. What can attendees expect?"
                                        showCount
                                        maxLength={500}
                                    />
                                </Form.Item>
                            </Col>

                            <Col xs={24} lg={12}>
                                <Form.Item 
                                    label="Location" 
                                    name="location" 
                                    rules={[{ required: true, message: "Please enter location" }]}
                                >
                                    <Input 
                                        placeholder="Event venue or address"
                                        prefix={<EnvironmentOutlined className="text-gray-400" />}
                                        className="h-12"
                                    />
                                </Form.Item>
                            </Col>

                            <Col xs={24} lg={12}>
                                <Form.Item label="Tags" name="tags">
                                    <Select
                                        mode="tags"
                                        placeholder="Add tags to help people find your event"
                                        className="h-12"
                                        maxTagCount={5}
                                    >
                                        <Select.Option value="networking">Networking</Select.Option>
                                        <Select.Option value="educational">Educational</Select.Option>
                                        <Select.Option value="fun">Fun</Select.Option>
                                        <Select.Option value="professional">Professional</Select.Option>
                                    </Select>
                                </Form.Item>
                            </Col>

                            {/* Date & Time */}
                            <Col span={24}>
                                <Title level={4} className="text-gray-800 mb-4 mt-6">
                                    <CalendarOutlined className="mr-2" />
                                    Date & Time
                                </Title>
                            </Col>

                            <Col span={24}>
                                <Form.Item label="Event Duration" name="type">
                                    <Radio.Group className="w-full">
                                        <Row gutter={16}>
                                            <Col xs={24} sm={12}>
                                                <Radio.Button value="single" className="w-full h-12 flex items-center justify-center">
                                                    Single Day Event
                                                </Radio.Button>
                                            </Col>
                                            <Col xs={24} sm={12}>
                                                <Radio.Button value="multi" className="w-full h-12 flex items-center justify-center">
                                                    Multi-Day Event
                                                </Radio.Button>
                                            </Col>
                                        </Row>
                                    </Radio.Group>
                                </Form.Item>
                            </Col>

                            {/* Dynamic Date Fields */}
                            <Col xs={24} lg={12}>
                                <Form.Item noStyle shouldUpdate={(prev, curr) => prev.type !== curr.type}>
                                    {({ getFieldValue }) =>
                                        getFieldValue("type") === "single" ? (
                                            <Form.Item 
                                                label="Event Date" 
                                                name="date" 
                                                rules={[{ required: true, message: "Please select event date" }]}
                                            >
                                                <DatePicker 
                                                    className="w-full h-12"
                                                    disabledDate={(current) => current && current < dayjs().startOf('day')}
                                                />
                                            </Form.Item>
                                        ) : (
                                            <Form.Item 
                                                label="Date Range" 
                                                name="daterange" 
                                                rules={[{ required: true, message: "Please select date range" }]}
                                            >
                                                <DatePicker.RangePicker 
                                                    className="w-full h-12"
                                                    disabledDate={(current) => current && current < dayjs().startOf('day')}
                                                />
                                            </Form.Item>
                                        )
                                    }
                                </Form.Item>
                            </Col>

                            <Col xs={24} lg={12}>
                                <Form.Item 
                                    label="Time" 
                                    name="time" 
                                    rules={[{ required: true, message: "Please select event time" }]}
                                >
                                    <TimePicker.RangePicker 
                                        format="HH:mm" 
                                        className="w-full h-12"
                                        placeholder={['Start time', 'End time']}
                                    />
                                </Form.Item>
                            </Col>

                            {/* Submit Button */}
                            <Col span={24}>
                                <div className="mt-8 pt-6 border-t border-gray-200">
                                    <Row gutter={16}>
                                        <Col xs={24} sm={12}>
                                            <Button 
                                                size="large"
                                                block
                                                onClick={() => navigate("/dashboard")}
                                                className="h-12"
                                            >
                                                Cancel
                                            </Button>
                                        </Col>
                                        <Col xs={24} sm={12}>
                                            <Button 
                                                type="primary" 
                                                htmlType="submit" 
                                                size="large"
                                                block
                                                className="bg-gradient-to-r from-blue-500 to-purple-600 border-none h-12 font-semibold"
                                            >
                                                Create Event
                                            </Button>
                                        </Col>
                                    </Row>
                                </div>
                            </Col>
                        </Row>
                    </Form>
                </Card>
            </div>
        </div>
    );
}
