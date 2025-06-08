
import React, { useEffect, useState } from "react";
import Header from "../Home/Header";
import  Footer  from "../Home/Footer";
import axios from "axios";
function Profile() {
  const [admin, setAdmin] = useState([])
  
  useEffect(() => {
    adminprofile()
  },[])
  const adminprofile = async () => {
    try {
      const AdminId = localStorage.getItem("AdminId")
      const res = await axios.get(`https://mdl-coaching.onrender.com/admin/getdetails/${AdminId}`)
      console.log(res.data)
      setAdmin(res.data.data)
    } catch (error) {
      console.log(error)
    }
  }
  
  return (
    <div className="flex flex-col min-h-screen bg-[#454649]">
      {/* Header */}
      <Header />

      {/* Main Content */}
      <div className="flex flex-1 justify-center items-center p-6 mt-5 min-h-screen">
        <div className="w-full max-w-4xl bg-white p-8 sm:p-12 rounded-xl shadow-xl">
          {/* Profile Header */}
          <div className="flex flex-col items-center text-center">
            <img
              src={`https://mdl-coaching.onrender.com/images/${admin.img}`}
              alt="Admin Profile"
              className="w-32 h-32 sm:w-40 sm:h-40 rounded-full border-4 border-indigo-500 shadow-md transition-transform transform hover:scale-110"
            />
            <h1 className="mt-4 text-3xl sm:text-4xl font-bold text-gray-800">
            {admin.fname + " " + admin.mname+" "+admin.lname}
            </h1>
            {/* <p className="text-base sm:text-lg text-gray-600">Administrator</p> */}
          </div>

          {/* Profile Details */}
          <div className="mt-8 grid grid-cols-1 sm:grid-cols-2 gap-6 text-lg">
            {[
              { label: "Name", value: admin.mname },
              { label: "Date of Birth", value: admin.dob },
              { label: "Location", value: admin.address },
              { label: "Email", value: admin.email },
              // { label: "Address", value: admin.address },
              { label: "Country", value: admin.country },
              { label: "city", value: admin.city },
              { label: "Pincode", value: admin.pinCode },
            ].map((item, index) => (
              <div key={index} className="flex flex-col sm:flex-row sm:items-center gap-2">
                <span className="text-indigo-600 font-semibold">{item.label}:</span>
                <p className="text-gray-700">{item.value}</p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Footer */}
      <Footer />
    </div>
  );
}

export default Profile;