import { useEffect, useState } from "react";
import axios from "axios";

function AdminProducts() {

    const [products, setProducts] = useState([]);
    const [loading, setLoading] = useState(true);
    const [showForm, setShowForm] = useState(false);
    const [editProductId, setEditProductId] = useState(null);

    const [formData, setFormData] = useState({
        product_name: "",
        category: "",
        description: "",
        unit: "",
        price: "",
        stock: "",
        image_url: "",
        status: "Available",
        is_featured: false
    });

    useEffect(() => {
        loadProducts();
    }, []);

    const loadProducts = async () => {

        try {

            const response = await axios.get(
                "http://127.0.0.1:8000/api/product/all"
            );

            setProducts(response.data);

        } catch (error) {

            console.log(error);

        } finally {

            setLoading(false);

        }

    };

    const handleChange = (e) => {

        const { name, value } = e.target;

        setFormData({
            ...formData,
            [name]: value
        });

    };

    const handleSaveProduct = async () => {

    try {

        if (editProductId) {

            await axios.put(
                `http://127.0.0.1:8000/api/product/${editProductId}`,
                formData
            );

            alert("Product Updated Successfully");

        } else {

            await axios.post(
                "http://127.0.0.1:8000/api/product/add",
                formData
            );

            alert("Product Added Successfully");

        }

        setShowForm(false);
        setEditProductId(null);

        setFormData({
            product_name: "",
            category: "",
            description: "",
            unit: "",
            price: "",
            stock: "",
            image_url: "",
            status: "Available",
            is_featured: false
        });

        loadProducts();

    } catch (error) {

        console.log(error);

        alert("Operation Failed");

    }

};


    const handleEdit = (product) => {

    setEditProductId(product.product_id);

    setFormData({
        product_name: product.product_name,
        category: product.category,
        description: product.description,
        unit: product.unit,
        price: product.price,
        stock: product.stock,
        image_url: product.image_url,
        status: product.status,
        is_featured: product.is_featured
    });

    setShowForm(true);


};
const handleDelete = async (productId) => {

    const confirmDelete = window.confirm(
        "Are you sure you want to delete this product?"
    );

    if (!confirmDelete) return;

    try {

        await axios.delete(
            `http://127.0.0.1:8000/api/product/${productId}`
        );

        alert("Product Deleted Successfully");

        loadProducts();

    } catch (error) {

        console.log(error);

        alert("Delete Failed");

    }

};

    if (loading) {
        return <h2>Loading Products...</h2>;
    }

    return (

        <div style={{ padding: "20px" }}>

            <h1>Admin Product Management</h1>

            <button
                onClick={() => setShowForm(true)}
                style={{
                    padding: "10px 20px",
                    background: "green",
                    color: "white",
                    border: "none",
                    cursor: "pointer",
                    marginBottom: "20px"
                }}
            >
                + Add Product
            </button>

            {
                showForm && (

                    <div
                        style={{
                            border: "1px solid #ddd",
                            padding: "20px",
                            marginBottom: "20px"
                        }}
                    >

                        <h2>Add Product</h2>

                        <input
                            type="text"
                            name="product_name"
                            placeholder="Product Name"
                            value={formData.product_name}
                            onChange={handleChange}
                        />

                        <br /><br />

                        <input
                            type="text"
                            name="category"
                            placeholder="Category"
                            value={formData.category}
                            onChange={handleChange}
                        />

                        <br /><br />

                        <input
                            type="text"
                            name="description"
                            placeholder="Description"
                            value={formData.description}
                            onChange={handleChange}
                        />

                        <br /><br />

                        <input
                            type="text"
                            name="unit"
                            placeholder="Unit"
                            value={formData.unit}
                            onChange={handleChange}
                        />

                        <br /><br />

                        <input
                            type="number"
                            name="price"
                            placeholder="Price"
                            value={formData.price}
                            onChange={handleChange}
                        />

                        <br /><br />

                        <input
                            type="number"
                            name="stock"
                            placeholder="Stock"
                            value={formData.stock}
                            onChange={handleChange}
                        />

                        <br /><br />

                        <input
                            type="text"
                            name="image_url"
                            placeholder="images/cow_milk.jpg"
                            value={formData.image_url}
                            onChange={handleChange}
                        />

                        <br /><br />

                        <button onClick={handleSaveProduct}>
                            Save Product
                        </button>

                    </div>

                )
            }

            <table
    border="1"
    cellPadding="10"
    style={{
        width: "100%",
        borderCollapse: "collapse"
    }}
>
    <thead>
        <tr>
            <th>Image</th>
            <th>Product</th>
            <th>Category</th>
            <th>Price</th>
            <th>Stock</th>
            <th>Status</th>
            <th>Action</th>
        </tr>
    </thead>

    <tbody>

        {products.map((product) => (

            <tr key={product.product_id}>

                <td>

                    <img
                        src={`http://127.0.0.1:8000/static/${product.image_url}`}
                        alt={product.product_name}
                        width="70"
                        height="70"
                        style={{
                            objectFit: "cover",
                            borderRadius: "5px"
                        }}
                    />

                </td>

                <td>{product.product_name}</td>

                <td>{product.category}</td>

                <td>₹{product.price}</td>

                <td>{product.stock}</td>

                <td>{product.status}</td>

                <td>

                    <button
                        onClick={() => handleEdit(product)}
                        style={{
                            background: "#007bff",
                            color: "white",
                            border: "none",
                            padding: "6px 12px",
                            marginRight: "10px",
                            cursor: "pointer"
                        }}
                    >
                        Edit
                    </button>

                    <button
                        onClick={() => handleDelete(product.product_id)}
                        style={{
                            background: "red",
                            color: "white",
                            border: "none",
                            padding: "6px 12px",
                            cursor: "pointer"
                        }}
                    >
                        Delete
                    </button>

                </td>

            </tr>

        ))}

    </tbody>

</table>

</div>

);

}

export default AdminProducts;

        
