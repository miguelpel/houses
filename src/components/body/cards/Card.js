import React, { Component } from 'react';
import PostedBy from './PostedBy';
import Likes from './Likes';
// import { db } from '../../../firebase';

import './Card.css';

class Card extends Component{
    constructor(props){
        super(props)

        this.state = {
            houseId: this.props.houseId,
            data: this.props.data,
            addFilter: this.props.addFilter,
            imgUrl: `https://firebasestorage.googleapis.com/v0/b/virtualhouses-dev.appspot.com/o/${this.props.data.image}?alt=media`
        }
    }

    // componentDidMount = () => {
    //     this.getImg()
    // }

    // getImg = () => {
    //     db.getImgUrl(this.state.data.image, url => this.setState({ imgUrl: url }))
    //     //Get a placeholder picture first?
    // }
    
    render() {
        const {data, addFilter, imgUrl} = this.state;
        // console.log("from card")
        // data.likes ? console.log(Object.keys(data.likes)) : console.log(0)
        // data.hates ? console.log(Object.keys(data.hates)) : console.log(0)
        // console.log(data)
        // console.log(this.state.houseId)
        // console.log(imgUrl);
        return(
            <div className="card">
            <p className="address">{data.address}</p>
            <PostedBy username={data.username} addFilter={addFilter}/>
            <div className="description">
                <img src={imgUrl}/>
                <p>{data.description}</p>
            </div>
            <Likes
                houseId={this.state.houseId}
                likes={data.likes}
                hates={data.hates}/>
            </div>
        )
    }
}

export default Card;