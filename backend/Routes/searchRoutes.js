import express from "express";
import { pool } from "../Database/db.js";
const router = express.Router();

// GET /api/search?query=...
router.get("/", async (req, res) => {
  const { query } = req.query || {};
  const value = `%${query || ''}%`;

  const sql = `
    SELECT 
      Id,
      Book,
      DocNum,
      Date,
      Status,
      Shipper,
      Country,
      ContactPerson,
      E_Mail
    FROM Shipments
    WHERE 
      DocNum LIKE ? OR
      Shipper LIKE ? OR
      ContactPerson LIKE ? OR
      E_Mail LIKE ? OR
      Book LIKE ? OR
      Country LIKE ?
  `;

  try {
    const [rows] = await pool.execute(sql, [value, value, value, value, value, value]);
    return res.json(rows);
  } catch (err) {
    console.error("Search query error:", err);
    return res.status(500).json({ error: "Database error" });
  }
});

export default router;