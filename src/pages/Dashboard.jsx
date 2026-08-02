import { useState, useRef, useEffect } from "react";
import { useNavigate } from "react-router-dom";

import DashboardLayout from "../layouts/DashboardLayout";
import Subjects from "../components/Subjects";
import Availability from "../components/Availability";
import StudyPlanView from "../components/StudyPlanView";
import AnimatedBackground from "../components/AnimatedBackground";

export default function Dashboard() {
  const navigate = useNavigate();

  const [openMenu, setOpenMenu] = useState(false);
  const [subjectsCount, setSubjectsCount] = useState(0);

  const menuRef = useRef(null);

  const userEmail = localStorage.getItem("userEmail") || "";

  const avatarLetter = userEmail
    ? userEmail.charAt(0).toUpperCase()
    : "?";

  const username = userEmail.split("@")[0];

  const logout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("userEmail");
    navigate("/login");
  };

  const scrollTo = (id) => {
    document.getElementById(id)?.scrollIntoView({
      behavior: "smooth",
    });
  };

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (
        menuRef.current &&
        !menuRef.current.contains(event.target)
      ) {
        setOpenMenu(false);
      }
    };

    document.addEventListener(
      "mousedown",
      handleClickOutside
    );

    return () =>
      document.removeEventListener(
        "mousedown",
        handleClickOutside
      );
  }, []);

  return (
    <>
      <AnimatedBackground />

      <DashboardLayout>
        {/* ================= HEADER ================= */}

        <div className="flex justify-between items-center mb-10">

          <div>

            <h1 className="text-3xl font-bold text-white">
              Welcome back,
              <span className="text-indigo-400">
                {" "}
                {username}
              </span>
            </h1>

            <p className="text-slate-400 mt-2">
              Stay consistent and let AI guide your preparation.
            </p>

          </div>

          {/* Avatar */}

          <div
            className="relative"
            ref={menuRef}
          >
            <button
              onClick={() =>
                setOpenMenu((prev) => !prev)
              }
              className="w-11 h-11 rounded-full bg-gradient-to-br from-indigo-500 to-purple-600 text-white font-semibold shadow-lg hover:scale-105 transition"
            >
              {avatarLetter}
            </button>

            {openMenu && (
              <div className="absolute right-0 mt-3 w-60 rounded-xl border border-slate-700 bg-slate-900 shadow-2xl overflow-hidden z-50">

                <div className="p-4 border-b border-slate-700">

                  <p className="text-xs text-slate-500">
                    Signed in as
                  </p>

                  <p className="text-white font-medium truncate mt-1">
                    {userEmail}
                  </p>

                </div>

                <button
                  onClick={logout}
                  className="w-full text-left px-4 py-3 hover:bg-slate-800 text-red-400 transition"
                >
                  Logout
                </button>

              </div>
            )}
          </div>
        </div>

        {/* ================= SUMMARY CARDS ================= */}

        <div className="grid lg:grid-cols-3 md:grid-cols-2 gap-6 mb-10">

          <button
            onClick={() =>
              scrollTo("subjects")
            }
            className="bg-slate-900 border border-slate-800 rounded-2xl p-6 text-left hover:border-indigo-500 hover:-translate-y-1 transition"
          >
            <p className="text-3xl mb-3">📚</p>

            <h3 className="text-lg font-semibold text-indigo-400">
              Subjects
            </h3>

            <p className="text-slate-400 mt-2">
              {subjectsCount} Subject
              {subjectsCount !== 1 && "s"} Added
            </p>

          </button>

          <button
            onClick={() =>
              scrollTo("availability")
            }
            className="bg-slate-900 border border-slate-800 rounded-2xl p-6 text-left hover:border-emerald-500 hover:-translate-y-1 transition"
          >
            <p className="text-3xl mb-3">⏰</p>

            <h3 className="text-lg font-semibold text-emerald-400">
              Availability
            </h3>

            <p className="text-slate-400 mt-2">
              Manage your study schedule
            </p>

          </button>

          <button
            onClick={() =>
              scrollTo("study-plan")
            }
            className="bg-slate-900 border border-slate-800 rounded-2xl p-6 text-left hover:border-purple-500 hover:-translate-y-1 transition"
          >
            <p className="text-3xl mb-3">🧠</p>

            <h3 className="text-lg font-semibold text-purple-400">
              AI Study Planner
            </h3>

            <p className="text-slate-400 mt-2">
              Generate an optimized study roadmap
            </p>

          </button>

        </div>

        {/* ================= SUBJECT + AVAILABILITY ================= */}

        <div className="grid lg:grid-cols-2 gap-8 mb-10">

          <section id="subjects">
            <Subjects
              onCountChange={setSubjectsCount}
            />
          </section>

          <section id="availability">
            <Availability />
          </section>

        </div>

        {/* ================= STUDY PLAN ================= */}

        <section id="study-plan">
          <StudyPlanView
            subjectsCount={subjectsCount}
          />
        </section>

      </DashboardLayout>
    </>
  );
}