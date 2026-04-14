import { useState } from "react";
import { useNavigate } from "react-router-dom";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleLogin = () => {
    fetch("http://localhost:8082/student/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        email: email.trim(),
        password: password.trim()
      })
    })
      .then(async res => {
        const text = await res.text();
        if (!res.ok) throw new Error(text);
        return text ? JSON.parse(text) : null;
      })
      .then(data => {
        if (data === null) {
          alert("Invalid credentials");
          return;
        }

        navigate("/student/events", { state: { events: data } });
      })
      .catch(err => {
        alert(err.message);
      });
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-purple-900 via-indigo-900 to-black text-white">

      <form className="w-[560px] bg-white/5 backdrop-blur-xl p-10 rounded-2xl shadow-2xl border border-white/10">

        <h2 className="text-2xl font-semibold mb-2">
          Welcome back
        </h2>

        <p className="text-sm text-gray-400 mb-6">
          Login to continue
        </p>

        <input
          type="email"
          placeholder="Email"
          value={email}
          className="w-full mb-4 p-3.5 rounded-lg bg-white/10 border border-white/10 focus:outline-none focus:ring-2 focus:ring-purple-500"
          onChange={(e) => setEmail(e.target.value)}
        />

        <input
          type="password"
          placeholder="Password"
          value={password}
          className="w-full mb-5 p-3.5 rounded-lg bg-white/10 border border-white/10 focus:outline-none focus:ring-2 focus:ring-purple-500"
          onChange={(e) => setPassword(e.target.value)}
        />

        <button
          type="button"
          onClick={handleLogin}
          className="w-full bg-gradient-to-r from-purple-500 to-pink-500 py-3.5 rounded-lg font-semibold hover:opacity-90 transition"
        >
          Login
        </button>

        <p className="text-sm text-gray-400 mt-5 text-center">
          Don't have an account?{" "}
          <span
            className="text-purple-400 cursor-pointer"
            onClick={() => navigate("/student/register")}
          >
            Register
          </span>
        </p>

      </form>
    </div>
  );
}