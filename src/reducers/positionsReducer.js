import {ACTION_REDUCER} from "../utils/constants.js";

export const positionsReducer = (state = [], action) => {

    switch (action.type) {
        case ACTION_REDUCER.LIST_POSITIONS:
            return { ...state, positions: action.payload };
        default:
            return state;
    }
}