import { motion } from 'framer-motion';
import { Users, Target, Zap, Award, ArrowRight, Rocket, Lightbulb, Shield, Layers } from 'lucide-react';
import { useState } from 'react';

export default function AboutUs() {
  const [hoveredCard, setHoveredCard] = useState(null);

  // Floating animation
  const floatingVariants = {
    animate: {
      y: [0, -20, 0],
      transition: {
        duration: 4,
        repeat: Infinity,
        ease: "easeInOut",
      },
    },
  };

  // Pulse animation
  const pulseVariants = {
    animate: {
      scale: [1, 1.05, 1],
      transition: {
        duration: 2,
        repeat: Infinity,
      },
    },
  };

  // Rotating border
  const rotatingBorder = {
    animate: {
      rotate: 360,
      transition: {
        duration: 8,
        repeat: Infinity,
        linear: true,
      },
    },
  };

  // Text reveal
  const textVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: (i) => ({
      opacity: 1,
      y: 0,
      transition: {
        delay: i * 0.05,
        duration: 0.8,
        ease: "easeOut",
      },
    }),
  };

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.15,
        delayChildren: 0.1,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, scale: 0.8, y: 40 },
    visible: {
      opacity: 1,
      scale: 1,
      y: 0,
      transition: { duration: 0.8, ease: "easeOut" },
    },
  };

  const features = [
    {
      icon: <Rocket className="w-10 h-10" />,
      title: "Lightning Fast",
      desc: "Real-time production tracking with zero latency updates",
      number: "01",
    },
    {
      icon: <Target className="w-10 h-10" />,
      title: "Precision Control",
      desc: "Advanced order management with granular control",
      number: "02",
    },
    {
      icon: <Lightbulb className="w-10 h-10" />,
      title: "Smart Analytics",
      desc: "AI-powered insights for better decision making",
      number: "03",
    },
    {
      icon: <Shield className="w-10 h-10" />,
      title: "Secure Platform",
      desc: "Enterprise-grade security for your data",
      number: "04",
    },
    {
      icon: <Users className="w-10 h-10" />,
      title: "Team Collaboration",
      desc: "Seamless communication across departments",
      number: "05",
    },
    {
      icon: <Layers className="w-10 h-10" />,
      title: "Scalable Solution",
      desc: "Grows with your business needs",
      number: "06",
    },
  ];

  const stats = [
    { number: "500+", label: "Active Users", symbol: "👥" },
    { number: "10K+", label: "Orders Processed", symbol: "📦" },
    { number: "50+", label: "Partner Factories", symbol: "🏭" },
    { number: "99.9%", label: "System Uptime", symbol: "⚡" },
  ];

  const timeline = [
    { year: "2023", event: "Platform Launch", desc: "Started with vision to revolutionize garment industry" },
    { year: "2024", event: "Expansion Phase", desc: "Onboarded 50+ factories and 500+ active users" },
    { year: "2025", event: "AI Integration", desc: "Added smart analytics and predictive features" },
  ];

  return (
    <div className="w-full outlet-color text-color overflow-hidden transition-colors duration-300">
      {/* Animated Background Elements */}
      <div className="fixed inset-0 pointer-events-none overflow-hidden">
        <motion.div
          className="absolute top-10 left-10 w-64 h-64 border-4 border-red-600 rounded-full opacity-20 dark:opacity-20"
          animate={{ rotate: 360 }}
          transition={{ duration: 20, repeat: Infinity, linear: true }}
        />
        <motion.div
          className="absolute bottom-20 right-10 w-80 h-80 border-4 border-red-500 rounded-full opacity-10 dark:opacity-10"
          animate={{ rotate: -360 }}
          transition={{ duration: 25, repeat: Infinity, linear: true }}
        />
        <motion.div
          className="absolute top-1/2 left-1/2 w-96 h-96 border-2 border-red-600 rounded-full opacity-5 dark:opacity-5"
          animate={{ scale: [1, 1.2, 1] }}
          transition={{ duration: 8, repeat: Infinity }}
        />
      </div>

      {/* Hero Section */}
      <motion.section className="relative pt-32 pb-24 px-4 sm:px-8 lg:px-16 overflow-hidden">
        <div className="max-w-7xl mx-auto relative z-10">
          <motion.div
            className="text-center space-y-8"
            variants={containerVariants}
            initial="hidden"
            animate="visible"
          >
            {/* Glitch Effect Title */}
            <motion.div className="relative mb-8">
              <motion.h1
                className="title-font text-5xl sm:text-6xl lg:text-7xl font-black "
                animate={{ y: [0, -5, 0] }}
                transition={{ duration: 3, repeat: Infinity }}
              >
                GARMENTS
              </motion.h1>
              <motion.h1
                className="title-font text-5xl sm:text-6xl lg:text-7xl font-black leading-tight text-transparent bg-clip-text bg-linear-to-r from-red-600 to-red-800"
                animate={{ y: [0, 5, 0] }}
                transition={{ duration: 3, repeat: Infinity, delay: 0.2 }}
              >
                TRACKER
              </motion.h1>
              <motion.div
                className="absolute -bottom-2 left-1/2 transform -translate-x-1/2 w-96 h-1 bg-linear-to-r from-red-600 via-red-500 to-transparent"
                animate={{ scaleX: [0.5, 1, 0.5] }}
                transition={{ duration: 3, repeat: Infinity }}
              />
            </motion.div>

            <motion.p
              variants={itemVariants}
              className="text-xl sm:text-2xl text-gray-600  max-w-4xl mx-auto leading-relaxed font-light tracking-wide"
            >
              Where <span className="text-red-500 font-bold">precision</span> meets <span className="text-red-500 font-bold">innovation</span>. Transform your garment production into a seamless, intelligent operation.
            </motion.p>
          </motion.div>

          {/* Floating Elements */}

        </div>
      </motion.section>

      {/* Divider */}
      <motion.div
        className="h-1 bg-linear-to-r from-transparent via-red-600 to-transparent"
        animate={{ opacity: [0.5, 1, 0.5] }}
        transition={{ duration: 2, repeat: Infinity }}
      />

      {/* Features Grid */}
      <motion.section
        className="py-32 px-4 sm:px-8 lg:px-16 relative z-10"
        variants={containerVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-100px" }}
      >
        <div className="max-w-7xl mx-auto">
          <motion.div
            variants={itemVariants}
            className="text-center mb-20"
          >
            <h2 className="title-font text-5xl sm:text-6xl font-black mb-4">
              WHY <span className="text-red-600">WE DOMINATE</span>
            </h2>
            <div className="w-32 h-1 bg-linear-to-r from-red-600 to-red-800 mx-auto" />
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {features.map((feature, idx) => (
              <motion.div
                key={idx}
                variants={itemVariants}
                onHoverStart={() => setHoveredCard(idx)}
                onHoverEnd={() => setHoveredCard(null)}
                className="relative group cursor-pointer h-full"
              >
                <div className="relative p-8 h-full  border-2 border-red-600 dark:border-red-600 group-hover:shadow-lg dark:group-hover:shadow-red-600/50 transition-all duration-500">
                  <motion.div
                    animate={{ y: [0, -8, 0] }}
                    transition={{ duration: 3, repeat: Infinity, ease: "easeInOut", delay: idx * 0.2 }}
                    className="mb-4 inline-block text-red-600 dark:text-red-500"
                  >
                    {feature.icon}
                  </motion.div>

                  <div className="text-6xl font-black text-red-600 dark:text-red-600  mb-2">{feature.number}</div>

                  <h3 className="title-font text-2xl font-black mb-3 text-black dark:text-white group-hover:text-red-600 dark:group-hover:text-red-500 transition-colors">
                    {feature.title}
                  </h3>

                  <p className="text-gray-700 dark:text-gray-400 leading-relaxed group-hover:text-gray-900 dark:group-hover:text-gray-200 transition-colors">
                    {feature.desc}
                  </p>

                  <motion.div
                    className="mt-6 w-8 h-0.5 bg-red-600 dark:bg-red-600"
                    animate={hoveredCard === idx ? { width: 32 } : { width: 32 }}
                    transition={{ duration: 0.3 }}
                  />
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </motion.section>

      {/* Stats Section with Heavy Animation */}
<motion.section
  className="py-32 px-4 sm:px-8 lg:px-16 relative z-10"
  variants={containerVariants}
  initial="hidden"
  whileInView="visible"
  viewport={{ once: true, margin: "-100px" }}
>
  <div className="max-w-7xl mx-auto">
    <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
      {stats.map((stat, idx) => (
        <motion.div
          key={idx}
          variants={itemVariants}
          className="relative group"
        >

          <div className="relative p-8 text-center border-2 border-red-600 group-hover:shadow-lg  transition-all duration-300">
            <p className="text-4xl font-black mb-2">{stat.symbol}</p>
            <h4 className="title-font text-4xl sm:text-5xl font-black text-red-600 dark:text-red-500 mb-2">
              {stat.number}
            </h4>
            <p className="text-gray-700 dark:text-gray-400 font-bold tracking-wide">
              {stat.label}
            </p>
          </div>
        </motion.div>
      ))}
    </div>
  </div>
</motion.section>


      {/* Timeline Section */}
      <motion.section
        className="py-32 px-4 sm:px-8 lg:px-16 relative z-10"
        variants={containerVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-100px" }}
      >
        <div className="max-w-5xl mx-auto">
          <motion.div variants={itemVariants} className="text-center mb-20">
            <h2 className="title-font text-5xl sm:text-6xl font-black mb-4">
              OUR <span className="text-red-600">JOURNEY</span>
            </h2>
            <div className="w-32 h-1 bg-linear-to-r from-red-600 to-red-800 mx-auto" />
          </motion.div>

          <div className="space-y-8">
            {timeline.map((item, idx) => (
              <motion.div
                key={idx}
                variants={itemVariants}
                className="border-l-4 border-red-600 pl-8 py-4 relative group cursor-pointer"
              >
                <motion.div
                  className="absolute -left-5 -top-2 w-8 h-8 bg-red-600 border-2 border-black rounded-full"
                  animate={{ scale: [1, 1.3, 1] }}
                  transition={{ duration: 2, repeat: Infinity, delay: idx * 0.3 }}
                />
                <p className="text-red-600 text-sm font-black tracking-widest mb-1">{item.year}</p>
                <h3 className="title-font text-3xl font-black text-white mb-2 group-hover:text-red-600 transition-colors">
                  {item.event}
                </h3>
                <p className="text-gray-400 leading-relaxed">{item.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </motion.section>

      {/* CTA Section */}
      <motion.section
        className="py-32 px-4 sm:px-8 lg:px-16 relative z-10"
        variants={containerVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-100px" }}
      >
        <div className="max-w-5xl mx-auto">
          <motion.div
            variants={itemVariants}
            className="border-4 border-red-600 bg-black p-12 sm:p-16 text-center relative overflow-hidden"
          >
            <motion.div
              className="absolute inset-0 bg-linear-to-r from-red-600/10 to-transparent"
              animate={{ x: [-100, 100] }}
              transition={{ duration: 3, repeat: Infinity }}
            />

            <div className="relative z-10">
              <motion.h2
                variants={itemVariants}
                className="title-font text-4xl sm:text-5xl font-black mb-6 text-white"
              >
                READY TO <span className="text-red-600">REVOLUTIONIZE</span>?
              </motion.h2>

              <motion.p
                variants={itemVariants}
                className="text-xl text-gray-300 mb-10 leading-relaxed"
              >
                Join the future of garment production. Let's transform your workflow together.
              </motion.p>

              <motion.button
                variants={itemVariants}
                whileHover={{ scale: 1.08, boxShadow: "0 0 40px rgba(220, 38, 38, 1)" }}
                whileTap={{ scale: 0.95 }}
                className="bg-red-600 hover:bg-red-700 text-white px-12 py-5 text-xl font-black border-2 border-red-600 transition-all duration-300 relative overflow-hidden group"
              >
                <motion.span
                  className="absolute inset-0 bg-red-700"
                  initial={{ x: "100%" }}
                  whileHover={{ x: 0 }}
                  transition={{ duration: 0.3 }}
                  style={{ zIndex: -1 }}
                />
                START YOUR FREE TRIAL NOW
                <ArrowRight className="inline ml-3 w-6 h-6 group-hover:translate-x-1 transition-transform" />
              </motion.button>
            </div>
          </motion.div>
        </div>
      </motion.section>

      {/* Bottom Divider */}
      <motion.div
        className="h-1 bg-lineargradient-to-r from-red-600 via-red-500 to-transparent"
        animate={{ opacity: [0.5, 1, 0.5] }}
        transition={{ duration: 2, repeat: Infinity }}
      />
    </div>
  );
}