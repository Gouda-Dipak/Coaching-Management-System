// import React, { useEffect, useState } from "react";
// import { Link, useParams } from "react-router-dom";
// import Swal from "sweetalert2";
// import axios from "axios";
// import {
//   FiUser,
//   FiMail,
//   FiPhone,
//   FiCalendar,
//   FiHash,
//   FiBook,
//   FiCreditCard,
//   FiHome,
//   FiCamera,
//   FiAward,
//   FiPhoneCall,
// } from "react-icons/fi";
// import Header from "../Home/Header";
// import Footer from "../Home/Footer";
// import { AiOutlineArrowLeft } from "react-icons/ai";
// import { FaCamera } from "react-icons/fa";

// function UpdateTeacherDetails() {
//   const { teacherid } = useParams();
//   const [formData, setFormData] = useState({
//     t_id: "",
//     s_name: "",
//     name: "",
//     lname: "",
//     email: "",
//     mobilenumber: "",
//     aadhaarNumber: "",
//     dob: "",
//     qualification: "",
//     course: "",
//     address: "",
//     subject: "",
//     photo: null,
//   });

//   function handleChange(e) {
//     setFormData({ ...formData, [e.target.name]: e.target.value });
//   }
//   function resetForm() {
//     setFormData({
//       t_id: "",
//       s_name: "",
//       name: "",
//       lname: "",
//       email: "",
//       mobilenumber: "",
//       aadhaarNumber: "",
//       dob: "",
//       qualification: "",
//       course: "",
//       address: "",
//       subject: "",
//       photo: null,
//     });
//   }
//   const fieldOrder = [
//     "s_name",
//     "name",
//     "lname",
//     "email",
//     "mobilenumber",
//     "aadhaarNumber",
//     "dob",
//     "qualification",
//     "course",
//   ];

//   const icons = {
//     s_name: (
//       <FiUser className="absolute left-1 top-10 w-5 h-5 transform  text-yellow-400" />
//     ),
//     name: (
//       <FiUser className="absolute left-1 top-10 w-5 h-5 transform  text-yellow-400" />
//     ),
//     lname: (
//       <FiUser className="absolute left-1 top-10 w-5 h-5 size transform  text-yellow-400" />
//     ),
//     email: (
//       <FiMail className="absolute left-1 top-10 w-5 h-5 transform  text-yellow-400" />
//     ),
//     mobilenumber: (
//       <FiPhoneCall className="absolute left-1 top-10 w-5 h-5 transform  text-yellow-400" />
//     ),
//     dob: (
//       <FiCalendar className="absolute left-1 top-10 w-5 h-5 transform  text-yellow-400" />
//     ),
//     qualification: (
//       <FiAward className="absolute left-1 top-10 w-5 h-5 transform  text-yellow-400" />
//     ),
//     course: (
//       <FiBook className="absolute left-1 top-10 w-5 h-5 transform  text-yellow-400" />
//     ), // Fixed alignment

//     address: (
//       <FiHome className="absolute left-1 top-10 w-5 h-5 transform  text-yellow-400" />
//     ),

//     subject: (
//       <FiBook className="absolute left-1 top-10 w-5 h-5 transform  text-yellow-400" />
//     ),
//     photo: (
//       <FiCamera className="absolute left-1 top-10 w-5 h-5 transform  text-yellow-400" />
//     ),
//   };

//   useEffect(() => {
//     fetchdata();
//   }, [teacherid]);

//   const fetchdata = async () => {
//     try {
//       const response = await axios.get(
//         `https://mdl-coaching.onrender.com/teacher/displaydata/${teacherid}`
//       );
//       console.log("Teacher by id :: ", response.data.data);
//       setFormData(response.data.data);
//     } catch (error) {
//       console.log("Not Found Error", error);
//     }
//   };
//   const [subjects, setSubjects] = useState([]);
//   useEffect(() => {
//     getsubject();
//   }, [teacherid]);
//   const handlesubjectChange = (event) => {
//     const selectedValue = JSON.parse(event.target.value);
//     setFormData({
//       ...formData,
//       subject: selectedValue.name,
//       subject_Id: selectedValue.id,
//     });
//   };

