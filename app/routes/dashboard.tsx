import { useState } from "react";
import {
    Button,
    Card,
    Modal,
    Form,
    Input,
    DatePicker,
    TimePicker,
    message,
    Select,
} from "antd";
import { useEvents } from "../context/EventContext";
import { useAuth } from "../context/AuthContext";
import dayjs from "dayjs";

export default function DashboardPage() {
    const { user } = useAuth();

    if (!user) {
        return <h2>You must login to access the dashboard.</h2>;
    }

    if (user.role === "organizer") {
        return <OrganizerDashboard />;
    }

    if (user.role === "participant") {
        return <ParticipantDashboard />;
    }

    return <h2>Welcome, {user.fullName || user.username}!</h2>;
}

/* -------------------- Organizer Dashboard -------------------- */
function OrganizerDashboard() {
    const { user } = useAuth();
    const { events, addEvent, updateEvent, deleteEvent } = useEvents();
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [editingEvent, setEditingEvent] = useState<any>(null);
    const [form] = Form.useForm();

    const myEvents = events.filter((ev) => ev.organizer === user?.username);

    const openCreateModal = () => {
        setEditingEvent(null);
        form.resetFields();
        setIsModalOpen(true);
    };

    const openEditModal = (event: any) => {
        setEditingEvent(event);
        form.setFieldsValue({
            title: event.title,
            description: event.description,
            location: event.location,
            image: event.image,
            dateRange:
        event.startDate && event.endDate
            ? [dayjs(event.startDate), dayjs(event.endDate)]
            : [],
            timeRange: [
                dayjs(event.startTime, "HH:mm"),
                dayjs(event.endTime, "HH:mm"),
            ],
        });
        setIsModalOpen(true);
    };

    const handleSave = () => {
        form.validateFields().then((values) => {
            const updatedData = {
                title: values.title,
                description: values.description,
                location: values.location,
                image: values.image,
                startDate: values.dateRange?.[0]?.format("YYYY-MM-DD"),
                endDate: values.dateRange?.[1]?.format("YYYY-MM-DD"),
                startTime: values.timeRange?.[0]?.format("HH:mm"),
                endTime: values.timeRange?.[1]?.format("HH:mm"),
            };

            if (editingEvent) {
                updateEvent(editingEvent.id, updatedData);
                message.success("Event updated successfully!");
            } else {
                addEvent(updatedData as any);
                message.success("Event created successfully!");
            }

            setIsModalOpen(false);
        });
    };

    return (
        <div>
            <h1>Organizer Dashboard</h1>
            <Button type="primary" onClick={openCreateModal} style={{ marginBottom: 16 }}>
                Create Event
            </Button>

            {myEvents.map((event) => (
                <Card
                    key={event.id}
                    title={event.title}
                    style={{ marginBottom: 16 }}
                    cover={
                        event.image && (
                            <img alt={event.title} src={event.image} style={{ maxHeight: 200, objectFit: "cover" }} />
                        )
                    }
                >
                    <p>{event.description}</p>
                    <p>📍 {event.location}</p>
                    <p>
                        📅 {event.startDate} → {event.endDate} ({event.startTime} -{" "}
                        {event.endTime})
                    </p>
                    <Button onClick={() => openEditModal(event)}>Edit</Button>
                    <Button
                        danger
                        style={{ marginLeft: 8 }}
                        onClick={() => deleteEvent(event.id)}
                    >
                        Delete
                    </Button>
                </Card>
            ))}

            <Modal
                open={isModalOpen}
                title={editingEvent ? "Edit Event" : "Create Event"}
                onCancel={() => setIsModalOpen(false)}
                onOk={handleSave}
            >
                <Form form={form} layout="vertical">
                    <Form.Item name="title" label="Title" rules={[{ required: true }]}>
                        <Input />
                    </Form.Item>
                    <Form.Item name="description" label="Description">
                        <Input.TextArea rows={3} />
                    </Form.Item>
                    <Form.Item name="location" label="Location" rules={[{ required: true }]}>
                        <Input />
                    </Form.Item>
                    <Form.Item name="image" label="Image URL">
                        <Input placeholder="https://example.com/event.jpg" />
                    </Form.Item>
                    <Form.Item name="dateRange" label="Date Range">
                        <DatePicker.RangePicker />
                    </Form.Item>
                    <Form.Item name="timeRange" label="Time Range">
                        <TimePicker.RangePicker format="HH:mm" />
                    </Form.Item>
                </Form>
            </Modal>
        </div>
    );
}

