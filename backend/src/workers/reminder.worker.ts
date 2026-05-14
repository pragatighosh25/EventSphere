import { Worker } from "bullmq";

import { redisConnection } from "../config/redis.js";

import { sendRegistrationEmail } from "../services/email.service.js";

const reminderWorker = new Worker(
  "reminderQueue",

  async (job) => {
    console.log(
      "Sending Reminder Email..."
    );

    const {
      email,
      eventTitle,
    } = job.data;

    await sendRegistrationEmail(
      email,
      `Reminder: ${eventTitle}`
    );

    console.log(
      `Reminder sent to ${email}`
    );
  },

  {
    connection: redisConnection,
  }
);

reminderWorker.on(
  "completed",
  (job) => {
    console.log(
      `Reminder Job ${job.id} completed`
    );
  }
);