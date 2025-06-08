import React, { useEffect, useState } from "react";
import Footer from "../Footer";
import Header from "../Header";
import Swal from "sweetalert2";
import {
  FaEnvelope,
  FaIdBadge,
  FaPhone,
  FaCalendarAlt,
  FaMapMarkerAlt,
  FaEye,
  FaCamera,
  FaGraduationCap,
  FaBook,
  FaClipboardList,
  FaUser,
  FaIdCard,
} from "react-icons/fa";
import { useParams } from "react-router-dom";
import axios from "axios";

const TeacherProfile = () => {
  const [profileImage, setProfileImage] = useState(
    `https://mdl-coaching.onrender.com/images/${localStorage.getItem("photo")}` ||
      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcS1DIpd1kz9a3U1oAhsaqV9SSWCEuBl67kTfw&s"
  );
  const [showIcons, setShowIcons] = useState(false);
  const [teacher, setTeacher] = useState([]);
  const teacherId = localStorage.getItem("t_id");

  useEffect(() => {
    const fetchTeacher = async () => {
      const response = await axios.get(
        `https://mdl-coaching.onrender.com/teacher/findByid/${teacherId}`
      );
      console.log(response.data.data);
      setTeacher(response.data.data);
    };
    fetchTeacher();
  }, [teacherId]);

  if (!teacher) {
    return <div>Loading...</div>;
  }

  const handleImageUpload = (event) => {
    const file = event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = () => {
        const imageUrl = reader.result;
        setProfileImage(imageUrl);
        localStorage.setItem("profileImage", imageUrl);
        Swal.fire({
          title: "Profile Updated!",
          icon: "success",
          text: "Your profile image has been changed successfully.",
        });
      };
      reader.readAsDataURL(file);
    }
  };

  const viewImage = () => {
    Swal.fire({
      title: "Profile Picture",
      imageUrl: profileImage,
      imageAlt: "Profile Image",
      showCloseButton: true,
    });
  };

  return (
    <div className="flex flex-col min-h-screen">
      <Header profileImage={profileImage} />

      <div className="flex flex-1 mt-32 items-center justify-center p-4">
        <div className="bg-white p-6 rounded-2xl shadow-xl w-full h-full mb-36 max-w-4xl text-center relative">
          <div
            className="w-32 h-32 mx-auto -mt-20 rounded-full overflow-hidden shadow-lg border-4 border-white relative group"
            onMouseEnter={() => setShowIcons(true)}
            onMouseLeave={() => setShowIcons(false)}
          >
            <img
              src={profileImage}
              alt="Profile"
              className="w-full h-full object-cover"
            />
            {showIcons && (
              <div className="absolute inset-0 bg-black bg-opacity-50 flex justify-center items-center gap-3 transition-opacity duration-300">
                <button
                  className="bg-white p-2 rounded-full hover:bg-gray-200 transition"
                  onClick={viewImage}
                >
                  <FaEye className="text-gray-800" size={20} />
                </button>
                <label className="bg-white p-2 rounded-full hover:bg-gray-200 transition cursor-pointer">
                  <FaCamera className="text-gray-800" size={20} />
                  <input
                    type="file"
                    accept="image/*"
                    onChange={handleImageUpload}
                    className="hidden"
                  />
                </label>
              </div>
            )}
          </div>

          <div className="mt-4">
            <h2 className="text-2xl font-semibold text-gray-800">
              {localStorage.getItem("name")}
            </h2>
            <p className="text-gray-500 text-sm">Senior Science Teacher</p>
          </div>

          <div className="mt-4 grid grid-cols-1 sm:grid-cols-2 gap-x-6 gap-y-4 text-gray-700 text-left px-6">
            <p className="flex items-center gap-2">
              <FaIdBadge className="text-purple-500" />{" "}
              <strong>Teacher ID:</strong> {teacher.t_id}
            </p>
            <p className="flex items-center gap-2">
              <FaUser className="text-pink-500" /> <strong>Gender:</strong> {teacher.gender}
            </p>
            <p className="flex items-center gap-2">
              <FaUser className="text-purple-500" />{" "}
              <strong>Marital Status:</strong> {teacher.status}
            </p>
            <p className="flex items-center gap-2">
              <FaIdCard className="text-teal-500" />{" "}
              <strong>Aadhar Number:</strong> {teacher.adharnumber}
            </p>
            <p className="flex items-center gap-2">
              <FaCalendarAlt className="text-green-500" /> <strong>DOB:</strong>{" "}
              {teacher.dob}
            </p>
            <p className="flex items-center gap-2">
              <FaEnvelope className="text-blue-500" /> <strong>Email:</strong>{" "}
              {teacher.email}
            </p>
            <p className="flex items-center gap-2">
              <FaPhone className="text-orange-500" /> <strong>Mobile:</strong>{" "}
              {teacher.mobilenumber}
            </p>
            <p className="flex items-center gap-2">
              <FaMapMarkerAlt className="text-red-500" />{" "}
              <strong>Address:</strong> {teacher.address}
            </p>
            <p className="flex items-center gap-2">
              <FaGraduationCap className="text-indigo-500" />{" "}
              <strong>Qualification:</strong> {teacher.qualification}
            </p>
            <p className="flex items-center gap-2">
              <FaClipboardList className="text-blue-500" />{" "}
              <strong>Course:</strong> {teacher.course}
            </p>
            <p className="flex items-center gap-2">
              <FaBook className="text-green-500" /> <strong>Subject:</strong>{" "}
              {teacher.subject}
            </p>
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
};

export default TeacherProfile;
