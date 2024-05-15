const express = require("express"); 
const router = express.Router(); 
const { getTask, getTasks, postTask, updateTask, deleteTask } = require("../controllers/TaskController.js"); 
const { verifyAccessToken} = require("../middleware/index.js"); 

// Routes beginning with /api/tasks 
router.get("/", verifyAccessToken, getTasks); 
router.get("/:taskId", verifyAccessToken, getTask); 
router.post("/", verifyAccessToken, postTask); 
router.put("/:taskId", verifyAccessToken, updateTask); 
router.delete("/:taskId", verifyAccessToken, deleteTask); 

module.exports = router; 
