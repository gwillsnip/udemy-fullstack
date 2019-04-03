// this is the reducer that handles the actions of the objects
// here we manipulated the state to include the new user( this is the reducer)
import { SET_CURRENT_USER } from '../actions/types';
import isEmpty from '../validation/isEmpty';





const initialState = {
    isAuthenticated: false,
    user: {}
}

export default function(state = initialState, action) {
    switch (action.type) {
        case SET_CURRENT_USER:
            return {
                ...state,
                isAuthenticated: !isEmpty(action.payload),
                user: action.payload

            }
        default:
            return state;

    }
}