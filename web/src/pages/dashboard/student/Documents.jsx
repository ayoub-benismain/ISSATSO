import React, { useState, useRef, useEffect } from "react";
import { motion } from "framer-motion";
import { FileText, Eye, Download } from "lucide-react";

// Subjects with icons (clean names)
const subjects = [
  { id: 1, name: "Services des Réseaux", icon: <FileText size={22} /> },
  { id: 2, name: "Conception des Systèmes d'Information", icon: <FileText size={22} /> },
  { id: 3, name: "Programmation Java", icon: <FileText size={22} /> },
  { id: 4, name: "Programmation orientée objet", icon: <FileText size={22} /> },
  { id: 5, name: "Graphes et optimisation", icon: <FileText size={22} /> },
  { id: 6, name: "Cryptographie", icon: <FileText size={22} /> },
  { id: 7, name: "Paradigme de programmation orientée objet", icon: <FileText size={22} /> },
];
const documents = {
  "Services des Réseaux": [
    { id: 1, title: "CM1_Introduction_services_réseaux", size: "Oct 2, 2025" },
    { id: 2, title: "CM2_Rappel_fondements_réseaux", size: "Oct 3, 2025" },
  ],
  "Conception des Systèmes d'Information": [
    { id: 3, title: "Cours des systèmes d'information Chap 1 & 2", size: "Oct 4, 2025" },
    { id: 4, title: "Conception Chap 3", size: "Oct 11, 2025" },
    { id: 5, title: "rappel_notion_de_classe", size: "Oct 8, 2025" },
    { id: 6, title: "tp2", size: "Oct 8, 2025" },
  ],
  "Programmation Java": [
    { id: 7, title: "rappel_syntaxe_java", size: "Oct 7, 2025" },
    { id: 8, title: "rappel_notion_de_classe", size: "Oct 7, 2025" },
    { id: 9, title: "tp3", size: "Oct 18, 2025" },
    { id: 10, title: "résumé tp3", size: "Oct 18, 2025" },
  ],
  "Programmation orientée objet": [
    { id: 11, title: "cours-Full-2025", size: "Sep 16, 2025" },
    { id: 12, title: "Cours-Slides-2025", size: "Sep 17, 2025" },
    { id: 13, title: "Série d'exercices N°1", size: "Sep 23, 2025" },
    { id: 14, title: "DS-2024", size: "Oct 8, 2025" },
  ],
  "Graphes et optimisation": [
    { id: 15, title: "Introduction", size: "Oct 11, 2025" },
  ],
  "Cryptographie": [
    { id: 16, title: "Chapitre 2 - Introduction au POO avec Python", size: "Oct 8, 2025" },
    { id: 17, title: "Chapitre 3 - Objets, mémoire et méthodes magiques", size: "Oct 8, 2025" },
    { id: 18, title: "Chapitre 4 - Encapsulation-modifier", size: "Oct 9, 2025" },
    { id: 19, title: "Exercices-Introduction POO-Python-classes et méthodes", size: "Oct 9, 2025" },
    { id: 20, title: "TP1-File-Python", size: "Oct 10, 2025" },
    { id: 21, title: "TP1-Guide Anaconda", size: "Oct 10, 2025" },
  ],
  "Paradigme de programmation orientée objet": [
    { id: 22, title: "Introduction POO Java", size: "Oct 12, 2025" },
    { id: 23, title: "Exercices Java TP1", size: "Oct 13, 2025" },
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
        className="w-full md:w-1/4 bg-white/60 backdrop-blur-md border border-blue-200 rounded-2xl shadow-md p-2 md:p-4 flex flex-col gap-2 max-h-[80vh] overflow-y-auto scrollbar-thin scrollbar-thumb-blue-400 scrollbar-track-blue-100"
      >
        {subjects.map((subject) => (
          <motion.div
            key={subject.id}
            whileHover={{ scale: 1.03 }}
            whileTap={{ scale: 0.97 }}
            onClick={() => setSelectedSubject(subject.name)}
            className={`flex items-center gap-3 p-2 rounded-xl cursor-pointer transition-all ${
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
