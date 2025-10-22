import React, { useState, useEffect } from "react";
import { FileText, FileCode, Folder, ChevronRight } from "lucide-react";
import toast, { Toaster } from "react-hot-toast";

export default function TeacherLabReports() {
  const [classes, setClasses] = useState(["LSI A2-02", "LISI A1-02", "ING A2-01"]);
  const [selectedClass, setSelectedClass] = useState("");
  const [reports, setReports] = useState([]);

  // Mock: Fetch reports when class changes
  useEffect(() => {
    if (!selectedClass) return;

    // Here you would fetch from backend:
    // fetch(`/api/teacher/reports?class=${selectedClass}`)
    // .then(res => res.json()).then(data => setReports(data))

    // Demo data
    setReports([
      {
        student: "Ayoub Ben Ismain",
        reportName: "TP1 - Python",
        files: ["exercise1.py", "exercise2.py"],
        date: "2025-10-21",
      },
      {
        student: "Sana Toumi",
        reportName: "TP1 - Python",
        files: ["tp1_sana.zip"],
        date: "2025-10-20",
      },
    ]);
  }, [selectedClass]);

  return (
    <div className="p-6 sm:p-8 min-h-full flex flex-col sm:flex-row gap-6">
      <Toaster position="top-right" reverseOrder={false} />

      {/* Left Panel: Classes */}
      <div className="w-full sm:w-64 bg-white rounded-2xl shadow-md border border-gray-100 p-4 flex flex-col gap-3">
        <h3 className="text-lg font-semibold text-gray-700 mb-2">Classes</h3>
        {classes.map((cls, index) => (
          <button
            key={index}
            onClick={() => setSelectedClass(cls)}
            className={`flex justify-between items-center px-4 py-2 rounded-xl transition
              ${selectedClass === cls
                ? "bg-blue-100 text-blue-700 font-semibold"
                : "hover:bg-gray-100 text-gray-800"}`}
          >
            {cls} <ChevronRight className="w-4 h-4 text-gray-500" />
          </button>
        ))}
      </div>

      {/* Right Panel: Reports */}
      <div className="flex-1 bg-white rounded-2xl shadow-md border border-gray-100 p-6 flex flex-col gap-4">
        <h3 className="text-lg font-semibold text-gray-700 mb-4">
          {selectedClass ? `Reports for ${selectedClass}` : "Select a class"}
        </h3>

        {selectedClass && reports.length === 0 && (
          <p className="text-gray-500">No reports submitted yet.</p>
        )}

        {reports.map((report, index) => (
          <div
            key={index}
            className="border border-gray-200 rounded-2xl p-4 hover:shadow-md transition flex flex-col gap-2"
          >
            <div className="flex justify-between items-center">
              <h4 className="font-semibold text-gray-800">{report.reportName}</h4>
              <span className="text-sm text-gray-500">{report.date}</span>
            </div>
            <p className="text-gray-600 text-sm">Submitted by: {report.student}</p>
            <div className="flex flex-wrap gap-2 mt-2">
              {report.files.map((file, idx) => (
                <div
                  key={idx}
                  className="flex items-center gap-1 bg-blue-50 text-blue-700 px-3 py-1 rounded-xl text-sm cursor-pointer hover:bg-blue-100 transition"
                >
                  <FileCode className="w-4 h-4" />
                  {file}
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
