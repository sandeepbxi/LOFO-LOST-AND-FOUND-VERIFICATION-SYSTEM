const express = require('express');
const router = express.Router();
const pool = require('../config/db');
const { authMiddleware } = require('../middleware/authMiddleware');

// Submit Claim (using stored procedure)
router.post('/', authMiddleware, async (req, res) => {
  const { found_id } = req.body;
  const claimant_id = req.user.user_id;

  try {
    // CALL submit_claim(found_id, claimant_id)
    await pool.query('CALL submit_claim(?, ?)', [found_id, claimant_id]);
    res.status(201).json({ message: 'Claim submitted successfully' });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Get all claims (admin or filtered by user)
router.get('/', authMiddleware, async (req, res) => {
  try {
    let query = `
      SELECT cr.*, i.category, i.description, fr.item_id, u.name as claimant_name
      FROM Claim_Requests cr
      JOIN Found_Reports fr ON cr.found_id = fr.found_id
      JOIN Items i ON fr.item_id = i.item_id
      JOIN Users u ON cr.claimant_id = u.user_id
    `;
    const params = [];

    if (req.user.role !== 'admin') {
      query += ' WHERE cr.claimant_id = ?';
      params.push(req.user.user_id);
    }

    const [claims] = await pool.query(query, params);
    res.json(claims);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Get single claim details
router.get('/:id', authMiddleware, async (req, res) => {
  const { id } = req.params;
  try {
    const [claims] = await pool.query(`
      SELECT cr.*, i.category, i.description, i.color, fr.found_id, fr.item_id, u.name as claimant_name
      FROM Claim_Requests cr
      JOIN Found_Reports fr ON cr.found_id = fr.found_id
      JOIN Items i ON fr.item_id = i.item_id
      JOIN Users u ON cr.claimant_id = u.user_id
      WHERE cr.claim_id = ?
    `, [id]);

    if (claims.length === 0) return res.status(404).json({ message: 'Claim not found' });

    const [evidence] = await pool.query('SELECT * FROM Claim_Evidence WHERE claim_id = ?', [id]);
    const [steps] = await pool.query('SELECT * FROM Verification_Steps WHERE claim_id = ?', [id]);

    res.json({ ...claims[0], evidence, steps });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;
