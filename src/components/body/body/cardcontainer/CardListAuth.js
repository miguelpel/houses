import React, { Component } from 'react';
import Card from '../cards/Card';
import { db } from '../../../../firebase';

class CardListAuth extends Component {
    constructor(props) {
      super(props);
  
      this.state = {
        user: this.props.user,
        cards: []
      };
    }

    componentWillUnmount() {
        this.isCancelled = true;
    }

    componentDidMount = () => {
        db.getCards(cards => {
          const cardData = cards.val();
          const returnCards = Object.keys(cardData).map(key => {
              return <Card
                          cardData={cardData[key]}
                          user={this.props.user}
                          key={key}
                          houseId={key}
                          addFilter={this.props.addFilter}
                      />
            })
            !this.isCancelled && this.setState({
                cards : returnCards,
            });
        })
      }
 
    filter = (cards) => {
        let filteredCards;
        const filter = this.props.filter;
        if (filter !== null) {
            switch(filter.category) {
                case "username":
                return cards.filter((val, ind, arr) => {
                    return val.props.cardData.username === filter.value
                })
                case "likes":
                let value = filter.value;
                return cards.sort((a, b)=>{
                    let aValues=0;
                    let bValues=0;
                    let aOpinions = a.props.cardData.opinions;
                    let bOpinions = b.props.cardData.opinions;
                    if(aOpinions){
                        Object.keys(aOpinions).map(key => {
                            if(aOpinions[key] === value) {
                                aValues++
                                return true;
                            }
                            return false;
                        }
                    )
                    }
                    if(bOpinions){
                        Object.keys(bOpinions).map(key => {
                            if(bOpinions[key] === value) {
                                bValues++
                                return true
                            }
                            return false
                        })
                    }
                    return bValues - aValues
                })
                case "date":
                default:
                return cards.sort((a, b) => {
                    let aDate = Date.parse(a.props.cardData.publicationdate)
                    let bDate = Date.parse(b.props.cardData.publicationdate)
                    return bDate - aDate
                })
            }
        } else {
            filteredCards = cards;
        }
        return filteredCards
    }

    getCards = () => {
        return this.filter(this.state.cards)
    }

    render() {
      const { cards } = this.state;
      return (
            <div>
                {/* <h2 id="top">List of cards</h2> */}
                {!!cards && this.getCards()}
          </div>
        )
    }
}

export default CardListAuth;