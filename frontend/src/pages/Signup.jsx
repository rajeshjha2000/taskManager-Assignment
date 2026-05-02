import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import API from "../services/api";
import { motion } from "framer-motion";
import { Fingerprint, AtSign, KeyRound, ArrowRight } from "lucide-react";

const Signup = ({ setUser }) => {
  const [formData, setFormData] = useState({ name: "", email: "", password: "", role: "MEMBER" });
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await API.post("/auth/signup", formData);
      const loginRes = await API.post("/auth/login", {
        email: formData.email,
        password: formData.password,
      });
      localStorage.setItem("token", loginRes.data.token);
      localStorage.setItem("user", JSON.stringify(loginRes.data.user));
      setUser(loginRes.data.user);
      navigate("/");
    } catch (err) {
      setError(err.response?.data?.message || "Signup failed");
    }
  };

  return (
    <div className="flex min-h-screen bg-mesh">
      {/* Left side - Branding */}
      <div className="hidden lg:flex flex-1 flex-col justify-center items-center p-12 relative overflow-hidden">
        <div className="absolute inset-0 bg-indigo-600/10 backdrop-blur-3xl"></div>
        <motion.div
          initial={{ opacity: 0, x: -50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8 }}
          className="z-10 max-w-lg text-center"
        >
          <div className="mx-auto mb-8 flex h-24 w-24 items-center justify-center rounded-[2rem] bg-gradient-to-br from-indigo-500 to-pink-500 shadow-2xl shadow-pink-500/30">
            <Fingerprint className="h-12 w-12 text-white" strokeWidth={1.5} />
          </div>
          <h1 className="text-5xl font-extrabold tracking-tight text-slate-800 mb-6">
            Join the <span className="gradient-text">Future</span> of Tracking
          </h1>
          <p className="text-xl text-slate-600 leading-relaxed">
            Experience a beautiful, seamless, and powerful way to manage your tasks and projects.
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
            <h2 className="text-3xl font-bold text-slate-800 mb-2">Create Account</h2>
            <p className="text-slate-500">Get started with your free account today.</p>
          </div>

          {error && (
            <div className="mb-6 rounded-xl bg-red-50 p-4 text-sm text-red-600 border border-red-100 flex items-center">
              <span className="font-medium">{error}</span>
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-5">
            <div>
              <label className="block text-sm font-semibold text-slate-700 mb-1.5 ml-1">Full Name</label>
              <div className="relative">
                <AtSign className="absolute left-4 top-1/2 h-5 w-5 -translate-y-1/2 text-indigo-400" />
                <input
                  type="text"
                  required
                  className="glass-input block w-full rounded-2xl py-3.5 pl-12 pr-4 text-slate-800 placeholder-slate-400"
                  placeholder="Rajesh Jha"
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-semibold text-slate-700 mb-1.5 ml-1">Email Address</label>
              <div className="relative">
                <AtSign className="absolute left-4 top-1/2 h-5 w-5 -translate-y-1/2 text-indigo-400" />
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
                <KeyRound className="absolute left-4 top-1/2 h-5 w-5 -translate-y-1/2 text-indigo-400" />
                <input
                  type="password"
                  required
                  className="glass-input block w-full rounded-2xl py-3.5 pl-12 pr-4 text-slate-800 placeholder-slate-400"
                  placeholder="••••••••"
                  onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-semibold text-slate-700 mb-1.5 ml-1">Role</label>
              <select
                className="glass-input block w-full rounded-2xl py-3.5 px-4 text-slate-800 appearance-none bg-white/50"
                onChange={(e) => setFormData({ ...formData, role: e.target.value })}
              >
                <option value="MEMBER">Member</option>
                <option value="ADMIN">Admin</option>
              </select>
            </div>

            <button
              type="submit"
              className="mt-6 flex w-full items-center justify-center gap-2 rounded-2xl bg-indigo-600 px-4 py-4 font-bold text-white transition-all hover:bg-indigo-700 hover:shadow-lg hover:shadow-indigo-500/30 focus:outline-none focus:ring-4 focus:ring-indigo-500/20 active:scale-[0.98]"
            >
              <span>Create Account</span>
              <ArrowRight className="h-5 w-5" />
            </button>
          </form>

          <p className="mt-8 text-center text-sm font-medium text-slate-500">
            Already have an account?{" "}
            <Link to="/login" className="text-indigo-600 hover:text-indigo-500 hover:underline">
              Sign in here
            </Link>
          </p>
        </motion.div>
      </div>
    </div>
  );
};

export default Signup;
