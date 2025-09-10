import { Layout, Menu } from "antd";
import {
  HomeOutlined,
  CalendarOutlined,
  LoginOutlined,
  UserAddOutlined,
  DashboardOutlined,
  QrcodeOutlined,
  FileDoneOutlined,
  FormOutlined,
  PlusOutlined,
  UploadOutlined,
  TeamOutlined,
  AppstoreOutlined,
  LogoutOutlined,
  UserOutlined,
} from "@ant-design/icons";
import { Link, Outlet, useLocation } from "react-router";
import { useAuth } from "../context/AuthContext"; 
const { Header, Content, Footer } = Layout;

export default function DashboardLayout() {
  const location = useLocation();
  const { user, logout } = useAuth(); 

  let menuItems: any[] = [];

  if (!user) {

    menuItems = [
      { key: "/", icon: <HomeOutlined />, label: <Link to="/">Home</Link> },
      { key: "/events", icon: <CalendarOutlined />, label: <Link to="/events">Events</Link> },
      { key: "/login", icon: <LoginOutlined />, label: <Link to="/login">Login</Link> },
      { key: "/register", icon: <UserAddOutlined />, label: <Link to="/register">Signup</Link> },
    ];
  } else if (user.role === "participant") {
    
    menuItems = [
      { key: "/dashboard", icon: <DashboardOutlined />, label: <Link to="/dashboard">Dashboard</Link> },
      { key: "/events", icon: <CalendarOutlined />, label: <Link to="/events">Register Event</Link> },
      { key: "/checkin", icon: <QrcodeOutlined />, label: <Link to="/checkin">Check-in QR</Link> },
      { key: "/certificate", icon: <FileDoneOutlined />, label: <Link to="/certificate">Certificates</Link> },
      { key: "/feedback", icon: <FormOutlined />, label: <Link to="/feedback">Feedback</Link> },
      { key: "/profile", icon: <UserOutlined />, label: <Link to="/profile">Profile</Link> },
      { key: "/logout", icon: <LogoutOutlined />, label: <span onClick={logout}>Logout</span> },
    ];
  } else if (user.role === "organizer") {
    
    menuItems = [
      { key: "/dashboard", icon: <DashboardOutlined />, label: <Link to="/dashboard">Organizer Dashboard</Link> },
      { key: "/event/create", icon: <PlusOutlined />, label: <Link to="/event/create">Create Event</Link> },
      { key: "/event/submit", icon: <AppstoreOutlined />, label: <Link to="/event/submit">Submit for Approval</Link> },
      { key: "/event/registrations", icon: <TeamOutlined />, label: <Link to="/event/registrations">Registrations</Link> },
      { key: "/event/media", icon: <UploadOutlined />, label: <Link to="/event/media">Upload Media</Link> },
      { key: "/event/certificates", icon: <FileDoneOutlined />, label: <Link to="/event/certificates">Certificates</Link> },
      { key: "/profile", icon: <UserOutlined />, label: <Link to="/profile">Profile</Link> },
      { key: "/logout", icon: <LogoutOutlined />, label: <span onClick={logout}>Logout</span> },
    ];
  }

  return (
    <Layout style={{ minHeight: "100vh" }}>
      <Header style={{ background: "#1890ff", padding: 0 }}>
        <div
          style={{
            float: "left",
            color: "white",
            fontWeight: "bold",
            fontSize: 20,
            padding: "0 24px",
            lineHeight: "64px",
          }}
        >
          EventSphere
        </div>
        <Menu
          theme="dark"
          mode="horizontal"
          selectedKeys={[location.pathname]}
          items={menuItems}
          style={{
            background: "#1890ff",
            color: "white",
            fontWeight: 500,
          }}
        />
      </Header>

      <Content style={{ margin: "24px 48px", padding: 24, background: "#fff" }}>
        <Outlet />
      </Content>

      <Footer style={{ textAlign: "center", background: "#1890ff", color: "white" }}>
        EventSphere ©2025 — University Event Management System
      </Footer>
    </Layout>
  );
}
