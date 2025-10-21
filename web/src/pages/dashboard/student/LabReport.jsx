import React, { useState } from "react";
import { FileCode, UploadCloud, ChevronDown } from "lucide-react";
import toast, { Toaster } from "react-hot-toast";

export default function LabReport() {
  const [tpSessions, setTpSessions] = useState(["TP1 - Python", "TP2 - Web", "TP3 - AI"]);
  const [selectedSession, setSelectedSession] = useState("");
  const [reportName, setReportName] = useState("");
  const [files, setFiles] = useState([]);
  const [isDragging, setIsDragging] = useState(false);
  const [dropdownOpen, setDropdownOpen] = useState(false);

  // Handle file selection via input
  const handleFileChange = (e) => {
    setFiles(Array.from(e.target.files));
  };

  // Drag & drop handlers
  const handleDrop = (e) => {
    e.preventDefault();
    setIsDragging(false);
    setFiles(Array.from(e.dataTransfer.files));
  };

  const handleDragOver = (e) => {
    e.preventDefault();
    setIsDragging(true);
  };

  const handleDragLeave = () => setIsDragging(false);

  // Submit form
  const handleSubmit = (e) => {
    e.preventDefault();

    if (!selectedSession) return toast.error("Please select a TP session!");
    if (!reportName.trim()) return toast.error("Please enter a report name!");
    if (files.length === 0) return toast.error("Please add at least one file!");

    console.log("Submitting:", { selectedSession, reportName, files });
    toast.success("Report submitted successfully!");

    setSelectedSession("");
    setReportName("");
    setFiles([]);
  };

  return (
    <div className="p-6 sm:p-8 min-h-screen flex flex-col items-center">
      <Toaster position="top-right" reverseOrder={false} />

      {/* Page Header */}
      <div className="w-full max-w-4xl flex items-center gap-3 mb-8">
        <FileCode className="w-8 h-8 text-blue-600" />
        <h2 className="text-2xl sm:text-3xl font-bold text-gray-800">
          IT Lab Reports
        </h2>
      </div>

      {/* Form */}
      <form
        onSubmit={handleSubmit}
        className="w-full max-w-4xl bg-white rounded-2xl shadow-md border border-gray-100 p-6 sm:p-8 space-y-6"
      >
        {/* TP Session Dropdown */}
        <div className="relative">
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Select TP Session
          </label>
          <div
            className="flex justify-between items-center border border-gray-300 rounded-xl px-4 py-3 cursor-pointer hover:border-blue-400 transition bg-white"
            onClick={() => setDropdownOpen(!dropdownOpen)}
          >
            <span className={`${!selectedSession ? "text-gray-400" : "text-gray-800"}`}>
              {selectedSession || "-- Choose TP --"}
            </span>
            <ChevronDown className="w-5 h-5 text-gray-500" />
          </div>

          {dropdownOpen && (
            <ul className="absolute z-10 mt-1 w-full bg-white border border-gray-300 rounded-xl shadow-lg max-h-48 overflow-y-auto">
              {tpSessions.map((tp, index) => (
                <li
                  key={index}
                  className="px-4 py-2 cursor-pointer hover:bg-blue-50 hover:text-blue-700 transition"
                  onClick={() => {
                    setSelectedSession(tp);
                    setDropdownOpen(false);
                  }}
                >
                  {tp}
                </li>
              ))}
            </ul>
          )}
        </div>

        {/* Report Name */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Report Name
          </label>
          <input
            type="text"
            placeholder="e.g. TP1 – Your Name"
            value={reportName}
            onChange={(e) => setReportName(e.target.value)}
            className="w-full rounded-xl border border-gray-300 px-4 py-3 focus:outline-none focus:ring-2 focus:ring-blue-400 focus:border-blue-400 transition"
          />
        </div>

        {/* File Upload Box */}
        <div
          onDrop={handleDrop}
          onDragOver={handleDragOver}
          onDragLeave={handleDragLeave}
          className={`flex flex-col items-center justify-center border-2 border-dashed rounded-2xl p-10 text-center cursor-pointer transition
            ${isDragging ? "border-blue-400 bg-blue-50/30" : "border-gray-300 bg-white"}`}
        >
          <UploadCloud className="w-12 h-12 text-blue-500 mb-3" />
          <p className="text-gray-700 font-medium mb-2">Drag & drop files here</p>
          <p className="text-sm text-gray-500 mb-4">or click below to browse</p>
          <label className="bg-blue-600 text-white px-6 py-2 rounded-xl cursor-pointer hover:bg-blue-700 transition">
            Choose Files
            <input
              type="file"
              multiple
              onChange={handleFileChange}
              className="hidden"
            />
          </label>

          {/* Show Selected Files */}
          {files.length > 0 && (
            <ul className="mt-4 w-full text-left text-sm text-gray-700 space-y-1">
              {files.map((file, index) => (
                <li key={index} className="truncate flex justify-between items-center">
                  <span>📄 {file.name}</span>
                  <button
                    type="button"
                    onClick={() => setFiles(files.filter((_, i) => i !== index))}
                    className="text-red-500 hover:text-red-700 ml-2"
                  >
                    ✕
                  </button>
                </li>
              ))}
            </ul>
          )}
        </div>

        {/* Submit Button */}
        <div className="flex justify-end">
          <button
            type="submit"
            className="bg-blue-600 text-white px-8 py-3 rounded-xl font-semibold hover:bg-blue-700 transition"
          >
            Submit Report
          </button>
        </div>
      </form>

      {/* Optional Footer */}
      <div className="mt-6 text-gray-500 text-sm max-w-4xl text-center">
        Drag and drop multiple files or click "Choose Files" to select them. Max size per file: 50MB.
      </div>
    </div>
  );
}
