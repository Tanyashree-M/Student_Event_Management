// src/components/BrandPanel.tsx
export default function BrandPanel() {
  const stats = [
    { value: "2,400+", label: "Events Managed" },
    { value: "14K",    label: "Students Tracked" },
    { value: "98%",    label: "Faculty Satisfaction" },
  ];
  const features = [
    { icon: "🗂️", text: "Centralized event dashboard" },
    { icon: "🏆", text: "Student achievement tracking" },
    { icon: "📊", text: "Real-time participation analytics" },
    { icon: "🔔", text: "Automated notifications" },
  ];

  return (
    <div className="relative hidden lg:flex flex-col justify-between h-full p-12 overflow-hidden">
      <div className="absolute top-[-80px] left-[-80px] w-[360px] h-[360px] rounded-full bg-brand/20 blur-[100px] pointer-events-none" />
      <div className="absolute bottom-[-60px] right-[-60px] w-[280px] h-[280px] rounded-full bg-violet-600/20 blur-[80px] pointer-events-none" />

      <div className="animate-slide-left anim-hidden delay-100">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-brand-gradient flex items-center justify-center shadow-glow">
            <svg width="20" height="20" fill="none" viewBox="0 0 24 24">
              <path d="M12 2L2 7l10 5 10-5-10-5z" stroke="white" strokeWidth="2" strokeLinejoin="round"/>
              <path d="M2 17l10 5 10-5" stroke="white" strokeWidth="2" strokeLinejoin="round"/>
              <path d="M2 12l10 5 10-5" stroke="white" strokeWidth="2" strokeLinejoin="round"/>
            </svg>
          </div>
          <span className="font-display font-bold text-lg text-white tracking-tight">Student Event Manager</span>
        </div>
      </div>

      <div className="space-y-8">
        <div className="animate-slide-left anim-hidden delay-200">
          <h1 className="font-display text-4xl font-bold leading-tight text-white">
            Manage events.<br />
            <span className="text-transparent bg-clip-text bg-brand-gradient2">Empower students.</span>
          </h1>
          <p className="mt-4 text-white/50 text-base leading-relaxed max-w-sm">
            The all-in-one platform for faculty to organize events, track student participation, and celebrate achievements.
          </p>
        </div>
        <div className="space-y-3 animate-slide-left anim-hidden delay-300">
          {features.map((f, i) => (
            <div key={i} className="flex items-center gap-3">
              <div className="w-8 h-8 rounded-lg glass border border-white/10 flex items-center justify-center text-sm flex-shrink-0">{f.icon}</div>
              <span className="text-sm text-white/70">{f.text}</span>
            </div>
          ))}
        </div>
      </div>

      <div className="animate-slide-left anim-hidden delay-400">
        <div className="grid grid-cols-3 gap-4">
          {stats.map((s, i) => (
            <div key={i} className="glass rounded-xl border border-white/8 p-4 text-center">
              <div className="font-display font-bold text-xl text-white">{s.value}</div>
              <div className="text-xs text-white/40 mt-0.5">{s.label}</div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
