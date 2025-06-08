
// import React, { useEffect, useState } from 'react';
// import Header from '../Header';
// import Footer from '../Footer';
// import axios from 'axios';

// const StudentAttendencedisplay = () => {
//   const [classes, setClasses] = useState([]);

//   useEffect(() => {
//     getClasses();
//     attedence();
//   }, []);

//   const getClasses = async () => {
//     try {
//       const res = await axios.get("https://mdl-coaching.onrender.com/class/getclasses");
//       setClasses(res.data.data);
//     } catch (error) {
//       console.error(error);
//     }
//   };

//   const [attendanceData, setAttendanceData] = useState([]);
//   const attedence = async () => {
//     try {
//       const res = await axios.get("https://mdl-coaching.onrender.com/attendance/getattendence");
//       setAttendanceData(res.data.data);
//     } catch (error) {
//       console.error(error);
//     }
//   };

//   return (
//     <div className="flex flex-col min-h-screen bg-gray-50">
//       <Header />

//       <div className="flex flex-col mt-32 flex-1 items-center justify-start p-4">
//         {/* Class list section */}
//         <div className="flex overflow-x-auto space-x-4 w-full max-w-5xl p-4">
//           {classes.map((classItem, index) => (
//             <div
//               key={index}
//               className="min-w-[200px] bg-white p-6 rounded-xl shadow-md cursor-pointer hover:bg-blue-100 transition"
//             >
//               <h2 className="text-xl font-bold text-center">{classItem.classname}</h2>
//             </div>
//           ))}
//         </div>

//         <div className="w-full max-w-5xl mt-10 bg-white rounded-xl shadow-lg p-6">
//           <h1 className="text-2xl font-semibold mb-4 text-gray-700">Attendance</h1>
//           <div className="space-y-4">
//             {attendanceData.map((item) => (
//               <div key={item._id} className="space-y-2">
//                 <div
//                   className={`${item.bgColor} bg-green-100 p-4 rounded-lg shadow-sm`}
//                 >
//                   {item.date}
//                 </div>
//                 <div className="ml-6 space-y-2">
//                   <div className="flex flex-wrap gap-4">
//                     <div className="bg-gray-100 p-2 rounded-md w-max hover:bg-blue-200 transition-all duration-300">
//                       {item.subject}
//                     </div>
//                   </div>
//                 </div>
//                 <div className="overflow-x-auto bg-white p-6 rounded-xl shadow-lg">
//                   <table className="min-w-full table-auto">
//                     <thead>
//                       <tr className="bg-gray-100 text-left text-gray-700">
//                         <th className="py-2 px-4 border-b">Roll No</th>
//                         <th className="py-2 px-4 border-b">Name</th>
//                         <th className="py-2 px-4 border-b">Attendance</th>
//                       </tr>
//                     </thead>
//                     <tbody>
//                       {item.records.map((record) => (
//                         <tr key={record.studentId}>
//                           <td className="py-2 px-4 border-b">{record.studentId}</td>
//                           <td className="py-2 px-4 border-b">
//                             {/* Assuming you want to display the studentId here, you can modify it to show the student's name if available */}
//                             {record.studentId}
//                           </td>
//                           <td className="py-2 px-4 border-b">
//                             {record.status === 'Absent' ? 'Absent' : 'Present'}
//                           </td>
//                         </tr>
//                       ))}
//                     </tbody>
//                   </table>
//                 </div>
//               </div>
//             ))}
//           </div>

//         </div>
//       </div>
//       <Footer />
//     </div>
//   );
// };

// export default StudentAttendencedisplay;
import React, { useEffect, useState } from 'react';
import Header from '../Header';
import Footer from '../Footer';
import axios from 'axios';

