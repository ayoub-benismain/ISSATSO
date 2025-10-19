import React from "react";
import { motion } from "framer-motion";
import { Calendar, BookOpen, MapPin, Clock } from "lucide-react";

// Use previous subjects as extra session titles
const previousSubjects = [
  "Services des Réseaux",
  "Conception des Systèmes d'Information",
  "Programmation Java",
  "Programmation orientée objet",
  "Graphes et optimisation",
  "Cryptographie",
];

const studentClassSessions = [
  { id: 1, day: "Monday", time: "08:30 - 10:00", title: previousSubjects[0], type: "Cours", room: "M-01" },
  { id: 2, day: "Tuesday", time: "10:10 - 11:40", title: previousSubjects[1], type: "TD", room: "M-19" },
  { id: 3, day: "Wednesday", time: "09:00 - 10:30", title: previousSubjects[2], type: "Cours", room: "M-05" },
  { id: 4, day: "Thursday", time: "11:00 - 12:30", title: previousSubjects[3], type: "TP", room: "M-12" },
  { id: 5, day: "Friday", time: "13:00 - 14:30", title: previousSubjects[4], type: "Cours", room: "M-09" },
];

export default function StudentExtraSessions() {
  const studentClass = "LSI A2-02";

  const typeColors = {
    "Cours": "bg-green-100 text-green-800",
    "TD": "bg-yellow-100 text-yellow-800",
    "TP": "bg-purple-100 text-purple-800",
  };

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

      {/* Sessions List */}
      <div className="flex flex-col gap-4">
        {studentClassSessions.length > 0 ? (
          studentClassSessions.map((session, idx) => (
            <motion.div
              key={session.id}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: idx * 0.05 }}
              className="bg-white shadow-md rounded-2xl p-4 flex flex-col md:flex-row justify-between items-start md:items-center gap-3 hover:shadow-lg hover:bg-blue-50 transition cursor-pointer"
            >
              <div className="flex items-center gap-4">
                <div className="flex items-center gap-1 font-medium text-gray-700">
                  <Calendar size={16} /> {session.day}
                </div>
                <div className="flex items-center gap-1 text-gray-600">
                  <Clock size={16} /> {session.time}
                </div>
              </div>
              <div className="flex-1 text-gray-800 font-medium md:pl-4">{session.title}</div>
              <div className="flex items-center gap-2">
                <span className={`px-3 py-1 rounded-full font-semibold text-sm ${typeColors[session.type]}`}>
                  {session.type}
                </span>
                <div className="flex items-center gap-1 text-gray-600">
                  <MapPin size={16} /> {session.room}
                </div>
              </div>
            </motion.div>
          ))
        ) : (
          <div className="text-center py-10 text-gray-500 text-lg italic">
            No extra sessions scheduled ❌
          </div>
        )}
      </div>
    </div>
  );
}
