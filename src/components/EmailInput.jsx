import { Mail } from "lucide-react";

export default function EmailInput({ value, onChange, placeholder = "Enter your email" }) {
  return (
    <div className="relative">
      <Mail className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-500" size={20} />
      <input
        type="email"
        placeholder={placeholder}
        value={value}
        onChange={onChange}
        required
        className="w-full bg-slate-800 border border-slate-700 rounded-xl py-3 pl-12 pr-4 text-white focus:outline-none focus:ring-2 focus:ring-indigo-500"
      />
    </div>
  );
}