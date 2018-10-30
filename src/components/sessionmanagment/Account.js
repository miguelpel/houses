import React from 'react';

import AuthUserContext from '../higherorder/AuthUserContext';
import { PasswordForgetForm } from './PasswordForget';
import PasswordChangeForm from './PasswordChange';
import withAuthorization from '../higherorder/withAuthorization';

import * as routes from '../../constants/routes';

const onCancel = (event, history) => {
  history.push(routes.HOME);
  event.preventDefault();
}

const AccountPage = (props) =>
  <AuthUserContext.Consumer>
    {authUser =>
      <div>
        <h1>Account: {authUser.email}</h1>
        <PasswordForgetForm />
        <PasswordChangeForm />
        <div><button onClick={e =>{onCancel(e, props.history)}}>Back to Houses</button></div>
      </div>
    }
  </AuthUserContext.Consumer>

const authCondition = (authUser) => !!authUser;

export default withAuthorization(authCondition)(AccountPage);