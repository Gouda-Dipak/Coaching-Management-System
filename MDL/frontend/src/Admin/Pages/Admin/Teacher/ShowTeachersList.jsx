// import React, { useEffect, useState } from "react";
// import { Link, useParams } from "react-router-dom";
// import { Pencil, Trash2, ArrowLeft, X } from "lucide-react";
// import Swal from "sweetalert2";
// import Header from "../Home/Header";
// import Footer from "../Home/Footer";
// import { AiOutlineArrowLeft } from "react-icons/ai";
// import axios from "axios";

// function ShowTeachersList() {
//   const [isModalOpen, setIsModalOpen] = useState(false);
//   const [selectedTeacher, setSelectedTeacher] = useState(null);
//   const [selectedSubject, setSelectedSubject] = useState("");
//   const [teachers, setTeachers] = useState([]);
//   const { classname } = useParams();

//   useEffect(() => {
//     handleAddClick();
//   }, [classname]);

//   const handleAddClick = async () => {
//     try {
//       const response = await axios.get(
//         `https://mdl-coaching.onrender.com/teacherclass/getteachercls/${classname}`
//       );
//       setTeachers(response.data.data);
//     } catch (error) {
//       console.error("Error fetching teachers:", error);
//     }
//   };

//   function handleUpdate(teacher) {
//     setSelectedTeacher(teacher);
//     setSelectedSubject(teacher.SubjectName);
//     setIsModalOpen(true);
//   }

//   async function handleDelete(teacherId) {
//     try {
//       const result = await Swal.fire({
//         title: "Are you sure?",
//         text: "You won't be able to revert this!",
//         icon: "warning",
//         showCancelButton: true,
//         confirmButtonColor: "#3085d6",
//         cancelButtonColor: "#d33",
//         confirmButtonText: "Yes, delete it!",
//       });

//       if (result.isConfirmed) {
//         const response = await axios.get(
//           `https://mdl-coaching.onrender.com/teacherclass/deleteteachercls/${teacherId}`
//         );
//         if (response.data.success) {
//           Swal.fire({
//             title: "Deleted!",
//             text: "The teacher has been removed from the class.",
//             icon: "success",
//           });
//           handleAddClick(); // Refresh the list
//         }
//       }
//     } catch (error) {
//       Swal.fire({
//         title: "Error!",
//         text: "Failed to delete teacher.",
//         icon: "error",
//       });
//     }
//   }

//   async function handleSubmit() {
//     try {
//       const response = await axios.post(
//         `https://mdl-coaching.onrender.com/teacherclass/updateteachercls/${selectedTeacher._id}`,
//         {
//           SubjectName: selectedSubject,
//         }
//       );

//       if (response.data.success) {
//         setIsModalOpen(false);
//         Swal.fire({
//           title: "Updated!",
//           text: `Subject updated to ${selectedSubject}.`,
//           icon: "success",
//         });
//         handleAddClick(); // Refresh the list
//       }
//     } catch (error) {
//       Swal.fire({
//         title: "Error!",
//         text: "Failed to update subject.",
//         icon: "error",
//       });
//     }
//   }
//   const [subjects, setSubjects] = useState([]);
//   useEffect(() => {
//     getsubject();
//   }, []);
//   const getsubject = async () => {
//     try {
//       const res = await axios.get("https://mdl-coaching.onrender.com/subject/getsubjects");
//       console.log(res.data);
//       setSubjects(res.data.data);
//     } catch (error) {
//       console.log(error);
//     }
//   };
//   const handlesubjectChange = (event) => {
//     const selectedValue = JSON.parse(event.target.value);
//     setTeachers({
//       ...teachers,
//       subject: selectedValue.name,
//       subject_Id: selectedValue.id,
//     });
//   };
//   return (
//     <>
//       <div className="flex flex-col min-h-screen">
//         <Header />

//         <div className="flex flex-1 bg-[#454649] p-5 sm:p-7 md:p-20 min-h-screen">
//           <div className="max-w-4xl mx-auto bg-gray-700 p-6 rounded-lg shadow-md w-full">
//             <h1 className="text-3xl font-semibold text-yellow-500 mb-6">
//               Teacher's List for {classname}
//             </h1>

