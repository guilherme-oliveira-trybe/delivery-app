import React from 'react';
import DeliveryRoutes from './routes';
import DeliveryProvider from './context/DeliveryProvider';
import './App.css';

function App() {
  console.log('oi');
  return (
    <DeliveryProvider>
      <DeliveryRoutes />
    </DeliveryProvider>
  );
}

export default App;
