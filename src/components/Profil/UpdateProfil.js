import React, { useState} from 'react';
import LeftNav from '../LeftNav';
import { useDispatch, useSelector } from 'react-redux';
import UploadImg from './UploadImg';
import { updateBio } from "../../actions/user.actions";
import { dateParser } from '../Utils';
import FollowHandler from './FollowHandler';


const UpdateProfil = () => {
    const[bio, setBio] = useState('');
    const [updateForm, setUpdateForm] = useState(false);
    const userData = useSelector((state) => state.userReducer);
    const usersData = useSelector((state) => state.usersReducer);
    const error = useSelector((state) => state.errorReducer.userError);
    const dispatch = useDispatch();
    const [followingPopup, setFollowingPopup] = useState(false);
    const [followersPopup, setFollowersPopup] = useState(false);

    const handleUpdate = () => {
        dispatch(updateBio(userData._id, bio));
        setUpdateForm(false);
    }

    return (
        <div className='profil-container'>
            <LeftNav />
            <h1> Profil de {userData.pseudo}</h1>
            <div className='update-container'>
                <div className='left-part'>
                    <h3>Photo de profil</h3>
                    <img src={`${process.env.REACT_APP_API_URL}${userData.picture}`} alt="user-pic" />
                    <UploadImg />
                    <p>{error.maxSize}</p>
                    <p>{error.format}</p>
                </div>
                <div className="right-part">
                    <div className="bio-update">
                        <h3>Bio</h3>
                        {updateForm === false && (
                            <>
                                <p onClick={() => setUpdateForm(!updateForm)}>{userData.bio}</p>
                                <button onClick={() => setUpdateForm(!updateForm)}>Modifier bio</button>
                            </>
                        )}
                        {updateForm && (
                            <>
                                <textarea 
                                type="text" 
                                defaultValue={userData.bio} 
                                onChange={(e) => setBio(e.target.value)}
                            ></textarea>
                            <button onClick={handleUpdate}>Valider modification</button>
                            </>
                        )}
                    </div>
                    <h4>Inscrit depuis le : {dateParser(userData.createdAt)}</h4>
                    <h5 onClick={() => setFollowingPopup(true)}>
                        Abonnements : {userData.following ? userData.following.length : ""}
                    </h5> {/*s'il y a des abonnées (au chargement de la page le nombre n'ai pas dispo donc on rend la fonction asyncronne)*/}
                        
                    <h5 onClick={() => setFollowersPopup(true)}>
                        Abonnés : {userData.followers ? userData.followers.length : ""}
                    </h5>
                            
                </div>
            </div>
            {followingPopup && (
                <div className="popup-profil-container">
                    <div className="modal">
                        <h3>Abonnements</h3>
                        <span className="cross" onClick={() => setFollowingPopup(false)} >
                            &#10005; {/*code html pour faire une croix */}
                        </span>
                        <ul>
                            {usersData.map((user) => { //map de tout les utilisateurs
                                for (let i = 0; i< userData.following.length; i++) { //prend tout les abonnements
                                    if (user._id === userData.following[i]) { //retourn quans les id match
                                        return (
                                            <li key={user._id}>
                                                <img src={`${process.env.REACT_APP_API_URL}${user.picture}`} alt="user-pic"/>
                                                <h4>{user.pseudo}</h4>
                                                <div className="follow-handler">
                                                    <FollowHandler idToFollow={user._id} type={'suggestion'}/>
                                                    </div>
                                            </li>
                                        )
                                    }
                                }
                            return null
                            })}
                        </ul>
                    </div>
                </div>
            )}

{followersPopup && (
                <div className="popup-profil-container">
                    <div className="modal">
                        <h3>Abonnements</h3>
                        <span className="cross" onClick={() => setFollowersPopup(false)} >
                            &#10005; {/*code html pour faire une crois */}
                        </span>
                        <ul>
                            {usersData.map((user) => { //map de tout les utilisateurs
                                for (let i = 0; i< userData.followers.length; i++) { //prend tout les abonnements
                                    if (user._id === userData.followers[i]) { //retourn quans les id match
                                        return (
                                            <li key={user._id}>
                                                <img src={`${process.env.REACT_APP_API_URL}${user.picture}`} alt="user-pic"/>
                                                <h4>{user.pseudo}</h4>
                                                <div className="follow-handler">
                                                    <FollowHandler idToFollow={user._id} type={'suggestion'}/>
                                                </div>
                                            </li>
                                        )
                                    }

                                }
                            return null
                            })}
                        </ul>
                    </div>
                </div>
            )}
        </div>
    )
};

export default UpdateProfil;