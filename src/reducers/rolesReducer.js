import {ACTION_REDUCER} from "../utils/constants.js";

export const rolesReducer = (state = [], action) => {

    switch (action.type) {
        case ACTION_REDUCER.LIST_ROLES:
            return { ...state, roles: action.payload };  
        default:
            return state;
    }
}