import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import Header from '../Home/Header';
import Footer from '../Home/Footer';
import { AiOutlineUserAdd, AiOutlineEye } from 'react-icons/ai';

// Dotted Loading Component
const LoadingDots = () => {
    return (
        <div className="flex justify-center items-center space-x-2 mt-4">
            <div className="w-2 h-2 bg-yellow-400 rounded-full animate-bounce [animation-delay:-0.3s]"></div>
            <div className="w-2 h-2 bg-yellow-400 rounded-full animate-bounce [animation-delay:-0.15s]"></div>
            <div className="w-2 h-2 bg-yellow-400 rounded-full animate-bounce"></div>
        </div>
    );
};

function AddStudents() {
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const timer = setTimeout(() => {
            setLoading(false);
        }, 2000); // Show loading for 2 seconds
        return () => clearTimeout(timer);
    }, []);

    return (
        <>
            <div className="flex flex-col min-h-screen bg-[#454649]">
                {/* Header */}
                <Header />

                {/* Main Content */}
                <div className="flex flex-1 items-center justify-center bg-[#454649] p-5 sm:p-7 md:p-10 min-h-screen">
                    <div className="w-full max-w-xl bg-black p-5 sm:p-6 rounded-lg shadow-2xl text-center">
                        <h1 className="text-2xl font-bold text-yellow-400 mb-4">Add Students</h1>

                        {loading ? (
                            <LoadingDots />
                        ) : (
                            <>
                                <img
                                    src="https://thumbs.dreamstime.com/b/elementary-school-kids-group-diverse-age-isolated-white-background-33263146.jpg"
                                    alt="School"
                                    className="w-full h-70 object-cover rounded-lg shadow-md mb-4"
                                />
                                <div className="space-y-4">
                                    <Link to="/addstudents/studentform"
                                        className="flex items-center justify-center bg-green-700 text-white font-bold py-2 px-5 rounded-lg shadow-lg hover:bg-green-800 transition duration-300">
                                        <AiOutlineUserAdd className="text-xl mr-2" /> Add Student
                                    </Link>
                                    <Link to="/addstudents/showstudentdetails"
                                        className="flex items-center justify-center bg-blue-700 text-white font-bold py-2 px-5 rounded-lg shadow-lg hover:bg-blue-800 transition duration-300">
                                        <AiOutlineEye className="text-xl mr-2" /> Show Student Details
                                    </Link>
                                </div>
                            </>
                        )}
                    </div>
                </div>

                {/* Footer */}
                <Footer />
            </div>
        </>
    );
}

export default AddStudents;
