import { List, Card, Typography } from "antd";

const { Title } = Typography;

// giả lập dữ liệu chung
const allEvents = [
    { id: 1, title: "Tech Conference 2025", date: "2025-09-15" },
    { id: 2, title: "AI & Robotics Workshop", date: "2025-09-20" },
    { id: 3, title: "Startup Pitching Day", date: "2025-09-25" },
    { id: 4, title: "University Sports Festival", date: "2025-10-01" },
    { id: 5, title: "Cultural Exchange Fair", date: "2025-10-10" },
];

export default function EventsPage() {
    return (
        <div>
            <Title level={2}>📅 All Events</Title>
            <List
                grid={{ gutter: 16, column: 3 }}
                dataSource={allEvents}
                renderItem={(event) => (
                    <List.Item>
                        <Card title={event.title}>
                            <p>Date: {event.date}</p>
                        </Card>
                    </List.Item>
                )}
            />
        </div>
    );
}
