import { useState } from "react";
import { useNavigate } from "react-router-dom";

export default function Register() {
  
  const [roll, setRoll] = useState("");
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const navigate = useNavigate();

  const handleSubmit = () => {
    fetch("http://localhost:8082/student/register", {
  method: "POST",
  headers: {
    "Content-Type": "application/json"
  },
  body: JSON.stringify({
    rollNo: roll,
    name: name,
    email: email,
    password: password
  })
})
.then(async res => {
  const text = await res.text();   
  if (!res.ok) {
    throw new Error(text);         
  }
  return text;
})
.then(data => {
      if (data === null) {
        alert("Student already registered!");
      } else {
        alert("Registration successful!");
        navigate("/login");
      }
    })
.catch(err => {
  alert(err.message);              
});
  };
  return (
  <div className="min-h-screen flex bg-gradient-to-br from-purple-900 via-indigo-900 to-black text-white">

    {/* 🔵 LEFT PANEL (MINIMAL) */}
    <div className="hidden md:flex w-1/2 items-center justify-center px-16">

      <div>
        <h1 className="text-4xl font-bold leading-tight mb-4">
          Student Event Manager
        </h1>

        <p className="text-gray-400 text-lg">
          Manage and explore events seamlessly.
        </p>
      </div>

    </div>

    {/* 🟣 RIGHT PANEL */}
    <div className="flex w-full md:w-1/2 items-center justify-center">

      <form className="w-[560px] bg-white/5 backdrop-blur-lg p-8 rounded-2xl shadow-xl">

        <h2 className="text-2xl font-semibold mb-2">
          Create account
        </h2>

        <p className="text-sm text-gray-400 mb-6">
          Register to get started
        </p>

        <input
          type="text"
          placeholder="Roll Number"
          value={roll}
          className="w-full mb-4 p-3.5 rounded-lg bg-white/10 border border-white/10 focus:outline-none focus:ring-2 focus:ring-purple-500"
          onChange={(e) => setRoll(e.target.value)}
        />

        <input
          type="text"
          placeholder="Full Name"
          value={name}
          className="w-full mb-4 p-3.5 rounded-lg bg-white/10 border border-white/10 focus:outline-none focus:ring-2 focus:ring-purple-500"
          onChange={(e) => setName(e.target.value)}
        />

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
          className="w-full mb-4 p-3.5 rounded-lg bg-white/10 border border-white/10 focus:outline-none focus:ring-2 focus:ring-purple-500"
          onChange={(e) => setPassword(e.target.value)}
        />

        <button
          type="button"
          onClick={handleSubmit}
className="w-full mt-2 bg-gradient-to-r from-purple-500 to-pink-500 py-3.5 rounded-lg font-semibold hover:opacity-90 transition"        >
          Create Account
        </button>

        <p className="text-sm text-gray-400 mt-4 text-center">
          Already have an account?{" "}
          <span
            className="text-purple-400 cursor-pointer"
            onClick={() => navigate("/student/login")}
          >
            Sign in
          </span>
        </p>

      </form>
    </div>
  </div>
);
}