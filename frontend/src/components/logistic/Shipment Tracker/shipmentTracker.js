import React, { useEffect, useState } from 'react';
import Table from '../../ReUseable/Table/Table';
import PurchaseDetails from '../../Modals/PurchaseDetails';
import { getShipments,searchShipments } from '../../../api/api';
import axios from 'axios';

const ShipmentTracker = () => {

  const [shipments, setShipments] = useState([]);
  const [originalShipments, setOriginalShipments] = useState([]); //  store default data
  const [query, setQuery] = useState("");

  useEffect(() => {
    getShipments()
      .then(res => {

        const mapped = res.data.map(item => ({
          shipmentId: item.Id,
          book: item.Book,
          destName: item.DocNum,
          date: item.Date ? new Date(item.Date).toISOString().split('T')[0] : '',
          status: item.Status,
          shipper: item.Shipper,
          country: item.Country,
          contactPerson: item.ContactPerson,
          email: item.E_Mail
        }));

        setShipments(mapped);
        setOriginalShipments(mapped);  // ⬅ store original
      })
      .catch(err => console.error("Error loading shipments:", err));
  }, []);

 
  // SEARCH FUNCTION
  
  const handleSearch = async (e) => {
    const q = e.target.value;
    setQuery(q);

    if (q.trim() === "") {
      setShipments(originalShipments);   // ⬅ restore original data
      return;
    }

    try {
      const res = await searchShipments(q);

      // map data IF backend returns raw DB fields
      const mapped = res.data.map(item => ({
        shipmentId: item.Id,
        book: item.Book,
        destName: item.DocNum,
        date: item.Date ? new Date(item.Date).toISOString().split('T')[0] : '',
        status: item.Status,
        shipper: item.Shipper,
        country: item.Country,
        contactPerson: item.ContactPerson,
        email: item.E_Mail
      }));

      setShipments(mapped);   // ⬅ update table
    } catch (err) {
      console.error("Search API error:", err);
    }
  };

  let delay=400;
  //debounce search input
   function debounce(func, delay){
    let timer;
    return function(...args){
      clearTimeout(timer);
      timer=setTimeout(()=>func.apply(this,args),delay);
    };
   }

   const x =debounce(searchShipments,delay);


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
        const email = row.email || "";
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

  // MODAL HANDLERS
  const [isModalOpen, setIsModalOpen] = React.useState(false);
  const [selectedPurchase, setSelectedPurchase] = React.useState(null);

  const handleActionClick = (action, row) => {
    if (action === 'info') {
      setSelectedPurchase(row);
      setIsModalOpen(true);
    }
  };

  return (
    <div style={{ width: '100%' }}>
      <h1 style={{ padding: '20px', paddingBottom: '10px', margin: 0 }}>Shipment Tracker</h1>
      <p style={{ padding: '0 20px', marginTop: '0', color: '#666' }}>
        Track and monitor your shipments in real-time.
      </p>

      {/* SEARCH BAR */}
      <div style={{ padding: "0 20px", marginBottom: "10px" }}>
        <input
          type="text"
          value={query}
          onChange={handleSearch}
          placeholder="Search"
          style={{
            padding: "8px",
            width: "300px",
            borderRadius: "4px",
            border: "1px solid #ccc"
          }}
        />
      </div>

      <Table
        data={shipments}
        columns={columns}
        totalEntries={shipments.length}
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
