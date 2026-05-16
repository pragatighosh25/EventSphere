"use client";

import { useEffect, useState } from "react";

import { getEvents } from "@/lib/events";
import Link from "next/link";

import {
  Card,
  CardContent,
} from "@/components/ui/card";

type Event = {
  id: string;
  title: string;
  description: string;
  location: string;
  date: string;
};

export default function HomePage() {
  const [events, setEvents] =
    useState<Event[]>([]);

  useEffect(() => {
    fetchEvents();
  }, []);

  const fetchEvents = async () => {
    try {
      const data =
        await getEvents();

      setEvents(data);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="min-h-screen bg-black text-white">
      {/* HERO */}

      <section className="h-[70vh] flex flex-col justify-center items-center text-center px-6">
        <h1 className="text-6xl font-bold max-w-4xl leading-tight">
          Discover Amazing
          Events Near You 🚀
        </h1>

        <p className="text-zinc-400 mt-6 text-xl max-w-2xl">
          EventSphere helps you
          discover, organize, and
          manage events with
          realtime ticketing and
          async workflows.
        </p>

        <button className="mt-8 bg-white text-black px-8 py-4 rounded-2xl font-semibold text-lg hover:scale-105 transition">
          Explore Events
        </button>
      </section>

      {/* EVENTS */}

      <section className="px-8 pb-20">
        <h2 className="text-4xl font-bold mb-10">
          Upcoming Events ✨
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {events.map((event) => (
            <Link
              key={event.id}
              href={`/events/${event.id}`}
            >
            <Card
              key={event.id}
              className="bg-zinc-900 border-zinc-800 rounded-3xl overflow-hidden hover:scale-[1.02] transition"
            >
              <div className="h-48 bg-gradient-to-br from-purple-500 to-pink-500" />

              <CardContent className="p-6">
                <h3 className="text-2xl font-bold">
                  {event.title}
                </h3>

                <p className="text-zinc-400 mt-3 line-clamp-3">
                  {
                    event.description
                  }
                </p>

                <div className="mt-6 space-y-2 text-sm text-zinc-300">
                  <p>
                    📍{" "}
                    {
                      event.location
                    }
                  </p>

                  <p>
                    📅{" "}
                    {new Date(
                      event.date
                    ).toLocaleDateString()}
                  </p>
                </div>

                <button className="w-full mt-6 bg-white text-black py-3 rounded-2xl font-semibold hover:opacity-90">
                  Register Now
                </button>
              </CardContent>
            </Card>
            </Link>
          ))}
        </div>
      </section>
    </div>
  );
}