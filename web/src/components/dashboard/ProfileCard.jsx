import React, { useEffect, useState } from "react";
import { Edit, Linkedin } from "lucide-react";

export default function ProfileCard({ onEdit }) {
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const timeout = setTimeout(() => setProgress(75), 200);
    return () => clearTimeout(timeout);
  }, []);

  return (
    <div className="w-full bg-gradient-to-b  from-blue-500 to-blue-300 rounded-2xl shadow-lg overflow-hidden">
      <div className="p-2 flex flex-col items-center text-white relative">
        <button onClick={onEdit} className="absolute top-3 right-3 text-white hover:text-gray-200">
          <Edit size={14} />
        </button>

        <div className="relative w-20 h-20 mb-3">
          <div className="w-full h-full rounded-full flex items-center justify-center bg-white/20">
            <img
              src="https://randomuser.me/api/portraits/women/45.jpg"
              alt="Teacher"
              className="w-18 h-18 rounded-full object-cover border-2 border-white"
            />
          </div>
        </div>

        <h3 className="font-semibold text-base">Ayoub ben ismain</h3>
        <p className="text-sm">Student / Teacher</p>

        <div className="mt-1 w-full px-2">
          <div className="flex justify-between text-xs mb-1">
            <span>Courses</span>
            <span>16</span>
          </div>
          <div className="w-full h-2 rounded-full bg-white/30">
            <div className="h-2 rounded-full bg-white" style={{ width: `${progress}%`, transition: "width 1s" }} />
          </div>
        </div>

        <a href="https://linkedin.com" target="_blank" rel="noopener noreferrer" className="mt-4 inline-flex items-center gap-1 text-white hover:text-gray-200">
          <Linkedin size={16} /> LinkedIn
        </a>
      </div>
    </div>
  );
}
