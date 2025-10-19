import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Search, BookOpen, GraduationCap } from "lucide-react";

const semesterData = {
  "Semester 1": [
    { code: "CS101", title: "Programming", professor: "Dr. Smith", progress: 85 },
    { code: "MA101", title: "Calculus I", professor: "Dr. Brown", progress: 70 },
    { code: "PH101", title: "Physics", professor: "Dr. White", progress: 50 },
  ],
  "Semester 2": [
    { code: "CS201", title: "Algorithms", professor: "Dr. Adams", progress: 60 },
    { code: "CS202", title: "Database", professor: "Dr. Kim", progress: 75 },
    { code: "CS203", title: "Operating Systems", professor: "Dr. Green", progress: 45 },
    { code: "CS204", title: "Web Development", professor: "Dr. Johnson", progress: 90 },
  ],
};

export default function MySubjects() {
  const [activeSemester, setActiveSemester] = useState("Semester 1");
  const [searchOpen, setSearchOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");

  const subjects = semesterData[activeSemester];
  const filteredSubjects = subjects.filter(
    (subject) =>
      subject.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      subject.code.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="flex flex-col md:flex-row w-screen md:w-full min-h-full">
      {/* Left Panel */}
      <div className="w-full md:w-1/5 border-b md:border-b-0 md:border-r border-blue-200 p-6 flex flex-col justify-start items-start backdrop-blur-sm">
        <h2 className="text-2xl font-bold text-blue-800 mb-6 flex items-center gap-2">
          <GraduationCap className="text-blue-600" /> Semesters
        </h2>

        <div className="space-y-4 md:w-full w-2/3">
          {Object.keys(semesterData).map((semester) => (
            <button
              key={semester}
              onClick={() => setActiveSemester(semester)}
              className={`w-full text-left px-2 py-3 rounded-xl font-semibold transition-all ${
                activeSemester === semester
                  ? "bg-blue-600 text-white shadow-md"
                  : "bg-white text-blue-700 border border-blue-200 hover:bg-blue-50"
              }`}
            >
              {semester}
            </button>
          ))}
        </div>
      </div>

      {/* Right Panel */}
      <div className="w-full md:w-4/5 p-4 sm:p-8">
        {/* Header */}
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-6 sm:mb-8 gap-4 sm:gap-0">
          <h2 className="text-xl sm:text-xl font-bold text-blue-800 flex items-center gap-2">
            <BookOpen className="text-blue-600" /> {activeSemester} Subjects
          </h2>

          {/* Search Bar */}
          <div className="relative flex items-center">
            <button
              onClick={() => setSearchOpen((prev) => !prev)}
              className="p-2 bg-blue-500 text-white rounded-full hover:bg-blue-600 transition-all"
            >
              <Search size={20} />
            </button>
            <AnimatePresence>
              {searchOpen && (
                <motion.input
                  initial={{ width: 0, opacity: 0 }}
                  animate={{ width: 200, opacity: 1 }}
                  exit={{ width: 0, opacity: 0 }}
                  transition={{ duration: 0.3 }}
                  type="text"
                  placeholder="Search subjects..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="ml-2 px-3 py-2 border border-blue-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400 text-sm shadow-sm"
                />
              )}
            </AnimatePresence>
          </div>
        </div>

        {/* Subjects Table */}
        <div className="overflow-x-auto">
          <AnimatePresence mode="wait">
            <motion.table
              key={activeSemester}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.5, ease: "easeInOut" }}
              className="min-w-full rounded-2xl shadow-md bg-white/70 backdrop-blur-sm border border-blue-100"
            >
              <thead>
                <tr className="bg-gradient-to-r from-blue-100 to-blue-200 text-blue-900 text-sm uppercase tracking-wide">
                  <th className="py-3 px-2 text-left font-semibold">Subject</th>
                  <th className="py-3 px-2 text-left font-semibold">Code</th>
                  <th className="py-3 px-2 text-left font-semibold">Professor</th>
                  <th className="py-3 px-2 text-left font-semibold">Progress</th>
                </tr>
              </thead>
              <tbody>
                <AnimatePresence>
                  {filteredSubjects.length > 0 ? (
                    filteredSubjects.map((subject, index) => (
                      <motion.tr
                        key={subject.code}
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -10 }}
                        transition={{ duration: 0.3, delay: index * 0.05 }}
                        className="hover:bg-blue-50/70 transition-all border-t border-blue-100"
                      >
                        <td className="py-3 px-4 font-medium text-gray-800 flex items-center gap-2">
                          <BookOpen className="text-blue-500" size={16} />
                          {subject.title}
                        </td>
                        <td className="py-3 px-2 text-gray-600">{subject.code}</td>
                        
                        <td className="py-3 px-2 text-gray-700">{subject.professor}</td>
                        <td className="py-3 px-2">
                          <div className="w-full bg-blue-100 h-2 rounded-full overflow-hidden">
                            <motion.div
                              initial={{ width: 0 }}
                              animate={{ width: `${subject.progress}%` }}
                              transition={{ duration: 0.8, delay: index * 0.1 }}
                              className="bg-blue-600 h-2 rounded-full"
                            ></motion.div>
                          </div>
                          <p className="text-xs text-blue-700 mt-1">{subject.progress}%</p>
                        </td>
                      </motion.tr>
                    ))
                  ) : (
                    <tr>
                      <td
                        colSpan="5"
                        className="text-center py-6 text-gray-500 font-medium"
                      >
                        No subjects found 🎓
                      </td>
                    </tr>
                  )}
                </AnimatePresence>
              </tbody>
            </motion.table>
          </AnimatePresence>
        </div>
      </div>
    </div>
  );
}
