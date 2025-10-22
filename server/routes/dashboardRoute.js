const express = require("express");
const router = express.Router();

const verifyToken = require("../middleware/verifyToken");
const verifyRole = require("../middleware/verifyRole");
const { studentDashboard, teacherDashboard , getNotifications , toggleReadStatus ,togglePin , deleteNotification , getProfile  } = require("../controllers/dashboardController");

router.get("/student", verifyToken, verifyRole("student"), studentDashboard);
router.get("/teacher", verifyToken, verifyRole("teacher"), teacherDashboard);



// Notifications
router.get("/notifications", verifyToken, getNotifications);
router.patch("/notifications/read/:id", verifyToken, toggleReadStatus);
router.patch("/notifications/pin/:id", verifyToken, togglePin);
router.delete("/notifications/:id", verifyToken, deleteNotification);


// profile info
router.get("/profile", verifyToken, getProfile);








module.exports = router;
