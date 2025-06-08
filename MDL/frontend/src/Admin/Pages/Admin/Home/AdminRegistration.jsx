import React, { useEffect, useState } from "react";
import {
  FaUser,
  FaEnvelope,
  FaLock,
  FaPhone,
  FaCamera,
  FaCalendar,
  FaGlobe,
  FaCity,
  FaMapMarkerAlt,
  FaMapPin,
} from "react-icons/fa";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { Link, useNavigate } from "react-router-dom";

const AdminRegistration = () => {
  const [formData, setFormData] = useState({
    fname: "",
    mname: "",
    lname: "",
    dob: "",
    email: "",
    password: "",
    mobileNumber: "",
    country: "",
    city: "",
    address: "",
    pinCode: "",
    image: null,
  });

  const navigate = useNavigate();

  useEffect(() => {
    console.log(formData);
  }, [formData]);

  const handleChange = (e) => {
    const { name, value, type, files } = e.target;
    setFormData({
      ...formData,
      [name]: type === "file" ? files[0] : value,
    });
  };

  const validateForm = () => {
    const { fname, mname, lname, dob, email, password, mobileNumber, country, city, address, pinCode, image } = formData;
    const nameRegex = /^[A-Za-z]+$/;
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    const phoneRegex = /^\d{10}$/;
    const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d).{6,}$/;
    const pinCodeRegex = /^\d{4,6}$/;

    if (!fname || !nameRegex.test(fname)) return toast.error("Valid first name is required.");
    if (!mname || !nameRegex.test(mname)) return toast.error("Valid middle name is required.");
    if (!lname || !nameRegex.test(lname)) return toast.error("Valid last name is required.");
    if (!dob || !email || !password || !mobileNumber || !country || !city || !address || !pinCode || !image) return toast.error("All fields are required!");
    if (!emailRegex.test(email)) return toast.error("Invalid email format");
    if (!phoneRegex.test(mobileNumber)) return toast.error("Invalid mobile number (must be 10 digits)");
    if (!passwordRegex.test(password)) return toast.error("Password must be at least 6 characters, include an uppercase letter, lowercase letter, and a number");
    if (!pinCodeRegex.test(pinCode)) return toast.error("Invalid Pin Code (4-6 digits only)");
    return true;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validateForm()) return;

    const formdata = new FormData();
    Object.keys(formData).forEach((key) => {
      formdata.append(key, formData[key]);
    });

    try {
      const response = await axios.post("https://mdl-coaching.onrender.com/admin/signup", formdata, {
        headers: { "Content-Type": "multipart/form-data" },
      });
      const { message, success, error } = response.data;

      if (success) {
        toast.success(message, { autoClose: 2000 });
        setTimeout(() => navigate("/adminlogin"), 1000);
      } else {
        toast.error(error?.details?.[0]?.message || message, { autoClose: 2000 });
      }
    } catch (error) {
      toast.error("Server error! Please try again later.", { autoClose: 2000 });
    }
  };

  return (
    <div className="bg-black min-h-screen flex items-center justify-center p-4">
      <div className="max-w-4xl w-full p-6 bg-[#454649] shadow-xl rounded-lg text-white">
        <h2 className="text-3xl font-extrabold mb-6 text-center">Admin Registration</h2>
        <form onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {["fname", "mname", "lname", "dob", "email", "password", "mobileNumber", "country", "city", "address", "pinCode"].map((name) => (
            <div key={name} className="flex items-center border-2 border-white p-3 rounded-lg bg-[#454649]">
              <span className="text-white mr-3 text-xl">
                {name === "email" ? <FaEnvelope /> : name === "password" ? <FaLock /> : name === "dob" ? <FaCalendar /> :
                name === "mobileNumber" ? <FaPhone /> : name === "country" ? <FaGlobe /> : name === "city" ? <FaCity /> :
                name === "address" ? <FaMapMarkerAlt /> : name === "pinCode" ? <FaMapPin /> : <FaUser />}
              </span>
              <input
                className="w-full bg-transparent placeholder-gray-400 text-white outline-none"
                name={name}
                type={name === "dob" ? "date" : name === "password" ? "password" : "text"}
                placeholder={name.charAt(0).toUpperCase() + name.slice(1).replace("Number", " Number")}
                onChange={handleChange}
                required
              />
            </div>
          ))}
          <div className="col-span-1 md:col-span-2 flex items-center border-2 border-white p-3 rounded-lg bg-[#454649]">
            <FaCamera className="text-white mr-3 text-xl" />
            <input className="w-full text-white outline-none" name="image" type="file" accept="image/*" onChange={handleChange} required />
          </div>
          <div className="col-span-1 md:col-span-2">
            <button type="submit" className="bg-yellow-400 text-black w-full p-3 rounded-lg font-bold hover:bg-yellow-300 transition">Register</button>
          </div>
        </form>
        <div className="text-center mt-4">
          <p className="text-white">Already have an account? <Link to="/adminlogin" className="text-yellow-400 font-bold hover:underline">Login</Link></p>
        </div>
      </div>
      <ToastContainer />
    </div>
  );
};

export default AdminRegistration;
