export default function DashboardLayout({ children }) {
  return (
    <div className="min-h-screen backdrop-blur-sm relative">

      {/* Top Navbar */}
      <header className="border-b border-slate-800 bg-slate-900">
        <div className="max-w-7xl mx-auto px-6 py-4 flex justify-between items-center">
          <h1 className="text-xl font-semibold text-indigo-400">
            MentorMind AI
          </h1>

          <span className="text-sm text-slate-400">
            AI Study Planner
          </span>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-6 py-8">
        {children}
      </main>
    </div>
  );
}
