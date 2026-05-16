import { Request, Response } from "express";

import { prisma } from "../config/prisma.js";

export const getUserTickets =
  async (
    req: Request,
    res: Response
  ) => {
    try {
      const id =
        req.params.id as string;

      const registrations =
        await prisma.registration.findMany({
          where: {
            userId: id,
          },

          include: {
            event: true,
          },
        });

      res.status(200).json({
        success: true,
        registrations,
      });
    } catch (error) {
      console.log(error);

      res.status(500).json({
        success: false,
        message:
          "Failed to fetch tickets",
      });
    }
  };