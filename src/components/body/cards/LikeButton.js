import React, { Component } from 'react';
import { db } from '../../../firebase';


class LikeButton extends Component {
    constructor(props){
        super(props)

        this.state = {
            likes: this.props.likes,
            houseId: this.props.houseId,
            userId: this.props.userId
        }
    }

    componentDidMount = () => {
        this.getLikes();
      }

    getLikes() {
        db.getLikes(this.state.houseId, likes => {this.setState({
            likes : likes.val()
        })})
    }

    addLike = (houseId, userId) => {
        db.addLike(houseId, userId)
    }

    render(){
        return(
            <span onClick={(e) => {this.addLike(this.state.houseId, this.state.userId)}}>{this.state.likes ? Object.keys(this.state.likes).length : 0} Likes</span>
        )
    }
}


export default LikeButton