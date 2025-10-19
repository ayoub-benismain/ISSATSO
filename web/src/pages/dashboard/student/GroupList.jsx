import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { User, Search, Users } from "lucide-react";

const students = [
  { id: 1, inscription: "3410071", firstName: "NOUR", lastName: "ABDELJELIL", subgroup: "1" },
  { id: 2, inscription: "3410075", firstName: "YASSINE", lastName: "AMARA", subgroup: "1" },
  { id: 3, inscription: "3410076", firstName: "MOHAMED AMINE", lastName: "AMMAR", subgroup: "2" },
  { id: 4, inscription: "3410079", firstName: "HOUMEM", lastName: "BELANES", subgroup: "2" },
  { id: 5, inscription: "3410080", firstName: "CHAHD", lastName: "BELKAHLA", subgroup: "1" },
  { id: 6, inscription: "3410083", firstName: "MOHAMED AZIZ", lastName: "BEN CHIKHA", subgroup: "1" },
  { id: 7, inscription: "3410084", firstName: "MOHAMED OMAR", lastName: "BEN HAMMOUDA", subgroup: "2" },
  { id: 8, inscription: "3410085", firstName: "AHMED", lastName: "BEN HARIZ", subgroup: "2" },
  { id: 9, inscription: "3410086", firstName: "MOHAMED ADEM", lastName: "BEN HASSINE", subgroup: "1" },
  { id: 10, inscription: "3410087", firstName: "AYOUB", lastName: "BEN ISMAIN", subgroup: "1" },
  { id: 11, inscription: "3410088", firstName: "SAMEND", lastName: "BEN JAZIA", subgroup: "2" },
  { id: 12, inscription: "3410091", firstName: "YASSINE", lastName: "BEN SALEM", subgroup: "2" },
  { id: 13, inscription: "3410092", firstName: "WISSEM", lastName: "BEN TAHAR", subgroup: "1" },
  { id: 14, inscription: "3410093", firstName: "ABDALLAH", lastName: "BEN ZINEB", subgroup: "1" },
  { id: 15, inscription: "3410096", firstName: "INES", lastName: "BOUDABOUS", subgroup: "2" },
  { id: 16, inscription: "3410230", firstName: "AYA", lastName: "BZEOUICH", subgroup: "2" },
  { id: 17, inscription: "3410100", firstName: "BAHA EDDINE", lastName: "CHAREF", subgroup: "1" },
  { id: 18, inscription: "3410101", firstName: "RAKIA", lastName: "CHARRADI", subgroup: "1" },
  { id: 19, inscription: "3410102", firstName: "KENZA", lastName: "CHELLY", subgroup: "2" },
  { id: 20, inscription: "3410103", firstName: "HASSEN", lastName: "CHLADY", subgroup: "2" },
  { id: 21, inscription: "3410104", firstName: "ZOUHOUR", lastName: "DAGHROUR", subgroup: "1" },
  { id: 22, inscription: "3410107", firstName: "MAZEN", lastName: "ELHENI", subgroup: "1" },
  { id: 23, inscription: "3410108", firstName: "RANIM", lastName: "ESSID", subgroup: "2" },
  { id: 24, inscription: "3410222", firstName: "AHMED", lastName: "GAZZEH", subgroup: "2" },
  { id: 25, inscription: "3410221", firstName: "AMINE", lastName: "HAMILA", subgroup: "1" },
  { id: 26, inscription: "3410110", firstName: "YOUSSEF", lastName: "HASSINE", subgroup: "1" },
  { id: 27, inscription: "3410115", firstName: "KACEM", lastName: "KSAIER", subgroup: "2" },
  { id: 28, inscription: "3410116", firstName: "MOHAMED", lastName: "KSIAA", subgroup: "2" },
  { id: 29, inscription: "3410118", firstName: "MOUADH", lastName: "LASSOUED", subgroup: "1" },
  { id: 30, inscription: "3410122", firstName: "MOHAMED AMINE", lastName: "MEFTEH", subgroup: "1" },
  { id: 31, inscription: "3410124", firstName: "AYOUB", lastName: "MHENNI", subgroup: "2" },
  { id: 32, inscription: "N/A", firstName: "MOUHEB", lastName: "MSADAK", subgroup: "2" },
  { id: 33, inscription: "3410130", firstName: "HAZEM", lastName: "OUNI", subgroup: "1" },
  { id: 34, inscription: "3410131", firstName: "AHMED", lastName: "REZGUI", subgroup: "1" },
  { id: 35, inscription: "3410234", firstName: "YOUSSEF", lastName: "SAID", subgroup: "2" },
  { id: 36, inscription: "3410133", firstName: "YOSSR", lastName: "SLIMEN", subgroup: "2" },
  { id: 37, inscription: "3410135", firstName: "RAYEN", lastName: "TLILI", subgroup: "1" },
  { id: 38, inscription: "3410136", firstName: "ABDELHAKIM", lastName: "ZAKHAMA", subgroup: "1" },
  { id: 39, inscription: "3410137", firstName: "SAFA", lastName: "ZIRAOUI", subgroup: "2" },
];

