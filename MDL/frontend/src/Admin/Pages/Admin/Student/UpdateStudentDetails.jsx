import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import {
  FaUser,
  FaCity,
  FaFlag,
  FaMoneyBillWave,
  FaIdCard,
  FaCalendarAlt,
  FaEye,
  FaEdit,
  FaCamera,
  FaPhone,
} from "react-icons/fa";
import Header from "../Home/Header";
import Footer from "../Home/Footer";
import Swal from "sweetalert2";
import axios from "axios";
import { AiOutlineArrowLeft } from "react-icons/ai";

function UpdateStudentDetails() {
  const [formData, setFormData] = useState({
    fname: "",
    mname: "",
    lname: "",
    dob: "",
    adharnumber: "",
    city: "",
    country: "",
    fee: "",
    passphoto: "",
  });
  const { studentId } = useParams();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  // const [preview, setPreview] = useState(null);

  // const handleFileChange = (e) => {
  //   const file = e.target.files[0];
  //   if (file) {
  //     setPreview(URL.createObjectURL(file));
  //   }
  // };

  const handleReset = () => {
    setFormData({
      fname: "",
      mname: "",
      lname: "",
      dob: "",
      adharnumber: "",
      city: "",
      country: "",
      fee: "",
      mobilenumber:"",
      passphoto: "",
    });
  };

  const updateStudentDetails = async (e) => {
    e.preventDefault();
    try {
      const url = `https://mdl-coaching.onrender.com/student/Updatestudentdetails/${studentId}`;

      const response = await axios.post(url, formData, {
        headers: { "Content-Type": "application/json" },
      });
    } catch (error) {
      console.log("Error for update:", error);
    }
  };

  useEffect(() => {
    fetchdata();
  }, [studentId]);

  const fetchdata = async () => {
    try {
      const response = await axios.get(
        `https://mdl-coaching.onrender.com/student/showprofile/${studentId}`
      );
      console.log("Notice by id :: ", response.data.data);
      setFormData(response.data.data);
    } catch (error) {
      console.log("Not Found Error", error);
    }
  };

  return (
    <div className="flex flex-col min-h-screen bg-[#454649] text-white">
      <Header />

      <div className="flex flex-1 p-6 mt-20 min-h-screen">
        <div className="flex-1 bg-gray-800 p-10 rounded-lg shadow-lg max-w-4xl mx-auto min-h-screen">
          <h2 className="text-3xl font-bold mb-6 text-center text-yellow-400">
            Update Student Details
          </h2>
          {/* <div className="flex flex-col items-center">
            
            <div className="flex flex-col items-center">
             
              <div className="relative w-20 h-20 sm:w-24 sm:h-24 md:w-28 md:h-28 rounded-full shadow-md overflow-hidden flex items-center justify-center border-2 border-green-500">
                {preview ? (
                  <img
                    src={preview}
                    alt="Profile Preview"
                    className="w-full h-full object-cover"
                  />
                ) : (
                  <span className="text-gray-400 text-xs sm:text-sm">
                    No Image
                  </span>
                )}

                
                <label
                  htmlFor="fileInput"
                  className="absolute bottom-1 right-1 bg-gray-800 w-6 h-6 sm:w-8 sm:h-8 md:w-10 md:h-10 rounded-full flex items-center justify-center border border-white cursor-pointer shadow"
                >
                  <FaCamera className="w-3 h-3 sm:w-4 sm:h-4 md:w-5 md:h-5 text-white" />
                </label>
              </div>

              
              <input
                type="file"
                id="fileInput"
                className="hidden"
                accept="image/*"
                onChange={handleFileChange}
              />
            </div>
          </div> */}

          <form
            onSubmit={updateStudentDetails}
            className="grid grid-cols-1 md:grid-cols-2 gap-6"
          >
            <div className="col-span-1 md:col-span-2">
              <label className="text-yellow-200 font-medium mb-1">
                Student ID: {formData.s_id}
              </label>
            </div>

            {[
              {
                label: "First Name",
                name: "fname",
                icon: <FaUser className="text-blue-400" />,
                type: "text",
                placeholder: "Enter Surname",
              },
              {
                label: "Middle Name",
                name: "mname",
                icon: <FaUser className="text-green-400" />,
                type: "text",
                placeholder: "Enter Name",
              },
              {
                label: "Last Name",
                name: "lname",
                icon: <FaUser className="text-red-400" />,
                type: "text",
                placeholder: "Enter Father's Name",
              },
              {
                label: "Date of Birth",
                name: "dob",
                icon: <FaCalendarAlt className="text-yellow-400" />,
                type: "date",
                placeholder: "Select Date of Birth",
              },
              {
                label: "Aadhar Number",
                name: "adharnumber",
                icon: <FaIdCard className="text-purple-400" />,
                type: "number",
                placeholder: "Enter Aadhar Number",
              },
              {
                label: "City",
                name: "city",
                icon: <FaCity className="text-orange-400" />,
                type: "text",
                placeholder: "Enter City",
              },
              {
                label: "Country",
                name: "country",
                icon: <FaFlag className="text-pink-400" />,
                type: "text",
                placeholder: "Enter Country",
              },
              {
                label: "Fee Amount",
                name: "fee",
                icon: <FaMoneyBillWave className="text-teal-400" />,
                type: "text",
                placeholder: "Enter Fee Amount",
              },
              {
                label: "Mobile Number",
                name: "mobilenumber",
                icon: <FaPhone  className="text-teal-400" />,
                type: "text",
                placeholder: "Enter Mobile Number",
              },
            ].map((field, index) => (
              <div key={index} className="flex flex-col">
                <label className="text-gray-300 font-medium mb-1">
                  {field.label}
                </label>
                <div className="relative flex items-center">
                  <span className="absolute left-3">{field.icon}</span>
                  <input
                    type={field.type}
                    name={field.name}
                    value={formData[field.name]}
                    onChange={handleChange}
                    placeholder={field.placeholder}
                    className="w-full pl-12 p-3 border border-gray-600 rounded-lg bg-gray-700 text-white focus:outline-none focus:ring-2 focus:ring-blue-400 transition"
                  />
                </div>
              </div>
            ))}

            {/* <input
              id="fileInput"
              type="file"
              onChange={handleFileChange}
              className="hidden"
            /> */}

            <div className="col-span-1 md:col-span-2 flex flex-col gap-2">
              <button
                type="submit"
                className="w-full bg-green-500 text-white p-2 rounded-lg hover:bg-green-600 transition"
              >
                Update
              </button>
              <button
                type="button"
                onClick={handleReset}
                className="w-full bg-red-500 text-white p-2 rounded-lg hover:bg-red-600 transition"
              >
                Reset
              </button>
            </div>
          </form>
          {/* <Link
            to={"/addstudents"}
            className="block text-center mt-4 text-blue-400 hover:underline"
          >
            Go Back
          </Link> */}
        </div>
      </div>
      <Link
        to={`/addstudents/showstudentdetails/studentdetails/${localStorage.getItem("studentclass")}`}
        className="fixed bottom-6 left-4 text-white bg-green-600 p-3 rounded-full hover:bg-green-700 transition duration-300"
      >
        <AiOutlineArrowLeft size={24} />
      </Link>
      <Footer />
    </div>
  );
}

