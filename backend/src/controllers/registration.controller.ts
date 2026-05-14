import { Request, Response } from "express";

import { prisma } from "../config/prisma.js";

import { emailQueue } from "../queues/email.queue.js";
import { ticketQueue } from "../queues/ticket.queue.js";
import { reminderQueue } from "../queues/reminder.queue.js";

export const registerForEvent = async (
  req: Request,
  res: Response
) => {
  try {
    const { userId, eventId } = req.body;

    // Create Registration
    const registration =
      await prisma.registration.create({
        data: {
          userId,
          eventId,
        },
      });

    // Fetch User
    const user =
      await prisma.user.findUnique({
        where: {
          id: userId,
        },
      });

    // Fetch Event
    const event =
      await prisma.event.findUnique({
        where: {
          id: eventId,
        },
      });

    if (!user || !event) {
      return res.status(404).json({
        success: false,
        message:
          "User or Event not found",
      });
    }

    // ================================
    // 1. EMAIL QUEUE
    // ================================

    await emailQueue.add(
      "sendRegistrationEmail",
      {
        email: user.email,
        eventTitle: event.title,
      },
      {
        attempts: 3,

        backoff: {
          type: "exponential",
          delay: 2000,
        },
      }
    );

    // ================================
    // 2. TICKET GENERATION QUEUE
    // ================================

    await ticketQueue.add(
      "generateTicket",
      {
        registrationId:
          registration.id,

        eventTitle: event.title,

        userEmail: user.email,
      }
    );

    // ================================
    // 3. REMINDER QUEUE
    // ================================

    const eventDate = new Date(
      event.date
    );

    // Reminder time
    // (1 minute before event for testing)

    const reminderTime =
      eventDate.getTime() -
      1 * 60 * 1000;

    const delay =
      reminderTime - Date.now();

    if (delay > 0) {
      await reminderQueue.add(
        "sendReminder",
        {
          email: user.email,
          eventTitle: event.title,
        },
        {
          delay,
        }
      );
    }

    // ================================
    // RESPONSE
    // ================================

    res.status(201).json({
      success: true,

      registration,

      message:
        "Registered successfully. Jobs queued.",
    });
  } catch (error) {
    console.log(error);

    res.status(500).json({
      success: false,
      message: "Registration failed",
    });
  }
};