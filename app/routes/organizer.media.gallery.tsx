import { Card, Typography, Row, Col, Image, Empty, Tag, Space } from "antd";
import { Navigate } from "react-router";
import { useAuth } from "../context/AuthContext";

const { Title, Text } = Typography;

export default function OrganizerMediaGalleryPage() {
  const { user } = useAuth();
  if (!user || user.role !== "organizer") return <Navigate to="/login" replace />;

  // Demo media items
  const mediaItems = [
    { id: 1, type: 'image', url: 'https://via.placeholder.com/600x400/1677ff/ffffff?text=Poster', name: 'poster.jpg', tags: ['poster','promo'] },
    { id: 2, type: 'image', url: 'https://via.placeholder.com/600x400/13c2c2/ffffff?text=Stage', name: 'stage.jpg', tags: ['stage'] },
    { id: 3, type: 'image', url: 'https://via.placeholder.com/600x400/52c41a/ffffff?text=Team', name: 'team.jpg', tags: ['team'] },
  ];

  return (
    <div className="p-6">
      <div className="mb-4">
        <Title level={2} style={{ margin: 0 }}>Media Gallery</Title>
        <Text type="secondary">Your uploaded images/videos (demo)</Text>
      </div>
      <Card className="shadow-lg border-0">
        {mediaItems.length === 0 ? (
          <Empty description="No media yet" />
        ) : (
          <Row gutter={[16, 16]}>
            {mediaItems.map(item => (
              <Col xs={24} sm={12} md={8} key={item.id}>
                <Card hoverable cover={<div className="h-44 bg-gray-100"><Image alt={item.name} src={item.url} className="w-full h-full object-cover" /></div>}>
                  <Space direction="vertical" size={4} className="w-full">
                    <Text className="truncate" title={item.name}>{item.name}</Text>
                    <div>
                      {item.tags.map(t => <Tag key={t} color="blue">{t}</Tag>)}
                    </div>
                  </Space>
                </Card>
              </Col>
            ))}
          </Row>
        )}
      </Card>
    </div>
  );
}
