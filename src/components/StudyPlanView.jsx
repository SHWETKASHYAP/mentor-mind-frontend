import { useEffect, useMemo, useState } from "react";
import api from "../services/api";
import { fetchPlans } from "../services/planApi";

export default function StudyPlanView({ subjectsCount }) {
  const [plans, setPlans] = useState([]);
  const [loading, setLoading] = useState(false);

  // Accordion
  const [expandedDay, setExpandedDay] = useState(0);

  useEffect(() => {
    loadPlans();
  }, []);

  const loadPlans = async () => {
    try {
      const data = await fetchPlans();
      setPlans(data);
    } catch (err) {
      console.error(err);
    }
  };

  const generatePlan = async () => {
    if (subjectsCount === 0) {
      alert(
        "Please add at least one subject before generating a study plan."
      );
      setPlans([]);
      return;
    }

    try {
      setLoading(true);

      await api.post("/ai/study-plan");

      await loadPlans();

      setExpandedDay(0);
    } catch (err) {
      console.error("Generation failed", err);
    } finally {
      setLoading(false);
    }
  };

  /* ---------------- Helpers ---------------- */

  const latestPlan = plans[0];

  const statistics = useMemo(() => {
    if (!latestPlan)
      return {
        totalSubjects: 0,
        totalDays: 0,
        totalHours: 0,
        lastExam: "-",
      };

    const totalHours =
      latestPlan.plan?.reduce(
        (sum, day) =>
          sum +
          (day.sessions?.reduce(
            (s, session) => s + Number(session.hours || 0),
            0
          ) || 0),
        0
      ) || 0;

    const lastDay =
      latestPlan.plan?.[latestPlan.plan.length - 1];

    return {
      totalSubjects: subjectsCount,
      totalDays: latestPlan.plan?.length || 0,
      totalHours,
      lastExam: lastDay?.date || "-",
    };
  }, [latestPlan, subjectsCount]);

  const priorityColor = (priority) => {
    switch (priority?.toLowerCase()) {
      case "high":
        return "bg-red-500/20 text-red-400";

      case "medium":
        return "bg-amber-500/20 text-amber-400";

      default:
        return "bg-emerald-500/20 text-emerald-400";
    }
  };

  /* ---------------- Empty State ---------------- */

  if (!plans.length) {
    return (
      <div className="bg-slate-900 border border-slate-800 rounded-2xl p-8">

        <div className="flex justify-between items-center mb-8">

          <div>

            <h2 className="text-2xl font-bold text-purple-400">
              🧠 AI Study Planner
            </h2>

            <p className="text-slate-400 mt-2">
              Generate a personalized roadmap for your exams.
            </p>

          </div>

          <button
            onClick={generatePlan}
            disabled={loading}
            className="bg-purple-600 hover:bg-purple-700 transition px-5 py-3 rounded-xl text-white disabled:bg-slate-700"
          >
            {loading ? "Generating..." : "Generate Plan"}
          </button>

        </div>

        <div className="text-center py-16">

          <div className="text-7xl mb-5">
            📖
          </div>

          <h3 className="text-xl text-white font-semibold mb-3">
            No Study Plan Yet
          </h3>

          <p className="text-slate-400 max-w-lg mx-auto">
            Add your subjects and availability,
            then let AI create a smart,
            day-wise preparation roadmap.
          </p>

        </div>

      </div>
    );
  }

  /* ---------------- Main UI ---------------- */

  return (
    <div className="space-y-8">

      {/* Header */}

      <div className="bg-slate-900 border border-slate-800 rounded-2xl p-8">

        <div className="flex flex-col lg:flex-row justify-between gap-6">

          <div>

            <h2 className="text-3xl font-bold text-purple-400">
              🧠 AI Study Planner
            </h2>

            <p className="text-slate-400 mt-3 max-w-2xl">
              {latestPlan.summary}
            </p>

          </div>

          <button
            onClick={generatePlan}
            disabled={loading}
            className="bg-purple-600 hover:bg-purple-700 transition px-6 py-3 rounded-xl text-white font-medium h-fit disabled:bg-slate-700"
          >
            {loading
              ? "Generating..."
              : "Regenerate Plan"}
          </button>

        </div>

      </div>

      {/* Summary Cards */}

      <div className="grid grid-cols-2 lg:grid-cols-4 gap-5">

        <div className="bg-slate-900 border border-slate-800 rounded-xl p-5">

          <div className="text-3xl">
            📚
          </div>

          <p className="text-slate-400 mt-3 text-sm">
            Subjects
          </p>

          <h3 className="text-3xl font-bold text-white mt-1">
            {statistics.totalSubjects}
          </h3>

        </div>

        <div className="bg-slate-900 border border-slate-800 rounded-xl p-5">

          <div className="text-3xl">
            📅
          </div>

          <p className="text-slate-400 mt-3 text-sm">
            Study Days
          </p>

          <h3 className="text-3xl font-bold text-white mt-1">
            {statistics.totalDays}
          </h3>

        </div>

        <div className="bg-slate-900 border border-slate-800 rounded-xl p-5">

          <div className="text-3xl">
            ⏱
          </div>

          <p className="text-slate-400 mt-3 text-sm">
            Planned Hours
          </p>

          <h3 className="text-3xl font-bold text-emerald-400 mt-1">
            {statistics.totalHours}
          </h3>

        </div>

        <div className="bg-slate-900 border border-slate-800 rounded-xl p-5">

          <div className="text-3xl">
            🎯
          </div>

          <p className="text-slate-400 mt-3 text-sm">
            Last Study Day
          </p>

          <h3 className="text-lg font-semibold text-indigo-400 mt-2">
            {statistics.lastExam}
          </h3>

        </div>

      </div>


            {/* ================= AI RECOMMENDATIONS ================= */}

      {latestPlan.overallTips?.length > 0 && (
        <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6">

          <div className="flex items-center gap-3 mb-5">

            <div className="w-11 h-11 rounded-xl bg-yellow-500/10 flex items-center justify-center text-2xl">
              💡
            </div>

            <div>

              <h3 className="text-xl font-semibold text-yellow-400">
                AI Recommendations
              </h3>

              <p className="text-sm text-slate-500">
                Tips generated specifically for your preparation.
              </p>

            </div>

          </div>

          <div className="grid md:grid-cols-2 gap-4">

            {latestPlan.overallTips.map((tip, index) => (

              <div
                key={index}
                className="flex gap-3 bg-slate-800 border border-slate-700 rounded-xl p-4 hover:border-yellow-500 transition"
              >

                <div className="text-yellow-400 mt-1">
                  ✓
                </div>

                <p className="text-slate-300 leading-relaxed">
                  {tip}
                </p>

              </div>

            ))}

          </div>

        </div>
      )}

      {/* ================= DAILY PLAN ================= */}

      <div className="space-y-5">

        <div className="flex justify-between items-center">

          <div>

            <h3 className="text-2xl font-bold text-white">
              📅 Daily Study Schedule
            </h3>

            <p className="text-slate-400 mt-1">
              Click any day to view detailed sessions.
            </p>

          </div>

          <div className="text-sm text-slate-500">
            {latestPlan.plan.length} Days Planned
          </div>

        </div>

        {latestPlan.plan.map((day, index) => {

          const totalSessions =
            day.sessions?.length || 0;

          const isExpanded =
            expandedDay === index;

          return (

            <div
              key={index}
              className="bg-slate-900 border border-slate-800 rounded-2xl overflow-hidden transition hover:border-indigo-500"
            >

              {/* Accordion Header */}

              <button
                onClick={() =>
                  setExpandedDay(
                    isExpanded ? -1 : index
                  )
                }
                className="w-full p-6 flex justify-between items-center hover:bg-slate-800 transition"
              >

                <div className="flex items-center gap-5">

                  <div className="w-12 h-12 rounded-xl bg-indigo-500/10 flex items-center justify-center text-xl">

                    {isExpanded ? "▼" : "▶"}

                  </div>

                  <div className="text-left">

                    <h3 className="text-xl font-semibold text-indigo-400">

                      {day.day} • {day.date}

                    </h3>

                    <div className="flex flex-wrap gap-4 mt-2 text-sm text-slate-400">

                      <span>
                        ⏱ {day.totalHours} hrs
                      </span>

                      <span>
                        📚 {totalSessions} Sessions
                      </span>

                    </div>

                  </div>

                </div>

                <div className="hidden md:block text-right">

                  <p className="text-yellow-300 italic max-w-sm">

                    "{day.motivation}"

                  </p>

                </div>

              </button>

              {/* Expanded Content */}

              {isExpanded && (

                <div className="border-t border-slate-800 p-6 space-y-8">
                                    {/* ================= STUDY SESSIONS ================= */}

                  <div>

                    <div className="flex items-center gap-3 mb-5">

                      <div className="w-10 h-10 rounded-lg bg-purple-500/10 flex items-center justify-center text-xl">
                        📚
                      </div>

                      <div>

                        <h4 className="text-lg font-semibold text-purple-400">
                          Study Sessions
                        </h4>

                        <p className="text-sm text-slate-500">
                          Complete these sessions for today's preparation.
                        </p>

                      </div>

                    </div>

                    <div className="grid lg:grid-cols-2 gap-5">

                      {day.sessions?.map((session, sessionIndex) => (

                        <div
                          key={sessionIndex}
                          className="bg-slate-800 border border-slate-700 rounded-2xl p-5 hover:border-indigo-500 hover:-translate-y-1 transition-all duration-300"
                        >

                          {/* Header */}

                          <div className="flex justify-between items-start">

                            <div>

                              <h4 className="text-xl font-semibold text-white">

                                {session.subject}

                              </h4>

                              <p className="text-slate-500 mt-1">

                                {session.topic || "General Study"}

                              </p>

                            </div>

                            <span
                              className={`px-3 py-1 rounded-full text-xs font-medium ${priorityColor(
                                session.priority
                              )}`}
                            >
                              {session.priority || "Normal"}
                            </span>

                          </div>

                          {/* Details */}

                          <div className="grid grid-cols-2 gap-4 mt-6">

                            <div className="bg-slate-900 rounded-xl p-4">

                              <p className="text-xs text-slate-500 uppercase">
                                Duration
                              </p>

                              <p className="text-lg font-semibold text-emerald-400 mt-1">
                                {session.hours} hrs
                              </p>

                            </div>

                            <div className="bg-slate-900 rounded-xl p-4">

                              <p className="text-xs text-slate-500 uppercase">
                                Break
                              </p>

                              <p className="text-lg font-semibold text-blue-400 mt-1">
                                {session.breakAfter || "15 min"}
                              </p>

                            </div>

                          </div>

                          {/* Goal */}

                          {session.goal && (

                            <div className="mt-5">

                              <p className="text-sm text-slate-500 mb-2">
                                🎯 Goal
                              </p>

                              <div className="bg-slate-900 rounded-xl p-4">

                                <p className="text-slate-300">
                                  {session.goal}
                                </p>

                              </div>

                            </div>

                          )}

                          {/* Focus */}

                          {session.focus && (

                            <div className="mt-5">

                              <p className="text-sm text-slate-500 mb-2">
                                🧠 Focus Area
                              </p>

                              <div className="bg-slate-900 rounded-xl p-4">

                                <p className="text-slate-300">
                                  {session.focus}
                                </p>

                              </div>

                            </div>

                          )}

                        </div>

                      ))}

                    </div>

                  </div>

                  {/* ================= DAILY MOTIVATION ================= */}

                  {day.motivation && (

                    <div className="bg-gradient-to-r from-yellow-500/10 to-amber-500/10 border border-yellow-500/20 rounded-2xl p-6">

                      <div className="flex gap-4">

                        <div className="text-4xl">
                          💡
                        </div>

                        <div>

                          <h4 className="text-yellow-400 font-semibold text-lg">
                            Motivation for Today
                          </h4>

                          <p className="text-slate-300 mt-2 leading-relaxed italic">
                            "{day.motivation}"
                          </p>

                        </div>

                      </div>

                    </div>

                  )}
                                    {/* ================= REVISION ================= */}

                  {day.revision?.length > 0 && (
                    <div>

                      <div className="flex items-center gap-3 mb-4">

                        <div className="w-10 h-10 rounded-lg bg-indigo-500/10 flex items-center justify-center text-xl">
                          🔁
                        </div>

                        <div>

                          <h4 className="text-lg font-semibold text-indigo-400">
                            Revision
                          </h4>

                          <p className="text-sm text-slate-500">
                            Quick revision topics for today.
                          </p>

                        </div>

                      </div>

                      <div className="grid md:grid-cols-2 gap-3">

                        {day.revision.map((topic, index) => (

                          <div
                            key={index}
                            className="bg-slate-800 border border-slate-700 rounded-xl p-4 hover:border-indigo-500 transition"
                          >

                            <div className="flex items-center gap-3">

                              <div className="w-8 h-8 rounded-full bg-indigo-500/20 flex items-center justify-center text-indigo-400">
                                ✓
                              </div>

                              <p className="text-slate-300">
                                {topic}
                              </p>

                            </div>

                          </div>

                        ))}

                      </div>

                    </div>
                  )}

                  {/* ================= TASKS ================= */}

                  {day.tasks?.length > 0 && (

                    <div>

                      <div className="flex items-center gap-3 mb-4">

                        <div className="w-10 h-10 rounded-lg bg-emerald-500/10 flex items-center justify-center text-xl">
                          ✅
                        </div>

                        <div>

                          <h4 className="text-lg font-semibold text-emerald-400">
                            Daily Tasks
                          </h4>

                          <p className="text-sm text-slate-500">
                            Complete these before ending the day.
                          </p>

                        </div>

                      </div>

                      <div className="space-y-3">

                        {day.tasks.map((task, index) => (

                          <label
                            key={index}
                            className="flex items-center gap-4 bg-slate-800 border border-slate-700 rounded-xl p-4 hover:border-emerald-500 transition cursor-pointer"
                          >

                            <input
                              type="checkbox"
                              className="w-5 h-5 accent-emerald-500"
                            />

                            <span className="text-slate-300">
                              {task}
                            </span>

                          </label>

                        ))}

                      </div>

                    </div>

                  )}

                </div>
              )}

            </div>

          );

        })}

      </div>

    </div>

  );
}