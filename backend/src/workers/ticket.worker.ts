import { Worker } from "bullmq";

import { redisConnection } from "../config/redis.js";

import { generateTicket } from "../services/ticket.service.js";

const ticketWorker = new Worker(
  "ticketQueue",

  async (job) => {
    console.log(
      "Generating Ticket..."
    );

    const {
      registrationId,
      eventTitle,
      userEmail,
    } = job.data;

    const filePath =
      await generateTicket(
        registrationId,
        eventTitle,
        userEmail
      );

    console.log(
      `Ticket generated at ${filePath}`
    );
  },

  {
    connection: redisConnection,
    concurrency: 3,
  }
);

ticketWorker.on(
  "completed",
  (job) => {
    console.log(
      `Ticket Job ${job.id} completed`
    );
  }
);

ticketWorker.on(
  "failed",
  (job, err) => {
    console.log(err);
  }
);