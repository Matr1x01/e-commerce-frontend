import { apiClient } from "@/services/api-client";

const requestWrapper = async ({ url, method, headers = {}, data = {}, params = {} }) => {
    try {
        const response = await apiClient({ url, method, headers, data, params });
        return { error: !(response.status >= 200 && response.status < 400), data: response.data, status: response.status};
    } catch (error) {
        return { error: true, data: error.response ? error.response.data : error, status: error.response ? error.response.status : 500};
    }
};

export default requestWrapper;