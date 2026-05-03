import { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import API from "../services/api";
import { motion, AnimatePresence } from "framer-motion";
import { Plus, ArrowLeft, Calendar, Trash2, X, User, UserPlus } from "lucide-react";

const ProjectDetail = () => {
  const { id } = useParams();
  const [tasks, setTasks] = useState([]);
  const [project, setProject] = useState(null);
  const [loading, setLoading] = useState(true);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [users, setUsers] = useState([]);
  const [newTask, setNewTask] = useState({ title: "", description: "", status: "TODO", assignedTo: "" });
  const [error, setError] = useState("");

  const fetchData = async () => {
    try {
      const [projectRes, tasksRes, usersRes] = await Promise.all([
        API.get(`/projects`),
        API.get(`/tasks/project/${id}`),
        API.get(`/users`)
      ]);
      const currentProject = projectRes.data.find(p => p._id === id);
      setProject(currentProject);
      setTasks(tasksRes.data);
      setUsers(usersRes.data);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, [id]);

  const openModal = () => {
    setNewTask({ title: "", description: "", status: "TODO", assignedTo: "" });
    setError("");
    setIsModalOpen(true);
  };

  const handleCreateTask = async (e) => {
    e.preventDefault();
    
    if (!newTask.assignedTo) {
      setError("Please select a team member to assign this task to.");
      return;
    }

    try {
      await API.post("/tasks", { ...newTask, projectId: id });
      setIsModalOpen(false);
      setNewTask({ title: "", description: "", status: "TODO", assignedTo: "" });
      fetchData();
    } catch (err) {
      setError(err.response?.data?.message || "Failed to create task");
    }
  };

  const handleStatusChange = async (taskId, newStatus) => {
    setTasks(tasks.map(t => t._id === taskId ? { ...t, status: newStatus } : t));
    try {
      await API.put(`/tasks/${taskId}`, { status: newStatus });
    } catch (err) {
      console.error("Failed to update status", err);
      fetchData();
    }
  };

  const handleDeleteTask = async (taskId) => {
    try {
      await API.delete(`/tasks/${taskId}`);
      setTasks(tasks.filter(t => t._id !== taskId));
    } catch (err) {
      console.error("Failed to delete task", err);
    }
  };

  if (loading) return <div className="flex justify-center py-20"><div className="animate-spin rounded-full h-12 w-12 border-t-4 border-indigo-500 border-r-transparent"></div></div>;
  if (!project) return <div className="text-center py-20 text-slate-500 font-medium">Project not found.</div>;

  const columns = [
    { id: "TODO", title: "To Do", color: "bg-pink-50 border-pink-200 text-pink-700", badge: "bg-pink-200 text-pink-800" },
    { id: "IN_PROGRESS", title: "In Progress", color: "bg-orange-50 border-orange-200 text-orange-700", badge: "bg-orange-200 text-orange-800" },
    { id: "DONE", title: "Done", color: "bg-emerald-50 border-emerald-200 text-emerald-700", badge: "bg-emerald-200 text-emerald-800" }
  ];

  return (
    <div className="p-4 max-w-[1400px] mx-auto h-[calc(100vh-6rem)] flex flex-col">
      <header className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-8 shrink-0">
        <div>
          <Link to="/projects" className="text-indigo-500 hover:text-indigo-700 font-bold flex items-center gap-1.5 mb-3 text-sm transition-colors">
            <ArrowLeft className="h-4 w-4" /> Back to Projects
          </Link>
          <h1 className="text-4xl font-extrabold text-slate-800">{project.name}</h1>
          <p className="text-slate-500 mt-2 font-medium">{project.description}</p>
        </div>
        <button
          onClick={openModal}
          className="inline-flex items-center gap-2 bg-gradient-to-r from-indigo-600 to-pink-500 hover:opacity-90 px-6 py-3 rounded-2xl font-bold text-white shadow-xl shadow-pink-500/20 transition-all hover:-translate-y-1"
        >
          <Plus className="h-5 w-5" />
          Add Task
        </button>
      </header>

      {/* Kanban Board */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 overflow-hidden flex-grow pb-4">
        {columns.map(column => (
          <div key={column.id} className={`flex flex-col rounded-[2rem] border-2 ${column.color} overflow-hidden h-full shadow-sm`}>
            <div className="p-5 border-b border-black/5 flex items-center justify-between bg-white/40 backdrop-blur-sm shrink-0">
              <h2 className="font-extrabold text-lg flex items-center gap-2">
                <span className={`w-2.5 h-2.5 rounded-full ${column.badge}`}></span>
                {column.title}
              </h2>
              <span className={`text-xs py-1 px-3 rounded-xl font-black ${column.badge}`}>
                {tasks.filter(t => t.status === column.id).length}
              </span>
            </div>
            
            <div className="p-4 overflow-y-auto flex-grow space-y-4 custom-scrollbar bg-white/20">
              <AnimatePresence>
                {tasks.filter(t => t.status === column.id).map(task => (
                  <motion.div
                    key={task._id}
                    layout
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, scale: 0.9 }}
                    className="bg-white rounded-2xl p-5 border border-slate-100 shadow-md group hover:shadow-xl hover:border-indigo-200 transition-all relative overflow-hidden"
                  >
                    <div className="flex justify-between items-start mb-3">
                      <h3 className="font-extrabold text-slate-800 leading-tight pr-8">{task.title}</h3>
                      <button 
                        onClick={() => handleDeleteTask(task._id)}
                        className="opacity-0 group-hover:opacity-100 absolute top-4 right-4 p-1.5 text-slate-400 hover:text-red-500 hover:bg-red-50 rounded-lg transition-all"
                      >
                        <Trash2 className="h-4 w-4" />
                      </button>
                    </div>
                    <p className="text-sm text-slate-500 mb-4 font-medium grow">{task.description}</p>
                    
                    <div className="flex flex-col gap-2 mb-5 bg-slate-50/80 p-3 rounded-xl border border-slate-100">
                      <div className="flex items-center gap-2 text-xs text-slate-500 font-medium">
                        <User className="h-3.5 w-3.5" />
                        <span>Created by: <strong className="text-slate-700">{task.createdBy?.name || "Unknown"}</strong></span>
                      </div>
                      <div className="flex items-center gap-2 text-xs text-slate-500 font-medium">
                        <UserPlus className="h-3.5 w-3.5" />
                        <span>Assigned to: <strong className="text-indigo-600">{task.assignedTo?.name || "Unassigned"}</strong></span>
                      </div>
                    </div>
                    
                    <div className="flex items-center justify-between border-t border-slate-100 pt-4 mt-auto">
                      <div className="flex items-center gap-1.5 text-xs text-slate-400 font-bold">
                        <Calendar className="h-3.5 w-3.5" />
                        {new Date(task.createdAt).toLocaleDateString()}
                      </div>
                      
                      <select 
                        className="bg-slate-50 border border-slate-200 rounded-lg font-bold text-xs py-1.5 px-3 text-slate-600 outline-none hover:border-indigo-400 transition-colors cursor-pointer"
                        value={task.status}
                        onChange={(e) => handleStatusChange(task._id, e.target.value)}
                      >
                        <option value="TODO">To Do</option>
                        <option value="IN_PROGRESS">In Progress</option>
                        <option value="DONE">Done</option>
                      </select>
                    </div>
                  </motion.div>
                ))}
              </AnimatePresence>
              {tasks.filter(t => t.status === column.id).length === 0 && (
                <div className="h-full flex items-center justify-center text-slate-400 font-bold text-sm border-2 border-dashed border-black/10 rounded-2xl py-8 m-2 opacity-50">
                  Drop tasks here
                </div>
              )}
            </div>
          </div>
        ))}
      </div>

      {/* Add Task Modal */}
      <AnimatePresence>
        {isModalOpen && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/40 backdrop-blur-md">
            <motion.div
              initial={{ opacity: 0, y: 20, scale: 0.95 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              className="bg-white/95 backdrop-blur-xl rounded-3xl border border-white p-8 w-full max-w-md shadow-2xl relative"
            >
              <button
                onClick={() => setIsModalOpen(false)}
                className="absolute top-6 right-6 p-2 text-slate-400 hover:text-slate-800 rounded-full hover:bg-slate-100 transition-colors"
              >
                <X className="h-5 w-5" />
              </button>
              
              <h2 className="text-3xl font-extrabold text-slate-800 mb-6">Add New Task</h2>
              
              {error && (
                <div className="mb-6 p-4 bg-red-50 text-red-600 rounded-xl text-sm font-medium border border-red-100">
                  {error}
                </div>
              )}

              <form onSubmit={handleCreateTask} className="space-y-5">
                <div>
                  <label className="block text-sm font-bold text-slate-700 mb-2">Task Title</label>
                  <input
                    type="text"
                    required
                    className="w-full bg-slate-50 border border-slate-200 rounded-2xl px-4 py-3.5 text-slate-800 focus:ring-2 focus:ring-indigo-500 focus:border-transparent outline-none transition-all"
                    placeholder="e.g. Design homepage layout"
                    value={newTask.title}
                    onChange={(e) => setNewTask({ ...newTask, title: e.target.value })}
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-bold text-slate-700 mb-2">Description (Optional)</label>
                  <textarea
                    rows="3"
                    className="w-full bg-slate-50 border border-slate-200 rounded-2xl px-4 py-3.5 text-slate-800 focus:ring-2 focus:ring-indigo-500 focus:border-transparent outline-none transition-all resize-none"
                    placeholder="Add more details about this task..."
                    value={newTask.description}
                    onChange={(e) => setNewTask({ ...newTask, description: e.target.value })}
                  ></textarea>
                </div>

                <div>
                  <label className="block text-sm font-bold text-slate-700 mb-2">Status</label>
                  <select
                    className="w-full bg-slate-50 border border-slate-200 rounded-2xl px-4 py-3.5 text-slate-800 focus:ring-2 focus:ring-indigo-500 outline-none transition-all font-medium"
                    value={newTask.status}
                    onChange={(e) => setNewTask({ ...newTask, status: e.target.value })}
                  >
                    <option value="TODO">To Do</option>
                    <option value="IN_PROGRESS">In Progress</option>
                    <option value="DONE">Done</option>
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-bold text-slate-700 mb-2">Assign To</label>
                  <select
                    className="w-full bg-slate-50 border border-slate-200 rounded-2xl px-4 py-3.5 text-slate-800 focus:ring-2 focus:ring-indigo-500 outline-none transition-all font-medium"
                    value={newTask.assignedTo}
                    onChange={(e) => setNewTask({ ...newTask, assignedTo: e.target.value })}
                  >
                    <option value="">Unassigned</option>
                    {users.map(u => (
                      <option key={u._id} value={u._id}>{u.name} ({u.email})</option>
                    ))}
                  </select>
                </div>

                <div className="pt-6 flex justify-end gap-3">
                  <button
                    type="button"
                    onClick={() => setIsModalOpen(false)}
                    className="px-6 py-3 rounded-xl font-bold text-slate-500 hover:bg-slate-100 hover:text-slate-800 transition-colors"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="bg-indigo-600 hover:bg-indigo-700 px-6 py-3 rounded-xl font-bold text-white transition-all shadow-lg shadow-indigo-500/20 active:scale-[0.98]"
                  >
                    Save Task
                  </button>
                </div>
              </form>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default ProjectDetail;
