import { Card, Typography, Row, Col, Image, Empty, Tag, Space, Select, Input, Pagination, Button } from "antd";
import { PictureOutlined, VideoCameraOutlined, ArrowLeftOutlined } from "@ant-design/icons";
import { useEvents } from "../context/EventContext";
import { useAuth } from "../context/AuthContext";
import { useNavigate } from "react-router";
import { useMemo, useState } from "react";

const { Title, Text } = Typography;
const { Option } = Select;

interface MediaItem {
  id: number;
  eventId: number;
  eventTitle: string;
  fileName: string;
  fileType: "image" | "video";
  uploadDate: string;
  url: string;
  thumbnail?: string;
  tags: string[];
}

export default function MediaGalleryPage() {
  const navigate = useNavigate();
  const { user } = useAuth();
  const { events } = useEvents();

  // Mock public media data — replace with API call later
  const [mediaItems] = useState<MediaItem[]>([
    {
      id: 1,
      eventId: 1,
      eventTitle: "AI & Machine Learning Workshop",
      fileName: "workshop-session-1.jpg",
      fileType: "image",
      uploadDate: "2024-01-15",
      url: "https://via.placeholder.com/600x400/1890ff/ffffff?text=Workshop+Session",
      tags: ["workshop", "learning", "coding"],
    },
    {
      id: 2,
      eventId: 1,
      eventTitle: "AI & Machine Learning Workshop",
      fileName: "group-photo.jpg",
      fileType: "image",
      uploadDate: "2024-01-15",
      url: "https://via.placeholder.com/600x400/52c41a/ffffff?text=Group+Photo",
      tags: ["group", "certificates", "completion"],
    },
    {
      id: 3,
      eventId: 2,
      eventTitle: "Cultural Night 2025",
      fileName: "dance-performance.mp4",
      fileType: "video",
      uploadDate: "2024-01-10",
      url: "https://via.placeholder.com/600x400/722ed1/ffffff?text=Dance+Video",
      thumbnail: "https://via.placeholder.com/600x400/722ed1/ffffff?text=Dance+Thumb",
      tags: ["dance", "cultural"],
    },
    {
      id: 4,
      eventId: 3,
      eventTitle: "Startup Pitch Competition",
      fileName: "pitch-presentation.jpg",
      fileType: "image",
      uploadDate: "2024-01-08",
      url: "https://via.placeholder.com/600x400/f5222d/ffffff?text=Pitch+Stage",
      tags: ["startup", "pitch"],
    },
  ]);

  const [query, setQuery] = useState("");
  const [type, setType] = useState<"all" | "image" | "video">("all");
  const [eventId, setEventId] = useState<number | "all">("all");
  const [currentPage, setCurrentPage] = useState(1);
  const pageSize = 12;

  const filtered = useMemo(() => {
    return mediaItems.filter((m) => {
      const byType = type === "all" ? true : m.fileType === type;
      const byEvent = eventId === "all" ? true : m.eventId === eventId;
      const byQuery = query
        ? m.fileName.toLowerCase().includes(query.toLowerCase()) ||
          m.tags.some((t) => t.toLowerCase().includes(query.toLowerCase()))
        : true;
      return byType && byEvent && byQuery;
    });
  }, [mediaItems, type, eventId, query]);

  const paginated = useMemo(() => {
    const start = (currentPage - 1) * pageSize;
    return filtered.slice(start, start + pageSize);
  }, [filtered, currentPage]);

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-purple-50 to-pink-50 p-4 lg:p-8">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <Button icon={<ArrowLeftOutlined />} onClick={() => navigate("/dashboard")} className="mb-4 hover:bg-blue-50">
            Back to Dashboard
          </Button>
          <Card className="shadow-lg border-0 overflow-hidden">
            <div className="bg-gradient-to-r from-blue-500 to-purple-600 -m-6 mb-6 p-8 text-white">
              <div className="flex items-center gap-4">
                <div className="bg-white/20 p-3 rounded-lg">
                  <PictureOutlined className="text-2xl" />
                </div>
                <div>
                  <Title level={2} className="text-white mb-1">
                    Media Gallery
                  </Title>
                  <Text className="text-white/90">Browse photos and videos from campus events</Text>
                </div>
              </div>
            </div>

            {/* Filters */}
            <div className="px-6 pb-6">
              <Row gutter={[16, 16]}>
                <Col xs={24} sm={12} md={8}>
                  <Input.Search placeholder="Search by name or tag" allowClear onSearch={setQuery} onChange={(e) => setQuery(e.target.value)} />
                </Col>
                <Col xs={24} sm={12} md={8}>
                  <Select value={type} onChange={(v) => setType(v)} className="w-full">
                    <Option value="all">All types</Option>
                    <Option value="image">Images</Option>
                    <Option value="video">Videos</Option>
                  </Select>
                </Col>
                <Col xs={24} sm={12} md={8}>
                  <Select value={eventId} onChange={(v) => setEventId(v)} className="w-full" placeholder="Select event">
                    <Option value="all">All events</Option>
                    {events.map((e) => (
                      <Option key={e.id} value={e.id}>
                        {e.title}
                      </Option>
                    ))}
                  </Select>
                </Col>
              </Row>
            </div>
          </Card>
        </div>

        {/* Gallery */}
        <Card className="shadow-lg border-0">
          {filtered.length === 0 ? (
            <Empty description="No media found" image={Empty.PRESENTED_IMAGE_SIMPLE} />
          ) : (
            <>
              <Row gutter={[16, 16]}>
                {paginated.map((item) => (
                  <Col xs={24} sm={12} md={8} lg={6} key={item.id}>
                    <Card
                      hoverable
                      className="overflow-hidden"
                      cover={
                        <div className="relative h-44 bg-gray-100">
                          {item.fileType === "image" ? (
                            <Image alt={item.fileName} src={item.url} className="w-full h-full object-cover" />
                          ) : (
                            <div className="w-full h-full flex items-center justify-center bg-gray-200 relative">
                              <VideoCameraOutlined className="text-3xl text-gray-500" />
                              <div className="absolute bottom-2 right-2 bg-black/60 text-white px-2 py-1 rounded text-xs">VIDEO</div>
                            </div>
                          )}
                        </div>
                      }
                    >
                      <Space direction="vertical" size={4} className="w-full">
                        <Text className="truncate" title={item.fileName}>
                          {item.fileName}
                        </Text>
                        <Text type="secondary" className="text-xs">
                          {item.eventTitle} • {item.uploadDate}
                        </Text>
                        <div>
                          {item.tags.map((t) => (
                            <Tag key={t} color="blue">
                              {t}
                            </Tag>
                          ))}
                        </div>
                      </Space>
                    </Card>
                  </Col>
                ))}
              </Row>

              {filtered.length > pageSize && (
                <div className="text-center mt-6">
                  <Pagination current={currentPage} total={filtered.length} pageSize={pageSize} onChange={setCurrentPage} showSizeChanger={false} />
                </div>
              )}
            </>
          )}
        </Card>
      </div>
    </div>
  );
}
