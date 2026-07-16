import CategorySection from "../components/CategorySection";
import heroBanner from "../assets/images/banners/hero-banner.jpg";
import Navbar from "../components/Navbar";
import { useNavigate } from "react-router-dom";

function Home() {

    const navigate = useNavigate();

    return (
        <div>

            <Navbar />

            <img
                src={heroBanner}
                alt="Fresh Farm Banner"
                style={{
                    width: "100%",
                    height: "450px",
                    objectFit: "cover"
                }}
            />

            <div
                style={{
                    textAlign: "center",
                    padding: "40px 20px",
                    background: "#f8f9fa"
                }}
            >

                <h1
                    style={{
                        color: "green",
                        marginBottom: "15px"
                    }}
                >
                    Welcome to Fresh Farm Delivery
                </h1>

                <p
                    style={{
                        maxWidth: "700px",
                        margin: "auto",
                        lineHeight: "1.8",
                        fontSize: "18px"
                    }}
                >
                    Buy fresh Milk, Fish, Chicken, Eggs and Farm Products
                    directly from trusted local farmers.
                </p>

                <button
                    onClick={() => navigate("/products")}
                    style={{
                        marginTop: "25px",
                        background: "green",
                        color: "white",
                        border: "none",
                        padding: "15px 35px",
                        borderRadius: "8px",
                        fontSize: "18px",
                        cursor: "pointer"
                    }}
                >
                    Shop Now
                </button>

            </div>

            <div
                id="categories"
                style={{
                    padding: "30px"
                }}
            >

                <h2
                    style={{
                        textAlign: "center",
                        color: "green",
                        marginBottom: "30px"
                    }}
                >
                    Shop by Category
                </h2>

                <CategorySection />

            </div>

        </div>
    );
}

export default Home;