// import React, { useEffect, useState } from "react";
// import { Link } from "react-router-dom";
// import Swal from "sweetalert2";
// import {
//   FiEdit,
//   FiTrash2,
//   FiUser,
//   FiSearch,
//   FiDollarSign,
// } from "react-icons/fi";
// import Header from "../Home/Header";
// import Footer from "../Home/Footer";
// import { AiOutlineArrowLeft } from "react-icons/ai";
// import axios from "axios";

// function ShowAllTeachersList() {
//   const [teachers, setTeachers] = useState([]);
//   const [filteredTeachers, setFilteredTeachers] = useState([]);
//   const [searchName, setSearchName] = useState("");
//   const [searchID, setSearchID] = useState("");

//   useEffect(() => {
//     fetchAllTeachers();
//   }, []);

//   useEffect(() => {
//     filterTeachers();
//   }, [searchName, searchID, teachers]);

//   const fetchAllTeachers = async () => {
//     try {
//       const response = await axios.get(
//         "https://mdl-coaching.onrender.com/teacher/getallteacher"
//       );
//       setTeachers(response.data.data);
//       setFilteredTeachers(response.data.data);
//     } catch (error) {
//       console.error("Error fetching teachers:", error);
//     }
//   };

//   const filterTeachers = () => {
//     let filtered = teachers.filter((teacher) => {
//       const fullName =
//         `${teacher.s_name} ${teacher.name} ${teacher.lname}`.toLowerCase();
//       const searchWords = searchName
//         .toLowerCase()
//         .split(" ")
//         .filter((word) => word);
//       return (
//         searchWords.every((word) => fullName.includes(word)) &&
//         teacher.t_id.toString().toLowerCase().includes(searchID.toLowerCase())
//       );
//     });
//     setFilteredTeachers(filtered);
//   };

//   const handleDelete = async (tid) => {
//     Swal.fire({
//       title: "Are you sure?",
//       text: "You won't be able to revert this!",
//       icon: "warning",
//       showCancelButton: true,
//       confirmButtonColor: "#3085d6",
//       cancelButtonColor: "#d33",
//       confirmButtonText: "Yes, delete it!",
//     }).then(async (result) => {
//       if (result.isConfirmed) {
//         await axios.get(`https://mdl-coaching.onrender.com/teacher/deleteteacher/${tid}`);
//         Swal.fire(
//           "Deleted!",
//           "The teacher's record has been deleted.",
//           "success"
//         );
//         fetchAllTeachers();
//       }
//     });
//   };

//   return (
//     <div className="flex flex-col min-h-screen">
//       <Header />
//       <div className="flex flex-1 bg-[#454649] p-5 sm:p-7 md:p-14 min-h-screen">
//         <div className="w-full max-w-6xl mx-auto bg-[#454649] p-6">
//           <h1 className="text-3xl font-bold text-yellow-200 mb-6 text-center">
//             All Teachers List
//           </h1>

//           <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
//             <div className="relative">
//               <FiUser
//                 className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500"
//                 size={20}
//               />
//               <input
//                 type="text"
//                 placeholder="Enter Name"
//                 value={searchName}
//                 onChange={(e) => setSearchName(e.target.value)}
//                 className="w-full pl-10 pr-4 py-3 border border-gray-600 rounded-lg bg-gray-800 text-white focus:outline-none focus:ring-2 focus:ring-indigo-400 shadow-md"
//               />
//             </div>
//             <div className="relative">
//               <FiSearch
//                 className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500"
//                 size={20}
//               />
//               <input
//                 type="text"
//                 placeholder="Enter Teacher ID"
//                 value={searchID}
//                 onChange={(e) => setSearchID(e.target.value)}
//                 className="w-full pl-10 pr-4 py-3 border border-gray-600 rounded-lg bg-gray-800 text-white focus:outline-none focus:ring-2 focus:ring-indigo-400 shadow-md"
//               />
//             </div>
//           </div>

