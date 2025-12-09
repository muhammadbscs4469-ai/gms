import { pool } from "../Database/db.js";

// Create Menucard header
export const createMenuCard = async (data) => {
  const { ShipmentId, PONumber, Status, Shipper, TotalEUR, Date, Contact, TotalPKR, Phone, Email } = data;
  const [result] = await pool.execute(
    `INSERT INTO MenuCard (ShipmentId, PONumber, Status, Shipper, TotalEUR, Date, Contact, TotalPKR, Phone, Email)
     VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`,
    [ShipmentId, PONumber, Status, Shipper, TotalEUR, Date, Contact, TotalPKR, Phone, Email]
  );
  return result;
};

// Add Menucard item
export const addMenuCardItem = async (data) => {
  const { MenuCardId, Category, UNCode, HSCode, Storage, ItemCode, CAT, ItemName, QTY, BackQty, Currency, UnitCost, FCTotal, PKRTotal } = data;
  const [result] = await pool.execute(
    `INSERT INTO MenuCardItems (MenuCardId, Category, UNCode, HSCode, Storage, ItemCode, CAT, ItemName, QTY, BackQty, Currency, UnitCost, FCTotal, PKRTotal)
     VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`,
    [MenuCardId, Category, UNCode, HSCode, Storage, ItemCode, CAT, ItemName, QTY, BackQty, Currency, UnitCost, FCTotal, PKRTotal]
  );
  return result;
};
