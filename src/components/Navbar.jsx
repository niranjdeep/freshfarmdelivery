import { Link } from "react-router-dom";
import logo from "../assets/images/logo/logo.png";

function Navbar() {
  return (
    <div
      style={{
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
        padding: "15px 30px",
        backgroundColor: "#2E7D32",
        color: "white",
      }}
    >
      <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
        <img
          src={logo}
          alt="Fresh Farm Logo"
          style={{ width: "60px", height: "60px" }}
        />

        <h2>Fresh Farm Delivery</h2>
      </div>

      <div style={{ display: "flex", gap: "20px" }}>
        <Link to="/" style={{ color: "white", textDecoration: "none" }}>
          Home
        </Link>

        <Link to="/products" style={{ color: "white", textDecoration: "none" }}>
          Products
        </Link>

        <Link to="/cart" style={{ color: "white", textDecoration: "none" }}>
          Cart
        </Link>

        <Link to="/my-orders" style={{ color: "white", textDecoration: "none" }}>
          My Orders
        </Link>
      </div>
    </div>
  );
}

export default Navbar;