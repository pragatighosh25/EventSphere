import { Request, Response } from "express";

import { prisma } from "../config/prisma.js";

export const getDashboardStats =
  async (
    req: Request,
    res: Response
  ) => {
    try {
      const totalEvents =
        await prisma.event.count();

      const totalUsers =
        await prisma.user.count();

      const totalRegistrations =
        await prisma.registration.count();

      const recentEvents =
        await prisma.event.findMany({
          orderBy: {
            createdAt: "desc",
          },

          take: 5,
        });

      res.status(200).json({
        success: true,

        stats: {
          totalEvents,
          totalUsers,
          totalRegistrations,
        },

        recentEvents,
      });
    } catch (error) {
      console.log(error);

      res.status(500).json({
        success: false,
        message:
          "Failed to fetch analytics",
      });
    }
  };