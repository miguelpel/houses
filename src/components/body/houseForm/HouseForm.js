import React, { Component } from 'react';
import Uploader from './Uploader';
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
      userId: '',
      username: '',
      address: '',
      pocode: '',
      description: '',
      picture: null,
      publicationdate: '',
      likes: [0],
      hates: [0],
      error: null,
    };
  
  const byPropKey = (propertyName, value) => () => ({
      [propertyName]: value,
  });
  
  const HouseFormPage = ({ history }) =>
  <AuthUserContext.Consumer>
    {authUser =>
      <div>
      <h1>New House</h1>
      <HouseForm user={authUser} history={history} />
    </div>
    }
  </AuthUserContext.Consumer>


  class HouseForm extends Component {
    constructor(props) {
      super(props);
      console.log("constructing house form")
      this.state = { ...INITIAL_STATE };
    }

    componentDidMount() {
      this.getUserName(this.props.user);
    }
  
    getUserName = (user) =>{
      db.onceGetUserInfos(user).then(snapshot => {
        this.setState({
          username: snapshot.val().username,
          userId: user.uid
        })
      }
      );
    }
  
    onSubmit = (event) => {
      const {
        userId,
        username,
        address,
        pocode,
        description,
        picture,
        likes,
        hates
      } = this.state;
  
      const currentdate = Date()

      const {
          history,
        } = this.props;
      
        db.doCreateHouse(userId, username, address, pocode, description, picture, currentdate, likes, hates)
            .then(() => {
              this.setState({ ...INITIAL_STATE });
              history.push(routes.HOME);
            })
            .catch(error => {
              this.setState(byPropKey('error', error));
            });
  
      event.preventDefault();
    }

    onDrop = (picture) => {
      this.setState({
        picture: picture,
      });
  }



    render() {
  
      const {
          userId,
          username,
          address,
          pocode,
          description,
          picture,
          error
      } = this.state;

        const isInvalid = username === '' ||
        address === '' ||
        pocode === '' ||
        description === '' ||
        picture === null;
  
        console.log(picture)
        console.log(isInvalid)

      return (
        <AuthUserContext.Consumer>
        {authUser =>
            <div>
            <h1>User name: {username}</h1>
            <h2>User id: {userId}</h2>
            <form onSubmit={this.onSubmit}>
          <Uploader onChange={this.onDrop}/>
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
          <textarea
            value={description}
            onChange={event => this.setState(byPropKey('description', event.target.value))}
            size="150"
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