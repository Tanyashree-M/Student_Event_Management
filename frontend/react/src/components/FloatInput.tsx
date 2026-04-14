// src/components/FloatInput.tsx
import { useState, useRef, useEffect, ReactNode, ChangeEvent } from "react";

type Option = { value: string; label: string };

type FloatInputProps = {
  label: string;
  type?: "text" | "email" | "password" | "select" | "date";
  value: string;
  onChange: (e: ChangeEvent<HTMLInputElement | HTMLSelectElement>) => void;
  options?: Option[];
  error?: string;
  icon?: ReactNode;
  required?: boolean;
  autoComplete?: string;
  name?: string;
};

export default function FloatInput({
  label, type = "text", value, onChange, options,
  error, icon, required, autoComplete, name,
}: FloatInputProps) {
  const [showPwd, setShowPwd] = useState(false);
  const inputRef = useRef<HTMLSelectElement>(null);

  const handleSelectChange = (e: ChangeEvent<HTMLSelectElement>) => {
    onChange(e);
    if (e.target.value) e.target.classList.add("select-filled");
    else e.target.classList.remove("select-filled");
  };

  useEffect(() => {
    if (type === "select" && value && inputRef.current) {
      inputRef.current.classList.add("select-filled");
    }
  }, [type, value]);

  const isPassword = type === "password";
  const resolvedType = isPassword ? (showPwd ? "text" : "password") : type;

  const errClass = error ? "border-red-500 focus:shadow-[0_0_0_3px_rgba(239,68,68,0.2)]" : "";

  return (
    <div className="w-full">
      {type === "select" ? (
        <div className="float-group">
          <select
            ref={inputRef}
            name={name}
            value={value}
            onChange={handleSelectChange}
            required={required}
            className={`float-input pr-10 cursor-pointer ${errClass}`}
          >
            <option value="" disabled hidden></option>
            {options?.map((o) => (
              <option key={o.value} value={o.value}>{o.label}</option>
            ))}
          </select>
          <span className="float-label">{label}</span>
          <svg className="absolute right-4 top-1/2 -translate-y-1/2 pointer-events-none text-violet-400"
            width="16" height="16" fill="none" viewBox="0 0 24 24">
            <path d="M6 9l6 6 6-6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
        </div>
      ) : (
        <div className="float-group">
          {icon && (
            <span className="absolute left-4 top-1/2 -translate-y-1/2 text-violet-400 pointer-events-none z-10">
              {icon}
            </span>
          )}
          <input
            name={name}
            type={resolvedType as string}
            value={value}
            onChange={onChange as (e: ChangeEvent<HTMLInputElement>) => void}
            placeholder=" "
            required={required}
            autoComplete={autoComplete}
            className={`float-input ${icon ? "pl-11" : ""} ${isPassword ? "pr-12" : ""} ${errClass}`}
          />
          <span className={`float-label ${icon ? "left-11" : ""}`}>{label}</span>
          {isPassword && (
            <button type="button" onClick={() => setShowPwd((p) => !p)}
              className="absolute right-4 top-1/2 -translate-y-1/2 text-violet-400 hover:text-violet-200 transition-colors"
              tabIndex={-1} aria-label={showPwd ? "Hide password" : "Show password"}>
              {showPwd ? (
                <svg width="18" height="18" fill="none" viewBox="0 0 24 24">
                  <path d="M17.94 17.94A10.07 10.07 0 0112 20c-7 0-11-8-11-8a18.45 18.45 0 015.06-5.94" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round"/>
                  <path d="M9.9 4.24A9.12 9.12 0 0112 4c7 0 11 8 11 8a18.5 18.5 0 01-2.16 3.19" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round"/>
                  <path d="M1 1l22 22M10.73 10.73A3 3 0 0013.27 13.27" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round"/>
                </svg>
              ) : (
                <svg width="18" height="18" fill="none" viewBox="0 0 24 24">
                  <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z" stroke="currentColor" strokeWidth="1.8"/>
                  <circle cx="12" cy="12" r="3" stroke="currentColor" strokeWidth="1.8"/>
                </svg>
              )}
            </button>
          )}
        </div>
      )}
      {error && (
        <p className="mt-1.5 text-xs text-red-400 flex items-center gap-1">
          <svg width="12" height="12" fill="none" viewBox="0 0 24 24">
            <circle cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="2"/>
            <path d="M12 8v4M12 16h.01" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
          </svg>
          {error}
        </p>
      )}
    </div>
  );
}
