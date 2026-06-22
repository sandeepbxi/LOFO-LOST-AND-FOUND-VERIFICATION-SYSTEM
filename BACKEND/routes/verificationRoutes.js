const express = require('express');
const router = express.Router();
const multer = require('multer');
const path = require('path');
const pool = require('../config/db');
const { authMiddleware } = require('../middleware/authMiddleware');

// Multer Config
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'uploads/');
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + path.extname(file.originalname));
  }
});

const upload = multer({ storage });

// Add Verification Step
router.post('/step', authMiddleware, async (req, res) => {
  const { claim_id, step_type } = req.body;
  try {
    await pool.query('CALL add_verification_step(?, ?)', [claim_id, step_type]);
    res.status(201).json({ message: 'Verification step added' });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Update Step Status
router.patch('/step/:id', authMiddleware, async (req, res) => {
  const { id } = req.params;
  const { step_status } = req.body;
  try {
    await pool.query('UPDATE Verification_Steps SET step_status = ? WHERE step_id = ?', [step_status, id]);
    res.json({ message: 'Step updated' });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Upload Evidence
router.post('/evidence', authMiddleware, upload.single('file'), async (req, res) => {
  const { claim_id, evidence_type, text_value } = req.body;
  const value = req.file ? req.file.path : text_value;

  try {
    await pool.query(
      'INSERT INTO Claim_Evidence (claim_id, evidence_type, value) VALUES (?, ?, ?)',
      [claim_id, evidence_type, value]
    );
    res.status(201).json({ message: 'Evidence uploaded successfully', value });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;
