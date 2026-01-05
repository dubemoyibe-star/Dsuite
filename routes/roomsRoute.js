import express from 'express';
import { getRooms, getRoomById } from '../controllers/roomsControllers.js';

export const roomsRouter = express.Router();

roomsRouter.get('/', getRooms);
roomsRouter.get('/:id', getRoomById);