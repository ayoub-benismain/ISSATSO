import React, { useState } from "react";
import ActualitySlider from "../../../components/dashboard/ActualitySlider";
import ProfileCard from "../../../components/dashboard/ProfileCard";
import { UsersRound, Book } from "lucide-react";
import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  BarChart,
  Bar,
  CartesianGrid,
} from "recharts";

// Example data
const coursesData = [
  { month: "Jan", value: 5 },
  { month: "Feb", value: 6 },
  { month: "Mar", value: 7 },
  { month: "Apr", value: 8 },
  { month: "May", value: 6 },
  { month: "Jun", value: 9 },
];

const attendanceData = [
  { month: "Jan", attendance: 75 },
  { month: "Feb", attendance: 80 },
  { month: "Mar", attendance: 85 },
  { month: "Apr", attendance: 90 },
  { month: "May", attendance: 88 },
  { month: "Jun", attendance: 95 },
];

export default function TeacherHome() {
  const [isEditing, setIsEditing] = useState(false);

  return (
    <div className="lg:px-6 py-4 flex flex-col gap-8 relative">
      {/* Actuality Slider */}
      <ActualitySlider />

      {/* Graphs Section */}
      <div className="flex flex-col lg:flex-row gap-6 px-4">
        {/* Courses Trend */}
        <div className="flex-1 bg-white rounded-2xl p-4 shadow hover:shadow-lg transition">
          <h3 className="text-gray-600 font-semibold mb-2 flex items-center gap-2">
            <Book size={20} /> Courses Trend
          </h3>
          <div className="w-full h-40">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={coursesData}>
                <defs>
                  <linearGradient id="colorCourses" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#0066ff" stopOpacity={0.7} />
                    <stop offset="95%" stopColor="#0066ff" stopOpacity={0} />
                  </linearGradient>
                </defs>
                <XAxis dataKey="month" stroke="#0057d9" />
                <YAxis stroke="#0057d9" />
                <Tooltip />
                <Area
                  type="monotone"
                  dataKey="value"
                  stroke="#0057d9"
                  fill="url(#colorCourses)"
                  strokeWidth={2}
                />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Attendance Vertical Bar Chart */}
        <div className="flex-1 bg-white rounded-2xl p-4 shadow hover:shadow-lg transition">
          <h3 className="text-gray-600 font-semibold mb-2 flex items-center gap-2">
            <UsersRound size={20} /> Student Attendance
          </h3>
          <div className="w-full h-40">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={attendanceData} barSize={28}>
                <defs>
                  <linearGradient id="colorBar" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#FFD93D" stopOpacity={0.9} />
                    <stop offset="95%" stopColor="#FDE68A" stopOpacity={0.4} />
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
                <XAxis dataKey="month" stroke="#FBBF24" />
                <YAxis stroke="#FBBF24" />
                <Tooltip cursor={{ fill: "rgba(0,0,0,0.05)" }} />
                <Bar
                  dataKey="attendance"
                  fill="url(#colorBar)"
                  radius={[6, 6, 0, 0]}
                />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="flex flex-col lg:flex-row w-full gap-6 px-4">
        {/* Events Section */}
        <div className="w-full lg:w-3/4 flex flex-col gap-6">
          <div>
            <h2 className="text-xl text-gray-600 font-semibold mb-2">
              Upcoming Events
            </h2>
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
          <ProfileCard onEdit={() => setIsEditing(true)} user="teacher" name="Manel mili" />
        </div>
      </div>
    </div>
  );
}
