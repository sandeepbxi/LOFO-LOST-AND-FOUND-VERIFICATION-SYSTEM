const express = require('express');
const router = express.Router();
const pool = require('../config/db');
const { authMiddleware } = require('../middleware/authMiddleware');

// Get all items (discover)
router.get('/items', async (req, res) => {
  try {
    const [items] = await pool.query(`
      SELECT i.*, fr.found_id, fr.status, u.name as reporter_name 
      FROM Items i 
      JOIN Found_Reports fr ON i.item_id = fr.item_id
      JOIN Users u ON fr.user_id = u.user_id
      WHERE fr.status = 'Open'
    `);
    res.json(items);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Get found reports
router.get('/found', async (req, res) => {
  try {
    const [reports] = await pool.query('SELECT * FROM Found_Reports');
    res.json(reports);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Get lost reports
router.get('/lost', async (req, res) => {
  try {
    const [reports] = await pool.query('SELECT * FROM Lost_Reports');
    res.json(reports);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Report Item
router.post('/report', authMiddleware, async (req, res) => {
  const { category, color, description, type } = req.body;
  const user_id = req.user.user_id;

  const connection = await pool.getConnection();
  try {
    await connection.beginTransaction();

    const [itemResult] = await connection.query(
      'INSERT INTO Items (category, color, description) VALUES (?, ?, ?)',
      [category, color, description]
    );
    const item_id = itemResult.insertId;

    if (type === 'found') {
      await connection.query(
        'INSERT INTO Found_Reports (user_id, item_id, status) VALUES (?, ?, ?)',
        [user_id, item_id, 'Open']
      );
    } else {
      await connection.query(
        'INSERT INTO Lost_Reports (user_id, item_id, lost_date) VALUES (?, ?, NOW())',
        [user_id, item_id]
      );
    }

    await connection.commit();
    res.status(201).json({ message: 'Report created successfully', item_id });
  } catch (err) {
    await connection.rollback();
    res.status(500).json({ error: err.message });
  } finally {
    connection.release();
  }
});

module.exports = router;
