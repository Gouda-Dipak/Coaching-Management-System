// import React, { useEffect, useState } from "react";
// import Footer from "../Footer";
// import Header from "../Header";
// import Sidebar from "../Sidebar";
// import Swal from "sweetalert2";
// import { Link } from "react-router-dom";
// import axios from "axios";

// // const classes = ["Class 1", "Class 2", "Class 3"];
// const subjects = ["Math", "Science", "English", "History"];
// const students = Array.from({ length: 10 }, (_, i) => ({
//   id: i + 1,
//   name: `Student ${i + 1}`,
// }));

// const TeacherAttendance = () => {
//   const [selectedClass, setSelectedClass] = useState();
//   const [classes, setClasses] = useState([]);
//   const [students, setStudents] = useState([]);
//   const [subjects, setsubjects] = useState([]);
//   const [selectedSubject, setSelectedSubject] = useState(subjects[0]);
//   // const [date, setDate] = useState(new Date().toISOString().split("T")[0]);
//   const [attendance, setAttendance] = useState();

//   useEffect(() => {
//     getclasses();
//     getsubject();
//   }, []);

//   useEffect(() => {
//     console.log(selectedSubject);
//   }, [selectedSubject]);



//   useEffect(() => {
//     if (selectedClass) {
//       const getstudentsbyclass = async () => {
//         try {
//           const res = await axios.get(
//             `https://mdl-coaching.onrender.com/student/getstudentsbyclass/${selectedClass}`
//           );
//           console.log(res.data.data);

//           setStudents(res.data.data);

//           // Initialize attendance with false values
//           if (res.data.data.length > 0) {
//             const defaultAttendance = res.data.data.reduce((acc, student) => {
//               acc[student._id] = false; // Ensure every student has an entry
//               return acc;
//             }, {});
//             setAttendance(defaultAttendance);
//           } else {
//             setAttendance({}); // If no students, keep it empty
//           }
//         } catch (error) {
//           console.log(error);
//         }
//       };
//       getstudentsbyclass();
//     }
//   }, [selectedClass]);

//   useEffect(() => {
//     console.log(attendance);
//   }, [attendance]);

//   const getclasses = async () => {
//     try {
//       const res = await axios.get("https://mdl-coaching.onrender.com/class/getclasses");
//       console.log(res.data);
//       setClasses(res.data.data);
//     } catch (error) {
//       console.log(error);
//     }
//   };

//   const getsubject = async () => {
//     try {
//       const res = await axios.get("https://mdl-coaching.onrender.com/subject/getsubjects");
//       console.log(res.data);
//       setsubjects(res.data.data);
//     } catch (error) {
//       console.log(error);
//     }
//   };

//   const handlePresentToggle = (id) => {
//     if (!selectedClass || !selectedSubject) {
//       Swal.fire({
//         title: "All fields are required!",
//         icon: "error",
//         draggable: true,
//       });
//       return;
//     }
//     setAttendance({ ...attendance, [id]: !attendance[id] });
//   };

//   const handleFieldChange = (setter, value) => {
//     setter(value);
//     setAttendance(
//       students.reduce((acc, student) => ({ ...acc, [student.id]: false }), {})
//     );
//   };



//   async function upload(event) {
//     event.preventDefault();
//     if (!selectedClass || !selectedSubject) {
//       Swal.fire({
//         title: "All fields are required!",
//         icon: "error",
//         draggable: true,
//       });
//       return;
//     }

//     const attendanceData = students.map((student) => ({
//       studentId: student._id,
//       status: attendance[student._id] ? "Present" : "Absent",
//     }));

//     try {
//       const res = await axios.post(
//         "https://mdl-coaching.onrender.com/attendance/addattendance",
//         {
//           classname: selectedClass,
//           subject: selectedSubject,
//           attendance: attendanceData,
//         }
//       );

//       if (res.data.success) {
//         Swal.fire({
//           title: "Attendance Uploaded Successfully",
//           icon: "success",
//           draggable: true,
//         });
//       }
//     } catch (error) {
//       console.error(error);
//       Swal.fire({
//         title: "Error Uploading Attendance",
//         icon: "error",
//         draggable: true,
//       });
//     }
//   }

//   return (
//     <div className="flex flex-col">
//       <Header />
//       <div className="flex flex-1 min-h-screen">
//         <div className="flex-1 bg-gradient-to-r bg-slate-100 p-4 sm:p-10 flex flex-col items-center">
//           <h1 className="text-black text-2xl sm:text-4xl font-bold mb-4 sm:mb-6 animate-pulse text-center">
//             Attendance
//           </h1>


