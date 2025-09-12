import { useMemo, useState } from "react";
import { Card, Typography, Row, Col, Statistic, Select, Input, Table, Tag, Space, Button, Drawer, Descriptions, message } from "antd";
import { Navigate } from "react-router";
import { useAuth } from "../context/AuthContext";
import { useEvents } from "../context/EventContext";
import { DownloadOutlined, CheckOutlined, CloseOutlined, UserOutlined, CalendarOutlined } from "@ant-design/icons";

const { Title, Text } = Typography;
const { Option } = Select;

type RegistrationStatus = "approved" | "pending" | "waitlisted" | "cancelled";

interface RegistrationItem {
  id: number;
  eventId: number;
  userId: string;
  participantName: string;
  participantEmail: string;
  status: RegistrationStatus;
  createdAt: string;
  checkInAt?: string;
  certificateEligible?: boolean;
}

export default function OrganizerRegistrationsPage() {
  const { user } = useAuth();
  const { events } = useEvents();
  const [search, setSearch] = useState("");
  const [selectedEvent, setSelectedEvent] = useState<number | "all">("all");
  const [statusFilter, setStatusFilter] = useState<RegistrationStatus | "all">("all");
  const [checkinFilter, setCheckinFilter] = useState<"all" | "checked" | "not">("all");
  const [drawerItem, setDrawerItem] = useState<RegistrationItem | null>(null);

  if (!user || user.role !== "organizer") return <Navigate to="/login" replace />;

  const myEvents = events.filter(e => e.organizer === user.fullName || e.organizer === user.username);

  // Mock sample registrations
  const [registrations, setRegistrations] = useState<RegistrationItem[]>([
    { id: 1, eventId: myEvents[0]?.id ?? 1, userId: "john_doe", participantName: "John Doe", participantEmail: "john.doe@student.university.edu", status: "approved", createdAt: "2025-01-05 10:10", checkInAt: "2025-01-10 09:00", certificateEligible: true },
    { id: 2, eventId: myEvents[0]?.id ?? 1, userId: "emma_taylor", participantName: "Emma Taylor", participantEmail: "emma.taylor@student.university.edu", status: "pending", createdAt: "2025-01-06 11:30" },
    { id: 3, eventId: myEvents[1]?.id ?? 2, userId: "david_kim", participantName: "David Kim", participantEmail: "david.kim@student.university.edu", status: "waitlisted", createdAt: "2025-01-06 12:45" },
    { id: 4, eventId: myEvents[1]?.id ?? 2, userId: "alex_chen", participantName: "Alex Chen", participantEmail: "alex.chen@student.university.edu", status: "approved", createdAt: "2025-01-04 08:25" },
  ]);

  const filtered = useMemo(() => {
    return registrations.filter(r => {
      const byEvent = selectedEvent === "all" ? true : r.eventId === selectedEvent;
      const byStatus = statusFilter === "all" ? true : r.status === statusFilter;
      const byCheckin = checkinFilter === "all" ? true : (checkinFilter === "checked" ? !!r.checkInAt : !r.checkInAt);
      const byQuery = search ? (r.participantName.toLowerCase().includes(search.toLowerCase()) || r.participantEmail.toLowerCase().includes(search.toLowerCase())) : true;
      return byEvent && byStatus && byCheckin && byQuery;
    });
  }, [registrations, selectedEvent, statusFilter, checkinFilter, search]);

  const stats = useMemo(() => ({
    total: registrations.length,
    approved: registrations.filter(r => r.status === "approved").length,
    pending: registrations.filter(r => r.status === "pending").length,
    waitlisted: registrations.filter(r => r.status === "waitlisted").length,
    checkedIn: registrations.filter(r => !!r.checkInAt).length,
  }), [registrations]);

  const updateStatus = (id: number, status: RegistrationStatus) => {
    setRegistrations(prev => prev.map(r => r.id === id ? { ...r, status } : r));
    message.success(`Status updated to ${status}`);
  };

  const toggleCheckin = (id: number) => {
    setRegistrations(prev => prev.map(r => r.id === id ? { ...r, checkInAt: r.checkInAt ? undefined : new Date().toISOString() } : r));
  };

  const exportCsv = () => {
    const header = ["Name","Email","Event","Status","CheckedIn","CreatedAt"].join(",");
    const lines = filtered.map(r => {
      const ev = myEvents.find(e => e.id === r.eventId);
      return [r.participantName, r.participantEmail, ev?.title || `#${r.eventId}`, r.status, r.checkInAt ? "Yes" : "No", r.createdAt].join(",");
    });
    const csv = [header, ...lines].join("\n");
    const blob = new Blob([csv], { type: "text/csv;charset=utf-8;" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url; a.download = 'registrations.csv'; a.click();
    URL.revokeObjectURL(url);
  };

  const columns = [
    { 
      title: 'Participant', 
      dataIndex: 'participantName', 
      key: 'participantName', 
      ellipsis: true,
      render: (t: string, r: RegistrationItem) => (
        <div style={{ maxWidth: 240 }}>
          <div style={{ fontWeight: 600, whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>{t}</div>
          <div style={{ color: '#888', fontSize: 12, whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>{r.participantEmail}</div>
        </div>
      ) 
    },
    { title: 'Event', dataIndex: 'eventId', key: 'eventId', ellipsis: true, render: (id: number) => myEvents.find(e => e.id === id)?.title || `#${id}` },
    { title: 'Registered', dataIndex: 'createdAt', key: 'createdAt' },
    { title: 'Status', dataIndex: 'status', key: 'status', render: (s: RegistrationStatus) => (
      <Tag color={s === 'approved' ? 'green' : s === 'pending' ? 'orange' : s === 'waitlisted' ? 'blue' : 'red'}>{s}</Tag>
    ) },
    { title: 'Check-in', dataIndex: 'checkInAt', key: 'checkInAt', render: (v?: string) => v ? <Tag color="green">Checked-in</Tag> : <Tag>Not</Tag> },
    { title: 'Certificate', dataIndex: 'certificateEligible', key: 'certificateEligible', render: (v?: boolean) => v ? <Tag color="gold">Eligible</Tag> : <Tag>—</Tag> },
    { 
      title: 'Actions', 
      key: 'actions', 
      width: 380,
      render: (_: any, r: RegistrationItem) => (
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: 8, maxWidth: '100%' }}>
          {r.status !== 'approved' && (
            <Button size="small" type="primary" icon={<CheckOutlined />} onClick={() => updateStatus(r.id, 'approved')}>Approve</Button>
          )}
          {r.status !== 'waitlisted' && (
            <Button size="small" onClick={() => updateStatus(r.id, 'waitlisted')}>Waitlist</Button>
          )}
          {r.status !== 'cancelled' && (
            <Button size="small" danger icon={<CloseOutlined />} onClick={() => updateStatus(r.id, 'cancelled')}>Cancel</Button>
          )}
          <Button size="small" onClick={() => toggleCheckin(r.id)}>{r.checkInAt ? 'Uncheck' : 'Check-in'}</Button>
          <Button size="small" onClick={() => setDrawerItem(r)}>Details</Button>
        </div>
      )
    },
  ];

  return (
    <div className="p-6">
      <div style={{ marginBottom: 16 }}>
        <Title level={2} style={{ margin: 0 }}>Registrations</Title>
        <Text type="secondary">Manage participants for your events</Text>
      </div>

      <Row gutter={[16, 16]} style={{ marginBottom: 16 }}>
        <Col xs={24} sm={12} lg={6}><Card><Statistic title="Total" value={stats.total} prefix={<UserOutlined />} /></Card></Col>
        <Col xs={24} sm={12} lg={6}><Card><Statistic title="Approved" value={stats.approved} /></Card></Col>
        <Col xs={24} sm={12} lg={6}><Card><Statistic title="Pending" value={stats.pending} /></Card></Col>
        <Col xs={24} sm={12} lg={6}><Card><Statistic title="Checked-in" value={stats.checkedIn} prefix={<CalendarOutlined />} /></Card></Col>
      </Row>

      <Card className="shadow-lg border-0 mb-4" title="Filters">
        <Row gutter={[12, 12]}>
          <Col xs={24} md={6}>
            <Select value={selectedEvent} onChange={setSelectedEvent as any} className="w-full" placeholder="Select event">
              <Option value="all">All events</Option>
              {myEvents.map(e => <Option key={e.id} value={e.id}>{e.title}</Option>)}
            </Select>
          </Col>
          <Col xs={24} md={6}>
            <Select value={statusFilter} onChange={setStatusFilter as any} className="w-full">
              <Option value="all">All statuses</Option>
              <Option value="approved">Approved</Option>
              <Option value="pending">Pending</Option>
              <Option value="waitlisted">Waitlisted</Option>
              <Option value="cancelled">Cancelled</Option>
            </Select>
          </Col>
          <Col xs={24} md={6}>
            <Select value={checkinFilter} onChange={setCheckinFilter as any} className="w-full">
              <Option value="all">All check-in</Option>
              <Option value="checked">Checked-in</Option>
              <Option value="not">Not checked-in</Option>
            </Select>
          </Col>
          <Col xs={24} md={6}>
            <Input.Search allowClear placeholder="Search name or email" value={search} onChange={(e) => setSearch(e.target.value)} onSearch={setSearch} />
          </Col>
        </Row>
      </Card>

      <Card className="shadow-lg border-0" title="Registration List" extra={<Button icon={<DownloadOutlined />} onClick={exportCsv}>Export CSV</Button>}>
        <Table 
          dataSource={filtered} 
          columns={columns as any} 
          rowKey="id" 
          pagination={{ pageSize: 10 }}
          scroll={{ x: 900 }}
        />
      </Card>

      <Drawer open={!!drawerItem} width={520} onClose={() => setDrawerItem(null)} title="Registration Details">
        {drawerItem && (
          <Descriptions bordered column={1} size="middle">
            <Descriptions.Item label="Participant">{drawerItem.participantName}</Descriptions.Item>
            <Descriptions.Item label="Email">{drawerItem.participantEmail}</Descriptions.Item>
            <Descriptions.Item label="Event">{myEvents.find(e => e.id === drawerItem.eventId)?.title || `#${drawerItem.eventId}`}</Descriptions.Item>
            <Descriptions.Item label="Status">{drawerItem.status}</Descriptions.Item>
            <Descriptions.Item label="Registered At">{drawerItem.createdAt}</Descriptions.Item>
            <Descriptions.Item label="Check-in">{drawerItem.checkInAt ? drawerItem.checkInAt : 'Not checked-in'}</Descriptions.Item>
            <Descriptions.Item label="Certificate">{drawerItem.certificateEligible ? 'Eligible' : '—'}</Descriptions.Item>
          </Descriptions>
        )}
      </Drawer>
    </div>
  );
}
