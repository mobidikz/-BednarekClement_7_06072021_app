import React from 'react';
import axios from 'axios';
import cookie from "js-cookie"; //pour supprimer le cookie également en front au cas où

const Logout = () => {

    const removeCookie = (key) => {
        if (window !== "undefined") { // sécurité -> s'il ce passe quelque chose sur la fenêtre
            cookie.remove(key, {expires: 1});
        }
    }

    const logout = async () => {
        await axios({
            method: 'get',
            url: `${process.env.REACT_APP_API_URL}api/user/logout`,
            withCredentials: true,
        })
            .then(() => removeCookie('jwt'))
            .catch((err) => console.log(err))

        window.location = "/";
    }

    return (
        <li onClick={logout}>
            <img src="./img/icons/logout.svg" alt="logout" />
        </li>
    );
};

export default Logout;