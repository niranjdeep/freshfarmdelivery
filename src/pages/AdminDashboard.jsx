import { Link } from "react-router-dom";

function AdminDashboard() {

    const handleLogout = () => {
        localStorage.removeItem("admin_id");
        window.location.href = "/admin/login";
    };

    return (
        <div style={{ padding: "30px" }}>
            <h1>🌱 Fresh Farm Admin Dashboard</h1>

            <br />

            <Link to="/admin/products">
                <button>Manage Products</button>
            </Link>

            <br /><br />

            <Link to="/admin/orders">
                <button>Manage Orders</button>
            </Link>

            <br /><br />

            <button
                onClick={handleLogout}
                style={{
                    background: "red",
                    color: "white",
                    padding: "10px 20px",
                    border: "none",
                    cursor: "pointer"
                }}
            >
                Logout
            </button>
        </div>
    );
}

export default AdminDashboard;