"use client";

import { useEffect, useState } from "react";

import { useParams } from "next/navigation";

import { api } from "@/lib/api";

import {
  Card,
  CardContent,
} from "@/components/ui/card";

type EventType = {
  id: string;
  title: string;
  description: string;
  location: string;
  date: string;
};

export default function EventDetailsPage() {
  const params = useParams();

  const [event, setEvent] =
    useState<EventType | null>(
      null
    );

  const [loading, setLoading] =
    useState(false);

  useEffect(() => {
    fetchEvent();
  }, []);

  const fetchEvent = async () => {
    try {
      const res = await api.get(
        `/events/${params.id}`
      );

      setEvent(res.data.event);
    } catch (error) {
      console.log(error);
    }
  };

  const handleRegister =
    async () => {
      try {
        setLoading(true);

        // TEMP USER ID
        // Later we'll get from auth token

        const userId =
          localStorage.getItem(
            "userId"
          );

        await api.post(
          "/registrations",
          {
            userId,
            eventId: event?.id,
          }
        );

        alert(
          "Registration successful 🎉"
        );
      } catch (error) {
        console.log(error);

        alert(
          "Registration failed"
        );
      } finally {
        setLoading(false);
      }
    };

  if (!event) {
    return (
      <div className="min-h-screen pt-28 bg-black text-white flex items-center justify-center">
        Loading...
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-black text-white p-8">
      <div className="max-w-4xl mx-auto">
        <div className="h-[400px] rounded-3xl bg-gradient-to-br from-purple-500 to-pink-500 mb-8" />

        <Card className="bg-zinc-900 border-zinc-800 rounded-3xl">
          <CardContent className="p-8">
            <h1 className="text-5xl font-bold">
              {event.title}
            </h1>

            <p className="text-zinc-400 mt-6 text-lg leading-relaxed">
              {
                event.description
              }
            </p>

            <div className="mt-8 space-y-4 text-lg">
              <p>
                📍{" "}
                {event.location}
              </p>

              <p>
                📅{" "}
                {new Date(
                  event.date
                ).toLocaleString()}
              </p>
            </div>

            <button
              onClick={
                handleRegister
              }
              disabled={loading}
              className="mt-10 bg-white text-black px-8 py-4 rounded-2xl font-semibold text-lg hover:scale-105 transition"
            >
              {loading
                ? "Registering..."
                : "Register Now 🚀"}
            </button>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}