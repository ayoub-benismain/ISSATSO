import React, { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Paperclip, Send, Users, Mic, MessageCircle, Sun, Moon } from "lucide-react";

const teachersList = [
  { id: 1, name: "Dr. Roua Jabla", department: "Computer Science", avatar: "https://randomuser.me/api/portraits/women/45.jpg", online: true },
  { id: 2, name: "Dr. Ahmed Ben Ali", department: "Mathematics", avatar: "https://randomuser.me/api/portraits/men/32.jpg", online: false },
  { id: 3, name: "Dr. Salma Trabelsi", department: "Physics", avatar: "https://randomuser.me/api/portraits/women/65.jpg", online: true },
  { id: 4, name: "Dr. Anis Ghali", department: "AI & Robotics", avatar: "https://randomuser.me/api/portraits/men/58.jpg", online: true },
];

export default function StudentTeachersChat() {
  const [selectedChat, setSelectedChat] = useState("class");
  const [messages, setMessages] = useState({
    class: [
      { id: 1, sender: "student", text: "Good morning everyone!", time: "09:00 AM" },
      { id: 2, sender: "teacher", text: "Morning! Don’t forget the quiz tomorrow.", time: "09:05 AM" },
    ],
    1: [{ id: 1, sender: "student", text: "Hello Dr. Roua!", time: "09:10 AM" }],
    2: [],
    3: [],
    4: [],
  });
  const [newMessage, setNewMessage] = useState("");
  const [theme, setTheme] = useState("light");
  const messagesEndRef = useRef(null);
  const fileInputRef = useRef(null);

  const handleSend = () => {
    if (!newMessage.trim()) return;
    const newMsg = {
      id: Date.now(),
      sender: "student",
      text: newMessage,
      time: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
    };
    setMessages((prev) => ({
      ...prev,
      [selectedChat]: [...(prev[selectedChat] || []), newMsg],
    }));
    setNewMessage("");
  };

  const handleUploadClick = () => fileInputRef.current.click();
  const handleFileUpload = (e) => {
    const file = e.target.files[0];
    if (!file) return;
    const newMsg = {
      id: Date.now(),
      sender: "student",
      text: `📎 ${file.name}`,
      time: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
    };
    setMessages((prev) => ({
      ...prev,
      [selectedChat]: [...(prev[selectedChat] || []), newMsg],
    }));
  };

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, selectedChat]);

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
      chatTeacher: "bg-blue-50 text-gray-800",
      inputBg: "bg-blue-100 text-gray-900 placeholder-gray-500 focus:ring-blue-400",
      buttonSend: "bg-blue-400 text-white hover:bg-blue-500",
    },
  };

  const currentTheme = themes[theme];

  return (
    <div className={`relative flex flex-col md:flex-row h-full w-full overflow-hidden ${currentTheme.wrapper}`}>
      {/* Theme Toggle */}
      <button
        className="absolute top-2 right-4 z-20 p-2 rounded-full bg-white/80 shadow-md hover:bg-white"
        onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
      >
        {theme === "dark" ? <Sun size={20} className="text-yellow-500" /> : <Moon size={20} className="text-blue-700" />}
      </button>

      {/* LEFT PANEL (Desktop) */}
      <div className={`hidden md:flex w-1/5 border-y flex-col ${currentTheme.leftPanel}`}>
        <div className="p-3 border-b border-gray-200 flex items-center gap-2 font-semibold">
          <Users size={20} /> Chats
        </div>
        <div className="flex-1 overflow-y-auto p-3 space-y-3">
          {/* Class Group */}
          <div
            onClick={() => setSelectedChat("class")}
            className={`flex items-center gap-3 p-3 rounded-lg cursor-pointer ${
              selectedChat === "class" ? "bg-blue-200 font-semibold" : "hover:bg-blue-300/50"
            }`}
          >
            <div className="p-2 rounded-full bg-blue-100">
              <Users size={18} className="text-blue-900" />
            </div>
            <div>
              <h3 className="font-medium">LSI A2-02</h3>
              <p className="text-xs opacity-70">Class Group Chat</p>
            </div>
          </div>

          <div className="border-t border-blue-400/20 my-2"></div>

          {/* Teachers */}
          <h4 className="text-xs uppercase ml-2 mb-1 text-blue-700">Teachers</h4>
          {teachersList.map((t) => (
            <div
              key={t.id}
              onClick={() => setSelectedChat(t.id)}
              className={`flex items-center gap-3 p-3 rounded-lg cursor-pointer ${
                selectedChat === t.id ? "bg-blue-200 font-semibold" : "hover:bg-blue-300/50"
              }`}
            >
              <div className="relative">
                <img src={t.avatar} alt={t.name} className="w-10 h-10 rounded-full object-cover" />
                <span
                  className={`absolute bottom-1 right-1 w-3 h-3 rounded-full border-2 border-white ${
                    t.online ? "bg-green-400" : "bg-gray-400"
                  }`}
                />
              </div>
              <div>
                <h3 className="font-medium">{t.name}</h3>
                <p className="text-xs opacity-70">{t.department}</p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* MOBILE CHAT SELECTOR */}
      <div className={`flex md:hidden overflow-x-auto p-5 gap-4 ${currentTheme.leftPanel}`}>
        {/* Class Chat Circle */}
        <div
          onClick={() => setSelectedChat("class")}
          className={`flex-shrink-0 flex flex-col items-center cursor-pointer ${
            selectedChat === "class" ? "scale-105" : ""
          }`}
        >
          <div className={`w-14 h-14 rounded-full flex items-center justify-center ${selectedChat === "class" ? "bg-blue-400" : "bg-blue-200"}`}>
            <Users size={22} className="text-white" />
          </div>
          <span className="text-xs mt-1">Class</span>
        </div>

        {teachersList.map((t) => (
          <div
            key={t.id}
            onClick={() => setSelectedChat(t.id)}
            className={`flex-shrink-0 flex flex-col items-center cursor-pointer ${
              selectedChat === t.id ? "scale-105" : ""
            }`}
          >
            <div className={`w-14 h-14 rounded-full overflow-hidden border-2 ${selectedChat === t.id ? "border-blue-500" : "border-transparent"}`}>
              <img src={t.avatar} alt={t.name} className="w-full h-full object-cover" />
            </div>
            <span className="text-xs mt-1">{t.name.split(" ")[1]}</span>
          </div>
        ))}
      </div>

      {/* CHAT PANEL */}
      <div className="w-full md:w-4/5 flex flex-col relative h-full">
        {/* Header */}
        <div className={`flex justify-between items-center px-4 md:px-6 py-3 ${currentTheme.rightHeader}`}>
          <h3 className="truncate font-semibold">
            {selectedChat === "class"
              ? "Class Chat - LSI A2-02"
              : teachersList.find((t) => t.id === selectedChat)?.name || "Chat"}
          </h3>
        </div>

        {/* Messages */}
        <div className={`flex-1 overflow-y-auto px-4 md:px-6 py-3 space-y-3 ${theme === "dark" ? "bg-blue-900/50" : "bg-blue-50"}`}>
          <AnimatePresence>
            {(messages[selectedChat] || []).map((msg) => (
              <motion.div
                key={msg.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className={`flex flex-col max-w-xs ${msg.sender === "student" ? "ml-auto items-end" : "mr-auto items-start"}`}
              >
                <div className={`px-4 py-2 rounded-2xl shadow-md ${msg.sender === "student" ? currentTheme.chatStudent : currentTheme.chatTeacher}`}>
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
            onKeyDown={(e) => e.key === "Enter" && handleSend()}
            className={`flex-1 rounded-full px-4 py-2 outline-none ${currentTheme.inputBg}`}
          />
          <motion.button whileHover={{ scale: 1.1 }} className={theme === "dark" ? "text-yellow-300" : "text-blue-700"}>
            <Mic size={20} />
          </motion.button>
          <motion.button onClick={handleSend} whileTap={{ scale: 0.9 }} className={`p-2 rounded-full ${currentTheme.buttonSend}`}>
            <Send size={20} />
          </motion.button>
        </div>
      </div>
    </div>
  );
}
