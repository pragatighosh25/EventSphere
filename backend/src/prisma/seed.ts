import { PrismaClient } from "@prisma/client";

import bcrypt from "bcryptjs";

const prisma = new PrismaClient();

async function main() {

  // Clear old data

  await prisma.registration.deleteMany();

  await prisma.event.deleteMany();

  await prisma.user.deleteMany();

  // Password

  const hashedPassword =
    await bcrypt.hash("123456", 10);

  // ORGANIZER

  const organizer =
    await prisma.user.create({
      data: {
        name: "Pragati",
        email:
          "organizer@gmail.com",
        password:
          hashedPassword,
        role: "ORGANIZER",
      },
    });

  // ATTENDEES

  const attendee1 =
    await prisma.user.create({
      data: {
        name: "Rahul",
        email: "rahul@gmail.com",
        password:
          hashedPassword,
        role: "ATTENDEE",
      },
    });

  const attendee2 =
    await prisma.user.create({
      data: {
        name: "Ananya",
        email:
          "ananya@gmail.com",
        password:
          hashedPassword,
        role: "ATTENDEE",
      },
    });

  // EVENTS

  const event1 =
    await prisma.event.create({
      data: {
        title:
          "Tech Summit 2026",

        description:
          "India's biggest tech conference with AI, Web3, and startup founders.",

        location: "Bangalore",

        date: new Date(
          "2026-08-10"
        ),

        organizerId:
          organizer.id,
      },
    });

  const event2 =
    await prisma.event.create({
      data: {
        title:
          "DesignX UI/UX Fest",

        description:
          "A premium design conference for UI/UX designers and creators.",

        location: "Mumbai",

        date: new Date(
          "2026-09-15"
        ),

        organizerId:
          organizer.id,
      },
    });

  const event3 =
    await prisma.event.create({
      data: {
        title:
          "HackTheFuture Hackathon",

        description:
          "24-hour national hackathon with amazing prizes and networking.",

        location: "Delhi",

        date: new Date(
          "2026-10-05"
        ),

        organizerId:
          organizer.id,
      },
    });

  // REGISTRATIONS

  await prisma.registration.create({
    data: {
      userId: attendee1.id,
      eventId: event1.id,
    },
  });

  await prisma.registration.create({
    data: {
      userId: attendee2.id,
      eventId: event1.id,
    },
  });

  await prisma.registration.create({
    data: {
      userId: attendee1.id,
      eventId: event2.id,
    },
  });

  console.log(
    "Dummy data seeded 🚀"
  );
}

main()
  .catch((e) => {
    console.log(e);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });