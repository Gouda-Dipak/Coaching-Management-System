
// import React, { useEffect, useState } from "react";
// import Header from "../Home/Header";
// import Footer from "../Home/Footer";
// import { FaPlus, FaIdBadge, FaUser } from "react-icons/fa";
// import { AiOutlineArrowLeft } from "react-icons/ai";
// import { Link, useParams } from "react-router-dom";
// import axios from "axios";

// export const AddClassTeacher = () => {
//   const [showPopup, setShowPopup] = useState(false);
//   const [teachers, setTeachers] = useState([]); // Store teacher list
//   const [formData, setFormData] = useState({ s_name: "", t_id: "" });

//   useEffect(() => {
//     fetchAllTeachers();
//   }, []);

//   const fetchAllTeachers = async () => {
//     try {
//       const response = await axios.get(
//         "https://mdl-coaching.onrender.com/teacher/displayallteachers"
//       );
//       setTeachers(response.data.data); // Store fetched teachers in state
//     } catch (error) {
//       console.error("Error fetching teachers:", error);
//     }
//   };
//   const { classid } = useParams();
//   const handleAddClick = async (teacherid) => {
//     try {
//       const response = await axios.post(
//         "https://mdl-coaching.onrender.com/teacherclass/teachercls",
//         {
//           TeacherId: teacherid,
//           className: classid,
//         },
//         {
//           headers: {
//             "Content-Type": "application/json",
//           },
//         }
//       );
//     } catch (error) {
//       console.error("Error fetching teachers:", error);
//     }
//     setShowPopup(true);
//     setTimeout(() => setShowPopup(false), 2000); // Hide popup after 2 seconds
//   };

//   return (
//     <div className="flex flex-col min-h-screen w-full bg-[#454649] relative">
//       <Header />

//       <div className="flex flex-1 p-4 sm:p-6 md:p-10 bg-[#454649] justify-center w-full min-h-screen">
//         <div className="w-full max-w-5xl bg-[#454649] p-4 sm:p-6 overflow-x-auto mt-10">
//           <h2 className="text-lg sm:text-xl md:text-2xl font-bold text-center text-yellow-400 mb-4 w-full">
//             Add Class Teacher
//           </h2>

//           {/* Input Fields */}
//           <div className="flex flex-col sm:flex-row gap-4 items-center justify-center mb-6">
//             <div className="relative w-full sm:w-1/3">
//               <FaIdBadge className="absolute left-3 top-3 text-gray-500" />
//               <input
//                 type="text"
//                 placeholder="Teacher ID"
//                 className="p-2 pl-10 border border-gray-300 rounded-md w-full"
//               />
//             </div>
//             <div className="relative w-full sm:w-1/3">
//               <FaUser className="absolute left-3 top-3 text-gray-500" />
//               <input
//                 type="text"
//                 placeholder="Teacher Full Name"
//                 className="p-2 pl-10 border border-gray-300 rounded-md w-full"
//               />
//             </div>
//             <button
//               // onClick={handleAddClick}
//               className="bg-green-600 text-white p-2 rounded-lg flex items-center gap-2 hover:bg-green-700 transition-all duration-200"
//             >
//               <FaPlus /> Add
//             </button>
//           </div>

