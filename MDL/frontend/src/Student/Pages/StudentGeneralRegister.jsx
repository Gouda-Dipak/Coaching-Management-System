// import React from 'react';
// import Header from '../Header';
// import Footer from '../Footer';

// const StudentGeneralRegister = () => {
//   return (
//     <div className="flex flex-col h-screen">
//       {/* Fixed Header */}
//       <Header />

//       {/* Scrollable Main Content */}
//       <div className="flex-grow">
//         <div className="w-full p-5 mt-20">
//           <h2 className="text-xl font-bold text-center mb-4 text-blue-600">Student Registration Details</h2>
//           <form>
//             <table className="w-full border-collapse border border-gray-300 text-left">
//               <thead>
//                 <tr className="bg-blue-500 text-white">
//                   <th className="p-3 border border-gray-300">Field</th>
//                   <th className="p-3 border border-gray-300">Details</th>
//                 </tr>
//               </thead>
//               <tbody>
//                 <tr className="even:bg-gray-100 odd:bg-white">
//                   <td className="p-3 font-medium border border-gray-300">Student ID</td>
//                   <td className="p-3 border border-gray-300">1</td>
//                 </tr>
//                 <tr className="even:bg-gray-100 odd:bg-white">
//                   <td className="p-3 font-medium border border-gray-300">First Name</td>
//                   <td className="p-3 border border-gray-300">Mayur</td>
//                 </tr>
//                 <tr className="even:bg-gray-100 odd:bg-white">
//                   <td className="p-3 font-medium border border-gray-300">Middle Name</td>
//                   <td className="p-3 border border-gray-300">Dulabhai</td>
//                 </tr>
//                 <tr className="even:bg-gray-100 odd:bg-white">
//                   <td className="p-3 font-medium border border-gray-300">Last Name</td>
//                   <td className="p-3 border border-gray-300">Makavana</td>
//                 </tr>
//                 <tr className="even:bg-gray-100 odd:bg-white">
//                   <td className="p-3 font-medium border border-gray-300">Gender</td>
//                   <td className="p-3 border border-gray-300">Male</td>
//                 </tr>
//                 <tr className="even:bg-gray-100 odd:bg-white">
//                   <td className="p-3 font-medium border border-gray-300">Mobile Number</td>
//                   <td className="p-3 border border-gray-300">8980783998</td>
//                 </tr>
//                 <tr className="even:bg-gray-100 odd:bg-white">
//                   <td className="p-3 font-medium border border-gray-300">Date of Birth</td>
//                   <td className="p-3 border border-gray-300">22/Jun/2004</td>
//                 </tr>
//                 <tr className="even:bg-gray-100 odd:bg-white">
//                   <td className="p-3 font-medium border border-gray-300">Country</td>
//                   <td className="p-3 border border-gray-300">India</td>
//                 </tr>
                
//                 <tr className="even:bg-gray-100 odd:bg-white">
//                   <td className="p-3 font-medium border border-gray-300">Student Email</td>
//                   <td className="p-3 border border-gray-300">mayurmakvana123@gmail.com</td>
//                 </tr>
//                 <tr className="even:bg-gray-100 odd:bg-white">
//                   <td className="p-3 font-medium border border-gray-300">Address</td>
//                   <td className="p-3 border border-gray-300">B-123, Sitanagar, Punagam, Surat</td>
//                 </tr>
//                 <tr className="even:bg-gray-100 odd:bg-white">
//                   <td className="p-3 font-medium border border-gray-300">City</td>
//                   <td className="p-3 border border-gray-300">Surat</td>
//                 </tr>
                
//                 <tr className="even:bg-gray-100 odd:bg-white">
//                   <td className="p-3 font-medium border border-gray-300">Aadhar Card No</td>
//                   <td className="p-3 border border-gray-300">1234 5678 9101</td>
//                 </tr>
//                 <tr className="even:bg-gray-100 odd:bg-white">
//                   <td className="p-3 font-medium border border-gray-300">Fee Amount</td>
//                   <td className="p-3 border border-gray-300"><span>$</span>9101</td>
//                 </tr>
//                 <tr className="even:bg-gray-100 odd:bg-white">
//                   <td className="p-3 font-medium border border-gray-300">Class</td>
//                   <td className="p-3 border border-gray-300">First</td>
//                 </tr>
//               </tbody>
//             </table>
//           </form>
//         </div>
//       </div>

//       {/* Fixed Footer */}
//       <Footer />
//     </div>
//   );
// };

