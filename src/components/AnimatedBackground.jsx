export default function AnimatedBackground() {
  return (
    <div className="fixed inset-0 -z-10 overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-br from-indigo-950 via-slate-950 to-purple-950 bg-[length:200%_200%] animate-gradient" />

      <div className="absolute top-[-10%] left-[-10%] w-96 h-96 bg-indigo-600/20 rounded-full blur-3xl animate-float-slow" />
      <div className="absolute bottom-[-15%] right-[-10%] w-96 h-96 bg-purple-600/20 rounded-full blur-3xl animate-float-fast" />
    </div>
  );
}
