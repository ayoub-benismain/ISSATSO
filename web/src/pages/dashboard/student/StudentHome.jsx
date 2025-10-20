import React, { useState } from "react";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Legend,
} from "recharts";
import { motion } from "framer-motion";
import { CalendarDays, BarChart2, User } from "lucide-react";
import ActualitySlider from "../../../components/dashboard/ActualitySlider";
import ProfileCard from "../../../components/dashboard/ProfileCard";
import EventCard from "../../../components/dashboard/EventCard";

export default function StudentHome(user , name) {
  const [view, setView] = useState("week");

  const weeklyData = [
    { day: "Mon", Present: 5, Absent: 1 },
    { day: "Tue", Present: 6, Absent: 0 },
    { day: "Wed", Present: 4, Absent: 2 },
    { day: "Thu", Present: 5, Absent: 1 },
    { day: "Fri", Present: 6, Absent: 0 },
  ];

  const monthlyData = [
    { week: "Week 1", Present: 28, Absent: 2 },
    { week: "Week 2", Present: 30, Absent: 6 },
    { week: "Week 3", Present: 29, Absent: 5 },
    { week: "Week 4", Present: 31, Absent: 3 },
  ];

  const data = view === "week" ? weeklyData : monthlyData;

  return (
    <div className="p-6 space-y-6 min-h-screen text-white">
      {/* 📰 Actuality Slider */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
      >
        <ActualitySlider />
      </motion.div>

      {/* 👤 Profile + Attendance Graph */}
      <div className="grid grid-cols-1 xl:grid-cols-3 gap-6">
        {/* Attendance Graph */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="xl:col-span-2 h-[260px] p-3 rounded-2xl bg-blue-600 backdrop-blur-md border border-blue-400/20 shadow-md"
        >
          {/* Header */}
          <div className="flex items-center justify-between mb-3">
            <div className="flex items-center gap-2">
              <BarChart2 className="w-4 h-4 text-yellow-300" />
              <h2 className="text-base font-semibold">Attendance Overview</h2>
            </div>

            <div className="flex items-center gap-2 text-sm">
              <button
                onClick={() => setView("week")}
                className={`px-3 py-1 rounded-xl transition ${
                  view === "week"
                    ? "bg-yellow-400 text-blue-900 font-semibold"
                    : "bg-blue-800 text-gray-300 hover:bg-blue-700"
                }`}
              >
                This Week
              </button>
              <button
                onClick={() => setView("month")}
                className={`px-3 py-1 rounded-xl transition ${
                  view === "month"
                    ? "bg-yellow-400 text-blue-900 font-semibold"
                    : "bg-blue-800 text-gray-300 hover:bg-blue-700"
                }`}
              >
                This Month
              </button>
            </div>
          </div>

          {/* Attendance Chart */}
          <ResponsiveContainer width="100%" height={200}>
            <BarChart data={data}>
              <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.1)" />
              <XAxis
                dataKey={view === "week" ? "day" : "week"}
                stroke="#e0e7ff"
                tick={{ fill: "#e0e7ff", fontSize: 12 }}
              />
              <YAxis stroke="#e0e7ff" tick={{ fill: "#e0e7ff", fontSize: 12 }} />
              <Tooltip
                contentStyle={{
                  backgroundColor: "rgba(0,0,0,0.6)",
                  border: "none",
                  color: "#fff",
                }}
              />
              <Legend />
              <Bar dataKey="Present" fill="#38bdf8" radius={[6, 6, 0, 0]} />
              <Bar dataKey="Absent" fill="#facc15" radius={[6, 6, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </motion.div>

        {/* Profile Section */}
        <motion.div
          initial={{ opacity: 0, x: 40 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="flex flex-col items-center justify-center px-4 rounded-2xl  border-blue-400/30 backdrop-blur-md h-full"
        >
          
          <ProfileCard user={"student"} name={"Ayoub ben ismain"} />
        </motion.div>
      </div>

      {/* 🗓 Upcoming Events */}
      <motion.div
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.4 }}
      >
        <div className="flex items-center gap-2 mb-3">
          <CalendarDays className="text-yellow-500" />
          <h2 className="text-lg font-semibold text-gray-900">Upcoming Events</h2>
        </div>
        <div className="flex flex-col lg:flex-row gap-6">
          <EventCard />
          <EventCard />
          <EventCard />
        </div>
      </motion.div>
    </div>
  );
}
