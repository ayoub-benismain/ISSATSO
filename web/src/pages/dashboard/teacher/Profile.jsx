import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Camera, X, Edit, Facebook, Linkedin, Users, BookOpen, ClipboardCheck } from "lucide-react";
import { ResponsiveContainer, LineChart, Line, XAxis, YAxis, Tooltip } from "recharts";
import CountUp from "react-countup";
import toast, { Toaster } from "react-hot-toast";

export default function ProfileTeacher() {
  const [profile, setProfile] = useState({
    name: "Roua Jabla",
    dob: "1985-03-12",
    role: "Teacher",
    students: 120,
    courses: 8,
    assignments: 35,
    picture: "https://i.pravatar.cc/150?img=65",
    facebook: "",
    linkedin: "",
  });

  const [uploadOpen, setUploadOpen] = useState(false);
  const [newPicture, setNewPicture] = useState(null);
  const [password, setPassword] = useState({ current: "", new: "", confirm: "" });
  const [graphView, setGraphView] = useState("day");
  const [editInfoOpen, setEditInfoOpen] = useState(false);
  const [socialOpen, setSocialOpen] = useState(null); // "facebook" | "linkedin" | null
  const [socialUrl, setSocialUrl] = useState("");
  const [countUpTrigger, setCountUpTrigger] = useState(false);

  useEffect(() => {
    setCountUpTrigger(true); // trigger CountUp animation
  }, []);

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

  const handleUpload = (e) => {
    if (e.target.files && e.target.files[0]) {
      const reader = new FileReader();
      reader.onload = (ev) => setNewPicture(ev.target.result);
      reader.readAsDataURL(e.target.files[0]);
      setUploadOpen(true);
    }
  };

  const submitUpload = () => {
    setProfile((prev) => ({ ...prev, picture: newPicture }));
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
    if (error) {
      toast.error(error);
      return;
    }
    setPassword({ current: "", new: "", confirm: "" });
    toast.success("Password updated successfully!");
  };

  const inputClass =
    "w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400 transition";

  const bannerButtonClass =
    "bg-gradient-to-r from-[#8e91f9] via-[#6470ff] to-[#516eff] text-white px-4 py-2 rounded-lg font-semibold hover:opacity-90 transition";

  return (
    <div className="p-6 space-y-8 relative">
      <Toaster position="top-right" />

      {/* Banner */}
      <div className="bg-gradient-to-r from-[#8e91f9] via-[#6470ff] to-[#516eff] rounded-xl w-full shadow-md relative flex flex-col items-center py-5">
        <div className="relative w-20 h-20">
          <img
            src={profile.picture}
            alt="Profile"
            className="w-20 h-20 rounded-full object-cover border-4 border-white shadow-lg"
          />
          <div className="absolute inset-0 rounded-full bg-black/30 opacity-0 hover:opacity-100 flex justify-center items-center cursor-pointer transition">
            <Camera size={20} className="text-white" onClick={() => document.getElementById("fileInput").click()} />
          </div>
          <input id="fileInput" type="file" className="hidden" onChange={handleUpload} />
        </div>

        <h2 className="mt-4 text-2xl font-bold text-white">{profile.name}</h2>
        <p className="text-white/80">{profile.role}</p>

        {/* Stats */}
        <div className="flex gap-6 mt-2 text-white font-semibold">
          <div className="flex flex-col items-center">
            <Users size={20} className="mb-1" />
            {countUpTrigger && <CountUp end={profile.students} duration={1.5} className="text-xl" />}
            <span className="text-sm">Students</span>
          </div>
          <div className="flex flex-col items-center">
            <BookOpen size={20} className="mb-1" />
            {countUpTrigger && <CountUp end={profile.courses} duration={1.5} className="text-xl" />}
            <span className="text-sm">Courses</span>
          </div>
          <div className="flex flex-col items-center">
            <ClipboardCheck size={20} className="mb-1" />
            {countUpTrigger && <CountUp end={profile.assignments} duration={1.5} className="text-xl" />}
            <span className="text-sm">Assignments</span>
          </div>
        </div>

        {/* Bottom-right social icons */}
        <div className="absolute bottom-4 right-4 flex gap-3 text-white">
          <Facebook className="cursor-pointer" size={20} onClick={() => { setSocialOpen("facebook"); setSocialUrl(profile.facebook); }} />
          <Linkedin className="cursor-pointer" size={20} onClick={() => { setSocialOpen("linkedin"); setSocialUrl(profile.linkedin); }} />
        </div>

        {/* Bottom-left edit info */}
        <div className="absolute bottom-4 left-4 text-white cursor-pointer" onClick={() => setEditInfoOpen(true)}>
          <Edit size={20} />
        </div>
      </div>

      {/* Main Content */}
      <div className="grid lg:grid-cols-2 gap-6">
        {/* Password Update Card */}
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

        {/* Activity Graph Card */}
        <div className="bg-white rounded-xl shadow-md p-6 space-y-4">

          {/* Graph Toggle */}
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
              <Line type="monotone" dataKey="usage" stroke="#4ade80" strokeWidth={3} dot={{ r: 4 }} />
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
                value={profile.name}
                onChange={(e) => setProfile({ ...profile, name: e.target.value })}
                placeholder="Name"
              />
              <input
                type="date"
                className={inputClass + " mb-3"}
                value={profile.dob}
                onChange={(e) => setProfile({ ...profile, dob: e.target.value })}
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

      {/* Social URL Modal */}
      <AnimatePresence>
        {socialOpen && (
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
                onClick={() => setSocialOpen(null)}
              >
                <X size={20} />
              </button>
              <h3 className="font-semibold text-gray-700 mb-4">
                Set {socialOpen === "facebook" ? "Facebook" : "LinkedIn"} URL
              </h3>
              <input
                type="text"
                className={inputClass + " mb-3"}
                placeholder={socialOpen === "facebook" ? "Facebook URL" : "LinkedIn URL"}
                value={socialUrl}
                onChange={(e) => setSocialUrl(e.target.value)}
              />
              <button
                className={bannerButtonClass}
                onClick={() => {
                  setProfile((prev) => ({ ...prev, [socialOpen]: socialUrl }));
                  setSocialOpen(null);
                  toast.success(
                    socialOpen === "facebook"
                      ? "Facebook URL updated!"
                      : "LinkedIn URL updated!"
                  );
                }}
              >
                Submit
              </button>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
