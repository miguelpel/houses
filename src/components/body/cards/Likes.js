import React from 'react';
import LikeButton from './LikeButton';
import HateButton from './HateButton';
import UserLikesInfos from './UserLikesInfos';
import AuthUserContext from '../../higherorder/AuthUserContext';

const Likes = (props) => 
    <AuthUserContext.Consumer>
    {authUser => authUser
      ? <LikesAuth data={props} user={authUser}/>
      : <LikesNonAuth data={props}/>
    }
  </AuthUserContext.Consumer>


const LikesAuth = (props) => {
    const { data } = props;
    return <div>
        <div>
        <LikeButton
            houseId={data.houseId}
            userId={props.user.uid}
            likes={data.likes}
            /> | <HateButton
            houseId={data.houseId}
            userId={props.user.uid}
            hates={data.hates}
            />
        </div>
        <UserLikesInfos houseId={data.houseId} userId={props.user.uid}/>
    </div>
}
    


const LikesNonAuth = (props) => 
    <div>
        Non Autenticated
    </div>


export default Likes;