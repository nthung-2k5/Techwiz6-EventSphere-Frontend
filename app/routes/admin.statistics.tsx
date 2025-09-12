import { Card, Typography } from "antd";
import { Navigate } from "react-router";
import { useAuth } from "../context/AuthContext";

const { Title, Text } = Typography;

export default function AdminStatisticsPage() {
  const { user } = useAuth();
  if (!user || user.role !== "admin") return <Navigate to="/login" replace />;

  return (
    <div className="p-6">
      <Card className="shadow-lg border-0">
        <Title level={2}>Statistics</Title>
        <Text type="secondary">System overview and charts.</Text>
      </Card>
    </div>
  );
}
