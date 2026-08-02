import { useEffect, useState } from "react";
import api from "../services/api";

export default function Availability() {
  const [weekdayHours, setWeekdayHours] = useState(4);
  const [weekendHours, setWeekendHours] = useState(6);
  const [saved, setSaved] = useState(false);

  useEffect(() => {
    const fetchAvailability = async () => {
      try {
        const res = await api.get("/availability");

        if (res.data) {
          setWeekdayHours(res.data.weekdayHours);
          setWeekendHours(res.data.weekendHours);
        }
      } catch (err) {
        console.error(err);
      }
    };

    fetchAvailability();
  }, []);

  const saveAvailability = async (e) => {
    e.preventDefault();

    try {
      await api.post("/availability", {
        weekdayHours: Number(weekdayHours),
        weekendHours: Number(weekendHours),
      });

      setSaved(true);

      setTimeout(() => {
        setSaved(false);
      }, 2500);
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 shadow-lg hover:shadow-emerald-900/20 transition w-full">

      {/* Header */}

      <div className="flex justify-between items-center mb-6">

        <h3 className="text-xl font-semibold text-emerald-400">
          ⏰ Daily Availability
        </h3>

        <span className="text-sm bg-emerald-500/20 text-emerald-300 px-3 py-1 rounded-full">
          Settings
        </span>

      </div>

      <form
        onSubmit={saveAvailability}
        className="space-y-8"
      >

        {/* Weekdays */}

        <div>

          <div className="flex justify-between mb-2">

            <label className="text-slate-200 font-medium">
              📅 Weekdays
            </label>

            <span className="text-emerald-400 font-semibold">
              {weekdayHours} hrs/day
            </span>

          </div>

          <input
            type="range"
            min="0"
            max="12"
            value={weekdayHours}
            onChange={(e) =>
              setWeekdayHours(e.target.value)
            }
            className="w-full accent-emerald-500 cursor-pointer"
          />

          <p className="text-xs text-slate-500 mt-2">
            Time available from Monday to Friday.
          </p>

        </div>

        {/* Weekend */}

        <div>

          <div className="flex justify-between mb-2">

            <label className="text-slate-200 font-medium">
              🌤 Weekend
            </label>

            <span className="text-emerald-400 font-semibold">
              {weekendHours} hrs/day
            </span>

          </div>

          <input
            type="range"
            min="0"
            max="12"
            value={weekendHours}
            onChange={(e) =>
              setWeekendHours(e.target.value)
            }
            className="w-full accent-emerald-500 cursor-pointer"
          />

          <p className="text-xs text-slate-500 mt-2">
            Time available on Saturday & Sunday.
          </p>

        </div>

        {/* Summary */}

        <div className="bg-slate-800 border border-slate-700 rounded-xl p-4">

          <h4 className="text-slate-300 font-medium mb-3">
            Weekly Overview
          </h4>

          <div className="flex justify-between text-sm">

            <div>

              <p className="text-slate-400">
                Weekdays
              </p>

              <p className="text-white font-semibold">
                {weekdayHours * 5} hrs/week
              </p>

            </div>

            <div>

              <p className="text-slate-400">
                Weekends
              </p>

              <p className="text-white font-semibold">
                {weekendHours * 2} hrs/week
              </p>

            </div>

            <div>

              <p className="text-slate-400">
                Total
              </p>

              <p className="text-emerald-400 font-bold">
                {weekdayHours * 5 + weekendHours * 2} hrs/week
              </p>

            </div>

          </div>

        </div>

        {/* Save */}

        <button
          className="w-full bg-emerald-600 hover:bg-emerald-700 transition py-3 rounded-xl text-white font-medium"
        >
          💾 Save Availability
        </button>

        {saved && (
          <div className="bg-emerald-500/10 border border-emerald-500/30 rounded-lg p-3 text-center">

            <p className="text-emerald-400 text-sm font-medium">
              ✓ Availability updated successfully.
            </p>

          </div>
        )}

      </form>

    </div>
  );
}