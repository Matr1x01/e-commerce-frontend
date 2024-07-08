import requestWrapper from "@/api/requestWrapper";

export const postOrderRequest = async ({ deliveryMethod, selectedAddress, paymentMethod}) => {
    return await requestWrapper({
        url: 'orders/',
        method: "POST",
        data: {
            payment_method: paymentMethod,
            delivery_method: deliveryMethod,
            address: selectedAddress,
        }
    });
}

export const getOrdersRequest = async () => {
    return await requestWrapper({
        url: 'orders/',
        method: "GET",
    });
}

export const getOrderRequest = async ({orderUuid}) => {
    return await requestWrapper({
        url: `orders/${orderUuid}`,
        method: "GET",
    });
}

export const cancelOrderRequest = async ({key}) => {
    return await requestWrapper({
        url: `order-cancel/${key}/`,
        method: "POST",
    });
}