//   const getsubject = async () => {
//     try {
//       const res = await axios.get("https://mdl-coaching.onrender.com/subject/getsubjects");
//       console.log(res.data);
//       setSubjects(res.data.data);
//     } catch (error) {
//       console.log(error);
//     }
//   };
//   const updateTeachertDetails = async (e) => {
//     e.preventDefault();
  
//     // SweetAlert Confirm Box
//     const result = await Swal.fire({
//       title: "Are you sure?",
//       text: "Do you want to update the teacher details?",
//       icon: "warning",
//       showCancelButton: true,
//       confirmButtonText: "Update Data",
//       cancelButtonText: "Cancel",
//     });
  
//     if (result.isConfirmed) {
//       try {
//         const url = `https://mdl-coaching.onrender.com/teacher/UpdateTeacherdetails/${teacherid}`;
  
//         const response = await axios.post(url, formData, {
//           headers: { "Content-Type": "application/json" },
//         });
  
//         Swal.fire({
//           icon: "success",
//           title: "Success",
//           text: "Teacher details updated successfully!",
//         });
//       } catch (error) {
//         console.log("Error for update:", error);
  
//         Swal.fire({
//           icon: "error",
//           title: "Update Failed",
//           text: "Something went wrong! Please try again.",
//         });
//       }
//     } else {
//       Swal.fire({
//         icon: "info",
//         title: "Cancelled",
//         text: "Update operation was cancelled.",
//       });
//     }
//   };
//   return (
//     <div className="flex flex-col min-h-screen bg-gradient-to-r bg-[#454649]">
//       <Header />
//       <div className="flex flex-1 p-4 sm:p-6 md:p-10 bg-[#454649] min-h-screen">
//         <div className="w-full max-w-4xl mx-auto bg-transparent p-6 sm:p-8">
//           <h1 className="text-3xl sm:text-4xl font-bold text-yellow-400 mb-4 sm:mb-6 text-center">
//             Update Teacher Details
//           </h1>

          
//           <form className="space-y-5">
//             {/* Teacher ID */}
//             <div className="flex flex-col sm:flex-row justify-center items-center bg-gray-700 px-4 py-3 rounded-lg">
//               <FiHash className="text-gray-400 mr-2" size={20} />
//               <span className="text-lg font-semibold text-gray-100">
//                 Teacher ID:{" "}
//                 <span className="text-yellow-400">{formData.t_id}</span>
//               </span>
//             </div>

//             {/* Input Fields */}
//             <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6">
//               {fieldOrder
//                 .filter(
//                   (key) =>
//                     formData[key] &&
//                     !["photo", "t_id", "address", "subject"].includes(key)
//                 )
//                 .map((key) => (
//                   <div key={key} className="relative">
//                     <label className="text-gray-300 block mb-1">
//                       {key.charAt(0).toUpperCase() + key.slice(1)}
//                     </label>
//                     <div className="absolute inset-y-0 left-3 flex items-center">
//                       {icons[key]}
//                     </div>
//                     <input
//                       type={
//                         key === "email"
//                           ? "email"
//                           : key === "dob"
//                           ? "date"
//                           : "text"
//                       }
//                       name={key}
//                       value={formData[key]}
//                       onChange={handleChange}
//                       placeholder={key.charAt(0).toUpperCase() + key.slice(1)}
//                       className="w-full pl-12 p-3 border border-gray-500 rounded-lg bg-[#454649] text-white focus:ring-2 focus:ring-blue-400 transition duration-200"
//                     />
//                   </div>
//                 ))}

