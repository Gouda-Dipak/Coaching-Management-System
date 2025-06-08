import React, { useState } from "react";
import Header from "../Home/Header";
import Footer from "../Home/Footer";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import Swal from "sweetalert2";
import axios from "axios";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";

export const AddNotice = () => {
  const navigate = useNavigate();
  const [fordata, setforData] = useState({
    title: "",
    date: "",
    description: "",
    name: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setforData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleQuillChange = (content) => {
    console.log(content);
    console.log(content);
    setforData((prev) => ({
      ...prev,
      description: content,
    }));
  };

  function stripHtmlTags(html) {
    if (!html) return ""; // Handle empty input

    return html.replace(/<\/?[^>]+(>|$)/g, ""); // Removes all HTML tags
  }
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
        formdata.append("title", fordata.title);
        formdata.append("date", fordata.date);
        formdata.append("description", stripHtmlTags(fordata.description));
        formdata.append("name", fordata.name);
        formdata.append("role", result.value);
        try {
          const url = "https://mdl-coaching.onrender.com/notice/addnotice";

          const response = await axios.post(url, formdata, {
            headers: { "Content-Type": "application/json" },
          });

          console.log("this is the response data::: " + response.data);
          const { message, success, error } = await response.data;

          if (success) {
            toast.success(message, {
              position: "top-center",
              autoClose: 2000,
            });
              setTimeout(() => {
                navigate("/adminhome");
              }, 1000);
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
        Swal.fire({
          title: "Notice Added!",
          text: `Your notice has been successfully added for ${result.value}.`,
          icon: "success",
          confirmButtonText: "OK",
        });
      }
    });
    console.log(fordata);
  };

  return (
    <div className="flex flex-col min-h-screen bg-[#454649]">
      <Header />

      <div className="flex flex-1 p-4 sm:p-10 md:p-16 lg:p-20 w-full bg-[#454649] mt-4 min-h-screen">
        <div className="w-full max-w-4xl mx-auto bg-white p-12 rounded-lg shadow-lg border border-gray-200">
          <div className="mb-6 flex flex-col items-center">
            <input
              type="text"
              className="text-3xl font-bold text-indigo-700 border-gray-300 outline-none w-full text-center"
              placeholder="Enter Title"
              name="title"
              value={fordata.title}
              onChange={handleChange}
            />
          </div>

          <div className="w-full flex justify-end">
            <input
              type="date"
              className="text-gray-600 border-b border-gray-300 outline-none"
              name="date"
              value={fordata.date}
              onChange={handleChange}
            />
          </div>
          <br />

          <ReactQuill
            className="bg-white"
            theme="snow"
            value={fordata.description}
            onChange={handleQuillChange}
            name="description"
            placeholder="Write the notice content here..."
          />

          <div className="mt-8 border-t pt-4 text-right">
            <input
              type="text"
              className="text-lg font-semibold text-gray-800 border-b border-gray-300 outline-none"
              placeholder="Principal's Name"
              name="name"
              value={fordata.name}
              onChange={handleChange}
            />
          </div>

          <div className="mt-6 text-center">
            <button
              type="button"
              className="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 focus:outline-none"
              onClick={handleSubmit}
            >
              Add Notice
            </button>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default AddNotice;