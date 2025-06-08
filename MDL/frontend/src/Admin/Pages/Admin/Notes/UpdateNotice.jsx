import React, { useEffect, useState } from "react";
import Header from "../Home/Header";
import Footer from "../Home/Footer";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import Swal from "sweetalert2";
import { Link, useNavigate, useParams } from "react-router-dom";
import { AiOutlineArrowLeft } from "react-icons/ai";
import axios from "axios";
export const UpdateNotice = () => {
  const [title, setTitle] = useState("");
  const [date, setDate] = useState("");
  const [content, setContent] = useState("");
  const [signatureName, setSignatureName] = useState("");
  const [signatureDesignation, setSignatureDesignation] = useState("");

  const { NoticeId } = useParams();
  const [notice, setnotice] = useState([]);

  useEffect(() => {
    fetchdata();
  }, [NoticeId]);

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

  function stripHtmlTags(html) {
    if (!html) return ""; // Handle empty input

    return html.replace(/<\/?[^>]+(>|$)/g, ""); // Removes all HTML tags
  }
    // const handleSubmit = async (e) => {
    //   e.preventDefault();
    //   Swal.fire({
    //     title: "Select Option",
    //     input: "select",
    //     inputOptions: {
    //       Student: "Student",
    //       Teacher: "Teacher",
    //       Both: "Both",
    //     },
    //     inputPlaceholder: "Select one",
    //     showCancelButton: true,
    //   }).then(async (result) => {
    //     if (result.isConfirmed) {
    //       console.log(result);
    //       const formdata = new FormData();
    //       formdata.append("title", notice.title);
    //       formdata.append("date", notice.date);
    //       formdata.append("description", stripHtmlTags(notice.description));
    //       formdata.append("name", notice.name);
    //       formdata.append("role", result.value);
    //       try {
    //         const url = `https://mdl-coaching.onrender.com/notice/UpdateByidNotice/${NoticeId}`;

    //         const response = await axios.post(url, formdata, {
    //           headers: { "Content-Type": "application/json" },
    //         });

    //         Swal.fire({
    //           title: response.data.data,
    //           text: `Your notice has been successfully added for ${result.value}.`,
    //           icon: "success",
    //           confirmButtonText: "OK",
    //         });
    //       } catch (error) {
    //         console.log("Error for update:", error);
    //       }
    //     }
    //   });
    // };  
    const navigate = useNavigate(); 
    const handleSubmit = async (e) => {
      e.preventDefault();
      Swal.fire({
        title: "Select Option",
        input: "select",
        inputOptions: {
          Student: "Student",
          Teacher: "Teacher",
          Both: "Both",
        },
        inputPlaceholder: "Select one",
        showCancelButton: true,
      }).then(async (result) => {
        if (result.isConfirmed) {
          console.log(result);
          const formdata = new FormData();
          formdata.append("title", notice.title);
          formdata.append("date", notice.date);
          formdata.append("description", stripHtmlTags(notice.description));
          formdata.append("name", notice.name);
          formdata.append("role", result.value);
    
          try {
            const url = `https://mdl-coaching.onrender.com/notice/UpdateByidNotice/${NoticeId}`;
    
            const response = await axios.post(url, formdata, {
              headers: { "Content-Type": "application/json" },
            });
    
            Swal.fire({
              title: response.data.data,
              text: `Your notice has been successfully added for ${result.value}.`,
              icon: "success",
              confirmButtonText: "OK",
            }).then(() => {
              navigate("/adminhome"); // Redirect to Admin Page
            });
          } catch (error) {
            console.log("Error updating:", error);
            Swal.fire({
              title: "Error!",
              text: "Failed to update notice. Please try again.",
              icon: "error",
              confirmButtonText: "OK",
            });
          }
        }
      });
    };
  return (
    <div className="flex flex-col min-h-screen bg-[#454649]">
      {/* Header */}
      <Header />

      {/* Main Content */}
      {notice ? (
        <div className="flex flex-1 p-4 sm:p-10 md:p-16 lg:p-20 w-full mt-4 min-h-screen">
          <div className="w-full max-w-4xl mx-auto bg-white p-12 rounded-lg shadow-lg border border-gray-200">
            {/* Title and Date */}
            <div className="mb-6 flex flex-col items-center">
              <input
                type="text"
                className="text-3xl font-bold text-indigo-700 border-gray-300 outline-none w-full text-center"
                placeholder="Enter Title"
                value={notice.title}
                onChange={(e) =>
                  setnotice({ ...notice, title: e.target.value })
                }
              />
            </div>

            <div className="w-full flex justify-end">
              <input
                type="date"
                className="text-gray-600 border-b border-gray-300 outline-none"
                value={notice.date}
                onChange={(e) => setnotice({ ...notice, date: e.target.value })}
              />
            </div>

            <br />
            
            <ReactQuill
              className="bg-white"
              theme="snow"
              value={notice.description}
              onChange={(e) =>
                setnotice({ ...notice, description: e })
              }
              placeholder="Write the notice content here..."
            />

            {/* Signature */}
            <div className="mt-8 border-t pt-4 text-right">
              {/* <input
                type="text"
                className="text-lg font-semibold text-gray-800 border-b border-gray-300 outline-none"
                placeholder="Principal's Name"
                value={signatureName}
                onChange={(e) => setSignatureName(e.target.value)}
              /> */}
              <input
                type="text"
                className="text-gray-700 font-medium border-b border-gray-300 outline-none mt-2"
                placeholder="Designation"
                value={notice.name}
                onChange={(e) => setnotice({ ...notice, name: e.target.value })}
              />
            </div>

            {/* Submit Button */}
            <div className="mt-6 text-center">
              <button
                className="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
                onClick={handleSubmit}
              >
                Update Notice
              </button>
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

export default UpdateNotice;