//               {/* Address Field */}
//               <div className="relative col-span-1 sm:col-span-2">
//                 <label className="text-gray-300 block mb-1">Address</label>
//                 <div className="absolute inset-y-0 left-3 flex items-center">
//                   {icons.address}
//                 </div>
//                 <textarea
//                   name="address"
//                   value={formData.address}
//                   onChange={handleChange}
//                   placeholder="Address"
//                   className="w-full pl-12 p-3 border border-gray-500 rounded-lg bg-[#454649] text-white focus:ring-2 focus:ring-blue-400 transition duration-200"
//                   rows="3"
//                 ></textarea>
//               </div>

//               {/* Subject Dropdown */}
//               <div className="relative">
//                 <label className="text-gray-300 block mb-1">Subject</label>
//                 <div className="absolute inset-y-0 left-3 flex items-center">
//                   {icons.subject}
//                 </div>
//                 <select
//                   name="subject"
//                   onChange={handlesubjectChange}
//                   className="w-full pl-12 p-3 border border-gray-500 rounded-lg bg-[#454649] text-white focus:ring-2 focus:ring-blue-400"
//                   required
//                 >
//                   <option value="">-- Select Class --</option>
//                   {subjects.map((sub, index) => (
//                     <option
//                       value={JSON.stringify({
//                         id: sub._id,
//                         name: sub.subjectName,
//                       })}
//                       key={index}
//                     >
//                       {sub.subjectName}
//                     </option>
//                   ))}
//                 </select>
//               </div>

              
//             </div>

//             {/* Buttons */}
//             <div className="flex flex-col sm:flex-row gap-3 mt-6">
//               <button
//                 type="button"
//                 className="w-full sm:w-auto px-6 py-3 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition duration-300"
//               onClick={updateTeachertDetails}
//               >
//                 Update
//               </button>
//               <button
//                 type="button"
//                 onClick={resetForm}
//                 className="w-full sm:w-auto px-6 py-3 bg-red-500 text-white rounded-lg hover:bg-red-600 transition duration-300"
//               >
//                 Reset
//               </button>
//             </div>
//           </form>
//         </div>
//       </div>
//       <Link
//           to="/showclassTeacher/showallteacherlist"
//           className="fixed bottom-6 left-4 text-white bg-green-600 p-3 rounded-full hover:bg-green-700 transition duration-300"
//         >
//           <AiOutlineArrowLeft size={24} />
//         </Link>
//       <Footer />
//     </div>
//   );
// }
// export default UpdateTeacherDetails;
import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import Swal from "sweetalert2";
import axios from "axios";
import {
  FiUser,
  FiMail,
  FiPhoneCall,
  FiCalendar,
  FiHash,
  FiBook,
  FiCreditCard,
  FiHome,
  FiCamera,
  FiAward,
} from "react-icons/fi";
import Header from "../Home/Header";
import Footer from "../Home/Footer";
import { AiOutlineArrowLeft } from "react-icons/ai";
import { motion } from "framer-motion";

