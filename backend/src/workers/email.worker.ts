import { Worker } from "bullmq";

import { redisConnection } from "../config/redis.js";

const emailWorker = new Worker(
  "emailQueue",

  async (job) => {
    console.log("Processing Email Job...");

    console.log(job.data);

    await new Promise((resolve) =>
      setTimeout(resolve, 3000)
    );

    console.log(
      `Email sent to ${job.data.email}`
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