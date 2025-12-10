import axios from "axios";
import { useEffect } from "react";
import { useNavigate } from "react-router";
import useAuth from "./useAuth";

const axiosSecure = axios.create({
  baseURL: "http://localhost:3000",
  withCredentials: true, // ✅ REQUIRED for HttpOnly cookie
});

const useAxiosSecure = () => {
  const { user, logOut, loading } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    // ✅ SEND FIREBASE TOKEN ONLY ONCE TO SAVE IN COOKIE
    const sendTokenToServer = async () => {
      if (user?.accessToken) {
        await axios.post(
          "http://localhost:3000/jwt",
          { token: user.accessToken },
          { withCredentials: true }
        );
      }
    };

    if (!loading && user?.accessToken) {
      sendTokenToServer();
    }

    // ✅ RESPONSE INTERCEPTOR (NO HEADER TOKEN ANYMORE)
    const resInterceptor = axiosSecure.interceptors.response.use(
      (response) => response,
      async (error) => {
        const statusCode = error.response?.status;

        if (statusCode === 401 || statusCode === 403) {
          await logOut();
          navigate("/login");
        }

        return Promise.reject(error);
      }
    );

    return () => {
      axiosSecure.interceptors.response.eject(resInterceptor);
    };
  }, [user, logOut, navigate, loading]);

  return axiosSecure;
};

export default useAxiosSecure;