const StudentAttendencedisplay = () => {
  const [classes, setClasses] = useState([]);
  const [attendanceData, setAttendanceData] = useState([]);

  const [selectedClass, setSelectedClass] = useState(null);
  const [selectedDate, setSelectedDate] = useState(null);
  const [selectedSubject, setSelectedSubject] = useState(null);

  useEffect(() => {
    getClasses();
    fetchAttendance();
  }, []);

  const getClasses = async () => {
    try {
      const res = await axios.get("https://mdl-coaching.onrender.com/class/getclasses");
      setClasses(res.data.data);
    } catch (error) {
      console.error(error);
    }
  };

  const fetchAttendance = async () => {
    try {
      const res = await axios.get("https://mdl-coaching.onrender.com/attendance/getattendence");
      setAttendanceData(res.data.data);
    } catch (error) {
      console.error(error);
    }
  };

  // Filtered data based on selected class
  const filteredDates = selectedClass
    ? attendanceData.filter(item => item.classname === selectedClass)
    : [];

  const filteredSubjects = selectedDate
    ? filteredDates.filter(item => item.date === selectedDate)
    : [];

  const filteredRecords = selectedSubject
    ? filteredSubjects.find(item => item.subject === selectedSubject)
    : null;

  return (
    <div className="flex flex-col min-h-screen bg-gray-50">
      <Header />

      <div className="flex flex-col mt-32 flex-1 items-center justify-start p-4 min-h-screen">
        {/* Classes */}
        <div className="flex overflow-x-auto space-x-4 w-full max-w-5xl p-4">
          {classes.map((classItem, index) => (
            <div
              key={index}
              onClick={() => {
                setSelectedClass(classItem.classname);
                setSelectedDate(null);
                setSelectedSubject(null);
              }}
              className={`min-w-[200px] bg-white p-6 rounded-xl shadow-md cursor-pointer hover:bg-blue-100 transition ${
                selectedClass === classItem.classname ? 'bg-blue-200' : ''
              }`}
            >
              <h2 className="text-xl font-bold text-center">{classItem.classname}</h2>
            </div>
          ))}
        </div>

        {/* Dates */}
        {selectedClass && (
          <div className="flex flex-wrap gap-4 mt-6 max-w-5xl w-full justify-center">
            {[...new Set(filteredDates.map(item => item.date))].map((date, index) => (
              <div
                key={index}
                onClick={() => {
                  setSelectedDate(date);
                  setSelectedSubject(null);
                }}
                className={`bg-white px-6 py-3 rounded-lg shadow-md cursor-pointer hover:bg-green-100 transition ${
                  selectedDate === date ? 'bg-green-200' : ''
                }`}
              >
                {date}
              </div>
            ))}
          </div>
        )}

        {/* Subjects */}
        {selectedDate && (
          <div className="flex flex-wrap gap-4 mt-6 max-w-5xl w-full justify-center">
            {[...new Set(filteredSubjects.map(item => item.subject))].map((subject, index) => (
              <div
                key={index}
                onClick={() => setSelectedSubject(subject)}
                className={`bg-gray-100 px-4 py-2 rounded-md cursor-pointer hover:bg-blue-200 transition ${
                  selectedSubject === subject ? 'bg-blue-300' : ''
                }`}
              >
                {subject}
              </div>
            ))}
          </div>
        )}

        {/* Attendance Table */}
        {filteredRecords && (
          <div className="w-full max-w-5xl mt-10 bg-white rounded-xl shadow-lg p-6">
            <h1 className="text-2xl font-semibold mb-4 text-gray-700">
              Attendance - {selectedSubject} ({selectedDate})
            </h1>
            <div className="overflow-x-auto">
              <table className="min-w-full table-auto">
                <thead>
                  <tr className="bg-gray-100 text-left text-gray-700">
                    <th className="py-2 px-4 border-b">Roll No</th>
                    <th className="py-2 px-4 border-b">Name</th>
                    <th className="py-2 px-4 border-b">Attendance</th>
                  </tr>
                </thead>
                <tbody>
                  {filteredRecords.records.map((record) => (
                    <tr key={record.studentId}>
                      <td className="py-2 px-4 border-b">{record.studentId}</td>
                      <td className="py-2 px-4 border-b">{record.studentId}</td>
                      <td className="py-2 px-4 border-b">
                        {record.status === 'Absent' ? 'Absent' : 'Present'}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}
      </div>

      <Footer />
    </div>
  );
};

export default StudentAttendencedisplay;
