import React, { useState, useMemo } from 'react';
import PropTypes from 'prop-types';
import DeliveryContext from './DeliveryContext';

function DeliveryProvider({ children }) {
  const [user, setUser] = useState({});
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);

  const setLocalStorage = (key, info) => {
    localStorage.setItem(key, JSON.stringify(info));
  };

  const getLocalStorage = (key) => {
    const info = localStorage.getItem(key);
    return JSON.parse(info);
  };

  const contextValue = useMemo(() => ({
    loading,
    setLoading,
    orders,
    setOrders,
    user,
    setUser,
    setLocalStorage,
    getLocalStorage,
  }), [orders, loading, user]);

  return (
    <DeliveryContext.Provider value={ contextValue }>
      {children}
    </DeliveryContext.Provider>
  );
}

DeliveryProvider.propTypes = {
  children: PropTypes.node.isRequired,
};

export default DeliveryProvider;