//           <div className="w-full bg-white shadow-lg rounded-2xl p-6 mb-8 grid grid-cols-1 md:grid-cols-3 gap-6">

//             {/* Select Class */}
//             <div className="flex flex-col">
//               <label className="text-gray-700 font-semibold mb-2">
//                 Select Class:
//               </label>
//               <select
//                 name="s_class"
//                 onChange={(e) => setSelectedClass(e.target.value)}
//                 className="p-3 border border-gray-300 rounded-xl bg-blue-200 text-black focus:outline-none focus:ring-2 focus:ring-blue-400"
//                 required
//               >
//                 <option value="">Select Class</option>
//                 {classes.map((cls, index) => (
//                   <option value={cls.classname} key={index}>
//                     {cls.classname}
//                   </option>
//                 ))}
//               </select>
//             </div>

//             {/* Select Subject */}
//             <div className="flex flex-col">
//               <label className="text-gray-700 font-semibold mb-2">
//                 Select Subject:
//               </label>
//               <select
//                 value={selectedSubject}
//                 onChange={(e) => setSelectedSubject(e.target.value)}
//                 className="p-3 border border-gray-300 rounded-xl bg-green-200 text-black focus:outline-none focus:ring-2 focus:ring-green-400"
//                 required
//               >
//                 <option value="">Select Subject</option>
//                 {subjects.map((subj, index) => (
//                   <option key={index} value={subj.subjectName}>
//                     {subj.subjectName}
//                   </option>
//                 ))}
//               </select>
//             </div>

//             {/* Show Attendance Button */}
//             <div className="flex flex-col justify-end">
//               <Link to="/teacherAttendencedisplay" className="w-full">
//                 <button className="w-full bg-purple-600 hover:bg-purple-700 transition-all duration-300 text-white px-6 py-3 rounded-xl flex items-center justify-center gap-2">
//                   {/* Eye Icon */}
//                   <svg
//                     xmlns="http://www.w3.org/2000/svg"
//                     className="h-6 w-6"
//                     viewBox="0 0 24 24"
//                     fill="currentColor"
//                   >
//                     <path d="M12 5c-7.633 0-11 7-11 7s3.367 7 11 7 11-7 11-7-3.367-7-11-7zm0 12c-2.761 
//           0-5-2.239-5-5s2.239-5 5-5 5 2.239 5 5-2.239 5-5 
//           5zm0-8c-1.654 0-3 1.346-3 3s1.346 3 3 
//           3 3-1.346 3-3-1.346-3-3-3z" />
//                   </svg>
//                   Show Attendance
//                 </button>
//               </Link>
//             </div>
//           </div>
//           <div className="bg-white shadow-lg rounded-2xl p-4 sm:p-6 w-full md:w-2/3">
//             <div className="items-center flex flex-col">
//               <label className="text-gray-700 font-semibold">
//                 {new Date().toISOString().split("T")[0]}
//               </label>
//             </div>
//             <table className="w-full border-collapse">
//               <thead>
//                 <tr>
//                   <th className="border-b-2 p-2 text-left">Student Name</th>
//                   <th className="border-b-2 p-2 text-center">Present</th>
//                 </tr>
//               </thead>
//               <tbody>
//                 {students.map((student, index) => (
//                   <tr key={index} className="hover:bg-gray-100">
//                     <td className="p-2 border-b">
//                       {student.fname} {student.lname}
//                     </td>
//                     <td className="p-2 border-b text-center">
//                       <button
//                         className={`w-20 h-10 border-2 rounded-lg ${attendance[student._id]
//                           ? "bg-green-500 text-white"
//                           : "bg-white"
//                           }`}
//                         onClick={() => handlePresentToggle(student._id)}
//                       >
//                         {attendance[student._id] ? "Present" : "Absent"}
//                       </button>
//                     </td>
//                   </tr>
//                 ))}
//               </tbody>
//             </table>
//             <div className="flex justify-between mt-4 sm:mt-6">
//               <button
//                 onClick={upload}
//                 className="bg-blue-500 text-white px-3 sm:px-4 py-1 sm:py-2 rounded-lg"
//               >
//                 Submit
//               </button>
//               <Link to={"/techerUpdateAttendence"}>
//                 <button className="bg-orange-500 text-white px-3 sm:px-4 py-1 sm:py-2 rounded-lg">
//                   Update Attendance
//                 </button>
//               </Link>
//             </div>
//           </div>
//         </div>
//       </div>
//       <Footer />
//     </div>
//   );
// };

