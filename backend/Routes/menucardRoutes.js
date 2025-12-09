import express from "express";
import { pool } from "../Database/db.js";
import { createMenuCard, addMenuCardItem } from "../Models/menucard.js";

const router = express.Router();

// Create MenuCard header
router.post("/", async (req, res) => {
  const result = await createMenuCard(req.body);
  res.json(result);
});

// Add MenuCard item
router.post("/item", async (req, res) => {
  const result = await addMenuCardItem(req.body);
  res.json(result);
});

// GET full MenuCard by ShipmentId
router.get("/:shipmentId", async (req, res) => {
  const { shipmentId } = req.params;

  try {
    // Fetch MenuCard
    const [menuCardRows] = await pool.execute(
      `SELECT * FROM MenuCard WHERE ShipmentId = ?`,
      [shipmentId]
    );

    if (menuCardRows.length === 0)
      return res.status(404).json({ message: "MenuCard not found" });

    const card = menuCardRows[0];

    // Fetch items
    const [items] = await pool.execute(
      `SELECT * FROM MenuCardItems WHERE MenuCardId = ?`,
      [card.Id]
    );

    // Fetch route details
    const [route] = await pool.execute(
      `SELECT * FROM RouteDetails WHERE MenuCardId = ?`,
      [card.Id]
    );

    // Fetch performa invoice
    const [invoice] = await pool.execute(
      `SELECT * FROM PerformaInvoice WHERE MenuCardId = ?`,
      [card.Id]
    );

    res.json({
      ...card,
      items,
      routeDetails: route[0] || {},
      proformaInvoice: invoice[0] || {},
    });

  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server error" });
  }
});

export default router;
