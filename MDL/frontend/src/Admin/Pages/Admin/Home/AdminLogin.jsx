import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { FaEye, FaEyeSlash } from "react-icons/fa";

function AdminLogin() {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const { email, password } = formData;

    try {
      const url = "https://mdl-coaching.onrender.com/admin/login";
      const response = await fetch(url, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      const result = await response.json();
      const { message, success, jwttoken, name, email, _id, error } = result;
      console.log("The logged user data :: " + result);
      if (success) {
        toast.success(message, {
          position: "top-center",
          autoClose: 2000,
        });
        localStorage.setItem("email", result.email);
        localStorage.setItem("token", jwttoken);
        localStorage.setItem("name", name);
        localStorage.setItem("AdminId", _id);
        setTimeout(() => {
          navigate("/adminhome");
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
    <div className="flex items-center justify-center min-h-screen px-4 bg-gray-900">
      <form
        onSubmit={handleSubmit}
        className="bg-gray-800 p-6 md:p-8 rounded-xl shadow-lg w-full max-w-md text-center animate-fade-in"
      >
        <h1 className="text-2xl md:text-3xl font-bold text-white mb-6">
          <span className="text-2xl md:text-3xl font-bold text-yellow-400 mb-6">A</span>
          dmin Login
        </h1>

        {/* Email Input */}
        <div className="relative mb-6">
          <input
            type="email"
            name="email"
            id="email"
            value={formData.email}
            onChange={handleChange}
            className="peer w-full px-4 py-2 bg-gray-700 text-white border border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-300 ease-in-out"
          />
          <label
            htmlFor="email"
            className={`absolute left-4 px-1 bg-gray-700 text-gray-400 transition-all duration-300 ease-in-out
                            ${formData.email
                ? "-top-4 text-blue-400 bg-gray-800 scale-90"
                : "top-2 peer-focus:-top-4 peer-focus:text-blue-400 peer-focus:bg-gray-800 peer-focus:scale-90"
              } 
                        text-sm`}
          >
            Email
          </label>
        </div>

        {/* Password Input */}
        <div className="relative mb-6">
          <input
            type={showPassword ? "text" : "password"}
            name="password"
            id="password"
            value={formData.password}
            onChange={handleChange}
            className="peer w-full px-4 py-2 bg-gray-700 text-white border border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-pink-500 focus:border-transparent pr-10 transition-all duration-300 ease-in-out"
          />
          <label
            htmlFor="password"
            className={`absolute left-4 px-1 bg-gray-700 text-gray-400 transition-all duration-300 ease-in-out
                            ${formData.password
                ? "-top-4 text-pink-400 bg-gray-800 scale-90"
                : "top-2 peer-focus:-top-4 peer-focus:text-pink-400 peer-focus:bg-gray-800 peer-focus:scale-90"
              } 
                        text-sm`}
          >
            Password
          </label>
          <button
            type="button"
            onClick={togglePasswordVisibility}
            className="absolute right-4 top-3 text-gray-400 hover:text-white transition-all duration-300 ease-in-out"
          >
            {showPassword ? <FaEyeSlash /> : <FaEye />}
          </button>
        </div>

        {/* Forgot Password Link */}
        <div className="text-right mb-4">
          <Link
            to="/forgotpassword"
            className="text-blue-400 hover:underline text-sm transition-all duration-200 ease-in-out"
          >
            Forgot Password?
          </Link>
        </div>

        {/* Login Button */}

        <button
          type="submit"
          className="w-full bg-gradient-to-r from-purple-500 to-indigo-600 text-white py-2 px-4 rounded-lg shadow-md hover:from-purple-600 hover:to-indigo-700 transform hover:scale-105 transition-all duration-300 ease-in-out font-semibold"
        >
          Login
        </button>

        {/* Register Link */}
        <p className="text-gray-400 mt-4">
          Don't have an account?{" "}
          <Link
            to="/adminregistration"
            className="text-pink-400 hover:underline font-semibold transition-all duration-200 ease-in-out"
          >
            Register Here
          </Link>
        </p>
      </form>
      <ToastContainer />
    </div>
  );
}

export default AdminLogin;
