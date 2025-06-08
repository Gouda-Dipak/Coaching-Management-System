import React from "react";
import Header from "../Header";
import Footer from "../Footer";
import { PieChart, Pie, Cell, Tooltip, Legend } from "recharts";

const student = {
  name: "StudentName",
  results: [
    { subject: "Mathematics", marks: 89 },
    { subject: "Science", marks: 76 },
    { subject: "English", marks: 92 },
    { subject: "History", marks: 35 }, // Fail case
    { subject: "Geography", marks: 80 },
  ],
};

const totalMarks = student.results.reduce((sum, subject) => sum + subject.marks, 0);
const totalSubjects = student.results.length;
const percentage = (totalMarks / (totalSubjects * 100)) * 100;

const getOverallGrade = (percent) => {
  if (percent >= 90) return "A+";
  if (percent >= 80) return "A";
  if (percent >= 70) return "B+";
  if (percent >= 60) return "B";
  if (percent >= 50) return "C";
  if (percent >= 40) return "D";
  return "F";
};
const overallGrade = getOverallGrade(percentage);
const passFailStatus = overallGrade !== "F" ? "Pass" : "Fail";

const COLORS = ["#FF8042", "#00C49F", "#FFBB28", "#0088FE", "#A569BD"];

const StudentResult = () => {
  return (
    <div className="flex flex-col min-h-screen bg-gray-100">
      {/* Header */}
      <Header />

      {/* Main Content */}
      <div className="flex-grow flex flex-col items-center p-20">
        <h3 className="text-4xl font-bold text-gray-900 mb-10 text-center">
          {student.name}'s Marksheet
        </h3>

        <div className="flex flex-col md:flex-row items-center md:items-start justify-center w-full max-w-6xl bg-white p-6 rounded-lg shadow-lg">
          {/* Pie Chart Section */}
          <div className="w-full md:w-1/2 flex justify-center">
            <div className="p-4">
              <h4 className="text-2xl font-semibold text-gray-700 mb-4 text-center">
                Marks Distribution
              </h4>
              <PieChart width={350} height={350}>
                <Pie
                  data={student.results}
                  cx="50%"
                  cy="50%"
                  outerRadius={120}
                  fill="#8884d8"
                  dataKey="marks"
                  label
                >
                  {student.results.map((_, index) => (
                    <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                  ))}
                </Pie>
                <Tooltip />
                <Legend />
              </PieChart>
            </div>
          </div>

          {/* Table Section */}
          <div className="w-full md:w-1/2 px-4">
            <table className="w-full border-collapse border border-gray-300 text-center">
              <thead>
                <tr className="bg-gray-800 text-white">
                  <th className="border border-gray-300 px-4 py-2">Subject</th>
                  <th className="border border-gray-300 px-4 py-2">Marks</th>
                </tr>
              </thead>
              <tbody>
                {student.results.map((result, index) => (
                  <tr key={index} className={index % 2 === 0 ? "bg-gray-100" : "bg-gray-200"}>
                    <td className="border border-gray-300 px-4 py-2 font-semibold">
                      {result.subject}
                    </td>
                    <td className="border border-gray-300 px-4 py-2">{result.marks}</td>
                  </tr>
                ))}
                <tr className="bg-blue-300 font-bold">
                  <td className="border border-gray-300 px-4 py-2">Total Marks</td>
                  <td className="border border-gray-300 px-4 py-2">{totalMarks} / {totalSubjects * 100}</td>
                </tr>
                <tr className="bg-green-300 font-bold">
                  <td className="border border-gray-300 px-4 py-2">Percentage</td>
                  <td className="border border-gray-300 px-4 py-2">{percentage.toFixed(2)}%</td>
                </tr>
                <tr className="bg-yellow-300 font-bold">
                  <td className="border border-gray-300 px-4 py-2">Overall Grade</td>
                  <td className="border border-gray-300 px-4 py-2">{overallGrade}</td>
                </tr>
                <tr className="bg-red-300 font-bold">
                  <td className="border border-gray-300 px-4 py-2">Pass/Fail</td>
                  <td className="border border-gray-300 px-4 py-2">{passFailStatus}</td>
                </tr>
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

export default StudentResult;
