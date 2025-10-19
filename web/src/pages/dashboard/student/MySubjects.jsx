import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Search, BookOpen, GraduationCap } from "lucide-react";

const semesterData = {
  "Semester 1": [
    {
      module: "Probabilité",
      type: "UE Fondamentale",
      subjects: [
        { name: "Probabilité et statistique", coeff: 2, moyenne: "RM (DS+2TP+7EX)/10" },
      ],
    },
    {
      module: "Automates et Optimisation",
      type: "UE Fondamentale",
      subjects: [
        { name: "Théorie des langages et des Automates", coeff: 1, moyenne: "(3DS+7EX)/10" },
        { name: "Graphes et optimisation", coeff: 1, moyenne: "(3DS+7EX)/10" },
      ],
    },
    {
      module: "CPOO",
      type: "UE Fondamentale",
      subjects: [
        { name: "Conception des Systèmes d'Information", coeff: 1.5, moyenne: "(3DS+7EX)/10" },
        { name: "Programmation Java", coeff: 2, moyenne: "RM (DS+2TP+7EX)/10" },
      ],
    },
    {
      module: "Bases de données et Réseaux",
      type: "UE Fondamentale",
      subjects: [
        { name: "Ingénierie des Bases de Données", coeff: 1.5, moyenne: "RM (DS+2TP+7EX)/10" },
        { name: "Services des Réseaux", coeff: 1, moyenne: "RM (DS+2TP+7EX)/10" },
      ],
    },
    {
      module: "Langue et Culture d'Entreprise",
      type: "UE Transversale",
      subjects: [
        { name: "Anglais 3", coeff: 1, moyenne: "(DS1+DS2)/2" },
        { name: "Gestion d'entreprise", coeff: 1, moyenne: "(DS1+DS2)/2" },
      ],
    },
    {
      module: "Unité optionnelle",
      type: "UE Optionnelle",
      subjects: [
        { name: "Serious Gaming Fundamentals", coeff: 1.5, moyenne: "RM (DS+2TP+7EX)/10" },
        { name: "Mobile Game Programming", coeff: 1.5, moyenne: "RM (DS+2TP+7EX)/10" },
      ],
    },
  ],

  "Semester 2": [
    {
      module: "Bases de données",
      type: "UE Fondamentale",
      subjects: [
        { name: "Entrepôts de données", coeff: 1, moyenne: "(3DS+7EX)/10" },
        { name: "Administration des bases de données", coeff: 1, moyenne: "RM (DS+2TP+7EX)/10" },
      ],
    },
    {
      module: "Indexation et Web",
      type: "UE Fondamentale",
      subjects: [
        { name: "Techniques d'indexation et recherche multimédia", coeff: 1, moyenne: "RM (DS+2TP+7EX)/10" },
        { name: "Technologies et programmation web", coeff: 1.5, moyenne: "RM (DS+2TP+7EX)/10" },
      ],
    },
    {
      module: "Compilation & tests",
      type: "UE Fondamentale",
      subjects: [
        { name: "Techniques de compilation", coeff: 1.5, moyenne: "RM (DS+2TP+7EX)/10" },
        { name: "Tests des logiciels (Certification ISTQB)", coeff: 1, moyenne: "RM (DS+2TP+7EX)/10" },
      ],
    },
    {
      module: "Intelligence artificielle",
      type: "UE Fondamentale",
      subjects: [
        { name: "Fondements de l'intelligence artificielle (Programmation IA)", coeff: 2, moyenne: "RM (DS+2TP+7EX)/10" },
      ],
    },
    {
      module: "Langue et éthique",
      type: "UE Transversale",
      subjects: [
        { name: "Anglais 4", coeff: 3, moyenne: "(DS1+DS2)/2" },
        { name: "Droit informatique, protection des données et éthique", coeff: 1, moyenne: "(DS1+DS2)/2" },
        { name: "Projet fédéré (Méthode Agile)", coeff: 1, moyenne: "CC Moy(TP)" },
      ],
    },
    {
      module: "Unité optionnelle",
      type: "UE Optionnelle",
      subjects: [
        { name: "Introduction à l’IOT / Game Engine Programming", coeff: 1.5, moyenne: "RM (DS+2TP+7EX)/10" },
        { name: "Programmation système et réseaux / 3D Modeling and Design", coeff: 1.5, moyenne: "RM (DS+2TP+7EX)/10" },
      ],
    },
  ],
};

