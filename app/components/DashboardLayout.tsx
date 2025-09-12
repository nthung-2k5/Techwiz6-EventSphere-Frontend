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
                key: "/events", 
                icon: <CalendarOutlined />, 
                label: <Link to="/events">Danh sách sự kiện</Link> 
            },
            { 
                key: "/media-gallery", 
                icon: <PictureOutlined />, 
                label: <Link to="/event.media">Thư viện phương tiện</Link> 
            },
            {
                key: "info",
                icon: <InfoCircleOutlined />,
                label: "Thông tin",
                children: [
                    { 
                        key: "/about", 
                        icon: <InfoCircleOutlined />, 
                        label: <Link to="/about">Giới thiệu</Link> 
                    },
                    { 
                        key: "/contact", 
                        icon: <PhoneOutlined />, 
                        label: <Link to="/contact">Liên hệ</Link> 
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
                label: <Link to="/register">Đăng ký</Link> 
            },
        ];
    } else if (user.role === "participant") {
        menuItems = [
            { 
                key: "/", 
                icon: <HomeOutlined />, 
                label: <Link to="/">Trang chủ</Link> 
            },
            { 
                key: "/dashboard", 
                icon: <DashboardOutlined />, 
                label: <Link to="/dashboard">Bảng điều khiển</Link> 
            },
            { 
                key: "/events", 
                icon: <CalendarOutlined />, 
                label: <Link to="/events">Danh sách sự kiện</Link> 
            },
            { 
                key: "/checkin", 
                icon: <QrcodeOutlined />, 
                label: <Link to="/checkin">Check-in QR</Link> 
            },
            { 
                key: "/certificates", 
                icon: <FileDoneOutlined />, 
                label: <Link to="/certificates">Chứng chỉ</Link> 
            },
            { 
                key: "/feedback", 
                icon: <FormOutlined />, 
                label: <Link to="/feedback">Đánh giá</Link> 
            },
            { 
                key: "/media-gallery", 
                icon: <PictureOutlined />, 
                label: <Link to="/event.media">Thư viện phương tiện</Link> 
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
                label: <Link to="/organizer/dashboard">Bảng điều khiển</Link> 
            },
            {
                key: "events-management",
                icon: <CalendarOutlined />,
                label: "Quản lý sự kiện",
                children: [
                    { 
                        key: "/organizer/events", 
                        icon: <EyeOutlined />, 
                        label: <Link to="/organizer/events">Tổng quan sự kiện</Link> 
                    },
                    { 
                        key: "/organizer/event/create", 
                        icon: <PlusOutlined />, 
                        label: <Link to="/organizer/event/create">Tạo sự kiện</Link> 
                    },
                    { 
                        key: "/organizer/event/edit", 
                        icon: <EditOutlined />, 
                        label: <Link to="/organizer/event/edit">Chỉnh sửa sự kiện</Link> 
                    },
                    { 
                        key: "/organizer/registrations", 
                        icon: <TeamOutlined />, 
                        label: <Link to="/organizer/registrations">Quản lý đăng ký</Link> 
                    },
                ]
            },
            {
                key: "media-management",
                icon: <PictureOutlined />,
                label: "Quản lý phương tiện",
                children: [
                    { 
                        key: "/organizer/media/upload", 
                        icon: <UploadOutlined />, 
                        label: <Link to="/organizer/media/upload">Tải lên phương tiện</Link> 
                    },
                    { 
                        key: "/organizer/media/gallery", 
                        icon: <PictureOutlined />, 
                        label: <Link to="/organizer/media/gallery">Thư viện</Link> 
                    },
                ]
            },
            { 
                key: "/organizer/certificates", 
                icon: <FileDoneOutlined />, 
                label: <Link to="/organizer/certificates">Quản lý chứng chỉ</Link> 
            },
            { 
                key: "/organizer/notifications", 
                icon: <NotificationOutlined />, 
                label: <Link to="/organizer/notifications">Gửi thông báo</Link> 
            },
            { 
                key: "/organizer/statistics", 
                icon: <BarChartOutlined />, 
                label: <Link to="/organizer/statistics">Thống kê</Link> 
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
                label: <Link to="/admin">Bảng điều khiển Admin</Link> 
            },
            {
                key: "user-management",
                icon: <UserOutlined />,
                label: "Quản lý người dùng",
                children: [
                    { 
                        key: "/admin/users", 
                        icon: <TeamOutlined />, 
                        label: <Link to="/admin/users">Danh sách người dùng</Link> 
                    },
                    { 
                        key: "/admin/users/roles", 
                        icon: <SafetyOutlined />, 
                        label: <Link to="/admin/users/roles">Quản lý vai trò</Link> 
                    },
                    { 
                        key: "/admin/users/status", 
                        icon: <CheckCircleOutlined />, 
                        label: <Link to="/admin/users/status">Trạng thái tài khoản</Link> 
                    },
                ]
            },
            {
                key: "event-management",
                icon: <CalendarOutlined />,
                label: "Quản lý sự kiện",
                children: [
                    { 
                        key: "/admin/events", 
                        icon: <EyeOutlined />, 
                        label: <Link to="/admin/events">Tất cả sự kiện</Link> 
                    },
                    { 
                        key: "/admin/events/approval", 
                        icon: <CheckCircleOutlined />, 
                        label: <Link to="/admin/events/approval">Duyệt sự kiện</Link> 
                    },
                    { 
                        key: "/admin/events/rejected", 
                        icon: <DeleteOutlined />, 
                        label: <Link to="/admin/events/rejected">Sự kiện bị từ chối</Link> 
                    },
                ]
            },
            {
                key: "content-moderation",
                icon: <SecurityScanOutlined />,
                label: "Kiểm duyệt nội dung",
                children: [
                    { 
                        key: "/admin/content/descriptions", 
                        icon: <EditOutlined />, 
                        label: <Link to="/admin/content/descriptions">Mô tả sự kiện</Link> 
                    },
                    { 
                        key: "/admin/content/feedback", 
                        icon: <MessageOutlined />, 
                        label: <Link to="/admin/content/feedback">Phản hồi</Link> 
                    },
                    { 
                        key: "/admin/content/media", 
                        icon: <PictureOutlined />, 
                        label: <Link to="/admin/content/media">Phương tiện</Link> 
                    },
                ]
            },
            { 
                key: "/admin/notifications", 
                icon: <NotificationOutlined />, 
                label: <Link to="/admin/notifications">Thông báo hệ thống</Link> 
            },
            { 
                key: "/admin/statistics", 
                icon: <BarChartOutlined />, 
                label: <Link to="/admin/statistics">Thống kê tổng quan</Link> 
            },
        ];
    }

    // User dropdown menu
    const userMenu: MenuProps = {
        items: [
            {
                key: 'profile',
                icon: <UserOutlined />,
                label: <Link to="/profile">Hồ sơ cá nhân</Link>,
            },
            {
                key: 'settings',
                icon: <SettingOutlined />,
                label: <Link to="/settings">Cài đặt</Link>,
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
                <div style={{ display: 'flex', alignItems: 'center' }}>
                    {!isMobile && (
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
                </div>
                
                {user && (
                    <Space size="middle">
                        <Badge count={3} size="small">
                            <Button
                                type="text"
                                icon={<BellOutlined />}
                                style={{ color: 'white', fontSize: '16px' }}
                            />
                        </Badge>
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
                                        <div style={{ color: 'rgba(255,255,255,0.8)', fontSize: '12px' }}>
                                            {user.role === 'admin' ? 'Quản trị viên' : 
                                             user.role === 'organizer' ? 'Người tổ chức' : 'Sinh viên'}
                                        </div>
                                    </div>
                                )}
                            </Space>
                        </Dropdown>
                    </Space>
                )}
            </Header>

            <Layout>
                {/* Desktop Sidebar */}
                {!isMobile && (
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
                    EventSphere ©2025 — Hệ thống quản lý sự kiện trường đại học
                </Text>
            </Footer>
        </Layout>
    );
}
