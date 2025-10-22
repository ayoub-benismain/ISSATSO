import React, { useState } from "react";
import { ResponsiveContainer, BarChart, Bar, XAxis, YAxis, Tooltip, Cell } from "recharts";

const subjects = [
  "Services des Réseaux",
  "Conception",
  "Programmation Java",
  "Programmation orientée objet",
  "Cryptographie",
];

const timeFilters = [ "Week", "Month", "Semester"];

const generateData = (filter) => {
  switch (filter) {
    case "Day":
      return Array.from({ length: 7 }, (_, i) => {
        const totalLessons = 3 + Math.floor(Math.random() * 4); // 3 to 6 lessons
        const presence = Math.floor(Math.random() * (totalLessons + 1));
        return {
          label: `Day ${i + 1}`,
          presence,
          absence: totalLessons - presence,
        };
      });
    case "Week":
      return Array.from({ length: 4 }, (_, i) => {
        const totalLessons = 20 + Math.floor(Math.random() * 5); // ~20–24 lessons per week
        const presence = Math.floor(Math.random() * (totalLessons + 1));
        return {
          label: `Week ${i + 1}`,
          presence,
          absence: totalLessons - presence,
        };
      });
    case "Month":
      return Array.from({ length: 6 }, (_, i) => {
        const totalLessons = 80 + Math.floor(Math.random() * 10); // ~80–90 lessons per month
        const presence = Math.floor(Math.random() * (totalLessons + 1));
        return {
          label: `Month ${i + 1}`,
          presence,
          absence: totalLessons - presence,
        };
      });
    case "Semester":
      return [{
        label: "Semester 1",
        presence: 450 + Math.floor(Math.random() * 50), // ~450–500 lessons
        absence: 20 + Math.floor(Math.random() * 10),   // ~20–30 absences
      }];
    default:
      return [];
  }
};

export default function Absence() {
  const [selectedSubject, setSelectedSubject] = useState(subjects[0]);
  const [selectedFilter, setSelectedFilter] = useState("Week");

  const chartData = generateData(selectedFilter);

  const totalPresence = chartData.reduce((acc, d) => acc + d.presence, 0);
  const totalAbsence = chartData.reduce((acc, d) => acc + (d.absence || 0), 0);
  const attendanceRate = ((totalPresence / (totalPresence + totalAbsence || 1)) * 100).toFixed(1);

  return (
    <div className="flex flex-col lg:flex-row min-h-full bg-gray-50 p-4 lg:p-8">
      {/* Left Panel */}
      <div className="lg:w-1/4 p-4 lg:p-6">
        <h2 className="text-2xl font-bold text-gray-800 mb-6">Subjects</h2>
        <ul className="space-y-3">
          {subjects.map((sub, idx) => (
            <li
              key={idx}
              onClick={() => setSelectedSubject(sub)}
              className={`cursor-pointer px-4 py-3 rounded-xl font-medium text-center transition-all
                ${selectedSubject === sub
                  ? "bg-blue-500 text-white shadow-lg scale-105"
                  : "bg-gray-200 text-gray-800 hover:bg-blue-100 hover:text-blue-700 hover:scale-105"
                }`}
            >
              {sub}
            </li>
          ))}
        </ul>
      </div>

      {/* Vertical Separator */}
      <div className="hidden lg:block w-px bg-gray-300 mx-6"></div>

      {/* Right Panel */}
      <div className="lg:w-3/4 p-4 lg:p-6 flex flex-col">
        {/* Header */}
        <div className="flex flex-col lg:flex-row justify-between items-center mb-6">
          <h2 className="text-2xl font-bold text-gray-800 mb-4 lg:mb-0">
            {selectedSubject} - Attendance
          </h2>

          {/* Time Filters */}
          <div className="flex flex-wrap gap-2">
            {timeFilters.map((filter) => (
              <button
                key={filter}
                onClick={() => setSelectedFilter(filter)}
                className={`px-4 py-2 rounded-full font-medium transition
                  ${selectedFilter === filter
                    ? "bg-blue-500 text-white shadow-lg"
                    : "bg-gray-200 text-gray-800 hover:bg-blue-100 hover:text-blue-700"
                  }`}
              >
                {filter}
              </button>
            ))}
          </div>
        </div>

        {/* Modern Chart */}
        <div className="flex-1 p-6">
          <ResponsiveContainer width="100%" height={350}>
            <BarChart data={chartData} margin={{ top: 20, right: 20, left: 0, bottom: 20 }}>
              <XAxis dataKey="label" stroke="#6470ff" />
              <YAxis stroke="#6470ff" />
              <Tooltip
                contentStyle={{ backgroundColor: "#ffffff", borderRadius: "10px", border: "none", boxShadow: "0 2px 8px rgba(0,0,0,0.1)" }}
                labelStyle={{ fontWeight: "bold", color: "#333" }}
              />
              <Bar dataKey="presence" radius={[10, 10, 0, 0]} fill="#facc15">
                {chartData.map((entry, index) => (
                  <Cell key={index} fill="#facc15" />
                ))}
              </Bar>
              {selectedFilter !== "Semester" && (
                <Bar dataKey="absence" radius={[10, 10, 0, 0]} fill="#6470ff">
                  {chartData.map((entry, index) => (
                    <Cell key={index} fill="#6470ff" />
                  ))}
                </Bar>
              )}
            </BarChart>
          </ResponsiveContainer>

          {/* Summary */}
          <div className="mt-6 flex flex-wrap justify-between gap-4 text-gray-800 font-medium">
            <span>Total Presence: <span className="font-bold">{totalPresence}</span></span>
            <span>Total Absence: <span className="font-bold">{totalAbsence}</span></span>
            <span>Attendance Rate: <span className="font-bold">{attendanceRate}%</span></span>
          </div>
        </div>
      </div>
    </div>
  );
}
