import {ACTION_REDUCER} from "../utils/constants.js";

export const usersReducer = (state = [], action) => {

    switch (action.type) {
        case ACTION_REDUCER.LIST_USER_OWNER:
            return {
                ...state,
                users: action.payload,
            };
        case ACTION_REDUCER.LIST_USER_ROL:
            return {
                ...state,
                users: action.payload,
            };
        case ACTION_REDUCER.CREATE_USER_SUCCESS:
            return {
                ...state,
                user: [...state.user, action.payload],
            };
        case ACTION_REDUCER.CREATE_USER_ERROR:
            return {
                ...state,
                error: action.payload,
            };
        default:
            return state;
    }
}