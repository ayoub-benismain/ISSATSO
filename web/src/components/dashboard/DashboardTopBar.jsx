import React, { useState, useEffect, useRef } from "react";
import { Menu, Bell, ChevronDown, User, LogOut } from "lucide-react";
import { useNavigate } from "react-router-dom";

export default function DashboardTopBar({ pageTitle, user, setSidebarOpen, token }) {
  const profileActions = [
    {
      name: "Profile",
      icon: <User className="w-4 h-4 text-blue-400" />,
      path: `/dashboard/${user.role}/profile`,
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
        setNotifications(
          data
            .sort((a, b) => new Date(b.created_at) - new Date(a.created_at))
            .slice(0, 5)
            .map((n) => ({
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

  useEffect(() => {
    const handleClickOutside = (e) => {
      if (!profileRef.current?.contains(e.target)) setProfileOpen(false);
      if (!notifRef.current?.contains(e.target)) setNotifOpen(false);
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const unreadCount = notifications.filter((n) => !n.read_status).length;

  return (
    <header className="p-4 flex items-center justify-between sticky top-0 z-30 w-full 
      backdrop-blur-lg bg-white/10 border-b border-gray-200/20">
      
      {/* Left: Menu + Page Title */}
      <div className="flex items-center gap-4">
        <Menu
          className="w-6 h-6 cursor-pointer lg:hidden hover:text-blue-500 transition"
          onClick={() => setSidebarOpen(true)}
        />
        <h2 className="text-2xl font-semibold text-gray-800 hidden lg:block tracking-tight">
          {pageTitle}
        </h2>
      </div>

      {/* Right: Notifications + Profile */}
      <div className="flex items-center gap-6">
        {/* Notifications */}
        <div className="relative" ref={notifRef}>
          <button
            onClick={() => setNotifOpen(!notifOpen)}
            className="relative p-2 rounded-full hover:bg-gray-200/20 transition"
          >
            <Bell className="w-5 h-5 text-gray-700" />
            {unreadCount > 0 && (
              <span className="absolute -top-1.5 -right-1.5 bg-red-500 text-white text-[10px] font-bold rounded-full px-1.5 py-0.5 shadow">
                {unreadCount}
              </span>
            )}
          </button>

          {/* Notifications Dropdown */}
          {notifOpen && (
            <div className="absolute right-0 mt-3 w-80 bg-white/90 backdrop-blur-md border border-gray-200/40 rounded-2xl shadow-lg z-30 p-3 transition-all">
              <h3 className="text-sm font-semibold text-gray-700 mb-2 flex justify-between items-center">
                Notifications
                <span className="text-xs text-gray-400">
                  {notifications.length > 0 ? "Recent" : ""}
                </span>
              </h3>

              {notifications.length === 0 ? (
                <p className="text-sm text-gray-600 text-center py-4">No notifications</p>
              ) : (
                <div className="max-h-64 overflow-y-auto space-y-2 scrollbar-thin scrollbar-thumb-gray-300 scrollbar-track-transparent">
                  {notifications.map((notice) => (
                    <div
                      key={notice.id}
                      onClick={() => handleMarkRead(notice.id)}
                      className={`p-3 rounded-xl cursor-pointer transition-all duration-200 ${
                        notice.read_status
                          ? "bg-gray-50 text-gray-500"
                          : "bg-blue-50 text-gray-800 border border-blue-100"
                      } hover:bg-blue-100/60`}
                    >
                      <p className="text-sm font-medium">{notice.message}</p>
                      <p className="text-xs text-gray-400 mt-1">
                        {new Date(notice.created_at).toLocaleString()}
                      </p>
                    </div>
                  ))}
                </div>
              )}
            </div>
          )}
        </div>

        {/* Profile */}
        <div className="relative" ref={profileRef}>
          <button
            onClick={() => setProfileOpen(!profileOpen)}
            className="flex items-center gap-2 px-3 py-2 hover:bg-gray-200/20 rounded-xl transition"
          >
            <img
              src={user?.avatar || "https://i.pravatar.cc/300"}
              alt="Profile"
              className="w-8 h-8 rounded-full object-cover border border-gray-300/50"
            />
            <span className="text-sm font-medium text-gray-800">{user?.name || "User"}</span>
            <ChevronDown className="w-4 h-4 text-gray-600" />
          </button>

          {profileOpen && (
            <div className="absolute right-0 mt-3 w-48 bg-white/90 backdrop-blur-md border border-gray-200/40 rounded-2xl shadow-lg z-30 p-3">
              <ul className="text-sm space-y-2">
                {profileActions.map((action) => (
                  <li
                    key={action.name}
                    onClick={() => {
                      setProfileOpen(false);
                      navigate(action.path);
                    }}
                    className={`flex items-center gap-2 p-2 rounded-md cursor-pointer hover:bg-gray-100 transition ${
                      action.name === "Logout"
                        ? "text-red-500 font-semibold"
                        : "text-gray-800"
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
