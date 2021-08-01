import axios from 'axios';

//recupération de tout les utilisateurs
export const GET_USERS = "GET_USERS";
export const DELETE_USER = "DELETE_USER";

export const getUsers = () => {
    return (dispatch) => {
        return axios
            .get(`${process.env.REACT_APP_API_URL}api/user`)
            .then((res) => {
                dispatch({ type: GET_USERS, payload: res.data });
            })
            .catch((err) => console.log(err));
    }
}

export const deleteUser = (userId) => {
    return (dispatch) => {
        return axios ({
          method: 'delete',
          url: `${process.env.REACT_APP_API_URL}api/user/${userId}`,
        })
          .then((res) => {
            dispatch({ type: DELETE_USER, payload: { userId }});
          })
          
          .then((res) => {
            
          })
          .catch((err) => console.log(err));
      
    }
}
