import app from "./app.js";
import { redisConnection } from "./config/redis.js";
const PORT = 5000;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});


redisConnection.on("connect", () => {
  console.log("Redis Connected");
});