import React from "react";
import Header from "../Header";
import Footer from "../Footer";

const holidays = [
  { name: "New Year", date: "Jan 1", color: "bg-blue-500" },
  { name: "Makarsankranti", date: "Jan 14", color: "bg-orange-500" },
  { name: "Republic Day", date: "Jan 26", color: "bg-red-600" },
  { name: "Maha Shivratri", date: "Feb 26", color: "bg-purple-600" },
  { name: "Holi", date: "Mar 14", color: "bg-pink-500" },
  { name: "Eid al-Fitr", date: "Mar 31", color: "bg-green-500" },
  { name: "Ram Navami", date: "Apr 6", color: "bg-yellow-600" },
  { name: "Ambedkar Jayanti", date: "Apr 14", color: "bg-blue-600" },
  { name: "Good Friday", date: "Apr 18", color: "bg-gray-700" },
  { name: "Eid al-Adha", date: "Jun 7", color: "bg-green-700" },
  { name: "Muharram", date: "Jul 6", color: "bg-gray-800" },
  { name: "Raksha Bandhan", date: "Aug 9", color: "bg-purple-500" },
  { name: "Independence Day", date: "Aug 15", color: "bg-indigo-600" },
  { name: "Janmashtami", date: "Aug 16", color: "bg-yellow-500" },
  { name: "Milad-un-Nabi", date: "Sep 5", color: "bg-green-600" },
  { name: "Gandhi Jayanti", date: "Oct 2", color: "bg-teal-600" },
  { name: "Karwa Chauth", date: "Oct 10", color: "bg-pink-600" },
  { name: "Dussehra", date: "Oct 12", color: "bg-red-500" },
  { name: "Diwali", date: "Oct 20", color: "bg-orange-600" },
  { name: "Govardhan Puja", date: "Oct 22", color: "bg-yellow-600" },
  { name: "Bhai Dooj", date: "Oct 23", color: "bg-red-700" },
  { name: "Chhath Puja", date: "Oct 28", color: "bg-orange-700" },
  { name: "Christmas", date: "Dec 25", color: "bg-red-500" }
];

const StudentHoliday = () => {
  return (
    <div className="flex flex-col min-h-screen">
      {/* Header */}
      <Header />

      {/* Main Content */}
      <div className="flex-grow flex items-center justify-center p-6 sm:p-10">
        <div className="max-w-5xl w-full">
          <h3 className="text-4xl font-bold text-center text-black p-8 mb-10">
            HOLIDAY DETAILS (2025)
          </h3>
          
          {/* Holiday Table */}
          <div className="overflow-x-auto">
            <table className="min-w-full border border-gray-300 shadow-lg">
              <thead>
                <tr className="bg-gray-800 text-white">
                  <th className="px-6 py-3 border border-gray-400">Holiday</th>
                  <th className="px-6 py-3 border border-gray-400">Date</th>
                </tr>
              </thead>
              <tbody>
                {holidays.map((holiday, index) => (
                  <tr key={index} className={`text-white ${holiday.color} text-center`}>
                    <td className="px-6 py-3 border border-gray-400 font-bold">{holiday.name}</td>
                    <td className="px-6 py-3 border border-gray-400">{holiday.date}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>

      {/* Footer */}
      <Footer />
    </div>
  );
};

export default StudentHoliday;