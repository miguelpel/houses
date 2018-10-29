import React from 'react';
import {
  BrowserRouter as Router,
  Route,
} from 'react-router-dom';

import Header from './header/Header';
import LandingPage from './body/landing/Landing';
import SignUpPage from './sessionmanagment/SignUp';
import SignInPage from './sessionmanagment/SignIn';
import PasswordForgetPage from './sessionmanagment/PasswordForget';
import HomePage from './body/home/Home';
import AccountPage from './sessionmanagment/Account';
import HouseFormPage from './body/houseForm/HouseForm';

import * as routes from '../constants/routes';
import withAuthentication from './higherorder/withAuthentication';

import './App.css';

const App = () =>
  <Router>
    <div className="app">
      <Header />

      <Route exact path={routes.LANDING} component={HomePage} />
      <Route exact path={routes.HOME} component={HomePage} />
      <Route exact path={routes.SIGN_UP} component={SignUpPage} />
      <Route exact path={routes.SIGN_IN} component={SignInPage} />
      <Route exact path={routes.PASSWORD_FORGET} component={PasswordForgetPage} />
      <Route exact path={routes.ACCOUNT} component={AccountPage} />
      <Route exact path={routes.HOME_FORM} component={HouseFormPage} />
    </div>
  </Router>

export default withAuthentication(App);