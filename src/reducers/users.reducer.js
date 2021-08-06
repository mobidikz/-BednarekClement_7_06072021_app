import { UPLOAD_USER_PICTURE } from "../actions/users.actions";
import { GET_USERS, DELETE_USER } from "../actions/users.actions";

const initialState = {};

export default function userReducer(state = initialState, action) {
    switch(action.type) {
        case GET_USERS:
            return action.payload;

        case DELETE_USER:
            return state.filter((user) => user.id !== action.payload.userId);

        case UPLOAD_USER_PICTURE:
            return state.map((user) => {
                if (user.id === action.payload.id) {
                    return action.payload; 
                }      
                return user;
            });
                
        default:
            return state
    };
}