import React, { useState, useEffect } from "react";
import { Pin, PinOff, Trash2, CheckCircle, Circle } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

export default function NoticesStudent() {
  const token = localStorage.getItem("token");
  const [notices, setNotices] = useState([]);

  useEffect(() => {
    const fetchNotifications = async () => {
      try {
        const res = await fetch(`http://localhost:5000/api/dashboard/notifications`, {
          headers: { Authorization: `Bearer ${token}` },
        });

        const data = await res.json();

        setNotices(
          data.map((n) => ({
            ...n,
            read_status: Boolean(n.read_status),
            pinned: Boolean(n.pinned),
          }))
        );
      } catch (err) {
        console.log("Error fetching notifications:", err);
      }
    };

    fetchNotifications();
  }, [token]);

  // ✅ Correctly named handler
  const handleMarkRead = async (id) => {
    try {
      await fetch(`http://localhost:5000/api/dashboard/notifications/read/${id}`, {
        method: "PATCH",
        headers: { Authorization: `Bearer ${token}` },
      });

      setNotices((prev) =>
        prev.map((n) =>
          (n.id || n._id) === id ? { ...n, read_status: !n.read_status } : n
        )
      );
    } catch (err) {
      console.log("Error marking as read:", err);
    }
  };

  // ✅ Correctly named handler
  const handleTogglePin = async (id) => {
    try {
      await fetch(`http://localhost:5000/api/dashboard/notifications/pin/${id}`, {
        method: "PATCH",
        headers: { Authorization: `Bearer ${token}` },
      });

      setNotices((prev) =>
        prev.map((n) =>
          (n.id || n._id) === id ? { ...n, pinned: !n.pinned } : n
        )
      );
    } catch (err) {
      console.log("Error toggling pin:", err);
    }
  };

  // ✅ Correctly named handler
  const handleDelete = async (id) => {
    try {
      await fetch(`http://localhost:5000/api/dashboard/notifications/${id}`, {
        method: "DELETE",
        headers: { Authorization: `Bearer ${token}` },
      });

      setNotices((prev) => prev.filter((n) => (n.id || n._id) !== id));
    } catch (err) {
      console.log("Error deleting notification:", err);
    }
  };

  return (
    <div className="p-6">
      <h2 className="text-2xl font-bold text-blue-700 mb-6">Student Notices</h2>

      <div className="space-y-4">
        <AnimatePresence>
          {notices.length === 0 ? (
            <p className="text-gray-500">No notices available.</p>
          ) : (
            notices.map((notice) => (
              <motion.div
                key={notice.id || notice._id}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                transition={{ duration: 0.3 }}
                className={`flex justify-between items-start p-4 rounded-2xl shadow-md border transition-all duration-300
                  ${notice.pinned ? "bg-blue-50 border-blue-300" : "bg-white border-gray-200"}
                `}
              >
                {/* Notice message */}
                <div className="flex flex-col">
                  <h3
                    className={`text-lg font-semibold ${
                      notice.read_status ? "text-gray-500 line-through" : "text-gray-800"
                    }`}
                  >
                    {notice.title}
                  </h3>
                  <p
                    className={`text-sm mt-1 ${
                      notice.read_status ? "text-gray-400" : "text-gray-600"
                    }`}
                  >
                    {notice.message}
                  </p>
                  <span className="text-xs text-gray-400 mt-2">{notice.date}</span>
                </div>

                {/* Actions */}
                <div className="flex items-center gap-3">
                  <button
                    onClick={() => handleTogglePin(notice.id || notice._id)}
                    className="text-blue-600 hover:text-blue-800"
                    title={notice.pinned ? "Unpin" : "Pin"}
                  >
                    {notice.pinned ? <PinOff size={18} /> : <Pin size={18} />}
                  </button>

                  <button
                    onClick={() => handleMarkRead(notice.id || notice._id)}
                    className="text-green-600 hover:text-green-800"
                    title={notice.read_status ? "Mark as Unread" : "Mark as Read"}
                  >
                    {notice.read_status ? <CheckCircle size={18} /> : <Circle size={18} />}
                  </button>

                  <button
                    onClick={() => handleDelete(notice.id || notice._id)}
                    className="text-red-600 hover:text-red-800"
                    title="Delete"
                  >
                    <Trash2 size={18} />
                  </button>
                </div>
              </motion.div>
            ))
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}
