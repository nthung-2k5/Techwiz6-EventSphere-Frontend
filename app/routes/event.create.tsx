import {
  Card,
  Form,
  Input,
  Button,
  DatePicker,
  TimePicker,
  Radio,
  message,
} from "antd";
import dayjs from "dayjs";
import { useEvents } from "../context/EventContext";
import { useAuth } from "../context/AuthContext";

import { useNavigate } from "react-router";

export default function CreateEventPage() {
  const { addEvent } = useEvents();
  const { user } = useAuth();
  const navigate = useNavigate();

  if (!user || user.role !== "organizer") {
    return <h2>Only organizers can create events.</h2>;
  }

  const onFinish = (values: any) => {
    if (values.type === "single") {
      addEvent({
        title: values.title,
        description: values.description,
        location: values.location,
        date: values.date.format("YYYY-MM-DD"),
        startTime: values.time[0].format("HH:mm"),
        endTime: values.time[1].format("HH:mm"),
      });
    } else {
      addEvent({
        title: values.title,
        description: values.description,
        location: values.location,
        startDate: values.daterange[0].format("YYYY-MM-DD"),
        endDate: values.daterange[1].format("YYYY-MM-DD"),
        startTime: values.time[0].format("HH:mm"),
        endTime: values.time[1].format("HH:mm"),
      });
    }

    message.success("Event created successfully!");
    navigate("/dashboard");
  };

  return (
    <Card title="Create Event" style={{ maxWidth: 600, margin: "2rem auto" }}>
      <Form layout="vertical" onFinish={onFinish} initialValues={{ type: "single" }}>
        <Form.Item label="Title" name="title" rules={[{ required: true }]}>
          <Input placeholder="Enter event title" />
        </Form.Item>

        <Form.Item label="Description" name="description" rules={[{ required: true }]}>
          <Input.TextArea rows={4} placeholder="Enter event description" />
        </Form.Item>

        <Form.Item label="Location" name="location" rules={[{ required: true }]}>
          <Input placeholder="Enter location" />
        </Form.Item>

        <Form.Item label="Event Type" name="type">
          <Radio.Group>
            <Radio value="single">Single-day</Radio>
            <Radio value="multi">Multi-day</Radio>
          </Radio.Group>
        </Form.Item>

        {/* Single-day date */}
        <Form.Item noStyle shouldUpdate={(prev, curr) => prev.type !== curr.type}>
          {({ getFieldValue }) =>
            getFieldValue("type") === "single" ? (
              <Form.Item label="Date" name="date" rules={[{ required: true }]}>
                <DatePicker style={{ width: "100%" }} />
              </Form.Item>
            ) : (
              <Form.Item label="Date Range" name="daterange" rules={[{ required: true }]}>
                <DatePicker.RangePicker style={{ width: "100%" }} />
              </Form.Item>
            )
          }
        </Form.Item>

        <Form.Item label="Time" name="time" rules={[{ required: true }]}>
          <TimePicker.RangePicker format="HH:mm" style={{ width: "100%" }} />
        </Form.Item>

        <Form.Item>
          <Button type="primary" htmlType="submit" block>
            Create Event
          </Button>
        </Form.Item>
      </Form>
    </Card>
  );
}
