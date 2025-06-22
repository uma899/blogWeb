import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';



// Main App component
const Test = () => {
  // State for responsive navigation toggle
  const [isNavOpen, setIsNavOpen] = useState(false);

  // Animation variants for sections
  const sectionVariants = {
    hidden: { opacity: 0, y: 50 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.8, ease: "easeOut" } },
  };

  // Animation variants for individual items
  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: "easeOut" } },
  };

  // Ensure body scroll is managed when nav is open/closed on mobile
  useEffect(() => {
    if (isNavOpen) {
      document.body.style.overflow = 'hidden'; // Prevent scrolling when nav is open
    } else {
      document.body.style.overflow = 'unset'; // Allow scrolling when nav is closed
    }
    // Cleanup function
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [isNavOpen]);

  return (
    // Outer container with Inter font, min-h-screen for full height, and background
    <div className="min-h-screen bg-gradient-to-br from-purple-100 via-blue-100 to-indigo-100 font-['Inter'] text-gray-800">
      {/* Navigation Bar */}
      <nav className="bg-white shadow-lg p-4 sticky top-0 z-50 rounded-b-xl">
        <div className="container mx-auto flex justify-between items-center">
          {/* Logo/Brand Name */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5 }}
            className="text-2xl font-bold text-indigo-700"
          >
            MyPWA
          </motion.div>

          {/* Desktop Navigation Links */}
          <div className="hidden md:flex space-x-6">
            <a href="#home" className="text-gray-600 hover:text-indigo-700 transition-colors duration-300">Home</a>
            <a href="#features" className="text-gray-600 hover:text-indigo-700 transition-colors duration-300">Features</a>
            <a href="#about" className="text-gray-600 hover:text-indigo-700 transition-colors duration-300">About</a>
            <a href="#contact" className="text-gray-600 hover:text-indigo-700 transition-colors duration-300">Contact</a>
          </div>

          {/* Mobile Navigation Toggle */}
          <div className="md:hidden">
            <button
              onClick={() => setIsNavOpen(!isNavOpen)}
              className="text-gray-600 hover:text-indigo-700 focus:outline-none"
              aria-label="Toggle navigation"
            >
              {isNavOpen ? (
                // Close icon (X)
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12"></path></svg>
              ) : (
                // Hamburger icon
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16"></path></svg>
              )}
            </button>
          </div>
        </div>

        {/* Mobile Navigation Menu */}
        {isNavOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }} // Exit animation for when it closes
            className="md:hidden mt-4 space-y-4 bg-white p-4 rounded-b-lg shadow-inner absolute left-0 w-full"
            style={{ top: '100%' }} // Position right below the nav bar
          >
            <a href="#home" onClick={() => setIsNavOpen(false)} className="block text-gray-600 hover:text-indigo-700 transition-colors duration-300">Home</a>
            <a href="#features" onClick={() => setIsNavOpen(false)} className="block text-gray-600 hover:text-indigo-700 transition-colors duration-300">Features</a>
            <a href="#about" onClick={() => setIsNavOpen(false)} className="block text-gray-600 hover:text-indigo-700 transition-colors duration-300">About</a>
            <a href="#contact" onClick={() => setIsNavOpen(false)} className="block text-gray-600 hover:text-indigo-700 transition-colors duration-300">Contact</a>
          </motion.div>
        )}
      </nav>

      {/* Main Content Area */}
      <main className="container mx-auto px-4 py-8">

        {/* Hero Section */}
        <section id="home" className="flex flex-col md:flex-row items-center justify-between py-16 text-center md:text-left">
          <motion.div
            variants={sectionVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.5 }}
            className="md:w-1/2 mb-8 md:mb-0"
          >
            <motion.h1
              variants={itemVariants}
              className="text-4xl sm:text-5xl lg:text-6xl font-extrabold text-indigo-800 leading-tight mb-4"
            >
              Experience the Future of Web Apps
            </motion.h1>
            <motion.p
              variants={itemVariants}
              className="text-lg sm:text-xl text-gray-600 mb-6 max-w-lg mx-auto md:mx-0"
            >
              Seamlessly blending native app feel with web accessibility, our PWA is designed for speed and convenience.
            </motion.p>
            <motion.button
              variants={itemVariants}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="bg-indigo-600 text-white px-8 py-3 rounded-full text-lg font-semibold shadow-lg hover:bg-indigo-700 transition-all duration-300"
            >
              Learn More
            </motion.button>
          </motion.div>
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, delay: 0.5, ease: "easeOut" }}
            className="md:w-1/2 flex justify-center"
          >
            {/* Placeholder Image (responsive) */}
            <img
              src="https://placehold.co/600x400/93C5FD/FFFFFF?text=Awesome+PWA"
              alt="PWA Illustration"
              className="rounded-xl shadow-2xl max-w-full h-auto"
              onError={(e) => { e.target.onerror = null; e.target.src="https://placehold.co/600x400/93C5FD/FFFFFF?text=Image+Failed+to+Load"; }}
            />
          </motion.div>
        </section>

        {/* Features Section */}
        <section id="features" className="py-16">
          <motion.h2
            variants={sectionVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.5 }}
            className="text-3xl sm:text-4xl font-bold text-center text-indigo-800 mb-12"
          >
            Key Features
          </motion.h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {/* Feature Card 1 */}
            <motion.div
              variants={itemVariants}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, amount: 0.3 }}
              className="bg-white p-8 rounded-xl shadow-xl hover:shadow-2xl transition-shadow duration-300 text-center"
            >
              <div className="text-indigo-600 mb-4">
                <svg className="w-12 h-12 mx-auto" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M11 4a2 2 0 114 0v1a1 1 0 001 1h3m-6 0h-1a1 1 0 00-1 1v1a1 1 0 001 1h1M4 20h16a2 2 0 002-2V6a2 2 0 00-2-2H4a2 2 0 00-2 2v12a2 2 0 002 2z"></path></svg>
              </div>
              <h3 className="text-xl font-semibold mb-3 text-indigo-700">Offline Access</h3>
              <p className="text-gray-600">Enjoy full functionality even without an internet connection, thanks to robust caching.</p>
            </motion.div>

            {/* Feature Card 2 */}
            <motion.div
              variants={itemVariants}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, amount: 0.3 }}
              className="bg-white p-8 rounded-xl shadow-xl hover:shadow-2xl transition-shadow duration-300 text-center"
            >
              <div className="text-indigo-600 mb-4">
                <svg className="w-12 h-12 mx-auto" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 10V3L4 14h7v7l9-11h-7z"></path></svg>
              </div>
              <h3 className="text-xl font-semibold mb-3 text-indigo-700">Blazing Fast</h3>
              <p className="text-gray-600">Optimized for speed, delivering a lightning-fast user experience on any device.</p>
            </motion.div>

            {/* Feature Card 3 */}
            <motion.div
              variants={itemVariants}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, amount: 0.3 }}
              className="bg-white p-8 rounded-xl shadow-xl hover:shadow-2xl transition-shadow duration-300 text-center"
            >
              <div className="text-indigo-600 mb-4">
                <svg className="w-12 h-12 mx-auto" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z"></path></svg>
              </div>
              <h3 className="text-xl font-semibold mb-3 text-indigo-700">Push Notifications</h3>
              <p className="text-gray-600">Stay engaged with timely updates and important alerts, just like a native app.</p>
            </motion.div>
          </div>
        </section>

        {/* About Section */}
        <section id="about" className="py-16 bg-white rounded-xl shadow-xl p-8 my-8">
          <motion.h2
            variants={sectionVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.5 }}
            className="text-3xl sm:text-4xl font-bold text-center text-indigo-800 mb-8"
          >
            About Our Vision
          </motion.h2>
          <motion.p
            variants={itemVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.3 }}
            className="text-lg text-gray-600 leading-relaxed text-center max-w-3xl mx-auto"
          >
            We believe in creating web experiences that are not only accessible from any device but also deliver the rich, immersive feel of native applications. Our PWA leverages cutting-edge web technologies to provide a secure, fast, and highly reliable service to our users. We are committed to continuous improvement, integrating the latest advancements to ensure our application remains at the forefront of web innovation.
          </motion.p>
        </section>

        {/* Contact Section */}
        <section id="contact" className="py-16">
          <motion.h2
            variants={sectionVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.5 }}
            className="text-3xl sm:text-4xl font-bold text-center text-indigo-800 mb-8"
          >
            Get in Touch
          </motion.h2>
          <motion.div
            variants={itemVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.3 }}
            className="max-w-md mx-auto bg-white p-8 rounded-xl shadow-xl"
          >
            <form className="space-y-6">
              <div>
                <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-1">Name</label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                  placeholder="Your Name"
                />
              </div>
              <div>
                <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">Email</label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                  placeholder="you@example.com"
                />
              </div>
              <div>
                <label htmlFor="message" className="block text-sm font-medium text-gray-700 mb-1">Message</label>
                <textarea
                  id="message"
                  name="message"
                  rows="4"
                  className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                  placeholder="Your message..."
                ></textarea>
              </div>
              <button
                type="submit"
                className="w-full bg-indigo-600 text-white px-6 py-3 rounded-md text-lg font-semibold shadow-lg hover:bg-indigo-700 transition-all duration-300"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                Send Message
              </button>
            </form>
          </motion.div>
        </section>

      </main>

      {/* Footer */}
      <footer className="bg-gray-800 text-white p-8 text-center mt-12 rounded-t-xl">
        <p>&copy; {new Date().getFullYear()} MyPWA. All rights reserved.</p>
        <div className="flex justify-center space-x-4 mt-4">
          <a href="#" className="text-gray-400 hover:text-white transition-colors duration-300">Privacy Policy</a>
          <a href="#" className="text-gray-400 hover:text-white transition-colors duration-300">Terms of Service</a>
        </div>
      </footer>
    </div>
  );
};

export default Test;

// Required for Tailwind CSS
// NOTE: In a real React app, Tailwind would be set up via postcss and webpack.
// For this single-file immersive, we simulate it with a script tag.
