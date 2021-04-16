import React from "react";
import { Provider } from "react-redux";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";

import store from "./redux/reducers/store";
import Login from "./containers/Login";
import Layout from "./hocs/Layout";
import NotFound from "./hocs/NotFound";
import Home from "./containers/Home";
import Vehicle from "./containers/Vehicle";
import VehiclePart from "./containers/VehiclePart";
import Customer from "./containers/Customer";
import PrivateRoute from "./hocs/PrivateRoute";
import CustomerDetail from "./containers/CustomerDetail";
import VehicleDetail from "./containers/VehicleDetail";
import VehiclePartDetail from "./containers/VehiclePartDetail";
import CustomerCreate from "./containers/CustomerCreate";
import VehicleCreate from "./containers/VehicleCreate";
import VehiclePartCreate from "./containers/VehiclePartCreate";
import Invoice from "./containers/Invoice";
import InvoiceCreate from "./containers/InvoiceCreate";
import InvoiceDetail from "./containers/InvoiceDetail";

const App = () => (
  <Provider store={store}>
    <Router>
      <Layout>
        <Switch>
          <PrivateRoute exact path="/" component={Home} />
          <PrivateRoute path="/customer" component={Customer} />
          <PrivateRoute exact path="/customerCreate" component={CustomerCreate} />
          <PrivateRoute exact path="/customerCreate/:id" component={CustomerCreate} />
          <PrivateRoute path="/customerDetail/:id" component={CustomerDetail} />

          <PrivateRoute path="/vehicle" component={Vehicle} />
          <PrivateRoute exact path="/vehicleCreate" component={VehicleCreate} />
          <PrivateRoute exact path="/vehicleCreate/:id" component={VehicleCreate} />
          <PrivateRoute path="/vehicleDetail/:id" component={VehicleDetail} />

          <PrivateRoute path="/vehiclePart" component={VehiclePart} />
          <PrivateRoute exact path="/vehiclePartCreate" component={VehiclePartCreate} />
          <PrivateRoute exact path="/vehiclePartCreate/:id" component={VehiclePartCreate} />
          <PrivateRoute path="/vehiclePartDetail/:id" component={VehiclePartDetail} />

          <PrivateRoute path="/invoiceCreate" component={InvoiceCreate} />

          <PrivateRoute path="/invoice" component={Invoice} />
          <PrivateRoute path="/invoiceDetail/:id" component={InvoiceDetail} />

          <Route exact path="/login" component={Login} />
          <Route exact component={NotFound} />
        </Switch>
      </Layout>
    </Router>
  </Provider>
);

export default App;
