// import React, { useEffect, useState } from "react";
// import { Link, useParams } from "react-router-dom";
// import Header from "../Home/Header";
// import Footer from "../Home/Footer";
// import { AiOutlineArrowLeft } from "react-icons/ai";
// import axios from "axios";
// function DisplayStudentDetails() {
//   const [studentDetails, setStudentDetails] = useState();
//   useEffect(() => {
//     profile();
//   }, []);
//   const profile = async () => {
//     try {
//       const studentid = localStorage.getItem("studentid");
//       const res = await axios.get(
//         `https://mdl-coaching.onrender.com/student/showprofile/${studentid}`
//       );
//       console.log(res.data);
//       setStudentDetails(res.data.data);
//     } catch (error) {
//       console.log(error);
//     }
//   };
//   return (
//     <div className="flex flex-col min-h-screen bg-[#454649] text-gray-900">
//       {/* Header */}
//       <Header />

//       {/* Main Content */}
//       <div className="flex flex-1 items-center justify-center p-6 min-h-screen mt-14">
//         <div className="bg-white shadow-lg rounded-lg p-8 max-w-2xl w-full">
//           <h1 className="text-3xl font-bold text-center mb-6 text-black">
//             Student I-Card
//           </h1>

//           {/* Student Avatar */}
//           {/* <div className="flex justify-center mb-6">
//             <img
//               src={`https://mdl-coaching.onrender.com/images/${studentDetails.passphoto}`}
//               alt="Student Avatar"
//               className="w-32 h-32 rounded-full border-4 border-gray-300 bg-gray-200"
//             />
//           </div> */}

//           {/* Student Details */}
//           {/* <div className="grid grid-cols-1 sm:grid-cols-2 gap-6"> */}

//             {studentDetails.map((detail, index) => (
//               <div key={index} className="student-info">
//                 <p>
//                   <strong>Name:</strong> {detail.fname} {detail.lname}
//                 </p>
//                 <p>
//                   <strong>Roll No:</strong> {detail.s_id}
//                 </p>
//                 <p>
//                   <strong>Gender:</strong> {detail.gender || "N/A"}
//                 </p>
//                 <p>
//                   <strong>Date of Birth:</strong> {detail.dob}
//                 </p>
//                 <p>
//                   <strong>Aadhaar Number:</strong> {detail.aadhaar || "N/A"}
//                 </p>
//                 <p>
//                   <strong>Address:</strong> {detail.address || "N/A"}
//                 </p>
//                 <p>
//                   <strong>City:</strong> {detail.city || "N/A"}
//                 </p>
//                 <p>
//                   <strong>Country:</strong> {detail.country || "N/A"}
//                 </p>
//                 <p>
//                   <strong>Class:</strong> {detail.s_class}
//                 </p>
//                 <p>
//                   <strong>Amount:</strong> N/A
//                 </p>
//               </div>
//             ))}
//           {/* </div> */}
//         </div>
//       </div>
//       <Link
//         to="/addstudents/showstudentdetails"
//         className="fixed bottom-6 left-4 text-white bg-green-600 p-3 rounded-full hover:bg-green-700 transition duration-300"
//       >
//         <AiOutlineArrowLeft size={24} />
//       </Link>
//       {/* Footer */}
//       <Footer />
//     </div>
//   );
// }

// export default DisplayStudentDetails;
import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import Header from "../Home/Header";
import Footer from "../Home/Footer";
import { AiOutlineArrowLeft } from "react-icons/ai";
import axios from "axios";

function DisplayStudentDetails() {
  const { studentId } = useParams();
  const [studentDetails, setStudentDetails] = useState({
  }); // Initialize as empty array

  useEffect(() => {
    profile();
  }, [studentId]);

  const profile = async () => {
    try {
      const res = await axios.get(
        `https://mdl-coaching.onrender.com/student/showprofile/${studentId}`
      );
      console.log(res.data.data);
      setStudentDetails(res.data.data); // Ensure it's an array
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="flex flex-col min-h-screen bg-[#454649] text-gray-900">
      {/* Header */}
      <Header />

      {/* Main Content */}
      <div className="flex items-center justify-center min-h-screen bg-[#454649] p-6">
        <div className="bg-white shadow-xl rounded-lg overflow-hidden w-[320px] sm:w-[400px] border border-gray-300">
          {/* Header */}
          <div className="bg-indigo-600 text-white text-center py-4">
            <h2 className="text-lg font-bold">STUDENT ID CARD</h2>
          </div>

          {/* Profile Image */}
          <div className="flex justify-center mt-4">
            <div className="relative w-24 h-24 sm:w-28 sm:h-28">
              <img
                src={`https://mdl-coaching.onrender.com/images/${studentDetails.passphoto}`}
                alt="Student"
                className="w-full h-full rounded-full border-4 border-indigo-500 shadow-md  transition-transform transform hover:scale-110"
              />
            </div>
          </div>

          {/* Student Name */}
          <h1 className="text-center mt-3 text-xl sm:text-2xl font-bold text-gray-800">
            {studentDetails.fname} {studentDetails.mname} {studentDetails.lname}
          </h1>
          <h1 className="text-center mt-2 font-bold text-gray-800">
            Student ID:{studentDetails?.s_id}
          </h1>

          {/* Student Details */}
          <div className="mt-4 px-6 py-4 bg-gray-100 rounded-b-lg text-sm">
            <div className="grid grid-cols-2 gap-2">
              <div className="font-semibold text-gray-700">Class:</div>
              <div className="text-gray-900">{studentDetails?.s_class}</div>

              <div className="font-semibold text-gray-700">DOB:</div>
              <div className="text-gray-900">{studentDetails?.dob}</div>

              <div className="font-semibold text-gray-700">Gender:</div>
              <div className="text-gray-900">
                {studentDetails?.gender || "N/A"}
              </div>

              <div className="font-semibold text-gray-700">Address:</div>
              <div className="text-gray-900">
                {studentDetails?.adress || "N/A"}
              </div>

              <div className="font-semibold text-gray-700">City:</div>
              <div className="text-gray-900">
                {studentDetails?.city}
              </div>

              <div className="font-semibold text-gray-700">Country:</div>
              <div className="text-gray-900">
                {studentDetails?.country}
              </div>

              <div className="font-semibold text-gray-700">Aadhaar:</div>
              <div className="text-gray-900">
                {studentDetails?.adharnumber}
              </div>

              <div className="font-semibold text-gray-700">Fee Amount:</div>
              <div className="text-gray-900">
                {studentDetails?.fee}
              </div>


              <div className="font-semibold text-gray-700">Mobile Number:</div>
              <div className="text-gray-900">
                {studentDetails?.mobilenumber}
              </div>
            </div>
          </div>
        </div>
      </div>

      <Link
        // to={`/addstudents/showstudentdetails/studentdetails/${localStorage.getItem("studentclass")}`}
        to={`/addstudents/showstudentdetails/studentdetails/${studentDetails.s_class}`}

        className="fixed bottom-6 left-4 text-white bg-green-600 p-3 rounded-full hover:bg-green-700 transition duration-300"
      >
        <AiOutlineArrowLeft size={24} />
      </Link>
      
      <Footer />
    </div>
  );
}

export default DisplayStudentDetails;
