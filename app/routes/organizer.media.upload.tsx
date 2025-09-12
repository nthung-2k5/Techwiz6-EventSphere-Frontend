import { Card, Upload, Button, Typography, message, Row, Col, List, Image } from "antd";
import { UploadOutlined, PictureOutlined } from "@ant-design/icons";
import { Navigate } from "react-router";
import { useAuth } from "../context/AuthContext";
import { useState } from "react";

const { Title, Text } = Typography;

export default function OrganizerMediaUploadPage() {
  const { user } = useAuth();
  const [items, setItems] = useState<{url:string; name:string}[]>([]);

  if (!user || user.role !== "organizer") return <Navigate to="/login" replace />;

  const props = {
    multiple: true,
    beforeUpload: (file: File) => {
      const url = URL.createObjectURL(file);
      setItems(prev => [{ url, name: file.name }, ...prev]);
      message.success(`${file.name} added (demo)`);
      return false; // prevent auto upload (demo)
    },
  };

  return (
    <div className="p-6">
      <div style={{ marginBottom: 16 }}>
        <Title level={2} style={{ margin: 0 }}>Upload Media</Title>
        <Text type="secondary">Upload images/videos for your events (demo mode)</Text>
      </div>

      <Card className="shadow-lg border-0">
        <Upload {...props} listType="picture">
          <Button icon={<UploadOutlined />}>Select Files</Button>
        </Upload>
      </Card>

      <Card className="shadow-lg border-0 mt-6" title="Recent Uploads" extra={<PictureOutlined />}>
        <List
          grid={{ gutter: 16, column: 4 }}
          dataSource={items}
          renderItem={(i) => (
            <List.Item>
              <Card hoverable>
                <Image src={i.url} alt={i.name} className="w-full h-32 object-cover" />
                <div className="mt-2" style={{ whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>{i.name}</div>
              </Card>
            </List.Item>
          )}
        />
      </Card>
    </div>
  );
}
