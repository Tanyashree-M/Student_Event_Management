// src/components/ForgotPasswordModal.tsx
import { useState } from "react";
import FloatInput from "./FloatInput";
import GradientButton from "./GradientButton";

type Props = {
  isOpen: boolean;
  onClose: () => void;
  onSubmit?: (email: string) => void;
};

export default function ForgotPasswordModal({ isOpen, onClose, onSubmit }: Props) {
  const [email, setEmail]     = useState<string>("");
  const [sent, setSent]       = useState<boolean>(false);
  const [loading, setLoading] = useState<boolean>(false);

  if (!isOpen) return null;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) return;
    setLoading(true);
    await new Promise((r) => setTimeout(r, 1200));
    setLoading(false);
    setSent(true);
    onSubmit?.(email);
  };

  const handleClose = () => { setSent(false); setEmail(""); onClose(); };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm" onClick={handleClose}>
      <div className="glass rounded-2xl border border-white/10 p-8 w-full max-w-md shadow-glow-lg animate-slide-up" onClick={(e) => e.stopPropagation()}>
        {!sent ? (
          <>
            <div className="mb-6">
              <div className="w-12 h-12 rounded-2xl bg-brand-gradient flex items-center justify-center mb-4 shadow-glow">
                <svg width="22" height="22" fill="none" viewBox="0 0 24 24">
                  <rect x="3" y="11" width="18" height="11" rx="2" stroke="white" strokeWidth="2"/>
                  <path d="M7 11V7a5 5 0 0110 0v4" stroke="white" strokeWidth="2" strokeLinecap="round"/>
                </svg>
              </div>
              <h2 className="font-display text-xl font-bold text-white">Forgot Password?</h2>
              <p className="text-sm text-white/50 mt-1">Enter your email and we'll send reset instructions.</p>
            </div>
            <form onSubmit={handleSubmit} className="space-y-4">
              <FloatInput label="Email address" type="email" value={email}
                onChange={(e) => setEmail((e.target as HTMLInputElement).value)}
                required autoComplete="email"
                icon={<svg width="16" height="16" fill="none" viewBox="0 0 24 24"><path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z" stroke="currentColor" strokeWidth="1.8"/><path d="M22 6l-10 7L2 6" stroke="currentColor" strokeWidth="1.8"/></svg>}
              />
              <GradientButton type="submit" loading={loading} className="w-full">Send Reset Link</GradientButton>
              <GradientButton variant="ghost" onClick={handleClose} className="w-full text-center">Cancel</GradientButton>
            </form>
          </>
        ) : (
          <div className="text-center py-4">
            <div className="w-16 h-16 rounded-full bg-green-500/10 border border-green-500/20 flex items-center justify-center mx-auto mb-4">
              <svg width="28" height="28" fill="none" viewBox="0 0 24 24">
                <path d="M20 6L9 17l-5-5" stroke="#22c55e" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            </div>
            <h3 className="font-display text-lg font-bold text-white mb-2">Check your inbox</h3>
            <p className="text-sm text-white/50 mb-6">Reset instructions sent to <span className="text-violet-300">{email}</span></p>
            <GradientButton onClick={handleClose} className="w-full">Done</GradientButton>
          </div>
        )}
      </div>
    </div>
  );
}