//             {/* Table */}
//             <div className="overflow-x-auto">
//               {teachers.length > 0 ? (
//                 <table className="min-w-full bg-gray-800 border border-gray-600 text-white">
//                   <thead>
//                     <tr className="bg-gray-900 text-left">
//                       <th className="p-3 border-b border-gray-600 text-yellow-400">Teacher ID</th>
//                       <th className="p-3 border-b border-gray-600 text-yellow-400">Teacher's Name</th>
//                       <th className="p-3 border-b border-gray-600 text-yellow-400">Subject</th>
//                       <th className="p-3 border-b border-gray-600 text-center text-yellow-400">Edit Subject</th>
//                       <th className="p-3 border-b border-gray-600 text-center text-yellow-400">Delete</th>
//                     </tr>
//                   </thead>
//                   <tbody>
//                     {teachers.map((teacher) => (
//                       <tr key={teacher._id} className="hover:bg-gray-700">
//                         <td className="p-3 border-b border-gray-600">{teacher.TeacherId.t_id}</td>
//                         <td className="p-3 border-b border-gray-600">
//                           {`${teacher.TeacherId.s_name} ${teacher.TeacherId.name} ${teacher.TeacherId.lname}`}
//                         </td>
//                         <td className="p-3 border-b border-gray-600">
//                           {teacher.SubjectName || "Not Assigned"}
//                         </td>
//                         <td className="p-3 border-b border-gray-600 text-center">
//                           <button
//                             className="text-blue-300 hover:text-blue-500"
//                             onClick={() => handleUpdate(teacher)}
//                           >
//                             <Pencil className="inline-block w-5 h-5" />
//                           </button>
//                         </td>
//                         <td className="p-3 border-b border-gray-600 text-center">
//                           <button
//                             className="text-red-400 hover:text-red-600"
//                             onClick={() => handleDelete(teacher._id)}
//                           >
//                             <Trash2 className="inline-block w-5 h-5" />
//                           </button>
//                         </td>
//                       </tr>
//                     ))}
//                   </tbody>
//                 </table>
//               ) : (
//                 <div className="text-center text-white py-8 text-lg ">
//                   No teachers found.
//                 </div>
//               )}
//             </div>
//           </div>
//         </div>

//         <Link
//           to="/showclassTeacher"
//           className="fixed bottom-6 left-4 text-white bg-green-600 p-3 rounded-full hover:bg-green-700 transition duration-300"
//         >
//           <AiOutlineArrowLeft size={24} />
//         </Link>
//         <Footer />

//         {/* Modal */}
//         {isModalOpen && (
//           <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
//             <div className="bg-gray-800 w-96 p-6 rounded-lg shadow-lg relative text-white">
//               <button
//                 className="absolute top-3 right-3 text-gray-400 hover:text-gray-200"
//                 onClick={() => setIsModalOpen(false)}
//               >
//                 <X className="w-6 h-6" />
//               </button>
//               <h2 className="text-xl font-semibold mb-4">Update Subject</h2>
//               <p className="mb-3">
//                 Teacher:{" "}
//                 <span className="font-medium">
//                   {`${selectedTeacher?.TeacherId.s_name} ${selectedTeacher?.TeacherId.name} ${selectedTeacher?.TeacherId.lname}`}
//                 </span>
//               </p>
//               <label className="block font-medium mb-2">Select Subject:</label>

//               <select
//                 name="classname"
//                 value={selectedSubject}
//                 onChange={(e) => setSelectedSubject(e.target.value)}
//                 className="w-full p-3 border border-white/30 rounded-lg bg-white/30 backdrop-blur-md focus:ring-2 focus:ring-purple-400 focus:outline-none transition-all duration-200 text-gray-900"
//                 required
//               >
//                 <option value="">-- Select Subject --</option>
//                 {subjects.map((cls, index) => (
//                   <option
//                     key={index}
//                   >
//                     {cls.subjectName}
//                   </option>
//                 ))}
//               </select>

