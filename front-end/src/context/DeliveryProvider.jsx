import React from 'react';
import PropTypes from 'prop-types';
import DeliveryContext from './DeliveryContext';

function DeliveryProvider({ children }) {
  // const [loading, setLoading] = useState(true);

  // const contextValue = {
  //   loading,
  //   setLoading,
  // };

  const teste = true;

  return (
    <DeliveryContext.Provider value={ teste }>
      {children}
    </DeliveryContext.Provider>
  );
}

DeliveryProvider.propTypes = {
  children: PropTypes.node.isRequired,
};

export default DeliveryProvider;
