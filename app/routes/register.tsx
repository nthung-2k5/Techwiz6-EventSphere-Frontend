import { Button, Card, Form, Input, Select, message } from "antd";
import { useAuth } from "../context/AuthContext";
import { useNavigate } from "react-router";

const { Option } = Select;

export default function RegisterPage() {
  const { register } = useAuth();
  const navigate = useNavigate();

  const onFinish = (values: {
    username: string;
    password: string;
    role: "participant" | "organizer";
  }) => {
    const success = register(values.username, values.password, values.role);
    if (success) {
      message.success("Registration successful!");
      navigate("/dashboard");
    } else {
      message.error("Username already exists");
    }
  };

  return (
    <Card title="Register" style={{ maxWidth: 400, margin: "2rem auto" }}>
      <Form onFinish={onFinish}>
        <Form.Item name="username" rules={[{ required: true }]}>
          <Input placeholder="Username" />
        </Form.Item>
        <Form.Item name="password" rules={[{ required: true }]}>
          <Input.Password placeholder="Password" />
        </Form.Item>
        <Form.Item name="role" rules={[{ required: true }]}>
          <Select placeholder="Select role">
            <Option value="participant">Participant</Option>
            <Option value="organizer">Organizer</Option>
          </Select>
        </Form.Item>
        <Form.Item>
          <Button type="primary" htmlType="submit" block>
            Register
          </Button>
        </Form.Item>
      </Form>
    </Card>
  );
}
