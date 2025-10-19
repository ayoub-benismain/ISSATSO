import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { FileText, Plus, Pencil, Trash, Download, Search } from "lucide-react";

const classesData = ["LSI A1-01", "LSI A1-02", "LSI A1-23", "ING A2-02"];
const initialDocumentsData = {
  "LSI A1-01": [
    { id: 1, title: "Lecture 1 Notes", type: "PDF", uploadedBy: "Ali Ben Salah", date: "2025-08-10", url: "#" },
    { id: 2, title: "Assignment 1", type: "DOCX", uploadedBy: "Ali Ben Salah", date: "2025-08-11", url: "#" },
  ],
  "LSI A1-02": [
    { id: 4, title: "Lecture 2 Notes", type: "PDF", uploadedBy: "Sara Ben Romdhane", date: "2025-08-10", url: "#" },
  ],
  "LSI A1-23": [],
  "ING A2-02": [
    { id: 6, title: "Lecture 1 Intro", type: "PPTX", uploadedBy: "Houssem Riahi", date: "2025-08-09", url: "#" },
  ],
};

export default function DocumentsTeacher() {
  const [selectedClass, setSelectedClass] = useState(classesData[0]);
  const [searchOpen, setSearchOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [modalOpen, setModalOpen] = useState(false);
  const [editingDoc, setEditingDoc] = useState(null);
  const [documentsData, setDocumentsData] = useState(initialDocumentsData);

  const documentsList = selectedClass ? documentsData[selectedClass] || [] : [];

  const filteredDocuments = documentsList.filter(
    (doc) =>
      doc.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      doc.type.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const openAddModal = () => {
    setEditingDoc(null);
    setModalOpen(true);
  };

  const openEditModal = (doc) => {
    setEditingDoc(doc);
    setModalOpen(true);
  };

  const handleSubmit = (title, file) => {
    if (!selectedClass) return;
    const newDoc = {
      id: editingDoc ? editingDoc.id : Date.now(),
      title,
      type: file.name.split(".").pop().toUpperCase(),
      uploadedBy: "Teacher",
      date: new Date().toISOString().split("T")[0],
      url: "#",
    };
    setDocumentsData((prev) => ({
      ...prev,
      [selectedClass]: editingDoc
        ? prev[selectedClass].map((d) => (d.id === editingDoc.id ? newDoc : d))
        : [...prev[selectedClass], newDoc],
    }));
    setModalOpen(false);
  };

  const removeDocument = (id) => {
    setDocumentsData((prev) => ({
      ...prev,
      [selectedClass]: prev[selectedClass].filter((doc) => doc.id !== id),
    }));
  };

  const downloadDocument = (url) => {
    const a = document.createElement("a");
    a.href = url;
    a.download = true;
    a.click();
  };

  return (
    <div className="p-6 w-full flex flex-col lg:flex-row gap-6">
      {/* Left panel - classes */}
      <div className="w-full lg:w-1/5 flex flex-col gap-2 text-gray-700">
        <h3 className="text-lg font-semibold mb-3">Classes</h3>
        {classesData.map((cls) => (
          <button
            key={cls}
            onClick={() => setSelectedClass(cls)}
            className={`text-left px-3 py-2 rounded-lg transition font-medium ${
              selectedClass === cls
                ? "bg-blue-100 text-blue-700 font-semibold"
                : "hover:bg-blue-50"
            }`}
          >
            {cls}
          </button>
        ))}
      </div>

      {/* Vertical separator */}
      <div className="hidden lg:block w-px bg-gray-300"></div>

      {/* Right panel - documents */}
      <div className="w-full lg:w-4/5 flex flex-col gap-4">
        {/* Top controls */}
        <div className="flex justify-between items-center">
          {/* Search field */}
          <div className="relative flex items-center">
            <button
              onClick={() => setSearchOpen((prev) => !prev)}
              className="p-2 bg-blue-500 text-white rounded-full hover:bg-blue-600 transition-colors"
            >
              <Search size={20} />
            </button>
            <AnimatePresence>
              {searchOpen && (
                <motion.input
                  initial={{ width: 0, opacity: 0 }}
                  animate={{ width: 220, opacity: 1 }}
                  exit={{ width: 0, opacity: 0 }}
                  transition={{ duration: 0.3 }}
                  type="text"
                  placeholder="Search documents..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="ml-2 px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400 text-sm"
                />
              )}
            </AnimatePresence>
          </div>

          <button
            onClick={openAddModal}
            className="flex items-center gap-2 bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-lg font-semibold transition"
          >
            <Plus size={16} /> Add Document
          </button>
        </div>

        {/* Documents cards */}
        <div className="flex flex-col gap-4">
          {filteredDocuments.length > 0 ? (
            filteredDocuments.map((doc, index) => (
              <motion.div
                key={doc.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3, delay: index * 0.05 }}
                className="bg-white rounded-xl border border-gray-200 p-4 shadow-md  transition flex justify-between items-center"
              >
                <div className="flex flex-col">
                  <p className="text-gray-800 font-semibold">{doc.title}</p>
                  <p className="text-sm text-gray-500">{doc.type}</p>
                  <p className="text-xs text-gray-400">{doc.date}</p>
                </div>
                <div className="flex gap-2">
                  <button
                    onClick={() => downloadDocument(doc.url)}
                    className="bg-blue-500 hover:bg-blue-600 p-2 rounded-md text-white transition"
                  >
                    <Download size={16} />
                  </button>
                  <button
                    onClick={() => openEditModal(doc)}
                    className="bg-yellow-400 hover:bg-yellow-500 p-2 rounded-md text-white transition"
                  >
                    <Pencil size={16} />
                  </button>
                  <button
                    onClick={() => removeDocument(doc.id)}
                    className="bg-red-500 hover:bg-red-600 p-2 rounded-md text-white transition"
                  >
                    <Trash size={16} />
                  </button>
                </div>
              </motion.div>
            ))
          ) : (
            <p className="text-center text-gray-500 py-6 font-medium">No documents found ❌</p>
          )}
        </div>
      </div>

      {/* Modal for Add / Edit */}
      <AnimatePresence>
        {modalOpen && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 0.3 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 bg-gray-100 backdrop-blur-sm z-40"
            />
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.8 }}
              transition={{ duration: 0.3 }}
              className="fixed z-50 top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-white rounded-xl shadow-xl p-6 w-[90vw] max-w-md"
            >
              <h3 className="text-xl font-semibold text-gray-800 mb-4 text-center">
                {editingDoc ? "Edit Document" : "Add Document"}
              </h3>
              <input
                type="text"
                placeholder="Document Title"
                defaultValue={editingDoc?.title || ""}
                className="w-full mb-3 px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
                id="docTitle"
              />
              <input
                type="file"
                className="w-full mb-3"
                id="docFile"
              />
              <div className="flex justify-end gap-3">
                <button
                  onClick={() => setModalOpen(false)}
                  className="px-4 py-2 bg-gray-300 rounded-lg hover:bg-gray-400 transition font-semibold"
                >
                  Cancel
                </button>
                <button
                  onClick={() => {
                    const title = document.getElementById("docTitle").value;
                    const file = document.getElementById("docFile").files[0];
                    if (!title) return;
                    handleSubmit(title, file || { name: editingDoc?.type || "FILE" });
                  }}
                  className="px-4 py-2 bg-blue-500 rounded-lg text-white hover:bg-blue-600 transition font-semibold"
                >
                  {editingDoc ? "Save Changes" : "Upload"}
                </button>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </div>
  );
}
