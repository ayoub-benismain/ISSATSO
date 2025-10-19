import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Search, CheckCircle, XCircle } from "lucide-react";

const classesData = ["LSI A1-01", "LSI A1-02", "LSI A1-23", "ING A2-02"];

const studentsData = {
  "LSI A1-01": [
    { id: "S101", name: "Ali Ben Salah", email: "ali@example.com", subgroup: 1 },
    { id: "S102", name: "Meriem Kacem", email: "meriem@example.com", subgroup: 2 },
    { id: "S103", name: "Karim Trabelsi", email: "karim@example.com", subgroup: 1 },
    { id: "S104", name: "Hana Jaziri", email: "hana@example.com", subgroup: 2 },
  ],
  "LSI A1-02": [
    { id: "S201", name: "Youssef Trabelsi", email: "youssef@example.com", subgroup: 1 },
    { id: "S202", name: "Sara Ben Romdhane", email: "sara@example.com", subgroup: 2 },
    { id: "S203", name: "Amira Fakhfakh", email: "amira@example.com", subgroup: 1 },
    { id: "S204", name: "Omar Ghali", email: "omar@example.com", subgroup: 2 },
  ],
  "LSI A1-23": [
    { id: "S301", name: "Mohamed Saad", email: "mohamed@example.com", subgroup: 1 },
    { id: "S302", name: "Fatma Amri", email: "fatma@example.com", subgroup: 2 },
    { id: "S303", name: "Salma Hadded", email: "salma@example.com", subgroup: 1 },
    { id: "S304", name: "Anis Baccar", email: "anis@example.com", subgroup: 2 },
  ],
  "ING A2-02": [
    { id: "S401", name: "Houssem Riahi", email: "houssem@example.com", subgroup: 1 },
    { id: "S402", name: "Lina Feki", email: "lina@example.com", subgroup: 2 },
    { id: "S403", name: "Nawel Jebali", email: "nawel@example.com", subgroup: 1 },
    { id: "S404", name: "Maroua Triki", email: "maroua@example.com", subgroup: 2 },
  ],
};

export default function StudentsAttendance() {
  const [selectedClass, setSelectedClass] = useState(classesData[0]);
  const [selectedSubgroup, setSelectedSubgroup] = useState("All");
  const [searchOpen, setSearchOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [presenceState, setPresenceState] = useState({});

  const studentsList = selectedClass ? studentsData[selectedClass] || [] : [];

  const filteredStudents = studentsList.filter(
    (student) =>
      (selectedSubgroup === "All" || student.subgroup === Number(selectedSubgroup.split(" ")[1])) &&
      (student.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        student.id.toLowerCase().includes(searchQuery.toLowerCase()))
  );

  const togglePresence = (id) => {
    setPresenceState((prev) => ({
      ...prev,
      [id]: !prev[id],
    }));
  };

  const markAll = (status) => {
    const updated = {};
    filteredStudents.forEach((student) => {
      updated[student.id] = status;
    });
    setPresenceState(updated);
  };

  const handleSubmit = () => {
    // Handle attendance submission
    console.log("Submitted attendance:", presenceState);
    alert("Attendance submitted successfully ✅");
  };

  return (
    <div className="p-6 w-full flex flex-col lg:flex-row gap-6 relative">
      {/* Left Panel - Classes */}
      <div className="w-full lg:w-1/5 flex flex-col gap-2 text-gray-700">
        <h3 className="text-lg font-semibold mb-3">Classes</h3>
        {classesData.map((cls) => (
          <button
            key={cls}
            onClick={() => setSelectedClass(cls)}
            className={`text-left px-3 py-2 rounded-lg transition font-medium ${
              selectedClass === cls ? "bg-blue-100 text-blue-700 font-semibold" : "hover:bg-blue-50"
            }`}
          >
            {cls}
          </button>
        ))}
      </div>

      {/* Vertical Separator */}
      <div className="hidden lg:block w-px bg-gray-300"></div>

      {/* Right Panel - Students */}
      <div className="w-full lg:w-4/5 flex flex-col gap-4">
        {/* Top Controls */}
        <div className="flex flex-col md:flex-row justify-between items-center gap-3">
          <div className="flex gap-3 items-center">
            {/* Search */}
            <div className="relative flex items-center">
              <button
                onClick={() => setSearchOpen((prev) => !prev)}
                className="p-2 bg-blue-500 text-white rounded-full hover:bg-blue-600 transition-colors"
              >
                <Search size={20} />
              </button>
              <AnimatePresence>
                {searchOpen && (
                  <motion.input
                    initial={{ width: 0, opacity: 0 }}
                    animate={{ width: 220, opacity: 1 }}
                    exit={{ width: 0, opacity: 0 }}
                    transition={{ duration: 0.3 }}
                    type="text"
                    placeholder="Search students..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="ml-2 px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400 text-sm"
                  />
                )}
              </AnimatePresence>
            </div>

            
          </div>

          {/* Subgroup Buttons */}
          <div className="flex gap-2">
            {["All", "Subgroup 1", "Subgroup 2"].map((sg) => (
              <button
                key={sg}
                onClick={() => setSelectedSubgroup(sg)}
                className={`px-4 py-1 rounded-full text-sm font-medium transition ${
                  selectedSubgroup === sg ? "bg-blue-500 text-white" : "bg-gray-200 text-gray-700 hover:bg-gray-300"
                }`}
              >
                {sg}
              </button>
            ))}
          </div>
        </div>

        {/* Students Cards */}
        <div className="flex flex-col gap-3">
          {filteredStudents.length > 0 ? (
            filteredStudents.map((student, index) => (
              <motion.div
                key={student.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3, delay: index * 0.05 }}
                onClick={() => togglePresence(student.id)}
                className={`p-4 rounded-xl cursor-pointer flex justify-between items-center transition-all hover:shadow-lg ${
                  presenceState[student.id] ? "bg-green-100" : "bg-red-100"
                }`}
              >
                <div className="flex flex-col">
                  <p className="font-semibold text-gray-800">{student.name}</p>
                  <p className="text-sm text-gray-500">{student.email}</p>
                </div>
                <div
                  className={`px-3 py-1.5 rounded-full text-white text-sm font-medium transition ${
                    presenceState[student.id] ? "bg-green-600" : "bg-red-500"
                  }`}
                >
                  {presenceState[student.id] ? "Present" : "Absent"}
                </div>
              </motion.div>
            ))
          ) : (
            <p className="text-center text-gray-500 font-medium py-6">No students found ❌</p>
          )}
        </div>
      </div>

      {/* Submit Button */}
      <button
        onClick={handleSubmit}
        className="fixed bottom-6 right-6 bg-blue-500 hover:bg-blue-600 text-white px-6 py-3 rounded-full font-semibold shadow-lg transition"
      >
        Submit Attendance
      </button>
    </div>
  );
}
