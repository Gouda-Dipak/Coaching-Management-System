// import React from "react";
// import Header from "../Header";
// import Footer from "../Footer";
// import { motion } from "framer-motion";

// const subjects = [
//   { name: "Mathematics", color: "bg-blue-500", description: "Algebra, Geometry, Trigonometry", pdf: "/admin/pdfs/math.pdf" },
//   { name: "Science", color: "bg-green-500", description: "Physics, Chemistry, Biology", pdf: "/admin/pdfs/science.pdf" },
//   { name: "English", color: "bg-purple-500", description: "Grammar, Literature, Writing Skills", pdf: "/admin/pdfs/english.pdf" },
//   { name: "History", color: "bg-red-500", description: "Ancient, Medieval, Modern History", pdf: "/admin/pdfs/history.pdf" },
//   { name: "Geography", color: "bg-yellow-500", description: "Maps, Climate, Environment", pdf: "/admin/pdfs/geography.pdf" },
//   { name: "Computer Science", color: "bg-pink-500", description: "Programming, Databases, AI", pdf: "/admin/pdfs/computer_science.pdf" },
// ];

// const StudentLearningMaterial = () => {
//   const handleDownload = (pdf) => {
//     const pdfUrl = process.env.PUBLIC_URL + pdf;
//     const link = document.createElement("a");
//     link.href = pdfUrl;
//     link.download = pdf.split("/").pop(); // File ka naam maintain karega
//     document.body.appendChild(link);
//     link.click();
//     document.body.removeChild(link);

//     // File ko new tab me open karne ke liye
//     window.open(pdfUrl, "_blank");
//   };

//   return (
//     <div className="flex flex-col min-h-screen bg-gray-100">
//       {/* Header */}
//       <Header />

//       {/* Main Content */}
//       <div className="flex-grow flex flex-col items-center p-20">
//         <h3 className="text-4xl font-bold text-gray-900 mb-10 text-center">📚 Learning Material</h3>

//         <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
//           {subjects.map((subject, index) => (
//             <motion.div
//               key={index}
//               className={`w-52 h-64 flex flex-col items-center justify-center rounded-2xl shadow-lg text-white ${subject.color} text-center p-4`}
//               whileHover={{ scale: 1.05 }}
//               transition={{ type: "spring", stiffness: 200 }}
//             >
//               <span className="text-5xl">📖</span>
//               <h2 className="text-xl font-bold mt-3">{subject.name}</h2>
//               <p className="text-sm mt-2">{subject.description}</p>

//               {/* Download & Open Button */}
//               <button
//                 onClick={() => handleDownload(subject.pdf)}
//                 className="mt-4 bg-white text-black px-4 py-2 rounded-md text-sm font-semibold hover:bg-gray-300"
//               >
//                 Download & Open
//               </button>
//             </motion.div>
//           ))}
//         </div>
//       </div>

//       {/* Footer */}
//       <Footer />
//     </div>
//   );
// };

// export default StudentLearningMaterial;
// import React, { useEffect, useState } from "react";
// import Header from "../Header";
// import Footer from "../Footer";
// import { motion } from "framer-motion";
// import axios from "axios";

// const StudentLearningMaterial = () => {
//   const [subjects, setSubjects] = useState();

//   const handleDownload = (file) => {
//     const fileUrl = process.env.PUBLIC_URL + file;

//     const link = document.createElement("a");
//     link.href = fileUrl;
//     link.download = file.split("/").pop();
//     document.body.appendChild(link);
//     link.click();
//     document.body.removeChild(link);
//   };

//   useEffect(() => {
//     getallnotice();
//   }, []);
//   const getallnotice = async () => {
//     try {
//       const res = await axios.get(
//         "https://mdl-coaching.onrender.com/notes/sendnotes"
//       );
//       console.log(res.data);
//       setSubjects(res.data.data);
//     } catch (error) {
//       console.log(error);
//     }
//   };

//   return (
//     <div className="flex flex-col min-h-screen bg-gray-100">
//       <Header />

//       <div className="flex-grow flex flex-col items-center p-20">
//         <h3 className="text-4xl font-bold text-gray-900 mb-10 text-center">📚 Learning Material</h3>

