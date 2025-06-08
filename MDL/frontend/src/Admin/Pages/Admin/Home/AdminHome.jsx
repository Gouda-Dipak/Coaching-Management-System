import React, { useEffect, useState } from "react";
import Swal from "sweetalert2";
import Header from "./Header";
import Footer from "./Footer";
import { AiOutlineDelete, AiOutlineEye, AiOutlineEdit } from "react-icons/ai";
import { motion } from "framer-motion";
import {
  FaChalkboardTeacher,
  FaUserGraduate,
  FaUsers,
} from "react-icons/fa";
import { Link } from "react-router-dom";
import axios from "axios";
import { FiSearch } from "react-icons/fi";

function AdminHome() {
  const [searchQuery, setSearchQuery] = useState("");
  const [notice, setnotice] = useState([]);
  const [noticeLoading, setNoticeLoading] = useState(true);

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
          const url = `https://mdl-coaching.onrender.com/notice/delete/${noticeId}`;
          const response = await axios.get(url);

          Swal.fire({
            title: response.data.message,
            text: "Your file has been deleted.",
            icon: "success",
          });
          getnotice();
        } catch (error) {
          Swal.fire({
            title: "Deleted!",
            text: "Your file has been deleted.",
            icon: "success",
          });
        }
      }
    });
  }

  const filteredNotices = notice.filter((data) =>
    data.title.toLowerCase().includes(searchQuery.toLowerCase())
  );

  useEffect(() => {
    getnotice();
  }, []);

  const [totalclass, settotalclass] = useState(0);
  const [totalteacher, settotalteacher] = useState(0);
  const [totalstudents, settotalstudentes] = useState(0);

  useEffect(() => {
    const gettotals = async () => {
      const response = await axios.get("https://mdl-coaching.onrender.com/TotalAdminDashboards");
      settotalclass(response.data.totalclass);
      settotalteacher(response.data.totalteachers);
      settotalstudentes(response.data.totalstudentes);
    };
    gettotals();
  }, []);

  const AnimatedCounter = ({ value, speed = 1000 }) => {
    const [count, setCount] = useState(0);
    useEffect(() => {
      let start = 0;
      const end = Number(value) || 0;
      if (start === end) return;
      let step = Math.ceil(end / (speed / 20));
      let timer = setInterval(() => {
        start += step;
        if (start >= end) {
          start = end;
          clearInterval(timer);
        }
        setCount(start);
      }, 20);
      return () => clearInterval(timer);
    }, [value, speed]);
    return <motion.span>{count.toLocaleString()}+</motion.span>;
  };

  function formatDate(dateString) {
    if (!dateString) return "Invalid Date";
    const months = [
      "January", "February", "March", "April", "May", "June",
      "July", "August", "September", "October", "November", "December"
    ];
    const parts = dateString.split("-");
    if (parts.length !== 3) return "Invalid Date";
    const [year, month, day] = parts;
    return `${parseInt(day)} ${months[parseInt(month) - 1]} ${year}`;
  }

  const getnotice = async () => {
    try {
      setNoticeLoading(true);
      const url = "https://mdl-coaching.onrender.com/notice/notice";
      const response = await axios.get(url);
      setnotice(response.data.data);
    } catch (error) {
      console.log("Notice fetch error ::", error);
    } finally {
      setNoticeLoading(false);
    }
  };

  const statData = [
    {
      id: 1,
      title: "Total Classes",
      value: totalclass,
      icon: <FaChalkboardTeacher className="text-4xl text-white" />,
      bg: "bg-blue-500",
    },
    {
      id: 2,
      title: "Total Teachers",
      value: totalteacher,
      icon: <FaUserGraduate className="text-4xl text-white" />,
      bg: "bg-green-500",
    },
    {
      id: 3,
      title: "Total Students",
      value: totalstudents,
      icon: <FaUsers className="text-4xl text-white" />,
      bg: "bg-purple-500",
      speed: 5000,
    },
  ];

  const Spinner = () => (
    <motion.div
      className="w-12 h-12 border-4 border-yellow-400 border-t-transparent rounded-full mx-auto my-10"
      animate={{ rotate: 360 }}
      transition={{
        repeat: Infinity,
        ease: "easeInOut",
        duration: 1.2,
      }}
    />
  );

  return (
    <>
      <div className="flex flex-col bg-[#454649] min-h-screen">
        <Header />
        <div className="flex flex-1 p-4 sm:p-6 md:p-10 bg-[#454649] min-h-screen">
          <div className="w-full bg-transparent p-6 mt-10">
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
              {statData.map((item) => (
                <div
                  key={item.id}
                  className={`${item.bg} p-6 rounded-lg shadow-md text-center text-white`}
                >
                  <div className="flex justify-center mb-3">{item.icon}</div>
                  <h2 className="text-xl font-semibold">{item.title}</h2>
                  <motion.p
                    className="text-2xl font-bold mt-2"
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 1.2 }}
                  >
                    <AnimatedCounter value={item.value} speed={item.speed} />
                  </motion.p>
                </div>
              ))}
            </div>

            <div>
              <h1 className="text-xl font-bold text-white mb-4">Notice</h1>
              <div className="px-4 py-3 text-left text-yellow-500">
                <div className="relative w-64 sm:w-auto mb-4">
                  <FiSearch
                    className="absolute left-3 top-1/2 transform -translate-y-1/2 text-yellow-400"
                    size={18}
                  />
                  <input
                    type="text"
                    placeholder="Search Notice Title"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="w-64 pl-10 p-2 border border-gray-300 rounded-md text-yellow-400 bg-transparent focus:outline-none focus:ring-2 focus:ring-yellow-600"
                  />
                </div>
              </div>
              <div className="overflow-x-auto">
                {noticeLoading ? (
                  <Spinner />
                ) : filteredNotices && filteredNotices.length > 0 ? (
                  <table className="w-full bg-[#454649] border border-gray-300 rounded-lg shadow-md">
                    <thead className="bg-gray-200">
                      <tr className="bg-[#252629] text-white">
                        <th className="px-4 py-3 text-left text-yellow-500">Title</th>
                        <th className="px-4 py-3 text-left text-yellow-500">Date</th>
                        <th className="px-4 py-3 text-left text-yellow-500">Role</th>
                        <th className="px-4 py-3 text-left text-yellow-500">Actions</th>
                      </tr>
                    </thead>
                    <tbody>
                      {filteredNotices.map((data, index) => (
                        <tr
                          key={index}
                          className="even:bg-[#454649] odd:bg-[#454649] text-white"
                        >
                          <td className="px-4 py-3 text-white">{data.title}</td>
                          <td className="px-4 py-3 text-white">{formatDate(data.date)}</td>
                          <td className="px-4 py-3 text-white">{data.role}</td>
                          <td className="px-4 py-3 flex gap-2">
                            <Link to={`/adminhome/viewnotes/${data._id}`}>
                              <button className="flex items-center gap-2 bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600 transition duration-300 shadow-md">
                                <AiOutlineEye className="text-lg" />
                                <span>View</span>
                              </button>
                            </Link>
                            <Link to={`/adminhome/updatenotice/${data._id}`}>
                              <button className="flex items-center gap-2 bg-green-500 text-white px-4 py-2 rounded-lg hover:bg-green-600 transition duration-300 shadow-md">
                                <AiOutlineEdit className="text-lg" /> Edit
                              </button>
                            </Link>
                            <button
                              onClick={() => delet(data._id)}
                              className="flex items-center gap-2 bg-red-600 text-white px-4 py-2 rounded-lg hover:bg-red-700 transition duration-300 shadow-md"
                            >
                              <AiOutlineDelete className="text-lg" /> Delete
                            </button>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                ) : (
                  <div className="text-center text-white py-6 text-lg">
                    No notices found
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
        <Footer />
      </div>
    </>
  );
}

export default AdminHome;
