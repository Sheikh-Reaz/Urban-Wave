import React, { useState } from "react";
import backgroundImage from "../../../assets/authbg.png";
import { useForm } from "react-hook-form";
import useAuth from "../../../hooks/useAuth";
import useAxios from "../../../hooks/useAxios";
import { Link, useLocation, useNavigate } from "react-router";
import ButtonAnimation from "../../../components/ButtonAnimation";
import { FaEye } from "react-icons/fa";
import { IoEyeOff } from "react-icons/io5";
import SocialLogin from "../SocialLogin/SocialLogin";
import Swal from "sweetalert2";
import Loading from "../../../components/Loading";

const Login = () => {
  const [show, setShow] = useState(false);
  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue,
  } = useForm();
  const location = useLocation();
  const navigate = useNavigate();
  const { signInUser } = useAuth();
  const axiosInstance = useAxios();
  const [loadingState, setLoadingState] = useState(false);

  // Login credentials
  const credentials = {
    admin: {
      email: "adminboss@gmail.com",
      password: "Admin@boss1"
    },
    manager: {
      email: "managervai@gmail.com", 
      password: "Manager@vai1"
    },
    buyer: {
      email: "buyervai@gmail.com",
      password: "Buyer@vai1"
    }
  };

  // Auto-fill functions
  const fillCredentials = (role) => {
    setValue("email", credentials[role].email);
    setValue("password", credentials[role].password);
  };

  const handleLogin = async (data) => {
    setLoadingState(true); // show loader immediately
    try {
      const result = await signInUser(data.email, data.password);
      const user = result.user;

      // Get Firebase ID token
      const token = await user.getIdToken();

      // Send token to backend to set HttpOnly cookie
      await axiosInstance.post("/jwt", { token });

      // ✅ Optional: show success modal
      await Swal.fire({
        icon: "success",
        title: "Login Successful",
        showConfirmButton: false,
        timer: 1500,
      });

      setLoadingState(false); // stop loader after modal
      navigate(location?.state || "/");
    } catch (error) {
      console.log(error);

      let errorMessage = "Invalid Login Credentials";
      if (error.code === "auth/wrong-password") {
        errorMessage = "Wrong Password";
      } else if (error.code === "auth/user-not-found") {
        errorMessage = "User Not Found";
      } else if (error.code === "auth/too-many-requests") {
        errorMessage = "Too Many Attempts. Try Again Later";
      }

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

      // ✅ Keep loader visible until toast disappears
      await Toast.fire({
        icon: "error",
        title: errorMessage,
      });

      setLoadingState(false); // stop loader after modal closes
    }
  };

  return (
    <div className="relative">
      {/* Loading overlay */}
      {loadingState && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
          <Loading />
        </div>
      )}

      <div
        style={{ backgroundImage: `url(${backgroundImage})` }}
        className="bg-cover bg-center py-16 flex items-center justify-center"
      >
        <h1 className="font-bold title-font text-white text-xl md:text-3xl lg:text-5xl">
          Welcome Back ! Please Login to continue.
        </h1>
      </div>

      <div className="max-w-md mx-auto my-12 border border-gray-300 ">
        <form className="card-body" onSubmit={handleSubmit(handleLogin)}>
          <fieldset className="fieldset">
            {/* Auto-fill buttons */}
            <div className="mb-6">
              <p className="text-sm font-medium mb-3 text-gray-600">Quick Login:</p>
              <div className="flex gap-2 flex-wrap">
                <button
                  type="button"
                  onClick={() => fillCredentials('admin')}
                  className="px-3 py-1 border border-black text-black text-sm hover:bg-gray-100 transition-colors"
                >
                  Admin
                </button>
                <button
                  type="button"
                  onClick={() => fillCredentials('manager')}
                  className="px-3 py-1 border border-black text-black text-sm hover:bg-gray-100 transition-colors"
                >
                  Manager
                </button>
                <button
                  type="button"
                  onClick={() => fillCredentials('buyer')}
                  className="px-3 py-1 border border-black text-black text-sm hover:bg-gray-100 transition-colors"
                >
                  Buyer
                </button>
              </div>
            </div>

            <label className="label form-label">Email</label>
            <input
              type="email"
              {...register("email", { required: true })}
              className="input input-field"
              placeholder="Email"
            />
            {errors.email && <p className="text-red-500">Email is required</p>}

            <div className="relative">
              <label className="label form-label">Password</label>
              <input
                type={show ? "text" : "password"}
                {...register("password", { required: true, minLength: 6 })}
                className="input input-field"
                placeholder="••••••••"
              />
              <span
                onClick={() => setShow(!show)}
                className="absolute right-2 text-black top-12 cursor-pointer z-50"
              >
                {show ? <FaEye size={13} /> : <IoEyeOff size={13} />}
              </span>
              {errors.password?.type === "minLength" && (
                <p className="text-red-500">
                  Password must be 6 characters or longer
                </p>
              )}
            </div>

            <div>
              <a className="link title-font text-xl link-hover">
                Forgot password?
              </a>
            </div>

            <ButtonAnimation
              className="w-full"
              width={400}
              height={60}
              speed={2}
              type="submit"
            >
              <span className="w-full font-semibold title-font text-2xl">
                Log In
              </span>
            </ButtonAnimation>

            <SocialLogin axiosInstance={axiosInstance} />
          </fieldset>

          <p className="text-center mt-4">
            New to our website? Please{" "}
            <Link
              state={location.state}
              className="text-blue-400 underline"
              to="/register"
            >
              Register
            </Link>{" "}
            here now !!
          </p>
        </form>
      </div>
    </div>
  );
};

export default Login;