//           {/* Teacher List Table */}
//           <div className="overflow-x-auto">
//             {teachers && teachers.length > 0 ? (
//               <table className="w-full border-collapse border border-gray-300 shadow-md text-xs sm:text-sm md:text-base">
//                 <thead>
//                   <tr className="bg-gradient-to-r from-blue-500 to-purple-600 text-white">
//                     <th className="border border-gray-300 p-2 sm:p-3">Teacher ID</th>
//                     <th className="border border-gray-300 p-2 sm:p-3">Teacher Full Name</th>
//                     <th className="border border-gray-300 p-2 sm:p-3">Action</th>
//                   </tr>
//                 </thead>
//                 <tbody>
//                   {teachers.map((teacher) => (
//                     <tr
//                       key={teacher.t_id}
//                       className="bg-blue-100 hover:bg-blue-200 transition-all duration-200"
//                     >
//                       <td className="border border-gray-300 p-2 sm:p-3 text-center font-semibold">
//                         {teacher.t_id}
//                       </td>
//                       <td className="border border-gray-300 p-2 sm:p-3 truncate max-w-full overflow-hidden font-medium">
//                         {teacher.s_name + " " + teacher.name + " " + teacher.lname}
//                       </td>
//                       <td className="border border-gray-300 p-2 sm:p-3 text-center">
//                         <button
//                           onClick={() => handleAddClick(teacher._id)}
//                           className="bg-green-600 text-white p-1 sm:p-2 md:px-3 md:py-2 rounded-lg hover:bg-green-700 transition-all duration-200"
//                           aria-label="Add Teacher"
//                         >
//                           <FaPlus />
//                         </button>
//                       </td>
//                     </tr>
//                   ))}
//                 </tbody>
//               </table>
//             ) : (
//               <div className="text-center text-gray-500 p-4 text-sm sm:text-base">
//                 Teachers not found
//               </div>
//             )}
//           </div>

//         </div>
//       </div>

//       {/* Success Popup */}
//       {showPopup && (
//         <div className="fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-green-600 text-white px-6 py-3 rounded-lg shadow-lg text-lg font-bold">
//           Added Successfully!
//         </div>
//       )}

//       <Link
//         to="/showclassTeacher"
//         className="fixed bottom-6 left-4 text-white bg-green-600 p-3 rounded-full hover:bg-green-700 transition duration-300"
//       >
//         <AiOutlineArrowLeft size={24} />
//       </Link>

//       <Footer />
//     </div>
//   );
// };
import React, { useEffect, useState } from "react";
import Header from "../Home/Header";
import Footer from "../Home/Footer";
import { FaPlus, FaIdBadge, FaUser } from "react-icons/fa";
import { AiOutlineArrowLeft } from "react-icons/ai";
import { Link, useParams } from "react-router-dom";
import axios from "axios";
import { motion, AnimatePresence } from "framer-motion";

