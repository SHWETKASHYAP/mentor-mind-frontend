import { useEffect, useState } from "react";
import api from "../services/api";

export default function Subjects({ onCountChange }) {
  const [subjects, setSubjects] = useState([]);
  const [selectedId, setSelectedId] = useState("");
  const [editing, setEditing] = useState(false);

  const [form, setForm] = useState({
    name: "",
    difficulty: "medium",
    examDate: "",
  });

  const [editData, setEditData] = useState({
    name: "",
    difficulty: "medium",
    examDate: "",
  });

  const fetchSubjects = async () => {
    const res = await api.get("/subjects");
    setSubjects(res.data);
    onCountChange?.(res.data.length);
  };

  useEffect(() => {
    fetchSubjects();
  }, []);

  const addSubject = async (e) => {
    e.preventDefault();
    await api.post("/subjects", form);
    setForm({
      name: "",
      difficulty: "medium",
      examDate: "",
    });
    fetchSubjects();
  };

  const deleteSubject = async () => {
    if (!selectedId) return;

    if (!window.confirm("Delete this subject?")) return;

    await api.delete(`/subjects/${selectedId}`);
    setSelectedId("");
    setEditing(false);
    fetchSubjects();
  };

  const startEdit = () => {
    const s = subjects.find((x) => x._id === selectedId);

    if (!s) return;

    setEditData({
      name: s.name,
      difficulty: s.difficulty,
      examDate: s.examDate.slice(0, 10),
    });

    setEditing(true);
  };

  const saveEdit = async () => {
    await api.put(`/subjects/${selectedId}`, editData);
    setEditing(false);
    fetchSubjects();
  };

  const selectedSubject = subjects.find(
    (s) => s._id === selectedId
  );

  const getBadge = (difficulty) => {
    switch (difficulty) {
      case "easy":
        return "bg-emerald-500/20 text-emerald-400";
      case "medium":
        return "bg-amber-500/20 text-amber-400";
      case "hard":
        return "bg-red-500/20 text-red-400";
      default:
        return "bg-slate-700 text-slate-300";
    }
  };

  const daysRemaining = (date) => {
    const diff =
      new Date(date).setHours(0, 0, 0, 0) -
      new Date().setHours(0, 0, 0, 0);

    return Math.ceil(diff / (1000 * 60 * 60 * 24));
  };

  return (
    <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 shadow-lg hover:shadow-indigo-900/20 transition w-full">

      {/* Header */}

      <div className="flex justify-between items-center mb-6">

        <h3 className="text-xl font-semibold text-indigo-400">
          📚 Subjects
        </h3>

        <span className="text-sm bg-indigo-500/20 text-indigo-300 px-3 py-1 rounded-full">
          {subjects.length} Total
        </span>

      </div>

      {/* Add Subject */}

      <form
        onSubmit={addSubject}
        className="space-y-3"
      >
        <input
          placeholder="Subject Name"
          className="w-full bg-slate-800 border border-slate-700 rounded-lg px-4 py-2 text-white focus:border-indigo-500 outline-none"
          value={form.name}
          onChange={(e) =>
            setForm({
              ...form,
              name: e.target.value,
            })
          }
          required
        />

        <select
          className="w-full bg-slate-800 border border-slate-700 rounded-lg px-4 py-2 text-white"
          value={form.difficulty}
          onChange={(e) =>
            setForm({
              ...form,
              difficulty: e.target.value,
            })
          }
        >
          <option value="easy">Easy</option>
          <option value="medium">Medium</option>
          <option value="hard">Hard</option>
        </select>

        <input
          type="date"
          className="w-full bg-slate-800 border border-slate-700 rounded-lg px-4 py-2 text-white"
          value={form.examDate}
          onChange={(e) =>
            setForm({
              ...form,
              examDate: e.target.value,
            })
          }
          required
        />

        <button className="w-full bg-indigo-600 hover:bg-indigo-700 py-2 rounded-lg text-white transition">
          + Add Subject
        </button>
      </form>

      {/* Divider */}

      <div className="border-t border-slate-800 my-6" />

      {/* Empty */}

      {subjects.length === 0 && (
        <div className="text-center py-8">

          <div className="text-5xl mb-4">
            📚
          </div>

          <p className="text-slate-400">
            No subjects added yet.
          </p>

          <p className="text-sm text-slate-500 mt-1">
            Add your first subject to begin.
          </p>

        </div>
      )}

      {subjects.length > 0 && (
        <>
          <select
            value={selectedId}
            onChange={(e) => {
              setSelectedId(e.target.value);
              setEditing(false);
            }}
            className="w-full bg-slate-800 border border-slate-700 rounded-lg px-4 py-2 text-white"
          >
            <option value="">
              📚 Your Subjects
            </option>

            {subjects.map((subject) => (
              <option
                key={subject._id}
                value={subject._id}
              >
                {subject.name}
              </option>
            ))}
          </select>

          {selectedSubject && !editing && (
            <div className="mt-5 bg-slate-800 rounded-xl border border-slate-700 p-5 space-y-4">

              <div className="flex justify-between items-center">

                <h4 className="text-lg font-semibold text-white">
                  {selectedSubject.name}
                </h4>

                <span
                  className={`px-3 py-1 rounded-full text-xs ${getBadge(
                    selectedSubject.difficulty
                  )}`}
                >
                  {selectedSubject.difficulty.toUpperCase()}
                </span>

              </div>

              <div className="text-sm text-slate-400 space-y-2">

                <p>
                  📅 Exam Date:
                  <span className="text-slate-200 ml-2">
                    {new Date(
                      selectedSubject.examDate
                    ).toLocaleDateString()}
                  </span>
                </p>

                <p>
                  ⏳ Days Remaining:
                  <span className="text-indigo-400 ml-2 font-medium">
                    {daysRemaining(
                      selectedSubject.examDate
                    )} Days
                  </span>
                </p>

              </div>

              <div className="flex gap-3 pt-3">

                <button
                  onClick={startEdit}
                  className="flex-1 bg-indigo-600 hover:bg-indigo-700 py-2 rounded-lg text-white transition"
                >
                  Edit
                </button>

                <button
                  onClick={deleteSubject}
                  className="flex-1 bg-red-600 hover:bg-red-700 py-2 rounded-lg text-white transition"
                >
                  Delete
                </button>

              </div>

            </div>
          )}

          {editing && (
            <div className="mt-5 bg-slate-800 rounded-xl border border-slate-700 p-5 space-y-3">

              <input
                className="w-full bg-slate-900 border border-slate-700 rounded-lg px-4 py-2 text-white"
                value={editData.name}
                onChange={(e) =>
                  setEditData({
                    ...editData,
                    name: e.target.value,
                  })
                }
              />

              <select
                className="w-full bg-slate-900 border border-slate-700 rounded-lg px-4 py-2 text-white"
                value={editData.difficulty}
                onChange={(e) =>
                  setEditData({
                    ...editData,
                    difficulty: e.target.value,
                  })
                }
              >
                <option value="easy">Easy</option>
                <option value="medium">Medium</option>
                <option value="hard">Hard</option>
              </select>

              <input
                type="date"
                className="w-full bg-slate-900 border border-slate-700 rounded-lg px-4 py-2 text-white"
                value={editData.examDate}
                onChange={(e) =>
                  setEditData({
                    ...editData,
                    examDate: e.target.value,
                  })
                }
              />

              <div className="flex gap-3">

                <button
                  onClick={saveEdit}
                  className="flex-1 bg-emerald-600 hover:bg-emerald-700 py-2 rounded-lg text-white transition"
                >
                  Save Changes
                </button>

                <button
                  onClick={() =>
                    setEditing(false)
                  }
                  className="flex-1 bg-slate-700 hover:bg-slate-600 py-2 rounded-lg text-white transition"
                >
                  Cancel
                </button>

              </div>

            </div>
          )}
        </>
      )}
    </div>
  );
}