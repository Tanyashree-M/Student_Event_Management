import { useLocation, useNavigate } from "react-router-dom";
import { useState } from "react";

export default function Events() {
  const location = useLocation();
  const navigate = useNavigate();

  const [events] = useState(location.state?.events || []);

  // Extract student name from events
  const studentName =
    events.length > 0 ? events[0].studName : "Student";

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-700 via-indigo-700 to-purple-900 text-white">

      {/* 🔝 PROFESSIONAL HEADER */}
<div className="flex justify-between items-center px-8 py-4 bg-white/5 backdrop-blur-md border-b border-white/10">

  {/* Left */}
  <h1 className="text-xl font-semibold tracking-wide text-white/90">
    Student Dashboard
  </h1>

  {/* Right */}
  <div className="flex items-center gap-4">

    {/* Name */}
    <span className="text-white/80 text-sm font-medium">
      {studentName}
    </span>

    {/* Avatar (minimal) */}
    <div className="w-8 h-8 rounded-full bg-white/20 flex items-center justify-center text-sm font-semibold">
      {studentName[0]?.toUpperCase()}
    </div>

    {/* Divider */}
    <div className="w-px h-6 bg-white/20"></div>

    {/* Logout */}
    <button
      onClick={() => navigate("/")}
      className="text-sm text-white/70 hover:text-white transition"
    >
      Logout
    </button>

  </div>
</div>

      {/* 👋 WELCOME SECTION */}
      <div className="p-6">
        <h2 className="text-3xl font-bold mb-2">
          Welcome, {studentName} 👋
        </h2>
        <p className="text-purple-200 mb-6">
          Here are your registered events. Stay active and keep learning!
        </p>

        {/* EVENTS GRID */}
        {events.length === 0 ? (
          <p className="text-lg">No events found</p>
        ) : (
          <div className="grid gap-5 md:grid-cols-2 lg:grid-cols-3">
            {events.map((e, i) => (
              <div
                key={i}
                className="bg-white/10 backdrop-blur-lg p-5 rounded-xl shadow-lg hover:scale-105 transition duration-200"
              >
                <h2 className="text-xl font-semibold mb-2 text-purple-200">
                  {e.eventName}
                </h2>

                <p>
                  <strong>📍 Location:</strong> {e.eventLocation}
                </p>

                <p>
                  <strong>📅 Date:</strong> {e.eventDate}
                </p>

                <p className="mt-2 text-sm text-gray-200">
                  {e.eventDescription}
                </p>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}