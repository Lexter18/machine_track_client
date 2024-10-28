import {
    LIST_COUNTRIES, LIST_COUNTRIES_SUCCESS,
    LIST_DEPARTMENTS, LIST_DEPARTMENTS_SUCCESS,
    LIST_MUNICIPALITIES, LIST_MUNICIPALITIES_SUCCESS
} from "./actionTypes"

const initialState = {
    countries: [],
    departments: [],
    municipalities: [],
}

const locations = (state = initialState, action) => {
    switch (action.type) {
        case LIST_COUNTRIES_SUCCESS:
            console.log("ROLES 3.5 = ", JSON.stringify(action.payload, null, 2))
            state = {
                ...state,
                countries: action.payload,
            }
            break
        case LIST_DEPARTMENTS_SUCCESS:
            state = {
                ...state,
                departments: action.payload,
            }
            break
        case LIST_MUNICIPALITIES_SUCCESS:
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
