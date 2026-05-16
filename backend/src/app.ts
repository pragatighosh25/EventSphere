import express from "express";
import cors from "cors";

import eventRoutes from "./routes/event.routes.js";
import registrationRoutes from "./routes/registration.routes.js";
import { serverAdapter } from "./config/bullBoard.js";
import verificationRoutes from "./routes/verification.routes.js";
import authRoutes from "./routes/auth.routes.js";

const app = express();

app.use(cors());
app.use(express.json());

app.get("/", (req, res) => {
  res.send("API Running...");
});

app.use("/api/events", eventRoutes);
app.use(
  "/api/registrations",
  registrationRoutes
);
app.use(
  "/admin/queues",
  serverAdapter.getRouter()
);
app.use(
  "/api/tickets",
  verificationRoutes
);
app.use("/api/auth", authRoutes);

export default app;