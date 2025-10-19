// controllers/dashboardController.js
const db = require("../config/db")



exports.studentDashboard = (req, res) => {
  const user = req.user;
  res.json({
    message: `Welcome to the Student Dashboard, ${user.username}!`,
    userInfo: user,
  });
};

exports.teacherDashboard = (req, res) => {
  const user = req.user;
  res.json({
    message: `Welcome to the Teacher Dashboard, ${user.username}!`,
    userInfo: user,
  });
};





// --------------------
// Notifications
// --------------------
exports.getNotifications = (req, res) => {
  
  const userId = req.user.id; // get user ID from token
  const query = "SELECT * FROM notifications WHERE user_id = ? ORDER BY pinned DESC, created_at DESC";

  db.query(query, [userId], (err, results) => {
    if (err) return res.status(500).json({ message: "Server error", error: err });
    
    res.json(results);
    console.log("hello")
  });
};

exports.toggleReadStatus = (req, res) => {
  const id = req.params.id;
  const query = "UPDATE notifications SET read_status = NOT read_status WHERE id = ?";

  db.query(query, [id], (err) => {
    if (err) return res.status(500).json({ message: "Server error" });
    res.json({ message: "Notification read status updated" });
  });
};

exports.togglePin = (req, res) => {
  const id = req.params.id;
  const query = "UPDATE notifications SET pinned = NOT pinned WHERE id = ?";

  db.query(query, [id], (err) => {
    if (err) return res.status(500).json({ message: "Server error" });
    res.json({ message: "Notification pin status updated" });
  });
};

exports.deleteNotification = (req, res) => {
  const id = req.params.id;
  const query = "DELETE FROM notifications WHERE id = ?";

  db.query(query, [id], (err) => {
    if (err) return res.status(500).json({ message: "Server error" });
    res.json({ message: "Notification deleted" });
  });
};