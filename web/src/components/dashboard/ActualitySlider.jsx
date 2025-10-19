import React, { useState } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { AnimatePresence, motion } from "framer-motion";

// Dummy data
const cardsData = [
  {
    title: "New Semester Begins",
    description: "Classes start on September 1st. Get ready with your study materials!",
    date: "2025-09-01",
  },
  {
    title: "Library Renovation",
    description: "The library will be closed for renovation from July 15th to August 15th.",
    date: "2025-07-15",
  },
  {
    title: "Guest Lecture: AI in 2025",
    description: "Join us for a guest lecture on the future of AI on August 20th.",
    date: "2025-08-20",
  },
  {
    title: "Exam Schedule Released",
    description: "Check out the exam timetable for the Fall semester.",
    date: "2025-10-01",
  },
  {
    title: "Sports Fest",
    description: "Annual sports festival will take place on September 25th.",
    date: "2025-09-25",
  },
];

// Dummy avatars
const avatars = [
  "https://i.pravatar.cc/40?img=1",
  "https://i.pravatar.cc/40?img=2",
  "https://i.pravatar.cc/40?img=3",
];

export default function ActualitySlider() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [direction, setDirection] = useState(0); // -1 for left, 1 for right

  const paginate = (newDirection) => {
    setDirection(newDirection);
    setCurrentIndex((prev) =>
      newDirection === 1
        ? (prev + 1) % cardsData.length
        : (prev - 1 + cardsData.length) % cardsData.length
    );
  };

  return (
    <div className="lg:w-full w-full mx-auto relative select-none">
      <div className="relative overflow-hidden rounded-2xl  bg-gradient-to-b from-[#8e91f9] via-[#6470ff] to-[#516eff] text-white p-6 shadow-xl">
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
          {/* Left: Title & Description */}
          <div className="w-2/3">
          <div className="relative h-14">
            <AnimatePresence initial={false} custom={direction} mode="wait">
              <motion.div
                key={currentIndex}
                custom={direction}
                initial={{ x: direction > 0 ? 300 : -300 }}
                animate={{ x: 0 }}
                exit={{ x: direction < 0 ? 300 : -300 }}
                transition={{ duration: 0.5 }}
                className="absolute top-0 left-0 w-full space-y-4"
              >
                <h2 className="lg:text-3xl text-2xl lg:font-bold font-semibold">{cardsData[currentIndex].title}</h2>
                <p className="text-gray-100 hidden lg:block">{cardsData[currentIndex].description}</p>
              </motion.div>
            </AnimatePresence>
          </div>

            <div className="mt-6 flex items-center space-x-4">
              <button className="bg-yellow-400 cursor-pointer text-white rounded-full px-6 py-2 font-semibold hover:bg-yellow-500 transition">
                View All
              </button>
              <p className="text-sm text-gray-200">{cardsData[currentIndex].date}</p>
            </div>
          </div>

          {/* Right: Avatars */}
          <div className="w-1/3 flex justify-end items-center">
            <div className="flex -space-x-3">
              {avatars.map((url, idx) => (
                <img
                  key={idx}
                  src={url}
                  alt="Friend"
                  className="w-10 h-10 rounded-full border-2 border-white hover:scale-105 transition-transform"
                />
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Pagination Dots */}
      <div className="flex justify-center space-x-2 mt-2">
        {cardsData.map((_, idx) => (
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
