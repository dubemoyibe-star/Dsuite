import express from 'express';
import { getRooms, getRoomById } from '../controllers/roomsControllers.js';

export const roomsRouter = express.Router();

roomsRouter.get('/rooms', getRooms);
roomsRouter.get('/rooms/:id', getRoomById);