import React, { useState } from "react";
import { Pin, PinOff, Trash2, CheckCircle, Circle } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

export default function NoticesStudent() {
  const [notices, setNotices] = useState([
    {
      id: 1,
      title: "JIPO 2025 – Integration Day",
      content: "Join us on 23 October 2025 for the Integration Day! Stay tuned for updates.",
      date: "2025-10-23",
      pinned: true,
      read: false,
    },
    {
      id: 2,
      title: "CTRL + F Event",
      content: "Your shortcut to tech! GDGC ISSATSO invites all students to the technology exploration event.",
      date: "2025-09-20",
      pinned: true,
      read: false,
    },
    {
      id: 3,
      title: "Schedule Updated",
      content: "The class schedule has been updated. Last update: 18/10/2025",
      date: "2025-10-18",
      pinned: false,
      read: false,
    },
    {
      id: 4,
      title: "Library Maintenance",
      content: "The library will be closed on Friday for maintenance.",
      date: "2025-10-15",
      pinned: false,
      read: true,
    },
  ]);

  const togglePin = (id) => {
    setNotices((prev) =>
      prev
        .map((notice) =>
          notice.id === id ? { ...notice, pinned: !notice.pinned } : notice
        )
        .sort((a, b) => (b.pinned === a.pinned ? 0 : b.pinned ? 1 : -1))
    );
  };

  const toggleRead = (id) => {
    setNotices((prev) =>
      prev.map((notice) =>
        notice.id === id ? { ...notice, read: !notice.read } : notice
      )
    );
  };

  const deleteNotice = (id) => {
    setNotices((prev) => prev.filter((notice) => notice.id !== id));
  };

  return (
    <div className="p-6">
      <h2 className="text-2xl font-bold text-blue-700 mb-6">Student Notices</h2>

      <div className="space-y-4">
        <AnimatePresence>
          {notices.map((notice) => (
            <motion.div
              key={notice.id}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.3 }}
              className={`flex justify-between items-start p-4 rounded-2xl shadow-md border transition-all duration-300
                ${notice.pinned ? "bg-blue-50 border-blue-300" : "bg-white border-gray-200"}
              `}
            >
              {/* Notice content */}
              <div className="flex flex-col">
                <h3
                  className={`text-lg font-semibold ${
                    notice.read ? "text-gray-500 line-through" : "text-gray-800"
                  }`}
                >
                  {notice.title}
                </h3>
                <p
                  className={`text-sm mt-1 ${
                    notice.read ? "text-gray-400" : "text-gray-600"
                  }`}
                >
                  {notice.content}
                </p>
                <span className="text-xs text-gray-400 mt-2">{notice.date}</span>
              </div>

              {/* Actions */}
              <div className="flex items-center gap-3">
                <button
                  onClick={() => togglePin(notice.id)}
                  className="text-blue-600 hover:text-blue-800"
                  title={notice.pinned ? "Unpin" : "Pin"}
                >
                  {notice.pinned ? <PinOff size={18} /> : <Pin size={18} />}
                </button>

                <button
                  onClick={() => toggleRead(notice.id)}
                  className="text-green-600 hover:text-green-800"
                  title={notice.read ? "Mark as Unread" : "Mark as Read"}
                >
                  {notice.read ? <CheckCircle size={18} /> : <Circle size={18} />}
                </button>

                <button
                  onClick={() => deleteNotice(notice.id)}
                  className="text-red-600 hover:text-red-800"
                  title="Delete"
                >
                  <Trash2 size={18} />
                </button>
              </div>
            </motion.div>
          ))}
        </AnimatePresence>
      </div>
    </div>
  );
}