export default function MySubjects() {
  const [activeSemester, setActiveSemester] = useState("Semester 1");
  const [searchOpen, setSearchOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");

  const modules = semesterData[activeSemester];

  const filteredModules = modules
    .map((mod) => ({
      ...mod,
      subjects: mod.subjects.filter((subj) =>
        subj.name.toLowerCase().includes(searchQuery.toLowerCase())
      ),
    }))
    .filter((mod) => mod.subjects.length > 0);

  return (
    <div className="flex flex-col md:flex-row w-screen md:w-full min-h-full">
      {/* Left Panel */}
      <div className="w-full md:w-1/5 border-b md:border-b-0 md:border-r border-blue-200 p-6 flex flex-col justify-start items-start backdrop-blur-sm">
        <h2 className="text-2xl font-bold text-blue-800 mb-6 flex items-center gap-2">
          <GraduationCap className="text-blue-600" /> Semesters
        </h2>

        <div className="space-y-4 md:w-full w-2/3">
          {Object.keys(semesterData).map((semester) => (
            <button
              key={semester}
              onClick={() => setActiveSemester(semester)}
              className={`w-full text-left px-5 py-3 cursor-pointer rounded-xl font-semibold transition-all ${
                activeSemester === semester
                  ? "bg-blue-600 text-white shadow-md"
                  : "bg-white text-blue-700 border border-blue-200 hover:bg-blue-50"
              }`}
            >
              {semester}
            </button>
          ))}
        </div>
      </div>

      {/* Right Panel */}
      <div className="w-full md:w-4/5 p-4 sm:p-8">
        {/* Header */}
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-6 sm:mb-8 gap-4 sm:gap-0">
          <h2 className="text-xl sm:text-xl font-bold text-blue-800 flex items-center gap-2">
            <BookOpen className="text-blue-600" /> {activeSemester} Subjects
          </h2>

          {/* Search Bar */}
          <div className="relative flex items-center">
            <button
              onClick={() => setSearchOpen((prev) => !prev)}
              className="p-2 bg-blue-500 text-white rounded-full hover:bg-blue-600 transition-all"
            >
              <Search size={20} />
            </button>
            <AnimatePresence>
              {searchOpen && (
                <motion.input
                  initial={{ width: 0, opacity: 0 }}
                  animate={{ width: 200, opacity: 1 }}
                  exit={{ width: 0, opacity: 0 }}
                  transition={{ duration: 0.3 }}
                  type="text"
                  placeholder="Search subjects..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="ml-2 px-3 py-2 border border-blue-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400 text-sm shadow-sm"
                />
              )}
            </AnimatePresence>
          </div>
        </div>

        {/* Table */}
        <div className="overflow-x-auto">
          <AnimatePresence mode="wait">
            <motion.table
              key={activeSemester}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.5, ease: "easeInOut" }}
              className="min-w-full bg-white/70 backdrop-blur-sm border border-blue-100 rounded-2xl"
            >
              <thead>
                <tr className="bg-gradient-to-r from-blue-100 to-blue-200 text-blue-900 text-sm uppercase tracking-wide">
                  <th className="py-3 px-4 text-left font-semibold">Module</th>
                  <th className="py-3 px-4 text-left font-semibold">UE Type</th>
                  <th className="py-3 px-4 text-left font-semibold">Subject</th>
                  <th className="py-3 px-4 text-left font-semibold">Coeff</th>
                  <th className="py-3 px-4 text-left font-semibold">Moyenne</th>
                </tr>
              </thead>
              <tbody>
                <AnimatePresence>
                  {filteredModules.length > 0 ? (
                    filteredModules.map((mod) =>
                      mod.subjects.map((subj, index) => (
                        <motion.tr
                          key={subj.name}
                          initial={{ opacity: 0, y: 10 }}
                          animate={{ opacity: 1, y: 0 }}
                          exit={{ opacity: 0, y: -10 }}
                          transition={{ duration: 0.3, delay: index * 0.05 }}
                          className="border-t border-blue-100 hover:bg-blue-50 transition-all"
                        >
                          <td className="py-3 px-4 text-gray-700">{mod.module}</td>
                          <td className="py-3 px-4 text-gray-700">{mod.type}</td>
                          <td className="py-3 px-4 font-medium text-gray-800 flex items-center gap-2">
                            <BookOpen className="text-blue-500" size={16} />
                            {subj.name}
                          </td>
                          <td className="py-3 px-4 text-gray-600">{subj.coeff}</td>
                          <td className="py-3 px-4 text-gray-600">{subj.moyenne}</td>
                        </motion.tr>
                      ))
                    )
                  ) : (
                    <tr>
                      <td
                        colSpan="5"
                        className="text-center py-6 text-gray-500 font-medium"
                      >
                        No subjects found 🎓
                      </td>
                    </tr>
                  )}
                </AnimatePresence>
              </tbody>
            </motion.table>
          </AnimatePresence>
        </div>
      </div>
    </div>
  );
}
