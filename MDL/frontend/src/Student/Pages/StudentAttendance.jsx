
import Header from '../Header';
import Footer from '../Footer';
import React, { useState, useEffect } from "react";
import axios from "axios";

export const StudentAttendance = () => {
    const [attendanceData, setAttendanceData] = useState([]);
    const [showTable, setShowTable] = useState({});
    const [user, setUser] = useState(null);

    useEffect(() => {
        fetchAttendance();
        // Simulate logged-in user
        setUser({ _id: localStorage.getItem('studentid') }); // Example user
    }, []);

    const fetchAttendance = async () => {
        try {
            const res = await axios.get("https://mdl-coaching.onrender.com/attendance/getattendence");
            groupDataByDate(res.data.data);
        } catch (error) {
            console.error(error);
        }
    };

    const groupDataByDate = (data) => {
        const groupedData = data.reduce((acc, record) => {
            if (!acc[record.date]) {
                acc[record.date] = [];
            }
            acc[record.date].push(record);
            return acc;
        }, {});

        const formatted = Object.entries(groupedData).map(([date, records]) => ({
            date,
            records
        }));

        setAttendanceData(formatted);
    };

    const toggleTableVisibility = (date) => {
        setShowTable(prev => ({
            ...prev,
            [date]: !prev[date],
        }));
    };

    return (
        <div className="flex flex-col min-h-screen">
            <Header />

            <div className="flex-grow mt-16 p-4 w-full">
                <h1 className="text-3xl font-bold mb-6">📋 Attendance</h1>

                <div className="space-y-6">
                    {attendanceData.map(({ date, records }) => {
                        // Filter the records to only those for the logged-in user
                        const userRecords = records.filter(record => 
                            record.records.some(r => r.studentId === user?._id)
                        );

                        if (userRecords.length === 0) return null;

                        return (
                            <React.Fragment key={date}>
                                <div 
                                    className="text-lg font-semibold bg-green-200 text-gray-800 px-4 py-2 rounded shadow-sm cursor-pointer"
                                    onClick={() => toggleTableVisibility(date)}
                                >
                                    {date}
                                </div>

                                {showTable[date] && (
                                    <div className="overflow-x-auto">
                                        <table className="min-w-full table-auto border border-gray-300 rounded-lg">
                                            <thead className="bg-gray-100">
                                                <tr>
                                                    <th className="px-6 py-3 text-left text-sm font-medium text-gray-700 border-b">Subject</th>
                                                    <th className="px-6 py-3 text-left text-sm font-medium text-gray-700 border-b">Status</th>
                                                </tr>
                                            </thead>
                                            <tbody>
                                                {userRecords.map((record, index) => {
                                                    const userRecord = record.records.find(r => r.studentId === user?._id);
                                                    return (
                                                        <tr key={index} className="hover:bg-gray-50">
                                                            <td className="px-6 py-4 text-gray-800 border-b">{record.subject}</td>
                                                            <td className={`px-6 py-4 font-semibold border-b ${userRecord.status === 'Present' ? 'text-green-600' : 'text-red-600'}`}>
                                                                {userRecord.status}
                                                            </td>
                                                        </tr>
                                                    );
                                                })}
                                            </tbody>
                                        </table>
                                    </div>
                                )}
                            </React.Fragment>
                        );
                    })}
                </div>
            </div>

            <Footer />
        </div>
    );
};
// import React, { useState, useEffect } from "react";
// import axios from "axios";
// import Header from "../Header";
// import Footer from "../Footer";

// export const StudentAttendance = () => {
//     const [attendanceData, setAttendanceData] = useState([]);
//     const [showTable, setShowTable] = useState({});
//     const [user, setUser] = useState(null);

//     useEffect(() => {
//         // ✅ Step 1: Get logged-in user from localStorage
//         const storedUser = JSON.parse(localStorage.getItem("_id"));
//         if (storedUser && storedUser._id) {
//             setUser(storedUser);
//         }

//         // ✅ Step 2: Fetch attendance
//         fetchAttendance();
//     }, []);

//     const fetchAttendance = async () => {
//         try {
//             const res = await axios.get("https://mdl-coaching.onrender.com/attendance/getattendence");
//             groupDataByDate(res.data.data);
//         } catch (error) {
//             console.error("Error fetching attendance:", error);
//         }
//     };

//     const groupDataByDate = (data) => {
//         const groupedData = data.reduce((acc, record) => {
//             if (!acc[record.date]) acc[record.date] = [];
//             acc[record.date].push(record);
//             return acc;
//         }, {});

//         const formatted = Object.entries(groupedData).map(([date, records]) => ({
//             date,
//             records
//         }));

//         setAttendanceData(formatted);
//     };

//     const toggleTableVisibility = (date) => {
//         setShowTable(prev => ({
//             ...prev,
//             [date]: !prev[date],
//         }));
//     };

//     return (
//         <div className="flex flex-col min-h-screen">
//             <Header />

//             <div className="flex-grow mt-16 p-4 w-full">
//                 <h1 className="text-3xl font-bold mb-6">📋 Attendance</h1>

//                 {/* ✅ Display User ID */}
//                 {user && (
//                     <div className="mb-4 text-sm text-gray-600">
//                         Logged in Student ID: <span className="font-semibold text-blue-600">{user._id}</span>
//                     </div>
//                 )}

//                 <div className="space-y-6">
//                     {attendanceData.map(({ date, records }) => {
//                         const userRecords = records.filter(record =>
//                             record.records.some(r => r.studentId === user?._id)
//                         );

//                         if (userRecords.length === 0) return null;

//                         return (
//                             <React.Fragment key={date}>
//                                 <div
//                                     className="text-lg font-semibold bg-green-200 text-gray-800 px-4 py-2 rounded shadow-sm cursor-pointer"
//                                     onClick={() => toggleTableVisibility(date)}
//                                 >
//                                     {date}
//                                 </div>

//                                 {showTable[date] && (
//                                     <div className="overflow-x-auto">
//                                         <table className="min-w-full table-auto border border-gray-300 rounded-lg">
//                                             <thead className="bg-gray-100">
//                                                 <tr>
//                                                     <th className="px-6 py-3 text-left text-sm font-medium text-gray-700 border-b">Subject</th>
//                                                     <th className="px-6 py-3 text-left text-sm font-medium text-gray-700 border-b">Status</th>
//                                                 </tr>
//                                             </thead>
//                                             <tbody>
//                                                 {userRecords.map((record, index) => {
//                                                     const userRecord = record.records.find(r => r.studentId === user?._id);
//                                                     return (
//                                                         <tr key={index} className="hover:bg-gray-50">
//                                                             <td className="px-6 py-4 text-gray-800 border-b">{record.subject}</td>
//                                                             <td className={`px-6 py-4 font-semibold border-b ${userRecord.status === 'Present' ? 'text-green-600' : 'text-red-600'}`}>
//                                                                 {userRecord.status}
//                                                             </td>
//                                                         </tr>
//                                                     );
//                                                 })}
//                                             </tbody>
//                                         </table>
//                                     </div>
//                                 )}
//                             </React.Fragment>
//                         );
//                     })}
//                 </div>
//             </div>

//             <Footer />
//         </div>
//     );
// };
