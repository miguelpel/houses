import React from 'react';
import {
  BrowserRouter as Router,
  Route,
} from 'react-router-dom';

import Navigation from './header/navigation/Navigation';
import LandingPage from './body/landing/Landing';
import SignUpPage from './sessionmanagment/SignUp';
import SignInPage from './sessionmanagment/SignIn';
import PasswordForgetPage from './sessionmanagment/PasswordForget';
import HomePage from './body/home/Home';
import AccountPage from './sessionmanagment/Account';

import * as routes from '../constants/routes';
import withAuthentication from './higherorder/withAuthentication';

const App = () =>
  <Router>
    <div>
      <Navigation />

      <hr/>

      <Route exact path={routes.LANDING} component={LandingPage} />
      <Route exact path={routes.SIGN_UP} component={SignUpPage} />
      <Route exact path={routes.SIGN_IN} component={SignInPage} />
      <Route exact path={routes.PASSWORD_FORGET} component={PasswordForgetPage} />
      <Route exact path={routes.HOME} component={HomePage} />
      <Route exact path={routes.ACCOUNT} component={AccountPage} />
    </div>
  </Router>

export default withAuthentication(App);