export default UpdateStudentDetails;

// import React, { useEffect, useState } from "react";
// import { Link, useParams } from "react-router-dom";
// import {
//   FaUser,
//   FaCity,
//   FaFlag,
//   FaMoneyBillWave,
//   FaIdCard,
//   FaCalendarAlt,
//   FaCamera,
//   FaPhone,
// } from "react-icons/fa";
// import Header from "../Home/Header";
// import Footer from "../Home/Footer";
// import Swal from "sweetalert2";
// import axios from "axios";
// import { AiOutlineArrowLeft } from "react-icons/ai";

// function UpdateStudentDetails() {
//   const [formData, setFormData] = useState({
//     fname: "",
//     mname: "",
//     lname: "",
//     dob: "",
//     adharnumber: "",
//     city: "",
//     country: "",
//     fee: "",
//     mobilenumber: "",
//     passphoto: "",
//   });
//   const [preview, setPreview] = useState(null);
//   const [fileChanged, setFileChanged] = useState(false);
//   const { studentId } = useParams();

//   useEffect(() => {
//     fetchdata();
//   }, [studentId]);

//   const fetchdata = async () => {
//     try {
//       const response = await axios.get(
//         `https://mdl-coaching.onrender.com/student/showprofile/${studentId}`
//       );
//       setFormData(response.data.data);
//       // Set initial preview from server image
//       if (response.data.data.passphoto) {
//         setPreview(`https://mdl-coaching.onrender.com/images/${response.data.data.passphoto}`);
//       }
//     } catch (error) {
//       console.log("Not Found Error", error);
//     }
//   };

