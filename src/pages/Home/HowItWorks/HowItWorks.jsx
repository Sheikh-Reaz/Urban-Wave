import React from "react";
import { motion } from "framer-motion";
import { FaShoppingCart, FaIndustry, FaCheckCircle, FaTruck } from "react-icons/fa";
import backgroundImage from "../../../assets/background.jpg";

const steps = [
  {
    id: 1,
    title: "Place Your Order",
    description: "Select your desired garment and submit your order online with ease.",
    icon: <FaShoppingCart className="text-red-500 text-5xl mb-4" />,
  },
  {
    id: 2,
    title: "Production Starts",
    description: "Our team starts the production process, tracking each stage carefully.",
    icon: <FaIndustry className="text-red-500 text-5xl mb-4" />,
  },
  {
    id: 3,
    title: "Quality Check",
    description: "Each garment undergoes a thorough quality check before packing.",
    icon: <FaCheckCircle className="text-red-500 text-5xl mb-4" />,
  },
  {
    id: 4,
    title: "Delivery",
    description: "Receive your order on time, with real-time tracking available.",
    icon: <FaTruck className="text-red-500 text-5xl mb-4" />,
  },
];

const HowItWorks = () => {
  return (
    <section
      className="py-16 bg-cover bg-center relative"
      style={{ backgroundImage: `url(${backgroundImage})` }}
    >
      <div className="absolute inset-0  bg-opacity-50"></div>
      <div className="relative max-w-7xl mx-auto px-6 text-center">
        <h2 className="text-3xl md:text-4xl font-bold text-white mb-6">
          How It Works
        </h2>
        <p className="text-gray-200 mb-12 max-w-2xl mx-auto">
          Follow these simple steps to get your garments from order to delivery seamlessly.
        </p>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-8">
          {steps.map((step, index) => (
            <motion.div
              key={step.id}
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.2 }}
              className=" p-6 rounded-xl shadow-lg flex flex-col items-center text-center hover:scale-105 transition-transform duration-300"
            >
              {step.icon}
              <h3 className="text-xl font-semibold text-gray-800 dark:text-white mb-2">
                {step.title}
              </h3>
              <p className="text-gray-600 dark:text-gray-300">{step.description}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default HowItWorks;
