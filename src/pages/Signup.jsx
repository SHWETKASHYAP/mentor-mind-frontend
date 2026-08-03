import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { CalendarCheck, Sparkles } from "lucide-react";

import api from "../services/api";
import AuthLayout from "../components/AuthLayout";
import EmailInput from "../components/EmailInput";
import PasswordInput from "../components/PasswordInput";
import SubmitButton from "../components/SubmitButton";

const features = [
  {
    icon: Sparkles,
    iconBg: "bg-indigo-600/20",
    iconColor: "text-indigo-400",
    title: "Personalized AI Plans",
    description: "Smart study plans customized according to your exams and availability.",
  },
  {
    icon: CalendarCheck,
    iconBg: "bg-emerald-600/20",
    iconColor: "text-emerald-400",
    title: "Daily Progress Tracking",
    description: "Stay consistent with revision, mock tests and daily goals.",
  },
];

export default function Signup() {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleSignup = async (e) => {
    e.preventDefault();
    setError("");
    setLoading(true);
    try {
      await api.post("/auth/signup", { email, password });
      navigate("/login");
    } catch (err) {
      setError("Registration failed. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <AuthLayout
      heading={<>Build better<br />study habits.</>}
      description="Join Mentor Mind and let AI organize your preparation with personalized schedules, smart prioritization, revision reminders, and productivity insights."
      features={features}
      formTitle="Create Account"
      formSubtitle="Start your AI-powered study journey today."
      error={error}
      footer={
        <p className="text-center text-slate-400">
          Already have an account?{" "}
          <Link to="/login" className="font-semibold text-indigo-400 hover:text-indigo-300 transition">
            Sign In
          </Link>
        </p>
      }
    >
      <form onSubmit={handleSignup} className="space-y-6">
        <div>
          <label className="block text-slate-300 text-sm mb-2">Email Address</label>
          <EmailInput value={email} onChange={(e) => setEmail(e.target.value)} />
        </div>

        <div>
          <label className="block text-slate-300 text-sm mb-2">Password</label>
          <PasswordInput
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Create a password"
          />
        </div>

        <div className="rounded-xl bg-slate-800/60 border border-slate-700 p-4">
          <p className="text-xs text-slate-400 mb-2 font-medium">Password should:</p>
          <ul className="space-y-1 text-xs text-slate-500">
            <li>• Be at least 6 characters long</li>
            <li>• Be easy for you to remember</li>
            <li>• Avoid sharing it with anyone</li>
          </ul>
        </div>

        <SubmitButton loading={loading} loadingText="Creating Account...">
          Create Account
        </SubmitButton>
      </form>
    </AuthLayout>
  );
}