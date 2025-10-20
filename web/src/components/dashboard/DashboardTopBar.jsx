import React, { useState, useEffect, useRef } from "react";
import { Menu, Bell, ChevronDown, User, LogOut } from "lucide-react";
import { useNavigate } from "react-router-dom";

export default function DashboardTopBar({ pageTitle, user, setSidebarOpen, token }) {
  const profileActions = [
    {
      name: "Profile",
      icon: <User className="w-4 h-4 text-blue-400" />,
      path: `/dashboard/${user.role}/profile`, // ✅ absolute path
    },
    { name: "Logout", icon: <LogOut className="w-4 h-4 text-red-500" />, path: "/logout" },
  ];

  const [profileOpen, setProfileOpen] = useState(false);
  const [notifOpen, setNotifOpen] = useState(false);
  const [notifications, setNotifications] = useState([]);
  const profileRef = useRef();
  const notifRef = useRef();
  const navigate = useNavigate();

  useEffect(() => {
    const fetchNotifications = async () => {
      try {
        const res = await fetch(`http://localhost:5000/api/dashboard/notifications`, {
          headers: { Authorization: `Bearer ${token}` },
        });

        const data = await res.json();
        console.log(res)
        setNotifications(
          data.slice(0, 5).map((n) => ({
            ...n,
            read_status: Boolean(n.read_status),
            pinned: Boolean(n.pinned),
          }))
        );
      } catch (err) {
        console.log(err);
      }
    };
    fetchNotifications();
  }, [token]);

  const handleMarkRead = async (id) => {
    try {
      await fetch(`http://localhost:5000/api/dashboard/notifications/read/${id}`, {
        method: "PATCH",
        headers: { Authorization: `Bearer ${token}` },
      });
      setNotifications((prev) =>
        prev.map((n) => (n.id === id ? { ...n, read_status: !n.read_status } : n))
      );
    } catch (err) {
      console.log(err);
    }
  };

  const handleTogglePin = async (id) => {
    try {
      await fetch(`http://localhost:5000/api/dashboard/notifications/pin/${id}`, {
        method: "PATCH",
        headers: { Authorization: `Bearer ${token}` },
      });
      setNotifications((prev) =>
        prev.map((n) => (n.id === id ? { ...n, pinned: !n.pinned } : n))
      );
    } catch (err) {
      console.log(err);
    }
  };

  const handleDelete = async (id) => {
    try {
      await fetch(`http://localhost:5000/api/dashboard/notifications/${id}`, {
        method: "DELETE",
        headers: { Authorization: `Bearer ${token}` },
      });
      setNotifications((prev) => prev.filter((n) => n.id !== id));
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    const handleClickOutside = (e) => {
      if (!profileRef.current?.contains(e.target)) setProfileOpen(false);
      if (!notifRef.current?.contains(e.target)) setNotifOpen(false);
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <header className="p-4 flex items-center justify-between sticky top-0 z-30 w-full text-gray-800">
      {/* Left: Menu */}
      <div className="flex items-center gap-4">
        <Menu
          className="w-6 h-6 cursor-pointer lg:hidden hover:text-blue-500 transition"
          onClick={() => setSidebarOpen(true)}
        />
        <h2 className="text-2xl font-bold hidden lg:block">{pageTitle}</h2>
      </div>

      {/* Right: Notifications + Profile */}
      <div className="flex items-center gap-6">
        {/* Notifications */}
        <div className="relative" ref={notifRef}>
          <button
            onClick={() => setNotifOpen(!notifOpen)}
            className="p-2 rounded-full hover:bg-gray-200/30 transition"
          >
            <Bell className="w-5 h-5" />
          </button>
          {notifOpen && (
            <div className="absolute right-0 mt-2 w-80 bg-gray-100 rounded-xl shadow-lg p-3 z-30">
              {notifications.length === 0 ? (
                <p className="text-sm text-gray-600">No new notifications</p>
              ) : (
                notifications.map((notice) => (
                  <div
                    key={notice.id}
                    className={`p-2 rounded-md cursor-pointer hover:bg-gray-200 flex justify-between items-center ${
                      notice.read_status ? "text-gray-500" : "text-gray-800 font-medium"
                    }`}
                  >
                    <div onClick={() => handleMarkRead(notice.id)}>{notice.message}</div>
                    <div className="flex items-center gap-2">
                      <button
                        onClick={() => handleTogglePin(notice.id)}
                        className="text-blue-600 hover:text-blue-800"
                      >
                        {notice.pinned ? "📌" : "📍"}
                      </button>
                      <button
                        onClick={() => handleDelete(notice.id)}
                        className="text-red-600 hover:text-red-800"
                      >
                        ❌
                      </button>
                    </div>
                  </div>
                ))
              )}
            </div>
          )}
        </div>

        {/* Profile */}
        <div className="relative" ref={profileRef}>
          <button
            onClick={() => setProfileOpen(!profileOpen)}
            className="flex items-center gap-2 px-3 py-2 hover:bg-gray-200/30 rounded-xl transition"
          >
            <img
              src={user?.avatar || "https://i.pravatar.cc/300"}
              alt="Profile"
              className="w-8 h-8 rounded-full object-cover border border-gray-300/50"
            />
            <span className="text-sm font-medium">{user?.name || "Ayoub"}</span>
            <ChevronDown className="w-4 h-4 text-gray-600" />
          </button>

            {profileOpen && (
              <div className="absolute right-0 mt-3 w-48 bg-white rounded-xl shadow-lg z-30 p-3 border border-gray-200">
                <ul className="text-sm space-y-2">
                  {profileActions.map((action) => (
                    <li
                      key={action.name}
                      onClick={() => {
                        setProfileOpen(false); // ✅ close dropdown
                        navigate(action.path); // navigate to route
                      }}
                      className={`flex items-center gap-2 p-2 rounded-md cursor-pointer hover:bg-gray-100 transition ${
                        action.name === "Logout" ? "text-red-500 font-semibold" : "text-gray-800"
                      }`}
                    >
                      {action.icon}
                      <span>{action.name}</span>
                    </li>
                  ))}
                </ul>
              </div>
            )}

        </div>
      </div>
    </header>
  );
}
