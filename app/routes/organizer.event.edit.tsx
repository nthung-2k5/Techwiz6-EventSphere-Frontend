import { Card, Form, Input, DatePicker, TimePicker, Select, Button, Typography, message } from "antd";
import { Navigate, useLocation, useNavigate } from "react-router";
import { useAuth } from "../context/AuthContext";
import { useEvents } from "../context/EventContext";

const { Title, Text } = Typography;
const { RangePicker } = DatePicker;

export default function OrganizerEditEventPage() {
  const { user } = useAuth();
  const { events } = useEvents() as any; // depends on context implementation
  const navigate = useNavigate();
  const [form] = Form.useForm();

  if (!user || user.role !== "organizer") return <Navigate to="/login" replace />;

  const params = new URLSearchParams(useLocation().search);
  const id = Number(params.get('id'));
  const ev = events?.find((e: any) => e.id === id);

  const onFinish = (values: any) => {
    // Demo: no backend update function wired
    message.success("Event updated (demo mode)");
    navigate("/organizer/events");
  };

  return (
    <div className="p-6">
      <div style={{ marginBottom: 16 }}>
        <Title level={2} style={{ margin: 0 }}>Edit Event</Title>
        <Text type="secondary">Update your event details</Text>
      </div>
      <Card className="shadow-lg border-0">
        <Form form={form} layout="vertical" onFinish={onFinish} size="large" initialValues={{
          title: ev?.title,
          description: ev?.description,
          category: ev?.category || 'General',
          location: ev?.location,
          maxParticipants: ev?.maxParticipants,
        }}>
          <Form.Item label="Title" name="title" rules={[{ required: true, message: 'Please enter a title' }]}>
            <Input placeholder="Event title" />
          </Form.Item>
          <Form.Item label="Description" name="description" rules={[{ required: true, message: 'Please enter a description' }]}>
            <Input.TextArea rows={4} placeholder="Describe your event" />
          </Form.Item>
          <Form.Item label="Category" name="category">
            <Select placeholder="Select category" options={[{value:'General',label:'General'},{value:'Workshop',label:'Workshop'},{value:'Competition',label:'Competition'}]} />
          </Form.Item>
          <Form.Item label="Location" name="location" rules={[{ required: true, message: 'Please enter a location' }]}>
            <Input placeholder="Venue / Room" />
          </Form.Item>
          <Form.Item label="Max Participants" name="maxParticipants">
            <Input type="number" placeholder="e.g., 200" />
          </Form.Item>
          <Form.Item>
            <Button type="primary" htmlType="submit" className="bg-gradient-to-r from-blue-500 to-purple-600 border-none">Save Changes</Button>
          </Form.Item>
        </Form>
      </Card>
    </div>
  );
}
