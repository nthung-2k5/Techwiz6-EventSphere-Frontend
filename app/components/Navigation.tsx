import { useState } from "react";
import { Link, useNavigate } from "react-router";
import { Input, Dropdown, Menu } from "antd";
import {
    SearchOutlined,
    MenuOutlined,
    UserOutlined,
    CalendarOutlined,
    LogoutOutlined,
    DashboardOutlined,
    LoginOutlined,
    UserAddOutlined,
} from "@ant-design/icons";
import { useAuth } from "../context/AuthContext";

export function Navigation() {
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const { user, logout } = useAuth();
    const navigate = useNavigate();

    // Menu items by role
    let menuItems: { key: string; label: React.ReactNode }[] = [];

    if (!user) {
        menuItems = [
            { key: "home", label: <Link to="/">Home</Link> },
            { key: "events", label: <Link to="/events">Events</Link> },
            { key: "login", label: <Link to="/login">Login</Link> },
            { key: "register", label: <Link to="/register">Register</Link> },
        ];
    } else if (user.role === "participant") {
        menuItems = [
            { key: "home", label: <Link to="/">Home</Link> },
            { key: "events", label: <Link to="/events">Events</Link> },
            { key: "dashboard", label: <Link to="/dashboard">Dashboard</Link> },
            { key: "profile", label: <Link to="/profile">Profile</Link> },
            {
                key: "logout",
                label: (
                    <span
                        onClick={() => {
                            logout();
                            navigate("/");
                        }}
                    >
                        Logout
                    </span>
                ),
            },
        ];
    } else if (user.role === "organizer") {
        menuItems = [
            { key: "home", label: <Link to="/">Home</Link> },
            { key: "events", label: <Link to="/events">Events</Link> },
            { key: "dashboard", label: <Link to="/dashboard">Organizer Dashboard</Link> },
            { key: "profile", label: <Link to="/profile">Profile</Link> },
            {
                key: "logout",
                label: (
                    <span
                        onClick={() => {
                            logout();
                            navigate("/");
                        }}
                    >
                        Logout
                    </span>
                ),
            },
        ];
    }

    return (
        <header
            style={{
                position: "sticky",
                top: 0,
                zIndex: 50,
                width: "100%",
                background: "#1890ff",
                borderBottom: "1px solid #eaeaea",
            }}
        >
            <div
                style={{
                    display: "flex",
                    height: "64px",
                    alignItems: "center",
                    justifyContent: "space-between",
                    padding: "0 16px",
                    color: "white",
                }}
            >
                {/* Logo */}
                <Link to="/" style={{ display: "flex", alignItems: "center", gap: 8 }}>
                    <div
                        style={{
                            height: 32,
                            width: 32,
                            borderRadius: 8,
                            background: "white",
                            display: "flex",
                            alignItems: "center",
                            justifyContent: "center",
                        }}
                    >
                        <CalendarOutlined style={{ fontSize: 18, color: "#1890ff" }} />
                    </div>
                    <span style={{ fontSize: 20, fontWeight: "bold", color: "white" }}>
                        EventHub
                    </span>
                </Link>

                {/* Search bar */}
                <div style={{ flex: 1, maxWidth: 300, margin: "0 24px" }}>
                    <Input
                        prefix={<SearchOutlined />}
                        placeholder="Search events..."
                        style={{ borderRadius: 8 }}
                    />
                </div>

                {/* User menu */}
                <Dropdown
                    overlay={<Menu items={menuItems} />}
                    trigger={["click"]}
                    placement="bottomRight"
                >
                    <UserOutlined style={{ fontSize: 20, cursor: "pointer" }} />
                </Dropdown>

                {/* Mobile menu toggle */}
                <button
                    onClick={() => setIsMenuOpen(!isMenuOpen)}
                    style={{
                        background: "transparent",
                        border: "none",
                        color: "white",
                        fontSize: 20,
                        cursor: "pointer",
                        marginLeft: 16,
                    }}
                    className="nav-mobile"
                >
                    <MenuOutlined />
                </button>
            </div>

            {/* Mobile navigation */}
            {isMenuOpen && (
                <div
                    style={{
                        background: "#1890ff",
                        padding: "8px 16px",
                    }}
                >
                    <nav style={{ display: "flex", flexDirection: "column", gap: 12 }}>
                        {menuItems.map((item) => (
                            <div key={item.key} style={{ color: "white" }}>
                                {item.label}
                            </div>
                        ))}
                        <Input placeholder="Search events..." />
                    </nav>
                </div>
            )}
        </header>
    );
}
