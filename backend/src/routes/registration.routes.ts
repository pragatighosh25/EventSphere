import express from "express";

import { registerForEvent } from "../controllers/registration.controller.js";

const router = express.Router();

router.post("/", registerForEvent);

export default router;