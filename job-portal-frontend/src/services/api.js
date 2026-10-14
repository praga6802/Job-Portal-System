import axios from "axios";

const apiInstance = axios.create({
    baseURL: "http://localhost:8080",
});
const isRedirecting = false;
apiInstance.interceptors.request.use(
    (config) => {
        const token = localStorage.getItem("token");
        if (token) {
            config.headers.Authorization = `Bearer ${token}`;
        }
        return config;
    },
    (error) => Promise.reject(error),
);

apiInstance.interceptors.response.use(
    (response) => response,
    (error) => {
        const status = error.response?.status;
        const url = error.config?.url ?? "";

        const isLoginRequest = url.includes("/auth/login");

        if (!isLoginRequest && status === 401 && !isRedirecting) {
            isRedirecting = true;

            localStorage.removeItem("token");
            localStorage.removeItem("role");
            window.location.replace("/login?sessionExpired=true");
        }
        return Promise.reject(error);
    },
);

export default apiInstance;
