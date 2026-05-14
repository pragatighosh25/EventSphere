import { createBullBoard } from "@bull-board/api";

import { BullMQAdapter } from "@bull-board/api/bullMQAdapter";

import { ExpressAdapter } from "@bull-board/express";

import { emailQueue } from "../queues/email.queue.js";
import { ticketQueue } from "../queues/ticket.queue.js";
import { reminderQueue } from "../queues/reminder.queue.js";

const serverAdapter =
  new ExpressAdapter();

serverAdapter.setBasePath("/admin/queues");

createBullBoard({
  queues: [
    new BullMQAdapter(emailQueue),
    new BullMQAdapter(ticketQueue),
    new BullMQAdapter(reminderQueue),
  ],

  serverAdapter,
});

export { serverAdapter };