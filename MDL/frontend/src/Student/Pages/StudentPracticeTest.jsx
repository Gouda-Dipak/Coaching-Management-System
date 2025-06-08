import React from "react";
import Header from "../Header";
import Footer from "../Footer";

const subjects = [
  { name: "Mathematics", color: "bg-blue-500" },
  { name: "Science", color: "bg-green-500" },
  { name: "English", color: "bg-purple-500" },
  { name: "History", color: "bg-red-500" },
  { name: "Geography", color: "bg-yellow-500" },
  { name: "Computer Science", color: "bg-pink-500" },
];

const StudentPracticeTest = () => {
  return (
    <div className="flex flex-col min-h-screen bg-gray-100">
      {/* Header */}
      <Header />

      {/* Main Content */}
      <div className="flex-grow flex flex-col items-center p-20">
        <h3 className="text-4xl font-bold text-gray-900 mb-10 text-center">
          Select Subject for Practice Test
        </h3>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {subjects.map((subject, index) => (
            <div
              key={index}
              className={`w-48 h-48 flex flex-col items-center justify-center rounded-2xl shadow-lg text-white ${subject.color} text-center cursor-pointer transition-transform transform hover:scale-105`}
            >
              <h2 className="text-xl font-bold">{subject.name}</h2>
              <button className="mt-4 bg-white text-gray-800 font-bold py-2 px-4 rounded-lg shadow-md hover:bg-gray-200">
                Start Test
              </button>
            </div>
          ))}
        </div>
      </div>

      {/* Footer */}
      <Footer />
    </div>
  );
};

export default StudentPracticeTest;
