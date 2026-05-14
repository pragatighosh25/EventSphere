import http from "http";

import app from "./app.js";

import { prisma } from "./config/prisma.js";
import { redisConnection } from "./config/redis.js";

import { initSocket } from "./config/socket.js";

const PORT = 5000;

// Create HTTP Server
const server = http.createServer(app);

// Initialize Socket.io
initSocket(server);

// Prisma Connection
async function testDB() {
  try {
    await prisma.$connect();

    console.log(
      "Database Connected"
    );
  } catch (error) {
    console.log(error);
  }
}

testDB();

// Redis Connection
redisConnection.on(
  "connect",
  () => {
    console.log(
      "Redis Connected"
    );
  }
);

// Start Server
server.listen(PORT, () => {
  console.log(
    `Server running on port ${PORT}`
  );
});