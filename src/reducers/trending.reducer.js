import { GET_TRENDS } from "../actions/post.actions";

const initialState = {};

export default function trandingReducer(state = initialState, action) {
    switch (action.type) {
        case GET_TRENDS:
            return action.payload;
        default:
            return state;
    }
}