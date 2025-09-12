import { Layout, Menu, Button, Dropdown, Avatar, Space, Typography, Drawer, Badge } from "antd";
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
    PictureOutlined,
    InfoCircleOutlined,
    PhoneOutlined,
    QuestionCircleOutlined,
    BarChartOutlined,
    SafetyOutlined,
    CheckCircleOutlined,
    EditOutlined,
    DeleteOutlined,
    EyeOutlined,
    MessageOutlined,
    NotificationOutlined,
    CrownOutlined,
    SecurityScanOutlined,
} from "@ant-design/icons";
import { Link, Outlet, useLocation } from "react-router";
import { useAuth } from "../context/AuthContext";
import type { MenuProps } from "antd";

const { Header, Content, Footer, Sider } = Layout;
const { Text } = Typography;

type MenuItem = Required<MenuProps>['items'][number];

export default function DashboardLayout() {
    const location = useLocation();
    const { user, logout } = useAuth();
    const [collapsed, setCollapsed] = useState(false);
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
                label: <Link to="/">Trang chủ</Link> 
            },
            {
                key: "events-public",
                icon: <CalendarOutlined />,
                label: "Events",
                children: [
                    { 
                        key: "/events", 
                        icon: <CalendarOutlined />, 
                        label: <Link to="/events">Events</Link> 
                    },
                    { 
                        key: "/media-gallery", 
                        icon: <PictureOutlined />, 
                        label: <Link to="/media-gallery">Media Gallery</Link> 
                    },
                ]
            },
            {
                key: "info",
                icon: <InfoCircleOutlined />,
                label: "Info",
                children: [
                    { 
                        key: "/about", 
                        icon: <InfoCircleOutlined />, 
                        label: <Link to="/about">About</Link> 
                    },
                    { 
                        key: "/contact", 
                        icon: <PhoneOutlined />, 
                        label: <Link to="/contact">Contact</Link> 
                    },
                    { 
                        key: "/faq", 
                        icon: <QuestionCircleOutlined />, 
                        label: <Link to="/faq">FAQ</Link> 
                    },
                ]
            },
            { 
                key: "/login", 
                icon: <LoginOutlined />, 
                label: <Link to="/login">Đăng nhập</Link> 
            },
            { 
                key: "/register", 
                icon: <UserAddOutlined />, 
                label: <Link to="/register">Register</Link> 
            },
        ];
    } else if (user.role === "participant") {
        menuItems = [
            { 
                key: "/", 
                icon: <HomeOutlined />, 
                label: <Link to="/">Home</Link> 
            },
            {
                key: "events-group",
                icon: <AppstoreOutlined />,
                label: "Events",
                children: [
                    { 
                        key: "/events", 
                        icon: <CalendarOutlined />, 
                        label: <Link to="/events">Events</Link> 
                    },
                    { 
                        key: "/checkin", 
                        icon: <QrcodeOutlined />, 
                        label: <Link to="/checkin">QR Check-in</Link> 
                    },
                    { 
                        key: "/certificate", 
                        icon: <FileDoneOutlined />, 
                        label: <Link to="/certificate">Certificates</Link> 
                    },
                    { 
                        key: "/media-gallery", 
                        icon: <PictureOutlined />, 
                        label: <Link to="/media-gallery">Media Gallery</Link> 
                    },
                ]
            },
            {
                key: "about-me",
                icon: <UserOutlined />,
                label: "About Me",
                children: [
                    { 
                        key: "/about", 
                        icon: <InfoCircleOutlined />, 
                        label: <Link to="/about">About</Link> 
                    },
                    { 
                        key: "/contact", 
                        icon: <PhoneOutlined />, 
                        label: <Link to="/contact">Contact</Link> 
                    },
                    { 
                        key: "/feedback", 
                        icon: <FormOutlined />, 
                        label: <Link to="/feedback">Feedback</Link> 
                    },
                ]
            },
        ];
    } else if (user.role === "organizer") {
        menuItems = [
            { 
                key: "/", 
                icon: <HomeOutlined />, 
                label: <Link to="/">Trang chủ</Link> 
            },
            { 
                key: "/organizer/dashboard", 
                icon: <DashboardOutlined />, 
                label: <Link to="/organizer/dashboard">Dashboard</Link> 
            },
            {
                key: "events-management",
                icon: <CalendarOutlined />,
                label: "Quản lý sự kiện",
                children: [
                    { 
                        key: "/organizer/events", 
                        icon: <EyeOutlined />, 
                        label: <Link to="/organizer/events">Event Overview</Link> 
                    },
                    { 
                        key: "/organizer/event/create", 
                        icon: <PlusOutlined />, 
                        label: <Link to="/organizer/event/create">Create Event</Link> 
                    },
                    { 
                        key: "/organizer/event/edit", 
                        icon: <EditOutlined />, 
                        label: <Link to="/organizer/event/edit">Edit Event</Link> 
                    },
                    { 
                        key: "/organizer/registrations", 
                        icon: <TeamOutlined />, 
                        label: <Link to="/organizer/registrations">Registrations</Link> 
                    },
                ]
            },
            {
                key: "media-management",
                icon: <PictureOutlined />,
                label: "Media Management",
                children: [
                    { 
                        key: "/organizer/media/upload", 
                        icon: <UploadOutlined />, 
                        label: <Link to="/organizer/media/upload">Upload Media</Link> 
                    },
                    { 
                        key: "/organizer/media/gallery", 
                        icon: <PictureOutlined />, 
                        label: <Link to="/organizer/media/gallery">Gallery</Link> 
                    },
                ]
            },
            { 
                key: "/organizer/certificates", 
                icon: <FileDoneOutlined />, 
                label: <Link to="/organizer/certificates">Certificates</Link> 
            },
            { 
                key: "/organizer/notifications", 
                icon: <NotificationOutlined />, 
                label: <Link to="/organizer/notifications">Notifications</Link> 
            },
            { 
                key: "/organizer/statistics", 
                icon: <BarChartOutlined />, 
                label: <Link to="/organizer/statistics">Analytics</Link> 
            },
        ];
    } else if (user.role === "admin") {
        menuItems = [
            { 
                key: "/", 
                icon: <HomeOutlined />, 
                label: <Link to="/">Trang chủ</Link> 
            },
            { 
                key: "/admin", 
                icon: <CrownOutlined />, 
                label: <Link to="/admin">Admin Dashboard</Link> 
            },
            { 
                key: "/admin/users", 
                icon: <UserOutlined />, 
                label: <Link to="/admin/users">User Management</Link> 
            },
            { 
                key: "/admin/events", 
                icon: <CalendarOutlined />, 
                label: <Link to="/admin/events">Event Management</Link> 
            },
            {
                key: "content-moderation",
                icon: <SecurityScanOutlined />,
                label: "Content Moderation",
                children: [
                    { 
                        key: "/admin/content/descriptions", 
                        icon: <EditOutlined />, 
                        label: <Link to="/admin/content/descriptions">Event Descriptions</Link> 
                    },
                    { 
                        key: "/admin/content/feedback", 
                        icon: <MessageOutlined />, 
                        label: <Link to="/admin/content/feedback">Feedback</Link> 
                    },
                    { 
                        key: "/admin/content/media", 
                        icon: <PictureOutlined />, 
                        label: <Link to="/admin/content/media">Media</Link> 
                    },
                ]
            },
            { 
                key: "/admin/notifications", 
                icon: <NotificationOutlined />, 
                label: <Link to="/admin/notifications">System Notifications</Link> 
            },
            { 
                key: "/admin/statistics", 
                icon: <BarChartOutlined />, 
                label: <Link to="/admin/statistics">Overview Analytics</Link> 
            },
        ];
    }

    // User dropdown menu
    const dashboardPath = user
        ? (user.role === 'admin' ? '/admin' : user.role === 'organizer' ? '/organizer/dashboard' : '/dashboard')
        : '/dashboard';

    const userMenu: MenuProps = {
        items: [
            {
                key: 'dashboard',
                icon: <DashboardOutlined />,
                label: <Link to={dashboardPath}>Dashboard</Link>,
            },
            {
                key: 'profile',
                icon: <UserOutlined />,
                label: <Link to="/profile">Hồ sơ cá nhân</Link>,
            },
            {
                type: 'divider' as const,
            },
            {
                key: 'logout',
                icon: <LogoutOutlined />,
                label: <span onClick={logout}>Đăng xuất</span>,
                danger: true,
            },
        ],
    };

    const renderSidebarMenu = () => (
        <Menu
            theme="light"
            mode="inline"
            selectedKeys={[location.pathname]}
            items={menuItems}
            style={{
                background: "transparent",
                border: "none",
                fontSize: "14px",
                fontWeight: 500,
            }}
        />
    );

    // Top horizontal menu in header
    const renderTopMenu = () => {
        // For guests: split into left (navigation) and right (auth) menus
        if (!user) {
            const leftItems = menuItems.filter((it: any) => !['/login', '/register'].includes(it?.key));
            const rightItems = menuItems.filter((it: any) => ['/login', '/register'].includes(it?.key));
            return (
                <div style={{ display: 'flex', alignItems: 'center', gap: 12, flex: 1, minWidth: 0 }}>
                    <Menu
                        mode="horizontal"
                        selectedKeys={[location.pathname]}
                        items={leftItems as any}
                        className="top-menu"
                        style={{
                            background: 'transparent',
                            borderBottom: 'none',
                            flex: 1,
                            minWidth: 0,
                        }}
                    />
                    <Space style={{ marginLeft: 'auto' }}>
                        <Link to="/login">
                            <Button type="text" icon={<LoginOutlined />} style={{ color: 'white' }}>
                                Login
                            </Button>
                        </Link>
                        <Link to="/register">
                            <Button icon={<UserAddOutlined />} className="bg-white text-blue-600 font-semibold" style={{ border: 'none' }}>
                                Register
                            </Button>
                        </Link>
                    </Space>
                </div>
            );
        }

        // For logged-in users: single unified menu
        return (
            <Menu
                mode="horizontal"
                selectedKeys={[location.pathname]}
                items={menuItems}
                className="top-menu"
                style={{
                    background: 'transparent',
                    borderBottom: 'none',
                    flex: 1,
                    minWidth: 0,
                }}
            />
        );
    };

    const headerStyle = {
        background: 'linear-gradient(135deg, #00afef 0%, #0099d4 50%, #007bb8 100%)',
        padding: '0 24px',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        boxShadow: '0 4px 20px rgba(0, 175, 239, 0.3)',
        position: 'sticky' as const,
        top: 0,
        zIndex: 1000,
        height: '64px',
    };

    const siderStyle = {
        background: 'linear-gradient(180deg, rgba(255,255,255,0.95) 0%, rgba(248,250,252,0.95) 100%)',
        backdropFilter: 'blur(16px)',
        borderRight: '1px solid rgba(0, 175, 239, 0.1)',
        boxShadow: '4px 0 20px rgba(0, 175, 239, 0.1)',
    };

    return (
        <Layout style={{ minHeight: "100vh" }}>
            {/* Header */}
            <Header style={headerStyle}>
                <div style={{ display: 'flex', alignItems: 'center', gap: 12, flex: 1 }}>
                    {!isMobile && user && user.role !== 'participant' && (
                        <Button
                            type="text"
                            icon={collapsed ? <MenuOutlined /> : <MenuOutlined />}
                            onClick={() => setCollapsed(!collapsed)}
                            style={{ 
                                color: 'white', 
                                marginRight: '16px',
                                fontSize: '16px'
                            }}
                        />
                    )}
                    {isMobile && (
                        <Button
                            type="text"
                            icon={<MenuOutlined />}
                            onClick={() => setMobileDrawerOpen(true)}
                            style={{ color: 'white', marginRight: '16px' }}
                        />
                    )}
                    <Text 
                        strong 
                        style={{ 
                            color: 'white', 
                            fontSize: isMobile ? '20px' : '24px',
                            fontWeight: 700,
                            fontFamily: 'Poppins',
                            textShadow: '0 2px 4px rgba(0,0,0,0.2)',
                        }}
                    >
                        EventSphere
                    </Text>
                    {/* Top menu for participant and guests on desktop */}
                    {!isMobile && (user?.role === 'participant' || !user) && renderTopMenu()}
                </div>
                
                {user && (
                    <Space size="middle" align="center">
                        <Badge count={3} size="small">
                            <Button
                                type="text"
                                icon={<BellOutlined />}
                                style={{ color: 'white', fontSize: '16px' }}
                            />
                        </Badge>
                        {!isMobile && (
                            <Text style={{ color: 'white', opacity: 0.9, fontWeight: 600 }}>
                                {user.role === 'admin' ? 'Admin' : user.role === 'organizer' ? 'Organizer' : 'Student'}
                            </Text>
                        )}
                        <Dropdown menu={userMenu} placement="bottomRight">
                            <Space style={{ cursor: 'pointer', color: 'white' }}>
                                <Avatar 
                                    src={user.avatar}
                                    style={{ 
                                        backgroundColor: 'rgba(255,255,255,0.2)',
                                    }}
                                    icon={<UserOutlined />}
                                />
                                {!isMobile && (
                                    <div style={{ textAlign: 'left' }}>
                                        <div style={{ color: 'white', fontSize: '14px', fontWeight: 600 }}>
                                            {user.fullName || user.username}
                                        </div>
                                    </div>
                                )}
                            </Space>
                        </Dropdown>
                    </Space>
                )}
            </Header>

            <Layout>
                {/* Desktop Sidebar (hidden for participants and guests) */}
                {!isMobile && user && user.role !== 'participant' && (
                    <Sider 
                        collapsible 
                        collapsed={collapsed} 
                        onCollapse={setCollapsed}
                        width={280}
                        collapsedWidth={80}
                        style={siderStyle}
                        trigger={null}
                    >
                        <div style={{ 
                            padding: '20px 16px',
                            borderBottom: '1px solid rgba(0, 175, 239, 0.1)',
                            textAlign: collapsed ? 'center' : 'left'
                        }}>
                            {!collapsed && user && (
                                <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                                    <Avatar 
                                        size={48}
                                        src={user.avatar}
                                        style={{ backgroundColor: '#00afef' }}
                                        icon={<UserOutlined />}
                                    />
                                    <div>
                                        <div style={{ fontWeight: 600, color: '#1f2937', fontSize: '14px' }}>
                                            {user.fullName || user.username}
                                        </div>
                                        <div style={{ color: '#6b7280', fontSize: '12px' }}>
                                            {user.department}
                                        </div>
                                    </div>
                                </div>
                            )}
                            {collapsed && user && (
                                <Avatar 
                                    size={40}
                                    src={user.avatar}
                                    style={{ backgroundColor: '#00afef' }}
                                    icon={<UserOutlined />}
                                />
                            )}
                        </div>
                        <div style={{ padding: '16px 0' }}>
                            {renderSidebarMenu()}
                        </div>
                    </Sider>
                )}

                {/* Mobile Drawer */}
                <Drawer
                    title={
                        <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                            <Avatar 
                                src={user?.avatar}
                                style={{ backgroundColor: '#00afef' }}
                                icon={<UserOutlined />}
                            />
                            {user && (
                                <div>
                                    <div style={{ fontWeight: 600, fontSize: '14px' }}>
                                        {user.fullName || user.username}
                                    </div>
                                    <div style={{ color: '#6b7280', fontSize: '12px' }}>
                                        {user.department}
                                    </div>
                                </div>
                            )}
                        </div>
                    }
                    placement="left"
                    onClose={() => setMobileDrawerOpen(false)}
                    open={mobileDrawerOpen}
                    bodyStyle={{ padding: 0 }}
                    width={280}
                >
                    {renderSidebarMenu()}
                </Drawer>

                <Content style={{ 
                    margin: isMobile ? '16px' : '24px', 
                    padding: isMobile ? '16px' : '24px', 
                    background: 'linear-gradient(135deg, rgba(255,255,255,0.95) 0%, rgba(248,250,252,0.95) 100%)',
                    backdropFilter: 'blur(16px)',
                    borderRadius: '16px',
                    minHeight: 'calc(100vh - 112px)',
                    boxShadow: '0 8px 32px rgba(0, 175, 239, 0.1)',
                    border: '1px solid rgba(255,255,255,0.2)',
                    overflow: 'auto'
                }}>
                    <Outlet />
                </Content>
            </Layout>

            <Footer style={{ 
                textAlign: 'center', 
                background: 'linear-gradient(135deg, #00afef 0%, #0099d4 50%, #007bb8 100%)', 
                color: 'white',
                fontWeight: 600,
                fontSize: '14px',
                padding: '16px 24px',
                boxShadow: '0 -4px 20px rgba(0, 175, 239, 0.2)'
            }}>
                <Text style={{ color: 'white', fontFamily: 'Poppins' }}>
                    EventSphere ©2025 — University Event Management System
                </Text>
            </Footer>
        </Layout>
    );
}
