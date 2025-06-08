import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { FaUser, FaLock, FaIdCard, FaEnvelope } from "react-icons/fa";
import { toast, ToastContainer } from "react-toastify";

function StudentLogin() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    s_id: "",
    email: "",
    password: "",
  });
  const [errors, setErrors] = useState({});

  const validateForm = () => {
    let formErrors = {};
    if (!formData.s_id) formErrors.s_id = "Student ID is required.";
    if (!formData.email) formErrors.email = "Email is required.";
    if (!formData.password) formErrors.password = "Password is required.";
    else if (formData.password.length < 6)
      formErrors.password = "Password must be at least 6 characters long.";
    setErrors(formErrors);
    return Object.keys(formErrors).length === 0;
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const { s_id, email, password } = formData;

    try {
      const url = "https://mdl-coaching.onrender.com/student/login";
      const response = await fetch(url, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      const result = await response.json();
      const { message, success, jwttoken, name, email, _id, error, s_class } = result;
      // console.log("The logged user data :: " + result);
      console.log(formData);
      if (success) {
        toast.success(message, {
          position: "top-center",
          autoClose: 2000,
        });
        localStorage.setItem("email", email);
        localStorage.setItem("token", jwttoken);
        localStorage.setItem("name", name);
        localStorage.setItem("studentid", _id);
        localStorage.setItem("studentclass", s_class);
        setTimeout(() => {
          navigate("/studentMenu");
        }, 1000);
      } else if (error) {
        const details = error?.details[0].message;
        toast.error(details, {
          position: "top-center",
          autoClose: 2000,
        });
      } else if (!success) {
        toast.error(message, {
          position: "top-center",
          autoClose: 2000,
        });
      }
    } catch (error) {
      toast.error(error, {
        position: "top-center",
        autoClose: 2000,
      });
    }
  };

  return (
    <div className="min-h-screen flex justify-center items-center bg-gradient-to-r from-purple-600 via-pink-500 to-red-500 p-4">
      <motion.div
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5 }}
        className="bg-white p-8 rounded-lg shadow-xl w-full max-w-md"
      >
        <h1 className="text-4xl font-bold text-center mb-6 text-gray-800">
          Login
        </h1>
        <form className="space-y-6">
          <div>
            <label className="block text-gray-700 font-medium mb-2">
              Student ID
            </label>
            <div className="flex items-center border border-gray-300 rounded-md p-3 focus-within:ring-4 focus-within:ring-purple-500 transition">
              <FaIdCard className="text-gray-500 mr-3" />
              <input
                type="text"
                name="s_id"
                value={formData.s_id || ""}
                onChange={handleChange}
                placeholder="Enter Student ID"
                className="w-full outline-none"
              />
            </div>
            {errors.s_id && (
              <p className="text-red-500 text-sm mt-2">{errors.s_id}</p>
            )}
          </div>
          <div>
            <label className="block text-gray-700 font-medium mb-2">
              Email
            </label>
            <div className="flex items-center border border-gray-300 rounded-md p-3 focus-within:ring-4 focus-within:ring-purple-500 transition">
              <FaEnvelope className="text-gray-500 mr-3" />
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                placeholder="Enter Email"
                className="w-full outline-none"
              />
            </div>
            {errors.email && (
              <p className="text-red-500 text-sm mt-2">{errors.email}</p>
            )}
          </div>
          <div>
            <label className="block text-gray-700 font-medium mb-2">
              Password
            </label>
            <div className="flex items-center border border-gray-300 rounded-md p-3 focus-within:ring-4 focus-within:ring-purple-500 transition">
              <FaLock className="text-gray-500 mr-3" />
              <input
                type="password"
                name="password"
                value={formData.password}
                onChange={handleChange}
                placeholder="Enter Password"
                className="w-full outline-none"
              />
            </div>
            {errors.password && (
              <p className="text-red-500 text-sm mt-2">{errors.password}</p>
            )}
          </div>
          {/* <Link to="/studentMenu"> */}
          <motion.button
            type="button"
            onClick={handleSubmit}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="w-full mt-5 py-3 bg-gradient-to-r from-purple-500 to-pink-500 text-white font-semibold rounded-md hover:from-pink-600 hover:to-red-500 transition shadow-lg"
          >
            Login
          </motion.button>
          {/* </Link> */}
          <p className="text-center text-gray-600">
          First time here? Explore MDL Coaching (offline) and unlock your potential today!
          </p>
          <ToastContainer />
        </form>
      </motion.div>
    </div>
  );
}

export default StudentLogin;
