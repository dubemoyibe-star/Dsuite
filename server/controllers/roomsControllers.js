import { getDbConnection  } from "../db.js";

export async function getRooms(req, res) {
 console.log("Rooms route hit");
 try {
   const db = await getDbConnection()
   const rooms = await db.all('SELECT * FROM rooms');
   console.log("DB opened");
   res.status(200).json(rooms);
 } catch (error) {
   res.status(500).json({ error: 'Failed to fetch rooms' });
 }
}

export async function getRoomById(req, res) {
  const roomId = req.params.id;
  try {
    const db = await getDbConnection();
    const room = await db.get('SELECT * FROM rooms WHERE id = ?', [roomId]);
    if (room) {
      res.status(200).json(room);
    } else {
      res.status(404).json({ error: 'Room not found' });
    }
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch room' });
  }

}