import api from "./api";


export const createOrder = async (orderData) => {

    const response = await api.post(
        "/api/order/create",
        orderData
    );

    return response.data;

};



export const getCustomerOrders = async (customer_id) => {

    const response = await api.get(
        `/api/order/customer/${customer_id}`
    );

    return response.data;

};



export const getOrderDetails = async (order_id) => {

    const response = await api.get(
        `/api/order/${order_id}`
    );

    return response.data;

};



export const updateOrderStatus = async (
    order_id,
    status
) => {

    const response = await api.put(
        `/api/order/status/${order_id}?status=${status}`
    );

    return response.data;

};