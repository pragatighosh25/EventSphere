import express from "express";

import {
  getUserTickets,
} from "../controllers/user.controller.js";

const router = express.Router();

router.get(
  "/:id/tickets",
  getUserTickets
);

export default router;