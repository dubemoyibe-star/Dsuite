import sqlite3 from 'sqlite3'
import { open } from 'sqlite'
import path from 'node:path'
import { getDbConnection } from './db.js'

async function logTable() {
  const db = await getDbConnection();

  const tableName = 'rooms'
  {/*make sure to change table and the selected rows name here if needed*/}
  try {
    const table = await db.all(`SELECT id, name, description, image_url FROM ${tableName}`)
    console.table(table) 
  } catch (err) {
    console.error('Error fetching table:', err.message)
  } finally {
    await db.close()
  }
}

logTable()