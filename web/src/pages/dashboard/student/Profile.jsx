import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Camera,
  X,
  Edit,
  Facebook,
  Linkedin,
  Users,
  BookOpen,
  ClipboardCheck,
} from "lucide-react";
import { ResponsiveContainer, LineChart, Line, XAxis, YAxis, Tooltip } from "recharts";
import CountUp from "react-countup";
import toast, { Toaster } from "react-hot-toast";
import { getUserProfile } from "../../../services/user";

export default function ProfileStudent() {
  const [user, setUser] = useState(null);
  const [countUpTrigger, setCountUpTrigger] = useState(false);
  const [uploadOpen, setUploadOpen] = useState(false);
  const [newPicture, setNewPicture] = useState(null);
  const [password, setPassword] = useState({ current: "", new: "", confirm: "" });
  const [graphView, setGraphView] = useState("day");
  const [editInfoOpen, setEditInfoOpen] = useState(false);
  const [socialOpen, setSocialOpen] = useState(null);
  const [socialUrl, setSocialUrl] = useState("");

  const token = localStorage.getItem("token");

  useEffect(() => {
      if (!token) return;
  
      getUserProfile(token)
        .then((data) => setUser(data))
        .catch((error) => console.error(error));
    }, [token]);





  useEffect(() => {
    setCountUpTrigger(true);
  }, []);

  const handleUpload = (e) => {
    if (e.target.files && e.target.files[0]) {
      const reader = new FileReader();
      reader.onload = (ev) => setNewPicture(ev.target.result);
      reader.readAsDataURL(e.target.files[0]);
      setUploadOpen(true);
    }
  };

  const submitUpload = () => {
    setUser((prev) => ({ ...prev, picture: newPicture }));
    setUploadOpen(false);
    setNewPicture(null);
    toast.success("Profile picture updated!");
  };

  const validatePassword = () => {
    const { current, new: newPass, confirm } = password;
    if (!current || !newPass || !confirm) return "Please fill all fields";
    if (newPass !== confirm) return "New password and confirm do not match";
    if (newPass.length < 8) return "Password must be at least 8 characters";
    if (!/[A-Z]/.test(newPass)) return "Password must include uppercase letter";
    if (!/[a-z]/.test(newPass)) return "Password must include lowercase letter";
    if (!/[0-9]/.test(newPass)) return "Password must include number";
    if (!/[!@#$%^&*]/.test(newPass)) return "Password must include special character";
    return null;
  };

  const submitPassword = () => {
    const error = validatePassword();
    if (error) return toast.error(error);

    // You can add API call here to update password
    setPassword({ current: "", new: "", confirm: "" });
    toast.success("Password updated successfully!");
  };

  const activityData = {
    day: [
      { name: "Mon", usage: 2 },
      { name: "Tue", usage: 5 },
      { name: "Wed", usage: 3 },
      { name: "Thu", usage: 4 },
      { name: "Fri", usage: 6 },
      { name: "Sat", usage: 1 },
      { name: "Sun", usage: 0 },
    ],
    week: [
      { name: "Week 1", usage: 12 },
      { name: "Week 2", usage: 18 },
      { name: "Week 3", usage: 9 },
      { name: "Week 4", usage: 15 },
    ],
    month: [
      { name: "Jan", usage: 40 },
      { name: "Feb", usage: 35 },
      { name: "Mar", usage: 50 },
      { name: "Apr", usage: 45 },
      { name: "May", usage: 60 },
    ],
  };

  const inputClass =
    "w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400 transition";
  const bannerButtonClass =
    "bg-gradient-to-r from-[#8e91f9] via-[#6470ff] to-[#516eff] text-white px-4 py-2 rounded-lg font-semibold hover:opacity-90 transition";

  if (!user) {
    return (
      <div className="flex justify-center items-center h-64 text-gray-500">
        Loading profile...
      </div>
    );
  }

  return (
    <div className="p-6 space-y-8 relative">
      <Toaster position="top-right" />

      {/* Banner */}
      <div className="bg-gradient-to-r from-[#8e91f9] via-[#6470ff] to-[#516eff] rounded-xl w-full shadow-md relative flex flex-col items-center py-5">
        <div className="relative w-20 h-20">
          <img
            src={user.picture || "https://i.pravatar.cc/150?img=65"}
            alt="Profile"
            className="w-20 h-20 rounded-full object-cover border-4 border-white shadow-lg"
          />
          <div className="absolute inset-0 rounded-full bg-black/30 opacity-0 hover:opacity-100 flex justify-center items-center cursor-pointer transition">
            <Camera
              size={20}
              className="text-white"
              onClick={() => document.getElementById("fileInput").click()}
            />
          </div>
          <input id="fileInput" type="file" className="hidden" onChange={handleUpload} />
        </div>

        <h2 className="mt-4 text-2xl font-bold text-white">{user.username || "..."}</h2>
        <p className="text-white/80 capitalize">{user.role || "..."}</p>

        {/* Stats */}
        <div className="flex gap-6 mt-2 text-white font-semibold">
          <div className="flex flex-col items-center">
            <Users size={20} className="mb-1" />
            {countUpTrigger && <CountUp end={120} duration={1.5} className="text-xl" />}
            <span className="text-sm">Students</span>
          </div>
          <div className="flex flex-col items-center">
            <BookOpen size={20} className="mb-1" />
            {countUpTrigger && <CountUp end={8} duration={1.5} className="text-xl" />}
            <span className="text-sm">Courses</span>
          </div>
          <div className="flex flex-col items-center">
            <ClipboardCheck size={20} className="mb-1" />
            {countUpTrigger && <CountUp end={35} duration={1.5} className="text-xl" />}
            <span className="text-sm">Assignments</span>
          </div>
        </div>

        <div className="absolute bottom-4 right-4 flex gap-3 text-white">
          <Facebook
            className="cursor-pointer"
            size={20}
            onClick={() => {
              setSocialOpen("facebook");
              setSocialUrl(user.facebook || "");
            }}
          />
          <Linkedin
            className="cursor-pointer"
            size={20}
            onClick={() => {
              setSocialOpen("linkedin");
              setSocialUrl(user.linkedin || "");
            }}
          />
        </div>

        <div className="absolute bottom-4 left-4 text-white cursor-pointer" onClick={() => setEditInfoOpen(true)}>
          <Edit size={20} />
        </div>
      </div>

      {/* Main Content */}
      <div className="grid lg:grid-cols-2 gap-6">
        {/* Password Update */}
        <div className="bg-white rounded-xl shadow-md p-6 space-y-4">
          <h3 className="text-lg font-semibold text-gray-700">Update Password</h3>
          <div className="space-y-3">
            <input
              type="password"
              placeholder="Current Password"
              className={inputClass}
              value={password.current}
              onChange={(e) => setPassword({ ...password, current: e.target.value })}
            />
            <input
              type="password"
              placeholder="New Password"
              className={inputClass}
              value={password.new}
              onChange={(e) => setPassword({ ...password, new: e.target.value })}
            />
            <input
              type="password"
              placeholder="Confirm New Password"
              className={inputClass}
              value={password.confirm}
              onChange={(e) => setPassword({ ...password, confirm: e.target.value })}
            />
            <button className={bannerButtonClass} onClick={submitPassword}>
              Update Password
            </button>
          </div>
        </div>

        {/* Activity Graph */}
        <div className="bg-white rounded-xl shadow-md p-6 space-y-4">
          <div className="flex gap-3 mb-4 justify-center">
            {["day", "week", "month"].map((view) => (
              <button
                key={view}
                className={`px-4 py-1 rounded-lg font-semibold transition ${
                  graphView === view
                    ? "bg-blue-500 text-white"
                    : "bg-gray-200 text-gray-700 hover:bg-gray-300"
                }`}
                onClick={() => setGraphView(view)}
              >
                {view.charAt(0).toUpperCase() + view.slice(1)}
              </button>
            ))}
          </div>

          <ResponsiveContainer width="100%" height={200}>
            <LineChart data={activityData[graphView]}>
              <XAxis dataKey="name" stroke="#6c83f5" />
              <YAxis stroke="#6c83f5" />
              <Tooltip />
              <Line
                type="monotone"
                dataKey="usage"
                stroke="#4ade80"
                strokeWidth={3}
                dot={{ r: 4 }}
              />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Upload Modal */}
      <AnimatePresence>
        {uploadOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/50 flex justify-center items-center z-50"
          >
            <motion.div
              initial={{ scale: 0.8 }}
              animate={{ scale: 1 }}
              exit={{ scale: 0.8 }}
              className="bg-white p-6 rounded-xl shadow-xl relative w-80 flex flex-col items-center"
            >
              <button
                className="absolute top-2 right-2 text-gray-500 hover:text-red-500"
                onClick={() => setUploadOpen(false)}
              >
                <X size={20} />
              </button>
              <h3 className="font-semibold text-gray-700 mb-4">Resize & Move Photo</h3>
              {newPicture && (
                <img src={newPicture} alt="Preview" className="w-60 h-60 object-cover rounded-full" />
              )}
              <button className={bannerButtonClass} onClick={submitUpload}>
                Submit Photo
              </button>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Edit Info Modal */}
      <AnimatePresence>
        {editInfoOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/50 flex justify-center items-center z-50"
          >
            <motion.div
              initial={{ scale: 0.8 }}
              animate={{ scale: 1 }}
              exit={{ scale: 0.8 }}
              className="bg-white p-6 rounded-xl shadow-xl relative w-80 flex flex-col"
            >
              <button
                className="absolute top-2 right-2 text-gray-500 hover:text-red-500"
                onClick={() => setEditInfoOpen(false)}
              >
                <X size={20} />
              </button>
              <h3 className="font-semibold text-gray-700 mb-4">Edit Info</h3>
              <input
                className={inputClass + " mb-3"}
                value={user.username}
                onChange={(e) => setUser({ ...user, username: e.target.value })}
                placeholder="Name"
              />
              <button
                className={bannerButtonClass}
                onClick={() => {
                  setEditInfoOpen(false);
                  toast.success("Profile info updated!");
                }}
              >
                Update Info
              </button>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
