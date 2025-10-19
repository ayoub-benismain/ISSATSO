import React, { useEffect, useState } from "react";
import { Navigate } from "react-router-dom";
import axios from "axios";

const API_URL = "http://localhost:5000";

export default function ProtectedRoute({ role, children }) {
  const [isAllowed, setIsAllowed] = useState(null);

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) {
      setIsAllowed(false);
      return;
    }

    axios
      .get(`${API_URL}/api/dashboard/${role}`, {
        headers: { Authorization: `Bearer ${token}` },
      })
      .then(() => setIsAllowed(true))
      .catch(() => setIsAllowed(false));
  }, [role]);

  if (isAllowed === null) return <div>Loading...</div>;
  if (isAllowed === false) return <Navigate to="/unauthorized" replace />;

  return children;
}