function UpdateTeacherDetails() {
  const { teacherid } = useParams();
  const [loading, setLoading] = useState(true);
  const [formData, setFormData] = useState({
    t_id: "",
    s_name: "",
    name: "",
    lname: "",
    email: "",
    mobilenumber: "",
    aadhaarNumber: "",
    dob: "",
    qualification: "",
    course: "",
    address: "",
    subject: "",
    photo: null,
  });

  const fieldOrder = [
    "s_name",
    "name",
    "lname",
    "email",
    "mobilenumber",
    "aadhaarNumber",
    "dob",
    "qualification",
    "course",
  ];

  const icons = {
    s_name: <FiUser className="text-yellow-400" />,
    name: <FiUser className="text-yellow-400" />,
    lname: <FiUser className="text-yellow-400" />,
    email: <FiMail className="text-yellow-400" />,
    mobilenumber: <FiPhoneCall className="text-yellow-400" />,
    dob: <FiCalendar className="text-yellow-400" />,
    qualification: <FiAward className="text-yellow-400" />,
    course: <FiBook className="text-yellow-400" />,
    address: <FiHome className="text-yellow-400" />,
    subject: <FiBook className="text-yellow-400" />,
    photo: <FiCamera className="text-yellow-400" />,
  };

  const [subjects, setSubjects] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const teacherRes = await axios.get(`https://mdl-coaching.onrender.com/teacher/displaydata/${teacherid}`);
        setFormData(teacherRes.data.data);
        const subjectRes = await axios.get("https://mdl-coaching.onrender.com/subject/getsubjects");
        setSubjects(subjectRes.data.data);
        setTimeout(() => setLoading(false), 1000); // Simulate loading
      } catch (error) {
        console.log("Error:", error);
        setLoading(false);
      }
    };
    fetchData();
  }, [teacherid]);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const resetForm = () => {
    setFormData({
      t_id: "",
      s_name: "",
      name: "",
      lname: "",
      email: "",
      mobilenumber: "",
      aadhaarNumber: "",
      dob: "",
      qualification: "",
      course: "",
      address: "",
      subject: "",
      photo: null,
    });
  };

  const handlesubjectChange = (event) => {
    const selectedValue = JSON.parse(event.target.value);
    setFormData({
      ...formData,
      subject: selectedValue.name,
      subject_Id: selectedValue.id,
    });
  };

  const updateTeachertDetails = async (e) => {
    e.preventDefault();

    const result = await Swal.fire({
      title: "Are you sure?",
      text: "Do you want to update the teacher details?",
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: "Update Data",
      cancelButtonText: "Cancel",
    });

    if (result.isConfirmed) {
      try {
        await axios.post(
          `https://mdl-coaching.onrender.com/teacher/UpdateTeacherdetails/${teacherid}`,
          formData,
          {
            headers: { "Content-Type": "application/json" },
          }
        );

        Swal.fire({
          icon: "success",
          title: "Success",
          text: "Teacher details updated successfully!",
        });
      } catch (error) {
        console.log("Error for update:", error);

        Swal.fire({
          icon: "error",
          title: "Update Failed",
          text: "Something went wrong! Please try again.",
        });
      }
    } else {
      Swal.fire({
        icon: "info",
        title: "Cancelled",
        text: "Update operation was cancelled.",
      });
    }
  };

  return (
    <div className="flex flex-col min-h-screen bg-[#454649]">
      <Header />
      <div className="flex flex-1 p-4 sm:p-6 md:p-10 bg-[#454649] min-h-screen">
        {loading ? (
          <div className="flex justify-center items-center w-full h-[300px]">
            <div className="flex space-x-2">
              <div className="w-4 h-4 bg-yellow-400 rounded-full animate-bounce [animation-delay:-0.3s]" />
              <div className="w-4 h-4 bg-yellow-400 rounded-full animate-bounce [animation-delay:-0.15s]" />
              <div className="w-4 h-4 bg-yellow-400 rounded-full animate-bounce" />
            </div>
          </div>
        ) : (
          <motion.div
            initial="hidden"
            animate="visible"
            variants={{
              hidden: {},
              visible: {
                transition: {
                  staggerChildren: 0.15,
                },
              },
            }}
            className="w-full max-w-4xl mx-auto bg-transparent p-6 sm:p-8"
          >
            <h1 className="text-3xl sm:text-4xl font-bold text-yellow-400 mb-4 sm:mb-6 text-center">
              Update Teacher Details
            </h1>

            <form className="space-y-5">
              <motion.div
                variants={{
                  hidden: { opacity: 0, y: 20 },
                  visible: { opacity: 1, y: 0 },
                }}
                transition={{ duration: 0.4 }}
                className="flex flex-col sm:flex-row justify-center items-center bg-gray-700 px-4 py-3 rounded-lg"
              >
                <FiHash className="text-gray-400 mr-2" size={20} />
                <span className="text-lg font-semibold text-gray-100">
                  Teacher ID:{" "}
                  <span className="text-yellow-400">{formData.t_id}</span>
                </span>
              </motion.div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6">
                {fieldOrder.map((key) => (
                  <motion.div
                    key={key}
                    variants={{
                      hidden: { opacity: 0, y: 20 },
                      visible: { opacity: 1, y: 0 },
                    }}
                    transition={{ duration: 0.4 }}
                    className="relative"
                  >
                    <label className="text-gray-300 block mb-1">
                      {key.charAt(0).toUpperCase() + key.slice(1)}
                    </label>
                    <div className="absolute left-3 top-10">
                      {icons[key]}
                    </div>
                    <input
                      type={key === "email" ? "email" : key === "dob" ? "date" : "text"}
                      name={key}
                      value={formData[key]}
                      onChange={handleChange}
                      className="w-full pl-12 p-3 border border-gray-500 rounded-lg bg-[#454649] text-white focus:ring-2 focus:ring-blue-400"
                    />
                  </motion.div>
                ))}

                <motion.div
                  variants={{
                    hidden: { opacity: 0, y: 20 },
                    visible: { opacity: 1, y: 0 },
                  }}
                  transition={{ duration: 0.4 }}
                  className="relative col-span-1 sm:col-span-2"
                >
                  <label className="text-gray-300 block mb-1">Address</label>
                  <div className="absolute left-3 top-10">{icons.address}</div>
                  <textarea
                    name="address"
                    value={formData.address}
                    onChange={handleChange}
                    className="w-full pl-12 p-3 border border-gray-500 rounded-lg bg-[#454649] text-white focus:ring-2 focus:ring-blue-400"
                    rows="3"
                  ></textarea>
                </motion.div>

                <motion.div
                  variants={{
                    hidden: { opacity: 0, y: 20 },
                    visible: { opacity: 1, y: 0 },
                  }}
                  transition={{ duration: 0.4 }}
                  className="relative"
                >
                  <label className="text-gray-300 block mb-1">Subject</label>
                  <div className="absolute left-3 top-10">{icons.subject}</div>
                  <select
                    name="subject"
                    onChange={handlesubjectChange}
                    className="w-full pl-12 p-3 border border-gray-500 rounded-lg bg-[#454649] text-white focus:ring-2 focus:ring-blue-400"
                    required
                  >
                    <option value="">-- Select Subject --</option>
                    {subjects.map((sub, index) => (
                      <option
                        key={index}
                        value={JSON.stringify({ id: sub._id, name: sub.subjectName })}
                      >
                        {sub.subjectName}
                      </option>
                    ))}
                  </select>
                </motion.div>
              </div>

              <motion.div
                variants={{
                  hidden: { opacity: 0, y: 20 },
                  visible: { opacity: 1, y: 0 },
                }}
                transition={{ duration: 0.4 }}
                className="flex flex-col sm:flex-row gap-3 mt-6"
              >
                <button
                  type="button"
                  className="w-full sm:w-auto px-6 py-3 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition duration-300"
                  onClick={updateTeachertDetails}
                >
                  Update
                </button>
                <button
                  type="button"
                  onClick={resetForm}
                  className="w-full sm:w-auto px-6 py-3 bg-red-500 text-white rounded-lg hover:bg-red-600 transition duration-300"
                >
                  Reset
                </button>
              </motion.div>
            </form>
          </motion.div>
        )}
      </div>

      <Link
        to="/showclassTeacher/showallteacherlist"
        className="fixed bottom-6 left-4 text-white bg-green-600 p-3 rounded-full hover:bg-green-700 transition duration-300"
      >
        <AiOutlineArrowLeft size={24} />
      </Link>
      <Footer />
    </div>
  );
}

export default UpdateTeacherDetails;
