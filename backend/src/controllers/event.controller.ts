import { Request, Response } from "express";
import { prisma } from "../config/prisma.js";

export const createEvent = async (
  req: Request,
  res: Response
) => {
  try {
    const {
      title,
      description,
      location,
      date,
      organizerId,
    } = req.body;

    const event = await prisma.event.create({
      data: {
        title,
        description,
        location,
        date: new Date(date),
        organizerId,
      },
    });

    res.status(201).json({
      success: true,
      event,
    });
  } catch (error) {
    console.log(error);

    res.status(500).json({
      success: false,
      message: "Failed to create event",
    });
  }
};

export const getAllEvents = async (
  req: Request,
  res: Response
) => {
  try {
    const events = await prisma.event.findMany({
      include: {
        organizer: true,
      },
    });

    res.status(200).json({
      success: true,
      events,
    });
  } catch (error) {
    console.log(error);

    res.status(500).json({
      success: false,
      message: "Failed to fetch events",
    });
  }
};

export const getEventById = async (
  req: Request,
  res: Response
) => {
  try {
    const id  = req.params.id as string;

    const event = await prisma.event.findUnique({
      where: { id },
      include: {
        organizer: true,
        registrations: true,
      },
    });

    if (!event) {
      return res.status(404).json({
        success: false,
        message: "Event not found",
      });
    }

    res.status(200).json({
      success: true,
      event,
    });
  } catch (error) {
    console.log(error);

    res.status(500).json({
      success: false,
      message: "Failed to fetch event",
    });
  }
};