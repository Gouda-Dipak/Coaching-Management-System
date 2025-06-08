import React from "react";
import { useNavigate } from "react-router-dom";
import Header from "../Home/Header";
import Footer  from "../Home/Footer";

function LogOut() {
    const navigate = useNavigate();

    const handleLogout = () => {
        // Logic for logging out (e.g., clearing tokens, redirecting)
        console.log("User logged out");
        localStorage.removeItem("email")
        localStorage.removeItem("token")
        localStorage.removeItem("name")
        localStorage.removeItem("AdminId")
        navigate("/"); // Redirect to login page
    };

    const handleCancel = () => {
        navigate(-1); // Navigate back to the previous page
    };

    return (
        <>
            <div className="flex flex-col min-h-screen">
                {/* Header */}
                <Header />

                {/* Main Content */}
                <div className="flex flex-1 min-h-screen">
                    {/* Sidebar */}
                    
                    <div className="flex-1 bg-[#454649] p-5 sm:p-7 md:p-14">
                    <div className="p-7 flex flex-col items-center justify-center h-[550px] space-y-6">
                            <h1 className="text-3xl font-bold text-white mb-6">
                                Are you sure you want to log out?
                            </h1>
                            <div className="flex space-x-4">
                                {/* Logout Button */}
                                <button
                                    onClick={handleLogout}
                                    className="px-6 py-3 bg-red-600 text-white font-semibold rounded-lg shadow-lg hover:bg-red-700 transform transition duration-300 hover:scale-105"
                                >
                                    Log Out
                                </button>
                                {/* Cancel Button */}
                                <button
                                    onClick={handleCancel}
                                    className="px-6 py-3 bg-gray-300 text-gray-800 font-semibold rounded-lg shadow-lg hover:bg-gray-400 transform transition duration-300 hover:scale-105"
                                >
                                    Cancel
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
                <Footer/>
            </div>
        </>
    );
}

export default LogOut;
