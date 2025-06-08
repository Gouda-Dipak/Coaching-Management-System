import React, { useEffect } from "react";
import { BrowserRouter, Routes, Route, Outlet } from "react-router-dom";
import { useNavigate } from "react-router-dom"; // Add this import


import Home from "../src/Home";

// Teacher

import TeacherAssignment from "./Teacher/Pages/TeacherAssignment";
import TeacherAttendance from "./Teacher/Pages/TeacherAttendance";
import TeacherSalary from "./Teacher/Pages/TeacherSalary";
import TeacherProfile from "./Teacher/Pages/TeacherProfile";
import TeacherDashboard from "./Teacher/Pages/TeacherDashboard";
import TeacherClass from "./Teacher/Pages/TeacherClass";
import TeacherNotes from "./Teacher/Pages/TeacherNotes";
import TeacherNotice from "./Teacher/Pages/TeacherNotice";
import TeacherLogin from "./Teacher/TeacherLogin";
// import TeacherRegistration from "./Teacher/TeacherRegistration";
import TeacherTimeSchedule from "./Teacher/Pages/TeacherTimeSchedule";

// Student

import { StudentPayment } from "./Student/Pages/StudentPayment";
// import StudentRegistration from "./Student/StudentRegistration";
import StudentLogin from "./Student/StudentLogin";
import { StudentMenu } from "./Student/StudentMenu";
import StudentDashboard from "./Student/Pages/StudentDashboard";
import StudentGeneralRegister from "./Student/Pages/StudentGeneralRegister";
import StudentClassDetails from "./Student/Pages/StudentClassDetails";
import StudentTimetable from "./Student/Pages/StudentTimetable";
import StudentFees from "./Student/Pages/StudentFees";
import { StudentAttendance } from "./Student/Pages/StudentAttendance";
import StudentHoliday from "./Student/Pages/StudentHoliday";
import StudentLearningMaterial from "./Student/Pages/StudentLearningMaterial";
import StudentResult from "./Student/Pages/StudentResult";
import StudentPracticeTest from "./Student/Pages/StudentPracticeTest";
import StudentFeedback from "./Student/Pages/StudentFeedback";
import StudentDigitalICard from "./Student/Pages/StudentDigitalICard";
import StudentProfile from "./Student/Pages/StudentProfile";

// Admin

import AdminLogin from "./Admin/Pages/Admin/Home/AdminLogin";
import AdminRegistration from "./Admin/Pages/Admin/Home/AdminRegistration";
import AdminHome from "./Admin/Pages/Admin/Home/AdminHome";
import AddClasses from "./Admin/Pages/Admin/Classes/AddClasses";
import Classes from "./Admin/Pages/Admin/Classes/Classes";
import ShowClasses from "./Admin/Pages/Admin/Classes/ShowClasses";
import AddStudents from "./Admin/Pages/Admin/Student/AddStudents";
import StudentForm from "./Admin/Pages/Admin/Student/StudentForm";
import ShowStudentDetails from "./Admin/Pages/Admin/Student/ShowStudentDetails";
import StudentDetails from "./Admin/Pages/Admin/Student/StudentDetails";
import FeeDetails from "./Admin/Pages/Admin/Student/FeeDetails";
import UpdateStudentDetails from "./Admin/Pages/Admin/Student/UpdateStudentDetails";
import DisplayStudentDetails from "./Admin/Pages/Admin/Student/DisplayStudentDetails";
import ShowClassTeacher from "./Admin/Pages/Admin/Teacher/ShowClassTeacher";
import ShowAllTeachersList from "./Admin/Pages/Admin/Teacher/ShowAllTeachersList";
import UpdateTeacherDetails from "./Admin/Pages/Admin/Teacher/UpdateTeacherDetails";
import ShowProfile from "./Admin/Pages/Admin/Teacher/ShowProfile";
import SalaryDetails from "./Admin/Pages/Admin/Teacher/SalaryDetails";
import AddTeacher from "./Admin/Pages/Admin/Teacher/AddTeacher";
import ShowTeachersList from "./Admin/Pages/Admin/Teacher/ShowTeachersList";
import ViewNotes from "./Admin/Pages/Admin/Notes/ViewNotes";
import UpdateNotice from "./Admin/Pages/Admin/Notes/UpdateNotice";
import AddNotice from "./Admin/Pages/Admin/Notes/AddNotice";
import AddSubjects from "./Admin/Pages/Admin/Subjects/AddSubjects";
import Feedback from "./Admin/Pages/Admin/Feedback/Feedback";
import LogOut from "./Admin/Pages/Admin/AdminLogOut/LogOut";
import Profile from "./Admin/Pages/Admin/AdminProfile/Profile";
import RoleSelection from "./RoleSelection";
import { Timetable } from "./Admin/Pages/Admin/Timetables/Timetable";
// import { AddAdmin } from "./Admin/Pages/Admin/AddAdmin/AddAdmin";
import { AddClassTeacher } from "./Admin/Pages/Admin/Teacher/AddClassTeacher";
import TeacherUpdateAttendence from "./Teacher/Pages/TeacherUpdateAttendence";
import StudentNotice from "./Student/Pages/StudentNotice";
import { Showsubjects } from "./Admin/Pages/Admin/Subjects/Showsubjects";
import StudentAdminMeassages from "./Student/Pages/StudentAdminMeassages";
import ProtectedRoute from "./ProtectedRoute";
import StudentAttendencedisplay from "./Teacher/Pages/StudentAttendencedisplay";

