import { useEffect, useState } from "react";
import api from "../services/api";
import { fetchPlans } from "../services/planApi";

export default function StudyPlanView({ subjectsCount }) {
  const [plans, setPlans] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    fetchPlans().then(setPlans);
  }, []);

  const generatePlan = async () => {
    if (subjectsCount === 0) {
    alert("Please add at least one subject before generating a study plan.");
    setPlans([]);
    return;
  }

    try {
      setLoading(true);
      await api.post("/ai/study-plan");
      const updatedPlans = await fetchPlans();
      setPlans(updatedPlans);
    } catch(err){
      console.error("Plan generation failed", err);
    }
    finally {
      setLoading(false);
    }
  };

  const today = new Date().toISOString().split("T")[0];

  /* ================= EMPTY STATE ================= */
  if (!plans.length) {
    return (
      <div className="bg-slate-900 border border-slate-800 rounded-xl p-6 w-6/12 ml-72">
        <div className="flex justify-between items-center mb-6">
          <h3 className="text-lg font-semibold text-purple-400">
            AI Study Plan
          </h3>

          <button
            onClick={generatePlan}
            disabled={loading}
            className={`px-4 py-2 rounded text-sm transition ${
              loading
                ? "bg-slate-700 text-slate-400 cursor-not-allowed"
                : "bg-purple-600 hover:bg-purple-700 text-white"
            }`}
          >
            {loading ? "Generating..." : "Generate Plan"}
          </button>
        </div>

        {loading && (
          <p className="text-sm text-slate-400 mb-4">
            Generating your AI study plan...
          </p>
        )}

        <p className="text-sm text-slate-400">
          No study plan generated yet. Click{" "}
          <span className="text-purple-400">Generate Plan</span>{" "}
          to let AI create one for you.
        </p>
      </div>
    );
  }

  /* ================= PLAN VIEW ================= */
  const latestPlan = plans[0];

  return (
    <div className="bg-slate-900 border border-slate-800 rounded-xl p-6 w-6/12 ml-72">
      <div className="flex justify-between items-center mb-6">
        <h3 className="text-lg font-semibold text-purple-400">
          AI Study Plan
        </h3>

        <button
          onClick={generatePlan}
          disabled={loading}
          className={`px-4 py-2 rounded text-sm transition ${
            loading
              ? "bg-slate-700 text-slate-400 cursor-not-allowed"
              : "bg-purple-600 hover:bg-purple-700 text-white"
          }`}
        >
          {loading ? "Generating..." : "Regenerate Plan"}
        </button>
      </div>

      {loading && (
        <p className="text-sm text-slate-400 mb-4">
          Regenerating your AI study plan...
        </p>
      )}

      <div className="space-y-6">
        {latestPlan.plan.map((day, i) => (
          <div
            key={i}
            className={`rounded-lg p-4 border ${
              day.date === today
                ? "bg-indigo-900/40 border-indigo-500"
                : "bg-slate-800 border-slate-700"
            }`}
          >
            <h4 className="text-indigo-300 font-semibold mb-3">
              {day.date}
              {day.date === today && (
                <span className="ml-2 text-xs text-indigo-400">
                  (Today)
                </span>
              )}
            </h4>

            <div className="space-y-2">
              {day.sessions.map((s, j) => (
                <div
                  key={j}
                  className="flex justify-between items-center text-sm bg-slate-900 rounded px-3 py-2"
                >
                  <span className="text-slate-100">
                    {s.subject}
                  </span>

                  <span className="text-slate-400">
                    {s.hours}h
                  </span>

                  <span className="text-slate-500 text-xs">
                    {s.focus}
                  </span>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
