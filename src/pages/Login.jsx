import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import api from "../services/api";
import AnimatedBackground from "../components/AnimatedBackground";

export default function Login() {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleLogin = async (e) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    try {
      const res = await api.post("/auth/login", {
        email,
        password,
      });

      localStorage.setItem("token", res.data.token);
      localStorage.setItem("userEmail", email);
      navigate("/dashboard");
    } catch (err) {
      setError("Invalid email or password");
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      {/* Animated Background */}
      <AnimatedBackground />

      {/* Login Card */}
      <div className="min-h-screen flex items-center justify-center relative z-10">
        <div className="w-full max-w-md bg-slate-900/90 backdrop-blur border border-slate-800 rounded-xl p-8 shadow-xl">
          <h2 className="text-2xl font-semibold text-center text-indigo-400 mb-6">
            Mentor Mind
          </h2>

          <form onSubmit={handleLogin} className="space-y-4">
            <input
              type="email"
              placeholder="Email"
              className="w-full bg-slate-800 border border-slate-700 text-slate-100 rounded px-4 py-2 focus:outline-none focus:border-indigo-500"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />

            <input
              type="password"
              placeholder="Password"
              className="w-full bg-slate-800 border border-slate-700 text-slate-100 rounded px-4 py-2 focus:outline-none focus:border-indigo-500"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />

            {error && (
              <p className="text-sm text-red-400">{error}</p>
            )}

            <button
              disabled={loading}
              className={`w-full py-2 rounded font-medium transition ${
                loading
                  ? "bg-slate-700 text-slate-400 cursor-not-allowed"
                  : "bg-emerald-600 hover:bg-emerald-700 text-white"
              }`}
            >
              {loading ? "Signing in..." : "Login"}
            </button>
          </form>

          <p className="text-sm text-slate-400 text-center mt-6">
            New user??{" "}
            <Link
              to="/register"
              className="text-indigo-400 hover:text-indigo-300 font-medium"
            >
              Register
            </Link>
          </p>
        </div>
      </div>
    </>
  );
}
