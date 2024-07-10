import requestWrapper from "@/api/requestWrapper";

export const getWishlistRequest = async () => {
    return  await requestWrapper({
        url: 'wishlist/',
        method: 'GET',
    });
}

export const postWishlistRequest = ({productSlug})=>{
    return requestWrapper({
        url: 'wishlist/',
        method: 'POST',
        data: {
            product: productSlug,
        },
    });
}

export const deleteWishlistRequest = ({productSlug})=>{
    return requestWrapper({
        url: 'wishlist/',
        method: 'DELETE',
        data: {
            product: productSlug
        }
    });
}