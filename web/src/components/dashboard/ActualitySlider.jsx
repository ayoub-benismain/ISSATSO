import React, { useState } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { AnimatePresence, motion } from "framer-motion";
import { useNavigate } from "react-router-dom"; // <--- import

// Notices data
const noticesData = [
  {
    id: 1,
    title: "JIPO 2024 – Journée d'intégration",
    content: "Join us on 23 October 2024 for the Integration Day! Stay tuned for updates.",

    pinned: true,
    read: false,
  },
  {
    id: 2,
    title: "CTRL + F Event",
    content: "Your shortcut to tech! GDGC ISSATSO invites all students to the technology exploration event.",

    pinned: true,
    read: false,
  },
  {
    id: 3,
    title: "Schedule Updated",
    content: "The class schedule has been updated. Last update: 18/10/2025",

    pinned: false,
    read: false,
  },
  {
    id: 4,
    title: "Library Maintenance",
    content: "The library will be closed on Friday for maintenance.",

    pinned: false,
    read: true,
  },
];

// Sort so pinned notices appear first
const sortedNotices = [...noticesData].sort((a, b) => (b.pinned ? 1 : 0) - (a.pinned ? 1 : 0));

export default function ActualitySlider() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [direction, setDirection] = useState(0); // -1 for left, 1 for right
  const navigate = useNavigate(); // <--- use navigate

  const paginate = (newDirection) => {
    setDirection(newDirection);
    setCurrentIndex((prev) =>
      newDirection === 1
        ? (prev + 1) % sortedNotices.length
        : (prev - 1 + sortedNotices.length) % sortedNotices.length
    );
  };

  return (
    <div className="lg:w-full w-full mx-auto relative select-none">
      <div className="relative overflow-hidden rounded-2xl bg-gradient-to-b from-[#8e91f9] via-[#6470ff] to-[#516eff] text-white p-6 shadow-xl">
        {/* Arrows */}
        <button
          onClick={() => paginate(-1)}
          className="absolute -left-6 top-1/2 transform -translate-y-1/2 bg-white/20 hover:bg-white/40 p-2 rounded-full"
        >
          <ChevronLeft size={24} />
        </button>
        <button
          onClick={() => paginate(1)}
          className="absolute -right-6 top-1/2 transform -translate-y-1/2 bg-white/20 hover:bg-white/40 p-2 rounded-full"
        >
          <ChevronRight size={24} />
        </button>

        {/* Slider Content */}
        <div className="flex items-center justify-between">
          <div className="w-2/3">
            <div className="relative h-20">
              <AnimatePresence initial={false} custom={direction} mode="wait">
                <motion.div
                  key={currentIndex}
                  custom={direction}
                  initial={{ x: direction > 0 ? 300 : -300, opacity: 0 }}
                  animate={{ x: 0, opacity: 1 }}
                  exit={{ x: direction < 0 ? 300 : -300, opacity: 0 }}
                  transition={{ duration: 0.5 }}
                  className="absolute top-0 left-0 w-full space-y-2"
                >
                  <h2 className="lg:text-3xl text-2xl lg:font-bold font-semibold">
                    {sortedNotices[currentIndex].title}
                  </h2>
                  <p className="text-gray-100 lg:text-lg">
                    {sortedNotices[currentIndex].content}
                  </p>
                  <p className="text-sm text-gray-200">{sortedNotices[currentIndex].date}</p>
                </motion.div>
              </AnimatePresence>
            </div>

            <div className="mt-4">
              <button
                onClick={() => navigate("/notices")} // <--- navigate to notices page
                className="bg-yellow-400 cursor-pointer text-white rounded-full px-6 py-2 font-semibold hover:bg-yellow-500 transition"
              >
                View All Notices
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Pagination Dots */}
      <div className="flex justify-center space-x-2 mt-3">
        {sortedNotices.map((_, idx) => (
          <button
            key={idx}
            onClick={() => {
              setDirection(idx > currentIndex ? 1 : -1);
              setCurrentIndex(idx);
            }}
            className={`w-3 h-3 rounded-full transition-colors duration-300 ${
              idx === currentIndex ? "bg-blue-600" : "bg-blue-300"
            }`}
          />
        ))}
      </div>
    </div>
  );
}
