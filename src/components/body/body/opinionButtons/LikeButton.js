import React from 'react';
import { db } from '../../../../firebase';
import './LikeButton.css';

const addLike = (houseId, userId) => {
    db.addLike(houseId, userId)
}

const LikeButton = (props) => {
        return(
            <span className={props.opinion !== 'like' ? "activelike" : ""}
                onClick={(e) => {addLike(props.houseId, props.userId)}}
            >{props.likes} Likes</span>
        )
}


export default LikeButton