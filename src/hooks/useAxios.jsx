import axios from 'axios';

// Create an Axios instance
const axiosInstance = axios.create({
    baseURL: 'http://localhost:3000/',
    withCredentials: true, // ✅ send HttpOnly cookies automatically
});

const useAxios = () => {
    return axiosInstance;
};

export default useAxios;
