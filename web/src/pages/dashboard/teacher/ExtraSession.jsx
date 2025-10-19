import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { PlusCircle, Edit, Trash2 } from "lucide-react";
import { CheckCircle } from "lucide-react";


const classesData = ["LSI A1-01", "LSI A1-02", "LSI A1-23", "ING A2-02"];

export default function ExtraSession() {
  const [selectedClass, setSelectedClass] = useState(classesData[0]);
  const [sessions, setSessions] = useState([
    {
      id: 1,
      day: "Monday",
      time: "08:30 - 10:00",
      title: "Artificial Intelligence",
      type: "Cours",
      room: "M-01",
    },
    {
      id: 2,
      day: "Tuesday",
      time: "10:10 - 11:40",
      title: "Databases",
      type: "TD",
      room: "M-19",
    },
  ]);

  const [originalSessions, setOriginalSessions] = useState([...sessions]); // keep original for comparison
  const [showModal, setShowModal] = useState(false);
  const [editingSession, setEditingSession] = useState(null);
  const [formData, setFormData] = useState({
    day: "",
    time: "",
    title: "",
    type: "Cours",
    room: "",
  });
  const [hasChanges, setHasChanges] = useState(false);

  useEffect(() => {
    // compare current sessions with original sessions
    const changed =
      sessions.length !== originalSessions.length ||
      sessions.some((s, i) => JSON.stringify(s) !== JSON.stringify(originalSessions[i]));
    setHasChanges(changed);
  }, [sessions, originalSessions]);

  const handleOpenModal = (session = null) => {
    if (session) {
      setEditingSession(session);
      setFormData(session);
    } else {
      setEditingSession(null);
      setFormData({ day: "", time: "", title: "", type: "Cours", room: "" });
    }
    setShowModal(true);
  };

  const handleCloseModal = () => setShowModal(false);

  const handleSave = () => {
    if (editingSession) {
      setSessions((prev) =>
        prev.map((s) => (s.id === editingSession.id ? { ...formData, id: s.id } : s))
      );
    } else {
      setSessions((prev) => [...prev, { ...formData, id: Date.now() }]);
    }
    setShowModal(false);
  };

  const handleDelete = (id) => {
    setSessions((prev) => prev.filter((s) => s.id !== id));
  };

  const handleSubmitSessions = () => {
    // Here you can add API call to save sessions to backend
    setOriginalSessions([...sessions]);
    setHasChanges(false);
    alert("Extra sessions submitted successfully ✅");
  };

  return (
    <div className="p-6 flex lg:flex-row flex-col items-center gap-6 w-full relative">
      {/* Left Panel - Classes */}
      <div className="lg:w-1/5 flex flex-col items-center gap-2 text-gray-700">
        <h3 className="text-lg text-left font-semibold mb-3">Classes</h3>
        {classesData.map((cls) => (
          <button
            key={cls}
            onClick={() => setSelectedClass(cls)}
            className={`lg:text-left  px-3 py-2 rounded-lg transition font-medium ${
              selectedClass === cls
                ? "text-blue-700 font-semibold"
                : "hover:bg-blue-100"
            }`}
          >
            {cls}
          </button>
        ))}
      </div>

      {/* Vertical Separator */}
      <div className="w-px bg-gray-300"></div>

      {/* Right Panel - Sessions Table */}
      <div className="w-4/5 flex flex-col gap-4 pb-20">
        <div className="flex justify-between items-center">
          <h2 className="text-xl font-semibold">Extra Sessions</h2>
          <button
            onClick={() => handleOpenModal()}
            className="flex items-center gap-2 px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition"
          >
            <PlusCircle size={18} /> Add Session
          </button>
        </div>

        {/* Sessions Table */}
        <div className="overflow-x-auto">
          <table className="min-w-full text-left">
            <thead>
              <tr className="text-gray-500 uppercase text-sm tracking-wide">
                <th className="px-4 py-2">Day</th>
                <th className="px-4 py-2">Time</th>
                <th className="px-4 py-2">Title</th>
                <th className="px-4 py-2">Type</th>
                <th className="px-4 py-2">Room</th>
                <th className="px-4 py-2 text-center">Actions</th>
              </tr>
            </thead>
            <tbody>
              {sessions.length > 0 ? (
                sessions.map((session) => (
                  <tr key={session.id} className="transition hover:bg-gray-50">
                    <td className="px-4 py-2">{session.day}</td>
                    <td className="px-4 py-2">{session.time}</td>
                    <td className="px-4 py-2">{session.title}</td>
                    <td className="px-4 py-2">{session.type}</td>
                    <td className="px-4 py-2">{session.room}</td>
                    <td className="px-4 py-2 flex justify-center gap-2">
                      <button
                        onClick={() => handleOpenModal(session)}
                        className="p-1 bg-yellow-400 hover:bg-yellow-500 rounded-md transition"
                      >
                        <Edit size={16} />
                      </button>
                      <button
                        onClick={() => handleDelete(session.id)}
                        className="p-1 bg-red-500 hover:bg-red-600 rounded-md transition"
                      >
                        <Trash2 size={16} />
                      </button>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="6" className="text-center py-6 text-gray-500">
                    No sessions found ❌
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>

        {/* Bottom-right Submit Button - shows only if changes exist */}
        {hasChanges && (
          <div className="fixed bottom-6 right-6 z-50">
            <button
              onClick={handleSubmitSessions}
              className="px-6 py-3 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition shadow-lg"
            >
              Submit Sessions
            </button>
          </div>
        )}
      </div>

      {/* Add/Edit Modal */}
      <AnimatePresence>
        {showModal && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 flex items-center justify-center z-50 backdrop-blur-sm bg-white/30"
          >
            <motion.div
              initial={{ scale: 0.8 }}
              animate={{ scale: 1 }}
              exit={{ scale: 0.8 }}
              className="bg-white p-6 rounded-2xl w-full max-w-md shadow-lg"
            >
              <h3 className="text-lg font-semibold mb-4">
                {editingSession ? "Edit Session" : "Add Session"}
              </h3>
              <div className="flex flex-col gap-3">
                <input
                  type="text"
                  placeholder="Day"
                  value={formData.day}
                  onChange={(e) =>
                    setFormData({ ...formData, day: e.target.value })
                  }
                  className="px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
                />
                <input
                  type="text"
                  placeholder="Time (e.g., 08:30 - 10:00)"
                  value={formData.time}
                  onChange={(e) =>
                    setFormData({ ...formData, time: e.target.value })
                  }
                  className="px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
                />
                <input
                  type="text"
                  placeholder="Session Title"
                  value={formData.title}
                  onChange={(e) =>
                    setFormData({ ...formData, title: e.target.value })
                  }
                  className="px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
                />
                <select
                  value={formData.type}
                  onChange={(e) =>
                    setFormData({ ...formData, type: e.target.value })
                  }
                  className="px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
                >
                  <option value="Cours">Cours</option>
                  <option value="TD">TD</option>
                  <option value="TP">TP</option>
                </select>
                <input
                  type="text"
                  placeholder="Room (e.g., M-01)"
                  value={formData.room}
                  onChange={(e) =>
                    setFormData({ ...formData, room: e.target.value })
                  }
                  className="px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
                />
                <div className="flex justify-end gap-2 mt-4">
                  <button
                    onClick={handleCloseModal}
                    className="px-4 py-2 rounded-lg bg-gray-300 hover:bg-gray-400 transition"
                  >
                    Cancel
                  </button>
                  <button
                    onClick={handleSave}
                    className="px-4 py-2 rounded-lg bg-blue-500 text-white hover:bg-blue-600 transition"
                  >
                    Save
                  </button>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
