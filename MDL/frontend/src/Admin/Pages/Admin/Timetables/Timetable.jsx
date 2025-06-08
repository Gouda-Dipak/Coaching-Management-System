// import Header from '../Home/Header';
// import Footer from '../Home/Footer';
// import { useEffect, useState } from 'react';
// import { toast, ToastContainer } from 'react-toastify';
// import axios from 'axios';

// export const Timetable = () => {
//     const [file, setFile] = useState(null);
//     const [uploadedFiles, setUploadedFiles] = useState([]);

//     const handleFileChange = (event) => {
//         setFile(event.target.files[0]);
//     };


//     useEffect(() => {
//         gettables()
//     }, [])

//     const gettables = async () => {
//         try {
//             const response = await axios.get("https://mdl-coaching.onrender.com/timetable/getTimetable")
//             setUploadedFiles(response.data.data)

//         } catch (error) {
//             console.log("Error for Gettable", error)
//         }
//     }


//     const handleSubmit = async () => {

//         if (!file) {
//             return toast.error("File is Required", {
//                 position: "top-center",
//                 autoClose: 2000,
//             });
//         }
//         try {
//             const url = "https://mdl-coaching.onrender.com/timetable/addTimetable";

//             const response = await axios.post(url, {
//                 "table": file
//             }, {
//                 headers: {
//                     "Content-Type": "multipart/form-data",
//                 },
//             });

//             console.log("this is the response data::: " + response.data);
//             const { message, success, error } = await response.data;

//             if (success) {
//                 toast.success(message, {
//                     position: "top-center",
//                     autoClose: 2000,
//                 });
//                 gettables()
//             } else if (error) {
//                 console.log(error);
//                 const details = error?.details[0].message;
//                 toast.error(details, {
//                     position: "top-center",
//                     autoClose: 2000,
//                 });
//             } else {
//                 toast.error(message, {
//                     position: "top-center",
//                     autoClose: 2000,
//                 });
//             }
//         } catch (error) {
//             toast.error(error, {
//                 position: "top-center",
//                 autoClose: 2000,
//             });
//         }
//     };

//     const handleDelete = async (id) => {
//         try {
//             const response = await axios.get(`https://mdl-coaching.onrender.com/timetable/delete/${id}`)
//             if (response.data.success) {
//                 toast.success(response.data.message, {
//                     position: "top-center",
//                     autoClose: 2000,
//                 });
//             } else {
//                 toast.error("Delete Failed", {
//                     position: "top-center",
//                     autoClose: 2000,
//                 });
//             }
//         } catch (error) {
//             console.log("Error For Deleting", error)
//         }
//         gettables()
//         setUploadedFiles(uploadedFiles.filter(file => file.id !== id));
//     };

//     return (
//         <div className="flex flex-col min-h-screen">
//             <Header />

//             <div className="flex flex-col md:flex-row flex-1 p-4 sm:p-6 md:p-10 bg-[#454649] min-h-screen">
//                 <div className="w-full md:w-1/2 bg-transparent p-6 mt-10">
//                     <h1 className="text-white text-2xl mb-4">Upload Timetable</h1>

//                     <label className="text-white block mb-2">Upload File:</label>
//                     <input
//                         type="file"
//                         className="p-2 rounded-md mb-4 w-full text-white bg-gray-800 border border-gray-600"
//                         onChange={handleFileChange}
//                     />

//                     {file && <p className="text-white mt-2">Selected File: {file.name}</p>}

