import React from "react";
import { Link } from "react-router-dom";
import Header from "../Header";
import Footer from "../Footer";
import { FaRegUser, FaRegCalendar,FaBell,FaComment  , FaRegClock, FaDollarSign, FaClipboard, FaRegCalendarAlt, FaBook, FaAward, FaQuestionCircle, FaRegCommentDots } from "react-icons/fa";

const menuItems = [
  { to: "/studentMenu/studentDashboard/StudentGeneralRegister", label: "General Register", icon: FaRegUser, color: "bg-blue-500 hover:bg-blue-600" },
  { to: "/studentMenu/studentDashboard/studentClassDetails", label: "Class Details", icon: FaRegCalendar, color: "bg-green-500 hover:bg-green-600" },
  { to: "/studentMenu/studentDashboard/studentTimetable", label: "Time Table", icon: FaRegClock, color: "bg-purple-500 hover:bg-purple-600" },
  { to: "/studentMenu/studentDashboard/studentFees", label: "Fees", icon: FaDollarSign, color: "bg-red-500 hover:bg-red-600" },
  { to: "/studentMenu/studentDashboard/studentAttendance", label: "Attendance", icon: FaClipboard, color: "bg-teal-500 hover:bg-teal-600" },
  { to: "/studentMenu/studentDashboard/studentHoliday", label: "Holiday", icon: FaRegCalendarAlt, color: "bg-yellow-500 hover:bg-yellow-600" },
  { to: "/studentMenu/studentDashboard/studentLearningMaterial", label: "Learning Material", icon: FaBook, color: "bg-indigo-500 hover:bg-indigo-600" },
  { to: "/studentMenu/studentDashboard/studentResult", label: "Result", icon: FaAward, color: "bg-pink-500 hover:bg-pink-600" },
  { to: "/studentMenu/studentDashboard/studentPracticeTest", label: "Practice Test", icon: FaQuestionCircle, color: "bg-blue-500 hover:bg-blue-600" },
  { to: "/studentMenu/studentDashboard/studentFeedback", label: "Feedback", icon: FaRegCommentDots, color: "bg-teal-500 hover:bg-teal-600" },
  { to: "/studentMenu/studentDashboard/studentNotice", label: "Notice", icon: FaBell, color: "bg-red-500 hover:bg-red-600" },
  { to: "/studentMenu/studentDashboard/StudentAdminMeassages", label: "Messages", icon: FaComment   , color:  "bg-blue-500 hover:bg-blue-600"}
];

const StudentDashboard = () => {
  return (
    <div className="flex flex-col h-screen">
      {/* Header will now dynamically change based on route */}
      <Header />

      {/* Scrollable Main Content */}
      <div className="flex-grow">
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4 w-full p-5 mt-16 min-h-screen">
          {menuItems.map((item, index) => (
            <Link
              key={index}
              to={item.to} // Clicking will navigate to the route
              className={`flex flex-col items-center p-6 rounded-lg shadow-md transform hover:scale-105 transition-all duration-300 ${item.color}`}
            >
              <item.icon className="w-16 h-16 text-white mb-4" />
              <h3 className="text-white text-lg font-semibold">{item.label}</h3>
            </Link>
          ))}
        </div>
      </div>

      {/* Fixed Footer */}
      <Footer />
    </div>
  );
};

export default StudentDashboard;
