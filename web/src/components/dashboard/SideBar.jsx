import React, { useState } from "react";
import {
  LayoutDashboard,
  Book,
  Calendar,
  FileText,
  Users,
  FileCheck2,
  LogOut,
  Menu,
  X,
} from "lucide-react";
import { Link, useLocation } from "react-router-dom";

export default function SideBar({ pages, isOpen, setIsOpen }) {
  
  const location = useLocation();

  const toggleSidebar = () => setIsOpen(!isOpen);

  const renderLinkClass = (path) =>
    `flex items-center gap-3 px-4 py-2 rounded-xl transition ${
      location.pathname === path
        ? "bg-white text-[#516eff] font-semibold"
        : "text-white hover:bg-white/10"
    }`;

  return (
    <>
      <div className="hidden lg:flex flex-col justify-between h-[96vh] lg:my-auto lg:ml-4 w-1/6 bg-gradient-to-b from-[#8e91f9] via-[#6470ff] to-[#516eff] rounded-2xl p-6 text-white">
        <h2 className="text-3xl font-extrabold mb-4 text-center">ISSATSO+</h2>
        <nav className="flex flex-col gap-3">
          {pages.map((page) => (
            <Link key={page.path} to={page.path} className={renderLinkClass(page.path)}>
              {React.createElement(page.icon, { size: 20 })}
              <span>{page.title}</span>
            </Link>
          ))}
        </nav>
        <Link to="/logout" className="flex items-center gap-3 text-white hover:bg-white/10 px-4 py-2 rounded-xl">
          <LogOut size={20} />
          <span>Logout</span>
        </Link>
      </div>

      {/* Mobile collapsed sidebar */}
      <div className="fixed top-4 left-4 lg:hidden z-50">
        {isOpen && (
          <div
            className="fixed inset-0 bg-black/50 z-40"
            onClick={toggleSidebar}
          />
        )}
        <div
          className={`fixed top-0 left-0 h-full w-[90%] max-w-sm bg-gradient-to-b from-[#8e91f9] via-[#6470ff] to-[#516eff] z-50 rounded-r-3xl transform transition-transform duration-300 ${
            isOpen ? "translate-x-0" : "-translate-x-full"
          }`}
        >
          <div className="flex justify-between items-center p-6">
            <h2 className="text-2xl font-bold text-white">ISSATSO+</h2>
            <X
              className="text-white w-6 h-6 cursor-pointer"
              onClick={toggleSidebar}
            />
          </div>
          <nav className="flex flex-col gap-3 p-4 text-white">
            {pages.map((page) => (
              <Link
                key={page.path}
                to={page.path}
                onClick={toggleSidebar}
                className={renderLinkClass(page.path)}
              >
                {React.createElement(page.icon, { size: 20 })}
                <span>{page.title}</span>
              </Link>
            ))}
          </nav>
          <Link
            to="/logout"
            onClick={toggleSidebar}
            className="flex items-center gap-3 text-white hover:bg-white/10 px-4 py-2 rounded-xl mt-8 ml-4"
          >
            <LogOut size={20} />
            <span>Logout</span>
          </Link>
        </div>
      </div>
    </>
  );
}
