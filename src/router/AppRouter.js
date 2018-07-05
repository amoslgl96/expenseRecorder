

import React from 'react';
import { Router, Route, Switch, Link, NavLink } from 'react-router-dom';
import PrivateRoute from './PrivateRoute';
import ExpenseDashboardPage from '../components/ExpenseDashboardPage';
import AddExpensePage from '../components/AddExpensePage';
import EditExpensePage from '../components/EditExpensePage';
import HelpPage from '../components/HelpPage';
import NotFoundPage from '../components/NotFoundPage';
import LoginPage from '../components/LoginPage';


import createHistory from "history/createBrowserHistory";

export const history=createHistory();

//the props history will be passed down to all the components within it 
//The original BrowserRouter automates the passing down for initially.
const AppRouter = () => (
  <Router history={history}>
    <div>
      <Switch>
        <Route path="/" component={LoginPage} exact={true} />
        <PrivateRoute path="/dashboard" component={ExpenseDashboardPage} />
        <PrivateRoute path="/create" component={AddExpensePage} />
        <PrivateRoute path="/edit/:id" component={EditExpensePage} />
        <PrivateRoute path="/help" component={HelpPage} />
        <Route component={NotFoundPage} />
      </Switch>
    </div>
  </Router>
);

export default AppRouter;