//               {/* Buttons */}
//               <div className="flex justify-end gap-3 mt-5">
//                 <button
//                   className="px-4 py-2 bg-gray-600 text-white rounded hover:bg-gray-500"
//                   onClick={() => setIsModalOpen(false)}
//                 >
//                   Cancel
//                 </button>
//                 <button
//                   className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-500"
//                   onClick={handleSubmit}
//                 >
//                   Submit
//                 </button>
//               </div>
//             </div>
//           </div>
//         )}
//       </div>
//     </>
//   );
// }

// export default ShowTeachersList;

import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { Pencil, Trash2, X } from "lucide-react";
import Swal from "sweetalert2";
import Header from "../Home/Header";
import Footer from "../Home/Footer";
import { AiOutlineArrowLeft } from "react-icons/ai";
import axios from "axios";
import { motion } from "framer-motion";

function ShowTeachersList() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedTeacher, setSelectedTeacher] = useState(null);
  const [selectedSubject, setSelectedSubject] = useState("");
  const [teachers, setTeachers] = useState([]);
  const [subjects, setSubjects] = useState([]);
  const [loading, setLoading] = useState(true);
  const { classname } = useParams();

  useEffect(() => {
    handleAddClick();
    getsubject();
  }, [classname]);

  const handleAddClick = async () => {
    setLoading(true);
    try {
      const response = await axios.get(
        `https://mdl-coaching.onrender.com/teacherclass/getteachercls/${classname}`
      );
      setTeachers(response.data.data);
    } catch (error) {
      console.error("Error fetching teachers:", error);
    } finally {
      setLoading(false);
    }
  };

  const getsubject = async () => {
    try {
      const res = await axios.get("https://mdl-coaching.onrender.com/subject/getsubjects");
      setSubjects(res.data.data);
    } catch (error) {
      console.log(error);
    }
  };

  function handleUpdate(teacher) {
    setSelectedTeacher(teacher);
    setSelectedSubject(teacher.SubjectName);
    setIsModalOpen(true);
  }

  async function handleDelete(teacherId) {
    try {
      const result = await Swal.fire({
        title: "Are you sure?",
        text: "You won't be able to revert this!",
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: "#3085d6",
        cancelButtonColor: "#d33",
        confirmButtonText: "Yes, delete it!",
      });

      if (result.isConfirmed) {
        const response = await axios.get(
          `https://mdl-coaching.onrender.com/teacherclass/deleteteachercls/${teacherId}`
        );
        if (response.data.success) {
          Swal.fire({
            title: "Deleted!",
            text: "The teacher has been removed from the class.",
            icon: "success",
          });
          handleAddClick(); // Refresh the list
        }
      }
    } catch (error) {
      Swal.fire({
        title: "Error!",
        text: "Failed to delete teacher.",
        icon: "error",
      });
    }
  }

  async function handleSubmit() {
    try {
      const response = await axios.post(
        `https://mdl-coaching.onrender.com/teacherclass/updateteachercls/${selectedTeacher._id}`,
        {
          SubjectName: selectedSubject,
        }
      );

      if (response.data.success) {
        setIsModalOpen(false);
        Swal.fire({
          title: "Updated!",
          text: `Subject updated to ${selectedSubject}.`,
          icon: "success",
        });
        handleAddClick(); // Refresh the list
      }
    } catch (error) {
      Swal.fire({
        title: "Error!",
        text: "Failed to update subject.",
        icon: "error",
      });
    }
  }

  return (
    <>
      <div className="flex flex-col min-h-screen">
        <Header />

        <div className="flex flex-1 bg-[#454649] p-5 sm:p-7 md:p-20 min-h-screen">
          <div className="max-w-4xl mx-auto bg-gray-700 p-6 rounded-lg shadow-md w-full">
            {loading ? (
              <div className="flex justify-center items-center h-96 w-full">
                <div className="flex space-x-2">
                  <div className="w-4 h-4 bg-yellow-400 rounded-full animate-bounce [animation-delay:-0.3s]"></div>
                  <div className="w-4 h-4 bg-yellow-400 rounded-full animate-bounce [animation-delay:-0.15s]"></div>
                  <div className="w-4 h-4 bg-yellow-400 rounded-full animate-bounce"></div>
                </div>
              </div>
            ) : (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.5 }}
              >
                <h1 className="text-3xl font-semibold text-yellow-500 mb-6">
                  Teacher's List for {classname}
                </h1>

                <div className="overflow-x-auto">
                  {teachers.length > 0 ? (
                    <table className="min-w-full bg-gray-800 border border-gray-600 text-white">
                      <thead>
                        <tr className="bg-gray-900 text-left">
                          <th className="p-3 border-b border-gray-600 text-yellow-400">Teacher ID</th>
                          <th className="p-3 border-b border-gray-600 text-yellow-400">Teacher's Name</th>
                          <th className="p-3 border-b border-gray-600 text-yellow-400">Subject</th>
                          <th className="p-3 border-b border-gray-600 text-center text-yellow-400">Edit Subject</th>
                          <th className="p-3 border-b border-gray-600 text-center text-yellow-400">Delete</th>
                        </tr>
                      </thead>
                      <tbody>
                        {teachers.map((teacher, index) => (
                          <motion.tr
                            key={teacher._id}
                            className="hover:bg-gray-700"
                            initial={{ opacity: 0, y: 10 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: index * 0.05 }}
                          >
                            <td className="p-3 border-b border-gray-600">
                              {teacher.TeacherId?.t_id || "N/A"}
                            </td>
                            <td className="p-3 border-b border-gray-600">
                              {`${teacher.TeacherId?.s_name || ""} ${teacher.TeacherId?.name || ""} ${teacher.TeacherId?.lname || ""}`}
                            </td>
                            <td className="p-3 border-b border-gray-600">
                              {teacher.SubjectName || "Not Assigned"}
                            </td>
                            <td className="p-3 border-b border-gray-600 text-center">
                              <button
                                className="text-blue-300 hover:text-blue-500"
                                onClick={() => handleUpdate(teacher)}
                              >
                                <Pencil className="inline-block w-5 h-5" />
                              </button>
                            </td>
                            <td className="p-3 border-b border-gray-600 text-center">
                              <button
                                className="text-red-400 hover:text-red-600"
                                onClick={() => handleDelete(teacher._id)}
                              >
                                <Trash2 className="inline-block w-5 h-5" />
                              </button>
                            </td>
                          </motion.tr>
                        ))}
                      </tbody>
                    </table>
                  ) : (
                    <div className="text-center text-white py-8 text-lg">
                      No teachers found.
                    </div>
                  )}
                </div>
              </motion.div>
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

        {/* Modal */}
        {isModalOpen && (
          <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
            <div className="bg-gray-800 w-96 p-6 rounded-lg shadow-lg relative text-white">
              <button
                className="absolute top-3 right-3 text-gray-400 hover:text-gray-200"
                onClick={() => setIsModalOpen(false)}
              >
                <X className="w-6 h-6" />
              </button>
              <h2 className="text-xl font-semibold mb-4">Update Subject</h2>
              <p className="mb-3">
                Teacher:{" "}
                <span className="font-medium">
                  {`${selectedTeacher?.TeacherId?.s_name || ""} ${selectedTeacher?.TeacherId?.name || ""} ${selectedTeacher?.TeacherId?.lname || ""}`}
                </span>
              </p>
              <label className="block font-medium mb-2">Select Subject:</label>

              <select
                name="classname"
                value={selectedSubject}
                onChange={(e) => setSelectedSubject(e.target.value)}
                className="w-full p-3 border border-white/30 rounded-lg bg-white/30 backdrop-blur-md focus:ring-2 focus:ring-purple-400 focus:outline-none transition-all duration-200 text-gray-900"
                required
              >
                <option value="">-- Select Subject --</option>
                {subjects.map((cls, index) => (
                  <option key={index}>{cls.subjectName}</option>
                ))}
              </select>

              <div className="flex justify-end gap-3 mt-5">
                <button
                  className="px-4 py-2 bg-gray-600 text-white rounded hover:bg-gray-500"
                  onClick={() => setIsModalOpen(false)}
                >
                  Cancel
                </button>
                <button
                  className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-500"
                  onClick={handleSubmit}
                >
                  Submit
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </>
  );
}

export default ShowTeachersList;
