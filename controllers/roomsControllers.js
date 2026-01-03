import { getDbConnection  } from "../db.js";

export async function getRooms(req, res) {
 
 try {
   const db = await getDbConnection()
   const rooms = await db.all('SELECT * FROM rooms');
   res.status(200).json(rooms);
 } catch (error) {
   res.status(500).json({ error: 'Failed to fetch rooms' });
 }
}