import { useMemo, useState, type JSX } from "react";
import { Card, Typography, Input, Collapse, Tag, Space } from "antd";
import { QuestionCircleOutlined, SearchOutlined } from "@ant-design/icons";

const { Title, Paragraph, Text } = Typography;
const { Panel } = Collapse;

interface FAQItem {
  q: string;
  a: string | JSX.Element;
  tags?: string[];
}

const FAQ_DATA: FAQItem[] = [
  {
    q: "What is EventSphere?",
    a: "EventSphere is a university-focused event management platform that helps students and organizers discover, create, and manage events.",
    tags: ["general", "platform"],
  },
  {
    q: "How do I register for an event?",
    a: "Open the event details page and click the Register button. You may need to sign in first.",
    tags: ["participant", "registration"],
  },
  {
    q: "How does QR check-in work?",
    a: (
      <span>
        Go to QR Check-in, choose Camera scan or Upload QR image. Once scanned, the system will validate your registration and mark attendance.
      </span>
    ),
    tags: ["participant", "check-in", "qr"],
  },
  {
    q: "I'm an organizer. How can I create an event?",
    a: "Login as an organizer, then go to Organizer Dashboard → Create Event. Fill in event details and submit for approval.",
    tags: ["organizer", "event"],
  },
  {
    q: "How are certificates issued?",
    a: "After an event is completed, eligible participants can receive a certificate from the organizer under Organizer → Certificates.",
    tags: ["certificate", "organizer", "participant"],
  },
  {
    q: "Which roles are supported?",
    a: "There are three roles: Participant, Organizer, and Admin. Participants register and check in; Organizers create/manage events; Admins moderate and manage the system.",
    tags: ["roles"],
  },
];

export default function FAQPage() {
  const [query, setQuery] = useState("");

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    if (!q) return FAQ_DATA;
    return FAQ_DATA.filter(item =>
      item.q.toLowerCase().includes(q) ||
      (typeof item.a === 'string' ? item.a.toLowerCase().includes(q) : false) ||
      (item.tags || []).some(t => t.toLowerCase().includes(q))
    );
  }, [query]);

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-purple-50 to-pink-50 p-4 lg:p-8">
      <div className="max-w-4xl mx-auto">
        <Card className="shadow-lg border-0 overflow-hidden">
          <div className="bg-gradient-to-r from-blue-500 to-purple-600 -m-6 mb-6 p-8 text-white">
            <div className="flex items-center gap-4">
              <div className="bg-white/20 p-3 rounded-lg">
                <QuestionCircleOutlined className="text-2xl" />
              </div>
              <div>
                <Title level={2} className="text-white mb-1">Frequently Asked Questions</Title>
                <Text className="text-white/90">Find quick answers to common questions</Text>
              </div>
            </div>
          </div>

          <div className="px-6 pb-6">
            <Input
              size="large"
              placeholder="Search by keyword..."
              prefix={<SearchOutlined className="text-gray-400" />}
              allowClear
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              className="mb-4"
            />

            <Collapse accordion bordered={false} className="bg-transparent">
              {filtered.map((item, idx) => (
                <Panel header={<span className="font-semibold">{item.q}</span>} key={idx.toString()}>
                  <div className="mb-3">
                    {typeof item.a === 'string' ? <Paragraph>{item.a}</Paragraph> : item.a}
                  </div>
                  {item.tags && item.tags.length > 0 && (
                    <Space wrap>
                      {item.tags.map((t) => (
                        <Tag key={t} color="geekblue">{t}</Tag>
                      ))}
                    </Space>
                  )}
                </Panel>
              ))}
              {filtered.length === 0 && (
                <Panel header={<span className="font-semibold">No results</span>} key="empty" disabled>
                  <Paragraph>Try a different keyword such as "register", "organizer", or "certificate".</Paragraph>
                </Panel>
              )}
            </Collapse>
          </div>
        </Card>
      </div>
    </div>
  );
}
