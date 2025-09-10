import { Button, Card, Form, Input, message } from "antd";
import { useAuth } from "../context/AuthContext";
import { useNavigate } from "react-router";

export default function LoginPage() {
    const { login } = useAuth();
    const navigate = useNavigate();

    const onFinish = (values: { username: string; password: string }) => {
        const success = login(values.username, values.password);
        if (success) {
            message.success("Login successful!");
            navigate("/dashboard");
        } else {
            message.error("Invalid credentials");
        }
    };

    return (
        <Card title="Login" style={{ maxWidth: 400, margin: "2rem auto" }}>
            <Form onFinish={onFinish}>
                <Form.Item name="username" rules={[{ required: true }]}>
                    <Input placeholder="Username" />
                </Form.Item>
                <Form.Item name="password" rules={[{ required: true }]}>
                    <Input.Password placeholder="Password" />
                </Form.Item>
                <Form.Item>
                    <Button type="primary" htmlType="submit" block>
                        Login
                    </Button>
                </Form.Item>
            </Form>
        </Card>
    );
}
