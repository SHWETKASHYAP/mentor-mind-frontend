import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { CalendarCheck, Sparkles } from "lucide-react";

import api from "../services/api";
import AuthLayout from "../components/AuthLayout";
import EmailInput from "../components/EmailInput";
import PasswordInput from "../components/PasswordInput";
import SubmitButton from "../components/SubmitButton";
import GoogleAuthButton from "../components/GoogleAuthButton";

const features = [
  {
    icon: Sparkles,
    iconBg: "bg-indigo-600/20",
    iconColor: "text-indigo-400",
    title: "Personalized AI Plans",
    description: "Dynamic study schedules based on difficulty, availability and exam dates.",
  },
  {
    icon: CalendarCheck,
    iconBg: "bg-emerald-600/20",
    iconColor: "text-emerald-400",
    title: "Balanced Scheduling",
    description: "Daily workload balancing with revision, breaks and mock tests.",
  },
];

export default function Login() {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleLogin = async (e) => {
    e.preventDefault();
    setError("");
    setLoading(true);
    try {
      const res = await api.post("/auth/login", { email, password });
      localStorage.setItem("token", res.data.token);
      localStorage.setItem("userEmail", email);
      navigate("/dashboard");
    } catch (err) {
      setError("Invalid email or password.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <AuthLayout
      heading={<>Study smarter,<br />not harder.</>}
      description="Generate intelligent day-wise study plans, prioritize upcoming exams, organize revision sessions, and stay consistent with AI-guided learning."
      features={features}
      formTitle="Welcome Back"
      formSubtitle="Sign in to continue your learning journey."
      error={error}
      googleButton={<GoogleAuthButton setError={setError} />}
      footer={
        <p className="text-center text-slate-400">
          Don't have an account?{" "}
          <Link to="/register" className="font-semibold text-indigo-400 hover:text-indigo-300 transition">
            Create one
          </Link>
        </p>
      }
    >
      <form onSubmit={handleLogin} className="space-y-6">
        <div>
          <label className="block text-slate-300 text-sm mb-2">Email Address</label>
          <EmailInput value={email} onChange={(e) => setEmail(e.target.value)} />
        </div>

        <div>
          <label className="block text-slate-300 text-sm mb-2">Password</label>
          <PasswordInput value={password} onChange={(e) => setPassword(e.target.value)} />
        </div>

        <div className="flex items-center justify-between text-sm">
          <label className="flex items-center gap-2 text-slate-400 cursor-pointer">
            <input type="checkbox" className="accent-indigo-600" />
            Remember me
          </label>
          <button type="button" className="text-indigo-400 hover:text-indigo-300 transition">
            Forgot Password?
          </button>
        </div>

        <SubmitButton loading={loading} loadingText="Signing In...">
          Login
        </SubmitButton>
      </form>
    </AuthLayout>
  );
}