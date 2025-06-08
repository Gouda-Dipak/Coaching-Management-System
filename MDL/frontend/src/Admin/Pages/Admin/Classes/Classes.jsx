import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import Header from "../Home/Header";
import Footer from "../Home/Footer";
import axios from "axios";
import { toast,ToastContainer } from "react-toastify";

function Classes() {
  const navigate = useNavigate();
  const [isFocused, setIsFocused] = useState(false);
  const [cookiesAccepted, setCookiesAccepted] = useState(false);
  const [inputValue, setInputValue] = useState("");

  const handleClick = async (e) => {
    e.preventDefault();
    
    // Validation for class name (only letters and spaces allowed)
    const classNamePattern = /^[A-Za-z\s]+$/;
    if (!classNamePattern.test(inputValue.trim())) {
      toast.error("Class name should contain only letters and spaces", {
        position: "top-center",
        autoClose: 2000,
      });
      return;
    }

    try {
      const url = "https://mdl-coaching.onrender.com/class/addclass";
      const response = await axios.post(
        url,
        { className: inputValue },
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      
      const { message, success, error } = await response.data;
      if (success) {
        toast.success(message, {
          position: "top-center",
          autoClose: 2000,
        });
        setTimeout(() => {
          navigate("/addclasses/showclasses");
        }, 1000);
      } else {
        toast.error(error || message, {
          position: "top-center",
          autoClose: 2000,
        });
      }
    } catch (error) {
      toast.error("An error occurred. Please try again.", {
        position: "top-center",
        autoClose: 2000,
      });
    }
  };

  return (
    <>
      <div className="flex flex-col min-h-screen">
        <Header />
        <div className="flex flex-1 bg-[#454649] p-5 sm:p-7 md:p-14 justify-center items-center min-h-screen">
          <div className="bg-white shadow-lg rounded-lg p-8 w-full max-w-3xl">
            <h1 className="text-3xl font-bold text-gray-700 mb-6 text-center">Add a New Class</h1>
            
            {/* Image Display */}
            <div className="flex justify-center mb-6">
              <img
                src="https://media.istockphoto.com/id/1457355344/video/animated-spanish-language-lesson.jpg?s=640x640&k=20&c=ZkQUk7638k3G__1ApQ3zWQ7DVHi2gi5k-yg2WapJFhA="
                alt="Add Class"
                className="w-full h-56 object-cover rounded-lg shadow-md"
              />
            </div>
            
            <div className="relative mb-6">
              <input
                type="text"
                id="className"
                value={inputValue}
                onChange={(e) => {
                  const value = e.target.value;
                  if (/^[A-Za-z\s]*$/.test(value)) {
                    setInputValue(value);
                  } else {
                    toast.error("Class name should contain only letters and spaces", {
                      position: "top-center",
                      autoClose: 2000,
                    });
                  }
                }}
                onFocus={() => setIsFocused(true)}
                onBlur={() => setIsFocused(inputValue !== "")}
                title="Only letters and spaces are allowed"
                className={`w-full px-3 pt-4 pb-2 border border-gray-300 rounded-lg shadow-sm transition duration-300 ease-in-out focus:ring-2 focus:ring-blue-500 focus:border-blue-500 focus:scale-105 peer ${
                  cookiesAccepted ? "bg-white" : "bg-black text-white"
                }`}
              />
              <label
                htmlFor="className"
                className={`absolute left-3 text-white transition-all duration-300 bg-black px-1 ${
                  isFocused || inputValue
                    ? "top-0 transform -translate-y-1/2 text-sm text-blue-500"
                    : "top-1/2 transform -translate-y-1/2 text-base text-gray-500"
                }`}
              >
                Class Name
              </label>
            </div>
            <div className="flex flex-col gap-4">
              <button
                onClick={handleClick}
                className="w-full bg-blue-600 text-white py-2 px-6 rounded-lg hover:bg-blue-700"
              >
                Create
              </button>
              <Link
                to="/addclasses"
                className="w-full text-center bg-gray-500 text-white py-2 px-6 rounded-lg hover:bg-gray-600"
              >
                Go Back
              </Link>
            </div>
          </div>
        </div>
        <ToastContainer/>
        <Footer />
      </div>
    </>
  );
}

export default Classes;