//         <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
//           {subjects.map((subject, index) => (
//             <motion.div
//               key={index}
//               className={`w-52 h-64 flex flex-col items-center justify-center rounded-2xl shadow-lg text-white ${colors[index]} text-center p-4`}
//               whileHover={{ scale: 1.05 }}
//               transition={{ type: "spring", stiffness: 200 }}
//             >
//               <span className="text-5xl">📄</span>
//               <h2 className="text-xl font-bold mt-3"></h2>
//               <p className="text-sm mt-2"></p>

//               <div className="mt-4 flex gap-2">
//                 <a
//                   href={subject.notesfille}
//                   target="_blank"
//                   rel="noopener noreferrer"
//                   className="bg-white text-black px-4 py-2 rounded-md text-sm font-semibold hover:bg-gray-300"
//                 >
//                   Open
//                 </a>
//                 <button
//                   onClick={() => handleDownload(files[index])}
//                   className="bg-white text-black px-4 py-2 rounded-md text-sm font-semibold hover:bg-gray-300"
//                 >
//                   Download
//                 </button>
//               </div>
//             </motion.div>
//           ))}
//         </div>
//       </div>

//       <Footer />
//     </div>
//   );
// };

// export default StudentLearningMaterial;
import React, { useEffect, useState } from "react";
import Header from "../Header";
import Footer from "../Footer";
import { motion } from "framer-motion";
import axios from "axios";

const StudentLearningMaterial = () => {
  const [subjects, setSubjects] = useState([]); // Empty array se initialize karo

  

  const handleDownload = async (fileUrl) => {
    try {
      const response = await axios.get(`https://mdl-coaching.onrender.com/images/${fileUrl}`, { responseType: "blob" });
      const blob = new Blob([response.data], {
        type: response.headers["content-type"],
      });

      const link = document.createElement("a");
      link.href = URL.createObjectURL(blob);
      link.download = fileUrl.split("/").pop();
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    } catch (error) {
      console.error("Download Error:", error);
    }
  };

  useEffect(() => {
    getAllNotes();
  }, []);

  const getAllNotes = async () => {
    try {
      const res = await axios.get(`https://mdl-coaching.onrender.com/notes/sendnotes/${localStorage.getItem("studentclass")}`);
      console.log(res.data);
      setSubjects(res.data.data); // API response se data set karo
    } catch (error) {
      console.log(error);
    }
    
  };

  return (
    <div className="flex flex-col min-h-screen bg-gray-100">
      <Header />

      <div className="flex-grow flex flex-col items-center p-20">
        <h3 className="text-4xl font-bold text-gray-900 mb-10 text-center">
          📚 Learning Material
        </h3>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {subjects.map((subject, index) => (
            <motion.div
              key={index}
              className="w-52 h-64 flex flex-col items-center justify-center rounded-2xl shadow-lg bg-blue-500 text-white text-center p-4"
              whileHover={{ scale: 1.05 }}
              transition={{ type: "spring", stiffness: 200 }}
            >
              <div className="mt-2">
                <p className="text-xs break-all text-white">
                  {subject.notesfille.split("/").pop()}
                </p>
              </div>

              <span className="text-5xl">📖</span>
              <h2 className="text-xl font-bold mt-3">{subject.subject}</h2>
              <p className="text-sm mt-2">{subject.classname}</p>

              {/* URL Display */}
              <div className="mt-2">
                <p className="text-xs break-all text-white">
                  {subject.notesfille}
                </p>
              </div>

              <div className="mt-4 flex gap-2">
                <a
                  href="#"
                  onClick={(e) => {
                    e.preventDefault();
                    window.open(subject.notesfille, "_blank");
                  }}
                  className="bg-white text-black px-4 py-2 rounded-md text-sm font-semibold hover:bg-gray-300"
                >
                  Open
                </a>
                <button
                  onClick={() => handleDownload(subject.notesfille)}
                  className="bg-white text-black px-4 py-2 rounded-md text-sm font-semibold hover:bg-gray-300"
                >
                  Download
                </button>
              </div>
            </motion.div>
          ))}
        </div>
      </div>

      <Footer />
    </div>
  );
};

export default StudentLearningMaterial;
