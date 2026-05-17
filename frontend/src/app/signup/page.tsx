"use client";

import { useState } from "react";

import { useRouter } from "next/navigation";

import { api } from "@/lib/api";

export default function SignupPage() {
  const router = useRouter();

  const [formData, setFormData] =
    useState({
      name: "",
      email: "",
      password: "",
      role: "ATTENDEE",
    });

  const handleChange = (
    e: React.ChangeEvent<
      HTMLInputElement |
      HTMLSelectElement
    >
  ) => {
    setFormData({
      ...formData,
      [e.target.name]:
        e.target.value,
    });
  };

  const handleSignup = async (
    e: React.FormEvent
  ) => {
    e.preventDefault();

    try {
      const res = await api.post(
        "/auth/signup",
        formData
      );

      localStorage.setItem(
        "token",
        res.data.token
      );
      localStorage.setItem(
        "userId",
        res.data.user.id
      );

      router.push("/dashboard");
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="min-h-screen bg-black flex items-center justify-center text-white">
      <form
        onSubmit={handleSignup}
        className="bg-zinc-900 p-8 rounded-2xl w-[400px] space-y-4"
      >
        <h1 className="text-3xl font-bold">
          Signup 🚀
        </h1>

        <input
          type="text"
          name="name"
          placeholder="Name"
          onChange={handleChange}
          className="w-full p-3 rounded-xl bg-zinc-800"
        />

        <input
          type="email"
          name="email"
          placeholder="Email"
          onChange={handleChange}
          className="w-full p-3 rounded-xl bg-zinc-800"
        />

        <input
          type="password"
          name="password"
          placeholder="Password"
          onChange={handleChange}
          className="w-full p-3 rounded-xl bg-zinc-800"
        />

        <select
          name="role"
          onChange={handleChange}
          className="w-full p-3 rounded-xl bg-zinc-800"
        >
          <option value="ATTENDEE">
            Attendee
          </option>

          <option value="ORGANIZER">
            Organizer
          </option>
        </select>

        <button
          type="submit"
          className="w-full bg-white text-black p-3 rounded-xl font-semibold"
        >
          Create Account
        </button>
      </form>
    </div>
  );
}