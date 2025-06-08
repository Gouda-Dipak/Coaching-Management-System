// import React, { useEffect, useState } from "react";
// import { Link, useParams } from "react-router-dom";
// import Swal from "sweetalert2";
// import Header from "../Home/Header";
// import Footer from "../Home/Footer";
// import { FiDownload } from "react-icons/fi";
// import { FaTimesCircle, FaCheckCircle } from "react-icons/fa";
// import { AiOutlineArrowLeft } from "react-icons/ai";
// import axios from "axios";

// function SalaryDetails() {
//   // const teacher = { id: "2001", name: "Laxmikant Dudam", monthlySalary: 31000 };
//   const [teacher,setteacher] = useState({});
//   const [selectedMonth, setSelectedMonth] = useState("");
//   const months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
//   const [salaries, setSalaries] = useState([
//     { month: "January", amount: 31000, receipt: "receipt_jan.pdf", paid: true },
//     { month: "February", amount: 31000, receipt: "receipt_feb.pdf", paid: false },
//   ]);

//   function paySalary() {
//     if (!selectedMonth) {
//       Swal.fire("Error", "Please select a month", "error");
//       return;
//     }
//     Swal.fire({
//       title: "Confirm Payment?",
//       text: `Are you sure you want to pay salary for ${selectedMonth}?`,
//       icon: "warning",
//       showCancelButton: true,
//       confirmButtonColor: "#3085d6",
//       cancelButtonColor: "#d33",
//       confirmButtonText: "Yes, Pay Now!",
//     }).then((result) => {
//       if (result.isConfirmed) {
//         setSalaries((prevSalaries) => {
//           const updatedSalaries = [...prevSalaries, { month: selectedMonth, amount: teacher.monthlySalary, receipt: `receipt_${selectedMonth.toLowerCase()}.pdf`, paid: true }];
//           return updatedSalaries;
//         });
//         Swal.fire("Success!", "Salary has been paid.", "success");
//       }
//     });
//   }
//   const { teacherid } = useParams();
//   useEffect(() => {
//     fetchdata();
//   }, []);

//   const fetchdata = async () => {
//     try {
//       const response = await axios.get(
//         `https://mdl-coaching.onrender.com/teacher/displaydata/${teacherid}`
//       );
//       console.log("Teacher by id :: ", response.data.data);
//       setteacher(response.data.data);
//     } catch (error) {
//       console.log("Not Found Error", error);
//     }
//   };

//   return (
//     <div className="flex flex-col min-h-screen">
//       <Header />
//       <div className="flex flex-1 bg-[#454649] p-5 sm:p-7 md:p-10 mt-1 min-h-screen">
//         <div className="w-full mt-20 max-w-4xl mx-auto  p-6 overflow-x-auto mb-10">
//           <h1 className="text-3xl font-bold text-yellow-400 mb-6 text-center">Teacher Salary Details</h1>
//           <div className="mb-6 border-b pb-4">
//             <p className="text-lg text-slate-300"><strong>Teacher ID:</strong> {teacher.t_id}</p>
//             <p className="text-lg text-slate-300"><strong>Name:</strong> {teacher.s_name+" "+teacher.name+" "+teacher.lname}</p>
//             <p className="text-lg text-slate-300"><strong>Monthly Salary:</strong> ₹{teacher.monthlySalary}</p>
//           </div>
//           <div className="overflow-x-auto">
//             <table className="w-full border-collapse border border-gray-300 shadow-md bg-[#454649] text-white text-center">
//               <thead className="bg-gray-700">
//                 <tr>
//                   <th className="p-4 border">Month</th>
//                   <th className="p-4 border">Monthly Salary</th>
//                   <th className="p-4 border">Receipt</th>
//                   <th className="p-4 border">Status</th>
//                 </tr>
//               </thead>
//               <tbody>
//                 {salaries.map((salary, index) => (
//                   <tr key={index} className="border-b border-gray-500 hover:bg-gray-600 transition">
//                     <td className="p-4 border">{salary.month}</td>
//                     <td className="p-4 border">₹{teacher.monthlySalary}</td>
//                     <td className="p-4 border">
//                       {salary.paid ? (
//                         <a href={salary.receipt} target="_blank" rel="noopener noreferrer" className="text-blue-300 hover:underline flex items-center justify-center gap-1">
//                           <FiDownload size={18} /> Download
//                         </a>
//                       ) : "-"}
//                     </td>
//                     <td className="p-4 border">
//                       {salary.paid ? <FaCheckCircle className="text-green-400 text-xl" /> : <FaTimesCircle className="text-red-400 text-xl" />}
//                     </td>
//                   </tr>
//                 ))}
//               </tbody>
//             </table>
//           </div>
//           <div className="mt-6 text-center">
//             <select className="p-2 border rounded mr-4" value={selectedMonth} onChange={(e) => setSelectedMonth(e.target.value)}>
//               <option value="">Select Month</option>
//               {months.map((month) => (
//                 <option key={month} value={month}>{month}</option>
//               ))}
//             </select>
//             <button onClick={paySalary} className="px-6 py-3 bg-green-500 text-white rounded hover:bg-green-600 shadow transition">Pay Salary</button>
//           </div>
//           {/* <div className="mt-6 text-center">
//             <Link to="/showallteacherlist" className="inline-block px-6 py-3 bg-gray-600 text-white rounded hover:bg-gray-700 shadow transition">Go Back</Link>
//           </div> */}
//         </div>
//       </div>

