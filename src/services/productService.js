import api from "./api";

export const getProducts = async () => {
    const response = await api.get("/api/product/all");
    return response.data;
};