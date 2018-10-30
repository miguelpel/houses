import React, { Component } from 'react';
import CardList from '../body/cardcontainer/CardList';
import { HouseFormLink } from '../houseForm/HouseForm';
import AuthUserContext from '../../higherorder/AuthUserContext';

import FiltersBar from '../body/filtersbar/FiltersBar';

import './Home.css';

const HomePage = () =>
  <AuthUserContext.Consumer>
    {authUser => <HomePageAuth user={authUser}/>
    }
  </AuthUserContext.Consumer>

class HomePageAuth extends Component {
  constructor(props) {
    super(props);

    this.state = {
      filter: null
    }
  }

  addFilter = (filter) => {
    this.setState({ filter })
  }

  render() {
    const { filter } = this.state;
    // if(filter !== null) console.log(`filter: ${filter.category}`)
    return (
      <div>
        <FiltersBar addFilter={this.addFilter} />
        {/* The Home Page is accessible by every user. */}
        <div className="newHouseDiv">
         {this.props.user ? <HouseFormLink /> : ''} 
        </div>
        <CardList filter={filter} addFilter={this.addFilter} />
      </div>
    );
  }
}

export default HomePage;