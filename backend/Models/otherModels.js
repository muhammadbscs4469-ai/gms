import { pool } from "../Database/db.js";
//MenuCardItems
export const addMenuCardItem = async (data) => {
  const { MenuCardId, Category, UNCode, HSCode, Storage, ItemCode, CAT, ItemName, QTY, BackQty, Currency, UnitCost, FCTotal, PKRTotal } = data;

  if (!data || Object.keys(data).length === 0) {
    throw new Error("No MenuCardItem data provided");
  }

  const [result] = await pool.execute(
    `INSERT INTO MenuCardItems 
     (MenuCardId, Category, UNCode, HSCode, Storage, ItemCode, CAT, ItemName, QTY, BackQty, Currency, UnitCost, FCTotal, PKRTotal)
     VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`,
    [MenuCardId, Category, UNCode, HSCode, Storage, ItemCode, CAT, ItemName, QTY, BackQty, Currency, UnitCost, FCTotal, PKRTotal]
  );
  return result;
};

//RouteDetails 
export const addRouteDetail = async (data) => {
  const { MenuCardId, ShipmentMode, Incoterms, Origin } = data;

  if (!data || Object.keys(data).length === 0) {
    throw new Error("No RouteDetail data provided");
  }

  const [result] = await pool.execute(
    `INSERT INTO RouteDetails (MenuCardId, ShipmentMode, Incoterms, Origin) VALUES (?, ?, ?, ?)`,
    [MenuCardId, ShipmentMode, Incoterms, Origin]
  );
  return result;
};

// PerformaInvoice 
export const addPerformaInvoice = async (data) => {
  const { MenuCardId, POSendDate, PIReceivedDate, PINumber, AttachedPI } = data;

  if (!data || Object.keys(data).length === 0) {
    throw new Error("No PerformaInvoice data provided");
  }

  const [result] = await pool.execute(
    `INSERT INTO PerformaInvoice (MenuCardId, POSendDate, PIReceivedDate, PINumber, AttachedPI) VALUES (?, ?, ?, ?, ?)`,
    [MenuCardId, POSendDate, PIReceivedDate, PINumber, AttachedPI]
  );
  return result;
};
