import { Request, Response } from "express";

import { prisma } from "../config/prisma.js";
import { emailQueue } from "../queues/email.queue.js";

export const registerForEvent = async (
  req: Request,
  res: Response
) => {
  try {
    const { userId, eventId } = req.body;

    const registration =
      await prisma.registration.create({
        data: {
          userId,
          eventId,
        },
      });

    const user = await prisma.user.findUnique({
      where: { id: userId },
    });

    const event = await prisma.event.findUnique({
      where: { id: eventId },
    });

    await emailQueue.add(
      "sendRegistrationEmail",
      {
        email: user?.email,
        eventTitle: event?.title,
      },
      {
        attempts: 3,

        backoff: {
          type: "exponential",
          delay: 2000,
        },
      }
    );

    res.status(201).json({
      success: true,
      registration,
      message:
        "Registered successfully. Email queued.",
    });
  } catch (error) {
    console.log(error);

    res.status(500).json({
      success: false,
      message: "Registration failed",
    });
  }
};