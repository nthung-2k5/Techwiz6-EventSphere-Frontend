import { Layout, Menu, Button, Dropdown, Avatar, Space, Typography, Drawer } from "antd";
import { useState, useEffect } from "react";
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
    MenuOutlined,
    BellOutlined,
    SettingOutlined,
} from "@ant-design/icons";
import { Link, Outlet, useLocation } from "react-router";
import { useAuth } from "../context/AuthContext";
import type { MenuProps } from "antd";

const { Header, Content, Footer } = Layout;
const { Text } = Typography;

type MenuItem = Required<MenuProps>['items'][number];

export default function DashboardLayout() {
    const location = useLocation();
    const { user, logout } = useAuth();
    const [mobileDrawerOpen, setMobileDrawerOpen] = useState(false);
    const [isMobile, setIsMobile] = useState(window.innerWidth < 768);

    // Handle window resize for mobile detection
    useEffect(() => {
        const handleResize = () => {
            setIsMobile(window.innerWidth < 768);
        };
        window.addEventListener('resize', handleResize);
        return () => window.removeEventListener('resize', handleResize);
    }, []);

    let menuItems: MenuItem[] = [];

    // Define menu items based on user role
    if (!user) {
        menuItems = [
            { 
                key: "/", 
                icon: <HomeOutlined />, 
                label: <Link to="/">Home</Link> 
            },
            { 
                key: "/events", 
                icon: <CalendarOutlined />, 
                label: <Link to="/events">Events</Link> 
            },
            { 
                key: "/login", 
                icon: <LoginOutlined />, 
                label: <Link to="/login">Login</Link> 
            },
            { 
                key: "/register", 
                icon: <UserAddOutlined />, 
                label: <Link to="/register">Sign Up</Link> 
            },
        ];
    } else if (user.role === "participant") {
        menuItems = [
            { 
                key: "/dashboard", 
                icon: <DashboardOutlined />, 
                label: <Link to="/dashboard">Dashboard</Link> 
            },
            { 
                key: "/events", 
                icon: <CalendarOutlined />, 
                label: <Link to="/events">Browse Events</Link> 
            },
            { 
                key: "/checkin", 
                icon: <QrcodeOutlined />, 
                label: <Link to="/checkin">Check-in</Link> 
            },
            { 
                key: "/certificate", 
                icon: <FileDoneOutlined />, 
                label: <Link to="/certificate">Certificates</Link> 
            },
            { 
                key: "/feedback", 
                icon: <FormOutlined />, 
                label: <Link to="/feedback">Feedback</Link> 
            },
        ];
    } else if (user.role === "organizer") {
        menuItems = [
            { 
                key: "/dashboard", 
                icon: <DashboardOutlined />, 
                label: <Link to="/dashboard">Dashboard</Link> 
            },
            {
                key: "events-management",
                icon: <CalendarOutlined />,
                label: "Event Management",
                children: [
                    { 
                        key: "/event/create", 
                        icon: <PlusOutlined />, 
                        label: <Link to="/event/create">Create Event</Link> 
                    },
                    { 
                        key: "/event/submit", 
                        icon: <AppstoreOutlined />, 
                        label: <Link to="/event/submit">Submit for Approval</Link> 
                    },
                    { 
                        key: "/event/registrations", 
                        icon: <TeamOutlined />, 
                        label: <Link to="/event/registrations">Registrations</Link> 
                    },
                    { 
                        key: "/event/media", 
                        icon: <UploadOutlined />, 
                        label: <Link to="/event/media">Upload Media</Link> 
                    },
                    { 
                        key: "/event/certificates", 
                        icon: <FileDoneOutlined />, 
                        label: <Link to="/event/certificates">Certificates</Link> 
                    },
                ]
            },
        ];
    }

    // User dropdown menu
    const userMenu: MenuProps = {
        items: [
            {
                key: 'profile',
                icon: <UserOutlined />,
                label: <Link to="/profile">Profile</Link>,
            },
            {
                key: 'settings',
                icon: <SettingOutlined />,
                label: <Link to="/settings">Settings</Link>,
            },
            {
                type: 'divider' as const,
            },
            {
                key: 'logout',
                icon: <LogoutOutlined />,
                label: <span onClick={logout}>Logout</span>,
                danger: true,
            },
        ],
    };

    const renderMenu = (mode: "horizontal" | "vertical" = "horizontal") => (
        <Menu
            theme={mode === "horizontal" ? "dark" : "light"}
            mode={mode}
            selectedKeys={[location.pathname]}
            items={menuItems}
            style={{
                background: mode === "horizontal" ? "transparent" : "#fff",
                border: "none",
                fontSize: "14px",
                fontWeight: 500,
            }}
        />
    );

    const headerStyle = {
        background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
        padding: '0 24px',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        boxShadow: '0 2px 8px rgba(0,0,0,0.15)',
        position: 'sticky' as const,
        top: 0,
        zIndex: 1000,
    };

    return (
        <Layout style={{ minHeight: "100vh" }}>
            {/* Mobile Header */}
            {isMobile ? (
                <Header style={headerStyle}>
                    <div style={{ display: 'flex', alignItems: 'center' }}>
                        <Button
                            type="text"
                            icon={<MenuOutlined />}
                            onClick={() => setMobileDrawerOpen(true)}
                            style={{ color: 'white', marginRight: '16px' }}
                        />
                        <Text strong style={{ color: 'white', fontSize: '20px' }}>
                            EventSphere
                        </Text>
                    </div>
                    
                    {user && (
                        <Space>
                            <Button
                                type="text"
                                icon={<BellOutlined />}
                                style={{ color: 'white' }}
                            />
                            <Dropdown menu={userMenu} placement="bottomRight">
                                <Avatar 
                                    style={{ 
                                        backgroundColor: 'rgba(255,255,255,0.2)',
                                        cursor: 'pointer'
                                    }}
                                    icon={<UserOutlined />}
                                />
                            </Dropdown>
                        </Space>
                    )}
                </Header>
            ) : (
                /* Desktop Header */
                <Header style={headerStyle}>
                    <div style={{ display: 'flex', alignItems: 'center', flex: 1 }}>
                        <Text 
                            strong 
                            style={{ 
                                color: 'white', 
                                fontSize: '24px', 
                                marginRight: '48px',
                                fontWeight: 700
                            }}
                        >
                            EventSphere
                        </Text>
                        <div style={{ flex: 1 }}>
                            {renderMenu("horizontal")}
                        </div>
                    </div>
                    
                    {user && (
                        <Space size="middle">
                            <Button
                                type="text"
                                icon={<BellOutlined />}
                                style={{ color: 'white' }}
                            />
                            <Dropdown menu={userMenu} placement="bottomRight">
                                <Space style={{ cursor: 'pointer', color: 'white' }}>
                                    <Avatar 
                                        style={{ 
                                            backgroundColor: 'rgba(255,255,255,0.2)',
                                        }}
                                        icon={<UserOutlined />}
                                    />
                                    <Text style={{ color: 'white' }}>
                                        {user.username}
                                    </Text>
                                </Space>
                            </Dropdown>
                        </Space>
                    )}
                </Header>
            )}

            {/* Mobile Drawer */}
            <Drawer
                title="Navigation"
                placement="left"
                onClose={() => setMobileDrawerOpen(false)}
                open={mobileDrawerOpen}
                bodyStyle={{ padding: 0 }}
            >
                {renderMenu("vertical")}
            </Drawer>

            <Layout>
                <Content style={{ 
                    margin: isMobile ? '16px' : '24px 48px', 
                    padding: isMobile ? '16px' : '24px', 
                    background: '#fff',
                    borderRadius: '8px',
                    minHeight: 'calc(100vh - 140px)'
                }}>
                    <Outlet />
                </Content>
            </Layout>

            <Footer style={{ 
                textAlign: 'center', 
                background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)', 
                color: 'white',
                fontWeight: 500
            }}>
                EventSphere ©2025 — University Event Management System
            </Footer>
        </Layout>
    );
}
