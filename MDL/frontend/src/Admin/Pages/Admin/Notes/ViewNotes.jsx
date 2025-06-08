import React, { useEffect, useState } from "react";
import Header from "../Home/Header";
import Footer from "../Home/Footer";
import { Link, useParams } from "react-router-dom";
import { AiOutlineArrowLeft } from "react-icons/ai";
import axios from "axios";
export const ViewNotes = () => {
  const { NoticeId } = useParams();
  const [notice, setnotice] = useState([]);

  useEffect(() => {
    const fetchdata = async () => {
      try {
        const response = await axios.get(
          `https://mdl-coaching.onrender.com/notice/findByidNotice/${NoticeId}`
        );
        console.log("Notice by id :: ", response.data.data);
        setnotice(response.data.data);
      } catch (error) {
        console.log("Not Found Error", error);
      }
    };
    fetchdata();
  }, []);

  function formatDate(dateString) {
    if (!dateString) return "Invalid Date"; // Handle undefined/null cases

    const months = [
      "January",
      "February",
      "March",
      "April",
      "May",
      "June",
      "July",
      "August",
      "September",
      "October",
      "November",
      "December",
    ];

    const parts = dateString.split("-");
    if (parts.length !== 3) return "Invalid Date"; // Handle incorrect formats

    const [year, month, day] = parts;
    return `${parseInt(day)} ${months[parseInt(month) - 1]} ${year}`;
  }

  return (
    <div className="flex flex-col min-h-screen bg-[#454649]">
      {/* Header */}
      <Header />

      {/* Main Content */}
      {notice.name ? (
        <div className="flex flex-1 p-4 sm:p-10 md:p-16 lg:p-20 w-full mt-4 min-h-screen">
          <div className="w-full max-w-4xl mx-auto bg-white p-12 rounded-lg shadow-lg border border-yellow-800">
            {/* Title and Date */}
            <div className="mb-6 flex flex-col items-center">
              <h1 className="text-3xl font-bold text-indigo-700 text-center">
                <b>{notice.title}</b>
              </h1>
            </div>

            <div className="w-full flex justify-end">
              <b className="text-gray-600">{formatDate(notice.date)}</b>
            </div>

            <br />
            {/* Notes Content */}
            <p className="text-gray-700 leading-relaxed text-lg">
              {notice.description}
            </p>

            {/* Signature */}
            <div className="mt-8 border-t pt-4 text-right">
              <h2 className="text-lg font-semibold text-gray-800">
                Principal Signature
              </h2>
              <p className="text-gray-700 font-medium">{notice.name}</p>
            </div>
          </div>
        </div>
      ) : (
        <div className="text-center text-white mt-10">Loading...</div>
      )}

      <Link
        to="/adminhome"
        className="fixed bottom-6 left-4 text-white bg-green-600 p-3 rounded-full hover:bg-green-700 transition duration-300"
      >
        <AiOutlineArrowLeft size={24} />
      </Link>
      {/* Footer */}
      <Footer />
    </div>
  );
};

export default ViewNotes;
