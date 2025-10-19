import React, { useState } from "react";
import { Pin, PinOff, Trash2, CheckCircle, Circle } from "lucide-react";

export default function NoticesStudent() {
  const [notices, setNotices] = useState([
    {
      id: 1,
      title: "Exam Schedule Released",
      content: "The final exam schedule for Semester 1 has been published.",
      date: "2025-09-10",
      pinned: true,
      read: false,
    },
    {
      id: 2,
      title: "Library Notice",
      content: "Library will be closed on Friday for maintenance.",
      date: "2025-09-09",
      pinned: false,
      read: true,
    },
    {
      id: 3,
      title: "Event Invitation",
      content: "Join the AI & Innovation Seminar on Saturday.",
      date: "2025-09-08",
      pinned: false,
      read: false,
    },
  ]);

  // Toggle pin
  const togglePin = (id) => {
    setNotices((prev) =>
      prev
        .map((notice) =>
          notice.id === id ? { ...notice, pinned: !notice.pinned } : notice
        )
        .sort((a, b) => (b.pinned === a.pinned ? 0 : b.pinned ? 1 : -1))
    );
  };

  // Toggle read/unread
  const toggleRead = (id) => {
    setNotices((prev) =>
      prev.map((notice) =>
        notice.id === id ? { ...notice, read: !notice.read } : notice
      )
    );
  };

  // Delete notice
  const deleteNotice = (id) => {
    setNotices((prev) => prev.filter((notice) => notice.id !== id));
  };

  return (
    <div className="p-6">
      <h2 className="text-2xl font-semibold text-blue-700 mb-6">
        Student Notices
      </h2>

      <div className="space-y-4">
        {notices.map((notice) => (
          <div
            key={notice.id}
            className={`flex justify-between items-start p-4 rounded-xl shadow-sm border transition-all duration-300 
              ${
                notice.pinned
                  ? "bg-blue-50 border-blue-300"
                  : "bg-white border-gray-200"
              }`}
          >
            {/* Notice content */}
            <div>
              <h3
                className={`text-lg font-medium ${
                  notice.read ? "text-gray-500" : "text-gray-800"
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
              <span className="text-xs text-gray-400 mt-2 block">
                {notice.date}
              </span>
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
          </div>
        ))}
      </div>
    </div>
  );
}
