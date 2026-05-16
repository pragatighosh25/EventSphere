"use client";

import Link from "next/link";

import { useRouter } from "next/navigation";

export default function Navbar() {
  const router = useRouter();

  const token =
    typeof window !== "undefined"
      ? localStorage.getItem(
          "token"
        )
      : null;

  const handleLogout = () => {
    localStorage.removeItem(
      "token"
    );

    localStorage.removeItem(
      "userId"
    );

    router.push("/login");
  };

  return (
    <nav className="fixed top-0 left-0 w-full z-50 backdrop-blur-xl bg-black/40 border-b border-white/10">
      <div className="max-w-7xl mx-auto px-8 py-4 flex items-center justify-between">
        {/* LOGO */}

        <Link
          href="/"
          className="text-3xl font-bold bg-gradient-to-r from-purple-400 to-pink-500 bg-clip-text text-transparent"
        >
          EventSphere
        </Link>

        {/* LINKS */}

        <div className="hidden md:flex items-center gap-8 text-zinc-300">
          <Link
            href="/"
            className="hover:text-white transition"
          >
            Home
          </Link>

          <Link
            href="/dashboard"
            className="hover:text-white transition"
          >
            Dashboard
          </Link>

          <Link
            href="/tickets"
            className="hover:text-white transition"
          >
            My Tickets
          </Link>

          <Link
            href="/scanner"
            className="hover:text-white transition"
          >
            Scanner
          </Link>
        </div>

        {/* AUTH */}

        <div className="flex items-center gap-4">
          {token ? (
            <button
              onClick={
                handleLogout
              }
              className="bg-white text-black px-5 py-2 rounded-xl font-semibold hover:scale-105 transition"
            >
              Logout
            </button>
          ) : (
            <>
              <Link
                href="/login"
                className="text-zinc-300 hover:text-white"
              >
                Login
              </Link>

              <Link
                href="/signup"
                className="bg-white text-black px-5 py-2 rounded-xl font-semibold hover:scale-105 transition"
              >
                Signup
              </Link>
            </>
          )}
        </div>
      </div>
    </nav>
  );
}