import React, { useState} from 'react';
import LeftNav from '../LeftNav';
import { useDispatch, useSelector } from 'react-redux';
import UploadImg from './UploadImg';
import { updateBio } from "../../actions/user.actions";
import { dateParser } from '../Utils';
import DeleteProfil from './DeleteProfil';


const UpdateProfil = () => {
    const[bio, setBio] = useState('');
    const [updateForm, setUpdateForm] = useState(false);
    const userData = useSelector((state) => state.userReducer);
    const usersData = useSelector((state) => state.usersReducer);
    const error = useSelector((state) => state.errorReducer.userError);
    const dispatch = useDispatch();


    const handleUpdate = () => {
        dispatch(updateBio(userData.id, bio));
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
                    <DeleteProfil />
                             
                </div>
            </div>
        </div>
    )
};

export default UpdateProfil;