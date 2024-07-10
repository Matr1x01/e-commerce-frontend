import requestWrapper from "@/api/requestWrapper";

export const loginRequest = async ({phone,password}) => {
    return await requestWrapper({
        method: 'POST',
        url: 'login',
        data: {
            phone: phone,
            password: password
        }
    });
}

export const registerRequest = async ({name,phone,password,confirm_password}) => {
    return await requestWrapper({
        method: 'POST',
        url: 'register',
        data: {
            name: name,
            phone: phone,
            password: password,
            confirm_password: confirm_password
        }
    });
}