import axios from 'axios';

// Create an Axios instance
const axiosInstance = axios.create({
    // baseURL: 'http://localhost:3000',
    baseURL: 'https://assignment-11-server-rho-seven.vercel.app',
    withCredentials: true, // ✅ send HttpOnly cookies automatically
});

const useAxios = () => {
    return axiosInstance;
};

export default useAxios;
