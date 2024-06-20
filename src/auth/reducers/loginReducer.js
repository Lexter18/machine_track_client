
export const loginReducer = (state = {}, action) => {
    switch (action.type) {
        case 'login':

            return {
                isAuth: true,
                user: action.payload.user,
                rol: action.payload.rol,
            };

        case 'logout':
            return {
                isAutth: false,
                user: undefined,
                rol: undefined,
            }

        default:
            return state;
    }
}