import React from "react";
import { motion } from "framer-motion";
import { Calendar, BookOpen } from "lucide-react";

const studentClassSessions = [
  { id: 1, day: "Monday", time: "08:30 - 10:00", title: "Artificial Intelligence", type: "Cours", room: "M-01" },
  { id: 2, day: "Tuesday", time: "10:10 - 11:40", title: "Databases", type: "TD", room: "M-19" },
  { id: 3, day: "Wednesday", time: "09:00 - 10:30", title: "Networking", type: "Cours", room: "M-05" },
  { id: 4, day: "Thursday", time: "11:00 - 12:30", title: "Software Engineering", type: "TP", room: "M-12" },
];

export default function StudentExtraSessions() {
  const studentClass = "LSI A1-01";

  return (
    <div className="p-4 md:p-6 w-full min-h-screen">
      {/* Header Card */}
      <div className="bg-gradient-to-r from-blue-600 to-blue-500 text-white rounded-2xl shadow-xl p-6 mb-6 flex flex-col md:flex-row justify-between items-center gap-4">
        <div>
          <h2 className="text-2xl md:text-3xl font-bold">Extra Sessions</h2>
          <p className="mt-1 text-yellow-200 font-medium text-lg md:text-xl">
            Class: {studentClass}
          </p>
        </div>
        <BookOpen size={28} className="text-yellow-400" />
      </div>

      {/* Responsive Table */}
      <div className="overflow-x-auto bg-white rounded-2xl shadow-xl">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-blue-50">
            <tr>
              <th className="px-4 py-3 text-left text-sm font-semibold text-gray-700 flex items-center gap-2">
                <Calendar size={16} /> Day
              </th>
              <th className="px-4 py-3 text-center text-sm font-semibold text-gray-700">Time</th>
              <th className="px-4 py-3 text-left text-sm font-semibold text-gray-700">Title</th>
              <th className="px-4 py-3 text-center text-sm font-semibold text-gray-700">Type</th>
              <th className="px-4 py-3 text-center text-sm font-semibold text-gray-700">Room</th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-100">
            {studentClassSessions.length > 0 ? (
              studentClassSessions.map((session, idx) => (
                <motion.tr
                  key={session.id}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: idx * 0.05 }}
                  className="hover:bg-blue-50 transition cursor-pointer"
                >
                  <td className="px-4 py-3 font-medium text-gray-800">{session.day}</td>
                  <td className="px-4 py-3 text-center text-gray-700">{session.time}</td>
                  <td className="px-4 py-3 text-gray-800">{session.title}</td>
                  <td className={`px-4 py-3 text-center font-semibold ${
                    session.type === "Cours" ? "text-green-600" :
                    session.type === "TD" ? "text-yellow-600" :
                    "text-purple-600"
                  }`}>{session.type}</td>
                  <td className="px-4 py-3 text-center text-gray-700">{session.room}</td>
                </motion.tr>
              ))
            ) : (
              <tr>
                <td colSpan="5" className="text-center py-6 text-gray-500">
                  No extra sessions scheduled ❌
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
