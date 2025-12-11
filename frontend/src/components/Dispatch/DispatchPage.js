import React from 'react';
import Card from '../ReUseable/Cards/cards';
//import Card2 from '././ReUsable/Cards/cards.js';

import carddata2 from './data2';

const DispatchPage = () => {

  return (
    <div style={{ width: '100%' }}>
      <h1 style={{ padding: '20px', margin: 0 }}>Dispatch Management</h1>
      <p style={{ padding: '20px', marginTop: '-20px' }}></p>
      <Card items={carddata2} />
    </div>
  );
};


export default DispatchPage;
