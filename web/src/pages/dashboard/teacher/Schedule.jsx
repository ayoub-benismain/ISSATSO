import React from "react";

export default function ScheduleTeacher() {
  const teacherInfo = {
    name: "Dr. Amira Ben Salah",
    subject: "Artificial Intelligence",
    type: "TD", // Cours | TD | TP
  };

  const days = ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
  const times = [
    "08:30 - 10:00",
    "10:10 - 11:40",
    "11:50 - 13:20",
    "13:50 - 15:20",
    "15:30 - 17:00",
    "17:10 - 18:40",
  ];

  // Enhanced example schedule (multiple classes)
  const schedule = {
    Monday: {
      "08:30 - 10:00": { class: "LSI-A1-01", room: "M05", type: "Cours" },
      "11:50 - 13:20": { class: "ING-A2-02", room: "M12", type: "TD" },
    },
    Tuesday: {
      "10:10 - 11:40": { class: "LSI-A1-01", room: "M05", type: "TD" },
      "13:50 - 15:20": { class: "ING-A2-02", room: "M12", type: "TP" },
    },
    Wednesday: {
      "11:50 - 13:20": { class: "LSI-A1-01", room: "K08", type: "Cours" },
    },
    Thursday: {
      "08:30 - 10:00": { class: "ING-A2-02", room: "M12", type: "TD" },
      "15:30 - 17:00": { class: "LSI-A1-01", room: "M05", type: "TP" },
    },
    Friday: {
      "10:10 - 11:40": { class: "ING-A2-02", room: "M12", type: "Cours" },
      "13:50 - 15:20": { class: "LSI-A1-01", room: "M05", type: "TD" },
    },
  };

  // Color mapping by session type
  const typeColors = {
    Cours: "from-blue-400 to-blue-600",
    TD: "from-green-400 to-green-600",
    TP: "from-purple-400 to-purple-600",
  };

  return (
    <div className="p-6">
      {/* Header Section */}
      <div className="mb-6">
        <h2 className="text-2xl font-semibold text-gray-800 mb-2">📘 Weekly Schedule</h2>
        <div className="bg-white shadow-md rounded-xl p-4 flex flex-col sm:flex-row sm:items-center sm:justify-between">
          <div>
            <h3 className="text-lg font-semibold text-blue-700">{teacherInfo.subject}</h3>
            <p className="text-gray-600">
              <span className="font-medium">Multiple Classes</span> —
            </p>
          </div>
          <p className="text-gray-500 text-sm mt-2 sm:mt-0">
            Teacher: <span className="font-medium">{teacherInfo.name}</span>
          </p>
        </div>
      </div>

      {/* Schedule Table */}
      <div className="overflow-x-auto rounded-2xl shadow-lg bg-white border border-gray-200">
        <table className="min-w-full border-collapse text-sm md:text-base">
          <thead>
            <tr className="bg-gray-100 text-gray-700">
              <th className="px-4 py-3 font-semibold text-left">Time</th>
              {days.map((day) => (
                <th key={day} className="px-4 py-3 font-semibold text-center">
                  {day}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {times.map((time) => (
              <tr key={time} className="border-t border-gray-100 hover:bg-gray-50 transition">
                <td className="px-4 py-3 text-gray-700 font-medium">{time}</td>
                {days.map((day) => {
                  const session = schedule[day]?.[time];
                  const color = session ? typeColors[session.type] : null;
                  return (
                    <td key={day} className="px-4 py-3 text-center">
                      {session ? (
                        <div
                          className={`px-3 py-2 rounded-xl text-white font-medium shadow-sm bg-gradient-to-r ${color} hover:scale-105 transition-transform`}
                        >
                          {teacherInfo.subject}
                          <br />
                          <span className="text-sm opacity-90">
                            {session.class} — {session.type} ({session.room})
                          </span>
                        </div>
                      ) : (
                        <div className="text-gray-300">—</div>
                      )}
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