//   const handleChange = (e) => {
//     setFormData({ ...formData, [e.target.name]: e.target.value });
//   };

//   const handleFileChange = (e) => {
//     const file = e.target.files[0];
//     if (file) {
//       // Create local preview URL for new image
//       const localPreview = URL.createObjectURL(file);
//       setPreview(localPreview);
//       setFileChanged(true);
//       setFormData({ ...formData, passphoto: file });
//     }
//   };

//   // Cleanup preview URL when component unmounts or when new file is selected
//   useEffect(() => {
//     return () => {
//       if (preview && preview.startsWith('blob:')) {
//         URL.revokeObjectURL(preview);
//       }
//     };
//   }, [preview]);

//   const updateStudentDetails = async (e) => {
//     e.preventDefault();
//     try {
//       const url = `https://mdl-coaching.onrender.com/student/Updatestudentdetails/${studentId}`;
//       const formDataToSend = new FormData();
      
//       Object.keys(formData).forEach((key) => {
//         if (key !== "passphoto" || fileChanged) {
//           formDataToSend.append(key, formData[key]);
//         }
//       });
      
//       const response = await axios.post(url, formDataToSend, {
//         headers: { "Content-Type": "multipart/form-data" },
//       });

//       Swal.fire("Success", "Student details updated successfully", "success");
//     } catch (error) {
//       console.log("Error updating student details:", error);
//       Swal.fire("Error", "Failed to update student details", "error");
//     }
//   };

//   return (
//     <div className="flex flex-col min-h-screen bg-[#454649] text-white">
//       <Header />
//       <div className="flex flex-1 p-6 mt-20 min-h-screen">
//         <div className="flex-1 bg-gray-800 p-10 rounded-lg shadow-lg max-w-4xl mx-auto min-h-screen">
//           <h2 className="text-3xl font-bold mb-6 text-center text-yellow-400">
//             Update Student Details
//           </h2>
//           <div className="flex flex-col items-center">
//             <div className="relative w-28 h-28 rounded-full overflow-hidden border-2 border-green-500">
//               {preview ? (
//                 <img 
//                   src={preview} 
//                   alt="Profile Preview" 
//                   className="w-full h-full object-cover" 
//                 />
//               ) : (
//                 <span className="text-gray-400 text-xs">No Image</span>
//               )}
//               <label 
//                 htmlFor="fileInput" 
//                 className="absolute bottom-1 right-1 bg-gray-800 p-2 rounded-full cursor-pointer"
//               >
//                 <FaCamera className="text-white" />
//               </label>
//             </div>
//             <input 
//               type="file" 
//               id="fileInput" 
//               className="hidden" 
//               accept="image/*" 
//               onChange={handleFileChange} 
//             />
//           </div>
//           <form onSubmit={updateStudentDetails} className="grid grid-cols-1 md:grid-cols-2 gap-6">
//             {[
//               { label: "First Name", name: "fname", type: "text" },
//               { label: "Middle Name", name: "mname", type: "text" },
//               { label: "Last Name", name: "lname", type: "text" },
//               { label: "Date of Birth", name: "dob", type: "date" },
//               { label: "Aadhar Number", name: "adharnumber", type: "number" },
//               { label: "City", name: "city", type: "text" },
//               { label: "Country", name: "country", type: "text" },
//               { label: "Fee Amount", name: "fee", type: "text" },
//               { label: "Mobile Number", name: "mobilenumber", type: "text" },
//             ].map((field, index) => (
//               <div key={index} className="flex flex-col">
//                 <label className="text-gray-300 font-medium mb-1">{field.label}</label>
//                 <input
//                   type={field.type}
//                   name={field.name}
//                   value={formData[field.name]}
//                   onChange={handleChange}
//                   className="p-3 border border-gray-600 rounded-lg bg-gray-700 text-white"
//                 />
//               </div>
//             ))}
//             <button type="submit" className="bg-green-500 text-white p-2 rounded-lg hover:bg-green-600 transition">
//               Update
//             </button>
//           </form>
//           <Link to="/addstudents" className="block text-center mt-4 text-blue-400 hover:underline">
//             Go Back
//           </Link>
//         </div>
//       </div>
//       <Footer />
//     </div>
//   );
// }

// export default UpdateStudentDetails;
