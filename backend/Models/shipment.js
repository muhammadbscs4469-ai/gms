import { pool } from "../Database/db.js";

// Create a shipment
export const createShipment = async (data) => {
  const { Book, DocNum, Date, Status, Shipper, Country, ContactPerson, E_Mail, Options } = data;
  const [result] = await pool.execute(
    `INSERT INTO Shipments (Book, DocNum, Date, Status, Shipper, Country, ContactPerson, E_Mail, Options) 
     VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)`,
    [Book, DocNum, Date, Status, Shipper, Country, ContactPerson, E_Mail, Options]
  );
  return {
    shipmentId: result.insertId,
    message: 'Shipment created successfully'
  };
};

// Get all shipments
export const getShipments = async () => {
  const [rows] = await pool.execute(`SELECT * FROM Shipments`);
  return rows;
};
