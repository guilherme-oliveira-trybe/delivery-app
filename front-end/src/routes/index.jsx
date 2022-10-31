import { Redirect, Switch, Route } from 'react-router-dom';
import Login from '../pages/Login';
import Register from '../pages/Register';
import Products from '../pages/Products';
import Checkout from '../pages/Checkout';
import Orders from '../pages/Orders';
import OrderDetails from '../pages/OrderDetails';
import SellOrders from '../pages/SellOrders';
import SellOrderDetails from '../pages/SellOrderDetails';
import UserManager from '../pages/UserManager';

export default function DeliveryRoutes() {
  return (
    <Switch>
      <Route exact path="/">
        <Redirect to="/login" />
      </Route>
      <Route exact path="/login" component={ Login } />
      <Route exact path="/customer/checkout" component={ Checkout } />
      <Route exact path="/register" component={ Register } />
      <Route exact path="/customer/products" component={ Products } />
      <Route exact path="/customer/orders" component={ Orders } />
      <Route exact path="/5" component={ OrderDetails } />
      <Route exact path="/6" component={ SellOrders } />
      <Route exact path="/7" component={ SellOrderDetails } />
      <Route exact path="/8" component={ UserManager } />
    </Switch>
  );
}
