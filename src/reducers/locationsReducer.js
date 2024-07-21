import {ACTION_REDUCER} from "../utils/constants.js";

export const locationsReducer = (state = [], action) => {

    switch (action.type) {
        case ACTION_REDUCER.LIST_COUNTRIES:
            return { ...state, countries: action.payload };
        case ACTION_REDUCER.LIST_DEPARTMENTS:
            return { ...state, departments: action.payload };
        case ACTION_REDUCER.LIST_MUNICIPALITIES:
            return { ...state, municipalities: action.payload };
        default:
            return state;
    }
}