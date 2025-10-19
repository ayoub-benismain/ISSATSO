import React, { useState } from "react";
import CountUp from "react-countup";
import { motion, AnimatePresence } from "framer-motion";
import { AreaChart, Area, XAxis, YAxis, Tooltip, ResponsiveContainer } from "recharts";

export default function Card({ icon, value, text, isOutlined, prefix = "", suffix = "" }) {
  const [showGraph, setShowGraph] = useState(false);

  const data = [
    { name: "Jan", value: value * 0.4 },
    { name: "Feb", value: value * 0.6 },
    { name: "Mar", value: value * 0.8 },
    { name: "Apr", value: value },
    { name: "May", value: value * 0.9 },
    { name: "Jun", value: value * 0.7 },
  ];

  return (
    <>
      <motion.div
        whileHover={{ scale: 1.05, boxShadow: "0px 8px 20px rgba(108,131,245,0.4)" }}
        transition={{ type: "spring", stiffness: 200, damping: 15 }}
        onClick={() => setShowGraph(true)}
        className={`relative cursor-pointer rounded-2xl shadow-md px-6 py-4 flex flex-col items-center gap-3 ${
          isOutlined ? "border-2 border-blue-400" : ""
        }`}
        style={{ background: `linear-gradient(60deg, #6c83f5 20%, #ffffff 80%)` }}
      >
        <div className="text-3xl text-gray-800 z-10">{icon}</div>
        <div className="text-2xl font-bold text-blue-500 z-10">
          <CountUp end={value} duration={3} prefix={prefix} suffix={suffix} />
        </div>
        <div className="text-lg font-semibold text-gray-600 text-center z-10">{text}</div>
      </motion.div>

      {/* Graph Modal */}
      <AnimatePresence>
        {showGraph && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 0.5 }}
              exit={{ opacity: 0 }}
              onClick={() => setShowGraph(false)}
              className="fixed inset-0 bg-black z-40"
            />

            <motion.div
              initial={{ opacity: 0, scale: 0.8, y: -50 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.8, y: -50 }}
              transition={{ duration: 0.3 }}
              className="fixed z-50 top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-white rounded-2xl shadow-xl p-6 w-[90vw] max-w-md"
            >
              <h3 className="text-xl font-semibold text-gray-800 mb-4 text-center">{text} Trend</h3>
              <div style={{ width: "100%", height: 250 }}>
                <ResponsiveContainer>
                  <AreaChart data={data} margin={{ top: 10, right: 0, left: 0, bottom: 0 }}>
                    <defs>
                      <linearGradient id="colorValue" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="5%" stopColor="#6c83f5" stopOpacity={0.8} />
                        <stop offset="95%" stopColor="#6c83f5" stopOpacity={0} />
                      </linearGradient>
                    </defs>
                    <XAxis dataKey="name" stroke="#6c83f5" />
                    <YAxis stroke="#6c83f5" />
                    <Tooltip
                      contentStyle={{ borderRadius: "12px", border: "none" }}
                      itemStyle={{ color: "#6c83f5" }}
                    />
                    <Area
                      type="monotone"
                      dataKey="value"
                      stroke="#6c83f5"
                      fill="url(#colorValue)"
                      strokeWidth={3}
                      dot={{ r: 4, strokeWidth: 2, fill: "#6c83f5" }}
                    />
                  </AreaChart>
                </ResponsiveContainer>
              </div>
              <button
                onClick={() => setShowGraph(false)}
                className="mt-6 block mx-auto px-6 py-2 rounded-full bg-blue-500 text-white font-semibold hover:bg-blue-600 transition"
              >
                Close
              </button>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  );
}
