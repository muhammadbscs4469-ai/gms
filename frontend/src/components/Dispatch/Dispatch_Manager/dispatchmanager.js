import React, { useState } from 'react';
import Table from '../../ReUseable/Table/Table';

const hardcodedRows = [
  { id: 1, docType: 'LDS_LIVE', docNum: '108682', dated: '2025-11-29', docTime: '12:02 PM', cardName: 'Oncolink Pharma Distributor', products: 'Vaccine,', status: 'Open for Dispatch' },
  { id: 2, docType: 'Clinical', docNum: '165924', dated: '2025-11-28', docTime: '11:55 AM', cardName: 'The Aga khan Hospital and Medical College Foundation', products: 'Other Regents,', status: 'Open for Dispatch' },
  { id: 3, docType: 'LDS_LIVE', docNum: '108655', dated: '2025-11-27', docTime: '01:17 PM', cardName: 'KIRAN PATIENTS WELFARE SOCIETY', products: 'Anti-Cancer,', status: 'Open for Dispatch' },
  { id: 4, docType: 'LDS_LIVE', docNum: '108656', dated: '2025-11-27', docTime: '02:40 PM', cardName: 'Allama Iqbal Teaching Hospital', products: 'Finished Product,', status: 'Open for Dispatch' },
  { id: 5, docType: 'LDS_LIVE', docNum: '108660', dated: '2025-11-27', docTime: '04:04 PM', cardName: 'Allama Iqbal Teaching Hospital', products: 'Finished Product,', status: 'Open for Dispatch' },
  { id: 6, docType: 'LDS_LIVE', docNum: '108628', dated: '2025-11-26', docTime: '11:39 AM', cardName: 'Office of the Medical Suprintendent Punjab Institute of Neurosciences, Lahore (PINS)', products: 'Anti-Cancer,', status: 'Open for Dispatch' },
  { id: 7, docType: 'Clinical', docNum: '165850', dated: '2025-11-26', docTime: '09:45 AM', cardName: 'Shifa international Hosp Ltd - Isb', products: 'Microscopy,', status: 'Open for Dispatch' },
  { id: 8, docType: 'Clinical', docNum: '165871', dated: '2025-11-26', docTime: '02:08 PM', cardName: 'The Aga khan Hospital and Medical College Foundation', products: 'Other Regents,', status: 'Open for Dispatch' },
  { id: 9, docType: 'Clinical', docNum: '165872', dated: '2025-11-26', docTime: '02:10 PM', cardName: 'The Aga khan Hospital and Medical College Foundation', products: 'Other Regents,', status: 'Open for Dispatch' },
  { id: 10, docType: 'Clinical', docNum: '165874', dated: '2025-11-26', docTime: '02:13 PM', cardName: 'The Aga khan Hospital and Medical College Foundation', products: 'VITEK 2 system - Reagents,', status: 'Open for Dispatch' }
  ];

  const shipmentRows = [
    { id: 1, direction: 'OUT', docNum: '100991', docDate: '11/29/2025 11:27:25 AM', cardName: 'Chief Pharmacy', ref: 'ODLN-105671', tracking: 'Delivered by Tahir & Abid received by Sign & Stamp', type: 'BOX', info: 'ToCustomer', company: 'LDS_LIVE' },
    { id: 2, direction: 'OUT', docNum: '100992', docDate: '11/29/2025 11:27:25 AM', cardName: '- STOCK FOR TRAINING AND EVALUATION', ref: 'OIGE-774', tracking: 'Delivered by Tahir & Abid received by Sign & Stamp', type: 'BOX', info: 'ToCustomer', company: 'LDS_LIVE' },
    { id: 3, direction: 'OUT', docNum: '100993', docDate: '11/29/2025 11:27:25 AM', cardName: 'Shifa international Hosp Ltd - isb', ref: 'ODLN-165956', tracking: 'Delivered by Ikhaq Abid received by Sign & Stamp', type: 'BOX', info: 'ToCustomer', company: 'Clinical' },
    { id: 4, direction: 'OUT', docNum: '100994', docDate: '11/29/2025 11:27:25 AM', cardName: 'Excel Lab - ISB', ref: 'ODLN-165942', tracking: 'Delivered by Ikhaq Abid received by Sign & Stamp', type: 'box', info: 'ToCustomer', company: 'Clinical' },
    { id: 5, direction: 'OUT', docNum: '100995', docDate: '11/29/2025 11:27:25 AM', cardName: 'Hassnain Scientific Rep', ref: 'ODLN-165952', tracking: 'Delivered by Ikhaq Abid received by Sign & Stamp', type: 'box', info: 'ToCustomer', company: 'Clinical' },
    { id: 6, direction: 'OUT', docNum: '100996', docDate: '11/29/2025 11:27:25 AM', cardName: 'Bio indus Research & diagnostics', ref: 'ODLN-165949', tracking: 'Delivered by Ikhaq Abid received by Sign & Stamp', type: 'box', info: 'ToCustomer', company: 'Clinical' },
    { id: 7, direction: 'OUT', docNum: '100997', docDate: '11/29/2025 11:27:25 AM', cardName: 'Fauji Foundation Hospital - RWP - STOCK ISSUE AS FOC', ref: 'OIGE-111429', tracking: 'Delivered by Ikhaq Abid received by Sign & Stamp', type: 'box', info: 'ToCustomer', company: 'Clinical' },
    { id: 8, direction: 'OUT', docNum: '100998', docDate: '11/29/2025 11:27:25 AM', cardName: 'Neyab lab & diagnostic center-ISB', ref: 'ODLN-165940', tracking: 'Delivered by Ikhaq Abid received by', type: 'box', info: 'ToCustomer', company: 'Clinical' }
  ];

