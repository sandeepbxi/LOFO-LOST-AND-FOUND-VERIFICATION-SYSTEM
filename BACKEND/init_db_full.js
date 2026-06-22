const mysql = require('mysql2/promise');
const fs = require('fs');
const path = require('path');

async function runSQL() {
  const connection = await mysql.createConnection({
    host: '127.0.0.1',
    user: 'root',
    password: '@Gagan2006',
    multipleStatements: true
  });

  try {
    const sql = fs.readFileSync(path.join(__dirname, '../lost_founddb.sql'), 'utf8');
    await connection.query(sql);
    console.log('SQL Script executed successfully');
  } catch (err) {
    console.error('Error executing SQL:', err.message);
  } finally {
    await connection.end();
  }
}

runSQL();
