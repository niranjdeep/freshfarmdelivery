import api from "./api";


export const getAdminOrders = async () => {

    const response = await api.get(
        "/api/admin/orders"
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



