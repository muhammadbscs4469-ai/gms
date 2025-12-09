import React from 'react';
import Card from '../ReUseable/Cards/cards';
import cardData from './data';

const LogisticPage = () => {

  return (
    <div style={{ width: '100%' }}>
      <h1 style={{ padding: '20px', margin: 0 }}>Logistic Management</h1>
      <p style={{ padding: '20px', marginTop: '-20px' }}>Select an option from the sidebar to get started.</p>
      <Card items={cardData} />
    </div>
  );
};

export default LogisticPage;