const DispatchManager = () => {
  const [rows, setRows] = useState(hardcodedRows);
  const [query, setQuery] = useState('');
  const [selected, setSelected] = useState(new Set());
  const [selectedDocument, setSelectedDocument] = useState(null);
    const [shipmentData, setShipmentData] = useState(shipmentRows);
  const [dispatchDetails, setDispatchDetails] = useState({
    sourcDocDate: '',
    docType: '',
    docNum: '',
    cardCode: '',
    cardName: '',
    dispatchType: '',
    dispatchDatetime: '',
    zone: '',
    handlingInfo: '',
    dispatchMode: '',
    pcsQty: '',
    weight: '',
    tracking: ''
  });

  const toggleRow = (id) => {
    const s = new Set(selected);
    if (s.has(id)) s.delete(id); else s.add(id);
    setSelected(s);
  };

  const importBulk = () => {
    const ids = Array.from(selected);
    if (ids.length === 0) return alert('No documents selected');
    alert(`Importing ${ids.length} documents: ${ids.join(', ')}`);
    setSelected(new Set());
  };

  const filtered = rows.filter(r => {
    const q = query.trim().toLowerCase();
    if (!q) return true;
    return (r.docNum || '').toString().toLowerCase().includes(q) ||
           (r.cardName || '').toLowerCase().includes(q) ||
           (r.docType || '').toLowerCase().includes(q);
  });

  const columns = [
    { key: 'select', header: '', render: (row) => (
      <input type="checkbox" checked={selected.has(row.id)} onChange={() => toggleRow(row.id)} />
    ) },
    { key: 'docType', header: 'DocType' },
    { key: 'docNum', header: 'DocNum' },
    { key: 'dated', header: 'Dated' },
    { key: 'docTime', header: 'DocTime' },
    { key: 'cardName', header: 'CardName' },
    { key: 'products', header: 'Products' },
    { key: 'status', header: 'Status' }
  ];

    const shipmentColumns = [
      { key: 'direction', header: 'Direction', render: (row) => <span style={{ background: '#4caf50', color: '#fff', padding: '4px 8px', borderRadius: 3, fontSize: 12, fontWeight: 'bold' }}>{row.direction}</span> },
      { key: 'docNum', header: 'DocNum' },
      { key: 'docDate', header: 'DocDate' },
      { key: 'cardName', header: 'CardName' },
      { key: 'ref', header: 'Ref' },
      { key: 'tracking', header: 'Tracking' },
      { key: 'type', header: 'Type' },
      { key: 'info', header: 'Info' },
      { key: 'company', header: 'Company' },
      { key: 'options', header: 'Options', render: (row) => <button style={{ background: '#f44336', color: '#fff', padding: '6px 12px', border: 'none', borderRadius: 4, cursor: 'pointer', fontSize: 12 }}>Check Details-Open</button> },
      { key: 'attachment', header: 'Attachment', render: (row) => <button style={{ background: '#f44336', color: '#fff', padding: '6px 12px', border: 'none', borderRadius: 4, cursor: 'pointer', fontSize: 12 }}>Attachment</button> }
    ];

return (
  <div style={{ width: '100%', padding: 20 }}>
    <h2 style={{ marginTop: 0 }}>Dispatch Manager - Daily Dispatch</h2>

    {/* Section 1: Create New Dispatch */}
    <div style={{ background: '#fff', padding: 12, borderRadius: 6, marginBottom: 20 }}>
      <h3>Create New Dispatch</h3>
      <div style={{ marginBottom: 10, display: 'flex', alignItems: 'center' }}>
        <label style={{ marginRight: 8 }}>Filter:</label>
        <input
          placeholder="Search"
          value={query}
          onChange={e => setQuery(e.target.value)}
          style={{ padding: 8, width: 220, border: '1px solid #ccc', borderRadius: 4 }}
        />
      </div>

      <Table data={filtered} columns={columns} totalEntries={353} showActions={false} showPagination={true} />

      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginTop: 12 }}>
        <div>Showing {filtered.length > 0 ? `1 to ${Math.min(10, filtered.length)}` : '0'} of 353 entries</div>
        <div>
          <button onClick={importBulk} style={{ marginLeft: 12, background: '#1e88e5', color: '#fff', padding: '8px 12px', border: 'none', borderRadius: 4 }}>Import Document (Bulk)</button>
        </div>
      </div>
    </div>

    {/* Separator Line */}
    <div style={{ borderTop: '1px solid #e0e0e0', margin: '15px 0' }}></div>

    {/* Section 2: Dispatch Details Form */}
    <div style={{ background: '#fff', padding: 20, borderRadius: 6, marginBottom: 20 }}>
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 20, marginBottom: 20 }}>
        {/* Left Column - Source Document */}
        <div>
          <h4 style={{ display: 'flex', alignItems: 'center', gap: 8, marginTop: 0 }}>
            <span style={{ fontSize: 18 }}>📋</span> Source Document List
          </h4>
          <div style={{ marginBottom: 12 }}>
            <label style={{ display: 'block', marginBottom: 6, fontWeight: 500 }}>Select Source Document - Single Dispatch</label>
            <select style={{ width: '100%', padding: 8, border: '1px solid #ccc', borderRadius: 4 }}>
              <option>Delivery Challan</option>
            </select>
          </div>
          <div style={{ marginBottom: 12 }}>
            <label style={{ display: 'block', marginBottom: 6, fontWeight: 500 }}>Doc Number</label>
            <input placeholder="166452" style={{ width: '100%', padding: 8, border: '1px solid #ccc', borderRadius: 4 }} />
          </div>
          <div style={{ marginBottom: 12 }}>
            <label style={{ display: 'block', marginBottom: 6, fontWeight: 500 }}>Select Company</label>
            <select style={{ width: '100%', padding: 8, border: '1px solid #ccc', borderRadius: 4 }}>
              <option>Clinical</option>
            </select>
          </div>
          <button style={{ width: '100%', background: '#1e88e5', color: '#fff', padding: '10px', border: 'none', borderRadius: 4, cursor: 'pointer', fontWeight: 500 }}>Import Document (Single)</button>

          {/* Document Table */}
          <div style={{ marginTop: 20 }}>
            <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: 12 }}>
              <thead>
                <tr style={{ background: '#f5f5f5' }}>
                  <th style={{ padding: 8, textAlign: 'left', borderBottom: '1px solid #ddd' }}>DocNum</th>
                  <th style={{ padding: 8, textAlign: 'left', borderBottom: '1px solid #ddd' }}>DocDate</th>
                  <th style={{ padding: 8, textAlign: 'left', borderBottom: '1px solid #ddd' }}>DueDate</th>
                  <th style={{ padding: 8, textAlign: 'left', borderBottom: '1px solid #ddd' }}>CardName</th>
                  <th style={{ padding: 8, textAlign: 'left', borderBottom: '1px solid #ddd' }}>ItemCode</th>
                  <th style={{ padding: 8, textAlign: 'left', borderBottom: '1px solid #ddd' }}>Description</th>
                  <th style={{ padding: 8, textAlign: 'left', borderBottom: '1px solid #ddd' }}>Qty</th>
                  <th style={{ padding: 8, textAlign: 'left', borderBottom: '1px solid #ddd' }}>Address</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td style={{ padding: 8, borderBottom: '1px solid #eee' }}>166452</td>
                  <td style={{ padding: 8, borderBottom: '1px solid #eee' }}>11 Dec 25</td>
                  <td style={{ padding: 8, borderBottom: '1px solid #eee' }}>11 Dec 25</td>
                  <td style={{ padding: 8, borderBottom: '1px solid #eee' }}>Modern Health Technologies Taxila</td>
                  <td style={{ padding: 8, borderBottom: '1px solid #eee' }}>MP30122</td>
                  <td style={{ padding: 8, borderBottom: '1px solid #eee' }}>API 10 S 50</td>
                  <td style={{ padding: 8, borderBottom: '1px solid #eee' }}>-</td>
                  <td style={{ padding: 8, borderBottom: '1px solid #eee' }}>Off# 86 2nd Floor, Ali Plaza Near Rafa Mall Strip</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>

        {/* Right Column - Dispatch Details */}
        <div>
          <h4 style={{ display: 'flex', alignItems: 'center', gap: 8, marginTop: 0 }}>
            <span style={{ fontSize: 18 }}>📦</span> Dispatch Details
          </h4>
          
          {/* Top Section - Source Document Info */}
          <div style={{ marginBottom: 12 }}>
            <label style={{ display: 'block', marginBottom: 6, fontWeight: 500 }}>Source Doc Date</label>
            <input type="text" placeholder="11/29/2025 11:27:25 AM" style={{ width: '100%', padding: 8, border: '1px solid #ccc', borderRadius: 4 }} />
          </div>
          <div style={{ marginBottom: 12 }}>
            <label style={{ display: 'block', marginBottom: 6, fontWeight: 500 }}>Doc Type</label>
            <input placeholder="Delivery Challan" style={{ width: '100%', padding: 8, border: '1px solid #ccc', borderRadius: 4 }} disabled />
          </div>
          <div style={{ marginBottom: 12 }}>
            <label style={{ display: 'block', marginBottom: 6, fontWeight: 500 }}>Doc Num</label>
            <input placeholder="166452" style={{ width: '100%', padding: 8, border: '1px solid #ccc', borderRadius: 4 }} />
          </div>
          <div style={{ marginBottom: 12 }}>
            <label style={{ display: 'block', marginBottom: 6, fontWeight: 500 }}>Card Code</label>
            <input placeholder="C000030" style={{ width: '100%', padding: 8, border: '1px solid #ccc', borderRadius: 4 }} />
          </div>
          <div style={{ marginBottom: 20 }}>
            <label style={{ display: 'block', marginBottom: 6, fontWeight: 500 }}>Card Name</label>
            <input placeholder="Chief Pharmacy" style={{ width: '100%', padding: 8, border: '1px solid #ccc', borderRadius: 4 }} disabled />
          </div>

          {/* Separator Line */}
          <div style={{ borderTop: '1px solid #ddd', margin: '20px 0', paddingTop: 20 }}>
            {/* Dispatch Section */}
            <div style={{ marginBottom: 12 }}>
              <label style={{ display: 'block', marginBottom: 6, fontWeight: 500 }}>Dispatch Type</label>
              <select value={dispatchDetails.dispatchType} onChange={(e) => setDispatchDetails({...dispatchDetails, dispatchType: e.target.value})} style={{ width: '100%', padding: 8, border: '1px solid #ccc', borderRadius: 4 }}>
                <option>Select Type</option>
              </select>
            </div>
            <div style={{ marginBottom: 12 }}>
              <label style={{ display: 'block', marginBottom: 6, fontWeight: 500 }}>Dispatch Dated</label>
              <input type="text" placeholder="12/11/2025 11:33:50 AM" style={{ width: '100%', padding: 8, border: '1px solid #ccc', borderRadius: 4 }} />
            </div>
            <div style={{ marginBottom: 12 }}>
              <label style={{ display: 'block', marginBottom: 6, fontWeight: 500 }}>Select Zone & City</label>
              <select value={dispatchDetails.zone} onChange={(e) => setDispatchDetails({...dispatchDetails, zone: e.target.value})} style={{ width: '100%', padding: 8, border: '1px solid #ccc', borderRadius: 4 }}>
                <option>Select Zone</option>
              </select>
            </div>
            <div style={{ marginBottom: 12 }}>
              <label style={{ display: 'block', marginBottom: 6, fontWeight: 500 }}>Handling and Package Info</label>
              <textarea value={dispatchDetails.handlingInfo} onChange={(e) => setDispatchDetails({...dispatchDetails, handlingInfo: e.target.value})} placeholder="Handling and Package Info and General Remarks" style={{ width: '100%', padding: 8, border: '1px solid #ccc', borderRadius: 4, minHeight: 60, resize: 'vertical' }} />
            </div>
            <div style={{ marginBottom: 12 }}>
              <label style={{ display: 'block', marginBottom: 6, fontWeight: 500 }}>Dispatch Mode</label>
              <select value={dispatchDetails.dispatchMode} onChange={(e) => setDispatchDetails({...dispatchDetails, dispatchMode: e.target.value})} style={{ width: '100%', padding: 8, border: '1px solid #ccc', borderRadius: 4 }}>
                <option>Select Mode</option>
              </select>
            </div>

            {/* Packaging Details - 3 columns */}
            <div style={{ marginBottom: 12, display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: 10 }}>
              <div>
                <label style={{ display: 'block', marginBottom: 6, fontWeight: 500, fontSize: 12 }}>Pcs Qty</label>
                <input value={dispatchDetails.pcsQty} onChange={(e) => setDispatchDetails({...dispatchDetails, pcsQty: e.target.value})} placeholder="0" style={{ width: '100%', padding: 8, border: '1px solid #ccc', borderRadius: 4 }} />
              </div>
              <div>
                <label style={{ display: 'block', marginBottom: 6, fontWeight: 500, fontSize: 12 }}>Weight</label>
                <input value={dispatchDetails.weight} onChange={(e) => setDispatchDetails({...dispatchDetails, weight: e.target.value})} placeholder="0" style={{ width: '100%', padding: 8, border: '1px solid #ccc', borderRadius: 4 }} />
              </div>
              <div></div>
            </div>

            <div style={{ marginBottom: 20 }}>
              <label style={{ display: 'block', marginBottom: 6, fontWeight: 500 }}>Tracking</label>
              <input value={dispatchDetails.tracking} onChange={(e) => setDispatchDetails({...dispatchDetails, tracking: e.target.value})} placeholder="Enter Tracking Number, In case of Self Delivery Enter Person Name and Phone Only" style={{ width: '100%', padding: 8, border: '1px solid #ccc', borderRadius: 4 }} />
            </div>

            {/* Submit Buttons */}
            <div style={{ display: 'flex', gap: 10 }}>
              <button style={{ flex: 1, background: '#1e88e5', color: '#fff', padding: '10px', border: 'none', borderRadius: 4, cursor: 'pointer', fontWeight: 500 }}>Submit Single Form</button>
              <button style={{ flex: 1, background: '#4caf50', color: '#fff', padding: '10px', border: 'none', borderRadius: 4, cursor: 'pointer', fontWeight: 500 }}>Submit Bulk Form</button>
            </div>
          </div>
        </div>
      </div>
    </div>

    {/* Separator Line */}
    <div style={{ borderTop: '1px solid #e0e0e0', margin: '15px 0' }}></div>

    {/* Section 3: Shipment Tracking Table */}
    <div style={{ background: '#fff', padding: 20, borderRadius: 6, marginBottom: 20 }}>
          <h3 style={{ marginTop: 0 }}>Shipment Tracking</h3>
          <div style={{ overflowX: 'auto' }}>
            <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: 12 }}>
         
              <thead>
                <tr style={{ background: '#f5f5f5', borderBottom: '2px solid #ddd' }}>
                  <th style={{ padding: 10, textAlign: 'left', fontWeight: 600 }}>Direction</th>
                  <th style={{ padding: 10, textAlign: 'left', fontWeight: 600 }}>DocNum</th>
                  <th style={{ padding: 10, textAlign: 'left', fontWeight: 600 }}>DocDate</th>
                  <th style={{ padding: 10, textAlign: 'left', fontWeight: 600 }}>CardName</th>
                  <th style={{ padding: 10, textAlign: 'left', fontWeight: 600 }}>Ref</th>
                  <th style={{ padding: 10, textAlign: 'left', fontWeight: 600 }}>Tracking</th>
                  <th style={{ padding: 10, textAlign: 'left', fontWeight: 600 }}>Type</th>
                  <th style={{ padding: 10, textAlign: 'left', fontWeight: 600 }}>Info</th>
                  <th style={{ padding: 10, textAlign: 'left', fontWeight: 600 }}>Company</th>
                  <th style={{ padding: 10, textAlign: 'center', fontWeight: 600 }}>Options</th>
                  <th style={{ padding: 10, textAlign: 'center', fontWeight: 600 }}>Attachment</th>
                </tr>
              </thead>
              <tbody>
                {shipmentData.map((row) => (
                  <tr key={row.id} style={{ borderBottom: '1px solid #eee' }}>
                    <td style={{ padding: 10 }}>
                      <span style={{ background: '#4caf50', color: '#fff', padding: '4px 8px', borderRadius: 3, fontSize: 11, fontWeight: 'bold' }}>{row.direction}</span>
                    </td>
                    <td style={{ padding: 10 }}>{row.docNum}</td>
                    <td style={{ padding: 10 }}>{row.docDate}</td>
                    <td style={{ padding: 10 }}>{row.cardName}</td>
                    <td style={{ padding: 10 }}>{row.ref}</td>
                    <td style={{ padding: 10, fontSize: 11 }}>{row.tracking}</td>
                    <td style={{ padding: 10 }}>{row.type}</td>
                    <td style={{ padding: 10 }}>{row.info}</td>
                    <td style={{ padding: 10 }}>{row.company}</td>
                    <td style={{ padding: 10, textAlign: 'center' }}>
                      <button style={{ background: '#f44336', color: '#fff', padding: '6px 12px', border: 'none', borderRadius: 4, cursor: 'pointer', fontSize: 12, fontWeight: 500 }}>Check Details-Open</button>
                    </td>
                    <td style={{ padding: 10, textAlign: 'center' }}>
                      <button style={{ background: '#f44336', color: '#fff', padding: '6px 12px', border: 'none', borderRadius: 4, cursor: 'pointer', fontSize: 12, fontWeight: 500 }}>Attachment</button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <div style={{ marginTop: 12, fontSize: 12, color: '#666' }}>
            Showing 1 to 8 of 8 entries
          </div>
        </div>
      </div>
      
    );
  };
  export default DispatchManager;

