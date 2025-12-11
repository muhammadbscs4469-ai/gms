import { pool } from "../Database/db.js";

// =============================================
// CUSTOMERS MODEL
// =============================================

export const createCustomer = async (data) => {
  const { customerCode, customerName, email, phone, address, city, country, status } = data;
  try {
    const [result] = await pool.execute(
      `INSERT INTO Customers (customerCode, customerName, email, phone, address, city, country, status)
       VALUES (?, ?, ?, ?, ?, ?, ?, ?)`,
      [customerCode, customerName, email, phone, address, city, country, status || 'Active']
    );
    return { customerId: result.insertId, message: 'Customer created successfully' };
  } catch (error) {
    throw new Error(`Error creating customer: ${error.message}`);
  }
};

export const getCustomers = async () => {
  try {
    const [rows] = await pool.execute(`SELECT * FROM Customers WHERE status = 'Active'`);
    return rows;
  } catch (error) {
    throw new Error(`Error fetching customers: ${error.message}`);
  }
};

export const getCustomerByCode = async (customerCode) => {
  try {
    const [rows] = await pool.execute(
      `SELECT * FROM Customers WHERE customerCode = ?`,
      [customerCode]
    );
    return rows[0];
  } catch (error) {
    throw new Error(`Error fetching customer: ${error.message}`);
  }
};

// =============================================
// ZONES MODEL
// =============================================

export const createZone = async (data) => {
  const { zoneName, city, region, status } = data;
  try {
    const [result] = await pool.execute(
      `INSERT INTO Zones (zoneName, city, region, status)
       VALUES (?, ?, ?, ?)`,
      [zoneName, city, region, status || 'Active']
    );
    return { zoneId: result.insertId, message: 'Zone created successfully' };
  } catch (error) {
    throw new Error(`Error creating zone: ${error.message}`);
  }
};

export const getZones = async () => {
  try {
    const [rows] = await pool.execute(`SELECT * FROM Zones WHERE status = 'Active'`);
    return rows;
  } catch (error) {
    throw new Error(`Error fetching zones: ${error.message}`);
  }
};

export const getZonesByCity = async (city) => {
  try {
    const [rows] = await pool.execute(
      `SELECT * FROM Zones WHERE city = ? AND status = 'Active'`,
      [city]
    );
    return rows;
  } catch (error) {
    throw new Error(`Error fetching zones: ${error.message}`);
  }
};

// =============================================
// DELIVERY CHALLANS MODEL
// =============================================

//HHHHHHHHHHHHHHHH
export const createDeliveryChallan = async (data) => {
  const { docNum, docDate, dueDate, docType, cardCode, cardName, itemCode, itemDescription, quantity, address, status } = data;

  const formatToMySQL = (input) => {
    if (!input) return null;
    const dt = new Date(input);
    if (isNaN(dt.getTime())) return null;
    return dt.toISOString().slice(0, 19).replace('T', ' ');
  };

  try {
    const docDateFormatted = formatToMySQL(docDate);
    const dueDateFormatted = formatToMySQL(dueDate);

    const [result] = await pool.execute(
      `INSERT INTO DeliveryChallans (docNum, docDate, dueDate, docType, cardCode, cardName, itemCode, itemDescription, quantity, address, status)
       VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`,
      [docNum, docDateFormatted, dueDateFormatted, docType, cardCode, cardName, itemCode, itemDescription, quantity, address, status || 'Open for Dispatch']
    );
    return { deliveryChallanId: result.insertId, message: 'Delivery Challan created successfully' };
  } catch (error) {
    throw new Error(`Error creating delivery challan: ${error.message}`);
  }
};
//gggggggg
export const getDeliveryChallans = async (filters = {}) => {
  try {
    let query = `SELECT * FROM DeliveryChallans WHERE 1=1`;
    let params = [];
    
    if (filters.status) {
      query += ` AND status = ?`;
      params.push(filters.status);
    }
    if (filters.docType) {
      query += ` AND docType = ?`;
      params.push(filters.docType);
    }
    if (filters.cardCode) {
      query += ` AND cardCode = ?`;
      params.push(filters.cardCode);
    }
    
    query += ` ORDER BY docDate DESC`;
    const [rows] = await pool.execute(query, params);
    return rows;
  } catch (error) {
    throw new Error(`Error fetching delivery challans: ${error.message}`);
  }
};

