// import React, { useState } from "react";
// import { Link, useNavigate } from "react-router-dom";
// import { ToastContainer, toast } from "react-toastify";

// const TeacherLogin = () => {
//   const navigate = useNavigate();
//   const [formData, setFormData] = useState({
//     t_id: "",
//     email: "",
//     password: "",
//   });

//   const handleChange = (e) => {
//     setFormData({ ...formData, [e.target.name]: e.target.value });
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     const { t_id, email, password } = formData;

//     try {
//       const url = "https://mdl-coaching.onrender.com/teacher/login";
//       const response = await fetch(url, {
//         method: "POST",
//         headers: {
//           "Content-Type": "application/json",
//         },
//         body: JSON.stringify(formData),
//       });

//       const result = await response.json();
//       const { message, success, jwttoken, name, data, error } = result;
//       // console.log("The logged user data :: " + result);
//       console.log(formData);
//       if (success) {
//         toast.success(message, {
//           position: "top-center",
//           autoClose: 2000,
//         });
//         localStorage.setItem("email", result.email);
//         localStorage.setItem("token", jwttoken);
//         localStorage.setItem(
//           "name",
//           data.s_name + " " + data.name + " " + data.lname
//         );
//         localStorage.setItem("t_id", data._id);
//         localStorage.setItem("photo", data.photo);
//         setTimeout(() => {
//           navigate("/teacherDashboard");
//         }, 1000);
//       } else if (error) {
//         const details = error?.details[0].message;
//         toast.error(details, {
//           position: "top-center",
//           autoClose: 2000,
//         });
//       } else if (!success) {
//         toast.error(message, {
//           position: "top-center",
//           autoClose: 2000,
//         });
//       }
//     } catch (error) {
//       toast.error(error, {
//         position: "top-center",
//         autoClose: 2000,
//       });
//     }
//   };

//   return (
//     <div className="flex items-center justify-center min-h-screen bg-gradient-to-r from-pink-500 via-purple-500 to-blue-500 p-4">
//       <div className="w-full max-w-md bg-white p-8 rounded-2xl shadow-2xl transform transition duration-300 hover:shadow-xl">
//         <h2 className="text-4xl font-extrabold text-gray-900 text-center">
//           Login
//         </h2>
//         <p className="text-center text-gray-600 mb-6">
//           Welcome back! Please sign in.
//         </p>
//         <form className="space-y-5">
//           <div>
//             <label className="block text-gray-700 text-sm font-semibold mb-1">
//               Teacher ID
//             </label>
//             <input
//               type="text"
//               name="t_id"
//               placeholder="Enter your Teacher ID"
//               value={formData.teacherID}
//               onChange={handleChange}
//               className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-pink-500 focus:outline-none shadow-lg"
//             />
//           </div>
//           <div>
//             <label className="block text-gray-700 text-sm font-semibold mb-1">
//               Email Address
//             </label>
//             <input
//               type="email"
//               name="email"
//               placeholder="you@example.com"
//               value={formData.email}
//               onChange={handleChange}
//               className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-pink-500 focus:outline-none shadow-lg"
//             />
//           </div>
//           <div>
//             <label className="block text-gray-700 text-sm font-semibold mb-1">
//               Password
//             </label>
//             <input
//               type="password"
//               name="password"
//               placeholder="••••••••"
//               value={formData.password}
//               onChange={handleChange}
//               className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-pink-500 focus:outline-none shadow-lg"
//             />
//           </div>

//           <button
//             type="button"
//             onClick={handleSubmit}
//             className="block w-full text-center bg-gradient-to-r from-pink-500 to-purple-500 text-white font-bold py-2 rounded-lg shadow-md hover:from-pink-600 hover:to-purple-600 transition duration-300"
//           >
//             {/* <Link to="/teacherDashboard"> */}
//             Sign In
//             {/* </Link> */}
//           </button>
//         </form>
//         <p className="text-sm text-center text-gray-700 mt-4">
//         First time here? Explore MDL Coaching (offline) and unlock your potential today!
//           {/* <Link to="" className="text-pink-500 font-semibold hover:underline">
//             Sign up
//           </Link> */}
//         </p>
//       </div>
//       <ToastContainer />
//     </div>
//   );
// };

