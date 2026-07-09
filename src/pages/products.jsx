import { useEffect, useState } from "react";
import { getProducts } from "../services/productService";
import ProductCard from "../components/ProductCard";

function Products() {

    const [products, setProducts] = useState([]);
    const [loading, setLoading] = useState(true);


    useEffect(() => {
        loadProducts();
    }, []);


    const loadProducts = async () => {

        try {

            const data = await getProducts();

            setProducts(data);

        } catch (error) {

            console.log(error);

        } finally {

            setLoading(false);

        }

    };


    if (loading) {
        return <h2>Loading...</h2>;
    }


    return (

        <div>

            <h1>Products</h1>


            {
                products.length === 0 ? (

                    <h3>No Products Found</h3>

                ) : (

                    products.map((product) => (

                        <ProductCard
                            key={product.id}
                            product={product}
                        />

                    ))

                )
            }


        </div>

    );

}


export default Products;