const App = () => {
  const navigate = useNavigate(); // ✅ Correct hook usage

  useEffect(() => {
    const studentId = localStorage.getItem("studentid");
    const AdminId = localStorage.getItem("AdminId");
    const TeacherId = localStorage.getItem("t_id");
    if (studentId) {
      navigate('/studentMenu'); // ✅ Correct usage of navigate
    } else if (AdminId) {
      navigate('/adminhome');
    }
    else if (TeacherId) {
      navigate('/teacherDashboard');
    }
  }, []);
  return (
    <>
      {/* <BrowserRouter> */}
      <Routes>

        <Route path="/" element={<Home />} />
        <Route path="/roleSelection" element={<RoleSelection />} />

        {/* admin */}
        {/* <Route path="/" element={<Home />} /> */}
        {/* <Route path="/login" element={<Login />}></Route>
            <Route path="/registration" element={<Registration />}></Route>
            <Route path="/categoryHome" element={<CategoryHome/>}></Route> */}
        {/* <Route path="/addadmin" element={<AddAdmin />} /> */}
        <Route path="/adminhome" element={
          <ProtectedRoute allowedRoles={"AdminId"} >
            <AdminHome />
          </ProtectedRoute>
        }></Route>
        <Route path="/AdminLogin" element={<AdminLogin />}></Route>
        <Route
          path="/adminregistration"
          element={<AdminRegistration />}
        ></Route>
        {/* class */}
        <Route path="/addclasses" element={
          <ProtectedRoute allowedRoles={"AdminId"} >
            <AddClasses />
          </ProtectedRoute>
        } />
        <Route path="/addclasses/class" element={
          <ProtectedRoute allowedRoles={"AdminId"} >
            <Classes />
          </ProtectedRoute>} />
        <Route path="/addclasses/showclasses" element={
          <ProtectedRoute allowedRoles={"AdminId"} >
            <ShowClasses />
          </ProtectedRoute>
        } />
        <Route
          path="/showclassTeacher/addclassteacher/:classid"
          element={
            <ProtectedRoute allowedRoles={"AdminId"} >
              <AddClassTeacher />
            </ProtectedRoute>
          }
        />

        {/* student */}

        <Route path="/addstudents" element={<ProtectedRoute allowedRoles={"AdminId"} ><AddStudents /></ProtectedRoute>} />
        <Route path="/addstudents/studentform" element={<ProtectedRoute allowedRoles={"AdminId"} ><StudentForm /></ProtectedRoute>} />
        <Route
          path="/addstudents/showstudentdetails"
          element={<ProtectedRoute allowedRoles={"AdminId"} ><ShowStudentDetails /></ProtectedRoute>}
        />
        <Route
          path="/addstudents/showstudentdetails/studentdetails/:classId"
          element={<ProtectedRoute allowedRoles={"AdminId"} ><StudentDetails /></ProtectedRoute>}
        />
        <Route
          path="/addstudents/showstudentdetails/studentdetails/feedetails/:id"
          element={<ProtectedRoute allowedRoles={"AdminId"} ><FeeDetails /></ProtectedRoute>}
        />
        <Route
          path="/addstudents/showstudentdetails/studentdetails/updatestudentdetails/:studentId"
          element={<ProtectedRoute allowedRoles={"AdminId"} ><UpdateStudentDetails /></ProtectedRoute>}
        />
        <Route
          path="/addstudents/showstudentdetails/studentdetails/displaystudentdetails/:studentId"
          element={<ProtectedRoute allowedRoles={"AdminId"} ><DisplayStudentDetails /></ProtectedRoute>}
        />

        {/* Teacher */}
        <Route path="/showclassTeacher" element={<ProtectedRoute allowedRoles={"AdminId"} ><ShowClassTeacher /></ProtectedRoute>} />
        <Route
          path="/showclassTeacher/showallteacherlist"
          element={<ProtectedRoute allowedRoles={"AdminId"} ><ShowAllTeachersList /></ProtectedRoute>}
        />
        <Route
          path="/showclassTeacher/showallteacherlist/updatetecherdetails/:teacherid"
          element={<ProtectedRoute allowedRoles={"AdminId"} ><UpdateTeacherDetails /></ProtectedRoute>}
        />
        <Route
          path="/showclassTeacher/showallteacherlist/showprofile/:teacherId"
          element={<ProtectedRoute allowedRoles={"AdminId"} ><ShowProfile /></ProtectedRoute>}
        />
        <Route
          path="/showclassTeacher/showallteacherlist/salarydetails/:teacherid"
          element={<ProtectedRoute allowedRoles={"AdminId"} ><SalaryDetails /></ProtectedRoute>}
        />
        <Route path="/showclassTeacher/addteacher" element={<AddTeacher />} />
        <Route
          path="/showclassTeacher/showteacherslist/:classname"
          element={<ProtectedRoute allowedRoles={"AdminId"} ><ShowTeachersList /></ProtectedRoute>}
        />

        <Route
          path="/adminhome/viewnotes/:NoticeId"
          element={<ProtectedRoute allowedRoles={"AdminId"} ><ViewNotes /></ProtectedRoute>}
        />
        <Route
          path="/adminhome/updatenotice/:NoticeId"
          element={<ProtectedRoute allowedRoles={"AdminId"} ><UpdateNotice /></ProtectedRoute>}
        />
        <Route path="/adminhome/addNotice" element={<ProtectedRoute allowedRoles={"AdminId"} ><AddNotice /></ProtectedRoute>} />
        <Route path="/timetable" element={<ProtectedRoute allowedRoles={"AdminId"} ><Timetable /></ProtectedRoute>} />

        {/* <Route path="/notes" element={<Notes />} /> */}
        <Route path="/profile" element={<ProtectedRoute allowedRoles={"AdminId"} ><Profile /></ProtectedRoute>} />
        <Route path="/adminlogout" element={<ProtectedRoute allowedRoles={"AdminId"} ><LogOut /></ProtectedRoute>} />
        <Route path="/addsubjects" element={<ProtectedRoute allowedRoles={"AdminId"} ><AddSubjects /></ProtectedRoute>} />
        <Route path="/addsubjects/showsubjects" element={<ProtectedRoute allowedRoles={"AdminId"} ><Showsubjects /></ProtectedRoute>} />
        <Route path="/feedback" element={<ProtectedRoute allowedRoles={"AdminId"} ><Feedback /></ProtectedRoute>} />

        {/* teacher */}
        <Route path="/teacherLogin" element={<TeacherLogin />} />
        {/* <Route path="/teacherRegistration" element={<TeacherRegistration />}/> */}
        <Route path="/teacherDashboard" element={<ProtectedRoute allowedRoles={"t_id"} ><TeacherDashboard /></ProtectedRoute>} />
        <Route path="/teacherClass" element={<ProtectedRoute allowedRoles={"t_id"} ><TeacherClass /></ProtectedRoute>} />
        <Route path="/teacherNotes" element={<ProtectedRoute allowedRoles={"t_id"} ><TeacherNotes /></ProtectedRoute>} />
        <Route path="/teacherAssignment" element={<ProtectedRoute allowedRoles={"t_id"} ><TeacherAssignment /></ProtectedRoute>} />
        <Route path="/teacherAttendence" element={<ProtectedRoute allowedRoles={"t_id"} ><TeacherAttendance /></ProtectedRoute>} />
        <Route path="/teacherAttendencedisplay" element={<ProtectedRoute allowedRoles={"t_id"} ><StudentAttendencedisplay /></ProtectedRoute>} />
        <Route
          path="/teacherTimeSchedule"
          element={<ProtectedRoute allowedRoles={"t_id"} ><TeacherTimeSchedule /></ProtectedRoute>}
        />
        <Route path="/teacherProfile" element={<ProtectedRoute allowedRoles={"t_id"} ><TeacherProfile /></ProtectedRoute>} />
        <Route path="/teacherNotice" element={<ProtectedRoute allowedRoles={"t_id"} ><TeacherNotice /></ProtectedRoute>} />
        <Route path="/teacherSalary" element={<ProtectedRoute allowedRoles={"t_id"} ><TeacherSalary /></ProtectedRoute>} />
        <Route
          path="/techerUpdateAttendence"
          element={<ProtectedRoute allowedRoles={"t_id"} ><TeacherUpdateAttendence /></ProtectedRoute>}
        />

        {/* student */}
        <Route
          path="/studentMenu/studentDashboard"
          element={<ProtectedRoute allowedRoles={"studentid"} ><StudentDashboard /></ProtectedRoute>}
        />
        <Route path="/studentLogin" element={<StudentLogin />} />
        <Route path="/studentMenu" element={<ProtectedRoute allowedRoles={"studentid"} ><StudentMenu /></ProtectedRoute>} />
        {/* <Route path="/studentRegistration" element={<StudentRegistration />} /> */}
        <Route
          path="/studentMenu/studentPayment"
          element={<ProtectedRoute allowedRoles={"studentid"} ><StudentPayment /></ProtectedRoute>}
        />
        <Route
          path="/studentMenu/studentDashboard/studentGeneralRegister"
          element={<ProtectedRoute allowedRoles={"studentid"} ><StudentGeneralRegister /></ProtectedRoute>}
        />
        <Route
          path="/studentMenu/studentDashboard/studentClassDetails"
          element={<ProtectedRoute allowedRoles={"studentid"} ><StudentClassDetails /></ProtectedRoute>}
        />
        <Route
          path="/studentMenu/studentDashboard/studentNotice"
          element={<ProtectedRoute allowedRoles={"studentid"} ><StudentNotice /></ProtectedRoute>}
        />
        <Route
          path="/studentMenu/studentDashboard/studentTimetable"
          element={<ProtectedRoute allowedRoles={"studentid"} ><StudentTimetable /></ProtectedRoute>}
        />
        <Route
          path="/studentMenu/studentDashboard/studentFees"
          element={<ProtectedRoute allowedRoles={"studentid"} ><StudentFees /></ProtectedRoute>}
        />
        <Route
          path="/studentMenu/studentDashboard/studentAttendance"
          element={<ProtectedRoute allowedRoles={"studentid"} ><StudentAttendance /></ProtectedRoute>}
        />
        <Route
          path="/studentMenu/studentDashboard/studentHoliday"
          element={<ProtectedRoute allowedRoles={"studentid"} ><StudentHoliday /></ProtectedRoute>}
        />
        <Route
          path="/studentMenu/studentDashboard/studentLearningMaterial"
          element={<ProtectedRoute allowedRoles={"studentid"} ><StudentLearningMaterial /></ProtectedRoute>}
        />
        <Route
          path="/studentMenu/studentDashboard/studentResult"
          element={<ProtectedRoute allowedRoles={"studentid"} ><StudentResult /></ProtectedRoute>}
        />
        <Route
          path="/studentMenu/studentDashboard/studentPracticeTest"
          element={<ProtectedRoute allowedRoles={"studentid"} ><StudentPracticeTest /></ProtectedRoute>}
        />
        <Route
          path="/studentMenu/studentDashboard/studentFeedback"
          element={<ProtectedRoute allowedRoles={"studentid"} ><StudentFeedback /></ProtectedRoute>}
        />
        <Route
          path="/studentMenu/studentProfile"
          element={<ProtectedRoute allowedRoles={"studentid"} ><StudentProfile /></ProtectedRoute>}
        />
        <Route
          path="/studentMenu/studentDigitalI_Card"
          element={<ProtectedRoute allowedRoles={"studentid"} ><StudentDigitalICard /></ProtectedRoute>}
        />
        <Route path="/studentMenu/studentDashboard/StudentAdminMeassages" element={<ProtectedRoute allowedRoles={"studentid"} ><StudentAdminMeassages /></ProtectedRoute>} />
      </Routes>

      {/* </BrowserRouter> */}
    </>
  );

};

export default App;