//           <div className="mb-4 text-right">
//             <Link to="/showclassTeacher/addteacher">
//               <button className="px-4 py-2 bg-blue-600 text-white rounded shadow hover:bg-blue-700 transition">
//                 + Add Teacher
//               </button>
//             </Link>
//           </div>
//           <div className="overflow-x-auto">
//             {filteredTeachers.length === 0 ? (
//               <div className="p-6 text-center text-gray-400 rounded shadow-md">
//                 Teachers not found
//               </div>
//             ) : (
//               <table className="w-full border-collapse border border-gray-300 shadow-md rounded-lg">
//                 <thead className="bg-indigo-500 text-white">
//                   <tr>
//                     <th className="p-4 text-left">Teacher ID</th>
//                     <th className="p-4 text-left">Teacher's Name</th>
//                     <th className="p-4 text-left">Email</th>
//                     <th className="p-4 text-left">Subject</th>
//                     <th className="p-4 text-center">Actions</th>
//                   </tr>
//                 </thead>
//                 <tbody>
//                   {filteredTeachers.map((teacher, index) => (
//                     <tr
//                       key={index}
//                       className="border-b border-gray-300 hover:bg-[#454655] transition"
//                     >
//                       <td className="p-4 text-white">{teacher.t_id}</td>
//                       <td className="p-4 text-white">
//                         {teacher.s_name + " " + teacher.name + " " + teacher.lname}
//                       </td>
//                       <td className="p-4 text-white">{teacher.email}</td>
//                       <td className="p-4 text-white">{teacher.subject}</td>
//                       <td className="p-4 flex flex-wrap justify-center gap-2">
//                         <Link
//                           to={`/showclassTeacher/showallteacherlist/updatetecherdetails/${teacher._id}`}
//                         >
//                           <button className="p-2 bg-blue-500 text-white rounded shadow hover:bg-blue-600 transition flex items-center">
//                             <FiEdit size={18} className="md:mr-1" />
//                             <span className="hidden md:inline">Update</span>
//                           </button>
//                         </Link>
//                         <Link
//                           to={`/showclassTeacher/showallteacherlist/showprofile/${teacher._id}`}
//                         >
//                           <button className="p-2 bg-green-500 text-white rounded shadow hover:bg-green-600 transition flex items-center">
//                             <FiUser size={18} className="md:mr-1" />
//                             <span className="hidden md:inline">Profile</span>
//                           </button>
//                         </Link>
//                         <Link to={`/showclassTeacher/showallteacherlist/salarydetails/${teacher._id}`}>
//                           <button className="p-2 bg-yellow-500 text-white rounded shadow hover:bg-yellow-600 transition flex items-center">
//                             <FiDollarSign size={18} className="md:mr-1" />
//                             <span className="hidden md:inline">Salary</span>
//                           </button>
//                         </Link>
//                         <button
//                           onClick={() => handleDelete(teacher._id)}
//                           className="p-2 bg-red-500 text-white rounded shadow hover:bg-red-600 transition flex items-center"
//                         >
//                           <FiTrash2 size={18} className="md:mr-1" />
//                           <span className="hidden md:inline">Delete</span>
//                         </button>
//                       </td>
//                     </tr>
//                   ))}
//                 </tbody>
//               </table>
//             )}
//           </div>

//         </div>
//       </div>
//       <Link
//         to="/showclassTeacher"
//         className="fixed bottom-6 left-4 text-white bg-green-600 p-3 rounded-full hover:bg-green-700 transition duration-300"
//       >
//         <AiOutlineArrowLeft size={24} />
//       </Link>
//       <Footer />
//     </div>
//   );
// }
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import Swal from "sweetalert2";
import {
  FiEdit,
  FiTrash2,
  FiUser,
  FiSearch,
  FiDollarSign,
} from "react-icons/fi";
import Header from "../Home/Header";
import Footer from "../Home/Footer";
import { AiOutlineArrowLeft } from "react-icons/ai";
import axios from "axios";

