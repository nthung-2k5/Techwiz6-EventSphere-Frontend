import type { Route } from "./+types/_index";
import { Typography, Button } from "antd";
import { Link } from "react-router";

export function meta({}: Route.MetaArgs) {
  return [
    { title: "EventSphere - Home" },
    { name: "description", content: "Event Management System" },
  ];
}

export default function Home() {
  return (
    <div style={{ textAlign: "center", marginTop: 50 }}>
      <Typography.Title>Welcome to EventSphere</Typography.Title>
      <Typography.Paragraph>
        Explore, register, and manage events all in one place.
      </Typography.Paragraph>
      <Link to="/events">
        <Button type="primary" size="large">
          Browse Events
        </Button>
      </Link>
    </div>
  );
}
