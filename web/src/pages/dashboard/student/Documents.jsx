import React, { useState, useRef, useEffect } from "react";
import { motion } from "framer-motion";
import {
  FileText,
  Eye,
  Download,
  Calculator,
  Atom,
  Laptop,
  BookOpen,
} from "lucide-react";

const subjects = [
  { id: 1, name: "Mathematics", icon: <Calculator size={22} /> },
  { id: 2, name: "Physics", icon: <Atom size={22} /> },
  { id: 3, name: "Computer Science", icon: <Laptop size={22} /> },
  { id: 4, name: "History", icon: <BookOpen size={22} /> },
];

const documents = {
  Mathematics: [
    { id: 1, title: "Algebra Notes", size: "2.5 MB" },
    { id: 2, title: "Geometry Workbook", size: "3.1 MB" },
    { id: 3, title: "Calculus Revision", size: "1.8 MB" },
  ],
  Physics: [
    { id: 4, title: "Mechanics Guide", size: "2.2 MB" },
    { id: 5, title: "Thermodynamics", size: "4.0 MB" },
  ],
  "Computer Science": [
    { id: 6, title: "Data Structures", size: "5.5 MB" },
    { id: 7, title: "Algorithms Notes", size: "2.9 MB" },
  ],
  History: [
    { id: 8, title: "World War II", size: "6.3 MB" },
    { id: 9, title: "Renaissance Period", size: "3.7 MB" },
  ],
};

export default function Documents() {
  const [selectedSubject, setSelectedSubject] = useState(subjects[0].name);
  const rightPanelRef = useRef(null);

  const filteredDocs = selectedSubject ? documents[selectedSubject] : [];

  useEffect(() => {
    if (rightPanelRef.current) {
      rightPanelRef.current.scrollTo({ top: 0, behavior: "smooth" });
    }
  }, [selectedSubject]);

  return (
    <div className="min-h-full w-full p-4 md:p-10 flex flex-col md:flex-row gap-6">
      {/* Left Panel */}
      <motion.div
        initial={{ opacity: 0, x: -20 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.5 }}
        className="w-full md:w-1/5 bg-white/60 backdrop-blur-md border border-blue-200 rounded-2xl shadow-md p-2 md:p-4 flex flex-col gap-2 max-h-[80vh] overflow-y-auto"
      >
        {subjects.map((subject) => (
          <motion.div
            key={subject.id}
            whileHover={{ scale: 1.03 }}
            whileTap={{ scale: 0.97 }}
            onClick={() => setSelectedSubject(subject.name)}
            className={`flex items-center gap-3 p-3 rounded-xl cursor-pointer transition-all ${
              selectedSubject === subject.name
                ? "bg-blue-500 text-white shadow-lg"
                : "bg-white/70 text-gray-800 hover:bg-blue-100"
            }`}
          >
            <div className="p-2 rounded-full bg-white/30">{subject.icon}</div>
            <span className="font-medium text-sm md:text-base">{subject.name}</span>
          </motion.div>
        ))}
      </motion.div>

      {/* Right Panel */}
      <div
        ref={rightPanelRef}
        className="flex-1 flex flex-col gap-4 overflow-y-auto max-h-[80vh]"
      >
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="mb-4"
        >
          <h1 className="text-2xl font-extrabold text-blue-800 tracking-tight">
            📘 {selectedSubject} Materials
          </h1>
        </motion.div>

        {/* Documents List */}
        <div className="flex flex-col gap-3">
          {filteredDocs.length > 0 ? (
            filteredDocs.map((doc, i) => (
              <motion.div
                key={doc.id}
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.05 }}
                className="flex flex-col sm:flex-row justify-between items-start sm:items-center p-4 bg-white/70 border border-blue-100 rounded-xl hover:shadow-md hover:bg-blue-50 transition-all gap-3"
              >
                <div className="flex items-center gap-3">
                  <div className="p-2 bg-blue-100 text-blue-600 rounded-full">
                    <FileText size={20} />
                  </div>
                  <div>
                    <h3 className="font-medium text-gray-800">{doc.title}</h3>
                    <p className="text-sm text-gray-500">{doc.size}</p>
                  </div>
                </div>
                <div className="flex gap-2 mt-2 sm:mt-0 flex-wrap">
                  <button className="px-3 py-1.5 bg-blue-500 text-white rounded-lg hover:bg-blue-600 flex items-center gap-1 transition-all">
                    <Eye size={16} /> View
                  </button>
                  <button className="px-3 py-1.5 bg-yellow-400 text-blue-900 font-medium rounded-lg hover:bg-yellow-500 flex items-center gap-1 transition-all">
                    <Download size={16} /> Download
                  </button>
                </div>
              </motion.div>
            ))
          ) : (
            <p className="text-gray-500 text-center italic">No documents found.</p>
          )}
        </div>
      </div>
    </div>
  );
}