/* -------------------- Participant Dashboard -------------------- */
function ParticipantDashboard() {
    const { user, registerEvent } = useAuth();
    const { events } = useEvents();
    const [search, setSearch] = useState("");
    const [filter, setFilter] = useState("all");

    if (!user) return null;

    const handleRegister = (eventId: number) => {
        registerEvent(eventId);
        message.success("You have registered for this event!");
    };

    const filteredEvents = events.filter((event) => {
        const status = getEventStatus(event);

        if (filter === "ongoing" && status !== "Ongoing") return false;
        if (filter === "upcoming" && status !== "Upcoming") return false;
        if (filter === "past" && status !== "Past") return false;

        if (search && !event.title.toLowerCase().includes(search.toLowerCase())) {
            return false;
        }

        return true;
    });

    const myRegisteredEvents = events.filter((event) =>
        user.registeredEvents.includes(event.id)
    );

    return (
        <div>
            <h1>Participant Dashboard</h1>

            <div style={{ marginBottom: 16, display: "flex", gap: 8 }}>
                <Input
                    placeholder="Search events..."
                    value={search}
                    onChange={(e) => setSearch(e.target.value)}
                    style={{ width: 200 }}
                />
                <Select value={filter} onChange={(v) => setFilter(v)} style={{ width: 150 }}>
                    <Select.Option value="all">All</Select.Option>
                    <Select.Option value="ongoing">Ongoing</Select.Option>
                    <Select.Option value="upcoming">Upcoming</Select.Option>
                    <Select.Option value="past">Past</Select.Option>
                </Select>
            </div>

            <h2>📅 All Events</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {filteredEvents.map((event) => {
                    const isRegistered = user.registeredEvents.includes(event.id);
                    const status = getEventStatus(event);

                    return (
                        <Card
                            key={event.id}
                            title={event.title}
                            style={{ marginBottom: 16 }}
                            cover={
                                event.image && (
                                    <img alt={event.title} src={event.image} style={{ maxHeight: 200, objectFit: "cover" }} />
                                )
                            }
                            hoverable
                            onClick={() => window.location.href = `/events/${event.id}`}
                        >
                            <p>{event.description}</p>
                            <p>📍 {event.location}</p>
                            <p>
                                📅 {event.startDate} → {event.endDate} ({event.startTime} -{" "}
                                {event.endTime})
                            </p>
                            <p>Status: {status}</p>

                            {isRegistered ? (
                                <Button disabled>Already Registered</Button>
                            ) : (
                                <Button type="primary" onClick={() => handleRegister(event.id)}>
                                    Register
                                </Button>
                            )}
                        </Card>
                    );
                })}
            </div>

            <h2 style={{ marginTop: 32 }}>✅ My Registered Events</h2>
            {myRegisteredEvents.length === 0 ? (
                <p>You haven’t registered for any events yet.</p>
            ) : (
                myRegisteredEvents.map((event) => (
                    <Card key={event.id} title={event.title} style={{ marginBottom: 16 }}>
                        <p>{event.description}</p>
                        <p>📍 {event.location}</p>
                        <p>
                            📅 {event.startDate} → {event.endDate} ({event.startTime} -{" "}
                            {event.endTime})
                        </p>
                        <p>Status: {getEventStatus(event)}</p>
                        <Button disabled>Registered</Button>
                    </Card>
                ))
            )}
        </div>
    );
}

function getEventStatus(event: any) {
    const today = dayjs().format("YYYY-MM-DD");

    if (event.startDate <= today && event.endDate >= today) {
        return "Ongoing";
    }
    if (event.startDate > today) {
        return "Upcoming";
    }
    if (event.endDate < today) {
        return "Past";
    }
    return "Unknown";
}
