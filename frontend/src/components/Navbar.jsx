import { Link, useNavigate } from "react-router-dom";
import { Sparkles, LayoutDashboard, Folders, LogOut, UserCircle } from "lucide-react";

const Navbar = ({ user, logout }) => {
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate("/login");
  };

  return (
    <nav className="glass-panel sticky top-0 z-50 border-b border-white/60 mx-4 mt-4 rounded-3xl px-2">
      <div className="container mx-auto h-16 flex items-center justify-between">
        <div className="flex items-center gap-8">
          <Link to="/" className="flex items-center gap-2 font-extrabold text-2xl text-slate-800 ml-2">
            <Sparkles className="h-6 w-6 text-indigo-500" />
            <span className="bg-clip-text text-transparent bg-gradient-to-r from-indigo-600 to-pink-500">Flow</span>
          </Link>
          
          <div className="hidden md:flex items-center gap-2">
            <Link to="/" className="text-slate-600 hover:text-indigo-600 hover:bg-indigo-50 transition-all flex items-center gap-2 px-4 py-2 rounded-xl font-medium">
              <LayoutDashboard className="h-4 w-4" />
              Dashboard
            </Link>
            <Link to="/projects" className="text-slate-600 hover:text-indigo-600 hover:bg-indigo-50 transition-all flex items-center gap-2 px-4 py-2 rounded-xl font-medium">
              <Folders className="h-4 w-4" />
              Projects
            </Link>
          </div>
        </div>

        <div className="flex items-center gap-3">
          <div className="flex items-center gap-3 px-4 py-1.5 rounded-full bg-white/60 shadow-sm border border-white/40">
            <UserCircle className="h-5 w-5 text-indigo-500" />
            <span className="text-sm font-bold text-slate-700">{user.name}</span>
            <span className="text-[10px] bg-gradient-to-r from-indigo-100 to-pink-100 text-indigo-700 px-2 py-0.5 rounded-md font-bold uppercase tracking-wider">
              {user.role}
            </span>
          </div>
          
          <button
            onClick={handleLogout}
            className="p-2.5 rounded-full bg-white/60 shadow-sm border border-white/40 text-slate-500 hover:text-red-500 hover:bg-red-50 transition-all"
            title="Logout"
          >
            <LogOut className="h-5 w-5" />
          </button>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
