import express from "express";
import cors from "cors";

import eventRoutes from "./routes/event.routes.js";
import registrationRoutes from "./routes/registration.routes.js";

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

export default app;