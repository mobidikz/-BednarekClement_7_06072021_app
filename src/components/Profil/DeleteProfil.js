import React, { useContext } from 'react';
import { useDispatch } from 'react-redux';
import { deleteUser } from '../../actions/users.actions';
import { UidContext } from "../../components/AppContext";
import cookie from "js-cookie";

const DeleteProfil = () => {
    const uid = useContext(UidContext);
    const dispatch = useDispatch();

    const deleteProfil = async () => {

        await dispatch(deleteUser(uid))
        
        if (window !== "undefined") { // sécurité -> s'il ce passe quelque chose sur la fenêtre
            cookie.remove('jwt');
        }

        window.location = "/";
    }

    return (
        <div onClick={() => {
            if (window.confirm('Supprimer votre profil ?')) { 
                deleteProfil();
            }
        }}>
            
            <br/>
            <h5>Supprimer profil ⚠️</h5>
            
        </div>
    )
};

export default DeleteProfil;