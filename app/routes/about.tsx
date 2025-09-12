import { Card, Typography, Row, Col, Avatar, Tag, Divider, List, Space } from "antd";
import { TeamOutlined, CodeOutlined, ApiOutlined, BgColorsOutlined } from "@ant-design/icons";

const { Title, Paragraph, Text } = Typography;

type Member = {
  name: string;
  role: string;
  avatar: string;
  intro?: string;
};

const frontendTeam: Member[] = [
  { name: "Tên thành viên 1", role: "Frontend", avatar: "https://i.pravatar.cc/150?img=11", intro: "UI/UX & React" },
  { name: "Tên thành viên 2", role: "Frontend", avatar: "https://i.pravatar.cc/150?img=12", intro: "Routing & State" },
  { name: "Tên thành viên 3", role: "Frontend", avatar: "https://i.pravatar.cc/150?img=13", intro: "Ant Design" },
  { name: "Tên thành viên 4", role: "Frontend", avatar: "https://i.pravatar.cc/150?img=14", intro: "Forms & Validation" },
  { name: "Tên thành viên 5", role: "Frontend", avatar: "https://i.pravatar.cc/150?img=15", intro: "Performance" },
];

const backendTeam: Member[] = [
  { name: "Tên thành viên 1", role: "Backend", avatar: "https://i.pravatar.cc/150?img=21", intro: "API & Auth" },
  { name: "Tên thành viên 2", role: "Backend", avatar: "https://i.pravatar.cc/150?img=22", intro: "Database & DevOps" },
];

const techStack = [
  { name: "React Router", icon: <CodeOutlined /> },
  { name: "Ant Design", icon: <BgColorsOutlined /> },
  { name: "TailwindCSS", icon: <BgColorsOutlined /> },
  { name: "TypeScript", icon: <CodeOutlined /> },
  { name: "Bun", icon: <ApiOutlined /> },
];

export default function AboutPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-purple-50 to-pink-50 p-4 lg:p-8">
      <div className="max-w-6xl mx-auto">
        {/* Hero / Intro */}
        <Card className="shadow-lg border-0 overflow-hidden">
          <div className="bg-gradient-to-r from-blue-500 to-purple-600 -m-6 mb-6 p-8 text-white">
            <div className="flex items-center gap-4">
              <div className="bg-white/20 p-3 rounded-lg">
                <TeamOutlined className="text-2xl" />
              </div>
              <div>
                <Title level={2} className="text-white mb-1">Giới thiệu EventSphere</Title>
                <Text className="text-white/90">Hệ thống quản lý sự kiện cho trường đại học</Text>
              </div>
            </div>
          </div>

          <div className="px-6 pb-6">
            <Paragraph>
              EventSphere giúp sinh viên, ban tổ chức và quản trị viên tạo, theo dõi và tham gia các sự kiện một cách tiện lợi. 
              Các tính năng nổi bật gồm đăng ký sự kiện, check‑in QR, cấp chứng chỉ, thư viện phương tiện và hệ thống phản hồi.
            </Paragraph>
            <Paragraph>
              Dự án sử dụng React Router, Ant Design, TailwindCSS và TypeScript. Quy trình phát triển ưu tiên trải nghiệm người dùng, hiệu năng và khả năng mở rộng.
            </Paragraph>

            {/* Roles & Counts */}
            <Row gutter={[16, 16]} className="mt-2 mb-4">
              <Col xs={24} md={12}>
                <Card className="card-elevated">
                  <Space size="middle" align="center">
                    <Tag color="blue">Frontend</Tag>
                    <Text strong>5 thành viên</Text>
                  </Space>
                </Card>
              </Col>
              <Col xs={24} md={12}>
                <Card className="card-elevated">
                  <Space size="middle" align="center">
                    <Tag color="purple">Backend</Tag>
                    <Text strong>2 thành viên</Text>
                  </Space>
                </Card>
              </Col>
            </Row>

            {/* Tech stack */}
            <Card title="Công nghệ sử dụng" className="shadow-md border-0 mb-6">
              <Space size={[12, 12]} wrap>
                {techStack.map((t) => (
                  <Tag key={t.name} color="geekblue" className="px-3 py-1 text-base">
                    <Space>
                      {t.icon}
                      <span>{t.name}</span>
                    </Space>
                  </Tag>
                ))}
              </Space>
            </Card>

            {/* Frontend Team */}
            <Card title="Nhóm Frontend" className="shadow-md border-0 mb-6">
              <Row gutter={[16, 16]}>
                {frontendTeam.map((m, idx) => (
                  <Col key={idx} xs={24} sm={12} md={8} lg={8}>
                    <Card hoverable className="card-gradient">
                      <Space align="start" size="middle">
                        <Avatar src={m.avatar} size={56} />
                        <div>
                          <div className="flex items-center gap-2">
                            <Text strong>{m.name}</Text>
                            <Tag color="blue">{m.role}</Tag>
                          </div>
                          <Text type="secondary">{m.intro || "Giới thiệu ngắn…"}</Text>
                        </div>
                      </Space>
                    </Card>
                  </Col>
                ))}
              </Row>
            </Card>

            {/* Backend Team */}
            <Card title="Nhóm Backend" className="shadow-md border-0">
              <Row gutter={[16, 16]}>
                {backendTeam.map((m, idx) => (
                  <Col key={idx} xs={24} sm={12} md={12} lg={12}>
                    <Card hoverable className="card-gradient">
                      <Space align="start" size="middle">
                        <Avatar src={m.avatar} size={56} />
                        <div>
                          <div className="flex items-center gap-2">
                            <Text strong>{m.name}</Text>
                            <Tag color="purple">{m.role}</Tag>
                          </div>
                          <Text type="secondary">{m.intro || "Giới thiệu ngắn…"}</Text>
                        </div>
                      </Space>
                    </Card>
                  </Col>
                ))}
              </Row>
            </Card>
          </div>
        </Card>
      </div>
    </div>
  );
}
