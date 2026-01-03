import { getDbConnection } from './db.js'

async function seedTable() {

  const db = await getDbConnection();

  try {

    await db.exec('BEGIN TRANSACTION')

    await db.exec(`
      INSERT INTO rooms
      (
        name,
        description,
        price_per_night,
        image_url,
        max_guests,
        beds,
        size_sqm,
        has_wifi,
        has_ac,
        has_tv,
        has_breakfast,
        is_available
      )
      VALUES
      (
        'Deluxe Room',
        'Spacious room with refined interiors and enhanced comfort.',
        45000,
        '/images/deluxe.jpg',
        2,
        1,
        35,
        1,
        1,
        1,
        1,
        1
      );
    `);
    
    await db.exec('COMMIT')
    console.log('All records inserted')

  } catch (err) {

    await db.exec('ROLLBACK')
    console.log('Error inserting data', err.message)

  } finally {

    await db.close()
    console.log('connection closed')

  }

}

seedTable()