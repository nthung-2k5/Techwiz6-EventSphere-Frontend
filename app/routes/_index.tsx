import { Card, Row, Col, Typography } from "antd";

const { Title } = Typography;

// giả lập dữ liệu
const events = [
  { id: 1, title: "Tech Conference 2025", hot: true, date: "2025-09-15" },
  { id: 2, title: "AI & Robotics Workshop", hot: false, date: "2025-09-20" },
  { id: 3, title: "Startup Pitching Day", hot: true, date: "2025-09-25" },
  { id: 4, title: "University Sports Festival", hot: false, date: "2025-10-01" },
];

// lấy event hot
const hotEvents = events.filter((e) => e.hot);
// giả sử "newest" là 2 event có ngày gần nhất
const newestEvents = [...events]
  .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())
  .slice(0, 2);

export default function HomePage() {
  return (
    <div>
      <Title level={2}>🔥 Hot Events</Title>
      <Row gutter={16}>
        {hotEvents.map((event) => (
          <Col span={8} key={event.id}>
            <Card title={event.title}>
              <p>Date: {event.date}</p>
            </Card>
          </Col>
        ))}
      </Row>

      <Title level={2} style={{ marginTop: "2rem" }}>
        🆕 Newest Events
      </Title>
      <Row gutter={16}>
        {newestEvents.map((event) => (
          <Col span={8} key={event.id}>
            <Card title={event.title}>
              <p>Date: {event.date}</p>
            </Card>
          </Col>
        ))}
      </Row>
    </div>
  );
}
