import { getDbConnection } from "./db.js";


async function updateTable() {
  const db = await getDbConnection();

  try {
    await db.run(`
      UPDATE rooms SET thumbnails = '[
      "presidential-bathroom.jpg",
      "presidential-desk.jpg",
      "presidential-lounge.jpg"
      "presidential-balcony.jpg"
    ]'    WHERE id = 5;
    `);

    console.log("Room thumbails updated successfully");
  } catch (error) {
    console.error("Error updating room images:", error);
  } finally {
    await db.close();
  }
}

updateTable();