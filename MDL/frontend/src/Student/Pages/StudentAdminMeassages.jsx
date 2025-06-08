// import React, { useEffect, useState } from 'react';
// import Header from '../Header';
// import Footer from '../Footer';
// import axios from 'axios';

// const StudentAdminMeassages = () => {
//     const [notice,setnotice] = useState([]);
//     const [selectedNews, setSelectedNews] = useState(null);
//     useEffect(() => {
//         fetchNotice();
//       }, []);
    
//       const fetchNotice= async () => {
//         try {
//           const response = await axios.get(
//             "https://mdl-coaching.onrender.com/notice/getnoticestudent"
//           );
//           setnotice(response.data.data); // Store fetched teachers in state
//         } catch (error) {
//           console.error("Error fetching teachers:", error);
//         }
//       };
//   return (
//     <div className="flex flex-col h-screen">
//       {/* Fixed Header */}
//       <Header />
//       {/* Scrollable Main Content */}
//       <div className="flex-grow overflow-auto p-10 bg-gray-100 min-h-screen mt-10">
//         <h1 className="text-3xl font-bold text-center mb-6 text-gray-800">
//           📢 Latest Notices
//         </h1>
//         <div className="p-6 bg-gray-100">
//         <h3 className="text-2xl font-bold text-gray-800 mb-4">
//           News & Announcements
//         </h3>
//         <div className="space-y-4">
//           {notice.map((news, index) => (
//             <div
//               key={index}
//               className={`p-4 rounded-lg ${news.bg} shadow-md cursor-pointer`}
//               onClick={() => setSelectedNews(news)}
//             >
//               <p className="font-semibold text-gray-800">{news.title}</p>
//               <span className="text-sm text-gray-600">
//                 {news.date} - {news.audience}
//               </span>
//               <p>{news.name}</p>
//             </div>
//           ))}
//         </div>
//       </div>

//       {/* Floating News Modal */}
//       {selectedNews && (
//         <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
//           <div className="bg-white p-6 rounded-lg shadow-lg w-96">
//             <h2 className="text-xl font-bold">{selectedNews.title}</h2>
//             <p className="text-sm text-gray-600 mb-2">
//               {selectedNews.date} - {selectedNews.audience}
//             </p>
//             <p className="text-gray-800">{selectedNews.description}</p>
//             <button
//               className="mt-4 px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
//               onClick={() => setSelectedNews(null)}
//             >
//               Close
//             </button>
//           </div>
//         </div>
//       )}
//       </div>

//       {/* Fixed Footer */}
//       <Footer />
//     </div>
//   );
// };

// export default StudentAdminMeassages;
import React, { useEffect, useState } from "react";
import Header from "../Header";
import Footer from "../Footer";
import axios from "axios";

const StudentAdminMessages = () => {
  const [notice, setNotice] = useState([]);
  const [selectedNews, setSelectedNews] = useState(null);

  useEffect(() => {
    fetchNotice();
  }, []);

  const fetchNotice = async () => {
    try {
      const response = await axios.get("https://mdl-coaching.onrender.com/notice/getnoticestudent");
      setNotice(response.data.data);
    } catch (error) {
      console.error("Error fetching notices:", error);
    }
  };

  return (
    <div className="flex flex-col h-screen">
      {/* Fixed Header */}
      <Header />

      {/* Scrollable Main Content */}
      <div className="flex-grow overflow-auto p-10 bg-gray-100 min-h-screen mt-10">
        <h1 className="text-3xl font-bold text-center mb-6 text-gray-800">📩 Latest Messages</h1>

        <div className="p-6 bg-gray-100">
          <h3 className="text-2xl font-bold text-gray-800 mb-4">News & Announcements</h3>
          <div className="space-y-4">
            {notice.map((news, index) => (
              <div
                key={index}
                className="p-4 bg-white rounded-lg shadow-md cursor-pointer hover:shadow-lg transition"
                onClick={() => setSelectedNews(news)}
              >
                <p className="font-semibold text-gray-800">{news.title}</p>
                <span className="text-sm text-gray-600">{news.date} - {news.audience}</span>
                <p className="text-gray-700 mt-1">{news.description.slice(0, 50)}...</p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Floating News Modal */}
      {selectedNews && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50 p-4">
          <div className="bg-white p-6 rounded-lg shadow-lg w-[90%] md:w-[50%] lg:w-[40%] relative flex flex-col">
            {/* Header Section */}
            <div className="flex justify-between items-center border-b pb-3 mb-4">
              <h2 className="text-xl font-bold text-gray-800 text-center flex-grow">{selectedNews.title}</h2>
              <p className="text-sm text-gray-600">{selectedNews.date}</p>
            </div>

            {/* Content Section */}
            <p className="text-gray-800 text-justify leading-relaxed flex-grow">{selectedNews.description}</p>

            {/* Close Button - Moved Below */}
            <button
              className="mt-6 w-full py-3 text-lg bg-red-500 text-white font-bold rounded-lg hover:bg-red-600 transition"
              onClick={() => setSelectedNews(null)}
            >
              Close
            </button>
          </div>
        </div>
      )}
      {/* Fixed Footer */}
      <Footer />
    </div>
  );
};

export default StudentAdminMessages;
