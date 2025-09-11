import { Button, Card, Form, Input, Select, message, Typography, Space, Divider } from "antd";
import { useAuth, type UserRole } from "../context/AuthContext";
import { useNavigate, Link } from "react-router";
import { UserOutlined, LockOutlined, TeamOutlined, UserAddOutlined } from "@ant-design/icons";

const { Option } = Select;
const { Title, Text } = Typography;

export default function RegisterPage() {
    const { register } = useAuth();
    const navigate = useNavigate();

    const onFinish = (values: {
        username: string;
        password: string;
        confirmPassword: string;
        role: UserRole;
        email: string;
        fullName: string;
        department: string;
        enrollmentNumber?: string;
    }) => {
        if (values.password !== values.confirmPassword) {
            message.error("Passwords do not match");
            return;
        }

        const userData = {
            username: values.username,
            password: values.password,
            role: values.role,
            email: values.email,
            fullName: values.fullName,
            department: values.department,
            enrollmentNumber: values.enrollmentNumber
        };

        const success = register(userData);
        if (success) {
            message.success("Registration successful!");
            navigate("/dashboard");
        } else {
            message.error("Username or email already exists");
        }
    };

    return (
        <div className="min-h-screen bg-gradient-to-br from-blue-500 via-purple-600 to-violet-700 flex items-center justify-center p-5">
            <Card className="max-w-lg w-full rounded-2xl shadow-2xl border-0">
                <div className="text-center mb-8">
                    <Title 
                        level={2} 
                        className="mb-2 bg-gradient-to-r from-blue-500 to-purple-600 bg-clip-text text-transparent"
                    >
                        Join EventSphere
                    </Title>
                    <Text type="secondary">Create your account and start discovering events</Text>
                </div>

                <Form 
                    onFinish={onFinish}
                    layout="vertical"
                    size="large"
                >
                    <Form.Item 
                        name="fullName" 
                        label="Full Name"
                        rules={[
                            { required: true, message: 'Please enter your full name' },
                            { min: 2, message: 'Name must be at least 2 characters' }
                        ]}
                    >
                        <Input 
                            prefix={<UserOutlined className="text-gray-400" />}
                            placeholder="Enter your full name" 
                            className="rounded-lg"
                        />
                    </Form.Item>

                    <Form.Item 
                        name="username" 
                        label="Username"
                        rules={[
                            { required: true, message: 'Please enter a username' },
                            { min: 3, message: 'Username must be at least 3 characters' }
                        ]}
                    >
                        <Input 
                            prefix={<UserOutlined className="text-gray-400" />}
                            placeholder="Choose a username" 
                            className="rounded-lg"
                        />
                    </Form.Item>

                    <Form.Item 
                        name="email" 
                        label="Email"
                        rules={[
                            { required: true, message: 'Please enter your email' },
                            { type: 'email', message: 'Please enter a valid email' }
                        ]}
                    >
                        <Input 
                            placeholder="your.email@university.edu" 
                            className="rounded-lg"
                        />
                    </Form.Item>
                    
                    <Form.Item 
                        name="password" 
                        label="Password"
                        rules={[
                            { required: true, message: 'Please enter a password' },
                            { min: 6, message: 'Password must be at least 6 characters' }
                        ]}
                    >
                        <Input.Password 
                            prefix={<LockOutlined className="text-gray-400" />}
                            placeholder="Create a password"
                            className="rounded-lg"
                        />
                    </Form.Item>

                    <Form.Item 
                        name="confirmPassword" 
                        label="Confirm Password"
                        rules={[
                            { required: true, message: 'Please confirm your password' },
                            ({ getFieldValue }) => ({
                                validator(_, value) {
                                    if (!value || getFieldValue('password') === value) {
                                        return Promise.resolve();
                                    }
                                    return Promise.reject(new Error('Passwords do not match'));
                                },
                            }),
                        ]}
                    >
                        <Input.Password 
                            prefix={<LockOutlined className="text-gray-400" />}
                            placeholder="Confirm your password"
                            className="rounded-lg"
                        />
                    </Form.Item>

                    <Form.Item 
                        name="department" 
                        label="Department"
                        rules={[{ required: true, message: 'Please select your department' }]}
                    >
                        <Select 
                            placeholder="Select your department"
                            className="rounded-lg"
                        >
                            <Option value="Computer Science">Computer Science</Option>
                            <Option value="Business">Business</Option>
                            <Option value="Engineering">Engineering</Option>
                            <Option value="Environmental Science">Environmental Science</Option>
                            <Option value="Marketing">Marketing</Option>
                            <Option value="Music Department">Music Department</Option>
                            <Option value="Mathematics">Mathematics</Option>
                            <Option value="Physics">Physics</Option>
                            <Option value="Chemistry">Chemistry</Option>
                            <Option value="Biology">Biology</Option>
                            <Option value="Psychology">Psychology</Option>
                            <Option value="Literature">Literature</Option>
                        </Select>
                    </Form.Item>

                    <Form.Item 
                        name="enrollmentNumber" 
                        label="Enrollment Number (Optional)"
                    >
                        <Input 
                            placeholder="e.g., CS2023001" 
                            className="rounded-lg"
                        />
                    </Form.Item>
                    
                    <Form.Item 
                        name="role" 
                        label="Account Type"
                        rules={[{ required: true, message: 'Please select your role' }]}
                    >
                        <Select 
                            placeholder="What describes you best?"
                            className="rounded-lg"
                            suffixIcon={<TeamOutlined className="text-gray-400" />}
                        >
                            <Option value="participant">
                                <Space>
                                    <UserOutlined />
                                    <div>
                                        <div><strong>Participant</strong></div>
                                        <div className="text-xs text-gray-400">
                                            Join and attend events
                                        </div>
                                    </div>
                                </Space>
                            </Option>
                            <Option value="organizer">
                                <Space>
                                    <TeamOutlined />
                                    <div>
                                        <div><strong>Organizer</strong></div>
                                        <div className="text-xs text-gray-400">
                                            Create and manage events
                                        </div>
                                    </div>
                                </Space>
                            </Option>
                        </Select>
                    </Form.Item>
                    
                    <Form.Item className="mb-4">
                        <Button 
                            type="primary" 
                            htmlType="submit" 
                            block
                            icon={<UserAddOutlined />}
                            className="h-12 rounded-lg bg-gradient-to-r from-blue-500 to-purple-600 border-0 text-base font-semibold hover:from-blue-600 hover:to-purple-700"
                        >
                            Create Account
                        </Button>
                    </Form.Item>
                </Form>

                <Divider className="my-6">
                    <Text type="secondary">Already have an account?</Text>
                </Divider>

                <div className="text-center">
                    <Link to="/login">
                        <Button 
                            ghost
                            block
                            className="h-12 rounded-lg border-blue-500 text-blue-500 text-base font-semibold hover:bg-blue-50"
                        >
                            Sign In
                        </Button>
                    </Link>
                </div>

                <div className="text-center mt-6">
                    <Text type="secondary" className="text-xs">
                        By creating an account, you agree to our Terms of Service and Privacy Policy
                    </Text>
                </div>
            </Card>
        </div>
    );
}
