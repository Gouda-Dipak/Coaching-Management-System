
import React from "react";
import Header from "../Header";
import Footer from "../Footer";

const StudentFees = () => {
  return (
    <div className="flex flex-col h-screen bg-gradient-to-r from-blue-400 via-purple-500 to-pink-500 text-white">
      {/* Fixed Header */}
      <Header />

      {/* Scrollable Main Content */}
      <div className="flex-grow overflow-auto p-5 mt-20">
        <div className="max-w-3xl mx-auto bg-white text-gray-900 shadow-lg rounded-lg p-6">
          <h2 className="text-3xl font-bold text-center mb-6 text-indigo-600">
            Fees Payment Details 💰
          </h2>

          <div className="mb-6">
            <h1 className="text-xl font-semibold text-white bg-blue-600 p-3 rounded-lg shadow-md text-center">
              9 Div-A 🏫
            </h1>
          </div>

          <table className="w-full border border-gray-300 rounded-lg overflow-hidden">
            <tbody>
              <tr className="bg-green-200 text-gray-800 font-medium">
                <td className="p-4 border border-gray-300">Payable</td>
                <td className="p-4 border border-gray-300 font-semibold">₹2500</td>
              </tr>
              <tr className="bg-yellow-200 text-gray-800 font-medium">
                <td className="p-4 border border-gray-300">Paid</td>
                <td className="p-4 border border-gray-300 font-semibold">₹2500</td>
              </tr>
              <tr className="bg-red-200 text-gray-800 font-medium">
                <td className="p-4 border border-gray-300">Pending</td>
                <td className="p-4 border border-gray-300 font-semibold">₹0</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>

      {/* Fixed Footer */}
      <Footer />
    </div>
  );
};

export default StudentFees;
