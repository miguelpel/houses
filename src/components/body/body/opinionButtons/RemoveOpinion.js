import React from 'react';
import { db } from '../../../../firebase';

import './LikeButton.css';

const removeOpinion = (houseId, userId) => {
    db.removeOpinion(houseId, userId)
}

const RemoveOpinionButton = (props) => {
    return(
        <p>
            You {props.opinion} this house |
            <span className="activelike"
                onClick={(e) => {removeOpinion(props.houseId, props.userId)}}> Un{props.opinion}</span>
        </p>
        
    )
}

export default RemoveOpinionButton