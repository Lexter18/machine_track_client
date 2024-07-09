export const usersReducer = (state = [], action) => {

    switch (action.type) {
        case 'loadingUsers':
            return {
                ...state,
                users: action.payload,
            };
        case 'CREATE_USER_SUCCESS':
            return {
                ...state,
                users: [...state.users, action.payload],
            };
        case 'CREATE_USER_ERROR':
            return {
                ...state,
                error: action.payload,
            };
        default:
            return state;
    }
}