// export default TeacherLogin;
import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const TeacherLogin = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    t_id: "",
    email: "",
    password: "",
  });

  const [loading, setLoading] = useState(true); // Loading state

  useEffect(() => {
    const timer = setTimeout(() => {
      setLoading(false); // Turn off loading after 1 second
    }, 1000);
    return () => clearTimeout(timer);
  }, []);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const { t_id, email, password } = formData;

    try {
      const url = "https://mdl-coaching.onrender.com/teacher/login";
      const response = await fetch(url, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      const result = await response.json();
      const { message, success, jwttoken, name, data, error } = result;

      if (success) {
        toast.success(message, {
          position: "top-center",
          autoClose: 2000,
        });
        localStorage.setItem("email", result.email);
        localStorage.setItem("token", jwttoken);
        localStorage.setItem(
          "name",
          data.s_name + " " + data.name + " " + data.lname
        );
        localStorage.setItem("t_id", data._id);
        localStorage.setItem("photo", data.photo);
        setTimeout(() => {
          navigate("/teacherDashboard");
        }, 1000);
      } else if (error) {
        const details = error?.details[0].message;
        toast.error(details, {
          position: "top-center",
          autoClose: 2000,
        });
      } else if (!success) {
        toast.error(message, {
          position: "top-center",
          autoClose: 2000,
        });
      }
    } catch (error) {
      toast.error(error.toString(), {
        position: "top-center",
        autoClose: 2000,
      });
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gradient-to-r from-pink-500 via-purple-500 to-blue-500 p-4">
      {loading ? (
        <div className="flex flex-col items-center justify-center">
          <div className="animate-spin rounded-full h-16 w-16 border-t-4 border-white border-opacity-50"></div>
          <p className="text-white mt-4 text-lg font-semibold">Loading...</p>
        </div>
      ) : (
        <div className="w-full max-w-md bg-white p-8 rounded-2xl shadow-2xl transform transition duration-500 animate-fade-in">
          <h2 className="text-4xl font-extrabold text-gray-900 text-center">
            Login
          </h2>
          <p className="text-center text-gray-600 mb-6">
            Welcome back! Please sign in.
          </p>
          <form className="space-y-5">
            <div>
              <label className="block text-gray-700 text-sm font-semibold mb-1">
                Teacher ID
              </label>
              <input
                type="text"
                name="t_id"
                placeholder="Enter your Teacher ID"
                value={formData.t_id}
                onChange={handleChange}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-pink-500 focus:outline-none shadow-lg"
              />
            </div>
            <div>
              <label className="block text-gray-700 text-sm font-semibold mb-1">
                Email Address
              </label>
              <input
                type="email"
                name="email"
                placeholder="you@example.com"
                value={formData.email}
                onChange={handleChange}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-pink-500 focus:outline-none shadow-lg"
              />
            </div>
            <div>
              <label className="block text-gray-700 text-sm font-semibold mb-1">
                Password
              </label>
              <input
                type="password"
                name="password"
                placeholder="••••••••"
                value={formData.password}
                onChange={handleChange}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-pink-500 focus:outline-none shadow-lg"
              />
            </div>

            <button
              type="button"
              onClick={handleSubmit}
              className="block w-full text-center bg-gradient-to-r from-pink-500 to-purple-500 text-white font-bold py-2 rounded-lg shadow-md hover:from-pink-600 hover:to-purple-600 transition duration-300"
            >
              Sign In
            </button>
          </form>
          <p className="text-sm text-center text-gray-700 mt-4">
            First time here? Explore MDL Coaching (offline) and unlock your
            potential today!
          </p>
        </div>
      )}
      <ToastContainer />
    </div>
  );
};

export default TeacherLogin;
