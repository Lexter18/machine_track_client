import { useReducer } from "react";
import { loginReducer } from "../reducers/loginReducer";
import Swal from "sweetalert2";
import { loginUser } from "../services/authService";
import { useNavigate } from "react-router-dom";

const initialLogin = JSON.parse(sessionStorage.getItem('login')) || {
    isAuth: false,
    rol: undefined,
    user: undefined,
}

export const useAuth = () => {

    const [login, dispatch] = useReducer(loginReducer, initialLogin);
    const navigate = useNavigate();


    const handlerLogin = async ({ username, password }) => {


        try {
            const response = await loginUser({ username, password });
            const token = response.data.access_token;
            const claims = JSON.parse(window.atob(token.split(".")[1]))

            const user = { username: claims.sub }
            const rol = JSON.parse(claims.authorities)[0]

            dispatch({
                type: 'login',
                payload: { user, rol },
            });

            sessionStorage.setItem('login', JSON.stringify({
                isAuth: true,
                rol,
                user,
            }));

            sessionStorage.setItem('token', `Bearer ${token}`);
            navigate('/home')

        } catch (error) {
            if (error.response?.status == 401) {
                Swal.fire('Error Login', 'Username o password invalidos', 'error');
            } else if (error.response?.status == 403) {
                Swal.fire('Error Login', 'No tiene acceso al recurso', 'error');
            } else {
                throw error;
            }
        }
    }

    const handlerLogout = () => {
        dispatch({
            type: 'logout',
        })
        sessionStorage.clear();
    }

    return {
        login,
        handlerLogin,
        handlerLogout,
    }
} 