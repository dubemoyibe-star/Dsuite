import { getDbConnection } from './db.js'

async function logTable() {
  const db = await getDbConnection();

  const tableName =  'users' //'rooms'
  {/*make sure to change table and the selected rows name here if needed*/}
  try {
    const table = await db.all(`SELECT * FROM ${tableName}`)
    console.table(table) 
  } catch (err) {
    console.error('Error fetching table:', err.message)
  } finally {
    await db.close()
  }
}

logTable()