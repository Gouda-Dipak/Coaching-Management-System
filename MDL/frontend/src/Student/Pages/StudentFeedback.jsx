// import React, { useEffect, useState } from "react";
// import Header from "../Header";
// import Footer from "../Footer";
// import axios from "axios";

// const StudentFeedback = () => {
//   const [feedback, setfeedback] = useState({
//     // studentId: "",
//     // name: "",
//     // classname: "",
//     role: "",
//     feedback: "",
//     fname: "",
//     lname: "",
//     mname: "",
//     s_id: "",
//     s_class: "",
//   });

//   useEffect(() => {
//     profile();
//   }, []);

//   //   const [students, setStudents] = useState({});

//   const profile = async () => {
//     try {
//       const studentid = localStorage.getItem("studentid");
//       const res = await axios.get(
//         `https://mdl-coaching.onrender.com/student/getstudentdetails/${studentid}`
//       );
//       console.log(res.data);
//       setfeedback(res.data.data);
//     } catch (error) {
//       console.log(error);
//     }
//   };
//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     const formdata = new FormData();
//     formdata.append("studentId", feedback.studentId);
//     formdata.append("name", feedback.name);
//     formdata.append("classname", feedback.classname);
//     formdata.append("role", feedback.description);
//     formdata.append("feedback", feedback.feedback);
//     formdata.append("fname", feedback.fname);
//     formdata.append("mname", feedback.mname);
//     formdata.append("lname", feedback.lname);
//     formdata.append("s_id", feedback.s_id);
//     formdata.append("s_class", feedback.s_class);
//     try {
//       const url = "https://mdl-coaching.onrender.com/feedback/studentfeedback";

//       const response = await axios.post(url, formdata, {
//         headers: { "Content-Type": "application/json" },
//       });

//       console.log("this is the response data::: " + response.data);
//       const { message, success, error } = await response.data;

//       if (success) {
//         toast.success(message, {
//           position: "top-center",
//           autoClose: 2000,
//         });
//         //   setTimeout(() => {
//         //     navigate("/showclassTeacher/showallteacherlist");
//         //   }, 1000);
//       } else if (error) {
//         console.log(error);
//         // const details = error?.details[0].message;
//         toast.error(details, {
//           position: "top-center",
//           autoClose: 2000,
//         });
//       } else {
//         toast.error(message, {
//           position: "top-center",
//           autoClose: 2000,
//         });
//       }
//     } catch (error) {
//       toast.error(error, {
//         position: "top-center",
//         autoClose: 2000,
//       });
//     }
//   };

//   return (
//     <>
//       <div className="flex flex-col min-h-screen">
//         <Header />
//         <div className="flex-grow overflow-auto min-h-screen mt-10">
//           <div className="w-full bg-white p-6 mt-20 rounded-lg shadow-lg max-w-4xl mx-auto">
//             <h2 className="text-2xl font-bold mb-4">Submit Your Feedback</h2>
//             <form className="mb-6" onSubmit={handleSubmit}>
//               <input
//                 type="text"
//                 name="s_id"
//                 value={feedback.s_id}
//                 disabled
//                 className="w-full p-3 border rounded mb-3 bg-gray-100 cursor-not-allowed"
//               />
//               <input
//                 type="text"
//                 name="name"
//                 value={`${feedback.fname || ""} ${feedback.lname || ""} ${
//                   feedback.mname
//                 }`}
//                 disabled
//                 className="w-full p-3 border rounded mb-3 bg-gray-100 cursor-not-allowed"
//               />
//               <input
//                 type="text"
//                 name="classname"
//                 value={feedback.s_class}
//                 disabled
//                 className="w-full p-3 border rounded mb-3 bg-gray-100 cursor-not-allowed"
//               />
//               <input
//                 type="text"
//                 name="role"
//                 value="Student"
//                 disabled
//                 className="w-full p-3 border rounded mb-3 bg-gray-100 cursor-not-allowed"
//               />
//               <textarea
//                 name="feedback"
//                 // onChange={handleChange}
//                 placeholder="Enter your feedback"
//                 className="w-full p-3 border rounded mb-3"
//                 required
//               ></textarea>
//               <button
//                 type="submit"
//                 className="w-full bg-blue-600 text-white p-3 rounded"
//               >
//                 Submit
//               </button>
//             </form>
//           </div>
//         </div>
//         <Footer />
//       </div>
//     </>
//   );
// };

