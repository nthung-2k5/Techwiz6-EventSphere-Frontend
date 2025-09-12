import { Button, Card, Form, Input, message, Typography, Space, Divider } from "antd";
import { useAuth } from "../context/AuthContext";
import { useNavigate, Link } from "react-router";
import { MailOutlined, LockOutlined, LoginOutlined } from "@ant-design/icons";

const { Title, Text } = Typography;

export default function LoginPage() {
    const { login, user } = useAuth();
    const navigate = useNavigate();

    const onFinish = (values: { email: string; password: string }) => {
        const success = login(values.email, values.password);
        if (success) {
            message.success("Login successful!");
            // Check if there's a redirect URL saved
            const redirectUrl = localStorage.getItem("redirectAfterLogin");
            if (redirectUrl) {
                localStorage.removeItem("redirectAfterLogin"); // Clean up
                navigate(redirectUrl);
            } else {
                // Use freshly stored user to avoid relying on stale context state
                const stored = localStorage.getItem('currentUser');
                const role = stored ? (JSON.parse(stored)?.role || 'participant') : (user?.role || 'participant');
                const target = role === 'admin' ? '/admin' : role === 'organizer' ? '/organizer/dashboard' : '/dashboard';
                navigate(target);
            }
        } else {
            message.error("Invalid credentials");
        }
    };

    return (
        <div className="min-h-screen bg-gradient-to-br from-blue-500 via-purple-600 to-violet-700 flex items-center justify-center p-5">
            <Card className="max-w-md w-full rounded-2xl shadow-2xl border-0">
                <div className="text-center mb-8">
                    <Title 
                        level={2} 
                        className="mb-2 bg-gradient-to-r from-blue-500 to-purple-600 bg-clip-text text-transparent"
                    >
                        Welcome Back
                    </Title>
                    <Text type="secondary">Sign in to your EventSphere account</Text>
                </div>

                <Form 
                    onFinish={onFinish}
                    layout="vertical"
                    size="large"
                >
                    <Form.Item 
                        name="email" 
                        label="Email"
                        rules={[{ required: true, type: 'email', message: 'Please enter a valid email' }]}
                    >
                        <Input 
                            prefix={<MailOutlined className="text-gray-400" />}
                            placeholder="Enter your email" 
                            className="rounded-lg"
                        />
                    </Form.Item>
                    
                    <Form.Item 
                        name="password" 
                        label="Password"
                        rules={[{ required: true, message: 'Please enter your password' }]}
                    >
                        <Input.Password 
                            prefix={<LockOutlined className="text-gray-400" />}
                            placeholder="Enter your password"
                            className="rounded-lg"
                        />
                    </Form.Item>
                    
                    <Form.Item className="mb-4">
                        <Button 
                            type="primary" 
                            htmlType="submit" 
                            block
                            icon={<LoginOutlined />}
                            className="h-12 rounded-lg bg-gradient-to-r from-blue-500 to-purple-600 border-0 text-base font-semibold hover:from-blue-600 hover:to-purple-700"
                        >
                            Sign In
                        </Button>
                    </Form.Item>
                </Form>

                <Divider className="my-6">
                    <Text type="secondary">New to EventSphere?</Text>
                </Divider>

                <div className="text-center">
                    <Link to="/register">
                        <Button 
                            ghost
                            block
                            className="h-12 rounded-lg border-blue-500 text-blue-500 text-base font-semibold hover:bg-blue-50"
                        >
                            Create Account
                        </Button>
                    </Link>
                </div>

                <div className="text-center mt-6">
                    <Space direction="vertical" size="small">
                        <Text type="secondary" className="text-sm">
                            Demo Accounts:
                        </Text>
                        <Space split={<Divider type="vertical" />}>
                            <Text type="secondary" className="text-xs">
                                participant/password
                            </Text>
                            <Text type="secondary" className="text-xs">
                                organizer/password
                            </Text>
                        </Space>
                    </Space>
                </div>
            </Card>
        </div>
    );
}
