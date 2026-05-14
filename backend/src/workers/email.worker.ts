import { Worker } from "bullmq";

import { redisConnection } from "../config/redis.js";
import { getIO } from "../config/socket.js";

import { sendRegistrationEmail } from "../services/email.service.js";

const emailWorker = new Worker(
  "emailQueue",

  async (job) => {
    console.log("Processing Email Job...");

    const { email, eventTitle } =
      job.data;

    const io = getIO();
    await sendRegistrationEmail(
      email,
      eventTitle
    );
    io.emit("emailSent", {
  email,
  eventTitle,
});
    console.log(
      `Email sent to ${email}`
    );
  },

  {
    connection: redisConnection,
    concurrency: 5,
  }
);

emailWorker.on("completed", (job) => {
  console.log(
    `Job ${job.id} completed successfully`
  );
});

emailWorker.on("failed", (job, err) => {
  console.log(
    `Job ${job?.id} failed`,
    err
  );
});