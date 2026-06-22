const express = require('express');
const router = express.Router();
const pool = require('../config/db');
const { authMiddleware, adminMiddleware } = require('../middleware/authMiddleware');

// Get all claims for admin
router.get('/claims', authMiddleware, adminMiddleware, async (req, res) => {
  try {
    const [claims] = await pool.query(`
      SELECT cr.*, i.category, i.description, fr.item_id, u.name as claimant_name
      FROM Claim_Requests cr
      JOIN Found_Reports fr ON cr.found_id = fr.found_id
      JOIN Items i ON fr.item_id = i.item_id
      JOIN Users u ON cr.claimant_id = u.user_id
    `);
    res.json(claims);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Process Claim (Approve/Reject)
router.post('/decision', authMiddleware, adminMiddleware, async (req, res) => {
  const { claim_id, decision, reason } = req.body;
  const admin_id = req.user.user_id;

  try {
    // Set session variable for trigger if needed, or the procedure handles it.
    // The procedure process_claim(claim_id, decision, reason) uses @current_admin_id or defaults.
    // To be precise, let's set it.
    await pool.query('SET @current_admin_id = ?', [admin_id]);
    
    await pool.query('CALL process_claim(?, ?, ?)', [claim_id, decision, reason]);
    
    res.json({ message: `Claim ${decision.toLowerCase()}ed successfully` });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;
