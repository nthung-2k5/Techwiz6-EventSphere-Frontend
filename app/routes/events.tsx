import { List, Card } from "antd";

const sampleEvents = [
  { id: 1, title: "Tech Conference 2025" },
  { id: 2, title: "AI & Robotics Workshop" },
  { id: 3, title: "University Sports Festival" },
];

export default function EventsPage() {
  return (
    <div>
      <h1>Events</h1>
      <List
        grid={{ gutter: 16, column: 3 }}
        dataSource={sampleEvents}
        renderItem={(event) => (
          <List.Item>
            <Card title={event.title}>Event ID: {event.id}</Card>
          </List.Item>
        )}
      />
    </div>
  );
}
