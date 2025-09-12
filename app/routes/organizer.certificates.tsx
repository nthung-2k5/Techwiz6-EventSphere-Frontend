import { Card, Typography, Table, Tag, Button, Space, message } from "antd";
import { Navigate } from "react-router";
import { useAuth } from "../context/AuthContext";
import { useEvents } from "../context/EventContext";
import { TrophyOutlined, DownloadOutlined } from "@ant-design/icons";

const { Title, Text } = Typography;

interface CertItem {
  id: number;
  eventId: number;
  participantName: string;
  participantEmail: string;
  eligible: boolean;
}

export default function OrganizerCertificatesPage() {
  const { user } = useAuth();
  const { events } = useEvents();
  if (!user || user.role !== "organizer") return <Navigate to="/login" replace />;

  const myEvents = events.filter(e => e.organizer === user.fullName || e.organizer === user.username);

  // Demo certificate eligibility
  const data: CertItem[] = [
    { id: 1, eventId: myEvents[0]?.id ?? 1, participantName: 'John Doe', participantEmail: 'john.doe@student.university.edu', eligible: true },
    { id: 2, eventId: myEvents[0]?.id ?? 1, participantName: 'Emma Taylor', participantEmail: 'emma.taylor@student.university.edu', eligible: false },
    { id: 3, eventId: myEvents[1]?.id ?? 2, participantName: 'Alex Chen', participantEmail: 'alex.chen@student.university.edu', eligible: true },
  ];

  const issueCertificate = (r: CertItem) => {
    if (!r.eligible) {
      message.warning('Participant is not eligible for certificate');
      return;
    }
    message.success(`Issued certificate to ${r.participantName} (demo)`);
  };

  const columns = [
    { title: 'Participant', dataIndex: 'participantName', key: 'participantName' },
    { title: 'Email', dataIndex: 'participantEmail', key: 'participantEmail' },
    { title: 'Event', dataIndex: 'eventId', key: 'eventId', render: (id: number) => myEvents.find(e => e.id === id)?.title || `#${id}` },
    { title: 'Eligibility', dataIndex: 'eligible', key: 'eligible', render: (v: boolean) => v ? <Tag color="gold">Eligible</Tag> : <Tag>Not eligible</Tag> },
    { title: 'Actions', key: 'actions', render: (_: any, r: CertItem) => (
      <Space>
        <Button size="small" type="primary" icon={<TrophyOutlined />} disabled={!r.eligible} onClick={() => issueCertificate(r)}>Issue</Button>
        <Button size="small" icon={<DownloadOutlined />}>Download</Button>
      </Space>
    ) },
  ];

  return (
    <div className="p-6">
      <div style={{ marginBottom: 16 }}>
        <Title level={2} style={{ margin: 0 }}>Certificates</Title>
        <Text type="secondary">Manage certificate eligibility and issuing (demo)</Text>
      </div>
      <Card className="shadow-lg border-0">
        <Table dataSource={data} columns={columns as any} rowKey="id" pagination={{ pageSize: 10 }} />
      </Card>
    </div>
  );
}
