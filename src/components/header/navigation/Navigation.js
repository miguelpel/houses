import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { db } from '../../../firebase';

import { SignUpLink } from '../../sessionmanagment/SignUp';
import AuthUserContext from '../../higherorder/AuthUserContext';
import SignOutButton from '../../sessionmanagment/SignOut';
import * as routes from '../../../constants/routes';

import './Navigation.css';

const Navigation = () =>
  <AuthUserContext.Consumer>
    {authUser => authUser
      ? <NavigationAuth user={authUser}/>
      : <NavigationNonAuth />
    }
  </AuthUserContext.Consumer>

class NavigationAuth extends Component {
  constructor(props) {
    super(props)
    this.state = {
      userName: null
    }
  }

  componentDidMount() {
    this.getUserName(this.props.user);
  }

  getUserName = (user) =>{
    db.onceGetUserInfos(user).then(snapshot =>
      this.setState({ userName: snapshot.val().username })
    );
  }

  render(){
    return(
          <ul className="navigation">
            <li>Welcome Back</li>
            <li><Link to={routes.ACCOUNT}>{this.state.userName}</Link></li>
            <li><SignOutButton /></li>
          </ul>
    )}
}


const NavigationNonAuth = () =>
  <ul className="navigation">
    <li><Link to={routes.SIGN_IN}>Log In</Link></li>
    <li><SignUpLink /></li>
  </ul>

export default Navigation;