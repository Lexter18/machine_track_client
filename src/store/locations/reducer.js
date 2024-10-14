import {
    LIST_COUNTRIES,
    LIST_DEPARTMENTS,
    LIST_MUNICIPALITIES
} from "./actionTypes"

const initialState = {
    countries: [],
    departments: [],
    municipalities: [],
}

const locations = (state = initialState, action) => {
    switch (action.type) {
        case LIST_COUNTRIES:
            state = {
                ...state,
                countries: action.payload,
            }
            break
        case LIST_DEPARTMENTS:
            state = {
                ...state,
                departments: action.payload,
            }
            break
        case LIST_MUNICIPALITIES:
            state = {
                ...state,
                municipalities: action.payload,
            }
            break
        default:
            state = {...state}
            break
    }
    return state
}

export default locations;
