import { useAuth } from "../context/AuthContext";

export default function DashboardPage() {
    const { user } = useAuth();

    if (!user) {
        return <h2>You must login to access the dashboard.</h2>;
    }

    return (
        <div>
            <h1>{user.role === "organizer" ? "Organizer" : "Participant"} Dashboard</h1>
            <p>Welcome, {user.username || "User"}!</p>
        </div>
    );
}
