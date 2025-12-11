import express from 'express';
import {
  createCustomer, getCustomers, getCustomerByCode,
  createZone, getZones, getZonesByCity,
  createDeliveryChallan, getDeliveryChallans, getDeliveryChallanById,
  createDispatch, getDispatches, getDispatchById, updateDispatch,
  addDispatchDetail, getDispatchDetails, deleteDispatchDetail,
  createShipment, getShipments, getShipmentById, updateShipment
} from '../Models/dispatchModels.js';

const router = express.Router();

// =============================================
// CUSTOMERS ROUTES
// =============================================

router.post('/customers', async (req, res) => {
  try {
    const result = await createCustomer(req.body);
    res.status(201).json(result);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

router.get('/customers', async (req, res) => {
  try {
    const customers = await getCustomers();
    res.status(200).json(customers);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

router.get('/customers/:code', async (req, res) => {
  try {
    const customer = await getCustomerByCode(req.params.code);
    res.status(200).json(customer);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// =============================================
// ZONES ROUTES
// =============================================

router.post('/zones', async (req, res) => {
  try {
    const result = await createZone(req.body);
    res.status(201).json(result);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

router.get('/zones', async (req, res) => {
  try {
    const zones = await getZones();
    res.status(200).json(zones);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

router.get('/zones/city/:city', async (req, res) => {
  try {
    const zones = await getZonesByCity(req.params.city);
    res.status(200).json(zones);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// =============================================
// DELIVERY CHALLANS ROUTES
// =============================================

router.post('/delivery-challans', async (req, res) => {
  try {
    const result = await createDeliveryChallan(req.body);
    res.status(201).json(result);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

router.get('/delivery-challans', async (req, res) => {
  try {
    const challans = await getDeliveryChallans(req.query);
    res.status(200).json(challans);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

router.get('/delivery-challans/:id', async (req, res) => {
  try {
    const challan = await getDeliveryChallanById(req.params.id);
    res.status(200).json(challan);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// =============================================
// DISPATCHES ROUTES
// =============================================

router.post('/dispatches', async (req, res) => {
  try {
    const result = await createDispatch(req.body);
    res.status(201).json(result);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

router.get('/dispatches', async (req, res) => {
  try {
    const dispatches = await getDispatches(req.query);
    res.status(200).json(dispatches);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

router.get('/dispatches/:id', async (req, res) => {
  try {
    const dispatch = await getDispatchById(req.params.id);
    res.status(200).json(dispatch);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

router.put('/dispatches/:id', async (req, res) => {
  try {
    const result = await updateDispatch(req.params.id, req.body);
    res.status(200).json(result);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// =============================================
// DISPATCH DETAILS ROUTES
// =============================================

router.post('/dispatch-details', async (req, res) => {
  try {
    const result = await addDispatchDetail(req.body);
    res.status(201).json(result);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

router.get('/dispatch-details/:dispatchId', async (req, res) => {
  try {
    const details = await getDispatchDetails(req.params.dispatchId);
    res.status(200).json(details);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

router.delete('/dispatch-details/:id', async (req, res) => {
  try {
    const result = await deleteDispatchDetail(req.params.id);
    res.status(200).json(result);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// =============================================
// SHIPMENTS ROUTES
// =============================================

router.post('/shipments', async (req, res) => {
  try {
    const result = await createShipment(req.body);
    res.status(201).json(result);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

router.get('/shipments', async (req, res) => {
  try {
    const shipments = await getShipments(req.query);
    res.status(200).json(shipments);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

router.get('/shipments/:id', async (req, res) => {
  try {
    const shipment = await getShipmentById(req.params.id);
    res.status(200).json(shipment);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

router.put('/shipments/:id', async (req, res) => {
  try {
    const result = await updateShipment(req.params.id, req.body);
    res.status(200).json(result);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

export default router;
