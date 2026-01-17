import { useEffect, useState } from "react";
import api from "../services/api";

export default function Availability() {
  const [weekdayHours, setWeekdayHours] = useState("");
  const [weekendHours, setWeekendHours] = useState("");
  const [saved, setSaved] = useState(false);

  useEffect(() => {
    const fetchAvailability = async () => {
      const res = await api.get("/availability");
      if (res.data) {
        setWeekdayHours(res.data.weekdayHours);
        setWeekendHours(res.data.weekendHours);
      }
    };
    fetchAvailability();
  }, []);

  const saveAvailability = async (e) => {
    e.preventDefault();
    await api.post("/availability", {
      weekdayHours: Number(weekdayHours),
      weekendHours: Number(weekendHours),
    });
    setSaved(true);
    setTimeout(() => setSaved(false), 2000);
  };

  return (
    <div className="bg-slate-900 border border-slate-800 rounded-xl p-6 pl-10 h-70 w-4/12 ml-96">
      <h3 className="text-lg font-semibold text-emerald-400 mb-4 ml-24">
        Daily Availability
      </h3>

      <form onSubmit={saveAvailability} className="space-y-3">
        <div>
          <label className="text-wheat ml-3">Weekdays (hours/day) :-</label>
          <input
            type="number"
            min="0"
            max="24"
            className="bg-slate-800 border border-slate-700 text-slate-100 rounded px-3 py-2 m-2 ml-10 focus:outline-none focus:border-emerald-500 w-25"
            value={weekdayHours}
            onChange={(e) => setWeekdayHours(e.target.value)}
          />
        </div>

        <div>
          <label className="text-wheat ml-3">Weekend (hours/day) :-</label>
          <input
            type="number"
            min="0"
            max="24"
            className="bg-slate-800 border border-slate-700 text-slate-100 rounded px-3 m-2 ml-11 py-2 focus:outline-none focus:border-emerald-500 w-25"
            value={weekendHours}
            onChange={(e) => setWeekendHours(e.target.value)}
          />
        </div>

        <div className="flex justify-center">
            <button className="bg-emerald-600 hover:bg-emerald-700 transition text-white w-40 px-4 py-2 rounded ">
          Save
        </button>
        </div>

        {saved && (
          <p className="text-green-600 text-sm">
            Availability saved
          </p>
        )}
      </form>
    </div>
  );
}
