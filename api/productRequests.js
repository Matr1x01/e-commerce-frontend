import requestWrapper from "@/api/requestWrapper";

export const getProducts = async (query) => {
    return requestWrapper({
        url: 'products',
        method: 'GET',
        params: query
    })
}

export const getProduct = async (slug) => {
    return requestWrapper({
        url: `products/${slug}`,
        method: 'GET'
    })
}

export const getBrands = async ({query}) => {
    return requestWrapper({
        url: 'brands',
        method: 'GET',
        params: query
    })
}

export const getCategories = async ({query}) => {
    return requestWrapper({
        url: 'category/',
        method: 'GET',
        params: query
    })
}

export const getBrand = async ({slug, query}) => {
    return requestWrapper({
        url: `brands/${slug}`,
        method: 'GET',
        params: query
    })
}

export const getCategory = async ({slug, query}) => {
    return requestWrapper({
        url: `category/${slug}`,
        method: 'GET',
        params: query
    })
}