function ShowAllTeachersList() {
  const [teachers, setTeachers] = useState([]);
  const [filteredTeachers, setFilteredTeachers] = useState([]);
  const [searchName, setSearchName] = useState("");
  const [searchID, setSearchID] = useState("");
  const [loading, setLoading] = useState(true);
  const [showContent, setShowContent] = useState(false);

  useEffect(() => {
    fetchAllTeachers();
  }, []);

  useEffect(() => {
    filterTeachers();
  }, [searchName, searchID, teachers]);

  const fetchAllTeachers = async () => {
    setLoading(true);
    setShowContent(false);
    try {
      const response = await axios.get("https://mdl-coaching.onrender.com/teacher/getallteacher");
      setTeachers(response.data.data);
      setFilteredTeachers(response.data.data);
    } catch (error) {
      console.error("Error fetching teachers:", error);
    } finally {
      setLoading(false);
      setTimeout(() => setShowContent(true), 150);
    }
  };

  const filterTeachers = () => {
    const filtered = teachers.filter((teacher) => {
      const fullName = `${teacher.s_name} ${teacher.name} ${teacher.lname}`.toLowerCase();
      const searchWords = searchName.toLowerCase().split(" ").filter(Boolean);
      return (
        searchWords.every((word) => fullName.includes(word)) &&
        teacher.t_id.toString().toLowerCase().includes(searchID.toLowerCase())
      );
    });
    setFilteredTeachers(filtered);
  };

  const handleDelete = async (tid) => {
    Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!",
    }).then(async (result) => {
      if (result.isConfirmed) {
        await axios.get(`https://mdl-coaching.onrender.com/teacher/deleteteacher/${tid}`);
        Swal.fire("Deleted!", "The teacher's record has been deleted.", "success");
        fetchAllTeachers();
      }
    });
  };

  return (
    <div className="flex flex-col min-h-screen">
      {/* 👇 Animation Style */}
      <style>
        {`
          @keyframes fadeIn {
            from {
              opacity: 0;
              transform: translateY(15px);
            }
            to {
              opacity: 1;
              transform: translateY(0);
            }
          }

          .animate-fade-in {
            animation: fadeIn 0.7s ease-out;
          }
        `}
      </style>

      <Header />
      <div className="flex flex-1 bg-[#454649] p-5 sm:p-7 md:p-14 min-h-screen">
        <div className="w-full max-w-6xl mx-auto bg-[#454649] p-6">
          {loading ? (
            <div className="flex flex-col items-center justify-center h-64 space-y-4">
              <div className="flex space-x-2">
                <div
                  className="w-3 h-3 bg-gray-300 rounded-full animate-bounce"
                  style={{ animationDuration: "0.4s", animationDelay: "-0.3s" }}
                ></div>
                <div
                  className="w-3 h-3 bg-pink-300 rounded-full animate-bounce"
                  style={{ animationDuration: "0.4s", animationDelay: "-0.15s" }}
                ></div>
                <div
                  className="w-3 h-3 bg-green-300 rounded-full animate-bounce"
                  style={{ animationDuration: "0.4s" }}
                ></div>
              </div>
              <p className="text-yellow-200 text-lg font-medium">Loading Teachers List...</p>
            </div>
          ) : (
            showContent && (
              <div className="animate-fade-in">
                <h1 className="text-3xl font-bold text-yellow-200 mb-6 text-center">
                  All Teachers List
                </h1>

                {/* Search Inputs */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                  <div className="relative">
                    <FiUser className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500" size={20} />
                    <input
                      type="text"
                      placeholder="Enter Name"
                      value={searchName}
                      onChange={(e) => setSearchName(e.target.value)}
                      className="w-full pl-10 pr-4 py-3 border border-gray-600 rounded-lg bg-gray-800 text-white focus:outline-none focus:ring-2 focus:ring-indigo-400 shadow-md"
                    />
                  </div>
                  <div className="relative">
                    <FiSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500" size={20} />
                    <input
                      type="text"
                      placeholder="Enter Teacher ID"
                      value={searchID}
                      onChange={(e) => setSearchID(e.target.value)}
                      className="w-full pl-10 pr-4 py-3 border border-gray-600 rounded-lg bg-gray-800 text-white focus:outline-none focus:ring-2 focus:ring-indigo-400 shadow-md"
                    />
                  </div>
                </div>

                {/* Add Button */}
                <div className="mb-4 text-right">
                  <Link to="/showclassTeacher/addteacher">
                    <button className="px-4 py-2 bg-blue-600 text-white rounded shadow hover:bg-blue-700 transition">
                      + Add Teacher
                    </button>
                  </Link>
                </div>

                {/* Table */}
                <div className="overflow-x-auto">
                  {filteredTeachers.length === 0 ? (
                    <div className="p-6 text-center text-gray-400 rounded shadow-md">
                      Teachers not found
                    </div>
                  ) : (
                    <table className="w-full border-collapse border border-gray-300 shadow-md rounded-lg">
                      <thead className="bg-indigo-500 text-white">
                        <tr>
                          <th className="p-4 text-left">Teacher ID</th>
                          <th className="p-4 text-left">Teacher's Name</th>
                          <th className="p-4 text-left">Email</th>
                          <th className="p-4 text-left">Subject</th>
                          <th className="p-4 text-center">Actions</th>
                        </tr>
                      </thead>
                      <tbody>
                        {filteredTeachers.map((teacher, index) => (
                          <tr key={index} className="border-b border-gray-300 hover:bg-[#454655] transition">
                            <td className="p-4 text-white">{teacher.t_id}</td>
                            <td className="p-4 text-white">
                              {teacher.s_name + " " + teacher.name + " " + teacher.lname}
                            </td>
                            <td className="p-4 text-white">{teacher.email}</td>
                            <td className="p-4 text-white">{teacher.subject}</td>
                            <td className="p-4 flex flex-wrap justify-center gap-2">
                              <Link to={`/showclassTeacher/showallteacherlist/updatetecherdetails/${teacher._id}`}>
                                <button className="p-2 bg-blue-500 text-white rounded shadow hover:bg-blue-600 transition flex items-center">
                                  <FiEdit size={18} className="md:mr-1" />
                                  <span className="hidden md:inline">Update</span>
                                </button>
                              </Link>
                              <Link to={`/showclassTeacher/showallteacherlist/showprofile/${teacher._id}`}>
                                <button className="p-2 bg-green-500 text-white rounded shadow hover:bg-green-600 transition flex items-center">
                                  <FiUser size={18} className="md:mr-1" />
                                  <span className="hidden md:inline">Profile</span>
                                </button>
                              </Link>
                              <Link to={`/showclassTeacher/showallteacherlist/salarydetails/${teacher._id}`}>
                                <button className="p-2 bg-yellow-500 text-white rounded shadow hover:bg-yellow-600 transition flex items-center">
                                  <FiDollarSign size={18} className="md:mr-1" />
                                  <span className="hidden md:inline">Salary</span>
                                </button>
                              </Link>
                              <button
                                onClick={() => handleDelete(teacher._id)}
                                className="p-2 bg-red-500 text-white rounded shadow hover:bg-red-600 transition flex items-center"
                              >
                                <FiTrash2 size={18} className="md:mr-1" />
                                <span className="hidden md:inline">Delete</span>
                              </button>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  )}
                </div>
              </div>
            )
          )}
        </div>
      </div>

      <Link
        to="/showclassTeacher"
        className="fixed bottom-6 left-4 text-white bg-green-600 p-3 rounded-full hover:bg-green-700 transition duration-300"
      >
        <AiOutlineArrowLeft size={24} />
      </Link>
      <Footer />
    </div>
  );
}

export default ShowAllTeachersList;
