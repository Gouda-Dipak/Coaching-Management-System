import React, { useState, useEffect } from "react";
import {
  FaEye,
  FaEdit,
  FaUserCircle,
  FaUser,
  FaSignOutAlt,
  FaArrowLeft,
} from "react-icons/fa";
import { Link, useNavigate } from "react-router-dom";
import Footer from "../Footer";
import Swal from "sweetalert2";
import axios from "axios";

function StudentDigitalICard({ profileImage }) {
  const [image, setImage] = useState(localStorage.getItem("") || null);
  const [showOptions, setShowOptions] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    if (image) {
      localStorage.setItem("profileImage", image);
    }
  }, [image]);

  const handleImageUpload = (event) => {
    const file = event.target.files[0];
    if (file) {
      const imageUrl = URL.createObjectURL(file);
      setImage(imageUrl);
      localStorage.setItem("profileImage", imageUrl);
    }
  };

  const handleLogout = () => {
    Swal.fire({
      title: "Are you sure?",
      text: "You will be logged out!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: "Logout",
      cancelButtonText: "Cancel",
      confirmButtonColor: "#d33",
      cancelButtonColor: "#3085d6",
    }).then((result) => {
      if (result.isConfirmed) {
        navigate("/"); // Redirect to home after logout
      }
    });
  };

  useEffect(() => {
    profile();
  }, []);
  const [students, setstudents] = useState([]);
  const profile = async () => {
    try {
      const studentid = localStorage.getItem("studentid");
      const res = await axios.get(
        `https://mdl-coaching.onrender.com/student/getstudentdetails/${studentid}`
      );
      console.log(res.data);
      setstudents(res.data.data);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="flex flex-col min-h-screen">
      {/* Header */}
      <header className="bg-black text-white py-4 px-6 grid grid-cols-3 items-center shadow-md fixed top-0 left-0 w-full z-50">
        {/* Back Button */}
        <button
          onClick={() => window.history.back()}
          className="p-2 bg-white text-blue-500 rounded-full shadow-md hover:bg-gray-200 transition flex items-center justify-center w-10 h-10"
        >
          <FaArrowLeft className="text-xl" />
        </button>

        {/* Title */}
        <h1 className="text-xl font-bold text-center">Student I-Card</h1>

        {/* Profile Image with Dropdown */}
        <div className="relative flex justify-end dropdown-menu">
          <button
            onClick={() => setDropdownOpen(!dropdownOpen)}
            className="focus:outline-none"
          >
            {profileImage ? (
              <img
                src={profileImage}
                alt="Profile"
                className="h-10 w-10 rounded-full border-2 border-white object-cover cursor-pointer"
              />
            ) : (
              <FaUserCircle className="text-white text-3xl cursor-pointer hover:text-gray-200 transition mr-2" />
            )}
          </button>

          {/* Dropdown Menu */}
          {dropdownOpen && (
            <div className="absolute top-full right-0 mt-2 w-40 bg-white text-black rounded-lg shadow-md">
              <Link
                to="/studentMenu/studentProfile"
                className="flex items-center px-4 py-2 hover:bg-gray-200"
              >
                <FaUser className="mr-2" /> Profile
              </Link>
              <button
                onClick={handleLogout}
                className="flex items-center px-4 py-2 w-full text-left hover:bg-gray-200"
              >
                <FaSignOutAlt className="mr-2" /> Logout
              </button>
            </div>
          )}
        </div>
      </header>

      {/* Main Content */}
      <div className="flex-grow flex items-center justify-center p-24">
        <div className="bg-white text-gray-900 shadow-xl rounded-2xl w-96 p-10 border-4 border-indigo-600 relative">
          <div className="flex flex-col items-center">
            {/* Profile Image Section */}
            <div
              className="relative w-36 h-36 border-4 border-indigo-600 bg-gray-300 rounded-full overflow-hidden shadow-lg cursor-pointer flex items-center justify-center"
              onMouseEnter={() => setShowOptions(true)}
              onMouseLeave={() => setShowOptions(false)}
            >
              <img
                className="w-full h-full object-cover"
                src={`https://mdl-coaching.onrender.com/images/${students.passphoto}`}
                alt="Student"
              />
              {showOptions && (
                <div className="absolute inset-0 flex items-center justify-center bg-black bg-opacity-50 space-x-4">
                  <FaEye
                    className="text-white text-2xl cursor-pointer"
                    title="View"
                    onClick={() => setIsModalOpen(true)}
                  />
                  <label htmlFor="imageUpload">
                    <FaEdit
                      className="text-white text-2xl cursor-pointer"
                      title="Change"
                    />
                  </label>
                </div>
              )}
            </div>
            <input
              id="imageUpload"
              type="file"
              accept="image/*"
              onChange={handleImageUpload}
              className="hidden"
            />

            {/* Student Details */}
            <div className="mt-4 text-center">
              <h3 className="text-2xl font-bold text-indigo-800">
                {students.fname + " " + students.mname + " " + students.lname}
              </h3>
              <p className="text-indigo-600 text-md font-semibold">
                🆔 Student ID: {students.s_id}
              </p>
            </div>
          </div>

          {/* Student Info */}
          <div className="mt-4 border-t border-gray-300 pt-4 text-left space-y-3">
            <p className="text-gray-700 text-lg">
              <strong>📍 Class:</strong>
              {students.s_class}
            </p>
            <p className="text-gray-700 text-lg">
              <strong>📍 Address:</strong>
              {students.adress}
            </p>
            <p className="text-gray-700 text-lg">
              <strong>📞 Mobile:</strong> +91 {students.mobilenumber}
            </p>
            <p className="text-gray-700 text-lg">
              <strong>🏫 Coaching Name:</strong> MDl Coching
            </p>
          </div>

          {/* Validity Date */}
          <div className="mt-4 text-center bg-indigo-600 text-white py-3 rounded-md shadow-md">
            <p className="text-lg font-semibold">📅 Valid Until: 12/2025</p>
          </div>
        </div>
      </div>

      {/* Image View Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
          <div className="bg-white p-6 rounded-xl shadow-xl w-80 text-center">
            <img
              className="w-full h-auto rounded-lg"
              src={image || "https://via.placeholder.com/100"}
              alt="Student"
            />
            <button
              className="mt-4 px-6 py-2 bg-indigo-600 text-white rounded-lg shadow-md"
              onClick={() => setIsModalOpen(false)}
            >
              OK
            </button>
          </div>
        </div>
      )}

      {/* Footer */}
      <Footer />
    </div>
  );
}

export default StudentDigitalICard;
