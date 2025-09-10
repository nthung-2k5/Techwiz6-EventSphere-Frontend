import { Card, Descriptions, Button, message } from "antd";
import { useAuth } from "../context/AuthContext";
import { useNavigate } from "react-router";

export default function ProfilePage() {
    const { user, logout } = useAuth();
    const navigate = useNavigate();

    if (!user) {
        return <h2>You must login to view your profile.</h2>;
    }

    const handleLogout = () => {
        logout();
        message.success("Logged out successfully!");
        navigate("/");
    };

    return (
        <Card title="My Profile" style={{ maxWidth: 600, margin: "2rem auto" }}>
            <Descriptions bordered column={1}>
                <Descriptions.Item label="Username">{user.username}</Descriptions.Item>
                <Descriptions.Item label="Role">
                    {user.role.charAt(0).toUpperCase() + user.role.slice(1)}
                </Descriptions.Item>
            </Descriptions>
            <div style={{ marginTop: 16, textAlign: "right" }}>
                <Button danger onClick={handleLogout}>
                    Logout
                </Button>
            </div>
        </Card>
    );
}
