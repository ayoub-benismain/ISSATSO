import React from "react";

export default function ScheduleStudent() {
  const studentInfo = {
    name: "Ayoub Smaeen",
    level: "ING-A2",
  };

  const days = ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"];
  const times = [
    "08:00 - 09:30",
    "09:40 - 11:10",
    "11:20 - 12:50",
    "13:00 - 14:30",
    "14:40 - 16:10",
    "16:20 - 17:50",
  ];

  // Full schedule for all slots
  const schedule = {
    Monday: {
      "08:00 - 09:30": { course: "Web Development", teacher: "Dr. Amira Ben Salah", room: "B101", type: "Cours" },
      "09:40 - 11:10": { course: "Databases", teacher: "Mr. Mohamed Trabelsi", room: "A203", type: "TD" },
      "11:20 - 12:50": { course: "Mathematics", teacher: "Dr. Sana Khelifa", room: "C202", type: "Cours" },
      "13:00 - 14:30": { course: "Networks", teacher: "Eng. Salma Ferchichi", room: "D101", type: "TP" },
      "14:40 - 16:10": { course: "Artificial Intelligence", teacher: "Dr. Fethi Krichen", room: "Lab 3", type: "Cours" },
      "16:20 - 17:50": { course: "Software Engineering", teacher: "Dr. Hichem Touil", room: "E105", type: "TD" },
    },
    Tuesday: {
      "08:00 - 09:30": { course: "Mathematics", teacher: "Dr. Sana Khelifa", room: "C202", type: "Cours" },
      "09:40 - 11:10": { course: "Networks", teacher: "Eng. Salma Ferchichi", room: "D101", type: "Cours" },
      "11:20 - 12:50": { course: "Web Development", teacher: "Dr. Amira Ben Salah", room: "B101", type: "TD" },
      "13:00 - 14:30": { course: "Databases", teacher: "Mr. Mohamed Trabelsi", room: "A203", type: "TD" },
      "14:40 - 16:10": { course: "Software Engineering", teacher: "Dr. Hichem Touil", room: "E105", type: "TP" },
      "16:20 - 17:50": { course: "Artificial Intelligence", teacher: "Dr. Fethi Krichen", room: "Lab 3", type: "Cours" },
    },
    Wednesday: {
      "08:00 - 09:30": { course: "Databases", teacher: "Mr. Mohamed Trabelsi", room: "A203", type: "Cours" },
      "09:40 - 11:10": { course: "Artificial Intelligence", teacher: "Dr. Fethi Krichen", room: "Lab 3", type: "TP" },
      "11:20 - 12:50": { course: "Networks", teacher: "Eng. Salma Ferchichi", room: "D101", type: "Cours" },
      "13:00 - 14:30": { course: "Software Engineering", teacher: "Dr. Hichem Touil", room: "E105", type: "TD" },
      "14:40 - 16:10": { course: "Web Development", teacher: "Dr. Amira Ben Salah", room: "B101", type: "Cours" },
      "16:20 - 17:50": { course: "Mathematics", teacher: "Dr. Sana Khelifa", room: "C202", type: "Cours" },
    },
    Thursday: {
      "08:00 - 09:30": { course: "Networks", teacher: "Eng. Salma Ferchichi", room: "D101", type: "TP" },
      "09:40 - 11:10": { course: "Databases", teacher: "Mr. Mohamed Trabelsi", room: "A203", type: "Cours" },
      "11:20 - 12:50": { course: "Software Engineering", teacher: "Dr. Hichem Touil", room: "E105", type: "TD" },
      "13:00 - 14:30": { course: "Mathematics", teacher: "Dr. Sana Khelifa", room: "C202", type: "Cours" },
      "14:40 - 16:10": { course: "Artificial Intelligence", teacher: "Dr. Fethi Krichen", room: "Lab 3", type: "TP" },
      "16:20 - 17:50": { course: "Web Development", teacher: "Dr. Amira Ben Salah", room: "B101", type: "TD" },
    },
    Friday: {
      "08:00 - 09:30": { course: "Web Development", teacher: "Dr. Amira Ben Salah", room: "B101", type: "Cours" },
      "09:40 - 11:10": { course: "Databases", teacher: "Mr. Mohamed Trabelsi", room: "A203", type: "TD" },
      "11:20 - 12:50": { course: "Networks", teacher: "Eng. Salma Ferchichi", room: "D101", type: "Cours" },
      "13:00 - 14:30": { course: "Software Engineering", teacher: "Dr. Hichem Touil", room: "E105", type: "TP" },
      "14:40 - 16:10": { course: "Mathematics", teacher: "Dr. Sana Khelifa", room: "C202", type: "Cours" },
      "16:20 - 17:50": { course: "Artificial Intelligence", teacher: "Dr. Fethi Krichen", room: "Lab 3", type: "Cours" },
    },
  };

  const typeColors = {
    Cours: "from-blue-400 to-blue-600",
    TD: "from-green-400 to-green-600",
    TP: "from-purple-400 to-purple-600",
  };

  return (
    <div className="p-6">
      <h2 className="text-2xl font-semibold text-gray-800 mb-2">📘 Weekly Schedule</h2>
      <div className="bg-white shadow-md rounded-xl p-4 flex flex-col sm:flex-row sm:items-center sm:justify-between mb-6">
        <div>
          <h3 className="text-lg font-semibold text-blue-700">Level: {studentInfo.level}</h3>
          <p className="text-gray-600"><span className="font-medium">Student</span> — Full Schedule</p>
        </div>
        <p className="text-gray-500 text-sm mt-2 sm:mt-0">Name: <span className="font-medium">{studentInfo.name}</span></p>
      </div>

      <div className="overflow-x-auto rounded-2xl shadow-lg bg-white border border-gray-200">
        <table className="min-w-full border-collapse text-sm md:text-base">
          <thead>
            <tr className="bg-gray-100 text-gray-700">
              <th className="px-4 py-3 font-semibold text-left">Time</th>
              {days.map(day => <th key={day} className="px-4 py-3 font-semibold text-center">{day}</th>)}
            </tr>
          </thead>
          <tbody>
            {times.map(time => (
              <tr key={time} className="border-t border-gray-100 hover:bg-gray-50 transition">
                <td className="px-4 py-3 text-gray-700 font-medium">{time}</td>
                {days.map(day => {
                  const session = schedule[day]?.[time];
                  const color = session ? typeColors[session.type] : null;
                  return (
                    <td key={day} className="px-4 py-3 text-center">
                      {session ? (
                        <div className={`px-3 py-2 rounded-xl text-white font-medium shadow-sm bg-gradient-to-r ${color} hover:scale-105 transition-transform`}>
                          {session.course}<br />
                          <span className="text-sm opacity-90">{session.teacher} — {session.type} ({session.room})</span>
                        </div>
                      ) : <div className="text-gray-300">—</div>}
                    </td>
                  );
                })}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
