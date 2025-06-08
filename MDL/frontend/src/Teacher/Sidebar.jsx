import { motion } from "framer-motion";
import { Link, useLocation } from "react-router-dom";
import {
  FaHome,
  FaBook,
  FaClipboardList,
  FaChalkboardTeacher,
  FaFileAlt,
  FaCalendarAlt,
  FaMoneyBillAlt,
  FaTimes,
} from "react-icons/fa";

const sidebarVariants = {
  hidden: { x: -250, opacity: 0 },
  visible: {
    x: 0,
    opacity: 1,
    transition: { duration: 0.5, ease: "easeInOut", when: "beforeChildren", staggerChildren: 0.2 },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: -20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.3 } },
};

const Sidebar = ({ isOpen, toggleSidebar, updateHeaderTitle }) => {
  const location = useLocation();

  function handleItemClick(title) {
    updateHeaderTitle(title);
    toggleSidebar();
  }

  return (
    <motion.aside
      variants={sidebarVariants}
      initial="hidden"
      animate={isOpen ? "visible" : "hidden"}
      className="fixed top-0 left-0 h-full w-64 bg-transparent backdrop-blur-md text-black shadow-2xl z-50"
    >
      {/* Sidebar Header */}
      <div className="flex justify-between items-center p-4 border-b border-gray-700">
        <h2 className="text-xl font-bold text-white bg-clip-text">
          Menu
        </h2>
        <button
          onClick={toggleSidebar}
          className="p-2 bg-red-500 rounded-full hover:bg-red-700 transition duration-300"
        >
          <FaTimes size={20} />
        </button>
      </div>

      {/* Navigation Links */}
      <motion.nav className="mt-4">
        <motion.ul>
          <SidebarItem to="/teacherDashboard" icon={<FaHome size={20} />} text="Home" onClick={handleItemClick} active={location.pathname === "/teacherDashboard"} />
          <SidebarItem to="/teacherNotes" icon={<FaBook size={20} />} text="Notes" onClick={handleItemClick} active={location.pathname === "/teacherNotes"} />
          <SidebarItem to="/teacherAssignment" icon={<FaClipboardList size={20} />} text="Assignments" onClick={handleItemClick} active={location.pathname === "/teacherAssignment"} />
          <SidebarItem to="/teacherClass" icon={<FaChalkboardTeacher size={20} />} text="Classes" onClick={handleItemClick} active={location.pathname === "/teacherClass"} />
          <SidebarItem to="/teacherAttendence" icon={<FaFileAlt size={20} />} text="Attendance" onClick={handleItemClick} active={location.pathname === "/teacherAttendence"} />
          <SidebarItem to="/teacherTimeSchedule" icon={<FaCalendarAlt size={20} />} text="Timetable" onClick={handleItemClick} active={location.pathname === "/teacherTimeSchedule"} />
          <SidebarItem to="/teacherNotice" icon={<FaFileAlt size={20} />} text="Notices" onClick={handleItemClick} active={location.pathname === "/teacherNotice"} />
          <SidebarItem to="/teacherSalary" icon={<FaMoneyBillAlt size={20} />} text="Salary" onClick={handleItemClick} active={location.pathname === "/teacherSalary"} />
        </motion.ul>
      </motion.nav>
    </motion.aside>
  );
};

// SidebarItem Component with Individual Animations
const SidebarItem = ({ to, icon, text, onClick, active }) => {
  return (
    <motion.li
      variants={itemVariants}
      className={`group p-3 flex items-center gap-3 rounded-lg transition-all duration-300 relative overflow-hidden ${active ? 'bg-gray-700 text-white' : ''}`}
    >
      <Link to={to} className="flex items-center w-full relative z-10" onClick={() => onClick(text)}>
        {icon}
        <span className="ml-2 text-lg">{text}</span>
      </Link>

      {/* Hover Background Animation */}
      <div className="absolute inset-0 bg-white opacity-0 group-hover:opacity-100 transition-all duration-500 rounded-lg"></div>

      {/* Icon and Text Scale Animation */}
      <span className="absolute inset-0 flex items-center pl-3 text-white transition-all duration-500 transform group-hover:scale-110 group-hover:text-white">
        {icon}
      </span>
    </motion.li>
  );
};

export default Sidebar;