export const AddClassTeacher = () => {
  const [showPopup, setShowPopup] = useState(false);
  const [teachers, setTeachers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [formData, setFormData] = useState({ s_name: "", t_id: "" });

  const { classid } = useParams();

  useEffect(() => {
    fetchAllTeachers();
  }, []);

  const fetchAllTeachers = async () => {
    try {
      const response = await axios.get("https://mdl-coaching.onrender.com/teacher/displayallteachers");
      setTeachers(response.data.data);
    } catch (error) {
      console.error("Error fetching teachers:", error);
    } finally {
      setTimeout(() => {
        setLoading(false);
      }, 800);
    }
  };

  const handleAddClick = async (teacherid) => {
    try {
      await axios.post(
        "https://mdl-coaching.onrender.com/teacherclass/teachercls",
        {
          TeacherId: teacherid,
          className: classid,
        },
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      setShowPopup(true);
      setTimeout(() => setShowPopup(false), 2000);
    } catch (error) {
      console.error("Error adding class teacher:", error);
    }
  };

  const fieldVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: (i) => ({
      opacity: 1,
      y: 0,
      transition: {
        delay: i * 0.2,
        duration: 0.5,
      },
    }),
  };

  return (
    <div className="flex flex-col min-h-screen w-full bg-[#454649] relative">
      <Header />

      <div className="flex flex-1 p-4 sm:p-6 md:p-10 bg-[#454649] justify-center w-full min-h-screen">
        <div className="w-full max-w-5xl bg-[#454649] p-4 sm:p-6 overflow-x-auto mt-10">
          <h2 className="text-lg sm:text-xl md:text-2xl font-bold text-center text-yellow-400 mb-4 w-full">
            Add Class Teacher
          </h2>

          {/* Loader or Form Fields */}
          {loading ? (
            <div className="flex justify-center items-center py-20">
              <motion.div
                className="w-12 h-12 rounded-full border-4 border-t-yellow-400 border-b-yellow-400 border-l-transparent border-r-transparent"
                animate={{ rotate: 360, scale: [1, 1.1, 1] }}
                transition={{
                  repeat: Infinity,
                  ease: "linear",
                  duration: 1,
                  repeatType: "loop",
                }}
              />
            </div>
          ) : (
            <AnimatePresence>
              <div className="flex flex-col sm:flex-row gap-4 items-center justify-center mb-6">
                {[0, 1, 2].map((index) => (
                  <motion.div
                    key={index}
                    custom={index}
                    initial="hidden"
                    animate="visible"
                    variants={fieldVariants}
                    className={`relative w-full sm:w-1/3`}
                  >
                    {index === 0 && (
                      <>
                        <FaIdBadge className="absolute left-3 top-3 text-gray-500" />
                        <input
                          type="text"
                          placeholder="Teacher ID"
                          className="p-2 pl-10 border border-gray-300 rounded-md w-full"
                        />
                      </>
                    )}
                    {index === 1 && (
                      <>
                        <FaUser className="absolute left-3 top-3 text-gray-500" />
                        <input
                          type="text"
                          placeholder="Teacher Full Name"
                          className="p-2 pl-10 border border-gray-300 rounded-md w-full"
                        />
                      </>
                    )}
                    {index === 2 && (
                      <button className="bg-green-600 text-white p-2 rounded-lg flex items-center gap-2 hover:bg-green-700 transition-all duration-200">
                        <FaPlus /> Add
                      </button>
                    )}
                  </motion.div>
                ))}
              </div>
            </AnimatePresence>
          )}

          {/* Teacher List Table */}
          {!loading && (
            <div className="overflow-x-auto">
              {teachers && teachers.length > 0 ? (
                <table className="w-full border-collapse border border-gray-300 shadow-md text-xs sm:text-sm md:text-base">
                  <thead>
                    <tr className="bg-gradient-to-r from-blue-500 to-purple-600 text-white">
                      <th className="border border-gray-300 p-2 sm:p-3">Teacher ID</th>
                      <th className="border border-gray-300 p-2 sm:p-3">Teacher Full Name</th>
                      <th className="border border-gray-300 p-2 sm:p-3">Action</th>
                    </tr>
                  </thead>
                  <tbody>
                    {teachers.map((teacher) => (
                      <tr
                        key={teacher.t_id}
                        className="bg-blue-100 hover:bg-blue-200 transition-all duration-200"
                      >
                        <td className="border border-gray-300 p-2 sm:p-3 text-center font-semibold">
                          {teacher.t_id}
                        </td>
                        <td className="border border-gray-300 p-2 sm:p-3 truncate max-w-full overflow-hidden font-medium">
                          {teacher.s_name + " " + teacher.name + " " + teacher.lname}
                        </td>
                        <td className="border border-gray-300 p-2 sm:p-3 text-center">
                          <button
                            onClick={() => handleAddClick(teacher._id)}
                            className="bg-green-600 text-white p-1 sm:p-2 md:px-3 md:py-2 rounded-lg hover:bg-green-700 transition-all duration-200"
                            aria-label="Add Teacher"
                          >
                            <FaPlus />
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              ) : (
                <div className="text-center text-gray-500 p-4 text-sm sm:text-base">
                  Teachers not found
                </div>
              )}
            </div>
          )}
        </div>
      </div>

      {/* Success Popup */}
      {showPopup && (
        <div className="fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-green-600 text-white px-6 py-3 rounded-lg shadow-lg text-lg font-bold">
          Added Successfully!
        </div>
      )}

      <Link
        to="/showclassTeacher"
        className="fixed bottom-6 left-4 text-white bg-green-600 p-3 rounded-full hover:bg-green-700 transition duration-300"
      >
        <AiOutlineArrowLeft size={24} />
      </Link>

      <Footer />
    </div>
  );
};
