import express from 'express';
import { getRooms } from '../controllers/roomsControllers.js';

export const roomsRouter = express.Router();

roomsRouter.get('/rooms', getRooms);