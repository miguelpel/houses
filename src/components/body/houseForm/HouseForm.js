import React, { Component } from 'react';
import AuthUserContext from '../../higherorder/AuthUserContext';
import withAuthorization from '../../higherorder/withAuthorization';
import {
    Link,
    withRouter,
  } from 'react-router-dom';
  
import { auth, db } from '../../../firebase';
import * as routes from '../../../constants/routes';
  
import './HouseForm.css';


  const INITIAL_STATE = {
      user: null,
      userId: '',
      username: '',
      address: '',
      pocode: '',
      description: '',
      picture: '',
      publicationdate: '',
      likes: [],
      hates: [],
      error: null,
    };
  
  const byPropKey = (propertyName, value) => () => ({
      [propertyName]: value,
  });
  
  const HouseFormPage = ({ history }) =>
    <div>
      <h1>New House</h1>
      <HouseForm history={history} />
    </div>
  
  class HouseForm extends Component {
    constructor(props) {
      super(props);
  
      this.state = { ...INITIAL_STATE };
    }

    componentDidMount = () => {
        this.setState({
            user: auth.currentUser
        })
    }
  
    onSubmit = (event) => {
      const {
        username,
        address,
        pocode,
        description,
        picture,
      } = this.state;
  
      const currentdate = Date()

      const {
          history,
        } = this.props;
      
        db.doCreateHouse(username, address, pocode, description, picture, currentdate)
            .then(() => {
              this.setState({ ...INITIAL_STATE });
              history.push(routes.HOME);
            })
            .catch(error => {
              this.setState(byPropKey('error', error));
            });
  
      event.preventDefault();
    }
  
    render() {
  
      const {
          username,
          address,
          pocode,
          description,
          picture,
          error
      } = this.state;

      // check
    //   const isInvalid =
    //   passwordOne !== passwordTwo ||
    //   passwordOne === '' ||
    //   email === '' ||
    //   username === '';

        // block the send for now.
        const isInvalid = true;
  
      return (
        <AuthUserContext.Consumer>
        {authUser =>
            <div>
            {console.log(authUser)}
            <h1>User name: {authUser.email}</h1>
            <h2>User id: {authUser.uid}</h2>
            <form onSubmit={this.onSubmit}>
          <input
            value={picture}
            type="file" 
            name="pic" 
            accept="image/*"
            onChange={event => this.setState(byPropKey('picture', event.target.value))}
            placeholder="Upload Picture"
          />
          <input
            value={address}
            onChange={event => this.setState(byPropKey('address', event.target.value))}
            type="text"
            placeholder="House Address"
          />
          <input
            value={pocode}
            onChange={event => this.setState(byPropKey('pocode', event.target.value))}
            type="text"
            placeholder="Post Code"
          />
          <input
            value={description}
            onChange={event => this.setState(byPropKey('description', event.target.value))}
            type="text"
            placeholder="Description"
          />
          <button disabled={isInvalid} type="submit">
            Add House
          </button>
          { error && <p>{error.message}</p> }
        </form>
            </div>
        }
      </AuthUserContext.Consumer>
      );
    }
  }
  
  const HouseFormLink = () =>
    <p>
      <Link className="signUpBtn" to={routes.HOME_FORM}>New House</Link>
    </p>
  
const authCondition = (authUser) => !!authUser;

export default withAuthorization(authCondition)(HouseFormPage);

export {
    HouseForm,
    HouseFormLink,
  };