//                     <button
//                         className="mt-4 p-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 w-full"
//                         onClick={handleSubmit}
//                     >
//                         Add Timetable
//                     </button>
//                 </div>
//                 {uploadedFiles.length > 0 ? (
//                     <aside className="w-full md:w-1/2 bg-gray-700 p-6 mt-10 rounded-lg text-center overflow-x-auto">
//                         <h2 className="text-white text-xl mb-4">Uploaded Timetables</h2>
//                         <div className="mt-4">
//                             <table className="w-full text-white border-collapse border border-gray-500">
//                                 <thead>
//                                     <tr className="bg-gray-800 text-sm md:text-base">
//                                         <th className="border border-gray-500 p-2">Serial No</th>
//                                         <th className="border border-gray-500 p-2">File Name</th>
//                                         <th className="border border-gray-500 p-2">Date</th>
//                                         <th className="border border-gray-500 p-2">Time</th>
//                                         <th className="border border-gray-500 p-2">Actions</th>
//                                     </tr>
//                                 </thead>
//                                 <tbody>
//                                     {uploadedFiles.map((file, index) => (
//                                         <tr key={file.id} className="bg-gray-600 text-sm md:text-base">
//                                             <td className="border border-gray-500 p-2">{index + 1}</td>
//                                             <td className="border border-gray-500 p-2">{file.filename}</td>
//                                             <td className="border border-gray-500 p-2">{file.date}</td>
//                                             <td className="border border-gray-500 p-2">{file.time}</td>
//                                             <td className="border border-gray-500 p-2">
//                                                 <button
//                                                     className="bg-red-500 text-white p-1 rounded hover:bg-red-600"
//                                                     onClick={() => handleDelete(file._id)}
//                                                 >
//                                                     Delete
//                                                 </button>
//                                             </td>
//                                         </tr>
//                                     ))}
//                                 </tbody>
//                             </table>
//                         </div>
//                     </aside>
//                 ) : (
//                     <div className="w-full md:w-1/2 p-6 mt-32 rounded-lg text-center">
//                         <p className="text-white text-lg">No timetables uploaded yet.</p>
//                     </div>
//                 )}

//             </div>

//             <Footer />
//             <ToastContainer />
//         </div>
//     );
// };
// import Header from '../Home/Header';
// import Footer from '../Home/Footer';
// import { useEffect, useState } from 'react';
// import { toast, ToastContainer } from 'react-toastify';
// import axios from 'axios';
// import { motion, AnimatePresence } from 'framer-motion';

// export const Timetable = () => {
//     const [file, setFile] = useState(null);
//     const [uploadedFiles, setUploadedFiles] = useState([]);
//     const [loading, setLoading] = useState(true);

//     const handleFileChange = (event) => {
//         setFile(event.target.files[0]);
//     };

//     useEffect(() => {
//         gettables();
//     }, []);

//     const gettables = async () => {
//         try {
//             const response = await axios.get("https://mdl-coaching.onrender.com/timetable/getTimetable");
//             setUploadedFiles(response.data.data);
//         } catch (error) {
//             console.log("Error for Gettable", error);
//         } finally {
//             setTimeout(() => setLoading(false), 1000); // Add slight delay for effect
//         }
//     };

//     const handleSubmit = async () => {
//         if (!file) {
//             return toast.error("File is Required", {
//                 position: "top-center",
//                 autoClose: 2000,
//             });
//         }
//         try {
//             const formData = new FormData();
//             formData.append("table", file);

//             const url = "https://mdl-coaching.onrender.com/timetable/addTimetable";

//             const response = await axios.post(url, formData, {
//                 headers: {
//                     "Content-Type": "multipart/form-data",
//                 },
//             });

//             const { message, success, error } = response.data;

//             if (success) {
//                 toast.success(message, {
//                     position: "top-center",
//                     autoClose: 2000,
//                 });
//                 gettables();
//             } else {
//                 toast.error(error?.details?.[0]?.message || message, {
//                     position: "top-center",
//                     autoClose: 2000,
//                 });
//             }
//         } catch (error) {
//             toast.error("Upload Failed", {
//                 position: "top-center",
//                 autoClose: 2000,
//             });
//         }
//     };

