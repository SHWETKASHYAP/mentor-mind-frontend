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
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  if (!plans.length) {
    return (
      <div className="bg-slate-900 border border-slate-800 rounded-xl p-6 w-8/12 mx-auto">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-xl font-semibold text-purple-400">
            AI Study Planner
          </h2>

          <button
            onClick={generatePlan}
            disabled={loading}
            className="bg-purple-600 hover:bg-purple-700 px-4 py-2 rounded text-white"
          >
            {loading ? "Generating..." : "Generate Plan"}
          </button>
        </div>

        <p className="text-slate-400">
          No study plan generated yet.
        </p>
      </div>
    );
  }

  const latestPlan = plans[0];

  return (
    <div className="w-10/12 mx-auto space-y-8">

      {/* Header */}

      <div className="bg-slate-900 rounded-xl border border-slate-800 p-6">

        <div className="flex justify-between items-center">

          <div>
            <h2 className="text-2xl font-bold text-purple-400">
              AI Study Planner
            </h2>

            <p className="text-slate-400 mt-2">
              {latestPlan.summary}
            </p>
          </div>

          <button
            onClick={generatePlan}
            disabled={loading}
            className="bg-purple-600 hover:bg-purple-700 px-5 py-2 rounded text-white"
          >
            {loading ? "Generating..." : "Regenerate"}
          </button>

        </div>

      </div>

      {/* Overall Tips */}

      {latestPlan.overallTips && (

        <div className="bg-slate-900 rounded-xl border border-slate-800 p-6">

          <h3 className="text-lg font-semibold text-yellow-400 mb-4">
            💡 Overall Tips
          </h3>

          <ul className="space-y-2">

            {latestPlan.overallTips.map((tip, index) => (

              <li
                key={index}
                className="text-slate-300"
              >
                • {tip}
              </li>

            ))}

          </ul>

        </div>

      )}

      {/* Days */}

      {latestPlan.plan.map((day, index) => (

        <div
          key={index}
          className="bg-slate-900 border border-slate-800 rounded-xl overflow-hidden"
        >

          {/* Day Header */}

          <div className="bg-slate-800 p-5 flex justify-between items-center">

            <div>

              <h3 className="text-xl font-semibold text-indigo-400">
                📅 {day.day} • {day.date}
              </h3>

              <p className="text-sm text-slate-400 mt-1">
                ⏱ {day.totalHours} Hours Planned
              </p>

            </div>

            <div className="text-right">

              <p className="text-yellow-300 italic">
                "{day.motivation}"
              </p>

            </div>

          </div>

          {/* Sessions */}

          <div className="p-6">

            <h4 className="text-purple-400 font-semibold mb-4">
              📚 Study Sessions
            </h4>

            <div className="space-y-4">

              {day.sessions.map((session, i) => (

                <div
                  key={i}
                  className="bg-slate-800 rounded-lg p-5 border border-slate-700"
                >

                  <div className="flex justify-between">

                    <h5 className="text-lg text-white font-semibold">
                      {session.subject}
                    </h5>

                    <span className="text-emerald-400">
                      {session.hours} hrs
                    </span>

                  </div>

                  <div className="grid grid-cols-2 gap-4 mt-4 text-sm">

                    <div>
                      <span className="text-slate-500">
                        Topic
                      </span>

                      <p className="text-slate-200">
                        {session.topic}
                      </p>
                    </div>

                    <div>
                      <span className="text-slate-500">
                        Goal
                      </span>

                      <p className="text-slate-200">
                        {session.goal}
                      </p>
                    </div>

                    <div>
                      <span className="text-slate-500">
                        Focus
                      </span>

                      <p className="text-slate-200">
                        {session.focus}
                      </p>
                    </div>

                    <div>
                      <span className="text-slate-500">
                        Break
                      </span>

                      <p className="text-slate-200">
                        {session.breakAfter}
                      </p>
                    </div>

                  </div>

                  <div className="mt-4">

                    <span
                      className={`px-3 py-1 rounded-full text-xs ${
                        session.priority === "High"
                          ? "bg-red-600"
                          : session.priority === "Medium"
                          ? "bg-yellow-600"
                          : "bg-green-600"
                      }`}
                    >
                      {session.priority} Priority
                    </span>

                  </div>

                </div>

              ))}

            </div>

            {/* Revision */}

            {day.revision?.length > 0 && (

              <div className="mt-8">

                <h4 className="text-indigo-400 font-semibold mb-3">
                  🔁 Revision
                </h4>

                <ul className="space-y-2">

                  {day.revision.map((r, i) => (

                    <li
                      key={i}
                      className="text-slate-300"
                    >
                      ✓ {r}
                    </li>

                  ))}

                </ul>

              </div>

            )}

            {/* Tasks */}

            {day.tasks?.length > 0 && (

              <div className="mt-8">

                <h4 className="text-emerald-400 font-semibold mb-3">
                  ✅ Daily Tasks
                </h4>

                <div className="space-y-2">

                  {day.tasks.map((task, i) => (

                    <label
                      key={i}
                      className="flex items-center gap-3 text-slate-300"
                    >
                      <input
                        type="checkbox"
                        className="accent-purple-500"
                      />

                      {task}

                    </label>

                  ))}

                </div>

              </div>

            )}

          </div>

        </div>

      ))}

    </div>
  );
}