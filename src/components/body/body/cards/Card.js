import React, { Component } from 'react';
import PostedBy from '../postedByDiv/PostedBy';
import LikeButton from '../opinionButtons/LikeButton';
import HateButton from '../opinionButtons/HateButton';
import RemoveOpinion from '../opinionButtons/RemoveOpinion';
// import Likes from './Likes';
import { db } from '../../../../firebase';

import './Card.css';

class Card extends Component{
    constructor(props){
        super(props)
        this.state = {
            houseId: this.props.houseId,
            data: null,
            addFilter: this.props.addFilter,
            imgUrl: null
        }
    }

    componentDidMount = () => {
        db.getCard(this.state.houseId, (data) => this.setState({
            data: data.val(),
            imgUrl: `https://firebasestorage.googleapis.com/v0/b/virtualhouses-dev.appspot.com/o/${data.val().image}?alt=media`
        }))
    }

    getLikes = () => {
            let likes = 0;
            let hates = 0;
            let opinion = null;
            let ops = this.state.data.opinions
            if(ops) {
                Object.keys(ops).map(key => {
                    if (ops[key] === "like") likes++
                    if (ops[key] === "hate") hates++
                    if (this.props.user && key === this.props.user.uid){
                            opinion = ops[key]
                    }
                    return true;
                })
            }
            return(
                <div className="likeBar">
                    <p>
                    <LikeButton
                        opinion={opinion}
                        className={ "activelike"}
                        likes={likes}
                        houseId={this.state.houseId}
                        userId={this.props.user ? this.props.user.uid : null}
                        /> | <HateButton
                                opinion={opinion}
                                hates={hates}
                                houseId={this.state.houseId}
                                userId={this.props.user ? this.props.user.uid : null}
                            />
                    </p>
                    {opinion !== null
                        ? <RemoveOpinion
                            opinion={opinion}
                            houseId={this.state.houseId}
                            userId={this.props.user.uid}
                          />
                        : ''}
                </div>
            )
        }
    
    
    render() {
        if(this.state.data) {
            const { data, imgUrl, addFilter } = this.state;
            return(
                <div className="card">
                <p className="address">{data.address}, {data.pocode}</p>
                <PostedBy username={data.username} addFilter={addFilter} publicationdate={data.publicationdate}/>
                <div className="description">
                    <img alt="" src={imgUrl}/>
                    <p>{data.description}</p>
                </div>
                {this.getLikes()}
                {/* <Likes
                    houseId={this.state.houseId}
                    removeOpinion={this.removeOpinion}
                /> */}
                </div>
            )
        } else {
            return <h2>Building...</h2>
        }
    }
}

export default Card;