// import React, { useEffect, useState } from "react";
// import { Link, useParams } from "react-router-dom";
// import Header from "../Home/Header";
// import Footer from "../Home/Footer";
// import { AiFillDelete, AiOutlineArrowLeft } from "react-icons/ai";
// import Swal from "sweetalert2";
// import axios from "axios";
// function ShowClasses() {
//   function deleteClass(classid) {
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
//         try {
//           const url = `https://mdl-coaching.onrender.com/class/deleteclass/${classid}`;

//           const response = await axios.get(url);

//           Swal.fire({
//             title: response.data.message,
//             text: "Your file has been deleted.",
//             icon: "success",
//           });
//           getclasses();
//         } catch (error) {
//           Swal.fire({
//             title: "Deleted!",
//             text: "Your file has been deleted.",
//             icon: "success",
//           });
//         }
//       }
//     });
//   }

//   const [classes, setClasses] = useState([]);
//   useEffect(() => {
//     getclasses();
//   }, []);

//   const getclasses = async () => {
//     try {
//       const res = await axios.get("https://mdl-coaching.onrender.com/class/classBystudent");
//       console.log(res.data);
//       setClasses(res.data.data);
//     } catch (error) {
//       console.log(error);
//     }
//   };

//   return (
//     <div className="flex flex-col min-h-screen bg-[#454649] text-gray-200 relative">
//       <Header />
//       <div className="flex flex-1 p-6 md:p-10 min-h-screen">
       
//         <div className="flex-1 p-5 w-full mt-14">
//           <h2 className="text-xl font-bold mb-6 text-yellow-400">
//             Class Details
//           </h2>

//           <div className="overflow-x-auto">
//             {classes.length > 0 ? (
//               <table className="w-full border border-gray-600 rounded-lg overflow-hidden">
//                 <thead>
//                   <tr className="bg-gray-700 text-white">
//                     <th className="border border-gray-600 px-4 py-2 text-left">
//                       Class
//                     </th>
//                     <th className="border border-gray-600 px-4 py-2 text-left">
//                       Total Students
//                     </th>
//                     <th className="border border-gray-600 px-4 py-2 text-left">
//                       Operations
//                     </th>
//                   </tr>
//                 </thead>
//                 <tbody>
//                   {classes.map((cls, index) => (
//                     <tr key={index} className="bg-gray-600 text-white">
//                       <td className="border border-gray-500 px-4 py-2">
//                         {cls.class_name}
//                       </td>
//                       <td className="border border-gray-500 px-4 py-2">
//                         {cls.student_count}
//                       </td>
//                       <td className="border border-gray-500 px-4 py-2 flex">
//                         <AiFillDelete
//                           className="text-red-500 hover:text-red-700 cursor-pointer transition"
//                           size={24}
//                           onClick={() => deleteClass(cls.class_id)}
//                         />
//                       </td>
//                     </tr>
//                   ))}
//                 </tbody>
//               </table>
//             ) : (
//               <div className="text-center text-gray-400 py-10 text-lg font-semibold">
//                 Data Not Found
//               </div>
//             )}
//           </div>
//         </div>

//       </div>
//       <Link
//         to="/addclasses"
//         className="fixed bottom-6 left-4 text-white bg-green-600 p-3 rounded-full hover:bg-green-700 transition duration-300"
//       >
//         <AiOutlineArrowLeft size={24} />
//       </Link>

//       <Footer />
//     </div>
//   );
// }

// export default ShowClasses;
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import Header from "../Home/Header";
import Footer from "../Home/Footer";
import { AiFillDelete, AiOutlineArrowLeft } from "react-icons/ai";
import Swal from "sweetalert2";
import axios from "axios";

function ShowClasses() {
  const [classes, setClasses] = useState([]);
  const [loading, setLoading] = useState(false); // 🆕 loading state

  useEffect(() => {
    getclasses();
  }, []);

  const getclasses = async () => {
    setLoading(true); // 🆕 start loading
    try {
      const res = await axios.get("https://mdl-coaching.onrender.com/class/classBystudent");
      setClasses(res.data.data);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false); // 🆕 stop loading
    }
  };

  const deleteClass = (classid) => {
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
        try {
          const url = `https://mdl-coaching.onrender.com/class/deleteclass/${classid}`;
          const response = await axios.get(url);

          Swal.fire({
            title: response.data.message,
            text: "Your file has been deleted.",
            icon: "success",
          });
          getclasses();
        } catch (error) {
          Swal.fire({
            title: "Deleted!",
            text: "Your file has been deleted.",
            icon: "success",
          });
        }
      }
    });
  };

  return (
    <div className="flex flex-col min-h-screen bg-[#454649] text-gray-200 relative">
      <Header />
      <div className="flex flex-1 p-6 md:p-10 min-h-screen">
        <div className="flex-1 p-5 w-full mt-14">
          <h2 className="text-xl font-bold mb-6 text-yellow-400">
            Class Details
          </h2>

          <div className="overflow-x-auto">
            {loading ? (
              <div className="flex justify-center items-center py-20">
                <div className="w-12 h-12 border-4 border-yellow-400 border-dashed rounded-full animate-spin"></div>
              </div>
            ) : classes.length > 0 ? (
              <table className="w-full border border-gray-600 rounded-lg overflow-hidden">
                <thead>
                  <tr className="bg-gray-700 text-white">
                    <th className="border border-gray-600 px-4 py-2 text-left">Class</th>
                    <th className="border border-gray-600 px-4 py-2 text-left">Total Students</th>
                    <th className="border border-gray-600 px-4 py-2 text-left">Operations</th>
                  </tr>
                </thead>
                <tbody>
                  {classes.map((cls, index) => (
                    <tr key={index} className="bg-gray-600 text-white">
                      <td className="border border-gray-500 px-4 py-2">
                        {cls.class_name}
                      </td>
                      <td className="border border-gray-500 px-4 py-2">
                        {cls.student_count}
                      </td>
                      <td className="border border-gray-500 px-4 py-2 flex">
                        <AiFillDelete
                          className="text-red-500 hover:text-red-700 cursor-pointer transition"
                          size={24}
                          onClick={() => deleteClass(cls.class_id)}
                        />
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            ) : (
              <div className="text-center text-gray-400 py-10 text-lg font-semibold">
                Data Not Found
              </div>
            )}
          </div>
        </div>
      </div>

      <Link
        to="/addclasses"
        className="fixed bottom-6 left-4 text-white bg-green-600 p-3 rounded-full hover:bg-green-700 transition duration-300"
      >
        <AiOutlineArrowLeft size={24} />
      </Link>

      <Footer />
    </div>
  );
}

export default ShowClasses;
