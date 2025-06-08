import React, { useEffect, useState } from 'react';
import Header from '../Header';
import Footer from '../Footer';
import { motion } from "framer-motion";
import axios from 'axios';
const StudentTimetable = () => {
  const [table, settable] = useState("")
  const timetableData = [
    { day: "Monday", periods: ["Math", "Science", "English", "History", "PE", "Computer", "Art"] },
    { day: "Tuesday", periods: ["English", "Math", "Science", "History", "Music", "Computer", "Sports"] },
    { day: "Wednesday", periods: ["Science", "English", "Math", "Geography", "PE", "Computer", "Art"] },
    { day: "Thursday", periods: ["History", "Math", "Science", "English", "Music", "Computer", "Library"] },
    { day: "Friday", periods: ["Geography", "Science", "English", "Math", "PE", "Computer", "Drama"] },
    // { day: "Saturday", periods: ["Math", "English", "Science", "History", "Sports", "Computer", "Art"] },
    // { day: "Saturday", periods: ["Math", "English", "Science", "History", "Sports", "Computer", "Art"] },
    // { day: "Saturday", periods: ["Math", "English", "Science", "History", "Sports", "Computer", "Art"] },
    // { day: "Saturday", periods: ["Math", "English", "Science", "History", "Sports", "Computer", "Art"] },
    { day: "Saturday", periods: ["Math", "English", "Science", "History", "Sports", "Computer", "Art"] }
  ];
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

    <div className="flex flex-col h-screen">
      {/* Fixed Header */}
      <Header />

      {/* Scrollable Main Content */}
      <div className="flex-grow flex items-center justify-center p-4 mt-20">
        {/* <div className="w-full max-w-3xl bg-white shadow-lg rounded-lg p-6"> */}
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5 }}
          className="w-full max-w-6xl bg-white shadow-lg rounded-lg min-h-screen">
          <h2 className="text-2xl font-bold text-center mb-6 text-white bg-blue-600 p-3 rounded-lg">Coaching Timetable</h2>
          <div className="overflow-x-auto flex justify-center">
            {/* <motion.table
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.8 }}
              className="w-full border-collapse border border-gray-300">
              <thead>
                <tr className="bg-gradient-to-r from-green-400 to-blue-500 text-white">
                  <th className="border border-gray-300 p-3">Day</th>
                  <th className="border border-gray-300 p-3">Period 1</th>
                  <th className="border border-gray-300 p-3">Period 2</th>
                  <th className="border border-gray-300 p-3">Period 3</th>
                  <th className="border border-gray-300 p-3">Period 4</th>
                  <th className="border border-gray-300 p-3">Period 5</th>
                  <th className="border border-gray-300 p-3">Period 6</th>
                  <th className="border border-gray-300 p-3">Period 7</th>
                </tr>
              </thead>
              <tbody>
                {timetableData.map((row, index) => (
                  <motion.tr
                    key={index}
                    initial={{ opacity: 0, x: -50 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: index * 0.2 }}
                    className={index % 2 === 0 ? "bg-purple-200" : "bg-pink-200"}>
                    <td className="border border-gray-300 p-3 font-medium bg-blue-300 text-white">{row.day}</td>
                    {row.periods.map((subject, subIndex) => (
                      <td key={subIndex} className="border border-gray-300 p-3 text-center bg-yellow-200 font-semibold">{subject}</td>
                    ))}
                  </motion.tr>
                ))}
              </tbody>
            </motion.table> */}
            <motion.img
              src={table ? `https://mdl-coaching.onrender.com/images/${table}` : "https://www.shutterstock.com/image-vector/timetable-error-color-line-icon-600w-1923052244.jpg"}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.8 }}
              className="w-[80%] border-collapse border border-gray-300">

            </motion.img>
          </div>
        </motion.div>
        {/* </div> */}
      </div>

      {/* Fixed Footer */}
      <Footer />
    </div>
  );
};

export default StudentTimetable;
