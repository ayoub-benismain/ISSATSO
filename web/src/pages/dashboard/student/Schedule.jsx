import React from "react";

export default function ScheduleStudent() {
  const studentInfo = {
    name: "Ayoub Smaeen",
    level: "LSI-A2-02",
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

  // Your Semester 1 subjects with types (Cours, TD, TP)
  const semesterSubjects = [
    { course: "Probabilité et statistique", type: "Cours", teacher: "Dr. Sana Khelifa", room: "A101" },
    { course: "Théorie des langages et des Automates", type: "TD", teacher: "Mr. Fethi Krichen", room: "B203" },
    { course: "Graphes et optimisation", type: "Cours", teacher: "Dr. Amira Ben Salah", room: "C302" },
    { course: "Conception des Systèmes d'Information", type: "Cours", teacher: "Dr. Hichem Touil", room: "D101" },
    { course: "Programmation Java", type: "TP", teacher: "Eng. Salma Ferchichi", room: "Lab 2" },
    { course: "Ingénierie des Bases de Données", type: "TD", teacher: "Mr. Mohamed Trabelsi", room: "A203" },
    { course: "Services des Réseaux", type: "TP", teacher: "Eng. Salma Ferchichi", room: "Lab 1" },
    { course: "Anglais 3", type: "Cours", teacher: "Mrs. Amira Ben Salah", room: "B101" },
    { course: "Gestion d'entreprise", type: "Cours", teacher: "Mr. Fethi Krichen", room: "C202" },
    { course: "Serious Gaming Fundamentals", type: "TD", teacher: "Dr. Sana Khelifa", room: "Lab 3" },
    { course: "Mobile Game Programming", type: "TP", teacher: "Eng. Salma Ferchichi", room: "Lab 2" },
  ];

  // Fill a weekly schedule
  const schedule = {};
  days.forEach((day) => {
    schedule[day] = {};
    times.forEach((time, index) => {
      // Cycle through subjects
      const subj = semesterSubjects[(index + days.indexOf(day)) % semesterSubjects.length];
      schedule[day][time] = subj;
    });
  });

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
          <tbody>
            <tr className="bg-gray-100 text-gray-700">
              <td className="px-4 py-3 font-semibold text-left">Time / Day</td>
              {days.map(day => <td key={day} className="px-4 py-3 font-semibold text-center">{day}</td>)}
            </tr>
            {times.map(time => (
              <tr key={time} className="border-t border-gray-100 hover:bg-gray-50 transition">
                <td className="px-4 py-3 text-gray-700 font-medium">{time}</td>
                {days.map(day => {
                  const session = schedule[day][time];
                  const color = typeColors[session.type];
                  return (
                    <td key={day} className="px-2 py-2 text-center">
                      <div className={`px-2 py-1 rounded-xl text-white font-medium shadow-sm bg-gradient-to-r ${color} hover:scale-105 transition-transform`}>
                        {session.course}<br/>
                        <span className="text-xs opacity-90">{session.teacher} — {session.type} ({session.room})</span>
                      </div>
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
