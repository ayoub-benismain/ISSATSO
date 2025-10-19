import React, { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Paperclip, Mic, Send, User, Sun, Moon } from "lucide-react";

const classesData = ["LSI A2-02", "ING A2-02", "LSI A1-01"];

export default function TeacherChat() {
  const [selectedClass, setSelectedClass] = useState(classesData[0]);
  const [messages, setMessages] = useState({
    "LSI A2-02": [
      { id: 1, user: "student", text: "Hi Teacher!", time: "08:30 AM" },
      { id: 2, user: "teacher", text: "Hello everyone!", time: "08:32 AM" },
    ],
    "ING A2-02": [{ id: 1, user: "teacher", text: "Good morning!", time: "09:00 AM" }],
    "LSI A1-01": [],
  });
  const [newMessage, setNewMessage] = useState("");
  const [theme, setTheme] = useState("light");
  const fileInputRef = useRef(null);
  const messagesEndRef = useRef(null);

  const handleSendMessage = () => {
    if (!newMessage.trim()) return;
    const newMsg = {
      id: Date.now(),
      user: "teacher",
      text: newMessage,
      time: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
    };
    setMessages((prev) => ({
      ...prev,
      [selectedClass]: [...prev[selectedClass], newMsg],
    }));
    setNewMessage("");
  };

  const handleUploadClick = () => fileInputRef.current.click();
  const handleFileUpload = (e) => {
    const file = e.target.files[0];
    if (!file) return;
    const newMsg = {
      id: Date.now(),
      user: "teacher",
      text: `📎 ${file.name}`,
      time: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
    };
    setMessages((prev) => ({
      ...prev,
      [selectedClass]: [...prev[selectedClass], newMsg],
    }));
  };

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, selectedClass]);

  const themes = {
    dark: {
      wrapper: "bg-gradient-to-br from-blue-700 to-blue-900 text-white",
      leftPanel: "bg-blue-800/40 border-r border-blue-400/20 text-yellow-300",
      rightHeader: "bg-blue-800/70 border-b border-blue-400/20 text-yellow-300",
      chatStudent: "bg-yellow-400 text-blue-900",
      chatTeacher: "bg-blue-800/70 text-white",
      inputBg: "bg-blue-700/60 text-white placeholder-gray-300 focus:ring-yellow-300",
      buttonSend: "bg-yellow-400 text-blue-900 hover:bg-yellow-300",
    },
    light: {
      wrapper: "bg-white text-gray-900",
      leftPanel: "bg-blue-50 border-r border-blue-200 text-blue-900",
      rightHeader: "bg-blue-100 border-b border-blue-200 text-blue-900",
      chatStudent: "bg-blue-200 text-blue-900",
      chatTeacher: "bg-blue-500 text-white",
      inputBg: "bg-blue-100 text-gray-900 placeholder-gray-500 focus:ring-blue-400",
      buttonSend: "bg-blue-400 text-white hover:bg-blue-500",
    },
  };

  const currentTheme = themes[theme];

  return (
    <div className={`relative flex flex-col md:flex-row h-[80vh] w-full overflow-hidden ${currentTheme.wrapper}`}>
      {/* Theme Toggle */}
      <button
        className="absolute top-2 right-4 z-20 p-2 rounded-full bg-white/80 shadow-md hover:bg-white"
        onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
      >
        {theme === "dark" ? <Sun size={20} className="text-yellow-500" /> : <Moon size={20} className="text-blue-700" />}
      </button>

      {/* LEFT PANEL DESKTOP */}
      <div className={`hidden md:flex w-1/5 flex-col ${currentTheme.leftPanel}`}>
        <div className="p-3 border-b border-gray-200 font-semibold">Classes</div>
        <div className="flex-1 overflow-y-auto p-3 space-y-3">
          {classesData.map((cls) => (
            <div
              key={cls}
              onClick={() => setSelectedClass(cls)}
              className={`flex items-center gap-3 p-3 rounded-lg cursor-pointer ${
                selectedClass === cls ? "bg-blue-200 font-semibold" : "hover:bg-blue-300/50"
              }`}
            >
              <div className="p-2 rounded-full bg-blue-100">
                <User size={18} className="text-blue-900" />
              </div>
              <div>
                <h3 className="font-medium">{cls}</h3>
                <p className="text-xs opacity-70">Class Chat</p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* MOBILE CHAT SELECTOR */}
      <div className={`flex md:hidden overflow-x-auto p-5 gap-4 ${currentTheme.leftPanel}`}>
        {classesData.map((cls) => (
          <div
            key={cls}
            onClick={() => setSelectedClass(cls)}
            className={`flex-shrink-0 flex flex-col items-center cursor-pointer ${selectedClass === cls ? "scale-105" : ""}`}
          >
            <div className={`w-14 h-14 rounded-full flex items-center justify-center ${selectedClass === cls ? "bg-blue-400" : "bg-blue-200"}`}>
              <User size={22} className="text-white" />
            </div>
            <span className="text-xs mt-1">{cls.split(" ")[1]}</span>
          </div>
        ))}
      </div>

      {/* CHAT PANEL */}
      <div className="w-full md:w-4/5 flex flex-col relative h-full">
        {/* Header */}
        <div className={`flex justify-between items-center px-4 md:px-6 py-3 ${currentTheme.rightHeader}`}>
          <h3 className="truncate font-semibold">{selectedClass} Chat</h3>
        </div>

        {/* Messages */}
        <div className={`flex-1 overflow-y-auto px-4 md:px-6 py-3 space-y-3 ${theme === "dark" ? "bg-blue-900/50" : "bg-blue-50"}`}>
          <AnimatePresence>
            {(messages[selectedClass] || []).map((msg) => (
              <motion.div
                key={msg.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className={`flex flex-col max-w-xs ${msg.user === "teacher" ? "ml-auto items-end" : "mr-auto items-start"}`}
              >
                <div className={`px-4 py-2 rounded-2xl shadow-md ${msg.user === "teacher" ? currentTheme.chatTeacher : currentTheme.chatStudent}`}>
                  {msg.text}
                </div>
                <span className={`text-xs mt-1 ${theme === "dark" ? "text-gray-300" : "text-gray-500"}`}>{msg.time}</span>
              </motion.div>
            ))}
            <div ref={messagesEndRef} />
          </AnimatePresence>
        </div>

        {/* Input */}
        <div className={`px-4 md:px-6 py-3 flex items-center gap-2 border-t ${theme === "dark" ? "border-blue-400/20 bg-blue-800/70" : "border-blue-200 bg-blue-100"}`}>
          <motion.button onClick={handleUploadClick} whileHover={{ scale: 1.2 }} className={theme === "dark" ? "text-yellow-300" : "text-blue-700"}>
            <Paperclip size={20} />
          </motion.button>
          <input type="file" ref={fileInputRef} onChange={handleFileUpload} className="hidden" />
          <input
            type="text"
            placeholder="Type a message..."
            value={newMessage}
            onChange={(e) => setNewMessage(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && handleSendMessage()}
            className={`flex-1 rounded-full px-4 py-2 outline-none ${currentTheme.inputBg}`}
          />
          <motion.button whileHover={{ scale: 1.1 }} className={theme === "dark" ? "text-yellow-300" : "text-blue-700"}>
            <Mic size={20} />
          </motion.button>
          <motion.button onClick={handleSendMessage} whileTap={{ scale: 0.9 }} className={`p-2 rounded-full ${currentTheme.buttonSend}`}>
            <Send size={20} />
          </motion.button>
        </div>
      </div>
    </div>
  );
}
