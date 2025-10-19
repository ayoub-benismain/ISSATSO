import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";

export default function Logout() {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const logout = async () => {
      try {
        // Optional delay for UX
        await new Promise((resolve) => setTimeout(resolve, 1000));

        // Call backend to clear refresh token cookie
        await fetch("http://localhost:5000/api/auth/logout", {
          method: "POST",
          credentials: "include",
        });

        // Remove access token from localStorage
        localStorage.removeItem("token");

        // Optional delay to show success message
        await new Promise((resolve) => setTimeout(resolve, 1000));

        // Redirect to login page
        window.location.href = "/auth/login";
      } catch (err) {
        console.error("Logout error:", err);
        window.location.href = "/auth/login"; // fallback redirect
      }
    };

    logout();
  }, []);

  return (
    <div className="flex justify-center items-center h-screen bg-gray-50">
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ type: "spring", stiffness: 120, damping: 15 }}
        className="p-8 rounded-xl flex flex-col items-center gap-4"
      >
        <svg
          className="animate-spin h-10 w-10 text-blue-500"
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
        >
          <circle
            className="opacity-25"
            cx="12"
            cy="12"
            r="10"
            stroke="currentColor"
            strokeWidth="4"
          ></circle>
          <path
            className="opacity-75"
            fill="currentColor"
            d="M4 12a8 8 0 018-8v4l3-3-3-3v4a8 8 0 00-8 8h4z"
          ></path>
        </svg>
        <p className="text-gray-700 font-medium text-lg">
          Logging out, please wait...
        </p>
      </motion.div>
    </div>
  );
}
