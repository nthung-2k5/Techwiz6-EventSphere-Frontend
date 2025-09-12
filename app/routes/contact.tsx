import { Card, Typography, Form, Input, Button, message } from "antd";
import { PhoneOutlined, MailOutlined, SendOutlined } from "@ant-design/icons";

const { Title, Paragraph, Text } = Typography;

export default function ContactPage() {
  const [form] = Form.useForm();

  const onFinish = () => {
    message.success("Your message has been sent! We'll get back to you soon.");
    form.resetFields();
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-purple-50 to-pink-50 p-4 lg:p-8">
      <div className="max-w-5xl mx-auto">
        <Card className="shadow-lg border-0 overflow-hidden">
          <div className="bg-gradient-to-r from-blue-500 to-purple-600 -m-6 mb-6 p-8 text-white">
            <Title level={2} className="text-white mb-1">Contact</Title>
            <Text className="text-white/90">Leave your information and we'll reply to you</Text>
          </div>

          <div className="px-6 pb-6 grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <Title level={4}>Info</Title>
              <Paragraph className="mb-2"><PhoneOutlined className="mr-2" />(+84) 0123 456 789</Paragraph>
              <Paragraph><MailOutlined className="mr-2" />support@eventsphere.edu.vn</Paragraph>
              <Paragraph type="secondary">Working hours: Mon–Fri, 8:00–17:00</Paragraph>
            </div>

            <div>
              <Title level={4}>Send a message</Title>
              <Form layout="vertical" form={form} onFinish={onFinish}>
                <Form.Item label="Full name" name="name" rules={[{ required: true, message: "Please enter your full name" }]}>
                  <Input placeholder="John Doe" />
                </Form.Item>
                <Form.Item label="Email" name="email" rules={[{ required: true, type: "email", message: "Invalid email" }]}>
                  <Input placeholder="email@domain.com" />
                </Form.Item>
                <Form.Item label="Message" name="message" rules={[{ required: true, message: "Please enter a message" }]}>
                  <Input.TextArea rows={4} placeholder="How can we help you?" />
                </Form.Item>
                <Button htmlType="submit" type="primary" icon={<SendOutlined />} className="bg-gradient-to-r from-blue-500 to-purple-600 border-none">
                  Send
                </Button>
              </Form>
            </div>
          </div>
        </Card>
      </div>
    </div>
  );
}
