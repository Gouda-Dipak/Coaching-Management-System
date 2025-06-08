// import React, { useState } from 'react';
// import Header from '../Home/Header';
// import Footer from '../Home/Footer';

// export const AddAdmin = () => {
//     const [showPopup, setShowPopup] = useState(false);
//     const [email, setEmail] = useState('');
//     const [password, setPassword] = useState('');
//     const [id, setId] = useState('');
//     const [admins, setAdmins] = useState([]);

//     const handleSubmit = (e) => {
//         e.preventDefault();
//         setAdmins([...admins, { id, email, password }]);
//         setEmail('');
//         setPassword('');
//         setId('');
//         setShowPopup(false);
//     };

//     const handleDelete = (index) => {
//         setAdmins(admins.filter((_, i) => i !== index));
//     };

//     return (
//         <div className="flex flex-col min-h-screen">
//             <Header />
//             <div className="flex flex-1 p-4 sm:p-6 md:p-10 bg-[#454649] text-white min-h-screen">
//                 <div className="w-full bg-transparent p-6 mt-10">
//                     <button 
//                         className="px-4 py-2 bg-blue-500 text-white rounded-lg"
//                         onClick={() => setShowPopup(true)}
//                     >
//                         Add Admin
//                     </button>

//                     {showPopup && (
//                         <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
//                             <div className="bg-white text-black p-6 rounded-lg shadow-lg w-96">
//                                 <h2 className="text-lg font-semibold mb-4">Add Admin</h2>
//                                 <form onSubmit={handleSubmit}>
//                                     <input 
//                                         type="text" 
//                                         placeholder="ID" 
//                                         value={id} 
//                                         onChange={(e) => setId(e.target.value)} 
//                                         className="w-full p-3 border mb-2" 
//                                         required
//                                     />
//                                     <input 
//                                         type="email" 
//                                         placeholder="Email" 
//                                         value={email} 
//                                         onChange={(e) => setEmail(e.target.value)} 
//                                         className="w-full p-3 border mb-2" 
//                                         required
//                                     />
//                                     <input 
//                                         type="password" 
//                                         placeholder="Password" 
//                                         value={password} 
//                                         onChange={(e) => setPassword(e.target.value)} 
//                                         className="w-full p-3 border mb-2" 
//                                         required
//                                     />
//                                     <div className="flex justify-between">
//                                         <button type="submit" className="px-4 py-2 bg-green-500 text-white rounded-lg">Submit</button>
//                                         <button type="button" onClick={() => setShowPopup(false)} className="px-4 py-2 bg-red-500 text-white rounded-lg">Cancel</button>
//                                     </div>
//                                 </form>
//                             </div>
//                         </div>
//                     )}

//                     <h2 className="mt-6 text-lg font-semibold">Admin List</h2>
//                     <table className="w-full mt-2 border-collapse border border-gray-500">
//                         <thead>
//                             <tr className="bg-gray-700 text-white">
//                                 <th className="p-2 border border-gray-500">#</th>
//                                 <th className="p-2 border border-gray-500">ID</th>
//                                 <th className="p-2 border border-gray-500">Email</th>
//                                 <th className="p-2 border border-gray-500">Action</th>
//                             </tr>
//                         </thead>
//                         <tbody>
//                             {admins.map((admin, index) => (
//                                 <tr key={index} className="text-center bg-gray-800 text-white">
//                                     <td className="p-2 border border-gray-500">{index + 1}</td>
//                                     <td className="p-2 border border-gray-500">{admin.id}</td>
//                                     <td className="p-2 border border-gray-500">{admin.email}</td>
//                                     <td className="p-2 border border-gray-500">
//                                         <button 
//                                             onClick={() => handleDelete(index)} 
//                                             className="px-3 py-1 bg-red-500 text-white rounded-lg"
//                                         >
//                                             Delete
//                                         </button>
//                                     </td>
//                                 </tr>
//                             ))}
//                         </tbody>
//                     </table>
//                 </div>
//             </div>
//             <Footer />
//         </div>
//     );
// };
