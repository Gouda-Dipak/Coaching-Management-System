import React, { useEffect, useState } from "react";
import Header from "../Header";
import Footer from "../Footer";
import axios from "axios";
import { FaEdit, FaTrash } from "react-icons/fa";

const StudentNotice = () => {
  const [newNotice, setNewNotice] = useState([]);

  useEffect(() => {
    fetchNotices();
  }, []);

  const fetchNotices = async () => {
    try {
      const response = await axios.get(
        `https://mdl-coaching.onrender.com/t_notice/teachernotice/selectedclass/${localStorage.getItem("studentclass")}`
      );
      setNewNotice(response.data.data);
    } catch (error) {
      console.error("Error fetching Notices:", error);
    }
  };
  const [selectedNotice, setSelectedNotice] = useState(null);
  return (
    <div className="flex flex-col h-screen">
      {/* Fixed Header */}
      <Header />
      {/* Scrollable Main Content */}
      <div className="flex-grow overflow-auto p-10 bg-gray-100 min-h-screen mt-10">
        <h1 className="text-3xl font-bold text-center mb-6 text-gray-800">
          📢 Latest Notices
        </h1>
        <div className="space-y-4">
          {newNotice.map((notice, index) => {
            // Only show first 5 words in list
            const shortDescription =
              notice.noticedescription.split(" ").slice(0, 5).join(" ") + "...";

            return (
              <div
                key={index}
                className="p-4 rounded-md shadow-md flex flex-wrap justify-between items-center border-gray-300 border cursor-pointer gap-2"
                onClick={() => setSelectedNotice(notice)} // Open popup
              >
                <div className="w-full min-w-0 flex-1">
                  <p className="text-lg font-semibold truncate">
                    {notice.title}
                  </p>
                  {/* <p className="text-gray-500 text-sm break-words">
                    {shortDescription}
                  </p> */}
                  <p className="text-gray-500 text-sm">{notice.date}</p>
                  <span className="text-gray-700 text-sm">
                    {notice.selectedclass}
                  </span>
                </div>
              </div>
            );
          })}

          {/* Notice Modal */}
          {selectedNotice && (
            <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center p-4">
              <div className="bg-white p-6 rounded-lg shadow-lg w-full max-w-2xl border border-gray-300">
                <h2 className="text-2xl font-bold text-center mb-4">
                  {selectedNotice.title}
                </h2>

                <div className="flex justify-between text-sm text-gray-600 border-b pb-2 mb-4">
                  <span>
                    <strong>Date:</strong> {selectedNotice.date}
                  </span>
                  <span>
                    <strong>Class:</strong> {selectedNotice.selectedclass}
                  </span>
                </div>

                {/* Full Notice Text in Modal */}
                <p className="text-gray-700 text-justify leading-relaxed break-words whitespace-normal">
                  {selectedNotice.noticedescription.replace(/school/gi, "")}
                </p>

                <button
                  className="mt-6 bg-red-500 text-white px-5 py-2 rounded-md w-full hover:bg-opacity-80"
                  onClick={() => setSelectedNotice(null)}
                >
                  Close
                </button>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Fixed Footer */}
      <Footer />
    </div>
  );
};

export default StudentNotice;
