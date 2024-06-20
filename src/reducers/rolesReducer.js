export const rolesReducer = (state = [], action) => {

    switch (action.type) {
        case 'loadingRoles':
            return action.payload;        
        default:
            return state;
    }
}