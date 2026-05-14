import express from "express";

import {
  verifyTicket,
} from "../controllers/verification.controller.js";

const router = express.Router();

router.post("/verify", verifyTicket);

export default router;