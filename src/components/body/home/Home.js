import React, { Component } from 'react';
import Card from '../cards/Card';
import CardList from '../cards/CardList';

import withAuthorization from '../../higherorder/withAuthorization';

import FiltersBar from '../filtersbar/FiltersBar';

class HomePage extends Component {
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
    const { cards, filter } = this.state;
    console.log(cards);
    console.log(filter)
    if(filter !== null) console.log(`filter: ${filter.category}`)
    return (
      <div>
        <FiltersBar addFilter={this.addFilter} />
        <h1>Home</h1>
        <p>The Home Page is accessible by every user.</p>
        <CardList filter={filter} addFilter={this.addFilter} />
      </div>
    );
  }
}
// const authCondition = (authUser) => !!authUser;

// export default withAuthorization(authCondition)(HomePage);

export default HomePage;