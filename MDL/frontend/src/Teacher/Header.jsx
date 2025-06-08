import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import { FaBars, FaCog, FaSignOutAlt, FaArrowLeft } from "react-icons/fa";
import Sidebar from "./Sidebar";

const routeTitles = {
  "/teacherNotice": "Notice",
  "/teacherClass": "Class",
  "/teacherNotes": "Notes",
  "/teacherAttendance": "Attendance",
  "/teacherTimeSchedule": "Time Table",
  "/teacherAssignment": "Assignment",
  "/teacherProfile": "Profile",
  "/teacherSalary": "Salary",
  "/teacherAttendencedisplay":"Attendence"
};

const Header = ({ profileImage }) => {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [userImage, setUserImage] = useState(
    localStorage.getItem("profileImage") ||
      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcS1DIpd1kz9a3U1oAhsaqV9SSWCEuBl67kTfw&s"
  );
  const title = routeTitles[location.pathname] || "Teacher's Dashboard";
  const navigate = useNavigate();

  useEffect(() => {
    if (profileImage) {
      setUserImage(profileImage);
    }
  }, [profileImage]);

  const toggleSidebar = () => {
    setSidebarOpen(!sidebarOpen);
  };

  function Logout(event) {
    event.preventDefault();
    Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, Logout",
    }).then((result) => {
      if (result.isConfirmed) {
        localStorage.removeItem("email")
        localStorage.removeItem("token")
        localStorage.removeItem("name")
        localStorage.removeItem("t_id")
        localStorage.removeItem("photo")
        Swal.fire({
          title: "Logged out",
          text: "You logged out successfully",
          icon: "success",
        }).then(() => {
          window.location.href = "/";
        });
      }
    });
  }

  return (
    <>
      <header className="bg-black text-white p-4 shadow-md flex items-center justify-between sticky top-0 w-full z-50">
        <div className="flex items-center space-x-2">
          {/* Sidebar Toggle Button */}
          <button onClick={toggleSidebar} className="p-2 bg-neutral-500 rounded-lg hover:bg-gray-400">
            <FaBars size={22} />
          </button>
          {/* Back Button */}
          <button onClick={() => navigate(-1)} className="p-2 bg-neutral-500 rounded-lg hover:bg-gray-400">
            <FaArrowLeft size={22} />
          </button>
          
          
        </div>

        {/* Centered Title (Responsive) */}
        <h1 className="text-xl md:text-2xl font-bold absolute left-1/2 transform -translate-x-1/2 whitespace-nowrap">
          {title}
        </h1>

        {/* Navigation & Profile Image */}
        <nav className="flex items-center space-x-4 md:space-x-6">
          {/* <Link to="/settings" className="flex items-center gap-2 hover:text-white transition text-sm md:text-base">
            <FaCog size={18} /> <span className="hidden sm:inline">Settings</span>
          </Link> */}

          <Link to="/" onClick={Logout} className="flex items-center gap-2 hover:text-white transition text-sm md:text-base">
            <FaSignOutAlt size={18} /> <span className="hidden sm:inline">Logout</span>
          </Link>

          {/* Profile Image */}
          <Link to="/teacherProfile" className="w-8 h-8 md:w-10 md:h-10 rounded-full overflow-hidden border-2 border-white shadow-lg">
            <img src={userImage} alt="Profile" className="w-full h-full object-cover" />
          </Link>
        </nav>
      </header>

      {/* Sidebar Component */}
      <Sidebar isOpen={sidebarOpen} toggleSidebar={toggleSidebar} />
    </>
  );
};

export default Header;
