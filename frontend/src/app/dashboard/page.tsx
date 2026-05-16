"use client";

import { useEffect, useState } from "react";

import axios from "axios";

import { socket } from "@/lib/socket";
import { useRouter } from "next/navigation";

import {
  Card,
  CardContent,
} from "@/components/ui/card";

import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

type Activity = {
  type: string;
  message: string;
};

export default function DashboardPage() {
  const router = useRouter();
  const [activities, setActivities] =
    useState<Activity[]>([]);

  const [stats, setStats] =
    useState({
      totalEvents: 0,
      totalUsers: 0,
      totalRegistrations: 0,
    });

  useEffect(() => {
    const token =
    localStorage.getItem("token");

  if (!token) {
    router.push("/login");
  }
    fetchStats();

    socket.on(
      "emailSent",
      (data: {
        email: string;
        eventTitle: string;
      }) => {
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
      (data: {
        registrationId: string;
        eventTitle: string;
        filePath: string;
      }) => {
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
  }, [router]);

  const fetchStats = async () => {
    try {
      const res = await axios.get(
        "http://localhost:5000/api/analytics/dashboard"
      );

      setStats(res.data.stats);
    } catch (error) {
      console.log(error);
    }
  };

  const chartData = [
    {
      name: "Events",
      value: stats.totalEvents,
    },

    {
      name: "Users",
      value: stats.totalUsers,
    },

    {
      name: "Registrations",
      value:
        stats.totalRegistrations,
    },
  ];

  return (
    <div className="min-h-screen pt-28 bg-black text-white p-8">
      <h1 className="text-4xl font-bold mb-8">
        Event Dashboard 🚀
      </h1>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        <Card className="bg-zinc-900 border-zinc-800">
          <CardContent className="p-6">
            <h2 className="text-xl font-semibold">
              Total Events
            </h2>

            <p className="text-4xl mt-4">
              {stats.totalEvents}
            </p>
          </CardContent>
        </Card>

        <Card className="bg-zinc-900 border-zinc-800">
          <CardContent className="p-6">
            <h2 className="text-xl font-semibold">
              Users
            </h2>

            <p className="text-4xl mt-4">
              {stats.totalUsers}
            </p>
          </CardContent>
        </Card>

        <Card className="bg-zinc-900 border-zinc-800">
          <CardContent className="p-6">
            <h2 className="text-xl font-semibold">
              Registrations
            </h2>

            <p className="text-4xl mt-4">
              {
                stats.totalRegistrations
              }
            </p>
          </CardContent>
        </Card>
      </div>

      <Card className="bg-zinc-900 border-zinc-800 mb-8">
        <CardContent className="p-6 h-100">
          <h2 className="text-2xl font-bold mb-6">
            Analytics 📊
          </h2>

          <ResponsiveContainer
            width="100%"
            height="100%"
          >
            <BarChart data={chartData}>
              <XAxis dataKey="name" />

              <YAxis />

              <Tooltip />

              <Bar dataKey="value" />
            </BarChart>
          </ResponsiveContainer>
        </CardContent>
      </Card>

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