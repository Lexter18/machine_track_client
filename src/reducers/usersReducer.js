export const usersReducer = (state = [], action) => {

    switch (action.type) {
        case 'loadingUsers':
            return action.payload;        
        default:
            return state;
    }
}