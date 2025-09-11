import {
    Card,
    Form,
    Input,
    Button,
    Rate,
    message,
    Typography,
    Row,
    Col,
    Avatar,
    Divider,
    List
} from "antd";
import {
    StarOutlined,
    MessageOutlined,
    SendOutlined,
    ArrowLeftOutlined,
    UserOutlined
} from "@ant-design/icons";
import { useAuth } from "../context/AuthContext";
import { useNavigate } from "react-router";
import { useState } from "react";

const { Title, Text, Paragraph } = Typography;
const { TextArea } = Input;

interface FeedbackItem {
    id: number;
    user: string;
    rating: number;
    message: string;
    date: string;
}

export default function FeedbackPage() {
    const { user } = useAuth();
    const navigate = useNavigate();
    const [form] = Form.useForm();
    const [feedbacks] = useState<FeedbackItem[]>([
        {
            id: 1,
            user: "Alex Johnson",
            rating: 5,
            message: "The platform is amazing! Event discovery is so easy and the interface is very intuitive.",
            date: "2024-01-15"
        },
        {
            id: 2,
            user: "Sarah Chen",
            rating: 4,
            message: "Great platform for university events. Would love to see more filtering options.",
            date: "2024-01-10"
        },
        {
            id: 3,
            user: "Mike Rodriguez",
            rating: 5,
            message: "As an organizer, this platform has made event management so much easier!",
            date: "2024-01-08"
        }
    ]);

    const onFinish = () => {
        if (!user) {
            message.warning("Please login to submit feedback.");
            navigate("/login");
            return;
        }

        // Here you would typically send the feedback to your backend
        message.success("Thank you for your feedback! We appreciate your input.");
        form.resetFields();
    };

    return (
        <div className="min-h-screen bg-gradient-to-br from-blue-50 via-purple-50 to-pink-50 p-4 lg:p-8">
            <div className="max-w-6xl mx-auto">
                {/* Header */}
                <div className="mb-8">
                    <Button 
                        icon={<ArrowLeftOutlined />}
                        onClick={() => navigate(-1)}
                        className="mb-4 hover:bg-blue-50"
                    >
                        Back
                    </Button>
                    <Card className="shadow-lg border-0 overflow-hidden">
                        <div className="bg-gradient-to-r from-blue-500 to-purple-600 -m-6 mb-6 p-8 text-white">
                            <div className="flex items-center gap-4">
                                <div className="bg-white/20 p-3 rounded-lg">
                                    <MessageOutlined className="text-2xl" />
                                </div>
                                <div>
                                    <Title level={2} className="text-white mb-1">
                                        Feedback & Reviews
                                    </Title>
                                    <Text className="text-white/90">
                                        Help us improve EventSphere by sharing your thoughts and experiences
                                    </Text>
                                </div>
                            </div>
                        </div>
                    </Card>
                </div>

                <Row gutter={[24, 24]}>
                    {/* Feedback Form */}
                    <Col xs={24} lg={12}>
                        <Card title="Share Your Feedback" className="shadow-lg border-0 h-fit">
                            {user ? (
                                <Form
                                    form={form}
                                    layout="vertical"
                                    onFinish={onFinish}
                                    size="large"
                                >
                                    <Form.Item
                                        label="Overall Rating"
                                        name="rating"
                                        rules={[{ required: true, message: "Please provide a rating" }]}
                                    >
                                        <Rate 
                                            character={<StarOutlined />}
                                            className="text-2xl"
                                        />
                                    </Form.Item>

                                    <Form.Item
                                        label="Your Message"
                                        name="message"
                                        rules={[
                                            { required: true, message: "Please share your feedback" },
                                            { min: 10, message: "Please provide at least 10 characters" }
                                        ]}
                                    >
                                        <TextArea
                                            rows={4}
                                            placeholder="Tell us about your experience with EventSphere. What do you like? What could be improved?"
                                            showCount
                                            maxLength={500}
                                        />
                                    </Form.Item>

                                    <Form.Item>
                                        <Button
                                            type="primary"
                                            htmlType="submit"
                                            icon={<SendOutlined />}
                                            size="large"
                                            block
                                            className="bg-gradient-to-r from-blue-500 to-purple-600 border-none h-12 font-semibold"
                                        >
                                            Submit Feedback
                                        </Button>
                                    </Form.Item>
                                </Form>
                            ) : (
                                <div className="text-center py-8">
                                    <UserOutlined className="text-6xl text-gray-300 mb-4" />
                                    <Title level={4} className="text-gray-600 mb-2">
                                        Login Required
                                    </Title>
                                    <Paragraph className="text-gray-500 mb-6">
                                        Please log in to share your feedback with us.
                                    </Paragraph>
                                    <Button
                                        type="primary"
                                        onClick={() => navigate("/login")}
                                        className="bg-gradient-to-r from-blue-500 to-purple-600 border-none"
                                    >
                                        Go to Login
                                    </Button>
                                </div>
                            )}
                        </Card>
                    </Col>

                    {/* Recent Feedback */}
                    <Col xs={24} lg={12}>
                        <Card title="Recent Reviews" className="shadow-lg border-0">
                            <List
                                dataSource={feedbacks}
                                renderItem={(feedback) => (
                                    <List.Item className="border-b border-gray-100 pb-4 mb-4 last:border-b-0 last:mb-0">
                                        <div className="w-full">
                                            <div className="flex items-start gap-3 mb-3">
                                                <Avatar 
                                                    icon={<UserOutlined />} 
                                                    className="bg-gradient-to-r from-blue-400 to-purple-500 flex-shrink-0"
                                                />
                                                <div className="flex-1 min-w-0">
                                                    <div className="flex items-center justify-between mb-1">
                                                        <Text strong className="text-gray-800">
                                                            {feedback.user}
                                                        </Text>
                                                        <Text className="text-gray-400 text-sm">
                                                            {feedback.date}
                                                        </Text>
                                                    </div>
                                                    <Rate 
                                                        disabled 
                                                        defaultValue={feedback.rating} 
                                                        className="text-sm mb-2"
                                                    />
                                                </div>
                                            </div>
                                            <Text className="text-gray-600 leading-relaxed">
                                                {feedback.message}
                                            </Text>
                                        </div>
                                    </List.Item>
                                )}
                            />
                            
                            <Divider />
                            
                            <div className="text-center">
                                <Text className="text-gray-500">
                                    💙 Thank you to all our users for their valuable feedback!
                                </Text>
                            </div>
                        </Card>
                    </Col>
                </Row>

                {/* Features Request Section */}
                <Card className="shadow-lg border-0 mt-8">
                    <Title level={3} className="text-gray-800 mb-4">Feature Requests & Suggestions</Title>
                    <Row gutter={[16, 16]}>
                        <Col xs={24} sm={8}>
                            <div className="text-center p-4 bg-blue-50 rounded-lg">
                                <div className="text-blue-500 text-2xl mb-2">🚀</div>
                                <Text strong>New Features</Text>
                                <div className="text-gray-600 text-sm mt-1">
                                    Suggest new functionality
                                </div>
                            </div>
                        </Col>
                        <Col xs={24} sm={8}>
                            <div className="text-center p-4 bg-green-50 rounded-lg">
                                <div className="text-green-500 text-2xl mb-2">🎨</div>
                                <Text strong>UI/UX Improvements</Text>
                                <div className="text-gray-600 text-sm mt-1">
                                    Design and usability feedback
                                </div>
                            </div>
                        </Col>
                        <Col xs={24} sm={8}>
                            <div className="text-center p-4 bg-purple-50 rounded-lg">
                                <div className="text-purple-500 text-2xl mb-2">🐛</div>
                                <Text strong>Bug Reports</Text>
                                <div className="text-gray-600 text-sm mt-1">
                                    Report issues or problems
                                </div>
                            </div>
                        </Col>
                    </Row>
                </Card>
            </div>
        </div>
    );
}
  