import { motion } from "framer-motion";
import { useForm } from "react-hook-form";
import Swal from "sweetalert2";
import { FaFacebookF, FaInstagram, FaLinkedinIn } from "react-icons/fa";
import { PiXLogoFill } from "react-icons/pi";
import { MdLocationOn, MdPhone, MdEmail } from "react-icons/md";
import useDocumentTitle from "../../hooks/useDocumentTitle";
import ButtonAnimation2 from "../../components/ButtonAnimation2";
import { useTheme } from "../../contexts/ThemeContext/ThemeContext";

const Contact = () => {
  const { register, handleSubmit, reset } = useForm();
  const { theme } = useTheme();

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
    <div className={`min-h-screen transition-colors duration-300 outlet-color text-color`}>
      {/* Hero Section */}
      <motion.div
        className="relative py-20 md:py-28 px-4 overflow-hidden"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.8 }}
      >
        {/* Decorative background elements */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <div className={`absolute top-0 right-0 w-96 h-96 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-pulse ${
            theme === 'dark' ? 'bg-red-900' : 'bg-blue-100'
          }`}></div>
          <div className={`absolute bottom-0 left-0 w-96 h-96 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-pulse ${
            theme === 'dark' ? 'bg-red-800' : 'bg-purple-100'
          }`} style={{ animationDelay: '2s' }}></div>
        </div>

        <motion.div
          className="text-center relative z-10 max-w-3xl mx-auto"
          initial={{ opacity: 0, y: -30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
        >
          <h1 className={`text-5xl md:text-6xl font-bold bg-clip-text text-transparent mb-6 ${
            theme === 'dark'
              ? 'bg-gradient-to-r from-red-400 via-red-300 to-red-400'
              : 'bg-gradient-to-r from-gray-900 via-gray-800 to-gray-900'
          }`}>
            Get In Touch
          </h1>
          <p className={`text-lg md:text-xl leading-relaxed ${
            theme === 'dark' ? 'text-gray-400' : 'text-gray-600'
          }`}>
            Have a question or feedback? We'd love to hear from you. Reach out to our team and we'll respond as soon as possible.
          </p>
        </motion.div>
      </motion.div>

      {/* Main Content */}
      <div className="px-4 md:px-8 pb-20 max-w-7xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16">
        {/* Contact Info Cards */}
        <motion.div
          className={`rounded-2xl p-8 shadow-lg hover:shadow-2xl transition-all duration-300 border ${
            theme === 'dark'
              ? 'bg-gray-800 border-gray-700 hover:border-blue-500'
              : 'bg-white border-gray-100'
          }`}
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.1 }}
          whileHover={{ y: -5 }}
        >
          <div className="flex items-center gap-4 mb-4">
            <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-blue-600 rounded-lg flex items-center justify-center text-white">
              <MdLocationOn size={24} />
            </div>
            <h3 className="text-xl font-bold">Our Location</h3>
          </div>
          <p className={`leading-relaxed ${theme === 'dark' ? 'text-gray-300' : 'text-gray-600'}`}>
            123 Fashion Street<br />
            Dhaka, Bangladesh
          </p>
        </motion.div>

        <motion.div
          className={`rounded-2xl p-8 shadow-lg hover:shadow-2xl transition-all duration-300 border ${
            theme === 'dark'
              ? 'bg-gray-800 border-gray-700 hover:border-green-500'
              : 'bg-white border-gray-100'
          }`}
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          whileHover={{ y: -5 }}
        >
          <div className="flex items-center gap-4 mb-4">
            <div className="w-12 h-12 bg-gradient-to-br from-green-500 to-green-600 rounded-lg flex items-center justify-center text-white">
              <MdPhone size={24} />
            </div>
            <h3 className="text-xl font-bold">Phone</h3>
          </div>
          <p className={`${theme === 'dark' ? 'text-gray-300' : 'text-gray-600'}`}>
            +880 1234 567890<br />
            <span className={`text-sm ${theme === 'dark' ? 'text-gray-400' : 'text-gray-500'}`}>Available 9AM - 6PM</span>
          </p>
        </motion.div>

        <motion.div
          className={`rounded-2xl p-8 shadow-lg hover:shadow-2xl transition-all duration-300 border ${
            theme === 'dark'
              ? 'bg-gray-800 border-gray-700 hover:border-purple-500'
              : 'bg-white border-gray-100'
          }`}
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.3 }}
          whileHover={{ y: -5 }}
        >
          <div className="flex items-center gap-4 mb-4">
            <div className="w-12 h-12 bg-gradient-to-br from-purple-500 to-purple-600 rounded-lg flex items-center justify-center text-white">
              <MdEmail size={24} />
            </div>
            <h3 className="text-xl font-bold">Email</h3>
          </div>
          <p className={`${theme === 'dark' ? 'text-gray-300' : 'text-gray-600'}`}>
            info@urbanwave.com<br />
            <span className={`text-sm ${theme === 'dark' ? 'text-gray-400' : 'text-gray-500'}`}>We'll reply within 24h</span>
          </p>
        </motion.div>
      </div>

      {/* Form and Social Section */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-12 items-start">
        {/* Contact Form */}
        <motion.div
          className={`lg:col-span-2 rounded-2xl p-10 shadow-xl border transition-colors duration-300 ${
            theme === 'dark'
              ? 'bg-gray-800 border-gray-700'
              : 'bg-white border-gray-100'
          }`}
          initial={{ opacity: 0, x: 50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
        >
          <h2 className="text-3xl font-bold mb-2">Send us a Message</h2>
          <p className={`mb-8 ${theme === 'dark' ? 'text-gray-400' : 'text-gray-600'}`}>Fill out the form below and we'll get back to you shortly.</p>
          
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className={`block text-sm font-semibold mb-2 ${theme === 'dark' ? 'text-gray-300' : 'text-gray-700'}`}>Full Name</label>
                <input
                  type="text"
                  placeholder="John Doe"
                  {...register("name", { required: true })}
                  className={`w-full px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all ${
                    theme === 'dark'
                      ? 'bg-gray-700 border-gray-600 text-white placeholder-gray-400'
                      : 'bg-white border-gray-300 text-gray-900 placeholder-gray-500'
                  }`}
                />
              </div>
              <div>
                <label className={`block text-sm font-semibold mb-2 ${theme === 'dark' ? 'text-gray-300' : 'text-gray-700'}`}>Email Address</label>
                <input
                  type="email"
                  placeholder="john@example.com"
                  {...register("email", { required: true })}
                  className={`w-full px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all ${
                    theme === 'dark'
                      ? 'bg-gray-700 border-gray-600 text-white placeholder-gray-400'
                      : 'bg-white border-gray-300 text-gray-900 placeholder-gray-500'
                  }`}
                />
              </div>
            </div>

            <div>
              <label className={`block text-sm font-semibold mb-2 ${theme === 'dark' ? 'text-gray-300' : 'text-gray-700'}`}>Subject</label>
              <input
                type="text"
                placeholder="How can we help?"
                {...register("subject", { required: false })}
                className={`w-full px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all ${
                  theme === 'dark'
                    ? 'bg-gray-700 border-gray-600 text-white placeholder-gray-400'
                    : 'bg-white border-gray-300 text-gray-900 placeholder-gray-500'
                }`}
              />
            </div>

            <div>
              <label className={`block text-sm font-semibold mb-2 ${theme === 'dark' ? 'text-gray-300' : 'text-gray-700'}`}>Message</label>
              <textarea
                placeholder="Tell us more about your inquiry..."
                {...register("message", { required: true })}
                className={`w-full px-4 py-3 border rounded-lg h-32 resize-none focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all ${
                  theme === 'dark'
                    ? 'bg-gray-700 border-gray-600 text-white placeholder-gray-400'
                    : 'bg-white border-gray-300 text-gray-900 placeholder-gray-500'
                }`}
              ></textarea>
            </div>

            <div className="flex justify-center pt-4">
              <div className="hidden sm:block">
                <ButtonAnimation2
                  width={240}
                  height={60}
                  speed={3}
                  stroke="#FF0000"
                  textColor={theme === 'dark' ? '#ffffff' : '#000000'}
                  hoverTextColor={theme === 'dark' ? '#000000' : '#ffffff'}
                  onClick={handleSubmit(onSubmit)}
                >
                  Send Message
                </ButtonAnimation2>
              </div>
              <div className="sm:hidden">
                <ButtonAnimation2
                  width={180}
                  height={50}
                  speed={3}
                  stroke="#FF0000"
                  textColor={theme === 'dark' ? '#ffffff' : '#000000'}
                  hoverTextColor={theme === 'dark' ? '#000000' : '#ffffff'}
                  onClick={handleSubmit(onSubmit)}
                >
                  Send Message
                </ButtonAnimation2>
              </div>
            </div>
          </form>
        </motion.div>

        {/* Social Links */}
        <motion.div
          className={`rounded-2xl p-10 shadow-xl border h-fit transition-colors duration-300 ${
            theme === 'dark'
              ? 'bg-gray-800 border-gray-700'
              : 'bg-white border-gray-100'
          }`}
          initial={{ opacity: 0, x: 50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8, delay: 0.3 }}
        >
          <h3 className="text-2xl font-bold mb-6">Follow Us</h3>
          <p className={`mb-8 ${theme === 'dark' ? 'text-gray-400' : 'text-gray-600'}`}>Connect with us on social media for updates and news.</p>
          
          <div className="space-y-4">
            <a 
              href="#" 
              className={`flex items-center gap-3 p-4 rounded-lg border transition-all duration-300 group ${
                theme === 'dark'
                  ? 'border-gray-700 hover:border-blue-500 hover:bg-gray-700'
                  : 'border-gray-200 hover:border-blue-500 hover:bg-blue-50'
              }`}
            >
              <div className="w-10 h-10 bg-gradient-to-br from-blue-500 to-blue-600 rounded-lg flex items-center justify-center text-white group-hover:scale-110 transition-transform">
                <FaFacebookF size={18} />
              </div>
              <span className={`font-semibold ${theme === 'dark' ? 'text-gray-300' : 'text-gray-700'}`}>Facebook</span>
            </a>

            <a 
              href="#" 
              className={`flex items-center gap-3 p-4 rounded-lg border transition-all duration-300 group ${
                theme === 'dark'
                  ? 'border-gray-700 hover:border-gray-500 hover:bg-gray-700'
                  : 'border-gray-200 hover:border-black hover:bg-gray-50'
              }`}
            >
              <div className={`w-10 h-10 rounded-lg flex items-center justify-center text-white group-hover:scale-110 transition-transform ${
                theme === 'dark' ? 'bg-gray-600' : 'bg-black'
              }`}>
                <PiXLogoFill size={18} />
              </div>
              <span className={`font-semibold ${theme === 'dark' ? 'text-gray-300' : 'text-gray-700'}`}>X (Twitter)</span>
            </a>

            <a 
              href="#" 
              className={`flex items-center gap-3 p-4 rounded-lg border transition-all duration-300 group ${
                theme === 'dark'
                  ? 'border-gray-700 hover:border-pink-500 hover:bg-gray-700'
                  : 'border-gray-200 hover:border-pink-500 hover:bg-pink-50'
              }`}
            >
              <div className="w-10 h-10 bg-gradient-to-br from-pink-500 to-red-500 rounded-lg flex items-center justify-center text-white group-hover:scale-110 transition-transform">
                <FaInstagram size={18} />
              </div>
              <span className={`font-semibold ${theme === 'dark' ? 'text-gray-300' : 'text-gray-700'}`}>Instagram</span>
            </a>

            <a 
              href="#" 
              className={`flex items-center gap-3 p-4 rounded-lg border transition-all duration-300 group ${
                theme === 'dark'
                  ? 'border-gray-700 hover:border-blue-700 hover:bg-gray-700'
                  : 'border-gray-200 hover:border-blue-700 hover:bg-blue-50'
              }`}
            >
              <div className="w-10 h-10 bg-gradient-to-br from-blue-700 to-blue-800 rounded-lg flex items-center justify-center text-white group-hover:scale-110 transition-transform">
                <FaLinkedinIn size={18} />
              </div>
              <span className={`font-semibold ${theme === 'dark' ? 'text-gray-300' : 'text-gray-700'}`}>LinkedIn</span>
            </a>
          </div>
        </motion.div>
      </div>
      </div>
    </div>
  );
};

export default Contact;
