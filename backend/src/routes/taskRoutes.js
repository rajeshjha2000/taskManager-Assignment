const express = require("express");
const router = express.Router();
const {
  getTasks,
  createTask,
  updateTask,
  deleteTask,
} = require("../controllers/taskController");
const { protect } = require("../middleware/auth");

router.use(protect);

router.route("/").post(createTask);
router.route("/project/:projectId").get(getTasks);
router.route("/:id").put(updateTask).delete(deleteTask);

module.exports = router;
