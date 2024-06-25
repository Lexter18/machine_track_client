export const rolesReducer = (state = [], action) => {

    switch (action.type) {
        case 'loadingRoles':                
            return { ...state, roles: action.payload };  
        default:
            return state;
    }
}