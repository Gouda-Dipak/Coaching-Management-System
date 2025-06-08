import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import {
  FaUser,
  FaCity,
  FaFlag,
  FaMoneyBillWave,
  FaIdCard,
  FaCalendarAlt,
  FaPlus,
  FaHome,
  FaLock,
  FaChalkboardTeacher,
  FaEnvelope,
  FaVenusMars,
  FaPhone,
} from "react-icons/fa";
import Header from "../Home/Header";
import Footer from "../Home/Footer";
import Swal from "sweetalert2";
import { AiOutlineArrowLeft } from "react-icons/ai";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useNavigate } from "react-router-dom";

function StudentForm() {
  const navigate = useNavigate();
  const [classes, setClasses] = useState([]);
  const [formData, setFormData] = useState({
    s_id: "",
    fname: "",
    mname: "",
    lname: "",
    email: "",
    password: "",
    dob: "",
    adharnumber: "",
    city: "",
    country: "",
    adress: "",
    fee: "",
    gender: "",
    passphoto: null,
    s_class: "",
    s_classId: "",
    mobilenumber: "",
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };
  const handleClassChange = (event) => {
    const selectedValue = JSON.parse(event.target.value); 
    console.log(selectedValue)// Convert string back to object
    setFormData((prevState) => ({
      ...prevState,
      s_class: selectedValue.name, // Save class name
      s_classId: selectedValue.id, // Save class ID separately
    }));
  };
  useEffect(() => {
    getclasses();
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

  
  const handleFileChange = (e) => {
    const { name, value, type, files } = e.target;
    setFormData({
      ...formData,
      [name]: type === "file" ? files[0] : value,
    });
  };

  const validateForm = () => {
    const nameRegex = /^[A-Za-z]+$/;
    const numberRegex = /^[0-9]+$/;
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    const aadharRegex = /^\d{12}$/;
    const mobileRegex = /^\d{10}$/;

    if (!numberRegex.test(formData.s_id)) {
      toast.error("Student ID must be only numbers");
      return false;
    }
    if (!nameRegex.test(formData.fname) || !nameRegex.test(formData.mname) || !nameRegex.test(formData.lname)) {
      toast.error("Name fields must contain only letters");
      return false;
    }
    if (!emailRegex.test(formData.email)) {
      toast.error("Invalid email format");
      return false;
    }
    if (!aadharRegex.test(formData.adharnumber)) {
      toast.error("Aadhar Number must be 12 digits"); 
      return false;
    }
    if (!nameRegex.test(formData.city) || !nameRegex.test(formData.country)) {
      toast.error("City and Country must contain only letters");
      return false;
    }
    if (!mobileRegex.test(formData.mobilenumber)) {
      toast.error("Mobile number must be 10 digits");
      return false;
    }
    if (!numberRegex.test(formData.fee)) {
      toast.error("Fee must be a number");
      return false;
    }
    return true;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validateForm()) return;
    console.log(formData);
    if (formData.s_class === "") {
      toast.error("Please select a class", {
        position: "top-center",
        autoClose: 2000,
      });
      return;
    }
    try {
      const url = "https://mdl-coaching.onrender.com/student/signup";

      const response = await axios.post(url, formData, {
        headers: {
          "Content-Type": "multipart/form-data",
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
          navigate("/addstudents");
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
  };

  const handleReset = () => {
    setFormData({
      s_id: "",
      fname: "",
      mname: "",
      lname: "",
      email: "",
      password: "",
      dob: "",
      adharnumber: "",
      city: "",
      country: "",
      adress: "",
      fee: "",
      gender: "",
      passphoto: null,
      s_class: "",
      mobilenumber: "",
      s_classId: "",
    });
  };

  return (
    <div className="flex flex-col min-h-screen bg-[#454649] text-white">
      <Header />
      <div className="flex flex-1 p-6 min-h-screen">
        <div className="flex-1 bg-gray-800 p-10 mt-20 rounded-lg shadow-lg max-w-4xl mx-auto">
          <h2 className="text-2xl font-bold mb-6 text-yellow-400 text-center py-4 rounded-lg bg-gray-700">
            Student Details
          </h2>

          <form
            onSubmit={handleSubmit}
            className="grid grid-cols-1 md:grid-cols-2 gap-6"
          >
            {[
              {
                label: "Student ID",
                name: "s_id",
                icon: <FaIdCard />,
                type: "number",
                placeholder: "Enter Student ID",
              },
              {
                label: "First Name",
                name: "fname",
                icon: <FaUser />,
                type: "text",
                placeholder: "Enter First Name",
              },
              {
                label: "Middle Name",
                name: "mname",
                icon: <FaUser />,
                type: "text",
                placeholder: "Enter Middle Name",
              },
              {
                label: "Last Name",
                name: "lname",
                icon: <FaUser />,
                type: "text",
                placeholder: "Enter Last Name",
              },
              {
                label: "Email",
                name: "email",
                icon: <FaEnvelope />,
                type: "email",
                placeholder: "Enter Email",
              },
              {
                label: "Password",
                name: "password",
                icon: <FaLock />,
                type: "password",
                placeholder: "Enter Password",
              },
              {
                label: "Date of Birth",
                name: "dob",
                icon: <FaCalendarAlt />,
                type: "date",
                placeholder: "Select Date of Birth",
              },
              {
                label: "Aadhar Number",
                name: "adharnumber",
                icon: <FaIdCard />,
                type: "number",
                placeholder: "Enter Aadhar Number",
              },
              {
                label: "City",
                name: "city",
                icon: <FaCity />,
                type: "text",
                placeholder: "Enter City",
              },
              {
                label: "Country",
                name: "country",
                icon: <FaFlag />,
                type: "text",
                placeholder: "Enter Country",
              },
              {
                label: "Mobile Number",
                name: "mobilenumber",
                icon: <FaPhone />,
                type: "number",
                placeholder: "Enter Mobile Number",
              },
            ].map((field, index) => (
              <div key={index} className="flex flex-col">
                <label className="text-gray-300 font-medium mb-1">
                  {field.label}
                </label>
                <div className="relative flex items-center">
                  <span className="absolute left-3 text-gray-400">
                    {field.icon}
                  </span>
                  <input
                    type={field.type}
                    name={field.name}
                    value={formData[field.name]}
                    onChange={handleChange}
                    placeholder={field.placeholder}
                    className="w-full pl-12 p-4 border border-gray-600 rounded-lg bg-gray-900 text-white focus:outline-none focus:ring-2 focus:ring-blue-500 transition"
                    required
                  />
                </div>
              </div>
            ))}
            <div className="flex flex-col md:col-span-2">
              <label className="text-gray-300 font-medium mb-1">Address</label>
              <div className="relative flex items-center">
                <span className="absolute left-3 text-gray-400">
                  <FaHome />
                </span>
                <textarea
                  name="adress"
                  value={formData.adress}
                  onChange={handleChange}
                  placeholder="Enter Address"
                  className="w-full pl-12 p-4 border border-gray-600 rounded-lg bg-gray-900 text-white focus:outline-none focus:ring-2 focus:ring-blue-500 transition"
                  required
                  rows="3"
                />
              </div>
            </div>
            <div className="flex flex-col md:flex-row gap-4">
              <div className="flex-1">
                <label className="text-gray-300 font-medium mb-1">
                  Fee Amount
                </label>
                <div className="relative flex items-center">
                  <span className="absolute left-3 text-gray-400">
                    <FaMoneyBillWave />
                  </span>
                  <input
                    type="text"
                    name="fee"
                    value={formData.fee}
                    onChange={handleChange}
                    placeholder="Enter Fee Amount"
                    className="w-full pl-12 p-4 border border-gray-600 rounded-lg bg-gray-900 text-white focus:outline-none focus:ring-2 focus:ring-blue-500 transition"
                    required
                  />
                </div>
              </div>
              <div className="flex-1">
                <label className="text-gray-300 font-medium mb-1">Class</label>
                <div className="relative flex items-center">
                  <span className="absolute left-3 text-gray-400">
                    <FaChalkboardTeacher />
                  </span>
                  <select
                    name="s_class"
                    onChange={handleClassChange}
                    className="w-full pl-12 p-4 border border-gray-600 rounded-lg bg-gray-900 text-white focus:outline-none focus:ring-2 focus:ring-blue-500 transition"
                    required
                  >
                    <option value="">Select Class</option>
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
                </div>
              </div>
            </div>
            <div className="flex flex-col">
              <label className="text-gray-300 font-medium mb-1">Gender</label>
              <div className="relative flex items-center">
                <span className="absolute left-3 text-gray-400">
                  <FaVenusMars />
                </span>
                <select
                  name="gender"
                  value={formData.gender}
                  onChange={handleChange}
                  className="w-full pl-12 p-4 border border-gray-600 rounded-lg bg-gray-900 text-white focus:ring-2 focus:ring-blue-500 transition"
                  required
                >
                  <option value="">Select Gender</option>
                  <option value="Male">Male</option>
                  <option value="Female">Female</option>
                  <option value="Other">Other</option>
                </select>
              </div>
            </div>

            <div className="flex flex-col">
              <label className="text-gray-300 font-medium mb-1">
                Pass Photo
              </label>

              <input
                type="file"
                name="passphoto"
                accept="image/*"
                onChange={handleFileChange}
                className="w-full p-3 border border-gray-600 rounded-lg bg-gray-900 text-white file:bg-blue-500 file:text-white file:px-4 file:py-2 file:rounded-lg file:border-none file:cursor-pointer hover:file:bg-blue-600 transition"
                required
              />
            </div>
            <div className="col-span-1 md:col-span-2 flex flex-col gap-2">
              <button
                type="submit"
                className="w-full bg-blue-500 text-white p-4 rounded-lg hover:bg-blue-600 transition"
              >
                Submit
              </button>
              <button
                type="button"
                onClick={handleReset}
                className="w-full bg-gray-600 text-white p-4 rounded-lg hover:bg-gray-700 transition"
              >
                Reset
              </button>
            </div>
          </form>
        </div>
      </div>
      
      <Link
        to="/addstudents"
        className="fixed bottom-6 left-4 text-white bg-green-600 p-3 rounded-full hover:bg-green-700 transition duration-300"
      >
        <AiOutlineArrowLeft size={24} />
      </Link>
      <Footer />
      <ToastContainer />
    </div>
  );
}

export default StudentForm;
