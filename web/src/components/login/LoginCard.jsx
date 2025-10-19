import React, { useState } from "react";
import toast from "react-hot-toast";
import { Link } from "react-router-dom";
import { Eye, EyeOff } from "lucide-react";
import { motion } from "framer-motion";

export default function LoginCard() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);

  // Call backend to get new access token using refresh token cookie
  const refreshAccessToken = async () => {
    try {
      const res = await fetch("http://localhost:5000/api/auth/refresh-token", {
        method: "POST",
        credentials: "include", // send cookies (refresh token)
      });

      if (!res.ok) {
        throw new Error("Failed to refresh token");
      }

      const data = await res.json();
      localStorage.setItem("token", data.token); // store new access token
      return data.token;
    } catch (err) {
      console.error("Refresh token error:", err);
      return null;
    }
  };

// Helper function to decode JWT payload
function decodeJWT(token) {
  try {
    const payload = token.split('.')[1];
    const decoded = atob(payload);
    return JSON.parse(decoded);
  } catch {
    return null;
  }
}


const handleLogin = async (e) => {
    e.preventDefault();

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) return toast.error("Please enter a valid email.");
    if (!password) return toast.error("Password cannot be empty.");

    setLoading(true);
    toast.loading("Logging in...");

    try {
      const res = await fetch("http://localhost:5000/api/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
        credentials: "include", // important for refresh token cookie
      });

      const data = await res.json();
      toast.dismiss();

      if (!res.ok) {
        toast.error(data.message || "Login failed.");
        setLoading(false);
        return;
      }

      // Save token in localStorage
      localStorage.setItem("token", data.token);

      // Decode token to get user info
      const user = decodeJWT(data.token);
      if (!user) {
        toast.error("Failed to decode token.");
        setLoading(false);
        return;
      }

      toast.success("Login successful!");
      console.log(user)

      // Redirect based on role
      setTimeout(() => {
        window.location.href = `/dashboard/${user.role}`;
      }, 500);
    } catch (err) {
      toast.dismiss();
      toast.error("Server error, try again later.");
      console.error("Login error:", err);
      setLoading(false);
    }
  };

return (
    <motion.div
      initial={{ x: "+100vw", opacity: 0 }}
      animate={{ x: 0, opacity: 1 }}
      transition={{ type: "spring", stiffness: 70, damping: 20 }}
      className="flex-1 flex items-center justify-center px-10 py-12 lg:px-20"
    >
      <div className="bg-white rounded-xl shadow-xl p-8 lg:p-10 max-w-md w-full">
        <h2 className="text-2xl font-bold text-center text-gray-800 mb-6">
          Sign in to your account
        </h2>

        {/* Panda Face */}
        <div className="flex justify-center mb-6">
          <div className="relative w-24 h-24">
            <div className="absolute w-full h-full bg-black rounded-full" />
            <div className="absolute top-6 left-5 w-4 h-4 rounded-full bg-white">
              {showPassword ? (
                <div className="w-full h-0.5 bg-black mt-1" />
              ) : (
                <div className="w-2 h-2 bg-black rounded-full m-auto mt-1" />
              )}
            </div>
            <div className="absolute top-6 right-5 w-4 h-4 rounded-full bg-white">
              {showPassword ? (
                <div className="w-full h-0.5 bg-black mt-1" />
              ) : (
                <div className="w-2 h-2 bg-black rounded-full m-auto mt-1" />
              )}
            </div>
          </div>
        </div>

        <form className="space-y-5" onSubmit={handleLogin}>
          <div>
            <label className="block mb-1 font-medium text-gray-700">Email address</label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="ayoub@issatso.tn"
              className="w-full border border-gray-300 rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-blue-500"
              disabled={loading}
            />
          </div>

          <div>
            <label className="block mb-1 font-medium text-gray-700">Password</label>
            <div className="relative">
              <input
                type={showPassword ? "text" : "password"}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="••••••••"
                className="w-full border border-gray-300 rounded-lg px-4 py-3 pr-12 focus:outline-none focus:ring-2 focus:ring-blue-500"
                disabled={loading}
              />
              <button
                type="button"
                onClick={() => setShowPassword((prev) => !prev)}
                className="absolute top-1/2 right-3 -translate-y-1/2 text-gray-500 hover:text-blue-600"
                aria-label={showPassword ? "Hide password" : "Show password"}
                disabled={loading}
              >
                {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
              </button>
            </div>
          </div>

          <div className="text-right text-sm text-blue-500 hover:underline cursor-pointer">
            <Link to="/auth/forgot-password">Forgot password?</Link>
          </div>

          <button
            type="submit"
            disabled={loading}
            className={`w-full font-semibold py-3 rounded-lg transition ${
              loading
                ? "bg-blue-400 cursor-not-allowed"
                : "bg-blue-500 hover:bg-blue-600 text-white"
            }`}
          >
            {loading ? (
              <svg
                className="animate-spin h-5 w-5 mx-auto text-white"
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
                  d="M4 12a8 8 0 018-8v8H4z"
                ></path>
              </svg>
            ) : (
              "Sign In"
            )}
          </button>
        </form>

        <p className="mt-6 text-center text-gray-600">
          I don’t have an account?{" "}
          <Link
            to="/auth/register"
            className="text-blue-600 hover:underline font-semibold"
          >
            Register
          </Link>
        </p>
      </div>
    </motion.div>
  );
}