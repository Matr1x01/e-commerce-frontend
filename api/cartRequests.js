import requestWrapper from "@/api/requestWrapper";

export const getCartRequest = async () => {
    return  await requestWrapper({
        url: 'cart/',
        method: 'GET',
    });
}

export const postCartRequest = ({productSlug, quantity})=>{
    return requestWrapper({
        url: 'cart/',
        method: 'POST',
        data: {
            product: productSlug,
            quantity: quantity
        },
    });
}

export const deleteCartProductRequest = ({productSlug})=>{
    return requestWrapper({
        url: 'cart/',
        method: 'DELETE',
        data: {
            product: productSlug
        }
    });
}