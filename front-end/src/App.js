import React from 'react';
import DeliveryRoutes from './routes';
import DeliveryProvider from './context/DeliveryProvider';
import './App.css';

function App() {
  return (
    <DeliveryProvider>
      <DeliveryRoutes />
    </DeliveryProvider>
  );
}

export default App;
