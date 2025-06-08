// import React, { useEffect, useState } from "react";
// import Header from "../Home/Header";
// import Footer from "../Home/Footer";
// import axios from "axios";
// import { useParams } from "react-router-dom";

// function Feedback() {

//   const [feedbackdata, setFeedback] = useState([]);


//   useEffect(() => {
//     profile();
//   }, []);

//   const profile = async () => {
//     try {
//       const res = await axios.get(`https://mdl-coaching.onrender.com/feedback/getfeedback`);
//       console.log(res.data.data);
//       setFeedback(res.data.data.reverse()); // Ensure it's an array
//     } catch (error) {
//       console.log(error);
//     }
//   };

//   return (
//     <div className="flex flex-col min-h-screen">
//       <Header />
//       <div className="flex flex-1 bg-[#454649] p-4 sm:p-6 md:p-6 min-h-screen">
//         <div className="w-full bg-white p-6 mt-20 rounded-lg shadow-lg max-w-4xl mx-auto">


//           <h2 className="text-2xl font-bold mb-4">Feedback Received</h2>
//           <div className="space-y-4">
//             {feedbackdata.length === 0 ? (
//               <div className="text-center text-gray-500">No feedback available</div>
//             ) : (
//               feedbackdata.map((feedback, index) => (
//                 <div key={index} className="p-4 border rounded bg-gray-50">
//                   <p className="font-bold">
//                     ID: {feedback.s_id} | Name: {feedback.name} | Class:{" "}
//                     {feedback.s_class} ({feedback.role})
//                   </p>
//                   <p>{feedback.feedback}</p>
//                 </div>
//               ))
//             )}
//           </div>
//         </div>
//       </div>
//       <Footer />
//     </div>
//   );
// }

// export default Feedback;
import React, { useEffect, useState } from "react";
import Header from "../Home/Header";
import Footer from "../Home/Footer";
import axios from "axios";
import { motion } from "framer-motion";

function Feedback() {
  const [feedbackdata, setFeedback] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    profile();
  }, []);

  const profile = async () => {
    try {
      const res = await axios.get("https://mdl-coaching.onrender.com/feedback/getfeedback");
      setFeedback(res.data.data.reverse());
      setTimeout(() => setLoading(false), 1500); // Simulate loading
    } catch (error) {
      console.log(error);
      setLoading(false);
    }
  };

  const spinnerColors = [
    "border-red-500",
    "border-yellow-500",
    "border-green-500",
    "border-blue-500",
    "border-purple-500",
    "border-pink-500",
  ];

  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      <div
        className={`flex-1 bg-[#454649] flex items-center justify-center ${
          !loading ? "min-h-screen" : ""
        } mt-8 py-10 px-4 sm:px-6 md:px-10`}
      >
        {loading ? (
          <div className="flex justify-center items-center h-screen w-full">
            <div
              className={`w-16 h-16 rounded-full border-8 border-dashed animate-spin border-t-transparent ${
                spinnerColors[Math.floor(Math.random() * spinnerColors.length)]
              }`}
            ></div>
          </div>
        ) : (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="w-full bg-white p-4 sm:p-6 md:p-8 rounded-lg shadow-lg max-w-4xl mx-auto"
          >
            <h2 className="text-xl sm:text-2xl font-bold mb-4 text-center sm:text-left">
              Feedback Received
            </h2>

            <motion.div
              className="space-y-4"
              initial="hidden"
              animate="visible"
              variants={{
                visible: {
                  transition: {
                    staggerChildren: 0.2,
                  },
                },
              }}
            >
              {feedbackdata.length === 0 ? (
                <div className="text-center text-gray-500">No feedback available</div>
              ) : (
                feedbackdata.map((feedback, index) => (
                  <motion.div
                    key={index}
                    className="p-4 border rounded bg-gray-50 text-sm sm:text-base overflow-x-auto"
                    variants={{
                      hidden: { opacity: 0, y: 20 },
                      visible: { opacity: 1, y: 0 },
                    }}
                    transition={{ duration: 0.4 }}
                  >
                    <p className="font-semibold break-words">
                      ID: {feedback.s_id} | Name: {feedback.name} | Class:{" "}
                      {feedback.s_class} ({feedback.role})
                    </p>
                    <p className="mt-1 break-words">{feedback.feedback}</p>
                  </motion.div>
                ))
              )}
            </motion.div>
          </motion.div>
        )}
      </div>
      <Footer />
    </div>
  );
}

export default Feedback;
