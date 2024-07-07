import requestWrapper from "@/api/requestWrapper";

export const getProfileRequest = async () => {
    return await requestWrapper({
        method: 'GET',
        url: 'profile',
    });
}

export const updateProfileRequest = async ({name, date_of_birth, gender}) => {
    return await requestWrapper({
        method: 'PUT',
        url: 'profile/update',
        data: {
            name: name,
            date_of_birth: date_of_birth,
            gender: gender
        }
    });
}