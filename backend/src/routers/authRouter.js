import { register, login } from "../controllers/authController.js";
import asyncMiddleware from "../middlewares/asyncMiddleware.js";
import express from "express";
import authMiddleware from "../middlewares/authMiddleware.js";
import authorization from "../middlewares/roleMiddleware.js";
import typeRole from "../constants/typeRole.js";

const router = express.Router();

router.post(
  "/register",
  asyncMiddleware(authorization([typeRole.USER])),
  asyncMiddleware(authMiddleware),
  asyncMiddleware(register),
);

router.post("/login", asyncMiddleware(login));

export { router };
