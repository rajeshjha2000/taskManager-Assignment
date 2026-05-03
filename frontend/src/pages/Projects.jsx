import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import API from "../services/api";
import { motion, AnimatePresence } from "framer-motion";
import { Plus, Compass, UsersRound, X } from "lucide-react";

const Projects = () => {
  const [projects, setProjects] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [loading, setLoading] = useState(true);
  const [newProject, setNewProject] = useState({ name: "", description: "" });
  const [error, setError] = useState("");
  
  const user = JSON.parse(localStorage.getItem("user") || "{}");
  const isAdmin = user?.role === "ADMIN";

  const fetchProjects = async () => {
    try {
      const { data } = await API.get("/projects");
      setProjects(data);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProjects();
  }, []);

  const handleCreateProject = async (e) => {
    e.preventDefault();
    try {
      await API.post("/projects", newProject);
      setIsModalOpen(false);
      setNewProject({ name: "", description: "" });
      fetchProjects();
    } catch (err) {
      setError(err.response?.data?.message || "Failed to create project");
    }
  };

  return (
    <div className="p-4 max-w-7xl mx-auto space-y-8">
      <header className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-4xl font-extrabold text-slate-800">Projects</h1>
          <p className="text-slate-500 mt-2 font-medium">Manage your team's ongoing initiatives.</p>
        </div>
        {isAdmin && (
          <button
            onClick={() => setIsModalOpen(true)}
            className="inline-flex items-center gap-2 bg-gradient-to-r from-indigo-600 to-pink-500 hover:opacity-90 px-6 py-3 rounded-2xl font-bold text-white shadow-xl shadow-pink-500/20 transition-all hover:-translate-y-1 cursor-pointer"
          >
            <Plus className="h-5 w-5" />
            Create Project
          </button>
        )}
      </header>

      {loading ? (
        <div className="flex justify-center py-20">
          <div className="animate-spin rounded-full h-12 w-12 border-t-4 border-indigo-500 border-r-transparent"></div>
        </div>
      ) : projects.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          <AnimatePresence>
            {projects.map((project) => (
              <motion.div
                key={project._id}
                layout
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                whileHover={{ y: -5 }}
                className="group glass-panel rounded-3xl overflow-hidden hover:border-indigo-400 transition-all shadow-xl block"
              >
                <div className="p-6 h-full flex flex-col">
                  <div className="flex items-start justify-between mb-4">
                    <div className="h-12 w-12 rounded-2xl bg-indigo-100 flex items-center justify-center text-indigo-600 shadow-inner">
                      <Compass className="h-6 w-6" />
                    </div>
                    <span className="text-xs font-bold text-indigo-600 bg-indigo-50 px-3 py-1 rounded-xl">
                      {new Date(project.createdAt).toLocaleDateString()}
                    </span>
                  </div>
                  
                  <h3 className="text-xl font-bold text-slate-800 mb-2 group-hover:text-indigo-600 transition-colors">
                    {project.name}
                  </h3>
                  <p className="text-slate-500 text-sm line-clamp-2 mb-6 flex-grow font-medium">
                    {project.description || "No description provided."}
                  </p>

                  <div className="flex items-center justify-between pt-4 border-t border-slate-200 mt-auto">
                    <div className="flex items-center gap-2 text-sm text-slate-500 font-bold">
                      <UsersRound className="h-4 w-4" />
                      <span>{project.owner?.name || "Unknown"}</span>
                    </div>
                    <Link
                      to={`/projects/${project._id}`}
                      className="text-indigo-600 text-sm font-bold hover:text-indigo-500 transition-colors flex items-center gap-1"
                    >
                      View Board &rarr;
                    </Link>
                  </div>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </div>
      ) : (
        <div className="text-center py-20 glass-panel rounded-3xl border border-dashed border-indigo-200">
          <div className="mx-auto h-20 w-20 bg-indigo-50 rounded-full flex items-center justify-center mb-4">
            <Compass className="h-10 w-10 text-indigo-400" />
          </div>
          <h3 className="text-2xl font-bold text-slate-800 mb-2">No projects yet</h3>
          <p className="text-slate-500 font-medium mb-6">Get started by creating your first project.</p>
          {isAdmin && (
            <button
              onClick={() => setIsModalOpen(true)}
              className="inline-flex items-center gap-2 bg-white text-indigo-600 hover:bg-indigo-50 px-6 py-3 rounded-xl font-bold transition-all border border-indigo-100 shadow-sm cursor-pointer"
            >
              <Plus className="h-5 w-5" />
              Create Project
            </button>
          )}
        </div>
      )}

      {/* Create Project Modal */}
      <AnimatePresence>
        {isModalOpen && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/40 backdrop-blur-md">
            <motion.div
              initial={{ opacity: 0, y: 20, scale: 0.95 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              className="bg-white/90 backdrop-blur-xl rounded-3xl border border-white p-8 w-full max-w-md shadow-2xl relative"
            >
              <button
                onClick={() => setIsModalOpen(false)}
                className="absolute top-6 right-6 p-2 text-slate-400 hover:text-slate-800 rounded-full hover:bg-slate-100 transition-colors cursor-pointer"
              >
                <X className="h-5 w-5" />
              </button>
              
              <h2 className="text-3xl font-extrabold text-slate-800 mb-6">New Project</h2>
              
              {error && (
                <div className="mb-6 p-4 bg-red-50 text-red-600 rounded-xl text-sm font-medium border border-red-100">
                  {error}
                </div>
              )}

              <form onSubmit={handleCreateProject} className="space-y-5">
                <div>
                  <label className="block text-sm font-bold text-slate-700 mb-2">Project Name</label>
                  <input
                    type="text"
                    required
                    className="w-full bg-slate-50 border border-slate-200 rounded-2xl px-4 py-3.5 text-slate-800 focus:ring-2 focus:ring-indigo-500 focus:border-transparent outline-none transition-all"
                    placeholder="e.g. Website Redesign"
                    value={newProject.name}
                    onChange={(e) => setNewProject({ ...newProject, name: e.target.value })}
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-bold text-slate-700 mb-2">Description (Optional)</label>
                  <textarea
                    rows="3"
                    className="w-full bg-slate-50 border border-slate-200 rounded-2xl px-4 py-3.5 text-slate-800 focus:ring-2 focus:ring-indigo-500 focus:border-transparent outline-none transition-all resize-none"
                    placeholder="What is this project about?"
                    value={newProject.description}
                    onChange={(e) => setNewProject({ ...newProject, description: e.target.value })}
                  ></textarea>
                </div>

                <div className="pt-6 flex justify-end gap-3">
                  <button
                    type="button"
                    onClick={() => setIsModalOpen(false)}
                    className="px-6 py-3 rounded-xl font-bold text-slate-500 hover:bg-slate-100 hover:text-slate-800 transition-colors cursor-pointer"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="bg-indigo-600 hover:bg-indigo-700 px-6 py-3 rounded-xl font-bold text-white transition-all shadow-lg shadow-indigo-500/20 cursor-pointer active:scale-[0.98]"
                  >
                    Create Project
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

export default Projects;
