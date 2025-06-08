// import React, { useEffect, useState } from "react";
// import { Link } from "react-router-dom";
// import { FiUserPlus, FiUsers } from "react-icons/fi";
// import Header from "../Home/Header";
// import Footer from "../Home/Footer";
// import axios from "axios";
// import { motion } from "framer-motion"; // ✅ Import motion

// function ShowClassTeacher() {
//   const [classes, setClasses] = useState([]);
//   const [loading, setLoading] = useState(true);

//   useEffect(() => {
//     getclasses();
//   }, []);

//   const getclasses = async () => {
//     try {
//       const res = await axios.get("https://mdl-coaching.onrender.com/class/getclasses");
//       setClasses(res.data.data);
//     } catch (error) {
//       console.log(error);
//     } finally {
//       setLoading(false);
//     }
//   };

//   return (
//     <>
//       <div className="flex flex-col min-h-screen">
//         <Header />

//         <div className="flex flex-1 bg-[#454649] p-5 sm:p-7 md:p-14 min-h-screen">
//           <div className="w-full max-w-4xl mx-auto mt-20 bg-transparent p-6">

//             {/* Spinner - Above the button */}
//             {loading && (
//               <div className="flex justify-center items-center mb-6">
//                 <div className="animate-spin rounded-full h-10 w-10 border-t-4 border-b-4 border-yellow-500"></div>
//               </div>
//             )}

//             {/* Content Animation starts after loading */}
//             {!loading && (
//               <motion.div
//                 initial={{ opacity: 0, y: 20 }}
//                 animate={{ opacity: 1, y: 0 }}
//                 transition={{ duration: 0.6, ease: "easeOut" }}
//               >
//                 {/* Button */}
//                 <div className="mb-6 flex">
//                   <Link to={"/showclassTeacher/showallteacherlist"}>
//                     <button className="flex items-center gap-2 px-6 py-2 bg-yellow-700 text-white rounded-md shadow hover:bg-blue-600 focus:outline-none focus:ring-4 focus:ring-blue-300">
//                       <FiUsers className="text-xl" /> Show All Teachers
//                     </button>
//                   </Link>
//                 </div>

//                 {/* Content */}
//                 {classes.length > 0 ? (
//                   <>
//                     <h1 className="text-2xl sm:text-3xl font-bold text-gray-300 mb-6 text-center">
//                       Add Teacher
//                     </h1>

//                     <div className="overflow-x-auto">
//                       <table className="w-full bg-[#454649] rounded-lg shadow-md border-collapse border border-gray-200">
//                         <tbody>
//                           {classes.map((cls, index) => (
//                             <tr className="hover:bg-[#454650]" key={index}>
//                               <td className="p-4 border border-gray-300 text-gray-700 text-lg font-semibold">
//                                 <span className="block text-white">
//                                   {cls.classname}
//                                 </span>
//                               </td>

//                               <td className="p-4 border border-gray-300">
//                                 <Link
//                                   to={`/showclassTeacher/addclassteacher/${cls.classname}`}
//                                   className="flex items-center justify-center gap-2 px-6 py-2 bg-green-500 text-white rounded-md shadow hover:bg-blue-600 focus:outline-none focus:ring-4 focus:ring-blue-300"
//                                 >
//                                   <FiUserPlus className="text-lg" /> Add Teacher
//                                 </Link>
//                               </td>

//                               <td className="p-4 border border-gray-300">
//                                 <Link
//                                   to={`/showclassTeacher/showteacherslist/${cls.classname}`}
//                                   className="flex items-center justify-center gap-2 px-6 py-2 bg-green-500 text-white rounded-md shadow hover:bg-blue-600 focus:outline-none focus:ring-4 focus:ring-blue-300"
//                                 >
//                                   <FiUsers className="text-lg" /> Show Teachers
//                                 </Link>
//                               </td>
//                             </tr>
//                           ))}
//                         </tbody>
//                       </table>
//                     </div>
//                   </>
//                 ) : (
//                   <p className="text-center text-gray-400 text-lg mt-10">
//                     No class data available.
//                   </p>
//                 )}
//               </motion.div>
//             )}
//           </div>
//         </div>

