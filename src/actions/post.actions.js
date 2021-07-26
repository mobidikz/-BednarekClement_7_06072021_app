import axios from "axios";

// Pour les postts
export const GET_POSTS = "GET_POSTS";

// Récupère la data et l'envois dans le store
export const getPosts = () => {
    return (dispatch) => {
        return axios
            .get(`${process.env.REACT_APP_API_URL}api/post/`)
            .then((res) => {
                dispatch({ type: GET_POSTS, payload: res.data })
            })
            .catch((err) => console.log(err))
    }
}