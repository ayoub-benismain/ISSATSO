import React, { useState } from "react";
import ActualitySlider from "../../../components/dashboard/ActualitySlider";
import ProfileCard from "../../../components/dashboard/ProfileCard";
import { UsersRound, Book } from "lucide-react";
import { AreaChart, Area, XAxis, YAxis, Tooltip, ResponsiveContainer } from "recharts";

// Example data for small graphs
const coursesData = [
  { month: "Jan", value: 5 },
  { month: "Feb", value: 6 },
  { month: "Mar", value: 7 },
  { month: "Apr", value: 8 },
  { month: "May", value: 6 },
  { month: "Jun", value: 9 },
];

const attendanceData = [
  { month: "Jan", value: 70 },
  { month: "Feb", value: 80 },
  { month: "Mar", value: 85 },
  { month: "Apr", value: 90 },
  { month: "May", value: 80 },
  { month: "Jun", value: 95 },
];

export default function TeacherHome() {
  const [isEditing, setIsEditing] = useState(false);

  return (
    <div className="lg:px-6 py-4 flex flex-col gap-8 relative">
      {/* Actuality Slider */}
      <ActualitySlider />

      {/* Small Graphs Section */}
      <div className="flex flex-col lg:flex-row gap-6 px-4">
        <div className="flex-1 bg-white rounded-2xl p-4 shadow hover:shadow-lg transition">
          <h3 className="text-gray-600 font-semibold mb-2 flex items-center gap-2">
            <Book size={20} /> Courses Trend
          </h3>
          <div className="w-full h-32">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={coursesData}>
                <defs>
                  <linearGradient id="colorCourses" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#6c83f5" stopOpacity={0.6} />
                    <stop offset="95%" stopColor="#6c83f5" stopOpacity={0} />
                  </linearGradient>
                </defs>
                <XAxis dataKey="month" stroke="#6c83f5" />
                <YAxis stroke="#6c83f5" />
                <Tooltip />
                <Area type="monotone" dataKey="value" stroke="#6c83f5" fill="url(#colorCourses)" strokeWidth={2} />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </div>

        <div className="flex-1 bg-white rounded-2xl p-4 shadow hover:shadow-lg transition">
          <h3 className="text-gray-600 font-semibold mb-2 flex items-center gap-2">
            <UsersRound size={20} /> Attendance Trend
          </h3>
          <div className="w-full h-32">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={attendanceData}>
                <defs>
                  <linearGradient id="colorAttendance" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#34d399" stopOpacity={0.6} />
                    <stop offset="95%" stopColor="#34d399" stopOpacity={0} />
                  </linearGradient>
                </defs>
                <XAxis dataKey="month" stroke="#34d399" />
                <YAxis stroke="#34d399" />
                <Tooltip />
                <Area type="monotone" dataKey="value" stroke="#34d399" fill="url(#colorAttendance)" strokeWidth={2} />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="flex flex-col lg:flex-row w-full gap-6 px-4">
        {/* Left Section - Events */}
        <div className="w-full lg:w-3/4 flex flex-col gap-6">
          <div>
            <h2 className="text-xl text-gray-600 font-semibold mb-2">Upcoming Events</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="bg-white rounded-2xl shadow p-4 hover:shadow-lg transition">
                <h4 className="font-semibold text-gray-700">AI Seminar</h4>
                <p className="text-gray-500 text-sm">Monday, 08:30 - 10:00</p>
              </div>
              <div className="bg-white rounded-2xl shadow p-4 hover:shadow-lg transition">
                <h4 className="font-semibold text-gray-700">Database Workshop</h4>
                <p className="text-gray-500 text-sm">Tuesday, 10:10 - 11:40</p>
              </div>
            </div>
          </div>
        </div>

        {/* Profile Section */}
        <div className="w-full lg:w-1/4">
          <ProfileCard onEdit={() => setIsEditing(true)} />
        </div>
      </div>

      {/* Edit Profile Modal */}
      {isEditing && (
        <div className="fixed inset-0 flex items-center justify-center bg-black/40 backdrop-blur-sm z-50">
          <div className="bg-white rounded-2xl shadow-lg p-6 w-[90%] sm:w-[400px] animate-fade-in">
            <h2 className="text-xl font-semibold text-gray-800 mb-4">Edit Profile</h2>
            <form className="flex flex-col gap-3">
              <input type="text" placeholder="Full Name" className="border rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400" />
              <input type="text" placeholder="Title (Professor)" className="border rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400" />
              <input type="text" placeholder="Subjects (comma separated)" className="border rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400" />
              <input type="url" placeholder="LinkedIn URL" className="border rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400" />

              <div className="flex justify-end gap-3 mt-4">
                <button type="button" onClick={() => setIsEditing(false)} className="px-4 py-2 rounded-lg bg-gray-200 hover:bg-gray-300 transition">Cancel</button>
                <button type="submit" className="px-4 py-2 rounded-lg bg-blue-500 text-white hover:bg-blue-600 transition">Save</button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