//     const handleDelete = async (id) => {
//         try {
//             const response = await axios.get(`https://mdl-coaching.onrender.com/timetable/delete/${id}`);
//             if (response.data.success) {
//                 toast.success(response.data.message, {
//                     position: "top-center",
//                     autoClose: 2000,
//                 });
//             } else {
//                 toast.error("Delete Failed", {
//                     position: "top-center",
//                     autoClose: 2000,
//                 });
//             }
//         } catch (error) {
//             console.log("Error For Deleting", error);
//         }
//         gettables();
//         setUploadedFiles(uploadedFiles.filter(file => file.id !== id));
//     };

//     const containerVariants = {
//         hidden: { opacity: 0 },
//         visible: {
//             opacity: 1,
//             transition: {
//                 staggerChildren: 0.2
//             }
//         }
//     };

//     const itemVariants = {
//         hidden: { opacity: 0, y: 20 },
//         visible: { opacity: 1, y: 0 }
//     };

//     return (
//         <div className="flex flex-col min-h-screen">
//             <Header />

//             <div className="flex flex-col md:flex-row flex-1 p-4 sm:p-6 md:p-10 bg-[#454649] min-h-screen">
//                 {loading ? (
//                     <div className="flex justify-center items-center w-full h-[60vh]">
//                         <motion.div
//                             className="w-16 h-16 border-4 border-white border-t-blue-500 rounded-full animate-spin"
//                             initial={{ rotate: 0 }}
//                             animate={{ rotate: 360 }}
//                             transition={{ repeat: Infinity, duration: 1, ease: "linear" }}
//                         />
//                     </div>
//                 ) : (
//                     <AnimatePresence>
//                         <motion.div
//                             className="w-full md:w-1/2 p-6 mt-10"
//                             variants={containerVariants}
//                             initial="hidden"
//                             animate="visible"
//                         >
//                             <motion.h1 className="text-white text-2xl mb-4" variants={itemVariants}>
//                                 Upload Timetable
//                             </motion.h1>

//                             <motion.label className="text-white block mb-2" variants={itemVariants}>
//                                 Upload File:
//                             </motion.label>
//                             <motion.input
//                                 type="file"
//                                 className="p-2 rounded-md mb-4 w-full text-white bg-gray-800 border border-gray-600"
//                                 onChange={handleFileChange}
//                                 variants={itemVariants}
//                             />
//                             {file && (
//                                 <motion.p className="text-white mt-2" variants={itemVariants}>
//                                     Selected File: {file.name}
//                                 </motion.p>
//                             )}

//                             <motion.button
//                                 className="mt-4 p-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 w-full"
//                                 onClick={handleSubmit}
//                                 variants={itemVariants}
//                             >
//                                 Add Timetable
//                             </motion.button>
//                         </motion.div>

//                         <motion.div
//                             className="w-full md:w-1/2 p-6 mt-10 rounded-lg text-center overflow-x-auto"
//                             variants={containerVariants}
//                             initial="hidden"
//                             animate="visible"
//                         >
//                             {uploadedFiles.length > 0 ? (
//                                 <>
//                                     <motion.h2 className="text-white text-xl mb-4" variants={itemVariants}>
//                                         Uploaded Timetables
//                                     </motion.h2>
//                                     <motion.div className="mt-4" variants={itemVariants}>
//                                         <table className="w-full text-white border-collapse border border-gray-500">
//                                             <thead>
//                                                 <tr className="bg-gray-800 text-sm md:text-base">
//                                                     <th className="border border-gray-500 p-2">Serial No</th>
//                                                     <th className="border border-gray-500 p-2">File Name</th>
//                                                     <th className="border border-gray-500 p-2">Date</th>
//                                                     <th className="border border-gray-500 p-2">Time</th>
//                                                     <th className="border border-gray-500 p-2">Actions</th>
//                                                 </tr>
//                                             </thead>
//                                             <tbody>
//                                                 {uploadedFiles.map((file, index) => (
//                                                     <motion.tr
//                                                         key={file.id}
//                                                         className="bg-gray-600 text-sm md:text-base"
//                                                         variants={itemVariants}
//                                                     >
//                                                         <td className="border border-gray-500 p-2">{index + 1}</td>
//                                                         <td className="border border-gray-500 p-2">{file.filename}</td>
//                                                         <td className="border border-gray-500 p-2">{file.date}</td>
//                                                         <td className="border border-gray-500 p-2">{file.time}</td>
//                                                         <td className="border border-gray-500 p-2">
//                                                             <button
//                                                                 className="bg-red-500 text-white p-1 rounded hover:bg-red-600"
//                                                                 onClick={() => handleDelete(file._id)}
//                                                             >
//                                                                 Delete
//                                                             </button>
//                                                         </td>
//                                                     </motion.tr>
//                                                 ))}
//                                             </tbody>
//                                         </table>
//                                     </motion.div>
//                                 </>
//                             ) : (
//                                 <motion.p className="text-white text-lg mt-32" variants={itemVariants}>
//                                     No timetables uploaded yet.
//                                 </motion.p>
//                             )}
//                         </motion.div>
//                     </AnimatePresence>
//                 )}
//             </div>

