import React, { Component } from 'react'
import { db } from '../../../firebase';

class UserLikesInfos extends Component {
    constructor(props){
        super(props)

        this.state = {
            opinion: null,
            userId: this.props.userId,
            houseId: this.props.houseId
        }
    }

    componentDidMount = () => {
        this.getOpinion();
    }

    getOpinion = () => {
        db.getOpinion(this.state.houseId, this.state.userId, (value)=>{console.log(value)})
    }

    render() {
        return(
            <span>You {} this house</span>
        )
    }
}

export default UserLikesInfos;