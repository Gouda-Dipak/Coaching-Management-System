// import React from "react";
// import { Link } from "react-router-dom";
// import { motion } from "framer-motion";
// import { User, BookOpen, GraduationCap } from "lucide-react";

// function RoleSelection() {
//   return (
//     <div className="min-h-screen flex flex-col justify-center items-center bg-gradient-to-r from-orange-300 to-yellow-400 text-white">
//       <h1 className="text-5xl font-extrabold mb-10">Choose Your Role</h1>

//       <div className="flex flex-wrap justify-center gap-8">
//         {[
//           { role: "Admin", icon: User, bg: "bg-red-400", hover: "hover:bg-red-500" },
//           { role: "Teacher", icon: BookOpen, bg: "bg-green-400", hover: "hover:bg-green-500" },
//           { role: "Student", icon: GraduationCap, bg: "bg-blue-400", hover: "hover:bg-blue-500" }
//         ].map(({ role, icon: Icon, bg, hover }) => (
//           <motion.div
//             key={role}
//             className={`${bg} p-6 rounded-xl shadow-2xl transform transition duration-500 flex flex-col items-center w-60 h-60 cursor-pointer ${hover}`}
//             whileHover={{ scale: 1.1 }}
//             whileTap={{ scale: 0.95 }}
//           >
//             <Icon size={50} className="text-white mb-4" />
//             <Link to={`/${role.toLowerCase()}Login`} className="text-3xl font-bold text-white block text-center">
//               {role}
//             </Link>
//           </motion.div>
//         ))}
//       </div>
//     </div>
//   );
// }

// export default RoleSelection;
// import React, { useState, useEffect } from "react";
// import { Link } from "react-router-dom";
// import { motion } from "framer-motion";
// import { User, BookOpen, GraduationCap } from "lucide-react";

// function RoleSelection() {
//   const [loading, setLoading] = useState(true);

//   useEffect(() => {
//     const timer = setTimeout(() => setLoading(false), 2000); // 2 seconds loading
//     return () => clearTimeout(timer);
//   }, []);

//   if (loading) {
//     return (
//       <div className="min-h-screen flex items-center justify-center bg-yellow-400">
//         <div className="animate-spin rounded-full h-20 w-20 border-4 border-white border-t-transparent"></div>
//       </div>
//     );
//   }

//   return (
//     <div className="min-h-screen flex flex-col justify-center items-center bg-gradient-to-r from-orange-300 to-yellow-400 text-white">
//       <h1 className="text-5xl font-extrabold mb-10">Choose Your Role</h1>

//       <div className="flex flex-wrap justify-center gap-8">
//         {[
//           { role: "Admin", icon: User, bg: "bg-red-400", hover: "hover:bg-red-500" },
//           { role: "Teacher", icon: BookOpen, bg: "bg-green-400", hover: "hover:bg-green-500" },
//           { role: "Student", icon: GraduationCap, bg: "bg-blue-400", hover: "hover:bg-blue-500" }
//         ].map(({ role, icon: Icon, bg, hover }) => (
//           <Link to={`/${role.toLowerCase()}Login`} className="text-3xl font-bold text-white block text-center">
//           <motion.div
//             key={role}
//             className={`${bg} p-6 rounded-xl shadow-2xl transform transition duration-500 flex flex-col items-center w-60 h-60 cursor-pointer ${hover}`}
//             whileHover={{ scale: 1.1 }}
//             whileTap={{ scale: 0.95 }}
//           >
//             <Icon size={50} className="text-white mb-4" />
//               {role}
//           </motion.div>
//             </Link>
//         ))}
//       </div>
//     </div>
//   );
// }

// export default RoleSelection;
import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { User, BookOpen, GraduationCap } from "lucide-react";

function RoleSelection() {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => setLoading(false), 2000); // 2 seconds loading
    return () => clearTimeout(timer);
  }, []);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-yellow-400">
        <div className="animate-spin rounded-full h-20 w-20 border-4 border-white border-t-transparent"></div>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex flex-col justify-center items-center bg-gradient-to-r from-orange-300 to-yellow-400 text-white">
      <h1 className="text-5xl font-extrabold mb-10">Choose Your Role</h1>

      <div className="flex flex-wrap justify-center gap-8">
        {[
          { role: "Admin", icon: User, bg: "bg-red-400", hover: "hover:bg-red-500" },
          { role: "Teacher", icon: BookOpen, bg: "bg-green-400", hover: "hover:bg-green-500" },
          { role: "Student", icon: GraduationCap, bg: "bg-blue-400", hover: "hover:bg-blue-500" }
        ].map(({ role, icon: Icon, bg, hover }) => (
          <Link
            key={role}
            to={`/${role.toLowerCase()}Login`}
            className="text-3xl font-bold text-white block text-center"
          >
            <motion.div
              className={`${bg} p-6 rounded-xl shadow-2xl transform transition duration-500 flex flex-col items-center w-60 h-60 cursor-pointer ${hover}`}
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.95 }}
            >
              <Icon size={50} className="text-white mb-4" />
              {role}
            </motion.div>
          </Link>
        ))}
      </div>
    </div>
  );
}

export default RoleSelection;
