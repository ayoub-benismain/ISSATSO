import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronDown, BookOpen, Calendar, BarChart as BarChartIcon, Hash } from "lucide-react";
import { ResponsiveContainer, BarChart, Bar, XAxis, YAxis, Tooltip } from "recharts";

// Example results data
const resultsData = {
  "Semester 1": [
    { name: "Services des Réseaux", ds: 16, tp: 18, exam: 14, coefficient: 2 },
    { name: "Conception", ds: 15, tp: 17, exam: 16, coefficient: 2 },
    { name: "Programmation Java", ds: 17, tp: 19, exam: 16, coefficient: 3 },
    { name: "Programmation orientée objet", ds: 14, tp: 15, exam: 13, coefficient: 2 },
    { name: "Cryptographie", ds: 12, tp: 14, exam: 13, coefficient: 1 },
  ],
  "Semester 2": [
    { name: "Services des Réseaux", ds: 15, tp: 16, exam: 17, coefficient: 2 },
    { name: "Conception", ds: 16, tp: 17, exam: 15, coefficient: 2 },
    { name: "Programmation Java", ds: 18, tp: 18, exam: 19, coefficient: 3 },
    { name: "Programmation orientée objet", ds: 14, tp: 16, exam: 15, coefficient: 2 },
    { name: "Cryptographie", ds: 13, tp: 15, exam: 14, coefficient: 1 },
  ],
};

// Random mark generator for graph (dynamic feel)
const randomMark = (min = 10, max = 20) => Math.floor(Math.random() * (max - min + 1)) + min;

export default function ResultsStudent() {
  const [selectedSemester, setSelectedSemester] = useState("Semester 1");
  const [dropdownOpen, setDropdownOpen] = useState(false);

  const subjects = [...resultsData[selectedSemester]].sort((a, b) =>
    a.name.localeCompare(b.name)
  );

  // Graph data dynamically created from subjects
  const graphData = subjects.map((sub) => ({
    name: sub.name,
    "Semester 1": randomMark(),
    "Semester 2": randomMark(),
  }));

  const overallTotal = subjects.reduce(
    (acc, sub) => acc + ((sub.ds + sub.tp + sub.exam) / 3) * sub.coefficient,
    0
  ).toFixed(2);

  return (
    <div className="p-4 lg:p-6 lg:w-full min-h-screen">
      <h2 className="text-2xl font-bold text-gray-800 mb-6 text-center lg:text-left">
        My Results
      </h2>

      {/* Semester Selector */}
      <div className="flex justify-center lg:justify-start mb-6">
        <div className="relative w-48">
          <motion.div
            className="bg-white backdrop-blur-sm bg-opacity-80 rounded-3xl shadow-lg px-5 py-3 cursor-pointer flex justify-between items-center transition-all hover:shadow-2xl"
            onClick={() => setDropdownOpen((prev) => !prev)}
          >
            <span className="font-medium text-gray-700">{selectedSemester}</span>
            <ChevronDown
              size={20}
              className={`text-gray-500 transition-transform ${
                dropdownOpen ? "rotate-180" : ""
              }`}
            />
          </motion.div>

          <AnimatePresence>
            {dropdownOpen && (
              <motion.ul
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 5 }}
                exit={{ opacity: 0, y: -10 }}
                className="absolute w-full bg-white backdrop-blur-sm bg-opacity-90 shadow-2xl rounded-3xl mt-2 overflow-hidden z-50"
              >
                {Object.keys(resultsData).map((sem) => (
                  <li
                    key={sem}
                    className="px-5 py-3 hover:bg-blue-100 hover:text-blue-700 cursor-pointer transition flex items-center gap-2"
                    onClick={() => {
                      setSelectedSemester(sem);
                      setDropdownOpen(false);
                    }}
                  >
                    <BookOpen size={16} className="text-blue-500" /> {sem}
                  </li>
                ))}
              </motion.ul>
            )}
          </AnimatePresence>
        </div>
      </div>

      {/* Table */}
      <div className="overflow-x-auto">
        <div className="min-w-screen lg:min-w-full rounded-xl shadow-lg">
          <div className="flex bg-gray-100 text-gray-600 uppercase text-sm font-semibold rounded-t-xl">
            <div className="flex-1 px-2 py-3 flex items-center gap-2">
              <BookOpen size={14} /> Subject
            </div>
            <div className="w-14 px-2 py-3 text-center">
              <Calendar size={14} /> DS
            </div>
            <div className="w-14 px-2 py-3 text-center">
              <Calendar size={14} /> TP
            </div>
            <div className="w-14 px-2 py-3 text-center">
              <Calendar size={14} /> Exam
            </div>
            <div className="w-14 px-2 py-3 text-center">
              <BarChartIcon size={14} /> Final
            </div>
            <div className="w-14 px-2 py-3 text-center">
              <Hash size={14} /> Coef
            </div>
          </div>

          {subjects.map((sub, idx) => {
            const final = ((sub.ds + sub.tp + sub.exam) / 3).toFixed(1);
            return (
              <motion.div
                key={idx}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: idx * 0.05 }}
                className="flex items-center border-b border-gray-100 hover:bg-blue-50 transition-all cursor-pointer"
              >
                <div className="flex-1 px-3 py-3 font-medium text-gray-800">{sub.name}</div>
                <div className="w-14 px-2 py-3 text-center text-gray-600">{sub.ds}</div>
                <div className="w-14 px-2 py-3 text-center text-gray-600">{sub.tp}</div>
                <div className="w-14 px-2 py-3 text-center text-gray-600">{sub.exam}</div>
                <div className="w-14 px-2 py-3 text-center">
                  <span
                    className={`px-2 py-1 rounded-full text-white text-sm ${
                      final >= 16
                        ? "bg-green-500"
                        : final >= 12
                        ? "bg-yellow-400"
                        : "bg-red-500"
                    }`}
                  >
                    {final}
                  </span>
                </div>
                <div className="w-14 px-2 py-3 text-center text-gray-600">{sub.coefficient}</div>
              </motion.div>
            );
          })}
        </div>
      </div>

      {/* Overall Total */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.6 }}
        className="w-full mx-auto mt-8 lg:mt-10 bg-gradient-to-r from-blue-500 to-blue-600 text-white rounded-2xl p-6 shadow-2xl flex justify-center lg:justify-between items-center text-center lg:text-left"
      >
        <h3 className="text-xl lg:text-2xl font-bold">Overall Total /20</h3>
        <span className="text-2xl lg:text-3xl font-extrabold ml-4">
          {overallTotal}
        </span>
      </motion.div>

      {/* Graph */}
      <div className="mt-8 lg:mt-10 p-4 lg:p-6">
        <h3 className="text-xl lg:text-2xl font-semibold text-gray-800 mb-4 text-center">
          Subjects Progress Comparison
        </h3>
        <ResponsiveContainer width="100%" height={300}>
          <BarChart
            data={graphData}
            margin={{ top: 10, right: 20, left: 10, bottom: 10 }}
          >
            <XAxis dataKey="name" stroke="#6c83f5" />
            <YAxis stroke="#6c83f5" domain={[0, 20]} />
            <Tooltip />
            <Bar dataKey="Semester 1" fill="#facc15" radius={[5, 5, 0, 0]} />
            <Bar dataKey="Semester 2" fill="#f59e0b" radius={[5, 5, 0, 0]} />
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}
  