import React from "react";
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import { Toaster } from "react-hot-toast";

import Login from "./pages/auth/Login";
import Register from "./pages/auth/Register";
import ForgotPassword from "./pages/auth/forgot-password";
import ResetPassword from './pages/auth/ResetPassword';

import StudentDashboardLayout from "./layouts/StudentLayout";
import TeacherDashboardLayout from "./layouts/TeacherLayout";

import ProtectedRoute from "./components/dashboard/ProtectedRoute";

// Student Pages
import StudentHome from "./pages/dashboard/student/StudentHome";
import MySubjects from "./pages/dashboard/student/MySubjects";
import Teachers from "./pages/dashboard/student/Teachers";
import DocumentsStudent from "./pages/dashboard/student/Documents";
import GroupList from "./pages/dashboard/student/GroupList"
import Results from "./pages/dashboard/student/Results";
import ScheduleStudent from "./pages/dashboard/student/Schedule";
import NoticesStudent from "./pages/dashboard/student/Notices";
import ExtraSessions from "./pages/dashboard/student/ExtraSessions";
import Absence from "./pages/dashboard/student/Absence";

// Teacher Pages
import TeacherHome from "./pages/dashboard/teacher/TeacherHome";
import Students from "./pages/dashboard/teacher/Students";
import DocumentsTeacher from "./pages/dashboard/teacher/Documents";
import ExtraSession from "./pages/dashboard/teacher/ExtraSession";
import Grades from "./pages/dashboard/teacher/Grades";
import ScheduleTeacher from "./pages/dashboard/teacher/Schedule";
import Chat from "./pages/dashboard/teacher/Chat"
import EventsTeacher from "./pages/dashboard/teacher/Events";
import ProfileTeacher from "./pages/dashboard/teacher/Profile";
import Logout from "./components/dashboard/Logout";

export default function App() {
  return (
    <>
      <Toaster position="top-right" />
      <Router>
        <Routes>
          {/* Public routes */}
          <Route path="/" element={<Navigate to="/auth/login" />} />
          <Route path="/auth/login" element={<Login />} />
          <Route path="/auth/register" element={<Register />} />
          <Route path="/auth/forgot-password" element={<ForgotPassword />} />
          <Route path="/auth/reset-password/:token" element={<ResetPassword />} />

          <Route path="logout" element={<Logout/>}/>

          {/* Student Dashboard with nested routes */}
          <Route
            path="/dashboard/student"
            element={
              <ProtectedRoute role="student">
                <StudentDashboardLayout />
              </ProtectedRoute>
            }
          >
            <Route index element={<StudentHome />} />
            <Route path="mysubjects" element={<MySubjects />} />
            <Route path="teachers" element={<Teachers />} />
            <Route path="documents" element={<DocumentsStudent />} />
            <Route path="grouplist" element={<GroupList />} />
            <Route path="results" element={<Results />} />
            <Route path="schedule" element={<ScheduleStudent />} />
            <Route path="notices" element={<NoticesStudent />} />
            <Route path="extrasessions" element={<ExtraSessions />} />
            <Route path="absence" element={<Absence />} />
            
          </Route>

          {/* Teacher Dashboard with nested routes */}
          <Route
            path="/dashboard/teacher"
            element={
              <ProtectedRoute role="teacher">
                <TeacherDashboardLayout />
              </ProtectedRoute>
            }
          >
            <Route index element={<TeacherHome />} />
            <Route path="students" element={<Students />} />
            <Route path="documents" element={<DocumentsTeacher />} />
            <Route path="extrasessions" element={<ExtraSession />} />
            <Route path="grades" element={<Grades />} />
            <Route path="schedule" element={<ScheduleTeacher />} />
            <Route path="chat" element={<Chat />} />
            <Route path="events" element={<EventsTeacher />} />
            <Route path="profile" element={<ProfileTeacher />} />
            
          </Route>
        </Routes>
      </Router>
    </>
  );
}