// export default StudentGeneralRegister;
import React, { useEffect, useState } from 'react';
import { User, Calendar, Phone, Mail, MapPin, CreditCard, BookOpen, Globe, DollarSign } from 'lucide-react';
import Header from '../Header';
import Footer from '../Footer';
import axios from "axios";  
const StudentGeneralRegister = () => {


  useEffect(() => {
    profile();
  },[])
  const [students, setstudents] = useState([]);
  const profile = async () => {
    try {
      const studentid = localStorage.getItem("studentid")
      const res = await axios.get(`https://mdl-coaching.onrender.com/student/getstudentdetails/${studentid}`)
      console.log(res.data)
      setstudents(res.data.data)
    } catch (error) {
      console.log(error)
    }
  }
  return (
    <div className="flex flex-col h-screen">
      {/* Fixed Header */}
      <Header />

      {/* Scrollable Main Content */}
      <div className="flex-grow">
        <div className="w-full p-5 mt-20">
          <h2 className="text-xl font-bold text-center mb-4 text-blue-600">Student Registration Details</h2>
          <form>
            <table className="w-full border-collapse border border-gray-300 text-left">
              <thead>
                <tr className="bg-blue-500 text-white">
                  <th className="p-3 border border-gray-300">Field</th>
                  <th className="p-3 border border-gray-300">Details</th>
                </tr>
              </thead>
              <tbody>
                <tr className="even:bg-gray-100 odd:bg-white">
                  <td className="p-3 font-medium border border-gray-300 flex items-center"><User className="mr-2" /> Student ID</td>
                  <td className="p-3 border border-gray-300">{students.s_id}</td>
                </tr>
                <tr className="even:bg-gray-100 odd:bg-white">
                  <td className="p-3 font-medium border border-gray-300 flex items-center"><User className="mr-2" /> First Name</td>
                  <td className="p-3 border border-gray-300">{students.fname}</td>
                </tr>
                <tr className="even:bg-gray-100 odd:bg-white">
                  <td className="p-3 font-medium border border-gray-300 flex items-center"><User className="mr-2" /> Middle Name</td>
                  <td className="p-3 border border-gray-300">{students.mname}</td>
                </tr>
                <tr className="even:bg-gray-100 odd:bg-white">
                  <td className="p-3 font-medium border border-gray-300 flex items-center"><User className="mr-2" /> Last Name</td>
                  <td className="p-3 border border-gray-300">{students.lname}</td>
                </tr>
                <tr className="even:bg-gray-100 odd:bg-white">
                  <td className="p-3 font-medium border border-gray-300 flex items-center"><User className="mr-2" /> Gender</td>
                  <td className="p-3 border border-gray-300">{students.gender}</td>
                </tr>
                <tr className="even:bg-gray-100 odd:bg-white">
                  <td className="p-3 font-medium border border-gray-300 flex items-center"><Phone className="mr-2" /> Mobile Number</td>
                  <td className="p-3 border border-gray-300">{students.mobilenumber}</td>
                </tr>
                <tr className="even:bg-gray-100 odd:bg-white">
                  <td className="p-3 font-medium border border-gray-300 flex items-center"><Calendar className="mr-2" /> Date of Birth</td>
                  <td className="p-3 border border-gray-300">{students.dob}</td>
                </tr>
                
                <tr className="even:bg-gray-100 odd:bg-white">
                  <td className="p-3 font-medium border border-gray-300 flex items-center"><Mail className="mr-2" /> Student Email</td>
                  <td className="p-3 border border-gray-300">{students.email}</td>
                </tr>
                <tr className="even:bg-gray-100 odd:bg-white">
                  <td className="p-3 font-medium border border-gray-300 flex items-center"><MapPin className="mr-2" /> Address</td>
                  <td className="p-3 border border-gray-300">{students.adress}</td>
                </tr>
                <tr className="even:bg-gray-100 odd:bg-white">
                  <td className="p-3 font-medium border border-gray-300 flex items-center"><Globe className="mr-2" /> Country</td>
                  <td className="p-3 border border-gray-300">{students.country}</td>
                </tr>
                <tr className="even:bg-gray-100 odd:bg-white">
                  <td className="p-3 font-medium border border-gray-300 flex items-center"><MapPin className="mr-2" /> City</td>
                  <td className="p-3 border border-gray-300">{students.city}</td>
                </tr>

                <tr className="even:bg-gray-100 odd:bg-white">
                  <td className="p-3 font-medium border border-gray-300 flex items-center"><CreditCard className="mr-2" /> Aadhar Card No</td>
                  <td className="p-3 border border-gray-300">{students.adharnumber}</td>
                </tr>
                <tr className="even:bg-gray-100 odd:bg-white">
                  <td className="p-3 font-medium border border-gray-300 flex items-center"><DollarSign className="mr-2" /> Fee Amount</td>
                  <td className="p-3 border border-gray-300">$ {students.fee}</td>
                </tr>
                <tr className="even:bg-gray-100 odd:bg-white">
                  <td className="p-3 font-medium border border-gray-300 flex items-center"><BookOpen className="mr-2" /> Class</td>
                  <td className="p-3 border border-gray-300">{students.s_class}</td>
                </tr>
              </tbody>
            </table>
          </form>
        </div>
      </div>

      {/* Fixed Footer */}
      <Footer />
    </div>
  );
};

export default StudentGeneralRegister;