import React from 'react';
import { db } from '../../../../firebase';
import AuthUserContext from '../../../higherorder/AuthUserContext';

import './LikeButton.css';

const HateButton = (props) =>
    <AuthUserContext.Consumer>
    {authUser => <HateButtonAuth data={props} user={authUser}/>
    }
    </AuthUserContext.Consumer>

const addHate = (houseId, userId) => {
    db.addHate(houseId, userId)
}

const displayAd = (houseId) => {
    const ad = document.getElementById(`ad${houseId}`)
    ad.innerHTML = "You must be signed-in to hate a house!"
    setTimeout(() => {ad.innerHTML = ""}, 1000)
}

const HateButtonAuth = (props) => {
    const { data } = props;
        return(
                <span className={data.opinion !== 'hate' ? "activelike" : ""}
            onClick={props.user 
                ? (e) => {addHate(data.houseId, data.userId)} 
                : (e) => {displayAd(data.houseId)}}
            >{data.hates} Hates</span>
        )
}

export default HateButton