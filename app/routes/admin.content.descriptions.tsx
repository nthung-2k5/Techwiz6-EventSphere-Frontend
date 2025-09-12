import { Card, Typography, List, Tag } from "antd";
import { Navigate } from "react-router";
import { useAuth } from "../context/AuthContext";
import { EditOutlined } from "@ant-design/icons";

const { Title } = Typography;

export default function AdminContentDescriptionsPage() {
  const { user } = useAuth();
  if (!user || user.role !== "admin") return <Navigate to="/login" replace />;

  const items = [
    { title: 'AI Workshop - Needs Review', status: 'pending' },
    { title: 'Music Festival - Approved', status: 'approved' },
  ];

  return (
    <div className="p-6">
      <div style={{ marginBottom: 16 }}>
        <Title level={2} style={{ margin: 0 }}>Event Descriptions</Title>
      </div>
      <Card title="Descriptions" extra={<EditOutlined />} className="shadow-lg border-0">
        <List
          dataSource={items}
          renderItem={item => (
            <List.Item>
              <List.Item.Meta title={item.title} />
              <Tag color={item.status === 'pending' ? 'orange' : 'green'}>
                {item.status === 'pending' ? 'Pending' : 'Approved'}
              </Tag>
            </List.Item>
          )}
        />
      </Card>
    </div>
  );
}
