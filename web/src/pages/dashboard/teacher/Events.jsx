import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Pin, PinOff, Trash2, Search, Eye } from "lucide-react";

export default function EventsTeacher() {
  const [events, setEvents] = useState([
    { id: 1, title: "Data Science Workshop", description: "Hands-on workshop on Python and Data Analysis.", date: "2025-08-20", pinned: true },
    { id: 2, title: "Guest Lecture: AI Trends", description: "Lecture by Prof. John Doe on AI and Machine Learning.", date: "2025-08-22", pinned: false },
    { id: 3, title: "Hackathon", description: "University Hackathon, teams compete on app development.", date: "2025-08-25", pinned: false },
    { id: 4, title: "Seminar: Cybersecurity", description: "Seminar on latest cybersecurity threats and solutions.", date: "2025-08-28", pinned: false },
  ]);

  const [searchOpen, setSearchOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");

  const togglePin = (id) => setEvents(prev => prev.map(e => e.id === id ? { ...e, pinned: !e.pinned } : e));
  const deleteEvent = (id) => setEvents(prev => prev.filter(e => e.id !== id));

  const filteredEvents = events.filter(
    (e) =>
      e.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      e.description.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const pinnedEvents = filteredEvents.filter((e) => e.pinned);
  const otherEvents = filteredEvents.filter((e) => !e.pinned);

  const cardVariants = { hidden: { opacity: 0, y: 30 }, visible: { opacity: 1, y: 0 }, exit: { opacity: 0, y: -20 } };

  return (
    <div className="p-6 space-y-6">
      {/* Title */}
      <h2 className="text-3xl font-bold text-gray-800 mb-6">🎉 Events</h2>

      {/* Centered Search */}
      <div className="flex justify-center mb-6">
        <div className="relative flex items-center">
          <button
            onClick={() => setSearchOpen(prev => !prev)}
            className="p-2 bg-blue-500 text-white rounded-full hover:bg-blue-600 transition-colors"
          >
            <Search size={20} />
          </button>
          <AnimatePresence>
            {searchOpen && (
              <motion.input
                initial={{ width: 0, opacity: 0 }}
                animate={{ width: 250, opacity: 1 }}
                exit={{ width: 0, opacity: 0 }}
                transition={{ duration: 0.3 }}
                type="text"
                placeholder="Search events..."
                value={searchQuery}
                onChange={e => setSearchQuery(e.target.value)}
                className="ml-2 px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400 text-sm"
              />
            )}
          </AnimatePresence>
        </div>
      </div>

      {/* Pinned Events */}
      <div>
        <h3 className="text-lg font-semibold text-gray-700 mb-2">📌 Pinned Events</h3>
        {pinnedEvents.length === 0 ? (
          <p className="text-gray-400 text-sm text-center">No pinned events</p>
        ) : (
          <div className="space-y-2">
            <AnimatePresence>
              {pinnedEvents.map(event => (
                <motion.div
                  key={event.id}
                  variants={cardVariants}
                  initial="hidden"
                  animate="visible"
                  exit="exit"
                  transition={{ duration: 0.3 }}
                  className="bg-blue-50 border border-blue-200 rounded-xl p-4 shadow-sm flex justify-between items-start"
                >
                  <div>
                    <h4 className="text-gray-800 font-medium">{event.title}</h4>
                    <p className="text-gray-600 text-sm mt-1">{event.description}</p>
                    <p className="text-green-600 font-medium text-xs mt-1">{new Date(event.date).toDateString()}</p>
                  </div>
                  <div className="flex gap-2">
                    <button onClick={() => togglePin(event.id)} className="text-gray-500 hover:text-yellow-500"><PinOff size={18} /></button>
                    <button onClick={() => deleteEvent(event.id)} className="text-gray-500 hover:text-red-500"><Trash2 size={18} /></button>
                    <button className="text-gray-500 hover:text-blue-500"><Eye size={18} /></button>
                  </div>
                </motion.div>
              ))}
            </AnimatePresence>
          </div>
        )}
      </div>

      {/* Upcoming / Other Events */}
      <div>
        <h3 className="text-lg font-semibold text-gray-700 mb-2">📅 Upcoming Events</h3>
        <div className="space-y-2">
          <AnimatePresence>
            {otherEvents.length === 0 && <p className="text-gray-400 text-sm text-center">No upcoming events</p>}
            {otherEvents.map(event => (
              <motion.div
                key={event.id}
                variants={cardVariants}
                initial="hidden"
                animate="visible"
                exit="exit"
                transition={{ duration: 0.3 }}
                className="bg-white border border-gray-200 rounded-xl p-4 shadow-sm flex justify-between items-start hover:shadow-md transition"
              >
                <div>
                  <h4 className="text-gray-800 font-medium">{event.title}</h4>
                  <p className="text-gray-600 text-sm mt-1">{event.description}</p>
                  <p className="text-green-600 font-medium text-xs mt-1">{new Date(event.date).toDateString()}</p>
                </div>
                <div className="flex gap-2">
                  <button onClick={() => togglePin(event.id)} className="text-gray-500 hover:text-yellow-500"><Pin size={18} /></button>
                  <button onClick={() => deleteEvent(event.id)} className="text-gray-500 hover:text-red-500"><Trash2 size={18} /></button>
                  <button className="text-gray-500 hover:text-blue-500"><Eye size={18} /></button>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </div>
      </div>
    </div>
  );
}
