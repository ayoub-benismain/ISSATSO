import React, { useState } from "react";
import { CheckCircle } from "lucide-react";

export default function EventCard() {
  const [done, setDone] = useState(false);

  return (
    <div
      className={`relative flex-grow bg-white px-6 py-5 rounded-xl shadow-md transition-all duration-300 ${
        done ? "border-2 border-blue-500" : ""
      }`}
    >
      <div className="flex justify-between items-start">
        <h2 className="text-base font-semibold text-gray-800">Design System Developers</h2>
        <button
          onClick={() => setDone(!done)}
          className={`transition-colors absolute top-4 right-4 ${
            done ? "text-yellow-400" : "text-gray-400"
          }`}
        >
          <CheckCircle size={20} />
        </button>
      </div>

      <div className="">
        <p className="text-sm text-gray-500">Organized by</p>
        <div className="flex items-center mt-2">
          <div className="flex -space-x-2">
            <img
              className="w-8 h-8 rounded-full border-2 border-white"
              src="https://randomuser.me/api/portraits/men/32.jpg"
              alt="avatar"
            />
            <img
              className="w-8 h-8 rounded-full border-2 border-white"
              src="https://randomuser.me/api/portraits/women/44.jpg"
              alt="avatar"
            />
            <img
              className="w-8 h-8 rounded-full border-2 border-white"
              src="https://randomuser.me/api/portraits/men/23.jpg"
              alt="avatar"
            />
          </div>
          <span className="ml-3 text-sm text-gray-600">+100 participants</span>
        </div>
      </div>

      <div className="absolute bottom-3 right-5 text-sm text-blue-500 font-medium">
        9AM - 10AM
      </div>
    </div>
  );
}
