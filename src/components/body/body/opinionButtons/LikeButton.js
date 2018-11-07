import React from 'react';
import { db } from '../../../../firebase';
import AuthUserContext from '../../../higherorder/AuthUserContext';

import './LikeButton.css';

const LikeButton = props => (
	<AuthUserContext.Consumer>{authUser => <LikeButtonAuth data={props} user={authUser} />}</AuthUserContext.Consumer>
);

const addLike = (houseId, userId) => {
	db.addLike(houseId, userId);
};

const displayAd = (houseId, owner) => {
	const ad = document.getElementById(`ad${houseId}`);
	if (owner) ad.innerHTML = "You can't express opinion on your own house!";
	else ad.innerHTML = 'You must be signed-in to like a house!';
	setTimeout(() => {
		ad.innerHTML = '';
	}, 1000);
};

const LikeButtonAuth = props => {
	const { data } = props;
	const owner = data.ownerId === data.userId;
	return (
		<span
			className={data.opinion !== 'like' && !owner ? 'activelike' : ''}
			onClick={
				props.user && !owner
					? e => {
							addLike(data.houseId, data.userId);
					  }
					: e => {
							displayAd(data.houseId, owner);
					  }
			}
		>
			{data.likes} Likes
		</span>
	);
};

export default LikeButton;
