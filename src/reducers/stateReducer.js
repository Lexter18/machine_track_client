import {ACTION_REDUCER} from "../utils/constants.js";

export const stateReducer = (state = [], action) => {

    switch (action.type) {
        case ACTION_REDUCER.LIST_STATE:
            return { ...state, states: action.payload };
        default:
            return state;
    }
}