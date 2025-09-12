import { Card, Typography, Form, Input, Button, Select, message } from "antd";
import { Navigate } from "react-router";
import { useAuth } from "../context/AuthContext";
import { useEvents } from "../context/EventContext";
import { NotificationOutlined } from "@ant-design/icons";

const { Title, Text } = Typography;

export default function OrganizerNotificationsPage() {
  const { user } = useAuth();
  const { events } = useEvents();
  const [form] = Form.useForm();
  if (!user || user.role !== "organizer") return <Navigate to="/login" replace />;

  const myEvents = events.filter(e => e.organizer === user.fullName || e.organizer === user.username);

  const onFinish = () => {
    message.success("Notification sent to selected audience (demo)");
    form.resetFields();
  };

  return (
    <div className="p-6">
      <div style={{ marginBottom: 16 }}>
        <Title level={2} style={{ margin: 0 }}>Notifications</Title>
        <Text type="secondary">Send messages to your event participants</Text>
      </div>
      <Card className="shadow-lg border-0">
        <Form form={form} layout="vertical" onFinish={onFinish} size="large">
          <Form.Item label="Event" name="eventId" rules={[{ required: true, message: 'Please select an event' }]}>
            <Select placeholder="Select event">
              {myEvents.map(e => <Select.Option key={e.id} value={e.id}>{e.title}</Select.Option>)}
            </Select>
          </Form.Item>
          <Form.Item label="Subject" name="subject" rules={[{ required: true }]}>
            <Input placeholder="Subject" />
          </Form.Item>
          <Form.Item label="Message" name="message" rules={[{ required: true }]}>
            <Input.TextArea rows={5} placeholder="Write your message" />
          </Form.Item>
          <Button type="primary" htmlType="submit" icon={<NotificationOutlined />} className="bg-gradient-to-r from-blue-500 to-purple-600 border-none">Send</Button>
        </Form>
      </Card>
    </div>
  );
}
