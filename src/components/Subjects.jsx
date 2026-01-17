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
    setForm({ name: "", difficulty: "medium", examDate: "" });
    fetchSubjects();
  };

  const deleteSubject = async () => {
    if (!selectedId) return;
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

  const selectedSubject = subjects.find((s) => s._id === selectedId);

  return (
    <div className="bg-slate-900 border border-slate-800 rounded-xl p-6 w-4/12 ml-96">
      <h3 className="text-lg font-semibold text-indigo-400 mb-4 ml-36">
        Subjects
      </h3>

      {/* ADD SUBJECT */}
      <form onSubmit={addSubject} className="space-y-3 mb-6">
        <input
          placeholder="Subject name"
          className="w-full bg-slate-800 border border-slate-700 text-white rounded px-3 py-2"
          value={form.name}
          onChange={(e) => setForm({ ...form, name: e.target.value })}
          required
        />

        <select
          className="w-full bg-slate-800 border border-slate-700 text-white rounded px-3 py-2"
          value={form.difficulty}
          onChange={(e) =>
            setForm({ ...form, difficulty: e.target.value })
          }
        >
          <option value="easy">Easy</option>
          <option value="medium">Medium</option>
          <option value="hard">Hard</option>
        </select>

        <input
          type="date"
          className="w-full bg-slate-800 border border-slate-700 text-white rounded px-3 py-2"
          value={form.examDate}
          onChange={(e) =>
            setForm({ ...form, examDate: e.target.value })
          }
          required
        />

        <button className="w-full bg-indigo-600 hover:bg-indigo-700 text-white py-2 rounded">
          Add Subject
        </button>
      </form>

      {/* SUBJECT DROPDOWN */}
      {subjects.length > 0 && (
        <>
          <select
            className="w-full bg-slate-800 border border-slate-700 text-white rounded px-3 py-2 mb-4"
            value={selectedId}
            onChange={(e) => {
              setSelectedId(e.target.value);
              setEditing(false);
            }}
          >
            <option value="">Your Subjects</option>
            {subjects.map((s) => (
              <option key={s._id} value={s._id}>
                {s.name}
              </option>
            ))}
          </select>

          {/* SUBJECT DETAILS */}
          {selectedSubject && !editing && (
            <div className="bg-slate-800 border border-slate-700 rounded p-4 space-y-2">
              <p className="text-slate-100 font-medium">
                {selectedSubject.name}
              </p>
              <p className="text-sm text-slate-400">
                Difficulty: {selectedSubject.difficulty}
              </p>
              <p className="text-sm text-slate-400">
                Exam: {new Date(selectedSubject.examDate).toDateString()}
              </p>

              <div className="flex gap-3 pt-2">
                <button
                  onClick={startEdit}
                  className="text-sm text-indigo-400 hover:text-indigo-300"
                >
                  Edit
                </button>
                <button
                  onClick={deleteSubject}
                  className="text-sm text-red-400 hover:text-red-300"
                >
                  Delete
                </button>
              </div>
            </div>
          )}

          {/* EDIT MODE */}
          {editing && (
            <div className="bg-slate-800 border border-slate-700 rounded p-4 space-y-3">
              <input
                className="w-full bg-slate-900 border border-slate-700 text-white rounded px-3 py-2"
                value={editData.name}
                onChange={(e) =>
                  setEditData({ ...editData, name: e.target.value })
                }
              />

              <select
                className="w-full bg-slate-900 border border-slate-700 text-white rounded px-3 py-2"
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
                className="w-full bg-slate-900 border border-slate-700 text-white rounded px-3 py-2"
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
                  className="text-sm text-emerald-400 hover:text-emerald-300"
                >
                  Save
                </button>
                <button
                  onClick={() => setEditing(false)}
                  className="text-sm text-slate-400"
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