export const getDeliveryChallanById = async (id) => {
  try {
    const [rows] = await pool.execute(
      `SELECT * FROM DeliveryChallans WHERE id = ?`,
      [id]
    );
    return rows[0];
  } catch (error) {
    throw new Error(`Error fetching delivery challan: ${error.message}`);
  }
};

// =============================================
// DISPATCHES MODEL (Main Order)
// =============================================

export const createDispatch = async (data) => {
  const { dispatchCode, deliveryChallonId, sourcDocDate, docType, docNum, cardCode, cardName, dispatchType, dispatchDatetime, zone, city, handlingInfo, dispatchMode, tracking, status, createdBy } = data;
  const formatToMySQL1 = (input) => {
    if (!input) return null;
    const dt = new Date(input);
    if (isNaN(dt.getTime())) return null;
    return dt.toISOString().slice(0, 19).replace('T', ' ');
  };

  try {
        const sourceDateFormatted1 = formatToMySQL1(sourcDocDate);
    const dispatchDateFormatted1 = formatToMySQL1(dispatchDatetime);
    const [result] = await pool.execute(
      `INSERT INTO Dispatches (dispatchCode, deliveryChallonId, sourcDocDate, docType, docNum, cardCode, cardName, dispatchType, dispatchDatetime, zone, city, handlingInfo, dispatchMode, tracking, status, createdBy)
       VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`,
      [dispatchCode, deliveryChallonId, sourceDateFormatted1, docType, docNum, cardCode, cardName, dispatchType, dispatchDateFormatted1, zone, city, handlingInfo, dispatchMode, tracking, status || 'Draft', createdBy]
    );
    return { dispatchId: result.insertId, dispatchCode, message: 'Dispatch created successfully' };
  } catch (error) {
    throw new Error(`Error creating dispatch: ${error.message}`);
  }
};

export const getDispatches = async (filters = {}) => {
  try {
    let query = `SELECT * FROM Dispatches WHERE 1=1`;
    let params = [];
    
    if (filters.status) {
      query += ` AND status = ?`;
      params.push(filters.status);
    }
    if (filters.zone) {
      query += ` AND zone = ?`;
      params.push(filters.zone);
    }
    if (filters.cardCode) {
      query += ` AND cardCode = ?`;
      params.push(filters.cardCode);
    }
    
    query += ` ORDER BY dispatchDatetime DESC`;
    const [rows] = await pool.execute(query, params);
    return rows;
  } catch (error) {
    throw new Error(`Error fetching dispatches: ${error.message}`);
  }
};

export const getDispatchById = async (id) => {
  try {
    const [rows] = await pool.execute(
      `SELECT * FROM Dispatches WHERE id = ?`,
      [id]
    );
    return rows[0];
  } catch (error) {
    throw new Error(`Error fetching dispatch: ${error.message}`);
  }
};

export const updateDispatch = async (id, data) => {
  try {
    const fields = [];
    const values = [];
    
    Object.keys(data).forEach(key => {
      fields.push(`${key} = ?`);
      values.push(data[key]);
    });
    
    values.push(id);
    const query = `UPDATE Dispatches SET ${fields.join(', ')}, updatedAt = CURRENT_TIMESTAMP WHERE id = ?`;
    
    const [result] = await pool.execute(query, values);
    return { success: true, message: 'Dispatch updated successfully' };
  } catch (error) {
    throw new Error(`Error updating dispatch: ${error.message}`);
  }
};

// =============================================
// DISPATCH DETAILS MODEL (Line Items)
// =============================================

