import React from 'react';
import { db } from '../../../../firebase';
import './LikeButton.css';

const addHate = (houseId, userId) => {
    db.addHate(houseId, userId)
}

const HateButton = (props) => {
        return(
            <span className={props.opinion !== 'hate' ? "activelike" : ""}
                onClick={(e) => {addHate(props.houseId, props.userId)}}
            >{props.hates} Hates</span>
        )
}


export default HateButton