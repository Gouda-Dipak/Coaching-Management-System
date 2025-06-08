
import React from 'react';
import { NavLink } from 'react-router-dom';
import { FiGrid , FiLayers , FiUsers, FiInbox ,FiCalendar ,FiPlus , FiUser, FiLogOut, FiX, FiBookOpen, FiUserPlus, FiBell } from 'react-icons/fi';

const Sidebar = ({ isOpen, setIsOpen }) => {
    const Menus = [
        
        { title: "Dashboard", href: "/adminhome", icon: <FiGrid /> },
        { title: "Classes", href: "/addclasses", icon: <FiLayers /> },
        { title: "Subjects", href: "/addsubjects", icon: <FiBookOpen /> },
        { title: "Student", href: "/addstudents", icon: <FiUserPlus /> },
        { title: "Teachers", href: "/showclassTeacher", icon: <FiUsers /> },
        { title: "Timetables", href: "/timetable", icon: <FiCalendar /> },
        { title: "Notice", href: "/adminhome/addNotice", icon: <FiBell /> },
        { title: "Feedback", href: "/feedback", icon: <FiInbox /> },
        // { title: "Add Admin", href: "/addadmin", icon: <FiPlus /> },
        { title: "Profile", href: "/profile", gap: true, icon: <FiUser /> },
        { title: "Logout", href: "/adminlogout", icon: <FiLogOut /> },
    ];

    return (
        <>
            {/* Embedded CSS */}
            <style>
                {`
                    .custom-scrollbar::-webkit-scrollbar {
                        width: 6px;
                    }
                    .custom-scrollbar::-webkit-scrollbar-track {
                        background: black;
                    }
                    .custom-scrollbar::-webkit-scrollbar-thumb {
                        background: black;
                        border-radius: 10px;
                    }
                    .custom-scrollbar::-webkit-scrollbar-thumb:hover {
                        background: #222;
                    }
                    .custom-scrollbar {
                        scrollbar-color: black black;
                    }
                `}
            </style>

            <div className={` custom-scrollbar fixed left-0 top-0 h-screen w-72 bg-black text-white shadow-lg transition-transform duration-300 
                            ${isOpen ? "translate-x-0" : "-translate-x-full"} z-50`}>
                {/* Close Button */}
                <button onClick={() => setIsOpen(false)} className="absolute top-4 right-4 text-gray-300 text-2xl hover:text-white">
                    <FiX />
                </button>

                {/* Sidebar Content with Custom Scrollbar */}
                <div className="p-5 pt-12 h-full overflow-y-auto custom-scrollbar">
                    {/* Logo Section */}
                    <div className="flex items-center gap-4 mb-6">
                        <img
                            src="https://img.freepik.com/premium-vector/mdl-logo-mdl-letter-mdl-letter-logo-design-initials-mdl-logo-linked-with-circle-uppercase-monogram-logo-mdl-typography-technology-business-real-estate-brand_229120-65585.jpg"
                            className="w-10 h-10"
                            alt="Admin Logo"
                        />
                        <h1 className="text-xl font-medium">ADMIN</h1>
                    </div>

                    {/* Menu Items */}
                    <ul>
                        {Menus.map((Menu, index) => (
                            <li key={index}>
                                <NavLink
                                    to={Menu.href}
                                    className={({ isActive }) =>
                                        `flex items-center gap-x-4 p-3 text-gray-300 hover:bg-[#454649] rounded-md transition-all duration-300 
                                        ${Menu.gap ? "mt-9" : "mt-2"} 
                                        ${isActive ? "bg-[#454649] text-white" : ""}`
                                    }
                                >
                                    <span className="text-xl">{Menu.icon}</span>
                                    <span>{Menu.title}</span>
                                </NavLink>
                            </li>
                        ))}
                    </ul>
                </div>
            </div>
        </>
    );
};

export default Sidebar;
