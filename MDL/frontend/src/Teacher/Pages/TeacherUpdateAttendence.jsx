import React, { useEffect, useState } from "react";
import Header from "../Header";
import Footer from "../Footer";
import axios from "axios";
import Swal from "sweetalert2";

const TeacherUpdateAttendance = () => {
  const [formData, setFormData] = useState({
    selectedClass: "",
    selectedSubject: "",
    selectedDate: new Date().toISOString().split("T")[0],
    students: [],
  });

  const [classes, setClasses] = useState([]);
  const [subjects, setSubjects] = useState([]);
  const [showPopup, setShowPopup] = useState(false);
  const [attendanceId, setAttendanceId] = useState(null); // Store attendance record ID

  useEffect(() => {
    getClasses();
    getSubjects();
  }, []);

  useEffect(() => {
    if (formData.selectedClass && formData.selectedSubject && formData.selectedDate) {
      getAttendanceRecords();
    }
  }, [formData.selectedClass, formData.selectedSubject, formData.selectedDate]);

  // Fetch all classes from backend
  const getClasses = async () => {
    try {
      const res = await axios.get("https://mdl-coaching.onrender.com/class/getclasses");
      setClasses(res.data.data);
    } catch (error) {
      console.error("Error fetching classes:", error);
    }
  };

  // Fetch all subjects from backend
  const getSubjects = async () => {
    try {
      const res = await axios.get("https://mdl-coaching.onrender.com/subject/getsubjects");
      setSubjects(res.data.data);
    } catch (error) {
      console.error("Error fetching subjects:", error);
    }
  };

  const getAttendanceRecords = async () => {
    try {
      if (!formData.selectedClass || !formData.selectedSubject || !formData.selectedDate) {
        console.warn("Class, Subject, or Date not selected.");
        return;
      }

      const res = await axios.get(
        `https://mdl-coaching.onrender.com/attendance/getattendance/${formData.selectedClass}/${formData.selectedSubject}/${formData.selectedDate}`
      );

      if (res.data && res.data.data) {
        const attendanceData = res.data.data;
        setAttendanceId(attendanceData._id.$oid || attendanceData._id);

        const studentsArray = attendanceData.records.map((record) => ({
          id: record.studentId.$oid || record.studentId,
          status: record.status,
        }));

        setFormData((prev) => ({
          ...prev,
          selectedClass: attendanceData.classname,
          selectedSubject: attendanceData.subject,
          students: studentsArray,
        }));

        console.log("Updated Students Data:", studentsArray);
      } else {
        console.warn("No attendance data found.");
      }
    } catch (error) {
      console.error("Error fetching attendance:", error);
    }
  };

  useEffect(() => {
    console.log(formData);
  }, [formData]);
  // Handle input change
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  // Toggle attendance status
  const toggleAbsent = (id) => {
    setFormData((prev) => ({
      ...prev,
      students: prev.students.map((student) =>
        student.id._id === id
          ? {
              ...student,
              status: student.status === "Present" ? "Absent" : "Present",
            }
          : student
      ),
    }));
  };

  // Update Attendance in Backend
  const handleUpdate = async () => {
    try {
      const attendanceData = formData.students.map((student) => ({
        studentId: student.id._id,
        status: student.status,
      }));

      const res = await axios.put(
        "https://mdl-coaching.onrender.com/attendance/updateattendance",
        {
          _id: attendanceId,
          classname: formData.selectedClass,
          subject: formData.selectedSubject,
          date: formData.selectedDate,
          records: attendanceData,
        }
      );

      if (res.data.success) {
        Swal.fire("Success", "Attendance Updated Successfully", "success");
        setShowPopup(true);
        setTimeout(() => setShowPopup(false), 3000);
      }
    } catch (error) {
      console.error("Error updating attendance:", error);
      Swal.fire("Error", "Failed to update attendance", "error");
    }
  };

  return (
    <div className="flex flex-col min-h-screen">
      <Header />

      <div className="flex flex-1 flex-col items-center bg-gradient-to-r from-yellow-300 via-orange-300 to-red-300 p-5 overflow-auto">
        <div className="bg-white p-5 rounded-lg shadow-lg w-full max-w-3xl">
          <h2 className="text-2xl font-bold mb-5 text-center">
            Update Attendance
          </h2>

          <div className="flex flex-wrap gap-4 justify-center">
            <select
              name="selectedClass"
              className="p-2 border rounded-lg w-full md:w-auto"
              value={formData.selectedClass}
              onChange={handleChange}
            >
              <option value="">Select Class</option>
              {classes.map((cls, index) => (
                <option key={index} value={cls.classname}>
                  {cls.classname}
                </option>
              ))}
            </select>

            <select
              name="selectedSubject"
              className="p-2 border rounded-lg w-full md:w-auto"
              value={formData.selectedSubject}
              onChange={handleChange}
            >
              <option value="">Select Subject</option>
              {subjects.map((subj, index) => (
                <option key={index} value={subj.subjectName}>
                  {subj.subjectName}
                </option>
              ))}
            </select>

            <input
              type="date"
              name="selectedDate"
              className="p-2 border rounded-lg w-full md:w-auto"
              value={formData.selectedDate}
              onChange={handleChange}
            />
          </div>
        </div>

        <div className="mt-5 bg-white p-5 rounded-lg shadow-lg w-full max-w-3xl overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr>
                <th className="border p-2">Student Name</th>
                <th className="border p-2">Status</th>
              </tr>
            </thead>
            <tbody>
              {formData.students && formData.students.map((student, index) => (
                <tr key={index} className="border">
                  <td className="p-2">
                    {`${student.id.fname} ${student.id.mname} ${student.id.lname}`}
                  </td>
                  <td className="p-2 text-center">
                    <button
                      className={`px-4 py-2 rounded-lg ${
                        student.status === "Present"
                          ? "bg-green-500"
                          : "bg-red-500"
                      } text-white`}
                      onClick={() => toggleAbsent(student.id._id)}
                    >
                      {student.status}
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
          <button
            className="mt-5 bg-blue-600 text-white px-5 py-2 rounded-lg hover:bg-blue-700 w-full"
            onClick={handleUpdate}
          >
            Update Attendance
          </button>
        </div>
      </div>

      {showPopup && (
        <div className="fixed top-5 right-5 bg-green-500 text-white p-3 rounded-lg shadow-lg">
          Attendance Updated Successfully!
        </div>
      )}

      <Footer />
    </div>
  );
};

export default TeacherUpdateAttendance;
