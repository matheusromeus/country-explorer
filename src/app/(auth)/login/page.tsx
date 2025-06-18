"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";
import { useSetAtom } from "jotai";
import { syncAuthCookieAtom } from "@/atoms/authAtoms";

export default function LoginForm() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const setAuth = useSetAtom(syncAuthCookieAtom);
  const router = useRouter();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (username === "a" && password === "b") {
      setAuth(true);
      router.push("/");
    } else {
      setError("Invalid credentials");
    }
  };

  return (
    <form onSubmit={handleSubmit} className="max-w-sm mx-auto p-4 space-y-4">
      <div>
        <label htmlFor="username" className="block mb-1 text-sm font-medium">
          Username
        </label>
        <input
          id="username"
          type="text"
          className="w-full p-2 border rounded"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          required
        />
      </div>

      <div>
        <label htmlFor="password" className="block mb-1 text-sm font-medium">
          Password
        </label>
        <input
          id="password"
          type="password"
          className="w-full p-2 border rounded"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />
      </div>

      {error && <p className="text-red-500 text-sm">{error}</p>}

      <button
        type="submit"
        className="w-full bg-black text-white py-2 rounded hover:bg-gray-800"
      >
        Login
      </button>
    </form>
  );
}
