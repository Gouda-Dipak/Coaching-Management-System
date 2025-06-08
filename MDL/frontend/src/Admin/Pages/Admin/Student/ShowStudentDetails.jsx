// import React, { useEffect, useState } from "react";
// import { Link } from "react-router-dom";
// import Header from "../Home/Header";
// import Footer from "../Home/Footer";
// import { AiOutlineArrowLeft, AiOutlineEye } from "react-icons/ai";
// import axios from "axios";
// function ShowStudentDetails() {
//   const [classes, setClasses] = useState([]);

//   useEffect(() => {
//     getclasses();
//   }, []);

//   const getclasses = async () => {
//     try {
//       const res = await axios.get("https://mdl-coaching.onrender.com/class/getclasses");
//       console.log(res.data);
//       setClasses(res.data.data);
//     } catch (error) {
//       console.log(error);
//     }
//   };
//   return (
//     <div className="flex flex-col min-h-screen bg-[#454649] text-gray-200">
//       {/* Header */}
//       <Header />

//       {/* Main Content */}
//       <div className="flex flex-1 p-6 md:p-14 min-h-screen">
//         <div className="flex-1 bg-[#454649] p-6 w-full">
//           <h1 className="text-3xl font-bold text-yellow-500 mb-6 mt-10">
//             Student Details
//           </h1>

//           {classes.length === 0 ? (
//             <div className="p-4 text-center text-gray-400 text-lg font-semibold rounded-lg">
//               Data Not Found
//             </div>
//           ) : (
//             <div className="overflow-x-auto">
//               <table className="w-full border border-gray-600 bg-gray-900 rounded-lg overflow-hidden">
//                 <thead>
//                   <tr className="bg-gray-700 text-white">
//                     <th className="p-3 text-left border border-gray-600">Class Name</th>
//                     <th className="p-3 text-left border border-gray-600">Student Details</th>
//                   </tr>
//                 </thead>
//                 <tbody>
//                   {classes.map((cls, index) => (
//                     <tr
//                       className="bg-transparent text-white hover:bg-gray-800 transition"
//                       key={index}
//                     >
//                       <td className="p-3 border border-gray-500">
//                         <h1 className="text-base font-medium">{cls.classname}</h1>
//                       </td>
//                       <td className="p-3 border border-gray-500">
//                         <Link
//                           to={`/addstudents/showstudentdetails/studentdetails/${cls.classname}`}
//                           className="flex items-center justify-center w-28 p-2 text-white bg-blue-500 rounded-lg hover:bg-blue-600 transition duration-300 shadow-md gap-2"
//                         >
//                           <AiOutlineEye className="text-lg" /> View
//                         </Link>
//                       </td>
//                     </tr>
//                   ))}
//                 </tbody>
//               </table>
//             </div>
//           )}

//         </div>
//       </div>
//       <Link
//         to="/addstudents"
//         className="fixed bottom-6 left-4 text-white bg-green-600 p-3 rounded-full hover:bg-green-700 transition duration-300"
//       >
//         <AiOutlineArrowLeft size={24} />
//       </Link>
//       <Footer />
//     </div>
//   );
// }

// export default ShowStudentDetails;
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import Header from "../Home/Header";
import Footer from "../Home/Footer";
import { AiOutlineArrowLeft, AiOutlineEye } from "react-icons/ai";
import axios from "axios";

function ShowStudentDetails() {
  const [classes, setClasses] = useState([]);
  const [loading, setLoading] = useState(true); // 👈 Loading state

  useEffect(() => {
    getclasses();
  }, []);

  const getclasses = async () => {
    setLoading(true); // Start loading
    try {
      const res = await axios.get("https://mdl-coaching.onrender.com/class/getclasses");
      console.log(res.data);
      setClasses(res.data.data);
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false); // Stop loading
    }
  };

  return (
    <div className="flex flex-col min-h-screen bg-[#454649] text-gray-200">
      {/* Header */}
      <Header />

      {/* Main Content */}
      <div className="flex flex-1 p-6 md:p-14 min-h-screen">
        <div className="flex-1 bg-[#454649] p-6 w-full">
          <h1 className="text-3xl font-bold text-yellow-500 mb-6 mt-10">
            Student Details
          </h1>

          {/* 🔄 Loading Spinner */}
          {loading ? (
            <div className="flex justify-center items-center py-20">
              <div className="w-16 h-16 border-4 border-yellow-500 border-dashed rounded-full animate-spin"></div>
            </div>
          ) : classes.length === 0 ? (
            <div className="p-4 text-center text-gray-400 text-lg font-semibold rounded-lg">
              Data Not Found
            </div>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full border border-gray-600 bg-gray-900 rounded-lg overflow-hidden">
                <thead>
                  <tr className="bg-gray-700 text-white">
                    <th className="p-3 text-left border border-gray-600">Class Name</th>
                    <th className="p-3 text-left border border-gray-600">Student Details</th>
                  </tr>
                </thead>
                <tbody>
                  {classes.map((cls, index) => (
                    <tr
                      className="bg-transparent text-white hover:bg-gray-800 transition"
                      key={index}
                    >
                      <td className="p-3 border border-gray-500">
                        <h1 className="text-base font-medium">{cls.classname}</h1>
                      </td>
                      <td className="p-3 border border-gray-500">
                        <Link
                          to={`/addstudents/showstudentdetails/studentdetails/${cls.classname}`}
                          className="flex items-center justify-center w-28 p-2 text-white bg-blue-500 rounded-lg hover:bg-blue-600 transition duration-300 shadow-md gap-2"
                        >
                          <AiOutlineEye className="text-lg" /> View
                        </Link>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>
      </div>

      {/* Back Button */}
      <Link
        to="/addstudents"
        className="fixed bottom-6 left-4 text-white bg-green-600 p-3 rounded-full hover:bg-green-700 transition duration-300"
      >
        <AiOutlineArrowLeft size={24} />
      </Link>

      <Footer />
    </div>
  );
}

export default ShowStudentDetails;
