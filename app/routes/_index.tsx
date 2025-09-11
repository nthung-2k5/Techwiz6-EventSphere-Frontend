import { Card, Row, Col, Typography, Alert, Empty, Input, Select } from "antd";
import { Link } from "react-router";
import { useEvents } from "../context/EventContext";
import { useState } from "react";
import dayjs from "dayjs";

const { Title, Paragraph } = Typography;

export default function HomePage() {
  const { events } = useEvents();
  const [search, setSearch] = useState("");
  const [filter, setFilter] = useState("all");

  const filteredEvents = events.filter((event) => {
    const matchesSearch =
      event.title.toLowerCase().includes(search.toLowerCase()) ||
      event.description.toLowerCase().includes(search.toLowerCase());

    const status = getEventStatus(event).toLowerCase();
    const matchesFilter = filter === "all" || filter === status;

    return matchesSearch && matchesFilter;
  });

  const hotEvents = filteredEvents.slice(0, 2);
  const latestEvents = filteredEvents.slice(-3);

  return (
    <div style={{ padding: "2rem" }}>
      <Alert
        message="🎉 Welcome to EventSphere"
        description="Discover and join the hottest and newest events at your university!"
        type="info"
        showIcon
        style={{ marginBottom: "2rem" }}
      />

      <div style={{ display: "flex", gap: "1rem", marginBottom: "2rem" }}>
        <Input
          placeholder="Search events..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          style={{ maxWidth: 300 }}
        />
        <Select value={filter} onChange={setFilter} style={{ width: 200 }}>
          <Select.Option value="all">All</Select.Option>
          <Select.Option value="ongoing">Ongoing</Select.Option>
          <Select.Option value="upcoming">Upcoming</Select.Option>
          <Select.Option value="past">Past</Select.Option>
        </Select>
      </div>

      <Title level={2}>🔥 Hot Events</Title>
      <Row gutter={[16, 16]}>
        {hotEvents.map((event) => (
          <Col span={12} key={event.id}>
            <EventCard event={event} />
          </Col>
        ))}
      </Row>

      <Title level={2} style={{ marginTop: "2rem" }}>
        🆕 Latest Events
      </Title>
      <Row gutter={[16, 16]}>
        {latestEvents.map((event) => (
          <Col span={8} key={event.id}>
            <EventCard event={event} />
          </Col>
        ))}
      </Row>

      <Title level={2} style={{ marginTop: "2rem" }}>
        📅 All Events
      </Title>
      {filteredEvents.length === 0 ? (
        <Empty description="No events available." />
      ) : (
        <Row gutter={[16, 16]}>
          {filteredEvents.map((event) => (
            <Col xs={24} sm={12} md={8} lg={8} xl={6} key={event.id}>
              <EventCard event={event} />
            </Col>
          ))}
        </Row>
      )}
    </div>
  );
}

function EventCard({ event }: { event: any }) {
  return (
    <Card
      title={event.title}
      bordered={false}
      hoverable
      cover={
        event.image && (
          <img
            alt={event.title}
            src={event.image}
            style={{ height: 180, objectFit: "cover" }}
          />
        )
      }
      extra={<Link to={`/events/${event.id}`}>View Details</Link>}
    >
      <Paragraph ellipsis={{ rows: 2 }}>{event.description}</Paragraph>
      <p>
        <strong>📍 {event.location}</strong>
      </p>
      {event.date ? (
        <p>Date: {event.date}</p>
      ) : (
        <p>Date: {event.startDate} → {event.endDate}</p>
      )}
      <p>
        Time: {event.startTime} - {event.endTime}
      </p>
      <p>Organizer: {event.organizer}</p>
      <p>Status: {getEventStatus(event)}</p>
    </Card>
  );
}

function getEventStatus(event: any) {
  const today = dayjs().format("YYYY-MM-DD");
  if (event.startDate <= today && event.endDate >= today) return "Ongoing";
  if (event.startDate > today) return "Upcoming";
  if (event.endDate < today) return "Past";
  return "Unknown";
}
