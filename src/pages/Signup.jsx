import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import {
  Mail,
  Lock,
  Eye,
  EyeOff,
  BrainCircuit,
  CalendarCheck,
  Sparkles,
} from "lucide-react";

import api from "../services/api";
import AnimatedBackground from "../components/AnimatedBackground";

export default function Signup() {
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const [showPassword, setShowPassword] = useState(false);

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleSignup = async (e) => {
    e.preventDefault();

    setError("");
    setLoading(true);

    try {
      await api.post("/auth/signup", {
        email,
        password,
      });

      navigate("/login");
    } catch (err) {
      setError("Registration failed. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <AnimatedBackground />

      <div className="relative min-h-screen flex items-center justify-center px-6 py-10">

        <div className="w-full max-w-6xl grid lg:grid-cols-2 rounded-3xl overflow-hidden border border-slate-800 bg-slate-900/70 backdrop-blur-xl shadow-2xl">

          {/* LEFT PANEL */}

          <div className="hidden lg:flex flex-col justify-between p-14 bg-gradient-to-br from-indigo-950 via-slate-900 to-purple-950">

            <div>

              <div className="flex items-center gap-3 mb-10">

                <div className="bg-indigo-600 p-3 rounded-2xl">
                  <BrainCircuit className="w-8 h-8 text-white" />
                </div>

                <div>

                  <h1 className="text-4xl font-bold text-white">
                    Mentor Mind
                  </h1>

                  <p className="text-slate-400 mt-1">
                    AI Powered Study Planner
                  </p>

                </div>

              </div>

              <h2 className="text-4xl font-bold leading-tight text-white mb-5">

                Build better
                <br />
                study habits.

              </h2>

              <p className="text-slate-400 leading-8 text-lg">

                Join Mentor Mind and let AI organize your
                preparation with personalized schedules,
                smart prioritization, revision reminders,
                and productivity insights.

              </p>

            </div>

            <div className="space-y-6">

              <div className="flex items-start gap-4">

                <div className="bg-indigo-600/20 p-3 rounded-xl">
                  <Sparkles className="text-indigo-400 w-6 h-6" />
                </div>

                <div>

                  <h3 className="text-white font-semibold">
                    Personalized AI Plans
                  </h3>

                  <p className="text-slate-400 text-sm mt-1">
                    Smart study plans customized according
                    to your exams and availability.
                  </p>

                </div>

              </div>

              <div className="flex items-start gap-4">

                <div className="bg-emerald-600/20 p-3 rounded-xl">
                  <CalendarCheck className="text-emerald-400 w-6 h-6" />
                </div>

                <div>

                  <h3 className="text-white font-semibold">
                    Daily Progress Tracking
                  </h3>

                  <p className="text-slate-400 text-sm mt-1">
                    Stay consistent with revision,
                    mock tests and daily goals.
                  </p>

                </div>

              </div>

            </div>

          </div>

          {/* RIGHT PANEL */}

          <div className="flex items-center justify-center p-8 md:p-12">

            <div className="w-full max-w-md">

              <div className="text-center mb-10">

                <h2 className="text-4xl font-bold bg-gradient-to-r from-indigo-400 to-purple-400 bg-clip-text text-transparent">

                  Create Account

                </h2>

                <p className="text-slate-400 mt-3">
                  Start your AI-powered study journey today.
                </p>

              </div>

              {error && (

                <div className="mb-6 rounded-xl border border-red-500/40 bg-red-500/10 p-4">

                  <p className="text-red-300 text-sm">
                    {error}
                  </p>

                </div>

              )}

              <form
                onSubmit={handleSignup}
                className="space-y-6"
              >

                {/* Email */}

                <div>

                  <label className="block text-slate-300 text-sm mb-2">
                    Email Address
                  </label>

                  <div className="relative">

                    <Mail
                      className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-500"
                      size={20}
                    />

                    <input
                      type="email"
                      placeholder="Enter your email"
                      value={email}
                      onChange={(e) =>
                        setEmail(e.target.value)
                      }
                      required
                      className="w-full bg-slate-800 border border-slate-700 rounded-xl py-3 pl-12 pr-4 text-white focus:outline-none focus:ring-2 focus:ring-indigo-500"
                    />

                  </div>

                </div>

                {/* Password */}

                <div>

                  <label className="block text-slate-300 text-sm mb-2">
                    Password
                  </label>

                  <div className="relative">

                    <Lock
                      className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-500"
                      size={20}
                    />

                    <input
                      type={showPassword ? "text" : "password"}
                      placeholder="Create a password"
                      value={password}
                      onChange={(e) =>
                        setPassword(e.target.value)
                      }
                      required
                      className="w-full bg-slate-800 border border-slate-700 rounded-xl py-3 pl-12 pr-14 text-white focus:outline-none focus:ring-2 focus:ring-indigo-500"
                    />
                                        <button
                      type="button"
                      onClick={() =>
                        setShowPassword(!showPassword)
                      }
                      className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-400 hover:text-white transition"
                    >
                      {showPassword ? (
                        <EyeOff size={20} />
                      ) : (
                        <Eye size={20} />
                      )}
                    </button>

                  </div>

                </div>

                {/* Password Requirement */}

                <div className="rounded-xl bg-slate-800/60 border border-slate-700 p-4">

                  <p className="text-xs text-slate-400 mb-2 font-medium">
                    Password should:
                  </p>

                  <ul className="space-y-1 text-xs text-slate-500">

                    <li>• Be at least 6 characters long</li>
                    <li>• Be easy for you to remember</li>
                    <li>• Avoid sharing it with anyone</li>

                  </ul>

                </div>

                {/* Register Button */}

                <button
                  type="submit"
                  disabled={loading}
                  className={`w-full rounded-xl py-3 font-semibold transition-all duration-300 flex items-center justify-center gap-3 ${
                    loading
                      ? "bg-slate-700 cursor-not-allowed"
                      : "bg-gradient-to-r from-indigo-600 to-purple-600 hover:scale-[1.02] hover:shadow-xl hover:shadow-indigo-500/30"
                  }`}
                >

                  {loading ? (
                    <>
                      <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                      Creating Account...
                    </>
                  ) : (
                    "Create Account"
                  )}

                </button>

              </form>

              {/* Divider */}

              <div className="flex items-center my-8">

                <div className="flex-1 h-px bg-slate-700"></div>

                <span className="px-4 text-slate-500 text-sm">
                  OR
                </span>

                <div className="flex-1 h-px bg-slate-700"></div>

              </div>

              {/* Login */}

              <p className="text-center text-slate-400">

                Already have an account?{" "}

                <Link
                  to="/login"
                  className="font-semibold text-indigo-400 hover:text-indigo-300 transition"
                >
                  Sign In
                </Link>

              </p>

            </div>

          </div>

        </div>

      </div>

    </>
  );
}