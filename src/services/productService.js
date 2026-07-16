import api from "./api";

// Get All Products
export const getProducts = async () => {
    const response = await api.get("/api/product/all");
    return response.data;
};

// Get Product Details
export const getProductById = async (productId) => {
    const response = await api.get(`/api/product/${productId}`);
    return response.data;
};

// Get Related Products
export const getRelatedProducts = async (productId) => {
    const response = await api.get(`/api/product/${productId}/related`);
    return response.data;
};