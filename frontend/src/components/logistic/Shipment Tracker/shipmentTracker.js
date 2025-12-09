import React,{ useEffect, useState } from 'react';
import Table from '../../ReUseable/Table/Table';
import PurchaseDetails from '../../Modals/PurchaseDetails';
import { getShipments,createShipment } from '../../../api/api';

const ShipmentTracker = () => {

  const [shipments, setShipments]=useState([]);

 useEffect(()=>{
  getShipments()
  .then(res => {
 
    console.log(res.data);
const mapped = res.data.map(item => ({
    shipmentId: item.Id,  // 
    book: item.Book,
    destName: item.DocNum,
    date: item.Date,
    status: item.Status,
    shipper: item.Shipper,
    country: item.Country,
    contactPerson: item.ContactPerson,
    email: item.E_Mail
}));

      setShipments(mapped);
    })
    .catch(err => console.error("Error loading shipments:", err));
}, []);

  
  const columns = [
    { key: 'book', header: 'Book' },
    { key: 'destName', header: 'Dest.Name' },
    { key: 'date', header: 'Date' },
    { 
      key: 'status', 
      header: 'Status',
      render: (row) => (
        <span style={{ 
          padding: '4px 8px', 
          borderRadius: '4px',
          fontSize: '12px',
          fontWeight: '500',
          backgroundColor: row.status === 'Close' ? '#ffebee' : '#e8f5e9',
          color: row.status === 'Close' ? '#c62828' : '#2e7d32'
        }}>
          {row.status}
        </span>
      )
    },
    { key: 'shipper', header: 'Shipper' },
    { key: 'country', header: 'Country' },
    { key: 'contactPerson', header: 'Contact/Person' },
    {
      key: 'email',
      header: 'E_Mail',
      render: (row) => {
        const email = row.email;
        const maxLength = 22;
        const isLong = email.length > maxLength;
        const shortened = isLong ? email.substring(0, maxLength) + '...' : email;
        return (
          <div className="email-cell">
            <span className="email-short">{shortened}</span>
            {isLong && <span className="email-full">{email}</span>}
          </div>
        );
      }
    }
  ];

  // Modal state
  const [isModalOpen, setIsModalOpen] = React.useState(false);
  const [selectedPurchase, setSelectedPurchase] = React.useState(null);

  // Handle action button clicks
  const handleActionClick = (action, rowData) => {
    console.log(`Action: ${action}`, rowData);
    // You can implement specific functionality for each action here
    switch(action) {
      case 'info':
        setSelectedPurchase(rowData);
        setIsModalOpen(true);
        console.log("Selected row shipmentId:", rowData.shipmentId);
        setSelectedPurchase(rowData);
         setIsModalOpen(true);
        break;

      case 'list':
        alert(`View detailed list for: ${rowData.destName}`);
        break;
      case 'check':
        alert(`Approve shipment: ${rowData.destName}`);
        break;
      case 'delete':
        if (window.confirm(`Are you sure you want to delete shipment ${rowData.destName}?`)) {
          alert(`Deleted: ${rowData.destName}`);
        }
        break;
      default:
        break;
    }
  };

  return (
    <div style={{ width: '100%' }}>
      <h1 style={{ padding: '20px', paddingBottom: '10px', margin: 0 }}>Shipment Tracker</h1>
      <p style={{ padding: '0 20px', marginTop: '0', color: '#666' }}>
        Track and monitor your shipments in real-time.
      </p>
      <Table 
        data={shipments} 
        columns={columns} 
        totalEntries={109}
        onActionClick={handleActionClick}
      />
      <PurchaseDetails 
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        shipmentId={selectedPurchase?.shipmentId}
      />

    </div>
  );
};

export default ShipmentTracker;
