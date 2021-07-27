import axios from "axios";

// Pour les postts
export const GET_POSTS = "GET_POSTS";
export const LIKE_POST = "LIKE_POST";
export const UNLIKE_POST = "UNLIKE_POST";

// Récupère la data et l'envois dans le store
export const getPosts = (num) => {
    return (dispatch) => {
        return axios
            .get(`${process.env.REACT_APP_API_URL}api/post/`)
            .then((res) => {
              const array = res.data.slice(0, num) //num la limite de post affichés
              dispatch({ type: GET_POSTS, payload: array }) // array à la place de res.data 
            })
            .catch((err) => console.log(err))
    }
}

export const likePost = (postId, userId) => {
  return (dispatch) => {
    return axios({
      method: "patch",
      url: `${process.env.REACT_APP_API_URL}api/post/like-post/${postId}`,
      data: { id: userId },
    })
      .then((res) => {
        dispatch({ type: LIKE_POST, payload: { postId, userId } });
      })
      .catch((err) => console.log(err));
  };
};

export const unlikePost = (postId, userId) => {
  return (dispatch) => {
    return axios({
      method: "patch",
      url: `${process.env.REACT_APP_API_URL}api/post/unlike-post/${postId}`,
      data: { id: userId },
    })
      .then((res) => {
        dispatch({ type: UNLIKE_POST, payload: { postId, userId } });
      })
      .catch((err) => console.log(err));
  };
};