// export default StudentFeedback;
import React, { useEffect, useState } from "react";
import Header from "../Header";
import Footer from "../Footer";
import axios from "axios";
import { toast } from "react-toastify";

const StudentFeedback = () => {
  const [feedback, setfeedback] = useState({
    role: "Student",
    feedback: "",
    fname: "",
    lname: "",
    mname: "",
    s_id: "",
    s_class: "",
  });

  useEffect(() => {
    profile();
  }, []);

  const profile = async () => {
    try {
      const studentid = localStorage.getItem("studentid");
      const res = await axios.get(
        `https://mdl-coaching.onrender.com/student/getstudentdetails/${studentid}`
      );

      if (res.data && res.data.data) {
        setfeedback((prev) => ({
          ...prev,
          s_id: res.data.data.s_id || "",
          fname: res.data.data.fname || "",
          lname: res.data.data.lname || "",
          mname: res.data.data.mname || "",
          s_class: res.data.data.s_class || "",
        }));
      }
    } catch (error) {
      console.error("Error fetching student details:", error);
    }
  };

  const handleChange = (e) => {
    setfeedback({ ...feedback, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const formData = {
      s_id: feedback.s_id,
      name: `${feedback.fname} ${feedback.lname} ${feedback.mname || ""}`,
      s_class: feedback.s_class,
      role: feedback.role,
      feedback: feedback.feedback,
    };

    try {
      const url = "https://mdl-coaching.onrender.com/feedback/studentfeedback";
      const response = await axios.post(url, formData, {
        headers: { "Content-Type": "application/json" },
      });

      console.log("Response:", response.data);
      const { message, success } = response.data;

      if (success) {
        toast.success(message, { position: "top-center", autoClose: 2000 });
      } else {
        toast.error("Something went wrong!", { position: "top-center", autoClose: 2000 });
      }
    } catch (error) {
      toast.error("Error submitting feedback", { position: "top-center", autoClose: 2000 });
    }
  };

  return (
    <>
      <div className="flex flex-col min-h-screen">
        <Header />
        <div className="flex-grow overflow-auto min-h-screen mt-10">
          <div className="w-full bg-white p-6 mt-20 rounded-lg shadow-lg max-w-4xl mx-auto">
            <h2 className="text-2xl font-bold mb-4">Submit Your Feedback</h2>
            <form className="mb-6" onSubmit={handleSubmit}>
              <input
                type="text"
                name="s_id"
                value={feedback.s_id}
                disabled
                className="w-full p-3 border rounded mb-3 bg-gray-100 cursor-not-allowed"
              />
              <input
                type="text"
                name="name"
                value={`${feedback.fname} ${feedback.lname} ${feedback.mname || ""}`}
                disabled
                className="w-full p-3 border rounded mb-3 bg-gray-100 cursor-not-allowed"
              />
              <input
                type="text"
                name="s_class"
                value={feedback.s_class}
                disabled
                className="w-full p-3 border rounded mb-3 bg-gray-100 cursor-not-allowed"
              />
              <input
                type="text"
                name="role"
                value={feedback.role}
                disabled
                className="w-full p-3 border rounded mb-3 bg-gray-100 cursor-not-allowed"
              />
              <textarea
                name="feedback"
                value={feedback.feedback}
                onChange={handleChange}
                placeholder="Enter your feedback"
                className="w-full p-3 border rounded mb-3"
                required
              ></textarea>
              <button type="submit" className="w-full bg-blue-600 text-white p-3 rounded">
                Submit
              </button>
            </form>
          </div>
        </div>
        <Footer />
      </div>
    </>
  );
};

export default StudentFeedback;