export const addDispatchDetail = async (data) => {
  const { dispatchId, itemCode, itemDescription, pcsQty, boxQty, weight, totalKg, unitPrice, totalPrice, currency, status } = data;
  try {
    const [result] = await pool.execute(
      `INSERT INTO DispatchDetails (dispatchId, itemCode, itemDescription, pcsQty, boxQty, weight, totalKg, unitPrice, totalPrice, currency, status)
       VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`,
      [dispatchId, itemCode, itemDescription, pcsQty, boxQty, weight, totalKg, unitPrice, totalPrice, currency || 'PKR', status || 'Pending']
    );
    return { detailId: result.insertId, message: 'Dispatch detail added successfully' };
  } catch (error) {
    throw new Error(`Error adding dispatch detail: ${error.message}`);
  }
};

export const getDispatchDetails = async (dispatchId) => {
  try {
    const [rows] = await pool.execute(
      `SELECT * FROM DispatchDetails WHERE dispatchId = ? ORDER BY id ASC`,
      [dispatchId]
    );
    return rows;
  } catch (error) {
    throw new Error(`Error fetching dispatch details: ${error.message}`);
  }
};

export const deleteDispatchDetail = async (id) => {
  try {
    const [result] = await pool.execute(
      `DELETE FROM DispatchDetails WHERE id = ?`,
      [id]
    );
    return { success: true, message: 'Dispatch detail deleted successfully' };
  } catch (error) {
    throw new Error(`Error deleting dispatch detail: ${error.message}`);
  }
};

// =============================================
// SHIPMENTS MODEL (Tracking)
// =============================================

export const createShipment = async (data) => {
  const { dispatchId, direction, docNum, docDate, cardName, refNumber, tracking, trackingType, info, company, status, deliveredBy, receivedBy, deliveryProof } = data;
  try {
    const [result] = await pool.execute(
      `INSERT INTO Shipments (dispatchId, direction, docNum, docDate, cardName, refNumber, tracking, trackingType, info, company, status, deliveredBy, receivedBy, deliveryProof)
       VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`,
      [dispatchId, direction || 'OUT', docNum, docDate, cardName, refNumber, tracking, trackingType, info, company, status || 'Pending', deliveredBy, receivedBy, deliveryProof]
    );
    return { shipmentId: result.insertId, message: 'Shipment created successfully' };
  } catch (error) {
    throw new Error(`Error creating shipment: ${error.message}`);
  }
};

export const getShipments = async (filters = {}) => {
  try {
    let query = `SELECT * FROM Shipments WHERE 1=1`;
    let params = [];
    
    if (filters.dispatchId) {
      query += ` AND dispatchId = ?`;
      params.push(filters.dispatchId);
    }
    if (filters.status) {
      query += ` AND status = ?`;
      params.push(filters.status);
    }
    if (filters.company) {
      query += ` AND company = ?`;
      params.push(filters.company);
    }
    
    query += ` ORDER BY docDate DESC`;
    const [rows] = await pool.execute(query, params);
    return rows;
  } catch (error) {
    throw new Error(`Error fetching shipments: ${error.message}`);
  }
};

export const getShipmentById = async (id) => {
  try {
    const [rows] = await pool.execute(
      `SELECT * FROM Shipments WHERE id = ?`,
      [id]
    );
    return rows[0];
  } catch (error) {
    throw new Error(`Error fetching shipment: ${error.message}`);
  }
};

export const updateShipment = async (id, data) => {
  try {
    const fields = [];
    const values = [];
    
    Object.keys(data).forEach(key => {
      fields.push(`${key} = ?`);
      values.push(data[key]);
    });
    
    values.push(id);
    const query = `UPDATE Shipments SET ${fields.join(', ')}, updatedAt = CURRENT_TIMESTAMP WHERE id = ?`;
    
    const [result] = await pool.execute(query, values);
    return { success: true, message: 'Shipment updated successfully' };
  } catch (error) {
    throw new Error(`Error updating shipment: ${error.message}`);
  }
};