//       <Link to="/showclassTeacher/showallteacherlist" className="fixed bottom-6 left-4 text-white bg-green-600 p-3 rounded-full hover:bg-green-700 transition duration-300">
//                           <AiOutlineArrowLeft size={24} />
//                         </Link>
//                 <Footer />
//       <Footer />
//     </div>
//   );
// }

// export default SalaryDetails;
import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import Swal from "sweetalert2";
import Header from "../Home/Header";
import Footer from "../Home/Footer";
import { FiDownload } from "react-icons/fi";
import { FaTimesCircle, FaCheckCircle } from "react-icons/fa";
import { AiOutlineArrowLeft } from "react-icons/ai";
import axios from "axios";
import { motion } from "framer-motion";

function SalaryDetails() {
  const [teacher, setteacher] = useState({});
  const [selectedMonth, setSelectedMonth] = useState("");
  const [loading, setLoading] = useState(true);

  const months = [
    "January", "February", "March", "April", "May", "June",
    "July", "August", "September", "October", "November", "December"
  ];

  const [salaries, setSalaries] = useState([
    { month: "January", amount: 31000, receipt: "receipt_jan.pdf", paid: true },
    { month: "February", amount: 31000, receipt: "receipt_feb.pdf", paid: false },
  ]);

  const { teacherid } = useParams();

  useEffect(() => {
    fetchdata();
  }, []);

  const fetchdata = async () => {
    try {
      const response = await axios.get(`https://mdl-coaching.onrender.com/teacher/displaydata/${teacherid}`);
      setteacher(response.data.data);
      setTimeout(() => setLoading(false), 1000); // delay to show animation
    } catch (error) {
      console.log("Not Found Error", error);
      setLoading(false);
    }
  };

  function paySalary() {
    if (!selectedMonth) {
      Swal.fire("Error", "Please select a month", "error");
      return;
    }
    Swal.fire({
      title: "Confirm Payment?",
      text: `Are you sure you want to pay salary for ${selectedMonth}?`,
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, Pay Now!",
    }).then((result) => {
      if (result.isConfirmed) {
        setSalaries((prevSalaries) => {
          const updatedSalaries = [
            ...prevSalaries,
            {
              month: selectedMonth,
              amount: teacher.monthlySalary,
              receipt: `receipt_${selectedMonth.toLowerCase()}.pdf`,
              paid: true
            }
          ];
          return updatedSalaries;
        });
        Swal.fire("Success!", "Salary has been paid.", "success");
      }
    });
  }

  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      <div className="flex flex-1 bg-[#454649] p-5 sm:p-7 md:p-10 mt-1 min-h-screen">
        {loading ? (
           <div className="flex items-center justify-center w-full mt-40">
           <motion.div
             className="loader"
             animate={{ rotate: 360 }}
             transition={{ repeat: Infinity, ease: "linear", duration: 1 }}
           />
           <style>
             {`
               .loader {
                 border: 6px solid rgba(255, 255, 255, 0.2);
                 border-top: 6px solid #22c55e;
                 border-radius: 50%;
                 width: 60px;
                 height: 60px;
               }
             `}
           </style>
         </div>
        ) : (
          <motion.div
            className="w-full mt-20 max-w-4xl mx-auto p-6 overflow-x-auto mb-10"
            initial="hidden"
            animate="visible"
            variants={{
              hidden: { opacity: 0 },
              visible: {
                opacity: 1,
                transition: {
                  staggerChildren: 0.2
                }
              }
            }}
          >
            <motion.h1
              className="text-3xl font-bold text-yellow-400 mb-6 text-center"
              variants={{ hidden: { opacity: 0, y: 20 }, visible: { opacity: 1, y: 0 } }}
            >
              Teacher Salary Details
            </motion.h1>

            <motion.div className="mb-6 border-b pb-4" variants={{ hidden: { opacity: 0 }, visible: { opacity: 1 } }}>
              <p className="text-lg text-slate-300"><strong>Teacher ID:</strong> {teacher.t_id}</p>
              <p className="text-lg text-slate-300"><strong>Name:</strong> {teacher.s_name + " " + teacher.name + " " + teacher.lname}</p>
              <p className="text-lg text-slate-300"><strong>Monthly Salary:</strong> ₹{teacher.monthlySalary}</p>
            </motion.div>

            <motion.div className="overflow-x-auto" variants={{ hidden: { opacity: 0 }, visible: { opacity: 1 } }}>
              <table className="w-full border-collapse border border-gray-300 shadow-md bg-[#454649] text-white text-center">
                <thead className="bg-gray-700">
                  <tr>
                    <th className="p-4 border">Month</th>
                    <th className="p-4 border">Monthly Salary</th>
                    <th className="p-4 border">Receipt</th>
                    <th className="p-4 border">Status</th>
                  </tr>
                </thead>
                <tbody>
                  {salaries.map((salary, index) => (
                    <tr key={index} className="border-b border-gray-500 hover:bg-gray-600 transition">
                      <td className="p-4 border">{salary.month}</td>
                      <td className="p-4 border">₹{teacher.monthlySalary}</td>
                      <td className="p-4 border">
                        {salary.paid ? (
                          <a href={salary.receipt} target="_blank" rel="noopener noreferrer" className="text-blue-300 hover:underline flex items-center justify-center gap-1">
                            <FiDownload size={18} /> Download
                          </a>
                        ) : "-"}
                      </td>
                      <td className="p-4 border">
                        {salary.paid ? <FaCheckCircle className="text-green-400 text-xl" /> : <FaTimesCircle className="text-red-400 text-xl" />}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </motion.div>

            <motion.div className="mt-6 text-center" variants={{ hidden: { opacity: 0 }, visible: { opacity: 1 } }}>
              <select className="p-2 border rounded mr-4" value={selectedMonth} onChange={(e) => setSelectedMonth(e.target.value)}>
                <option value="">Select Month</option>
                {months.map((month) => (
                  <option key={month} value={month}>{month}</option>
                ))}
              </select>
              <button onClick={paySalary} className="px-6 py-3 bg-green-500 text-white rounded hover:bg-green-600 shadow transition">Pay Salary</button>
            </motion.div>
          </motion.div>
        )}
      </div>

      <Link to="/showclassTeacher/showallteacherlist" className="fixed bottom-6 left-4 text-white bg-green-600 p-3 rounded-full hover:bg-green-700 transition duration-300">
        <AiOutlineArrowLeft size={24} />
      </Link>
      <Footer />
      <Footer />
    </div>
  );
}

export default SalaryDetails;
