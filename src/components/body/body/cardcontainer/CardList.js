import React from 'react';
import AuthUserContext from '../../../higherorder/AuthUserContext';
import CardListAuth from './CardListAuth';
import CardListNonAuth from './CardListNonAuth';

const CardList = (props) =>
<AuthUserContext.Consumer>
  {authUser => authUser
    ? <CardListAuth user={authUser} filter={props.filter} addFilter={props.addFilter}/>
    : <CardListNonAuth filter={props.filter} addFilter={props.addFilter}/>
  }
</AuthUserContext.Consumer>

export default CardList;
  