//         <Footer />
//       </div>
//     </>
//   );
// }

// export default ShowClassTeacher;
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { FiUserPlus, FiUsers } from "react-icons/fi";
import Header from "../Home/Header";
import Footer from "../Home/Footer";
import axios from "axios";
import { motion } from "framer-motion"; // ✅ Import motion

function ShowClassTeacher() {
  const [classes, setClasses] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    getclasses();
  }, []);

  const getclasses = async () => {
    try {
      const res = await axios.get("https://mdl-coaching.onrender.com/class/getclasses");
      setClasses(res.data.data);
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <div className="flex flex-col min-h-screen">
        <Header />

        <div className="flex flex-1 bg-[#454649] p-5 sm:p-7 md:p-14 min-h-screen">
          <div className="w-full max-w-4xl mx-auto mt-20 bg-transparent p-6">

            {/* Spinner - Above the button */}
            {loading && (
              <div className="flex justify-center items-center mb-6">
                <div className="animate-spin rounded-full h-10 w-10 border-t-4 border-b-4 border-yellow-500"></div>
              </div>
            )}

            {/* Content Animation starts after loading */}
            {!loading && (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, ease: "easeOut" }}
              >
                {/* Button */}
                <div className="mb-6 flex">
                  <Link to={"/showclassTeacher/showallteacherlist"}>
                    <button className="flex items-center gap-2 px-6 py-2 bg-yellow-700 text-white rounded-md shadow hover:bg-blue-600 focus:outline-none focus:ring-4 focus:ring-blue-300">
                      <FiUsers className="text-xl" /> Show All Teachers
                    </button>
                  </Link>
                </div>

                {/* Content */}
                {classes.length > 0 ? (
                  <>
                    <h1 className="text-2xl sm:text-3xl font-bold text-yellow-500 mb-6 text-center">
                      Add Teacher
                    </h1>

                    <div className="overflow-x-auto">
                      <table className="w-full bg-[#454649] rounded-lg shadow-md border-collapse border border-gray-200">
                        <thead>
                          <tr className="bg-[#2c2f33]">
                            <th className="p-4 text-white text-lg font-semibold">Class Name</th>
                            <th className="p-4 text-white text-lg font-semibold">Actions</th>
                          </tr>
                        </thead>
                        <tbody>
                          {classes.map((cls, index) => (
                            <tr className="hover:bg-[#454650]" key={index}>
                              <td className="p-4 border border-gray-300 text-white">{cls.classname}</td>
                              <td className="p-4 border border-gray-300">
                                <div className="flex flex-col sm:flex-row gap-4 sm:gap-6">
                                  <Link
                                    to={`/showclassTeacher/addclassteacher/${cls.classname}`}
                                    className="flex items-center justify-center gap-2 px-6 py-2 bg-green-500 text-white rounded-md shadow hover:bg-blue-600 focus:outline-none focus:ring-4 focus:ring-blue-300"
                                  >
                                    <FiUserPlus className="text-lg" /> Add Teacher
                                  </Link>

                                  <Link
                                    to={`/showclassTeacher/showteacherslist/${cls.classname}`}
                                    className="flex items-center justify-center gap-2 px-6 py-2 bg-green-500 text-white rounded-md shadow hover:bg-blue-600 focus:outline-none focus:ring-4 focus:ring-blue-300"
                                  >
                                    <FiUsers className="text-lg" /> Show Teachers
                                  </Link>
                                </div>
                              </td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>
                  </>
                ) : (
                  <p className="text-center text-gray-400 text-lg mt-10">
                    No class data available.
                  </p>
                )}
              </motion.div>
            )}
          </div>
        </div>

        <Footer />
      </div>
    </>
  );
}

export default ShowClassTeacher;
