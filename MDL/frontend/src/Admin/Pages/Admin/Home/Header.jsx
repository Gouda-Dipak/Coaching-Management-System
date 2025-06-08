import React, { useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { FiUser, FiMenu, FiArrowLeft, FiLogOut } from "react-icons/fi";
import Sidebar from './../../Sidebar';

function Header() {
    const [isOpen, setIsOpen] = useState(false);
    const [profileMenuOpen, setProfileMenuOpen] = useState(false);
    const location = useLocation();
    const navigate = useNavigate();

    const pageTitles = {
        '/adminhome': 'Dashboard',
        '/adminhome/viewnotes':"Dashboard",
        '/adminhome/updatenotice':"Dashboard",
        '/addclasses': 'Classes',
        '/addclasses/class': 'Classes',
        '/addclasses/showclasses': 'Classes',
        '/addstudents': 'Students',
        '/addstudents/studentform': 'Students',
        '/addstudents/showstudentdetails':"Students",
        '/addstudents/showstudentdetails/studentdetails':"Students",
        '/addstudents/showstudentdetails/studentdetails/feedetails':"Students",
        '/addstudents/showstudentdetails/studentdetails/updatestudentdetailes':"Students",
        '/addstudents/showstudentdetails/studentdetails/displaystudentdetailes':"Students",
        '/showclassTeacher': 'Teachers',
        '/showclassTeacher/showallteacherlist':"Teachers",
        '/showclassTeacher/showallteacherlist/updatetecherdetails':"Teachers",
        '/showclassTeacher/showallteacherlist/showprofile':"Teachers",
        '/showclassTeacher/showallteacherlist/salarydetails':"Teachers",
        '/showclassTeacher/addteacher':"Teachers",
        '/showclassTeacher/showtecherslist':"Teachers",
        '/addsubjects': 'Subjects',
        '/addsubjects/showsubjects':'Subjects',
        '/notes': 'Notice',
        '/feedback': 'FeedBack',
        '/profile': 'Profile',
        '/adminlogout': 'Logout',
        '/timetable':"Time tables",
        // '/addadmin':"Add Admin"
    };

    return (
        <div>
            <header className="fixed top-0 left-0 w-full bg-black text-white p-4 flex justify-between items-center z-40 shadow-md">
                <div className="flex items-center gap-4">
                    <button onClick={() => setIsOpen(true)} className="text-white text-2xl">
                        <FiMenu />
                    </button>
                    <button onClick={() => navigate(-1)} className="text-white text-2xl">
                        <FiArrowLeft />
                    </button>
                </div>

                <div className="text-xl font-bold uppercase tracking-wide text-gray-200">
    {pageTitles[location.pathname] || 'Admin Dashboard'}
</div>


                <div className="relative">
                    <button onClick={() => setProfileMenuOpen(!profileMenuOpen)} className="text-white text-2xl">
                        <FiUser />
                    </button>
                    {profileMenuOpen && (
                        <div className="absolute right-0 mt-2 w-40 bg-white shadow-lg rounded-lg text-black">
                            <Link to="/profile" className="flex items-center px-4 py-2 hover:bg-gray-200">
                                <FiUser className="mr-2" /> Profile
                            </Link>
                            <Link to="/adminlogout" className="flex items-center px-4 py-2 hover:bg-gray-200">
                                <FiLogOut className="mr-2" /> Logout
                            </Link>
                        </div>
                    )}
                </div>
            </header>

            <div className="flex">
                <Sidebar isOpen={isOpen} setIsOpen={setIsOpen} />
            </div>
        </div>
    );
}

export default Header;