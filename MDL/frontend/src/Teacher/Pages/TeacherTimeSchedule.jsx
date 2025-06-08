import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import Footer from "../Footer";
import Header from "../Header";
import Sidebar from "../Sidebar";
import Swal from "sweetalert2";
import axios from "axios";

const TeacherTimeSchedule = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [selectedDay, setSelectedDay] = useState("Monday");
  const [table, settable] = useState("")
  const timetable = {
    Monday: [
      { subject: "Math", time: "9:00 AM - 10:00 AM", className: "bg-red-400" },
      { subject: "Science", time: "10:15 AM - 11:15 AM", className: "bg-blue-400" },
      { subject: "English", time: "11:30 AM - 12:30 PM", className: "bg-green-400" },
    ],
    Tuesday: [
      { subject: "History", time: "9:00 AM - 10:00 AM", className: "bg-yellow-400" },
      { subject: "Physics", time: "10:15 AM - 11:15 AM", className: "bg-purple-400" },
      { subject: "Chemistry", time: "11:30 AM - 12:30 PM", className: "bg-indigo-400" },
    ],
    Wednesday: [
      { subject: "Biology", time: "9:00 AM - 10:00 AM", className: "bg-teal-400" },
      { subject: "Math", time: "10:15 AM - 11:15 AM", className: "bg-orange-400" },
      { subject: "English", time: "11:30 AM - 12:30 PM", className: "bg-pink-400" },
    ],
    Thursday: [
      { subject: "Computer Science", time: "9:00 AM - 10:00 AM", className: "bg-gray-400" },
      { subject: "Geography", time: "10:15 AM - 11:15 AM", className: "bg-red-300" },
      { subject: "Physical Education", time: "11:30 AM - 12:30 PM", className: "bg-blue-300" },
    ],
    Friday: [
      { subject: "Art", time: "9:00 AM - 10:00 AM", className: "bg-green-300" },
      { subject: "Music", time: "10:15 AM - 11:15 AM", className: "bg-yellow-300" },
      { subject: "Drama", time: "11:30 AM - 12:30 PM", className: "bg-purple-300" },
    ],
    Saturday: [
      { subject: "Sports", time: "9:00 AM - 10:30 AM", className: "bg-orange-300" },
      { subject: "Yoga", time: "10:45 AM - 12:00 PM", className: "bg-pink-300" },
    ],
    Sunday: [
      { subject: "Self Study", time: "10:00 AM - 12:00 PM", className: "bg-teal-300" },
    ],
  };
  function upload(event) {
    event.preventDefault();
    Swal.fire({
      title: "Uploaded Successfully",
      icon: "success",
      draggable: true
    });
  }

  const getlatestTimetable = async () => {
    try {
      const response = await axios.get("https://mdl-coaching.onrender.com/timetable/latest")
      settable(response.data.data.filename)
    } catch (error) {
      console.log("error for latest time table found", error)
    }
  }
  useEffect(() => {
    getlatestTimetable()
  }, [])
  return (
    <div className="flex flex-col ">
      <Header />
      <div className="flex flex-1 h-screen">
        <button
          className="sm:hidden p-2 bg-gray-700 text-white fixed top-4 left-4 z-50 rounded-lg"
          onClick={() => setIsSidebarOpen(!isSidebarOpen)}
        >
          ☰
        </button>
        {/* <Sidebar isOpen={isSidebarOpen} setIsOpen={setIsSidebarOpen} /> */}
        <div className="flex-1 flex flex-col h-screen items-center bg-gradient-to-r from-purple-300 via-pink-300 to-yellow-300 p-6 sm:p-10 overflow-auto">
          <div className="p-4 sm:p-6 flex flex-col items-center w-full max-w-lg sm:max-w-xl md:max-w-2xl lg:max-w-4xl h-auto">
            <h1 className="text-black text-2xl sm:text-4xl font-bold mb-4 sm:mb-6 animate-bounce">Timetable</h1>
            <div className="w-full">
              <img src={table ? `https://mdl-coaching.onrender.com/images/${table}` : "https://www.shutterstock.com/image-vector/timetable-error-color-line-icon-600w-1923052244.jpg"} alt="" />
            </div>
            {/* <div className="flex flex-wrap justify-center gap-2 sm:gap-4 mb-4 sm:mb-6">
              {Object.keys(timetable).map((day) => (
                <button
                  key={day}
                  onClick={() => setSelectedDay(day)}
                  className={`px-3 sm:px-4 py-2 rounded-lg font-semibold transition-all duration-300 ${
                    selectedDay === day
                      ? "bg-blue-500 text-black"
                      : "bg-purple-700 text-white hover:bg-gradient-to-r hover:from-blue-400 hover:to-green-400"
                  }`}
                >
                  {day}
                </button>
              ))}
            </div>
            <div className="bg-white shadow-lg rounded-2xl p-4 sm:p-6 w-full">
              <h2 className="text-lg sm:text-xl font-semibold text-center text-gray-800 mb-2 sm:mb-4">{selectedDay}</h2>
              <ul className="space-y-2">
                {timetable[selectedDay].map((item, index) => (
                  <li
                    key={index}
                    className={`p-2 sm:p-3 text-black rounded-lg text-center shadow-md animate-fadeIn ${item.className}`}
                  >
                    <span className="block font-bold">{item.subject}</span>
                    <span className="text-sm sm:text-base">{item.time}</span>
                  </li>
                ))}
              </ul>
            </div> */}
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default TeacherTimeSchedule;
