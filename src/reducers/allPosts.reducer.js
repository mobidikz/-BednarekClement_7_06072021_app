import { GET_ALL_POSTS } from "../actions/post.actions";

const initialState = {};

export default function allPostsReducer(state = initialState, action) {
  switch (action.type) {
    case GET_ALL_POSTS:
      const posts = action.payload
      posts.likes = posts.likes.map(l => l.likerId)
      return posts
    default: 
      return state;
  }
}