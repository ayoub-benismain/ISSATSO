import React, { useEffect, useState } from "react";
import { useNavigate, Outlet } from "react-router-dom";
import SideBar from "../components/dashboard/SideBar";
import DashboardTopBar from "../components/dashboard/DashboardTopBar";
import {
  LayoutDashboard,
  Book,
  BookOpen,
  Users,
  FileText,
  ClipboardList,
  FileCheck2,
  Calendar,
  CalendarClock,
  Bell,
  UserCircle,
} from "lucide-react";

import {jwtDecode} from "jwt-decode"; // <--- default import

const studentPages = [
  { title: "Dashboard", icon: LayoutDashboard, path: "/dashboard/student" },
  { title: "My Subjects", icon: Book, path: "/dashboard/student/mysubjects" }, // View enrolled courses
  { title: "Schedule", icon: Calendar, path: "/dashboard/student/schedule" }, // Timetable
  { title: "Teachers", icon: Users, path: "/dashboard/student/teachers" }, // View profiles & contact teachers
  { title: "Absence/Presence ", icon: UserCircle, path: "/dashboard/student/absence" },
  { title: "Documents", icon: FileText, path: "/dashboard/student/documents" }, // Access shared docs
  { title: "ExtraSessions", icon: CalendarClock, path: "/dashboard/student/extrasessions" }, // Club/School Events
  { title: "GroupList", icon: ClipboardList, path: "/dashboard/student/GroupList" }, // group list
  { title: "Results", icon: FileCheck2, path: "/dashboard/student/results" }, // Grades
  
  { title: "Notices", icon: Bell, path: "/dashboard/student/notices" },
  
   // Edit info / change password
];

export default function StudentDashboardLayout() {


  const [sidebarOpen, setSidebarOpen] = useState(false);


  const [user, setUser] = useState(null);
  const navigate = useNavigate();


    const token = localStorage.getItem("token");


  useEffect(() => {
    if (!token) {
      navigate("/auth/login");
      return;
    }

    try {
      // Decode token safely depending on import style
      const decoded = jwtDecode(token);

      if (!decoded || decoded.role !== "student") {
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
    <div className="flex h-screen overflow-hidden pt-[2vh] p-5 bg-gray-100">
      <SideBar pages={studentPages} isOpen={sidebarOpen} setIsOpen={setSidebarOpen} />

      <div className="flex-1 flex flex-col">
        <div className="p-4">
          <DashboardTopBar
            pageTitle="Student Dashboard"
            user={user}
            setSidebarOpen={setSidebarOpen}
            token={token}
          
          />
        </div>

        <main className="lg:p-4 overflow-y-auto h-full lg:w-auto w-screen">
            <Outlet />
        </main>
      </div>
    </div>
  );
}
