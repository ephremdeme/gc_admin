import React from 'react';
import { Route, Switch } from 'react-router-dom';
import NotFoundPage from "./pages/NotFoundPage";
import ProfilePage from "./pages/ProfilePage";
import ProductsPage from './products';
import UsersPage from './users';

class Routes extends React.Component {
  render() {
    return (
      <Switch>
        {/* <Route path='/' exact component={DashboardPage} />
        <Route path='/dashboard' component={DashboardPage} /> */}
        <Route path='/profile' component={ProfilePage} />
        <Route path='/users' component={UsersPage} />
        <Route path='/products' component={ProductsPage} />
        {/* <Route path='/tables' component={TablesPage} />
        <Route path='/maps' component={MapsPage} /> */}
        <Route path='/:id' component={NotFoundPage} />
      </Switch>
    );
  }
}

export default Routes;
