const express = require("express");
const router = express.Router();
const {
  getProjects,
  createProject,
  deleteProject,
} = require("../controllers/projectController");
const { protect } = require("../middleware/auth");

router.use(protect);

router.route("/").get(getProjects).post(createProject);
router.route("/:id").delete(deleteProject);

module.exports = router;
