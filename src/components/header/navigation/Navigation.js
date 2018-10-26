import React from 'react';
import { Link } from 'react-router-dom';

import { SignUpLink } from '../../sessionmanagment/SignUp';
import AuthUserContext from '../../higherorder/AuthUserContext';
import SignOutButton from '../../sessionmanagment/SignOut';
import * as routes from '../../../constants/routes';

import './Navigation.css';

const Navigation = () =>
  <AuthUserContext.Consumer>
    {authUser => authUser
      ? <NavigationAuth />
      : <NavigationNonAuth />
    }
  </AuthUserContext.Consumer>

const NavigationAuth = () =>
  <ul>
    <li><Link to={routes.LANDING}>Landing</Link></li>
    <li><Link to={routes.HOME}>Home</Link></li>
    <li><Link to={routes.ACCOUNT}>Account</Link></li>
    <li><SignOutButton /></li>
  </ul>

const NavigationNonAuth = () =>
  <ul className="navigation">
    {/* <li><Link to={routes.LANDING}>Landing</Link></li> */}
    <li><Link to={routes.SIGN_IN}>Log In</Link></li>
    <li><SignUpLink /></li>
  </ul>

export default Navigation;