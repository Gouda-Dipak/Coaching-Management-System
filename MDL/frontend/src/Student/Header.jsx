import React, { useState, useEffect } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { FaArrowLeft, FaUserCircle, FaUser, FaSignOutAlt } from "react-icons/fa";
import Swal from "sweetalert2";

const routeTitles = {
  "/studentMenu/studentDashboard": "Student's Dashboard",
  "/studentMenu/studentDashboard/StudentGeneralRegister": "General Register",
  "/studentMenu/studentDashboard/studentClassDetails": "Class Details",
  "/studentMenu/studentDashboard/studentTimetable": "Time Table",
  "/studentMenu/studentDashboard/studentFees": "Fees",
  "/studentMenu/studentDashboard/studentAttendance": "Attendance",
  "/studentMenu/studentDashboard/studentHoliday": "Holiday",
  "/studentMenu/studentDashboard/studentLearningMaterial": "Learning Material",
  "/studentMenu/studentDashboard/studentResult": "Result",
  "/studentMenu/studentDashboard/studentPracticeTest": "Practice Test",
  "/studentMenu/studentDashboard/studentFeedback": "Feedback",
  "/studentMenu/studentDashboard/studentNotice": "Notice",
  "/studentMenu/studentDashboard/StudentAdminMeassages": "Messages"
};

const Header = ({ profileImage }) => {
  const location = useLocation();
  const navigate = useNavigate();
  const title = routeTitles[location.pathname] || "Student's Dashboard";
  const [dropdownOpen, setDropdownOpen] = useState(false);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (!event.target.closest(".dropdown-menu")) {
        setDropdownOpen(false);
      }
    };

    document.addEventListener("click", handleClickOutside);
    return () => document.removeEventListener("click", handleClickOutside);
  }, []);

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
      }
    });
  };

  return (
    <header className="bg-black text-white py-4 px-6 grid grid-cols-3 items-center shadow-md fixed top-0 left-0 w-full z-50">
      {/* Circular Back Button */}
      <button
        onClick={() => navigate(-1)}
        className="flex items-center justify-center w-10 h-10 rounded-full bg-white text-blue-500 shadow-md hover:bg-gray-200 transition"
      >
        <FaArrowLeft className="text-xl" />
      </button>

      {/* Title */}
      <h1 className="text-xl font-bold text-center">{title}</h1>

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
            <Link to="/studentMenu/studentProfile" className="flex items-center px-4 py-2 hover:bg-gray-200">
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
  );
};

export default Header;

