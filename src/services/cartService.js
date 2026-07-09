import api from "./api";


export const addToCart = async (cartData) => {

    const response = await api.post(
        "/api/cart/add",
        cartData
    );

    return response.data;

};



export const getCart = async (customer_id) => {

    const response = await api.get(
        `/api/cart/${customer_id}`
    );

    return response.data;

};
export const updateCart = async (cart_id, quantity) => {

    const response = await api.put(
        `/api/cart/update/${cart_id}?quantity=${quantity}`
    );

    return response.data;

};





export const removeCart = async (cart_id) => {

    const response = await api.delete(

        `/api/cart/remove/${cart_id}`

    );

    return response.data;

};