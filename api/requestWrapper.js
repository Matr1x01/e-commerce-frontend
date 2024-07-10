import { apiClient } from "@/services/api-client";

const requestWrapper = async ({ url, method, headers = {}, data = {}, params = {} }) => {
    try {
        const response = await apiClient({ url, method, headers, data, params });
        return { error: !(response.status >= 200 && response.status < 400), data: response.data };
    } catch (error) {
        return { error: true, data: error.response ? error.response.data : error };
    }
};

export default requestWrapper;