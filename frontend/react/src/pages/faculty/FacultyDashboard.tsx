// src/pages/FacultyDashboard.tsx
// Original code by teammate — integrated with Login navigation

import { useEffect, useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import type { FacultyData, Event } from "../../types";

export default function FacultyDashboard() {
  const navigate  = useNavigate();
  const location  = useLocation();

  // ── Get faculty data from Login navigation state OR localStorage ──
  const storedFaculty = localStorage.getItem("faculty");

  const facultyData: FacultyData = location.state?.facultyData
    ? location.state.facultyData
    : storedFaculty
      ? JSON.parse(storedFaculty)
      : { facultyId: "F001", facultyName: "Dr. Smith" };

  const facultyId   = facultyData.facultyId;
  const facultyName = facultyData.facultyName;

  // Save to localStorage so data persists on page refresh
  useEffect(() => {
    localStorage.setItem("faculty", JSON.stringify(facultyData));
  }, []);

  const [month, setMonth]                         = useState<number>(1);
  const [events, setEvents]                       = useState<Event[]>([]);
  const [showModal, setShowModal]                 = useState<boolean>(false);
  const [editMode, setEditMode]                   = useState<boolean>(false);
  const [currentEventId, setCurrentEventId]       = useState<string | null>(null);
  const [showLogoutConfirm, setShowLogoutConfirm] = useState<boolean>(false);

  const [formData, setFormData] = useState({
    studName: "",
    rollNo: "",
    eventName: "",
    eventDate: "",
    eventLocation: "",
    eventDescription: "",
  });

  useEffect(() => {
    fetchEvents();
  }, [month]);

  const fetchEvents = async () => {
    try {
      const res = await fetch(`https://faculty-service-xx3l.onrender.com/faculty/${month}/${facultyId}`);
      if (res.ok) {
        const data: Event[] = await res.json();
        setEvents(data);
      } else {
        setEvents([]);
      }
    } catch {
      // Backend not connected yet — show empty state
      setEvents([]);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async () => {
    const payload = { ...formData, facultyId };
    if (editMode && currentEventId) {
      await fetch(`https://faculty-service-xx3l.onrender.com/faculty/update/${currentEventId}/${facultyId}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });
    } else {
      await fetch(`https://faculty-service-xx3l.onrender.com/faculty/add`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });
    }
    resetForm();
    fetchEvents();
  };

  const handleDelete = async (id: string) => {
    await fetch(`https://faculty-service-xx3l.onrender.com/faculty/delete/${id}/${facultyId}`, {
      method: "DELETE",
    });
    fetchEvents();
  };

  const handleEdit = (event: Event) => {
    setEditMode(true);
    setCurrentEventId(event.id);
    setFormData({
      studName:         event.studName,
      rollNo:           event.rollNo,
      eventName:        event.eventName,
      eventDate:        event.eventDate,
      eventLocation:    event.eventLocation,
      eventDescription: event.eventDescription,
    });
    setShowModal(true);
  };

  const resetForm = () => {
    setFormData({ studName: "", rollNo: "", eventName: "", eventDate: "", eventLocation: "", eventDescription: "" });
    setEditMode(false);
    setCurrentEventId(null);
    setShowModal(false);
  };

  const handleLogout = () => setShowLogoutConfirm(true);

  const confirmLogout = () => {
    localStorage.removeItem("faculty");
    localStorage.removeItem("sem_token");
    navigate("/login");   // ← goes back to your Login page
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-900 via-purple-700 to-indigo-900 text-white p-10">

      {/* ── Header ── */}
      <div className="flex justify-between items-center mb-8">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-white/10 border border-white/20 flex items-center justify-center">
            <svg width="20" height="20" fill="none" viewBox="0 0 24 24">
              <path d="M12 2L2 7l10 5 10-5-10-5z" stroke="white" strokeWidth="2" strokeLinejoin="round"/>
              <path d="M2 17l10 5 10-5" stroke="white" strokeWidth="2" strokeLinejoin="round"/>
              <path d="M2 12l10 5 10-5" stroke="white" strokeWidth="2" strokeLinejoin="round"/>
            </svg>
          </div>
          <h1 className="text-4xl font-bold">Faculty Dashboard</h1>
        </div>

        <div className="flex items-center gap-6">
          <div className="text-right">
            <p className="text-sm opacity-80">👤 Faculty</p>
            <p className="font-semibold">{facultyName} ({facultyId})</p>
          </div>
          <button onClick={handleLogout}
            className="bg-red-600 hover:bg-red-700 px-5 py-2 rounded-xl font-semibold transition-colors">
            Logout
          </button>
        </div>
      </div>

      {/* ── Stats row ── */}
      <div className="grid md:grid-cols-3 gap-6 mb-8">
        <button onClick={() => setShowModal(true)}
          className="bg-white/10 p-6 rounded-2xl border border-white/20 hover:bg-white/20 transition-colors text-left">
          <h2 className="text-xl font-semibold">➕ Add Event</h2>
          <p className="text-sm mt-2 opacity-80">Create a new student event</p>
        </button>

        <div className="bg-white/10 p-6 rounded-2xl border border-white/20">
          <h2 className="text-xl font-semibold">📅 Filter by Month</h2>
          <select value={month} onChange={(e) => setMonth(Number(e.target.value))}
            className="w-full mt-3 p-2 bg-purple-600/40 rounded border border-white/20 text-white">
            {[...Array(12)].map((_, i) => (
              <option key={i + 1} value={i + 1}>
                {new Date(0, i).toLocaleString("default", { month: "long" })}
              </option>
            ))}
          </select>
        </div>

        <div className="bg-white/10 p-6 rounded-2xl border border-white/20">
          <h2 className="text-xl font-semibold">📊 Total Events</h2>
          <p className="text-4xl font-bold mt-2">{events.length}</p>
        </div>
      </div>

      {/* ── Events grid ── */}
      <div className="bg-white/10 p-6 rounded-2xl border border-white/20">
        <h2 className="text-2xl mb-6">📌 Events This Month</h2>

        {events.length === 0 ? (
          <div className="text-center py-16 opacity-50">
            <p className="text-lg">No events found for this month.</p>
            <p className="text-sm mt-2">Click "Add Event" to create one.</p>
          </div>
        ) : (
          <div className="grid md:grid-cols-2 gap-5">
            {events.map((event) => (
              <div key={event.id} className="bg-white/10 p-5 rounded-xl border border-white/20">
                <h3 className="text-xl font-semibold">{event.eventName}</h3>
                <p className="text-sm mt-1">📍 {event.eventLocation}</p>
                <p className="text-sm">📅 {event.eventDate}</p>
                <p className="mt-2 text-sm opacity-80">{event.eventDescription}</p>
                <p className="text-xs mt-2 opacity-60">👤 {event.studName} ({event.rollNo})</p>
                <div className="flex gap-3 mt-3">
                  <button onClick={() => handleEdit(event)}
                    className="bg-yellow-500 hover:bg-yellow-400 px-3 py-1 rounded font-medium text-sm transition-colors">
                    Edit
                  </button>
                  <button onClick={() => handleDelete(event.id)}
                    className="bg-red-500 hover:bg-red-400 px-3 py-1 rounded font-medium text-sm transition-colors">
                    Delete
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* ── Add / Edit Modal ── */}
      {showModal && (
        <div className="fixed inset-0 bg-black/60 flex justify-center items-center z-50">
          <div className="bg-purple-900 border border-white/20 p-6 rounded-2xl w-[420px] shadow-2xl">
            <h2 className="text-2xl mb-4 font-bold">{editMode ? "✏️ Edit Event" : "➕ Create Event"}</h2>

            {(Object.keys(formData) as Array<keyof typeof formData>).map((key) =>
              key === "eventDescription" ? (
                <textarea key={key} name={key} value={formData[key]} onChange={handleChange}
                  className="w-full mb-2 p-2 rounded bg-white/10 border border-white/20 text-white placeholder-white/40 resize-none"
                  placeholder={key} rows={3}
                />
              ) : (
                <input key={key} name={key} value={formData[key]} onChange={handleChange}
                  className="w-full mb-2 p-2 rounded bg-white/10 border border-white/20 text-white placeholder-white/40"
                  placeholder={key} type={key === "eventDate" ? "date" : "text"}
                />
              )
            )}

            <div className="flex justify-between mt-4">
              <button onClick={resetForm}
                className="bg-red-500 hover:bg-red-400 px-4 py-2 rounded font-semibold transition-colors">
                Cancel
              </button>
              <button onClick={handleSubmit}
                className="bg-green-500 hover:bg-green-400 px-4 py-2 rounded font-semibold transition-colors">
                {editMode ? "Update" : "Submit"}
              </button>
            </div>
          </div>
        </div>
      )}

      {/* ── Logout Confirm Modal ── */}
      {showLogoutConfirm && (
        <div className="fixed inset-0 bg-black/60 flex justify-center items-center z-50">
          <div className="bg-purple-900 border border-white/20 p-6 rounded-2xl w-[350px] text-center shadow-2xl">
            <h2 className="text-xl mb-2 font-bold">Logout?</h2>
            <p className="text-sm opacity-60 mb-6">Are you sure you want to sign out?</p>
            <div className="flex justify-between gap-3">
              <button onClick={() => setShowLogoutConfirm(false)}
                className="flex-1 bg-white/10 hover:bg-white/20 px-4 py-2 rounded-xl font-semibold transition-colors">
                Cancel
              </button>
              <button onClick={confirmLogout}
                className="flex-1 bg-red-600 hover:bg-red-500 px-4 py-2 rounded-xl font-semibold transition-colors">
                Logout
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
