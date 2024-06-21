export const locationsReducer = (state = [], action) => {

    switch (action.type) {
        case 'loadingCountries':
            return action.payload;        
        default:
            return state;
    }
}