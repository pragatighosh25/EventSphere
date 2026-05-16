"use client";

import { useEffect, useState } from "react";

import { api } from "@/lib/api";

import {
  Card,
  CardContent,
} from "@/components/ui/card";

type Ticket = {
  id: string;

  event: {
    title: string;
    location: string;
    date: string;
  };
};

export default function TicketsPage() {
  const [tickets, setTickets] =
    useState<Ticket[]>([]);

  useEffect(() => {
    fetchTickets();
  }, []);

  const fetchTickets = async () => {
    try {
      const userId =
        localStorage.getItem(
          "userId"
        );

      const res = await api.get(
        `/users/${userId}/tickets`
      );

      setTickets(
        res.data.registrations
      );
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="min-h-screen bg-black text-white p-8">
      <h1 className="text-5xl font-bold mb-10">
        My Tickets 🎟️
      </h1>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {tickets.map((ticket) => (
          <Card
            key={ticket.id}
            className="bg-zinc-900 border-zinc-800 rounded-3xl overflow-hidden"
          >
            <div className="h-40 bg-gradient-to-br from-cyan-500 to-blue-500" />

            <CardContent className="p-6">
              <h2 className="text-2xl font-bold">
                {
                  ticket.event.title
                }
              </h2>

              <div className="mt-4 space-y-2 text-zinc-300">
                <p>
                  📍{" "}
                  {
                    ticket.event
                      .location
                  }
                </p>

                <p>
                  📅{" "}
                  {new Date(
                    ticket.event.date
                  ).toLocaleString()}
                </p>
              </div>

              <a
                href={`http://localhost:5000/tickets/${ticket.id}.pdf`}
                target="_blank"
                className="block mt-6 bg-white text-black text-center py-3 rounded-2xl font-semibold"
              >
                View Ticket PDF
              </a>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}