import { useEffect, useState } from "react";
import Swal from "sweetalert2";
import { FaEdit, FaTrash, FaPlus } from "react-icons/fa";
import Header from "../Header";
import Footer from "../Footer";

import axios from "axios";
import { toast } from "react-toastify";
import { data, useNavigate } from "react-router-dom";

const TeacherNotice = () => {
  const todayDate = new Date().toISOString().split("T")[0];

  const [notices, setNotices] = useState([]);

  const [newNotice, setNewNotice] = useState();
  const [title, setTitle] = useState();
  const [selectedclass, setSelectedclass] = useState();
  const [date, setDate] = useState();
  const [classes, setClasses] = useState([]);
  // const [noticedescription, setNoticedescription] = useState({noticedescription: ""});
  // console.log(newNotice);
  const handleClick = async (e) => {
    e.preventDefault();
    console.log(newNotice, title, selectedclass, date);
    try {
      const url = "https://mdl-coaching.onrender.com/t_notice/teachernotice";

      const response = await axios.post(
        url,
        {
          noticedescription: newNotice,
          date: date,
          title: title,
          selectedclass: selectedclass,
        },
        {
          headers: {
            "Content-Type": "application/json", // Fixed typo here
          },
        }
      );
      console.log(response);

      const { message, success, error } = await response.data;

      if (success) {
        toast.success(message, {
          position: "top-center",
          autoClose: 2000,
        });
      } else if (error) {
        console.log(error);
        const details = error?.details[0].message;
        toast.error(details, {
          position: "top-center",
          autoClose: 2000,
        });
      } else {
        toast.error(message, {
          position: "top-center",
          autoClose: 2000,
        });
      }
    } catch (error) {
      toast.error(error, {
        position: "top-center",
        autoClose: 2000,
      });
    }
    getallnotice();
  };

  

  useEffect(() => {
    getclasses();
    getallnotice();
  }, []);

  const getclasses = async () => {
    try {
      const res = await axios.get("https://mdl-coaching.onrender.com/class/getclasses");
      console.log(res.data);
      setClasses(res.data.data);
    } catch (error) {
      console.log(error);
    }
  };
  const getallnotice = async () => {
    try {
      const res = await axios.get(
        "https://mdl-coaching.onrender.com/t_notice/teachernotice/getallnotice"
      );
      console.log(res.data);
      setNotices(res.data.data);
    } catch (error) {
      console.log(error);
    }
  };

  function delet(noticeId) {
    Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!",
    }).then(async (result) => {
      if (result.isConfirmed) {
        try {
          const url = `https://mdl-coaching.onrender.com/t_notice/teachernotice/delete/${noticeId}`;

          const response = await axios.get(url);

          Swal.fire({
            title: response.data.message,
            text: "Your Notice has been deleted.",
            icon: "success",
          });
          getallnotice();
          // getnotic();
        } catch (error) {
          Swal.fire({
            title: "Deleted!",
            text: "Your Notice has been deleted.",
            icon: "success",
          });
        }
      }
    });
  }
  const [selectedNotice, setSelectedNotice] = useState(null);
  return (
    <div className="flex flex-col h-screen">
      {/* Header */}
      <Header />

      <div className="flex flex-1">
        {/* Sidebar */}
        {/* <Sidebar /> */}

        {/* Main Content */}
        <div className="flex-1 p-10 h-screen overflow-auto">
          <h1 className="text-2xl font-bold text-center text-gray-700 mb-6">
            📌 Notices
          </h1>
          <div className="flex items-center gap-4 p-4">
            <input
              type="text"
              placeholder="Enter notice title..."
              className="border p-2 rounded-md w-60"
              onChange={(e) => setTitle(e.target.value)}
            />
           
            <select
              name="s_class"
              onChange={(e) => setSelectedclass(e.target.value)}
              className="border p-2 rounded-md"
              required
            >
              <option value="">Select Class</option>
              {classes.map((cls, index) => (
                <option value={cls.classname} key={index}>
                  {cls.classname}
                </option>
              ))}
            </select>
            <input
              type="date"
              className="border p-2 rounded-md"
              onChange={(e) => setDate(e.target.value)}
            />
          </div>
          {/* Add Notice Section */}
          <div className="flex gap-3 mb-6">
            <input
              type="text"
              name="noticedescription"
              className="border p-2 flex-1 rounded-md"
              placeholder="Enter new notice..."
              // value={newNotice}
              onChange={(e) => setNewNotice(e.target.value)}
            />
            <button
              className="bg-green-500 text-white px-4 py-2 rounded-md flex items-center gap-2"
              // onClick={addNotice}
              onClick={handleClick}
            >
              <FaPlus /> Add
            </button>
          </div>
          {/* Notice List */}
          
         <div className="space-y-4">
      {notices.map((notice, index) => {
        // Only show first 5 words in list
        const shortDescription = notice.noticedescription
          .split(" ")
          .slice(0, 5)
          .join(" ") + "...";

        return (
          <div
            key={index}
            className="p-4 rounded-md shadow-md flex flex-wrap justify-between items-center border-gray-300 border cursor-pointer gap-2"
            onClick={() => setSelectedNotice(notice)} // Open popup
          >
            <div className="w-full min-w-0 flex-1">
              <p className="text-lg font-semibold truncate">{notice.title}</p>
              {/* <p className="text-gray-500 text-sm break-words">{shortDescription}</p> */}
              <p className="text-gray-500 text-sm">{notice.date}</p>
              <span className="text-gray-700 text-sm">{notice.selectedclass}</span>
            </div>
            <div className="flex gap-2 ml-auto flex-shrink-0">
              {/* <button
                className="bg-blue-500 text-white w-8 h-8 rounded-md flex items-center justify-center hover:bg-opacity-80"
                onClick={(e) => {
                  e.stopPropagation();
                  updateNotice(notice.id);
                }}
              >
                <FaEdit size={14} />
              </button> */}
              <button
                className="bg-red-500 text-white w-8 h-8 rounded-md flex items-center justify-center hover:bg-opacity-80"
                onClick={(e) => {
                  e.stopPropagation();
                  delet(notice._id);
                }}
              >
                <FaTrash size={14} />
              </button>
            </div>
          </div>
        );
      })}

      {/* Notice Modal */}
      {selectedNotice && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center p-4">
          <div className="bg-white p-6 rounded-lg shadow-lg w-full max-w-2xl border border-gray-300">
            <h2 className="text-2xl font-bold text-center mb-4">{selectedNotice.title}</h2>
            
            <div className="flex justify-between text-sm text-gray-600 border-b pb-2 mb-4">
              <span><strong>Date:</strong> {selectedNotice.date}</span>
              <span><strong>Class:</strong> {selectedNotice.selectedclass}</span>
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
      </div>

      {/* Footer */}
      <Footer />
    </div>
  );
};

export default TeacherNotice;
