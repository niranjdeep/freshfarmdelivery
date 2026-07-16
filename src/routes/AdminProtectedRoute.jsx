import { Navigate } from "react-router-dom";

function AdminProtectedRoute({ children }) {

    const adminId = localStorage.getItem("admin_id");

    if (!adminId) {
        return <Navigate to="/admin/login" />;
    }

    return children;
}

export default AdminProtectedRoute;