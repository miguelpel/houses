import React, { Component } from 'react';
import { db } from '../../../firebase';


class HateButton extends Component {
    constructor(props){
        super(props)

        this.state = {
            hates: this.props.hates,
            houseId: this.props.houseId,
            userId: this.props.userId
        }
    }

    componentDidMount = () => {
        this.getHates();
    }

    getHates() {
        db.getHates(this.state.houseId, hates => {this.setState({
            hates : hates.val()
        })})
    }

    addHate = (houseId, userId) => {
        db.addHate(houseId, userId)
    }

    render(){
        return(
            <span onClick={(e) => {this.addHate(this.state.houseId, this.state.userId)}}>{this.state.hates ? Object.keys(this.state.hates).length : 0} Hates</span>
        )
    }
}



export default HateButton