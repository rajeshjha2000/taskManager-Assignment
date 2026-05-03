const Task = require("../models/Task");
const Project = require("../models/Project");

exports.getStats = async (req, res) => {
  try {
    const userId = req.user.id;

    // Projects count
    const projectsCount = await Project.countDocuments();

    // Tasks counts
    const taskQuery = req.user.role === "ADMIN" ? {} : { $or: [{ assignedTo: userId }, { createdBy: userId }] };
    
    const todoTasks = await Task.countDocuments({
      ...taskQuery,
      status: "TODO",
    });
    const inProgressTasks = await Task.countDocuments({
      ...taskQuery,
      status: "IN_PROGRESS",
    });
    const doneTasks = await Task.countDocuments({
      ...taskQuery,
      status: "DONE",
    });

    // Recent tasks
    const recentTasks = await Task.find(taskQuery)
      .sort({ createdAt: -1 })
      .limit(5)
      .populate("project", "name");

    res.json({
      projectsCount,
      todoTasks,
      inProgressTasks,
      doneTasks,
      recentTasks,
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
