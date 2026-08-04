import { BrainCircuit } from "lucide-react";
import AnimatedBackground from "./AnimatedBackground";

export default function AuthLayout({
  heading,
  description,
  features,
  formTitle,
  formSubtitle,
  error,
  children,
  googleButton,
  footer,
}) {
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
                  <h1 className="text-4xl font-bold text-white">Mentor Mind</h1>
                  <p className="text-slate-400 mt-1">
                    Personalized AI Exam Preparation Assistant
                  </p>
                </div>
              </div>

              <h2 className="text-4xl font-bold leading-tight text-white mb-5">
                {heading}
              </h2>

              <p className="text-slate-400 leading-8 text-lg">{description}</p>
            </div>

            <div className="space-y-6">
              {features.map((f, i) => (
                <div className="flex items-start gap-4" key={i}>
                  <div className={`${f.iconBg} p-3 rounded-xl`}>
                    <f.icon className={`${f.iconColor} w-6 h-6`} />
                  </div>
                  <div>
                    <h3 className="text-white font-semibold">{f.title}</h3>
                    <p className="text-slate-400 text-sm mt-1">{f.description}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* RIGHT PANEL */}
          <div className="flex items-center justify-center p-8 md:p-12">
            <div className="w-full max-w-md">
              <div className="text-center mb-10">
                <h2 className="text-4xl font-bold bg-gradient-to-r from-indigo-400 to-purple-400 bg-clip-text text-transparent">
                  {formTitle}
                </h2>
                <p className="text-slate-400 mt-3">{formSubtitle}</p>
              </div>

              {error && (
                <div className="mb-6 rounded-xl border border-red-500/40 bg-red-500/10 p-4">
                  <p className="text-red-300 text-sm">{error}</p>
                </div>
              )}

              {children}

              <div className="flex items-center my-8">
                <div className="flex-1 h-px bg-slate-700"></div>
                <span className="px-4 text-slate-500 text-sm">OR</span>
                <div className="flex-1 h-px bg-slate-700"></div>
              </div>

              {googleButton}

              {footer}
            </div>
          </div>
        </div>
      </div>
    </>
  );
}