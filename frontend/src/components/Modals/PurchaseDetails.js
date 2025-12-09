import React, { useEffect, useState } from 'react';
import Table from '../ReUseable/Table/Table';
import './PurchaseDetails.css';
import { getMenuCard } from '../../api/api'; 

const PurchaseDetails = ({ isOpen, onClose, shipmentId }) => {

  const [data, setData] = useState({});
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [rawResponse, setRawResponse] = useState(null);

  useEffect(() => {
    if (!shipmentId || !isOpen) return;

    const fetchData = async () => {
      setLoading(true);
      setError(null);
      try {
        const response = await getMenuCard(shipmentId);
        console.log('getMenuCard response:', response);
        setRawResponse(response.data);
        const d = response.data;

        setData({
  poNumber: d.PONumber,
  status: d.Status,
  shipper: d.Shipper,
  date: d.Date,
  contact: d.Contact,
  phone: d.Phone,
  email: d.Email,
  total: d.TotalEUR,
  totalPkr: d.TotalPKR,

  // items array
  items: d.items?.map(item => ({
    category: item.Category,
    unCode: item.UNCode,
    hsCode: item.HSCode,
    storage: item.Storage,
    itemCode: item.ItemCode,
    cat: item.CAT,
    itemName: item.ItemName,
    qty: item.QTY,
    backQty: item.BackQty,
    currency: item.Currency,
    unitCost: item.UnitCost,
    fcTotal: item.FCTotal,
    phpTotal: item.PKRTotal
  })) || [],

  // route details
  routeDetails: d.routeDetails
    ? {
        shipmentMode: d.routeDetails.ShipmentMode,
        incoterm: d.routeDetails.Incoterms,
        origin: d.routeDetails.Origin,
        destination: d.routeDetails.Destination
      }
    : {},

  // performa invoice
  proformaInvoice: d.proformaInvoice
    ? {
        poSendDate: d.proformaInvoice.POSendDate,
        piReceivedDate: d.proformaInvoice.PIReceivedDate,
        piNumber: d.proformaInvoice.PINumber,
        attachPi: d.proformaInvoice.AttachedPI
      }
    : {}
});

      } catch (error) {
        console.error("Error fetching MenuCard:", error);
        setError(error?.response?.data?.message || error.message || 'Unknown error');
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [shipmentId]);

  // Define table columns for purchase items
  const columns = [
    { key: 'category', header: 'Category' },
    { key: 'unCode', header: 'UN Code' },
    { key: 'hsCode', header: 'HSCode' },
    { key: 'storage', header: 'Storage' },
    { key: 'itemCode', header: 'ItemCode' },
    { key: 'cat', header: 'CAT' },
    { key: 'itemName', header: 'ItemName' },
    { key: 'qty', header: 'QTY' },
    { key: 'backQty', header: 'Back Qty' },
    { key: 'currency', header: 'Currency' },
    { key: 'unitCost', header: 'Unit Cost' },
    { key: 'fcTotal', header: 'FC Total', render: (row) => row.fcTotal?.toLocaleString('en-US', { minimumFractionDigits: 0, maximumFractionDigits: 2 }) },
    { key: 'phpTotal', header: 'PKR Total' }
  ];

  const handleActionClick = (action, rowData) => {
    console.log(`Action: ${action}`, rowData);
  };

  if (!isOpen) return null;

  return (
    <div className="modal-overlay">
      <div className="modal-content purchase-details-modal">
        {/* Modal Header */}
        <div className="modal-header">
          <h2>Purchase Order Details</h2>
          <button className="close-btn" onClick={onClose}>Close</button>
        </div>

        {/* Purchase Order Info */}
        <div className="purchase-info-header">
          <h2 style={{ textAlign: 'center', width: '100%', margin: '20px 0' }}>PO Number : {data.poNumber}</h2>
        </div>
        
        <div className="purchase-info-grid">
          <div className="info-group-left">
            <div className="info-item">
              <label>Status : <span>{data.status}</span></label>
            </div>
            <div className="info-item">
              <label>Shipper : <span>{data.shipper}</span></label>
            </div>
            <div className="info-item">
              <label>Total : <span>{data.total}</span></label>
            </div>
          </div>

          <div className="info-group-center">
            <div className="info-item">
              <label>Date : <span>{data.date}</span></label>
            </div>
            <div className="info-item">
              <label>Contact : <span>{data.contact}</span></label>
            </div>
            <div className="info-item">
              <label>Total : <span>{data.totalPkr}</span></label>
            </div>
          </div>

          <div className="info-group-right">
            <div className="info-item">
              <label>Phone : <span>{data.phone} /</span></label>
            </div>
            <div className="info-item">
              <label>Email : <span>{data.email}</span></label>
            </div>
          </div>
        </div>

        {/* Items Table */}
        <div className="table-section">
          {loading && <p>Loading purchase details…</p>}
          {error && <p style={{ color: 'red' }}>Error loading purchase: {error}</p>}
          <div className="table-scroll-hint">
            ← Scroll horizontally to view all item details →
          </div>
          <Table 
            data={data.items || []} 
            columns={columns}
            totalEntries={(data.items || []).length}
            onActionClick={handleActionClick}
            showActions={false}
            showPagination={false}
          />
          {/* Diagnostic: show raw response to help debug when fields are empty */}
          
        </div>

        {/* Route Details */}
        <div className="route-details-section">
          <h3>🚚 ROUTE DETAILS</h3>
          <div className="route-details-grid">
            <div className="route-item">
              <label>Shipmen Mode : {data.routeDetails?.shipmentMode}</label>
              <select defaultValue={data.routeDetails?.shipmentMode}>
                <option value="Sea"> [ Sea Freight ]</option>
              </select>
            </div>
            <div className="route-item">
              <label>Incoterms : {data.routeDetails?.incoterm}</label>
              <select defaultValue={data.routeDetails?.incoterm}>
                <option value="EXW"> [ EXW ] [ EX WORKS ]</option>
              </select>
            </div>
            <div className="route-item">
              <label>Origin : {data.routeDetails?.origin}</label>
              <select defaultValue={data.routeDetails?.origin}>
                 <option> </option>
              </select>
            </div>
            <div className="route-item">
              <label>Destination : {data.routeDetails?.destination}</label>
              <select defaultValue={data.routeDetails?.destination}>
                <option value="KHI"> [ KHI - KARACHI ]</option>
              </select>
            </div>
          </div>
        </div>

        {/* Proforma Invoice */}
        <div className="proforma-section">
          <h3>📋 PERFORMA INVOICE</h3>
          <div className="proforma-grid">
            <div className="proforma-item">
              <label>PO Send Date</label>
              <input type="date" defaultValue={data.proformaInvoice?.poSendDate} />
            </div>
            <div className="proforma-item">
              <label>PI Received Date</label>
              <input type="date" defaultValue={data.proformaInvoice?.piReceivedDate} />
            </div>
            <div className="proforma-item">
              <label>PI Number</label>
              <input type="text" defaultValue={data.proformaInvoice?.piNumber} />
            </div>
            <div className="proforma-item">
              <label>Attach PI</label>
              <div className="file-upload">
                <input type="text" placeholder={data.proformaInvoice?.attachPi || 'No file selected'} readOnly />
                <button className="upload-btn">⎘</button>
              </div>
            </div>
          </div>
        </div>

        {/* Footer with Update Button */}
        <div className="modal-footer">
          <button className="update-route-btn">Updates Route ✓</button>
        </div>
      </div>
    </div>
  );
};

export default PurchaseDetails;
