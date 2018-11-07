import React from 'react';
import { db } from '../../../../firebase';
import AuthUserContext from '../../../higherorder/AuthUserContext';

import './LikeButton.css';

const HateButton = props => (
	<AuthUserContext.Consumer>{authUser => <HateButtonAuth data={props} user={authUser} />}</AuthUserContext.Consumer>
);

const addHate = (houseId, userId) => {
	db.addHate(houseId, userId);
};

const displayAd = (houseId, owner) => {
	const ad = document.getElementById(`ad${houseId}`);
	if (owner) ad.innerHTML = "You can't express opinion on your own house!";
	else ad.innerHTML = 'You must be signed-in to hate a house!';
	setTimeout(() => {
		ad.innerHTML = '';
	}, 2000);
};

const HateButtonAuth = props => {
	const { data } = props;
	const owner = data.ownerId === data.userId;
	return (
		<span
			className={data.opinion !== 'hate' && !owner ? 'activelike' : ''}
			onClick={
				props.user && !owner
					? e => {
							addHate(data.houseId, data.userId);
					  }
					: e => {
							displayAd(data.houseId, owner);
					  }
			}
		>
			{data.hates} Hates
		</span>
	);
};

export default HateButton;
