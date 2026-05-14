import { Request, Response } from "express";

import { prisma } from "../config/prisma.js";

export const verifyTicket = async (
  req: Request,
  res: Response
) => {
  try {
    const { registrationId } = req.body;

    const registration =
      await prisma.registration.findUnique({
        where: {
          id: registrationId,
        },

        include: {
          user: true,
          event: true,
        },
      });

    if (!registration) {
      return res.status(404).json({
        success: false,
        message: "Invalid Ticket ❌",
      });
    }

    res.status(200).json({
      success: true,

      message: "Ticket Verified ✅",

      attendee:
        registration.user.name,

      email:
        registration.user.email,

      event:
        registration.event.title,
    });
  } catch (error) {
    console.log(error);

    res.status(500).json({
      success: false,
      message:
        "Ticket verification failed",
    });
  }
};