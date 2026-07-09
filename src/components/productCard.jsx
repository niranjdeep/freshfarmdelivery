import { addToCart } from "../services/cartService";


function ProductCard({ product }) {

    const handleAddCart = async () => {

        try {

            const customerId = localStorage.getItem("customer_id");


            const cartData = {

                customer_id: customerId,

                product_id: product.product_id,

                quantity: 1,

                price: product.price

            };


            console.log("Cart Data:", cartData);


            const data = await addToCart(cartData);


            alert(data.message);


        } catch (error) {

            console.log(error);

            alert("Add Cart Failed");

        }

    };


    return (

        <div
            className="product-card"
            style={{
                border: "1px solid #ddd",
                padding: "15px",
                margin: "15px",
                borderRadius: "10px"
            }}
        >

            <h3>
                {product.product_name}
            </h3>


            <p>
                Category: {product.category}
            </p>


            <p>
                Price: ₹{product.price}
            </p>


            <p>
                Stock: {product.stock}
            </p>


            <button
                onClick={handleAddCart}
            >
                Add To Cart
            </button>


        </div>

    );

}


export default ProductCard;