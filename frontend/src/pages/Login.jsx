import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import API from "../services/api";
import { motion } from "framer-motion";
import { Sparkles, AtSign, KeyRound, ArrowRight } from "lucide-react";

const Login = ({ setUser }) => {
  const [formData, setFormData] = useState({ email: "", password: "" });
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const { data } = await API.post("/auth/login", formData);
      localStorage.setItem("token", data.token);
      localStorage.setItem("user", JSON.stringify(data.user));
      setUser(data.user);
      navigate("/");
    } catch (err) {
      setError(err.response?.data?.message || "Login failed");
    }
  };

  return (
    <div className="flex min-h-screen bg-mesh">
      {/* Left side - Branding */}
      <div className="hidden lg:flex flex-1 flex-col justify-center items-center p-12 relative overflow-hidden">
        <div className="absolute inset-0 bg-pink-600/10 backdrop-blur-3xl"></div>
        <motion.div
          initial={{ opacity: 0, x: -50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8 }}
          className="z-10 max-w-lg text-center"
        >
          <div className="mx-auto mb-8 flex h-24 w-24 items-center justify-center rounded-[2rem] bg-gradient-to-br from-pink-500 to-orange-400 shadow-2xl shadow-orange-500/30">
            <Sparkles className="h-12 w-12 text-white" strokeWidth={1.5} />
          </div>
          <h1 className="text-5xl font-extrabold tracking-tight text-slate-800 mb-6">
            Welcome <span className="gradient-text">Back</span>
          </h1>
          <p className="text-xl text-slate-600 leading-relaxed">
            Log in to pick up right where you left off and accomplish great things today.
          </p>
        </motion.div>
      </div>

      {/* Right side - Form */}
      <div className="flex flex-1 items-center justify-center p-6 sm:p-12">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="w-full max-w-md glass-panel rounded-3xl p-10"
        >
          <div className="mb-10 text-center lg:text-left">
            <h2 className="text-3xl font-bold text-slate-800 mb-2">Sign In</h2>
            <p className="text-slate-500">Access your dashboard and projects.</p>
          </div>

          {error && (
            <div className="mb-6 rounded-xl bg-red-50 p-4 text-sm text-red-600 border border-red-100 flex items-center">
              <span className="font-medium">{error}</span>
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-5">
            <div>
              <label className="block text-sm font-semibold text-slate-700 mb-1.5 ml-1">Email Address</label>
              <div className="relative">
                <AtSign className="absolute left-4 top-1/2 h-5 w-5 -translate-y-1/2 text-pink-400" />
                <input
                  type="email"
                  required
                  className="glass-input block w-full rounded-2xl py-3.5 pl-12 pr-4 text-slate-800 placeholder-slate-400"
                  placeholder="email@gmail.com"
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-semibold text-slate-700 mb-1.5 ml-1">Password</label>
              <div className="relative">
                <KeyRound className="absolute left-4 top-1/2 h-5 w-5 -translate-y-1/2 text-pink-400" />
                <input
                  type="password"
                  required
                  className="glass-input block w-full rounded-2xl py-3.5 pl-12 pr-4 text-slate-800 placeholder-slate-400"
                  placeholder="••••••••"
                  onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                />
              </div>
            </div>

            <button
              type="submit"
              className="mt-6 flex w-full items-center justify-center gap-2 rounded-2xl bg-pink-600 px-4 py-4 font-bold text-white transition-all hover:bg-pink-700 hover:shadow-lg hover:shadow-pink-500/30 focus:outline-none focus:ring-4 focus:ring-pink-500/20 active:scale-[0.98]"
            >
              <span>Sign In</span>
              <ArrowRight className="h-5 w-5" />
            </button>
          </form>

          <p className="mt-8 text-center text-sm font-medium text-slate-500">
            Don't have an account?{" "}
            <Link to="/signup" className="text-pink-600 hover:text-pink-500 hover:underline">
              Create one now
            </Link>
          </p>
        </motion.div>
      </div>
    </div>
  );
};

export default Login;
