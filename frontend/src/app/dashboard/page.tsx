"use client";

import { useEffect, useState } from "react";

import { socket } from "@/lib/socket";

import {
  Card,
  CardContent,
} from "@/components/ui/card";

type Activity = {
  type: string;
  message: string;
};

export default function DashboardPage() {
  const [activities, setActivities] =
    useState<Activity[]>([]);

  useEffect(() => {
    socket.on(
      "emailSent",
      (data) => {
        setActivities((prev) => [
          {
            type: "email",
            message: `📩 Email sent to ${data.email}`,
          },
          ...prev,
        ]);
      }
    );

    socket.on(
      "ticketGenerated",
      (data) => {
        setActivities((prev) => [
          {
            type: "ticket",
            message: `🎟️ Ticket generated for ${data.eventTitle}`,
          },
          ...prev,
        ]);
      }
    );

    return () => {
      socket.off("emailSent");
      socket.off(
        "ticketGenerated"
      );
    };
  }, []);

  return (
    <div className="min-h-screen bg-black text-white p-8">
      <h1 className="text-4xl font-bold mb-8">
        Event Dashboard 🚀
      </h1>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        <Card className="bg-zinc-900 border-zinc-800">
          <CardContent className="p-6">
            <h2 className="text-xl font-semibold">
              Live Queue Events
            </h2>

            <p className="text-4xl mt-4">
              {activities.length}
            </p>
          </CardContent>
        </Card>

        <Card className="bg-zinc-900 border-zinc-800">
          <CardContent className="p-6">
            <h2 className="text-xl font-semibold">
              Email Worker
            </h2>

            <p className="text-green-400 mt-4">
              Active
            </p>
          </CardContent>
        </Card>

        <Card className="bg-zinc-900 border-zinc-800">
          <CardContent className="p-6">
            <h2 className="text-xl font-semibold">
              Ticket Worker
            </h2>

            <p className="text-green-400 mt-4">
              Active
            </p>
          </CardContent>
        </Card>
      </div>

      <Card className="bg-zinc-900 border-zinc-800">
        <CardContent className="p-6">
          <h2 className="text-2xl font-bold mb-4">
            Live Activity Feed ⚡
          </h2>

          <div className="space-y-4">
            {activities.map(
              (activity, index) => (
                <div
                  key={index}
                  className="bg-zinc-800 p-4 rounded-xl"
                >
                  {activity.message}
                </div>
              )
            )}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}