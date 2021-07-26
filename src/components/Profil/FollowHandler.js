import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { followUser, unfollowUser } from '../../actions/user.actions';
import { isEmpty } from '../Utils';

const FollowHandler = ({ idToFollow, type }) => {
    const userData = useSelector((state) => state.userReducer);
    const [isFollowed, setIsFollowed] = useState(false);
    const dispatch = useDispatch();

    const handleFollow = () => {
        dispatch(followUser(userData._id, idToFollow));
        setIsFollowed(true);
    }

    const handleUnfollow = () => {
        dispatch(unfollowUser(userData._id, idToFollow)); //le nom peu prété à confusion mais c'est bien pour unfollow
        setIsFollowed(false);
    }

    useEffect(() => {
        if (!isEmpty(userData.following)) {
            setIsFollowed(userData.following.includes(idToFollow))
        }
    }, [userData.following]);


    return (
        <>
            {isFollowed && !isEmpty(userData) && (
                <span onClick={handleUnfollow}>
                    {type ==="suggestion" && <button className="unfollow-btn">Abonné</button>}
                    {type ==="card" && <img src="./img/icons/checked.svg" alt="checked"/>}
                </span>
            )}
            {isFollowed === false && !isEmpty(userData) && (
                <span onClick={handleFollow}>
                 {type ==="suggestion" && <button className="follow-btn">Suivre</button>}
                 {type ==="card" && <img src="./img/icons/check.svg" alt="check"/>}
            </span>
            )}
        </>

    );
};

export default FollowHandler;