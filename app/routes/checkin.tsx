import { useState } from "react";
import { Card, Input, Button, Typography, message, Space } from "antd";
import { useAuth } from "../context/AuthContext";
import { useEvents } from "../context/EventContext";
import { Navigate } from "react-router";
import { CheckCircleOutlined } from "@ant-design/icons";

const { Title } = Typography;

export default function CheckinPage() {
    const { user } = useAuth();
    const { events } = useEvents();
    const [eventId, setEventId] = useState("");
    const [checkedInEvents, setCheckedInEvents] = useState<number[]>([]);

    if (!user) {
        return <Navigate to="/login" replace />;
    }

    const handleCheckIn = () => {
        const id = Number(eventId);
        const event = events.find(e => e.id === id);
        
        if (!event) {
            message.error("Event not found!");
            return;
        }

        if (!user.registeredEvents.includes(id)) {
            message.error("You are not registered for this event!");
            return;
        }

        if (checkedInEvents.includes(id)) {
            message.warning("You have already checked in to this event!");
            return;
        }

        setCheckedInEvents(prev => [...prev, id]);
        message.success(`Successfully checked in to ${event.title}!`);
        setEventId("");
    };

    return (
        <div style={{ padding: '2rem' }}>
            <Title level={2}>📱 Event Check-In</Title>
            <Card>
                <Space direction="vertical" style={{ width: '100%' }}>
                    <Input
                        placeholder="Enter Event ID"
                        value={eventId}
                        onChange={(e) => setEventId(e.target.value)}
                        size="large"
                    />
                    <Button 
                        type="primary" 
                        size="large" 
                        block
                        icon={<CheckCircleOutlined />}
                        onClick={handleCheckIn}
                        disabled={!eventId.trim()}
                    >
                        Check In
                    </Button>
                </Space>
            </Card>
        </div>
    );
}
  