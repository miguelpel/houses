import React, { Component } from 'react';
import Card from './Card';
import { db } from '../../../firebase';

class CardList extends Component {
    constructor(props) {
      super(props);
  
      this.state = {
        cards: null
      };
    }
  
    componentDidMount = () => {
      db.getCards(cards => {
        this.setState({
          cards : cards.val()
        })
      })
    }
  
    displayCards = () => {
      let filteredCards;
      const { cards } = this.state;
      const filter = this.props.filter;
      if (filter !== null && filter.category === "username") {
        filteredCards = Object.keys(cards).map(key => {
          if (cards[key].username === filter.value){
            return <Card key={key} houseId={key} data={cards[key]} addFilter={this.props.addFilter} />
          }
        })
      } else {
        filteredCards = Object.keys(cards)
      .sort(this.compareByFilter) 
      .map(key =>
        <Card key={key} houseId={key} data={cards[key]} addFilter={this.props.addFilter} />
      );
      }    
      return filteredCards;
    }

    compareByFilter = (a, b) => {
        console.log(a)
        console.log(b)
        const filter = this.props.filter;
        if(filter !== null) {
          switch(filter.category){
            case "likes":
            // What if likes === 0 ?
            return this.state.cards[a].likes.length >= this.state.cards[b].likes.length
            ? +1 : -1
            case "hates":
            return this.state.cards[a].hates.length >= this.state.cards[b].hates.length
            ? +1 : -1
            default:
            return this.state.cards[a].date >= this.state.cards[b].date
            ? +1 : -1
          }
        }
        // filter can be: 'user name', 'date', 'likes', 'hates'
        // return a negative value: a is lower than b
        // retrun a positive value: a is higher than b
        // return 0, a and b are equal (one after the other in the output array.)
        // return -1
        console.log("switch failed");
    }
  
    render() {
      const { cards } = this.state;
      console.log(cards);
      console.log(`filter: ${this.props.filter}`)
      return (
            <div>
                <h2 id="top">List of cards</h2>
                <p>(Saved in Firebase Database)</p>
                {!!cards && this.displayCards()}
          </div>
        )
    }
}

export default CardList;
  
