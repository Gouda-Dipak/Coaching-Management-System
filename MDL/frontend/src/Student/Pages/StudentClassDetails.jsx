import React, { useEffect, useState } from "react";
import Header from "../Header";
import Footer from "../Footer";
import axios from "axios";

const StudentClassDetails = () => {
  const [classDetails, setClassDetails] = useState([]);
  const [student, setStudent] = useState(null); // change from array to single object

  useEffect(() => {
    fetchClassDetails();
    fetchStudentProfile();
  }, []);

  // Fetch class details
  const fetchClassDetails = async () => {
    try {
      const response = await axios.get(
        `https://mdl-coaching.onrender.com/teacherclass/getteachercls/${localStorage.getItem(
          "studentclass"
        )}`
      );
      setClassDetails(response.data.data);
    } catch (error) {
      console.error("Error fetching class details:", error);
    }
  };

  // Fetch student profile
  const fetchStudentProfile = async () => {
    try {
      const studentId = localStorage.getItem("studentid");
      const res = await axios.get(`https://mdl-coaching.onrender.com/student/getstudentdetails/${studentId}`);
      console.log("Student details response:", res.data);
      setStudent(res.data.data); // assuming res.data.data is an object
    } catch (error) {
      console.log("Error fetching student profile:", error);
    }
  };

  return (
    <div className="flex flex-col min-h-screen bg-gray-50">
      <Header />

      <div className="flex flex-1 justify-center items-center px-4 py-10">
        <div className="w-full max-w-3xl bg-white shadow-xl rounded-2xl p-6 sm:p-8">
          <h2 className="text-2xl font-bold text-center mb-6 text-blue-600">Class Details</h2>

          {/* Class Information */}
          {student && (
            <div className="mb-8">
              <h3 className="text-lg font-semibold mb-3 text-gray-700">Class Information</h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 bg-gray-100 p-4 rounded-xl mb-4">
                <div className="font-medium">Class:</div>
                <div>{student.s_class}</div>
              </div>
            </div>
          )}

          {/* Subjects & Teachers */}
          <div>
            <h3 className="text-lg font-semibold mb-3 text-gray-700">Teachers & Subjects</h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 bg-gray-100 p-4 rounded-xl">
              {classDetails.map((cls, index) => (
                <React.Fragment key={index}>
                  <div className="font-medium">
                    {cls.TeacherId.s_name + " " + cls.TeacherId.name + " " + cls.TeacherId.lname}:
                  </div>
                  <div>{cls.SubjectName}</div>
                </React.Fragment>
              ))}
            </div>
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
};

export default StudentClassDetails;
