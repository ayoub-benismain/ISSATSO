import React, { useState } from "react";
import { Users, Save, Search } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

const classesData = ["LSI A1-01", "LSI A1-02", "ING A2-02"];
const studentsData = {
  "LSI A1-01": [
    { id: "S101", name: "Ali Ben Salah", email: "ali.salah@issatso.tn" },
    { id: "S102", name: "Meriem Kacem", email: "meriem.kacem@issatso.tn" },
    { id: "S103", name: "Karim Trabelsi", email: "karim.trabelsi@issatso.tn" },
  ],
  "LSI A1-02": [
    { id: "S201", name: "Youssef Trabelsi", email: "youssef.trabelsi@issatso.tn" },
    { id: "S202", name: "Sara Ben Romdhane", email: "sara.romdhane@issatso.tn" },
  ],
  "ING A2-02": [
    { id: "S301", name: "Omar Jaziri", email: "omar.jaziri@issatso.tn" },
    { id: "S302", name: "Aya Fakhfakh", email: "aya.fakhfakh@issatso.tn" },
  ],
};

export default function Grades() {
  const [selectedClass, setSelectedClass] = useState("");
  const [grades, setGrades] = useState({});
  const [searchOpen, setSearchOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");

  const studentsList = selectedClass ? studentsData[selectedClass] || [] : [];
  const filteredStudents = studentsList.filter(
    (s) =>
      s.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      s.id.toLowerCase().includes(searchQuery.toLowerCase()) ||
      s.email.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const handleGradeChange = (id, type, value) => {
    setGrades((prev) => ({
      ...prev,
      [id]: { ...prev[id], [type]: Number(value) },
    }));
  };

  const calculateTotal = (id) => {
    const g = grades[id] || {};
    const total = (g.ds || 0) * 0.1 + (g.tp || 0) * 0.2 + (g.exam || 0) * 0.7;
    return total.toFixed(2);
  };

  return (
    <div className="flex lg:flex-row flex-col lg:w-full w-screen min-h-full">
      {/* LEFT PANEL - Classes */}
      <div className="lg:w-1/5 border-r border-gray-200 p-6 flex flex-col items-center gap-3">
        <div className="flex items-center gap-2 mb-3">
          <Users size={22} className="text-blue-600" />
          <h2 className="text-xl font-semibold text-gray-800">Classes</h2>
        </div>
        {classesData.map((cls) => (
          <motion.button
            key={cls}
            onClick={() => {
              setSelectedClass(cls);
              setGrades({});
            }}
            whileTap={{ scale: 0.97 }}
            className={`text-left px-4 py-2 rounded-lg font-medium transition ${
              selectedClass === cls
                ? "bg-blue-600 text-white shadow-md"
                : "bg-gray-100 hover:bg-blue-100 text-gray-700"
            }`}
          >
            {cls}
          </motion.button>
        ))}
      </div>

      {/* RIGHT PANEL - Students Table */}
      <div className="lg:w-4/5 p-8 relative">
        {/* Header */}
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-3xl font-bold text-gray-800">
            {selectedClass ? `Grades` : "Select a Class"}
          </h2>

          {/* Search bar */}
          <div className="relative flex items-center">
            <motion.button
              onClick={() => setSearchOpen((prev) => !prev)}
              className="p-2 bg-blue-500 text-white rounded-full hover:bg-blue-600 transition"
              whileTap={{ scale: 0.9 }}
            >
              <Search size={18} />
            </motion.button>

            <AnimatePresence>
              {searchOpen && (
                <motion.input
                  initial={{ width: 0, opacity: 0 }}
                  animate={{ width: 200, opacity: 1 }}
                  exit={{ width: 0, opacity: 0 }}
                  transition={{ duration: 0.3 }}
                  type="text"
                  placeholder="Search..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="ml-2 px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400 text-sm"
                />
              )}
            </AnimatePresence>
          </div>
        </div>

        {/* Table */}
        {selectedClass ? (
          <div className="overflow-x-auto bg-white shadow-md rounded-xl border border-gray-200">
            <table className="min-w-full text-sm text-gray-700">
              <thead className="bg-blue-100 text-gray-800 text-sm uppercase tracking-wide">
                <tr>
                  <th className="py-3 px-6 text-left">ID</th>
                  <th className="py-3 px-6 text-left">Name</th>
                  <th className="py-3 px-6 text-left">Email</th>
                  <th className="py-3 px-6 text-left">DS (10%)</th>
                  <th className="py-3 px-6 text-left">TP (20%)</th>
                  <th className="py-3 px-6 text-left">Exam (70%)</th>
                  <th className="py-3 px-6 text-left">Total</th>
                </tr>
              </thead>
              <tbody>
                {filteredStudents.map((s, idx) => (
                  <tr
                    key={s.id}
                    className={`transition hover:bg-blue-50 ${
                      idx % 2 === 0 ? "bg-white" : "bg-gray-50"
                    }`}
                  >
                    <td className="py-3 px-6 font-medium">{s.id}</td>
                    <td className="py-3 px-6">{s.name}</td>
                    <td className="py-3 px-6 text-gray-500">{s.email}</td>
                    <td className="py-3 px-6">
                      <input
                        type="number"
                        value={grades[s.id]?.ds || ""}
                        onChange={(e) =>
                          handleGradeChange(s.id, "ds", e.target.value)
                        }
                        className="w-16 px-2 py-1 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-400 focus:outline-none"
                      />
                    </td>
                    <td className="py-3 px-6">
                      <input
                        type="number"
                        value={grades[s.id]?.tp || ""}
                        onChange={(e) =>
                          handleGradeChange(s.id, "tp", e.target.value)
                        }
                        className="w-16 px-2 py-1 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-400 focus:outline-none"
                      />
                    </td>
                    <td className="py-3 px-6">
                      <input
                        type="number"
                        value={grades[s.id]?.exam || ""}
                        onChange={(e) =>
                          handleGradeChange(s.id, "exam", e.target.value)
                        }
                        className="w-16 px-2 py-1 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-400 focus:outline-none"
                      />
                    </td>
                    <td
                      className={`py-3 px-6 font-semibold ${
                        calculateTotal(s.id) >= 10
                          ? "text-green-600"
                          : "text-red-500"
                      }`}
                    >
                      {calculateTotal(s.id)}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        ) : (
          <div className="text-center text-gray-500 mt-20 text-lg">
            Please select a class to view grades 📘
          </div>
        )}

        {/* Submit Button */}
        {selectedClass && (
          <motion.div
            className="fixed bottom-6 right-6"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
          >
            <button className="gap-2 bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-full shadow-lg transition">
              <Save size={18} />
            </button>
          </motion.div>
        )}
      </div>
    </div>
  );
}
