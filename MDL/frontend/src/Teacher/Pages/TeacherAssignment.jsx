import { useState, useEffect } from "react";
import { toast } from "react-toastify";
import Swal from "sweetalert2";
import axios from "axios";
import Footer from "../Footer";
import Header from "../Header";

const TeacherAssignment = () => {
  const [formData, setFormData] = useState({
    classname: "",
    s_classId: "",
    subject: "",
    subject_Id: "",
    notesfille: null,
  });

  const [loading, setLoading] = useState(true); // For initial data load
  const [submitting, setSubmitting] = useState(false); // For form submission

  function resetForm() {
    setFormData({
      classname: "",
      s_classId: "",
      subject: "",
      subject_Id: "",
      notesfille: null,
    });

    document.getElementById("notesForm").reset();
  }

  const [classes, setClasses] = useState([]);
  const [subjects, setSubjects] = useState([]);

  const getclasses = async () => {
    try {
      const res = await axios.get("https://mdl-coaching.onrender.com/class/getclasses");
      setClasses(res.data.data);
    } catch (error) {
      console.log(error);
    }
  };

  const getsubject = async () => {
    try {
      const res = await axios.get("https://mdl-coaching.onrender.com/subject/getsubjects");
      setSubjects(res.data.data);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      await Promise.all([getclasses(), getsubject()]);
      setLoading(false);
    };
    fetchData();
  }, []);

  const handleSubmit = async () => {
    const formDataToSend = new FormData();

    if (formData.classname === "") {
      toast.error("Please select a class", { position: "top-center", autoClose: 2000 });
      return;
    }
    if (formData.subject === "") {
      toast.error("Please select a subject", { position: "top-center", autoClose: 2000 });
      return;
    }

    formDataToSend.append("classname", formData.classname);
    formDataToSend.append("s_classId", formData.s_classId);
    formDataToSend.append("subject", formData.subject);
    formDataToSend.append("subject_Id", formData.subject_Id);
    formDataToSend.append("notesfille", formData.notesfille);

    try {
      setSubmitting(true);
      const url = "https://mdl-coaching.onrender.com/notes";
      const response = await axios.post(url, formDataToSend, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });

      const { message, success, error } = response.data;

      if (success) {
        toast.success(message, { position: "top-center", autoClose: 2000 });
        resetForm();
      } else {
        toast.error(error || message, { position: "top-center", autoClose: 2000 });
      }
    } catch (error) {
      console.error(error);
      toast.error("Failed to upload file", { position: "top-center", autoClose: 2000 });
    } finally {
      setSubmitting(false);
    }
  };

  const confirmUpload = (e) => {
    e.preventDefault();
    Swal.fire({
      title: "Are you sure?",
      text: "Do you want to upload these notes?",
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: "Upload Notes",
      cancelButtonText: "Cancel",
    }).then((result) => {
      if (result.isConfirmed) {
        handleSubmit();
        Swal.fire("Uploaded!", "Your notes have been uploaded.", "success");
      }
    });
  };

  const handleFileChange = (e) => {
    setFormData({ ...formData, notesfille: e.target.files[0] });
  };

  const handleClassChange = (event) => {
    const selectedValue = JSON.parse(event.target.value);
    setFormData({
      ...formData,
      classname: selectedValue.name,
      s_classId: selectedValue.id,
    });
  };

  const handlesubjectChange = (event) => {
    const selectedValue = JSON.parse(event.target.value);
    setFormData({
      ...formData,
      subject: selectedValue.name,
      subject_Id: selectedValue.id,
    });
  };

  return (
    <div className="flex flex-col">
      <Header />
      <div className="flex flex-1">
        <div className="flex-1 h-screen bg-gradient-to-r from-indigo-400 via-green-400 to-pink-400 p-10 overflow-auto">
          <div className="flex items-center justify-center mt-20">
            {loading ? (
              // <div className="text-white text-xl font-bold animate-pulse">Loading...</div>
              <div className="flex items-center justify-center mt-20">
                <div className="flex flex-col items-center space-y-4">
                  <div className="w-16 h-16 border-4 border-white border-t-transparent rounded-full animate-spin"></div>
                  <p className="text-white text-lg font-semibold animate-pulse">Loading, please wait...</p>
                </div>
              </div>
            ) : (
              <form
                id="notesForm"
                className="bg-white/30 backdrop-blur-lg shadow-2xl rounded-2xl p-8 max-w-md w-full space-y-5 transition-transform duration-300 hover:scale-105 border border-white/30"
                onSubmit={confirmUpload}
              >
                <h2 className="text-3xl font-bold text-center text-black drop-shadow-md">
                  📜 Upload Assignment
                </h2>

                {/* Class Selection */}
                <label htmlFor="class" className="block font-medium text-black text-lg">
                  Class :
                </label>
                <select
                  name="classname"
                  onChange={handleClassChange}
                  className="w-full p-3 border border-white/30 rounded-lg bg-white/30 backdrop-blur-md focus:ring-2 focus:ring-purple-400 focus:outline-none transition-all duration-200 text-gray-900"
                  required
                >
                  <option value="">-- Select Class --</option>
                  {classes.map((cls, index) => (
                    <option
                      value={JSON.stringify({
                        id: cls._id,
                        name: cls.classname,
                      })}
                      key={index}
                    >
                      {cls.classname}
                    </option>
                  ))}
                </select>

                {/* Subject Selection */}
                <label htmlFor="sub" className="block font-medium text-black text-lg">
                  Subject :
                </label>

                <select
                  name="subject"
                  onChange={handlesubjectChange}
                  className="w-full p-3 border border-white/30 rounded-lg bg-white/30 backdrop-blur-md focus:ring-2 focus:ring-purple-400 focus:outline-none transition-all duration-200 text-gray-900"
                  required
                >
                  <option value="">-- Select Subject --</option>
                  {subjects.map((sub, index) => (
                    <option
                      value={JSON.stringify({
                        id: sub._id,
                        name: sub.subjectName,
                      })}
                      key={index}
                    >
                      {sub.subjectName}
                    </option>
                  ))}
                </select>

                {/* File Input */}
                <label htmlFor="notes" className="block font-medium text-black text-lg">
                  Notes :
                </label>
                <input
                  type="file"
                  name="notesfille"
                  id="notes"
                  accept="image/*"
                  onChange={handleFileChange}
                  className="w-full p-3 border border-white/30 rounded-lg bg-white/30 backdrop-blur-md file:bg-blue-600 file:text-white file:rounded-md file:px-4 file:py-2 file:border-none file:cursor-pointer hover:file:bg-blue-700 transition-all duration-200 text-gray-900"
                  required
                />

                {/* Buttons */}
                <div className="flex space-x-4">
                  <button
                    type="submit"
                    disabled={submitting}
                    className="w-full bg-gradient-to-r from-blue-500 to-purple-500 text-white font-bold py-3 px-4 rounded-lg shadow-lg hover:shadow-xl hover:scale-110 transition-transform duration-300 flex items-center justify-center space-x-2 disabled:opacity-60"
                  >
                    {submitting ? (
                      <span className="animate-spin mr-2">🔄</span>
                    ) : (
                      <span>🚀</span>
                    )}
                    <span>{submitting ? "Uploading..." : "Upload"}</span>
                  </button>

                  <button
                    type="button"
                    onClick={resetForm}
                    className="w-full bg-gray-500 text-white font-bold py-3 px-4 rounded-lg shadow-lg hover:shadow-xl hover:scale-110 transition-transform duration-300"
                  >
                    🔄 Reset
                  </button>
                </div>
              </form>
            )}
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default TeacherAssignment;
