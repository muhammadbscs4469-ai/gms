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
    console.log('Fetching MenuCard for ShipmentId:', shipmentId);
    
    // Fetch MenuCard
    const [menuCardRows] = await pool.execute(
      `SELECT * FROM MenuCard WHERE ShipmentId = ?`,
      [shipmentId]
    );

    console.log('MenuCard rows found:', menuCardRows.length);
    if (menuCardRows.length === 0)
      return res.status(404).json({ message: "MenuCard not found" });

    const card = menuCardRows[0];
    console.log('MenuCard ID:', card.Id);

    // Fetch items
    const [items] = await pool.execute(
      `SELECT * FROM MenuCardItems WHERE MenuCardId = ?`,
      [card.Id]
    );
    console.log('Items found:', items.length);

    // Fetch route details
    const [route] = await pool.execute(
      `SELECT * FROM RouteDetails WHERE MenuCardId = ?`,
      [card.Id]
    );
    console.log('Route details found:', route.length);

    // Fetch performa invoice
    const [invoice] = await pool.execute(
      `SELECT * FROM PerformaInvoice WHERE MenuCardId = ?`,
      [card.Id]
    );
    console.log('Performa invoice found:', invoice.length);

    const responseData = {
      ...card,
      items,
      routeDetails: route[0] || {},
      proformaInvoice: invoice[0] || {},
    };

    console.log('Final response structure:', {
      hasItems: items.length > 0,
      hasRoute: route.length > 0,
      hasInvoice: invoice.length > 0,
      itemsCount: items.length,
      routeCount: route.length,
      invoiceCount: invoice.length
    });

    res.json(responseData);

  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server error" });
  }
});

export default router;
