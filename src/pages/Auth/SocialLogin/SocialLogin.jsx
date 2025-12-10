import React from "react";
import useAuth from "../../../hooks/useAuth";
import { useLocation, useNavigate } from "react-router";
import Swal from "sweetalert2";

const SocialLogin = ({ axiosInstance }) => {
  const { signInGoogle } = useAuth();
  const location = useLocation();
  const navigate = useNavigate();

  const handleGoogleSignIn = async () => {
    try {
      const result = await signInGoogle();
      const user = result.user;
      console.log("Google User:", user);

      // ✅ Get Firebase token
      const token = await user.getIdToken();

      // ✅ Send token to backend to set HttpOnly cookie
      await axiosInstance.post("/jwt", { token }, { withCredentials: true });

      // ✅ Normalize Google user data
      const newUser = {
        userName: user.displayName || "Google User",
        email: user.email,
        photoURL: user.photoURL || "",
         // First-time Google login is always a buyer
      };

      // ✅ Send to backend; backend should handle "insert if not exists"
      await axiosInstance.post("/users", newUser);

      // ✅ Toast success
      const Toast = Swal.mixin({
        toast: true,
        position: "top-end",
        showConfirmButton: false,
        timer: 3000,
        timerProgressBar: true,
        didOpen: (toast) => {
          toast.onmouseenter = Swal.stopTimer;
          toast.onmouseleave = Swal.resumeTimer;
        },
      });

      Toast.fire({
        icon: "success",
        title: "Login Successful",
      });

      // ✅ Redirect AFTER toast
      setTimeout(() => {
        navigate(location?.state || "/");
      }, 800);
    } catch (error) {
      console.error("Google Login Error:", error);

      Swal.fire({
        icon: "error",
        title: "Login failed",
        text: error?.response?.data?.message || error.message,
      });
    }
  };

  return (
    <div>
      <div className="text-center pb-8">
        <p className="mb-2">OR</p>
        <button
          onClick={handleGoogleSignIn}
          className="btn bg-white w-full text-black border-[#e5e5e5]"
        >
          Google Login
        </button>
      </div>
    </div>
  );
};

export default SocialLogin;
