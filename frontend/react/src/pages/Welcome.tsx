import { useNavigate } from "react-router-dom";

export default function Welcome() {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-900 via-indigo-900 to-black text-white overflow-hidden">
      {/* Animated background elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute -top-40 -right-40 w-80 h-80 bg-purple-500/20 rounded-full blur-3xl animate-pulse" />
        <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-indigo-500/20 rounded-full blur-3xl animate-pulse delay-700" />
      </div>

      {/* Content */}
      <div className="relative z-10 py-16 md:py-20 px-4 min-h-screen flex flex-col justify-center">
        <div className="max-w-5xl w-full mx-auto">
          {/* Header */}
          <div className="text-center mb-12 animate-fade-in">
            <div className="flex flex-col items-center justify-center mb-8">
              <p className="text-white/60 text-sm font-semibold uppercase tracking-widest mb-3">Welcome to</p>
              <h2 className="text-3xl md:text-4xl font-bold tracking-wide mb-2">
                <span className="bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent">Student Event Manager</span>
              </h2>
              <div className="w-16 h-1 bg-gradient-to-r from-purple-400 via-pink-400 to-purple-400 rounded-full"></div>
            </div>
            
            <h1 className="text-4xl md:text-5xl font-bold mb-6 leading-tight tracking-tight">
              <span className="block text-white mb-2">Manage Your Events</span>
              <span className="block bg-gradient-to-r from-purple-400 via-pink-400 to-purple-400 bg-clip-text text-transparent">Beautifully & Efficiently</span>
            </h1>
            
            <p className="text-lg text-purple-200 mb-2 max-w-2xl mx-auto">
              Connect with fellow students and faculty members through an intuitive event management platform.
            </p>
            <p className="text-sm text-white/60">Choose your role to get started</p>
          </div>

          {/* Role Selection Cards */}
          <div className="grid md:grid-cols-2 gap-8 mb-8">
            {/* Student Card */}
            <div 
              onClick={() => navigate("/student/login")}
              className="group cursor-pointer bg-white/5 backdrop-blur-lg border border-white/10 rounded-2xl p-8 hover:bg-white/10 transition-all duration-300 hover:scale-105 hover:shadow-2xl animate-slide-up"
            >
              <div className="flex items-center justify-center w-16 h-16 rounded-xl bg-gradient-to-br from-blue-400 to-cyan-400 mb-6 group-hover:scale-110 transition-transform">
                <svg width="32" height="32" fill="white" viewBox="0 0 24 24">
                  <path d="M12 12c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm0 2c-2.67 0-8 1.34-8 4v2h16v-2c0-2.66-5.33-4-8-4z"/>
                </svg>
              </div>
              
              <h2 className="text-2xl font-semibold mb-2 group-hover:text-cyan-300 transition-colors">
                Student
              </h2>
              
              <p className="text-white/70 mb-6 text-sm">
                Discover events, register for activities, and stay connected with campus happenings.
              </p>
              
              <div className="flex items-center text-cyan-400 text-sm font-medium">
                Login as Student
                <svg className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
                </svg>
              </div>
            </div>

            {/* Faculty Card */}
            <div 
              onClick={() => navigate("/faculty/login")}
              className="group cursor-pointer bg-white/5 backdrop-blur-lg border border-white/10 rounded-2xl p-8 hover:bg-white/10 transition-all duration-300 hover:scale-105 hover:shadow-2xl animate-slide-up delay-100"
            >
              <div className="flex items-center justify-center w-16 h-16 rounded-xl bg-gradient-to-br from-orange-400 to-pink-400 mb-6 group-hover:scale-110 transition-transform">
                <svg width="32" height="32" fill="white" viewBox="0 0 24 24">
                  <path d="M12 12c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm0 2c-2.67 0-8 1.34-8 4v2h16v-2c0-2.66-5.33-4-8-4z"/>
                  <path d="M17.5 13c1.1 0 2 .9 2 2v3h-2v-3c0-.55.45-1 1-1z"/>
                </svg>
              </div>
              
              <h2 className="text-2xl font-semibold mb-2 group-hover:text-orange-300 transition-colors">
                Faculty
              </h2>
              
              <p className="text-white/70 mb-6 text-sm">
                Create and manage events, track registrations, and engage with your department.
              </p>
              
              <div className="flex items-center text-orange-400 text-sm font-medium">
                Login as Faculty
                <svg className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
                </svg>
              </div>
            </div>
          </div>

          {/* Footer Info */}
          <div className="text-center text-white/50 text-sm">
            <p>Secure • Fast • Reliable</p>
          </div>
        </div>
      </div>

      {/* CSS for animations */}
      <style>{`
        @keyframes fade-in {
          from { opacity: 0; }
          to { opacity: 1; }
        }
        @keyframes slide-up {
          from { 
            opacity: 0;
            transform: translateY(20px);
          }
          to { 
            opacity: 1;
            transform: translateY(0);
          }
        }
        .animate-fade-in {
          animation: fade-in 0.6s ease-out;
        }
        .animate-slide-up {
          animation: slide-up 0.6s ease-out;
        }
        .delay-100 {
          animation-delay: 0.1s;
        }
        .delay-700 {
          animation-delay: 0.7s;
        }
      `}</style>
    </div>
  );
}