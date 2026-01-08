import express from "express";
import { getMessages } from "../controllers/messagesController.js";

export const messagesRouter = express.Router();

messagesRouter.post('/', getMessages);