//             <Footer />
//             <ToastContainer />
//         </div>
//     );
// };
import Header from '../Home/Header';
import Footer from '../Home/Footer';
import { useEffect, useState } from 'react';
import { toast, ToastContainer } from 'react-toastify';
import axios from 'axios';
import { motion, AnimatePresence } from 'framer-motion';

export const Timetable = () => {
    const [file, setFile] = useState(null);
    const [uploadedFiles, setUploadedFiles] = useState([]);
    const [loading, setLoading] = useState(true);

    const handleFileChange = (event) => {
        setFile(event.target.files[0]);
    };

    useEffect(() => {
        gettables();
    }, []);

    const gettables = async () => {
        try {
            const response = await axios.get("https://mdl-coaching.onrender.com/timetable/getTimetable");
            setUploadedFiles(response.data.data);
        } catch (error) {
            console.log("Error for Gettable", error);
        } finally {
            setTimeout(() => setLoading(false), 1000); // Add slight delay for effect
        }
    };

    const handleSubmit = async () => {
        if (!file) {
            return toast.error("File is Required", {
                position: "top-center",
                autoClose: 2000,
            });
        }
        try {
            const formData = new FormData();
            formData.append("table", file);

            const url = "https://mdl-coaching.onrender.com/timetable/addTimetable";

            const response = await axios.post(url, formData, {
                headers: {
                    "Content-Type": "multipart/form-data",
                },
            });

            const { message, success, error } = response.data;

            if (success) {
                toast.success(message, {
                    position: "top-center",
                    autoClose: 2000,
                });
                gettables();
            } else {
                toast.error(error?.details?.[0]?.message || message, {
                    position: "top-center",
                    autoClose: 2000,
                });
            }
        } catch (error) {
            toast.error("Upload Failed", {
                position: "top-center",
                autoClose: 2000,
            });
        }
    };

    const handleDelete = async (id) => {
        try {
            const response = await axios.get(`https://mdl-coaching.onrender.com/timetable/delete/${id}`);
            if (response.data.success) {
                toast.success(response.data.message, {
                    position: "top-center",
                    autoClose: 2000,
                });
            } else {
                toast.error("Delete Failed", {
                    position: "top-center",
                    autoClose: 2000,
                });
            }
        } catch (error) {
            console.log("Error For Deleting", error);
        }
        gettables();
        setUploadedFiles(uploadedFiles.filter(file => file._id !== id));
    };

    const containerVariants = {
        hidden: { opacity: 0 },
        visible: {
            opacity: 1,
            transition: {
                staggerChildren: 0.2
            }
        }
    };

    const itemVariants = {
        hidden: { opacity: 0, y: 20 },
        visible: { opacity: 1, y: 0 }
    };

    return (
        <div className="flex flex-col min-h-screen">
            <Header />

            <div className="flex flex-col md:flex-row flex-1 p-4 sm:p-6 md:p-10 bg-[#454649] min-h-screen">
                {loading ? (
                    <div className="flex justify-center items-center w-full h-[60vh]">
                        <motion.div
                            className="w-16 h-16 border-4 border-white border-t-blue-500 rounded-full animate-spin"
                            initial={{ rotate: 0 }}
                            animate={{ rotate: 360 }}
                            transition={{ repeat: Infinity, duration: 1, ease: "linear" }}
                        />
                    </div>
                ) : (
                    <AnimatePresence>
                        <motion.div
                            key="upload-section"
                            className="w-full md:w-1/2 p-6 mt-10"
                            variants={containerVariants}
                            initial="hidden"
                            animate="visible"
                        >
                            <motion.h1 className="text-white text-2xl mb-4" variants={itemVariants}>
                                Upload Timetable
                            </motion.h1>

                            <motion.label className="text-white block mb-2" variants={itemVariants}>
                                Upload File:
                            </motion.label>
                            <motion.input
                                type="file"
                                className="p-2 rounded-md mb-4 w-full text-white bg-gray-800 border border-gray-600"
                                onChange={handleFileChange}
                                variants={itemVariants}
                            />
                            {file && (
                                <motion.p className="text-white mt-2" variants={itemVariants}>
                                    Selected File: {file.name}
                                </motion.p>
                            )}

                            <motion.button
                                className="mt-4 p-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 w-full"
                                onClick={handleSubmit}
                                variants={itemVariants}
                            >
                                Add Timetable
                            </motion.button>
                        </motion.div>

                        <motion.div
                            key="table-section"
                            className="w-full md:w-1/2 p-6 mt-10 rounded-lg text-center overflow-x-auto"
                            variants={containerVariants}
                            initial="hidden"
                            animate="visible"
                        >
                            {uploadedFiles.length > 0 ? (
                                <>
                                    <motion.h2 className="text-white text-xl mb-4" variants={itemVariants}>
                                        Uploaded Timetables
                                    </motion.h2>
                                    <motion.div className="mt-4" variants={itemVariants}>
                                        <table className="w-full text-white border-collapse border border-gray-500">
                                            <thead>
                                                <tr className="bg-gray-800 text-sm md:text-base">
                                                    <th className="border border-gray-500 p-2">Serial No</th>
                                                    <th className="border border-gray-500 p-2">File Name</th>
                                                    <th className="border border-gray-500 p-2">Date</th>
                                                    <th className="border border-gray-500 p-2">Time</th>
                                                    <th className="border border-gray-500 p-2">Actions</th>
                                                </tr>
                                            </thead>
                                            <tbody>
                                                {uploadedFiles.map((file, index) => (
                                                    <motion.tr
                                                        key={file._id || `${file.filename}-${index}`}
                                                        className="bg-gray-600 text-sm md:text-base"
                                                        variants={itemVariants}
                                                    >
                                                        <td className="border border-gray-500 p-2">{index + 1}</td>
                                                        <td className="border border-gray-500 p-2">{file.filename}</td>
                                                        <td className="border border-gray-500 p-2">{file.date}</td>
                                                        <td className="border border-gray-500 p-2">{file.time}</td>
                                                        <td className="border border-gray-500 p-2">
                                                            <button
                                                                className="bg-red-500 text-white p-1 rounded hover:bg-red-600"
                                                                onClick={() => handleDelete(file._id)}
                                                            >
                                                                Delete
                                                            </button>
                                                        </td>
                                                    </motion.tr>
                                                ))}
                                            </tbody>
                                        </table>
                                    </motion.div>
                                </>
                            ) : (
                                <motion.p className="text-white text-lg mt-32" variants={itemVariants}>
                                    No timetables uploaded yet.
                                </motion.p>
                            )}
                        </motion.div>
                    </AnimatePresence>
                )}
            </div>

            <Footer />
            <ToastContainer />
        </div>
    );
};
