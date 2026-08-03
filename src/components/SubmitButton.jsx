export default function SubmitButton({ loading, loadingText, children }) {
  return (
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
          {loadingText}
        </>
      ) : (
        children
      )}
    </button>
  );
}