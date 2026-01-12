import axios from "axios";
import { useEffect } from "react";
import { useNavigate } from "react-router";
import useAuth from "./useAuth";

const axiosSecure = axios.create({
  // baseURL: "http://localhost:3000",
  baseURL: "https://assignment-11-server-rho-seven.vercel.app",
  withCredentials: true, // required for HttpOnly cookie
});

const useAxiosSecure = () => {
  const { logOut } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    // 🔥 Response Interceptor — handles unauthorized
const resInterceptor = axiosSecure.interceptors.response.use(
  (response) => response,
  async (error) => {
    const status = error.response?.status;

    if (status === 401) {
      await logOut();
      navigate("/login", { replace: true });
    }

    return Promise.reject(error);
  }
);

    // cleanup
    return () => {
      axiosSecure.interceptors.response.eject(resInterceptor);
    };
  }, [logOut, navigate]);

  return axiosSecure;
};

export default useAxiosSecure;
