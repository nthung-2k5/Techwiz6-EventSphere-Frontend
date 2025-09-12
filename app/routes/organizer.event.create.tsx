import { Card, Form, Input, DatePicker, TimePicker, Select, Button, Typography, message } from "antd";
import { Navigate, useNavigate } from "react-router";
import { useAuth } from "../context/AuthContext";
import { useEvents } from "../context/EventContext";
import dayjs from "dayjs";

const { Title, Text } = Typography;
const { RangePicker } = DatePicker;

export default function OrganizerCreateEventPage() {
  const { user } = useAuth();
  const { addEvent } = useEvents() as any; // depends on context implementation
  const navigate = useNavigate();
  const [form] = Form.useForm();

  if (!user || user.role !== "organizer") return <Navigate to="/login" replace />;

  const onFinish = (values: any) => {
    try {
      const [startDate, endDate] = values.dateRange || [];
      const payload = {
        title: values.title,
        description: values.description,
        category: values.category || "General",
        department: user.department || "Student Affairs",
        organizer: user.fullName || user.username,
        startDate: startDate ? startDate.format("YYYY-MM-DD") : undefined,
        endDate: endDate ? endDate.format("YYYY-MM-DD") : undefined,
        startTime: values.time?.[0]?.format("HH:mm"),
        endTime: values.time?.[1]?.format("HH:mm"),
        location: values.location,
        maxParticipants: Number(values.maxParticipants) || undefined,
      };
      if (typeof addEvent === 'function') {
        addEvent(payload);
        message.success("Event created and sent for approval");
        navigate("/organizer/events");
      } else {
        message.info("Demo mode: no backend. Form submitted.");
      }
    } catch (e) {
      console.error(e);
      message.error("Failed to create event");
    }
  };

  return (
    <div className="p-6">
      <div style={{ marginBottom: 16 }}>
        <Title level={2} style={{ margin: 0 }}>Create Event</Title>
        <Text type="secondary">Fill in the details to submit a new event</Text>
      </div>
      <Card className="shadow-lg border-0">
        <Form form={form} layout="vertical" onFinish={onFinish} size="large">
          <Form.Item label="Title" name="title" rules={[{ required: true, message: 'Please enter a title' }]}>
            <Input placeholder="Event title" />
          </Form.Item>
          <Form.Item label="Description" name="description" rules={[{ required: true, message: 'Please enter a description' }]}>
            <Input.TextArea rows={4} placeholder="Describe your event" />
          </Form.Item>
          <Form.Item label="Category" name="category">
            <Select placeholder="Select category" options={[{value:'General',label:'General'},{value:'Workshop',label:'Workshop'},{value:'Competition',label:'Competition'}]} />
          </Form.Item>
          <Form.Item label="Date Range" name="dateRange">
            <RangePicker className="w-full" />
          </Form.Item>
          <Form.Item label="Time" name="time">
            <TimePicker.RangePicker className="w-full" />
          </Form.Item>
          <Form.Item label="Location" name="location" rules={[{ required: true, message: 'Please enter a location' }]}>
            <Input placeholder="Venue / Room" />
          </Form.Item>
          <Form.Item label="Max Participants" name="maxParticipants">
            <Input type="number" placeholder="e.g., 200" />
          </Form.Item>
          <Form.Item>
            <Button type="primary" htmlType="submit" className="bg-gradient-to-r from-blue-500 to-purple-600 border-none">Submit</Button>
          </Form.Item>
        </Form>
      </Card>
    </div>
  );
}
