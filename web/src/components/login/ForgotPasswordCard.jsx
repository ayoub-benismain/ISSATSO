import React, { useState } from "react";
import toast from "react-hot-toast";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";

export default function ForgotPasswordCard() {
  const [email, setEmail] = useState("");
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleForgotPassword = async (e) => {
    e.preventDefault();

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      toast.error("Please enter a valid email address.");
      return;
    }

    setLoading(true);
    const toastId = toast.loading("Sending email...");

    try {
      const res = await fetch("http://localhost:5000/api/auth/forgot-password", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email }),
      });

      const data = await res.json();

      toast.dismiss(toastId);
      setLoading(false);

      if (!res.ok) {
        toast.error(data.message || "Failed to send reset email.");
        return;
      }

      toast.success("Password reset email sent. Check your inbox!");
      setSubmitted(true);
    } catch (error) {
      toast.dismiss(toastId);
      toast.error("Server error, try again later.");
      setLoading(false);
      console.error(error);
    }
  };

  if (submitted) {
    return (
      <motion.div
        initial={{ x: "100vw", opacity: 0 }}
        animate={{ x: 0, opacity: 1 }}
        transition={{ type: "spring", stiffness: 70, damping: 20 }}
        className="flex-1 flex flex-col items-center justify-center px-10 py-12 lg:px-20"
      >
        <div className="bg-white rounded-xl shadow-xl p-8 lg:p-10 max-w-md w-full text-center">
          <h2 className="text-2xl font-bold text-gray-800 mb-4">Check your email</h2>
          <p className="text-gray-600 mb-6">
            We have sent a password reset link to <strong>{email}</strong>. Please check your inbox and follow the instructions to reset your password.
          </p>
          <button
            onClick={() => setSubmitted(false)}
            className="bg-blue-500 hover:bg-blue-600 text-white font-semibold py-3 px-6 rounded-lg transition"
          >
            Send again
          </button>
          <p className="mt-6 text-center text-gray-600">
            Remember your password?{" "}
            <Link to="/auth/login" className="text-blue-600 hover:underline font-semibold">
              Back to Login
            </Link>
          </p>
        </div>
      </motion.div>
    );
  }

  return (
    <motion.div
      initial={{ x: "100vw", opacity: 0 }}
      animate={{ x: 0, opacity: 1 }}
      transition={{ type: "spring", stiffness: 70, damping: 20 }}
      className="flex-1 flex flex-col justify-center px-10 py-12 lg:px-20"
    >
      <div className="bg-white rounded-xl shadow-xl p-8 lg:p-10 max-w-md w-full">
        <h2 className="text-2xl font-bold text-center text-gray-800 mb-6">Forgot your password?</h2>
        <p className="text-center text-gray-600 mb-6">
          Enter your email address below and we’ll send you a link to reset your password.
        </p>

        <form onSubmit={handleForgotPassword} className="space-y-5">
          <div>
            <label className="block mb-1 font-medium text-gray-700">Email address</label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="ayoub@issatso.tn"
              className="w-full border border-gray-300 rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-blue-500"
              required
              disabled={loading}
            />
          </div>

          <button
            type="submit"
            disabled={loading}
            className={`w-full font-semibold py-3 rounded-lg flex items-center justify-center gap-2 transition ${
              loading
                ? "bg-blue-300 cursor-not-allowed"
                : "bg-blue-500 hover:bg-blue-600 text-white"
            }`}
          >
            {loading && (
              <svg
                className="animate-spin h-5 w-5 text-white"
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
            )}
            Send reset link
          </button>
        </form>

        <p className="mt-6 text-center text-gray-600">
          Remember your password?{" "}
          <Link to="/auth/login" className="text-blue-600 hover:underline font-semibold">
            Back to Login
          </Link>
        </p>
      </div>
    </motion.div>
  );
}
