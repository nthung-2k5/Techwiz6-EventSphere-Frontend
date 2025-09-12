import { Card, Typography, List, Tag } from "antd";
import { Navigate } from "react-router";
import { useAuth } from "../context/AuthContext";
import { MessageOutlined } from "@ant-design/icons";

const { Title } = Typography;

export default function AdminContentFeedbackPage() {
  const { user } = useAuth();
  if (!user || user.role !== "admin") return <Navigate to="/login" replace />;

  const items = [
    { title: 'Positive feedback about workshop', status: 'approved' },
    { title: 'Report of inappropriate content', status: 'pending' },
  ];

  return (
    <div className="p-6">
      <div style={{ marginBottom: 16 }}>
        <Title level={2} style={{ margin: 0 }}>User Feedback</Title>
      </div>
      <Card title="Feedback" extra={<MessageOutlined />} className="shadow-lg border-0">
        <List
          dataSource={items}
          renderItem={item => (
            <List.Item>
              <List.Item.Meta title={item.title} />
              <Tag color={item.status === 'pending' ? 'red' : 'green'}>
                {item.status === 'pending' ? 'Needs Action' : 'Approved'}
              </Tag>
            </List.Item>
          )}
        />
      </Card>
    </div>
  );
}
