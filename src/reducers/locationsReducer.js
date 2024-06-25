
export const locationsReducer = (state = [], action) => {

    switch (action.type) {
        case 'loadingCountries':
            return { ...state, countries: action.payload };
        case 'loadingDepartments':
            return { ...state, departments: action.payload };
        case 'loadingMunicipalities':
            return { ...state, municipalities: action.payload };
        default:
            return state;
    }
}