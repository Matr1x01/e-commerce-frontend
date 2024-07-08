import requestWrapper from "@/api/requestWrapper";


export const getAddressesRequest = async () => {
    return await requestWrapper({
        method: 'GET',
        url: 'addresses/',
    });
}

export const createAddressRequest = async ({address, area, city, state, country, postalCode}) => {
    return await requestWrapper({
        method: 'POST',
        url: 'addresses/',
        data: {
            address: address,
            area: area,
            city: city,
            state: state,
            country: country,
            postal_code: postalCode

        }
    });

}
export const deleteAddressRequest = async ({addressUuid}) => {
    return await requestWrapper({
        method: 'DELETE',
        url: `addresses/${addressUuid}/`,
    });
}