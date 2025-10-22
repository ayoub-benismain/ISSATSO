import React, { useEffect, useState } from "react";
import { useNavigate, Outlet } from "react-router-dom";
import SideBar from "../components/dashboard/SideBar";
import DashboardTopBar from "../components/dashboard/DashboardTopBar";
import {
  LayoutDashboard,
  BookOpen,
  Users,
  FileText,
  ClipboardList,
  FileCheck2,
  Calendar,
  CalendarClock,
  Bell,
  UserCircle,
  MessageCircle,
  Code
} from "lucide-react";

import { jwtDecode } from "jwt-decode";

const teacherPages = [
  { title: "Dashboard", icon: LayoutDashboard, path: "/dashboard/teacher" },
  { title: "Students / absents", icon: Users, path: "/dashboard/teacher/students" },
  { title: "Documents", icon: FileText, path: "/dashboard/teacher/documents" },
  { title: "Extra Sessions", icon: ClipboardList, path: "/dashboard/teacher/extrasessions" },
  { title: "Lab Reports", icon: Code, path: "/dashboard/teacher/labreports" },
  { title: "Grades", icon: FileCheck2, path: "/dashboard/teacher/grades" },
  { title: "Schedule", icon: Calendar, path: "/dashboard/teacher/schedule" },
  { title: "Chat", icon: MessageCircle, path: "/dashboard/teacher/chat" },
  { title: "Events", icon: CalendarClock, path: "/dashboard/teacher/events" },
  { title: "Profile", icon: UserCircle, path: "/dashboard/teacher/profile" },
  

];

export default function TeacherDashboardLayout() {


    const token = localStorage.getItem("token");



  const [user, setUser] = useState(null);
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    if (!token) {
      navigate("/auth/login");
      return;
    }

    try {
      const decoded = jwtDecode(token);

      if (!decoded || decoded.role !== "teacher") {
        localStorage.removeItem("token");
        navigate("/auth/login");
        return;
      }
      setUser(decoded);
    } catch (err) {
      console.error("Invalid token:", err);
      localStorage.removeItem("token");
      navigate("/auth/login");
    }
  }, [navigate]);

  if (!user) {
    return <div className="flex justify-center items-center h-screen">Loading...</div>;
  }

  return (
    <div className="flex h-screen bg-gray-100">
      <SideBar pages={teacherPages} isOpen={isSidebarOpen} setIsOpen={setIsSidebarOpen} />

      <div className="flex-1 flex flex-col overflow-hidden">
        <DashboardTopBar setSidebarOpen={setIsSidebarOpen} token={token} />
        <main className="lg:p-4 overflow-y-auto h-full lg:w-auto w-screen">
          <Outlet />
        </main>
      </div>
    </div>
  );
}
