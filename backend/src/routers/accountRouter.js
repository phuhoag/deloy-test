import {
  createAccount,
  getAccounts,
  getAccountById,
  updateAccount,
  deleteAccount,
} from "../controllers/accountController.js";
import express from "express";
import asyncMiddleware from "../middlewares/asyncMiddleware.js";

const router = express.Router();
router.post("/", asyncMiddleware(createAccount));
router.get("/", asyncMiddleware(getAccounts));
router.get("/:id", asyncMiddleware(getAccountById));
router.put("/:id", asyncMiddleware(updateAccount));
router.delete("/:id", asyncMiddleware(deleteAccount));

export { router };
