import React, { useState } from "react";
import backgroundImage from "../../../assets/authbg.png";
import { useForm } from "react-hook-form";
import useAuth from "../../../hooks/useAuth";
import useAxios from "../../../hooks/useAxios";
import ButtonAnimation from "../../../components/ButtonAnimation";
import { FaEye } from "react-icons/fa";
import { IoEyeOff } from "react-icons/io5";
import { Link, useNavigate, useLocation } from "react-router";
import axios from "axios";
import Swal from "sweetalert2";

const Register = () => {
  const { register, handleSubmit, formState: { errors } } = useForm();
  const { registerUser, updateUserProfile } = useAuth();
  const [show, setShow] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();
  const axiosInstance = useAxios();

const handleRegistration = async (data) => {
  try {
    // ✅ 1. Create user
    const result = await registerUser(data.email, data.password);
    const user = result.user;

    // ✅ 2. Upload image
    if (!data.photo || !data.photo[0]) {
      throw new Error("Image not selected");
    }

    const formData = new FormData();
    formData.append("image", data.photo[0]);

    const image_API_URL = `https://api.imgbb.com/1/upload?key=${import.meta.env.VITE_Image_Host_Key}`;

    const imgRes = await axios.post(image_API_URL, formData);
    const imageUrl = imgRes.data.data.display_url;

    // ✅ 3. Update Firebase profile
    const userProfile = {
      displayName: data.name,
      photoURL: imageUrl,
    };

    await updateUserProfile(userProfile);

    // ✅ 4. Get token
    const token = await user.getIdToken();

    // ✅ 5. Send token to backend
    await axiosInstance.post(
      "/jwt",
      { token },
      { withCredentials: true }
    );
    //Send user info to database
    const newUser = {
      userName: data.name,
      email: data.email,
      photoURL: imageUrl,
      role: data.userRole
    };
    await axiosInstance.post("/users", newUser);

    // ✅ 6. Show Toast BEFORE redirect
    const Toast = Swal.mixin({
      toast: true,
      position: "top-end",
      showConfirmButton: false,
      timer: 3000,
      timerProgressBar: true,
      didOpen: (toast) => {
        toast.onmouseenter = Swal.stopTimer;
        toast.onmouseleave = Swal.resumeTimer;
      }
    });

    Toast.fire({
      icon: "success",
      title: "Registered Successfully"
    });

    // ✅ 7. Redirect AFTER toast
    setTimeout(() => {
      navigate(location?.state || "/");
    }, 800);

    console.log("Registration successful:", user);

  } catch (error) {
    console.error("Registration Error:", error);

    Swal.fire({
      icon: "error",
      title: "Registration failed",
      text: error.message,
    });
  }
};



  return (
    <div>
      <div
        style={{ backgroundImage: `url(${backgroundImage})` }}
        className="bg-cover bg-center py-16 flex items-center justify-center"
      >
        <h1 className="font-bold title-font text-white text-xl md:text-3xl lg:text-5xl">
          New To Our Website? Please Register !
        </h1>
      </div>

      <div className="max-w-md mx-auto my-12 border border-gray-300 bg-white">
        <form className="card-body" onSubmit={handleSubmit(handleRegistration)}>
          <fieldset className="fieldset">
            {/* Name */}
            <label className="label form-label">Name</label>
            <input type="text" {...register("name", { required: true })} className="input input-field" placeholder="Your Name" />
            {errors.name && <p className="text-red-500">Name is required.</p>}

            {/* Email */}
            <label className="label form-label">Email</label>
            <input type="email" {...register("email", { required: true })} className="input input-field" placeholder="Email" />
            {errors.email && <p className="text-red-500">Email is required.</p>}

            {/* Photo */}
            <label className="label form-label">Photo</label>
            <input type="file" {...register("photo", { required: true })} className="file-input input-field" />
            {errors.photo && <p className="text-red-500">Photo is required.</p>}

            {/* Role */}
            <label className="label form-label">Select Role</label>
            <select {...register("userRole", { required: true })} defaultValue="Select Role"className="select input-field">
              <option disabled>Select Role</option>
              <option>Buyer</option>
              <option>Manager</option>
            </select>

            {/* Password */}
            <div className="relative">
              <label className="label form-label">Password</label>
              <input type={show ? "text" : "password"} {...register("password", { required: true, minLength: 6 })} className="input input-field" placeholder="••••••••" />
              <span onClick={() => setShow(!show)} className="absolute right-2 text-black top-12 cursor-pointer z-50">
                {show ? <FaEye size={13} /> : <IoEyeOff size={13} />}
              </span>
            </div>
            {errors.password?.type === "minLength" && (
              <p className="text-red-500">Password must be 6 characters or longer.</p>
            )}
            <ButtonAnimation className="w-full" width={400} height={60} speed={2} type="submit">
              <span className="w-full font-semibold title-font text-2xl">Register Now !!</span>
            </ButtonAnimation>
          </fieldset>

          <p className="text-center mt-4">
            Already have an account?{" "}
            <Link state={location.state} className="text-blue-400 underline" to="/login">
              Log In
            </Link>
          </p>
        </form>
      </div>
    </div>
  );
};

export default Register;
