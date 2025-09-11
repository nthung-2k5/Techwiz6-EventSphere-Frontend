import { Outlet, useLocation, Link } from "react-router";
import { Breadcrumb } from "antd";

export default function EventsLayout() {
    const location = useLocation();
    const pathParts = location.pathname.split("/").filter(Boolean);

    return (
        <div style={{ padding: "1rem 2rem" }}>
            {/* Breadcrumb */}
            <Breadcrumb style={{ marginBottom: "1rem" }}>
                <Breadcrumb.Item>
                    <Link to="/">Home</Link>
                </Breadcrumb.Item>
                {pathParts.includes("events") && (
                    <Breadcrumb.Item>
                        <Link to="/events">Events</Link>
                    </Breadcrumb.Item>
                )}
                {pathParts.length > 1 && pathParts[1] !== "events" && (
                    <Breadcrumb.Item>{pathParts[1]}</Breadcrumb.Item>
                )}
            </Breadcrumb>

            {/* Nội dung con */}
            <Outlet />
        </div>
    );
}
