import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { Megaphone, ArrowRightCircle, Code, Atom } from "lucide-react";
import {
  FaFacebookF,
  FaInstagram,
  FaTwitter,
  FaLinkedinIn,
  FaEnvelope,
  FaPhoneAlt,
  FaMapMarkerAlt,
} from "react-icons/fa";

const texts = ["Boards", "JEE", "NEET", "Coding", "and More!"];

function Home() {
  const [textIndex, setTextIndex] = useState(0);
  const [displayText, setDisplayText] = useState("");
  const [isDeleting, setIsDeleting] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => setIsLoading(false), 1500);
    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    const currentText = texts[textIndex];
    let typingSpeed = isDeleting ? 100 : 200;

    if (!isDeleting && displayText === currentText) {
      setTimeout(() => setIsDeleting(true), 1000);
    } else if (isDeleting && displayText === "") {
      setIsDeleting(false);
      setTextIndex((prev) => (prev + 1) % texts.length);
    }

    const timeout = setTimeout(() => {
      setDisplayText(
        isDeleting
          ? currentText.substring(0, displayText.length - 1)
          : currentText.substring(0, displayText.length + 1)
      );
    }, typingSpeed);

    return () => clearTimeout(timeout);
  }, [displayText, isDeleting, textIndex]);

  if (isLoading) {
    return (
      <div className="min-h-screen flex justify-center items-center bg-white">
        <motion.div
          animate={{ rotate: 360 }}
          transition={{ repeat: Infinity, duration: 1, ease: "linear" }}
          className="w-12 h-12 border-4 border-blue-500 border-t-transparent rounded-full"
        />
      </div>
    );
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8 }}
      className="min-h-screen bg-white flex flex-col items-center text-black"
    >
      {/* Navbar */}
      <nav className="bg-black shadow-lg p-4 flex justify-between items-center w-full text-white">
        <h1 className="text-4xl font-extrabold text-white hover:text-yellow-500 transition duration-300">
          MDL Coaching Classes
        </h1>
        <div className="flex space-x-4">
          {/* <Link
            to="/studentLogin"
            className="px-4 py-2 bg-blue-500 text-white font-semibold rounded-lg shadow-md hover:bg-blue-400 transition"
          >
            Contact Us
          </Link> */}
          <Link
            to="/roleSelection"
            className="px-4 py-2 bg-green-500 text-white font-semibold rounded-lg shadow-md hover:bg-green-400 transition"
          >
            Login
          </Link>
        </div>
      </nav>

      {/* 30% OFF Notice */}
      <div className="w-full bg-red-500 text-white text-center py-3 font-bold text-lg flex items-center justify-center space-x-3">
        <Megaphone size={24} />
        <span>Limited Time Offer: Get 30% OFF on all Courses!</span>
        <Link
          to="/studentLogin"
          className="bg-yellow-400 text-black font-semibold px-4 py-2 rounded-lg shadow-md hover:bg-yellow-300 transition flex items-center"
        >
          Enroll Now <ArrowRightCircle className="ml-2" size={20} />
        </Link>
      </div>

      {/* Heading */}
      <motion.h2
        className="text-5xl font-extrabold text-yellow-500 hover:text-yellow-400 transition duration-300 mt-3 text-center"
        initial={{ opacity: 0, y: -50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
      >
        Welcome to the MDL Coaching Classes!
      </motion.h2>

      {/* Typing Text */}
      <div className="w-full md:w-1/2 text-black text-center mt-6 md:mt-0">
        <motion.h3
          className="text-3xl font-semibold mt-2 text-green-500"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.3 }}
        >
          <span className="text-black">Learn</span>{" "}
          <span className="text-red-500">{displayText}</span>
          <span className="text-black">|</span>
        </motion.h3>
        <p className="text-2xl font-light mt-4 text-gray-700">
          With our expert guidance & structured courses, achieve your academic
          dreams effortlessly.
        </p>
      </div>

      {/* Courses Heading */}
      <motion.h2
        className="text-5xl font-bold text-center mt-5 text-black"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
      >
        Our Top Courses
      </motion.h2>

      {/* Course Cards */}
      <div className="flex flex-wrap justify-center gap-6 mt-6 mb-5 px-4">
        {[
          {
            name: "JEE & JEE Adv. Preparation",
            icon: Atom,
            bg: "bg-blue-300",
            desc: "Crack JEE with expert mentoring, mock tests & in-depth concept clarity.",
          },
          {
            name: "NEET Preparation",
            icon: Atom,
            bg: "bg-green-300",
            desc: "Master Biology, Physics & Chemistry with NEET-focused study plans.",
          },
          {
            name: "Full-Stack Coding",
            icon: Code,
            bg: "bg-purple-300",
            desc: "Build real-world apps and websites using modern technologies.",
          },
        ].map(({ name, icon: Icon, bg, desc }) => (
          <motion.div
            key={name}
            className={`${bg} p-6 rounded-lg shadow-lg transform transition duration-500 hover:scale-110 cursor-pointer relative w-72 text-center`}
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.95 }}
          >
            <span className="absolute top-0 left-0 bg-red-500 text-white text-xs font-bold px-3 py-1 rounded-br-lg">
              30% OFF
            </span>
            <Icon size={50} className="text-black mx-auto mb-3" />
            <h3 className="text-3xl font-bold text-black">{name}</h3>
            <p className="text-gray-700 mt-2">{desc}</p>
          </motion.div>
        ))}
      </div>

      {/* Footer */}
      <footer className="bg-black text-white py-10 w-full mt-32">
        <div className="container mx-auto px-6 grid grid-cols-1 md:grid-cols-3 gap-8 text-center md:text-left">
          <div>
            <h3 className="text-xl font-bold mb-4">About Us</h3>
            <p className="text-gray-400">
              MDL Coaching Classes provides top-quality education for Boards,
              JEE, NEET, and Coding. Our expert instructors ensure student
              success.
            </p>
          </div>

          <div>
            <h3 className="text-xl font-bold mb-4">Quick Links</h3>
            <ul className="text-gray-400 space-y-2">
              <li>
                <Link to="/" className="hover:text-gray-200">
                  Home
                </Link>
              </li>
              <li>
                <Link to="/studentLogin" className="hover:text-gray-200">
                  About Us
                </Link>
              </li>
              <li>
                <Link to="/studentLogin" className="hover:text-gray-200">
                  Courses
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="text-xl font-bold mb-4">Contact Us</h3>
            <p className="flex items-center justify-center md:justify-start space-x-2 text-gray-400">
              <FaMapMarkerAlt />
              <span>100, Sapphire apartments, Godadara, Surat, India</span>
            </p>
            <p className="flex items-center justify-center md:justify-start space-x-2 text-gray-400 mt-2">
              <FaPhoneAlt />
              <span>+91 9898565650</span>
            </p>
            <p className="flex items-center justify-center md:justify-start space-x-2 text-gray-400 mt-2">
              <FaEnvelope />
              <span>mdlcoaching@gmail.com</span>
              </p>
    
          </div>
        </div>

        <div className="flex justify-center space-x-6 mt-6">
          <Link to="https://www.facebook.com" className="text-gray-400 hover:text-white">
            <FaFacebookF size={24} />
          </Link>
          <Link to="https://www.instagram.com" className="text-gray-400 hover:text-white">
            <FaInstagram size={24} />
          </Link>
          <Link to="https://x.com" className="text-gray-400 hover:text-white">
            <FaTwitter size={24} />
          </Link>
          <Link to="https://in.linkedin.com" className="text-gray-400 hover:text-white">
            <FaLinkedinIn size={24} />
          </Link>
        </div>

        <p className="text-center text-gray-500 mt-6 text-sm">
          &copy; {new Date().getFullYear()} MDL Coaching Classes. All rights
          reserved.
        </p>
      </footer>
    </motion.div>
  );
}

export default Home;
