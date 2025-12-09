import express from "express";
import { createShipment, getShipments } from "../Models/shipment.js";
const router = express.Router();

//create shipment
router.post("/", async (req, res) => {
  const result = await createShipment(req.body);
  res.json(result);
});

//get shipment
router.get("/", async (req, res) => {
  const rows = await getShipments();
  res.json(rows);
});

export default router;
