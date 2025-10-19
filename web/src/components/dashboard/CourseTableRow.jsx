import React from "react";
import CountUp from "react-countup";

export default function CourseTableRow({ course }) {
  const { title, code, semester, section, department, students } = course;

  return (
    <>
      {/* Course Title */}
      <td className="p-4 text-base font-semibold text-gray-900 whitespace-nowrap">
        {title}
      </td>

      {/* Other Info */}
      <td className="p-4 text-sm text-gray-700 whitespace-nowrap">{code}</td>
      <td className="p-4 text-sm text-gray-700 whitespace-nowrap">{semester}</td>
      <td className="p-4 text-sm text-gray-700 whitespace-nowrap">{section}</td>
      <td className="p-4 text-sm text-gray-700 whitespace-nowrap">{department}</td>

      {/* Students with animation */}
      <td className="p-4 text-base font-semibold text-blue-600 whitespace-nowrap">
        <CountUp end={students} duration={1.5} />
      </td>

      {/* Actions */}
      <td className="p-4 whitespace-nowrap text-center">
        <div className="flex justify-center gap-2 flex-wrap">
          <button className="bg-blue-600 hover:bg-blue-700 text-white text-xs px-4 py-1.5 rounded-md transition font-semibold">
            View
          </button>
          <button className="bg-yellow-400 hover:bg-yellow-500 text-white text-xs px-4 py-1.5 rounded-md transition font-semibold">
            Docs
          </button>
          <button className="border border-blue-600 text-blue-600 text-xs px-4 py-1.5 rounded-md hover:bg-blue-50 transition font-semibold">
            Grades
          </button>
        </div>
      </td>
    </>
  );
}
