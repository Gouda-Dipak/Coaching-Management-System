
import React, { useState, useRef, useEffect } from "react";
import Header from "../Home/Header";
import Footer from "../Home/Footer";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export const AddSubjects = () => {
  const [subjectEntries, setSubjectEntries] = useState([
    { subjectName: "", subjectCode: "" },
  ]);
  const navigate = useNavigate();
  const lastInputRef = useRef(null);

  useEffect(() => {
    console.log(subjectEntries);
  }, [subjectEntries]);

  const handleAddSubject = () => {
    setSubjectEntries((prevEntries) => [
      ...prevEntries,
      { subjectName: "", subjectCode: "" },
    ]);
    setTimeout(() => {
      if (lastInputRef.current) {
        lastInputRef.current.focus();
      }
    }, 100);
  };

  const handleChange = (index, field, value) => {
    if (field === "subjectCode" && !/^[0-9]+$/.test(value)) {
      toast.error("Subject Code must contain only numbers", {
        position: "top-center",
        autoClose: 2000,
      });
      return;
    }
    if (field === "subjectName" && !/^[A-Za-z ]+$/.test(value)) {
      toast.error("Subject Name must contain only letters", {
        position: "top-center",
        autoClose: 2000,
      });
      return;
    }
    setSubjectEntries((prevEntries) =>
      prevEntries.map((entry, i) =>
        i === index ? { ...entry, [field]: value } : entry
      )
    );
  };

  const handleRemoveSubject = (index) => {
    setSubjectEntries((prevEntries) =>
      prevEntries.filter((_, i) => i !== index)
    );
  };

  const handleSave = async (e) => {
    e.preventDefault();
    
    for (let entry of subjectEntries) {
      if (!/^[0-9]+$/.test(entry.subjectCode)) {
        toast.error("Each Subject Code must contain only numbers", {
          position: "top-center",
          autoClose: 2000,
        });
        return;
      }
      if (!/^[A-Za-z ]+$/.test(entry.subjectName)) {
        toast.error("Each Subject Name must contain only letters", {
          position: "top-center",
          autoClose: 2000,
        });
        return;
      }
    }
    
    try {
      const url = "https://mdl-coaching.onrender.com/subject/addsubject";
      const response = await axios.post(url, subjectEntries, {
        headers: {
          "Content-Type": "application/json",
        },
      });

      console.log("this is the response data::: " + response.data);
      const { message, success, error } = await response.data;

      if (success) {
        toast.success(message, {
          position: "top-center",
          autoClose: 2000,
        });
        setTimeout(() => {
          navigate("/addsubjects/showsubjects");
        }, 1000);
      } else if (error) {
        console.log(error);
        const details = error?.details[0]?.message || "An error occurred";
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
      toast.error("Failed to save subjects", {
        position: "top-center",
        autoClose: 2000,
      });
    }
  };

  return (
    <div className="flex flex-col min-h-screen bg-[#454649]">
      <Header />
      <div className="flex flex-1 justify-center bg-[#454649] p-6 m-12 sm:p-10 md:p-24 min-h-screen">
        <div className="w-full max-w-2xl mx-auto bg-white p-8 rounded-lg shadow-xl border border-gray-200">
        {/* <div className="p-4 sm:p-6 md:p-8 rounded-lg shadow-lg max-w-4xl mx-auto w-full bg-white"> */}
          <h2 className="text-3xl font-bold mb-6 text-center text-indigo-700">
            Manage Subjects
          </h2>
          <Link to={"/addsubjects/showsubjects"}>
            <button className="w-full bg-blue-600 text-white py-3 rounded-lg font-semibold text-lg hover:bg-blue-700 transition mt-4">
              Show Subjects
            </button>
          </Link>
          <br />
          <br />
          {subjectEntries.map((entry, index) => (
            <div
              key={index}
              className="space-y-4 mb-6 border p-6 rounded-lg bg-gray-50 shadow-md relative"
            >
              <button
                onClick={() => handleRemoveSubject(index)}
                className="absolute top-2 right-2 bg-red-600 text-white px-3 py-1 rounded-full hover:bg-red-700"
                aria-label="Remove Subject"
              >
                ✕
              </button>
              
              <div>
                <label className="block text-gray-600 font-medium">
                  Subject Code
                </label>
                <input
                  type="text"
                  className="w-full p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-400"
                  value={entry.subjectCode}
                  onChange={(e) => handleChange(index, "subjectCode", e.target.value)}
                  required
                />
              </div>
              <div>
                <label className="block text-gray-600 font-medium">
                  Subject Name
                </label>
                <input
                  type="text"
                  className="w-full p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-400"
                  value={entry.subjectName}
                  onChange={(e) => handleChange(index, "subjectName", e.target.value)}
                  required
                  ref={index === subjectEntries.length - 1 ? lastInputRef : null}
                />
              </div>
            </div>
          ))}
          <button
            onClick={handleAddSubject}
            className="w-full bg-indigo-600 text-white py-3 rounded-lg font-semibold text-lg hover:bg-indigo-700 transition"
            aria-label="Add Subject"
          >
            + Add Subject
          </button>
        </div>
      </div>
      <div className="fixed bottom-64 right-8 translate-x-1/2">
        <button
          onClick={handleSave}
          className="bg-green-600 text-white py-3 px-8 rounded-lg text-lg shadow-lg hover:bg-green-700 transition"
          aria-label="Save Subjects"
        >
          Save
        </button>
      </div>
      <Footer />
      <ToastContainer />
    </div>
  );
};

export default AddSubjects;
