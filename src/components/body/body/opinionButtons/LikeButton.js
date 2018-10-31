import React from 'react';
import { db } from '../../../../firebase';
import AuthUserContext from '../../../higherorder/AuthUserContext';

import './LikeButton.css';

const LikeButton = (props) =>
    <AuthUserContext.Consumer>
    {authUser => <LikeButtonAuth data={props} user={authUser}/>
    }
    </AuthUserContext.Consumer>

const addLike = (houseId, userId) => {
    db.addLike(houseId, userId)
}

const displayAd = (houseId) => {
    const ad = document.getElementById(`ad${houseId}`)
    ad.innerHTML = "You must be signed-in to like a house!"
    setTimeout(() => {ad.innerHTML = ""}, 1000)
}

const LikeButtonAuth = (props) => {
    const { data } = props;
        return(
                <span className={data.opinion !== 'like' ? "activelike" : ""}
            onClick={props.user 
                ? (e) => {addLike(data.houseId, data.userId)} 
                : (e) => {displayAd(data.houseId)}}
            >{data.likes} Likes</span>
        )
}

export default LikeButton