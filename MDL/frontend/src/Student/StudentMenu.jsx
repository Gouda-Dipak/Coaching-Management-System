import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
// import img from "./Images/img1.png";
import p from "./Images/p.png";
import wallet from "./Images/profile.png";
import home from "./Images/home.png";
import Footer from "./Footer";
import { FaUserCircle, FaUser, FaSignOutAlt } from "react-icons/fa";
import Swal from "sweetalert2";
import axios from "axios";

export const StudentMenu = ({ profileImage }) => {
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const navigate = useNavigate();

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
        localStorage.removeItem("email")
        localStorage.removeItem("token")
        localStorage.removeItem("name")
        localStorage.removeItem("studentid")
        localStorage.removeItem("studentclass")
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
      <header className="bg-black text-white py-4 px-6 grid grid-cols-3 items-center shadow-md fixed top-0 left-0 w-full z-50">
        {/* Logo */}
        <div className="flex justify-start">
          <img
            src="https://img.freepik.com/premium-vector/mdl-logo-mdl-letter-mdl-letter-logo-design-initials-mdl-logo-linked-with-circle-uppercase-monogram-logo-mdl-typography-technology-business-real-estate-brand_229120-65585.jpg"
            alt="Logo"
            className="h-8 w-auto sm:h-10 ml-2"
          />
        </div>

        {/* Title */}
        <h1 className="text-xl font-bold text-center"></h1>

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
      <div className="flex flex-col items-center justify-center flex-grow min-h-screen mt-10">
        <div className="bg-white p-6 sm:p-8 rounded-lg shadow-lg w-full max-w-sm sm:max-w-md md:max-w-lg text-center transition duration-500 transform hover:scale-105">
          <div className="mb-6">
            <div className="flex justify-center mb-4">
              <img
                // src={img}
                src={`https://mdl-coaching.onrender.com/images/${students.passphoto}`}
                alt="profile"
                className="w-20 h-20 sm:w-24 sm:h-24 rounded-full object-cover transition duration-500 transform hover:scale-110"
              />
            </div>
            <div>
              <label className="block text-lg sm:text-xl font-semibold text-gray-800">
                {students.fname + " " + students.mname + " " + students.lname}
              </label>
              <label className="block text-sm text-gray-600"><b>id:</b> <strong>{students.s_id}</strong> </label>
              <label className="block text-sm text-gray-600"><b>class:</b>{students.s_class}</label>
            </div>
          </div>

          <div className="space-y-4">
            {[
              {
                to: "/studentMenu/studentDashboard",
                label: "Student Dashboard",
                imgSrc: home,
              },
              {
                to: "/studentMenu/studentPayment",
                label: "Quick Payment",
                imgSrc: wallet,
              },
              {
                to: "/studentMenu/studentDigitalI_card",
                label: "Digital ID Card",
                imgSrc: p,
              },
            ].map((item, index) => (
              <Link
                key={index}
                to={item.to}
                className="group flex items-center py-2 px-4 rounded-lg text-gray-800 font-medium transition-all duration-300 transform hover:scale-105 hover:bg-gray-200 hover:text-blue-600"
              >
                <img
                  src={item.imgSrc}
                  alt={item.label}
                  className="w-8 h-8 sm:w-10 sm:h-10 rounded-full mr-4 transition duration-500 transform group-hover:scale-125"
                />
                {item.label} →
              </Link>
            ))}
          </div>
        </div>
      </div>

      {/* Footer */}
      <Footer />
    </div>
  );
};