// export default TeacherAttendance;
import React, { useEffect, useState } from "react";
import Footer from "../Footer";
import Header from "../Header";
import Sidebar from "../Sidebar";
import Swal from "sweetalert2";
import { Link } from "react-router-dom";
import axios from "axios";

// const classes = ["Class 1", "Class 2", "Class 3"];
const subjects = ["Math", "Science", "English", "History"];
const students = Array.from({ length: 10 }, (_, i) => ({
  id: i + 1,
  name: `Student ${i + 1}`,
}));

const TeacherAttendance = () => {
  const [selectedClass, setSelectedClass] = useState();
  const [classes, setClasses] = useState([]);
  const [students, setStudents] = useState([]);
  const [subjects, setsubjects] = useState([]);
  const [selectedSubject, setSelectedSubject] = useState(subjects[0]);
  const [attendance, setAttendance] = useState();
  const [loading, setLoading] = useState(false); // Add loading state

  useEffect(() => {
    getclasses();
    getsubject();
  }, []);

  useEffect(() => {
    console.log(selectedSubject);
  }, [selectedSubject]);

  useEffect(() => {
    if (selectedClass) {
      const getstudentsbyclass = async () => {
        setLoading(true); // Set loading to true while fetching data
        try {
          const res = await axios.get(
            `https://mdl-coaching.onrender.com/student/getstudentsbyclass/${selectedClass}`
          );
          console.log(res.data.data);
          setStudents(res.data.data);

          // Initialize attendance with false values
          if (res.data.data.length > 0) {
            const defaultAttendance = res.data.data.reduce((acc, student) => {
              acc[student._id] = false; // Ensure every student has an entry
              return acc;
            }, {});
            setAttendance(defaultAttendance);
          } else {
            setAttendance({}); // If no students, keep it empty
          }
        } catch (error) {
          console.log(error);
        } finally {
          setLoading(false); // Set loading to false once data is fetched
        }
      };
      getstudentsbyclass();
    }
  }, [selectedClass]);

  useEffect(() => {
    console.log(attendance);
  }, [attendance]);

  const getclasses = async () => {
    setLoading(true); // Set loading to true while fetching data
    try {
      const res = await axios.get("https://mdl-coaching.onrender.com/class/getclasses");
      console.log(res.data);
      setClasses(res.data.data);
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false); // Set loading to false once data is fetched
    }
  };

  const getsubject = async () => {
    setLoading(true); // Set loading to true while fetching data
    try {
      const res = await axios.get("https://mdl-coaching.onrender.com/subject/getsubjects");
      console.log(res.data);
      setsubjects(res.data.data);
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false); // Set loading to false once data is fetched
    }
  };

  const handlePresentToggle = (id) => {
    if (!selectedClass || !selectedSubject) {
      Swal.fire({
        title: "All fields are required!",
        icon: "error",
        draggable: true,
      });
      return;
    }
    setAttendance({ ...attendance, [id]: !attendance[id] });
  };

  const handleFieldChange = (setter, value) => {
    setter(value);
    setAttendance(
      students.reduce((acc, student) => ({ ...acc, [student.id]: false }), {})
    );
  };

  async function upload(event) {
    event.preventDefault();
    if (!selectedClass || !selectedSubject) {
      Swal.fire({
        title: "All fields are required!",
        icon: "error",
        draggable: true,
      });
      return;
    }

    const attendanceData = students.map((student) => ({
      studentId: student._id,
      status: attendance[student._id] ? "Present" : "Absent",
    }));

    setLoading(true); // Set loading to true while uploading attendance

    try {
      const res = await axios.post(
        "https://mdl-coaching.onrender.com/attendance/addattendance",
        {
          classname: selectedClass,
          subject: selectedSubject,
          attendance: attendanceData,
        }
      );

      if (res.data.success) {
        Swal.fire({
          title: "Attendance Uploaded Successfully",
          icon: "success",
          draggable: true,
        });
      }
    } catch (error) {
      console.error(error);
      Swal.fire({
        title: "Error Uploading Attendance",
        icon: "error",
        draggable: true,
      });
    } finally {
      setLoading(false); // Set loading to false once the upload is completed
    }
  }

  return (
    <div className="flex flex-col">
      <Header />
      <div className="flex flex-1 min-h-screen">
        <div className="flex-1 bg-gradient-to-r bg-slate-100 p-4 sm:p-10 flex flex-col items-center">
          <h1 className="text-black text-2xl sm:text-4xl font-bold mb-4 sm:mb-6 animate-pulse text-center">
            Attendance
          </h1>

          {loading ? (
            <div className="flex justify-center items-center w-full h-64">
              <div className="spinner-border animate-spin inline-block w-10 h-10 border-4 rounded-full text-blue-500" role="status">
                <span className="sr-only">Loading...</span>
              </div>
            </div>
          ) : (
            <div className="w-full bg-white shadow-lg rounded-2xl p-6 mb-8 grid grid-cols-1 md:grid-cols-3 gap-6">
              {/* Select Class */}
              <div className="flex flex-col">
                <label className="text-gray-700 font-semibold mb-2">
                  Select Class:
                </label>
                <select
                  name="s_class"
                  onChange={(e) => setSelectedClass(e.target.value)}
                  className="p-3 border border-gray-300 rounded-xl bg-blue-200 text-black focus:outline-none focus:ring-2 focus:ring-blue-400"
                  required
                >
                  <option value="">Select Class</option>
                  {classes.map((cls, index) => (
                    <option value={cls.classname} key={index}>
                      {cls.classname}
                    </option>
                  ))}
                </select>
              </div>

              {/* Select Subject */}
              <div className="flex flex-col">
                <label className="text-gray-700 font-semibold mb-2">
                  Select Subject:
                </label>
                <select
                  value={selectedSubject}
                  onChange={(e) => setSelectedSubject(e.target.value)}
                  className="p-3 border border-gray-300 rounded-xl bg-green-200 text-black focus:outline-none focus:ring-2 focus:ring-green-400"
                  required
                >
                  <option value="">Select Subject</option>
                  {subjects.map((subj, index) => (
                    <option key={index} value={subj.subjectName}>
                      {subj.subjectName}
                    </option>
                  ))}
                </select>
              </div>

              {/* Show Attendance Button */}
              <div className="flex flex-col justify-end">
                <Link to="/teacherAttendencedisplay" className="w-full">
                  <button className="w-full bg-purple-600 hover:bg-purple-700 transition-all duration-300 text-white px-6 py-3 rounded-xl flex items-center justify-center gap-2">
                    {/* Eye Icon */}
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="h-6 w-6"
                      viewBox="0 0 24 24"
                      fill="currentColor"
                    >
                      <path d="M12 5c-7.633 0-11 7-11 7s3.367 7 11 7 11-7 11-7-3.367-7-11-7zm0 12c-2.761 0-5-2.239-5-5s2.239-5 5-5 5 2.239 5 5-2.239 5-5 5zm0-8c-1.654 0-3 1.346-3 3s1.346 3 3 3 3-1.346 3-3-1.346-3-3-3z" />
                    </svg>
                    Show Attendance
                  </button>
                </Link>
              </div>
            </div>
          )}

          <div className="bg-white shadow-lg rounded-2xl p-4 sm:p-6 w-full md:w-2/3">
            <div className="items-center flex flex-col">
              <label className="text-gray-700 font-semibold">
                {new Date().toISOString().split("T")[0]}
              </label>
            </div>
            <table className="w-full border-collapse">
              <thead>
                <tr>
                  <th className="border-b-2 p-2 text-left">Student Name</th>
                  <th className="border-b-2 p-2 text-center">Present</th>
                </tr>
              </thead>
              <tbody>
                {students.map((student, index) => (
                  <tr key={index} className="hover:bg-gray-100">
                    <td className="p-2 border-b">
                      {student.fname} {student.lname}
                    </td>
                    <td className="p-2 border-b text-center">
                      <button
                        className={`w-20 h-10 border-2 rounded-lg ${attendance[student._id]
                          ? "bg-green-500 text-white"
                          : "bg-white"
                          }`}
                        onClick={() => handlePresentToggle(student._id)}
                      >
                        {attendance[student._id] ? "Present" : "Absent"}
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
            <div className="flex justify-between mt-4 sm:mt-6">
              <button
                onClick={upload}
                className="bg-blue-500 text-white px-3 sm:px-4 py-1 sm:py-2 rounded-lg"
              >
                Submit
              </button>
              <Link to={"/techerUpdateAttendence"}>
                <button className="bg-orange-500 text-white px-3 sm:px-4 py-1 sm:py-2 rounded-lg">
                  Update Attendance
                </button>
              </Link>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default TeacherAttendance;
