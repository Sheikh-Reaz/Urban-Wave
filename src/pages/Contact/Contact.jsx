// ContactUs.jsx
import React from "react";
import { motion } from "framer-motion";
import { useForm } from "react-hook-form";
import Swal from "sweetalert2";
import { FaFacebookF, FaInstagram, FaLinkedinIn } from "react-icons/fa";
import { PiXLogoFill } from "react-icons/pi"; // X logo
import useDocumentTitle from "../../hooks/useDocumentTitle";

const Contact = () => {
  const { register, handleSubmit, reset } = useForm();

  const onSubmit = (data) => {
    console.log("Form Data:", data);
    Swal.fire({
      icon: "success",
      title: "Message Sent!",
      text: "Thank you for contacting Urban Wave. We will get back to you soon.",
    });
    reset();
  };
  useDocumentTitle("Contact Us");
  return (
    <div className="min-h-screen flex flex-col bg-white text-black">
      {/* Header */}
      <motion.div
        className="text-center py-16 md:py-20 px-4"
        initial={{ opacity: 0, y: -30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
      >
        <h1 className="text-4xl md:text-5xl font-bold">
          Contact Urban Wave
        </h1>
        <p className="mt-3 text-gray-700 text-base md:text-lg max-w-2xl mx-auto">
          Reach out to us for any inquiries or feedback. We'd love to hear from you.
        </p>
      </motion.div>

      {/* Main Content */}
      <div className="flex flex-col md:flex-row justify-center items-start md:items-stretch px-4 md:px-16 gap-12 flex-1 max-w-6xl mx-auto w-full">
        {/* Company Info */}
        <motion.div
          className="flex-1 space-y-8 md:max-w-sm"
          initial={{ opacity: 0, x: -50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 1 }}
        >
          <div>
            <h2 className="text-2xl md:text-3xl font-bold mb-4">
              Our Office
            </h2>
            <div className="space-y-2 leading-relaxed">
              <p><span className="font-semibold">Urban Wave</span></p>
              <p>123 Fashion Street</p>
              <p>Dhaka, Bangladesh</p>
              <p className="pt-2">
                <span className="text-gray-700">Phone:</span> +880 1234 567890
              </p>
              <p>
                <span className="text-gray-700">Email:</span> info@urbanwave.com
              </p>
            </div>
          </div>

          <div>
            <h2 className="text-2xl md:text-3xl font-bold mb-4">
              Follow Us
            </h2>
            <div className="flex gap-4 text-black text-xl">
              <a href="#" className="w-10 h-10 rounded-full border border-gray-300 flex items-center justify-center hover:bg-black hover:text-white transition-all duration-300">
                <FaFacebookF size={16} />
              </a>
              <a href="#" className="w-10 h-10 rounded-full border border-gray-300 flex items-center justify-center hover:bg-black hover:text-white transition-all duration-300">
                <PiXLogoFill size={16} />
              </a>
              <a href="#" className="w-10 h-10 rounded-full border border-gray-300 flex items-center justify-center hover:bg-black hover:text-white transition-all duration-300">
                <FaInstagram size={16} />
              </a>
              <a href="#" className="w-10 h-10 rounded-full border border-gray-300 flex items-center justify-center hover:bg-black hover:text-white transition-all duration-300">
                <FaLinkedinIn size={16} />
              </a>
            </div>
          </div>
        </motion.div>

        {/* Contact Form */}
        <motion.div
          className="flex-1 border border-gray-300 shadow-lg rounded-xl p-8 md:p-10 w-full md:max-w-sm"
          initial={{ opacity: 0, x: 50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 1 }}
        >
          <h2 className="text-2xl md:text-3xl font-bold mb-6">
            Send a Message
          </h2>
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
            <input
              type="text"
              placeholder="Your Name"
              {...register("name", { required: true })}
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:border-black transition-colors"
            />
            <input
              type="email"
              placeholder="Your Email"
              {...register("email", { required: true })}
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:border-black transition-colors"
            />
            <textarea
              placeholder="Your Message"
              {...register("message", { required: true })}
              className="w-full px-4 py-3 border border-gray-300 rounded-lg h-28 resize-none focus:outline-none focus:border-black transition-colors"
            ></textarea>
            <button
              type="submit"
              className="w-full py-3 bg-black text-white font-semibold rounded-lg hover:bg-gray-800 transition-colors"
            >
              Send Message
            </button>
          </form>
        </motion.div>
      </div>

      {/* Footer */}
      <footer className="text-gray-500 text-sm text-center py-6 mt-12 border-t border-gray-300">
        &copy; {new Date().getFullYear()} Urban Wave. All rights reserved.
      </footer>
    </div>
  );
};

export default Contact;
