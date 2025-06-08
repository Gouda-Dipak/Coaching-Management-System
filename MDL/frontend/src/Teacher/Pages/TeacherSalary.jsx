import { useState } from "react";
import { FaRupeeSign, FaDownload, FaCheckCircle, FaTimesCircle } from "react-icons/fa";
import { motion } from "framer-motion";
import Swal from "sweetalert2";
import Header from "../Header";
import Footer from "../Footer";

const TeacherSalary = () => {
  const currentMonth = new Date().toLocaleString("default", { month: "long" });
  const currentYear = new Date().getFullYear().toString();

  const months = [
    "January", "February", "March"
  ];
  
  const salaryStatus = {
    January: true,
    February: true,
    March: false,
  };
  
  function handleDownload(month) {
    if (!salaryStatus[month]) {
      Swal.fire({
        title: `Salary for ${month} Not Available`,
        text: "Your salary has not been credited yet.",
        icon: "error",
        confirmButtonColor: "#d33",
      });
      return;
    }
    
    Swal.fire({
      title: `Downloading ${month} Receipt`,
      text: "Your salary receipt is being downloaded.",
      icon: "success",
      confirmButtonColor: "#4CAF50",
    });
  }

  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      <div className="flex flex-col items-center flex-grow bg-gray-100 p-6">
        <h1 className="text-4xl font-bold text-gray-800 mb-6">Salary Details</h1>
        
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 w-full h-screen max-w-6xl">
          {months.map((month, index) => (
            <motion.div 
              key={index} 
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5, delay: index * 0.2 }}
              whileHover={{ 
                scale: 1.1, 
                boxShadow: "0px 15px 25px rgba(0, 0, 0, 0.3)",
                backgroundColor: "#f8fafc", 
                rotate: [0, 2, -2, 2, 0] 
              }}
              className={`bg-white shadow-2xl p-10 rounded-3xl flex flex-col items-center transition-shadow w-80 h-96 ${month === currentMonth ? "border-4 border-blue-500" : ""}`}
            >
              <FaRupeeSign className={`text-8xl mb-6 animate-pulse ${salaryStatus[month] ? "text-green-500" : "text-red-500"}`} />
              <h2 className="text-3xl font-semibold text-gray-700">{month} {currentYear}</h2>
              <p className="text-xl text-gray-600 mt-3">
                <FaRupeeSign className="inline-block" /> 2000 (Approx)
              </p>
              <div className="flex items-center gap-4 mt-4">
                {salaryStatus[month] ? (
                  <FaCheckCircle className="text-green-500 text-3xl" />
                ) : (
                  <FaTimesCircle className="text-red-500 text-3xl" />
                )}
                <span className="text-gray-800 font-medium text-xl">
                  {salaryStatus[month] ? "Credited" : "Not Credited"}
                </span>
              </div>
              <motion.button 
                whileTap={{ scale: 0.9 }}
                className={`mt-6 px-8 py-4 flex items-center gap-4 rounded-xl text-xl font-medium transition-all duration-300 ${salaryStatus[month] ? "bg-green-500 text-white hover:bg-green-700" : "bg-gray-400 text-gray-700 cursor-not-allowed"}`}
                onClick={() => handleDownload(month)}
                disabled={!salaryStatus[month]}
              >
                <FaDownload /> Download Receipt
              </motion.button>
            </motion.div>
          ))}
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default TeacherSalary;
