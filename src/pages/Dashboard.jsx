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

  const userEmail = localStorage.getItem("userEmail");
  const displayEmail = userEmail ?? "";
  const avatarLetter = displayEmail
    ? displayEmail.charAt(0).toUpperCase()
    : "?";

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
    if (menuRef.current && !menuRef.current.contains(event.target)) {
      setOpenMenu(false);
    }
  };

  document.addEventListener("mousedown", handleClickOutside);
  return () => {
    document.removeEventListener("mousedown", handleClickOutside);
  };
}, []);


  return (
    <>
      <AnimatedBackground />
      <DashboardLayout>
      {/* Header */}
      <div className="flex justify-between items-center mb-8">
        <h2 className="text-2xl font-semibold text-slate-100">
          Dashboard
        </h2>

        {/* Avatar Dropdown */}
        <div className="relative" ref={menuRef}>
          <button
            onClick={() => setOpenMenu((prev) => !prev)}
            className="w-10 h-10 rounded-full bg-indigo-600 flex items-center justify-center text-white font-semibold hover:bg-indigo-700 transition"
          >
            {avatarLetter}
          </button>

          {openMenu && (
            <div className="absolute right-0 mt-3 w-52 bg-slate-900 border border-slate-800 rounded-xl shadow-lg overflow-hidden z-50">
              <div className="px-4 py-3 border-b border-slate-800">
                <p className="text-xs text-slate-400 mb-1">
                  Signed in as
                </p>
                <p className="text-sm font-medium text-slate-100 truncate">
                  {displayEmail || "Unknown user"}
                </p>
              </div>

              <button
                onClick={logout}
                className="w-full text-left px-4 py-3 text-sm text-red-400 hover:bg-slate-800 transition"
              >
                Logout
              </button>
            </div>
          )}
        </div>
      </div>

      {/* Action Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-10">
        <button
          onClick={() => scrollTo("subjects")}
          className="text-left bg-slate-900 border border-slate-800 p-6 rounded-xl hover:border-indigo-500 transition"
        >
          <h3 className="text-lg font-semibold text-indigo-400 mb-2">
            Subjects
          </h3>
          <p className="text-sm text-slate-400">
            Add and manage your subjects
          </p>
        </button>

        <button
          onClick={() => scrollTo("availability")}
          className="text-left bg-slate-900 border border-slate-800 p-6 rounded-xl hover:border-emerald-500 transition"
        >
          <h3 className="text-lg font-semibold text-emerald-400 mb-2">
            Availability
          </h3>
          <p className="text-sm text-slate-400">
            Manage your daily schedule
          </p>
        </button>

        <button
          onClick={() => scrollTo("study-plan")}
          className="text-left bg-slate-900 border border-slate-800 p-6 rounded-xl hover:border-purple-500 transition"
        >
          <h3 className="text-lg font-semibold text-purple-400 mb-2">
            AI Study Plan
          </h3>
          <p className="text-sm text-slate-400">
            Generate and view your plan
          </p>
        </button>
      </div>

      {/* Sections */}
      <div className="space-y-12">
        <section id="subjects">
          <Subjects onCountChange={setSubjectsCount} />
        </section>

        <section id="availability">
          <Availability />
        </section>

        <section id="study-plan">
          <StudyPlanView subjectsCount={subjectsCount} />
        </section>
      </div>
    </DashboardLayout>
    </>
  );
}