export default function GroupList() {
  const [subGroupFilter, setSubGroupFilter] = useState("All");
  const [searchOpen, setSearchOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");

  const filteredStudents = students.filter((s) => {
    const matchesSubGroup =
      subGroupFilter === "All" || s.subgroup === subGroupFilter;
    const matchesSearch =
      s.firstName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      s.lastName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      s.inscription.includes(searchTerm);
    return matchesSubGroup && matchesSearch;
  });

  return (
    <div className="flex flex-col md:flex-row h-full rounded-2xl overflow-hidden">
      {/* LEFT PANEL */}
      <motion.div
        className="md:w-1/5 w-full border-r border-blue-300 text-white flex flex-col md:flex-col justify-start items-center md:py-10 py-4 md:gap-6 gap-3"
        initial={{ x: -50, opacity: 0 }}
        animate={{ x: 0, opacity: 1 }}
        transition={{ duration: 0.6 }}
      >
        <h2 className="text-lg md:text-xl text-gray-800 font-semibold mb-2 flex items-center gap-2">
          <Users className="text-yellow-400" /> Groups
        </h2>

        {/* Make buttons row on mobile, column on desktop */}
        <div className="flex md:flex-col flex-row justify-center md:justify-start items-center gap-3 md:gap-4">
          {["All", "1", "2"].map((group) => (
            <motion.button
              key={group}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => setSubGroupFilter(group)}
              className={`px-4 py-2 rounded-full text-sm md:text-base transition-all duration-300 shadow-md ${
                subGroupFilter === group
                  ? "bg-yellow-400 text-blue-900"
                  : "bg-blue-700 hover:bg-blue-800 text-white"
              }`}
            >
              {group === "All" ? "All Students" : `Sub Group ${group}`}
            </motion.button>
          ))}
        </div>
      </motion.div>

      {/* RIGHT PANEL */}
      <motion.div
        className="md:w-4/5 w-full p-6 relative overflow-y-auto"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.6, delay: 0.1 }}
      >
        {/* Header Section */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-6 gap-4">
          <h1 className="text-2xl font-bold text-blue-800 flex items-center gap-2">
            Classroom Students
          </h1>

          {/* Search Floating Button */}
          <motion.div
            className="relative flex items-center gap-2"
            animate={{ width: searchOpen ? 210 : 40 }}
            transition={{ type: "spring", stiffness: 220, damping: 20 }}
          >
            <motion.button
              onClick={() => setSearchOpen(!searchOpen)}
              className="w-10 h-10 flex items-center justify-center rounded-full bg-blue-500 hover:bg-blue-600 text-white shadow-lg transition"
              whileHover={{ scale: 1.1 }}
            >
              <Search size={15} />
            </motion.button>

            <AnimatePresence>
              {searchOpen && (
                <motion.input
                  key="search"
                  initial={{ opacity: 0, width: 0 }}
                  animate={{ opacity: 1, width: 160 }}
                  exit={{ opacity: 0, width: 0 }}
                  transition={{ duration: 0.3 }}
                  type="text"
                  placeholder="Search..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="absolute right-0 bg-white/80 backdrop-blur-md border border-blue-300 rounded-full px-4 py-2 outline-none text-gray-700 placeholder-gray-500 focus:ring-2 focus:ring-yellow-400 shadow-sm"
                />
              )}
            </AnimatePresence>
          </motion.div>
        </div>

        {/* Table Header */}
        <div className="grid grid-cols-4 gap-4 bg-blue-100 p-3 rounded-t-xl font-semibold text-blue-900 shadow-sm border border-blue-200">
          <div>ID</div>
          <div>Inscription No.</div>
          <div>First Name</div>
          <div>Last Name</div>
        </div>

        {/* Students List */}
        <div className="flex flex-col">
          <AnimatePresence>
            {filteredStudents.map((student, index) => (
              <motion.div
                key={student.id}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                transition={{ delay: index * 0.05 }}
                className="grid grid-cols-4 gap-4 bg-white/80 backdrop-blur-lg p-4 border-b border-blue-100 hover:bg-yellow-50 transition-all cursor-pointer"
              >
                <div className="flex items-center gap-2 text-blue-600 font-semibold">
                  <User size={18} /> {student.id}
                </div>
                <div>{student.inscription}</div>
                <div>{student.firstName}</div>
                <div>{student.lastName}</div>
              </motion.div>
            ))}
          </AnimatePresence>

          {filteredStudents.length === 0 && (
            <motion.p
              className="text-center text-gray-500 py-6 text-lg"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
            >
              No students found.
            </motion.p>
          )}
        </div>
      </motion.div>
    </div>
  );
}
