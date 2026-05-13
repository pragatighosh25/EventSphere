import app from "./app.js";
import { redisConnection } from "./config/redis.js";
import { prisma } from "./config/prisma.js";
const PORT = 5000;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});


redisConnection.on("connect", () => {
  console.log("Redis Connected");
});

async function testDB() {
  try {
    await prisma.$connect();
    console.log("Database Connected");
  } catch (error) {
    console.log(error);
  }
}

testDB();