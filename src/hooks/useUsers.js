import {useReducer} from "react";
import {usersReducer} from "../reducers/usersReducer";
import {findUsersByOwner, findUsersByRol, saveInitialUser} from "../services/userServices";
import Swal from "sweetalert2";
import {Messages} from "../utils/messages.js";
import {useNavigate} from "react-router-dom";
import {ACTION_REDUCER, ROLES} from "../utils/constants.js";
import {showAlertErrorSimple, showAlertSuccessSimple} from "../components/common/alert.jsx";

const initialState = {
    user: [],
    users: [],
    error: null,
};

export const useUsers = () => {
    const [state, dispatch] = useReducer(usersReducer, initialState);
    const navigate = useNavigate();

    const getUsersByOwner = async () => {
        const users = await findUsersByOwner();
        dispatch({
            type: ACTION_REDUCER.LIST_USER_OWNER,
            payload: users,
        })
    }

    const getUsersByRol = async () => {
        const users = await findUsersByRol(ROLES.OWNER.id);
        dispatch({
            type: ACTION_REDUCER.LIST_USER_ROL,
            payload: users,
        })
    }

    const createUser = async (userData) => {
        try {
            const user = await saveInitialUser(userData);
            //console.log("test " + user)
            dispatch({
                type: ACTION_REDUCER.CREATE_USER_SUCCESS,
                payload: user
            });

            showAlertSuccessSimple({
                title: Messages.USER_CREATED_SUCCESS_TITLE,
                text: Messages.USER_CREATED_SUCCESS_TEXT_DESC,
                navigate: navigate,
                path: '/login'
            })

        } catch (error) {
            // console.log("Status: ", error.response.status);
            // console.log("Data: ", error.response.data);
            // console.log("Headers: ", error.response.headers);
            // console.log("Request: ", error.request.response);
            // console.log("Error Message: ", error.message);

            if (error.response && error.response.data && error.response.data.errors) {
                const errorMessages = error.response.data.errors.join('<br>');
                showAlertErrorSimple({text: errorMessages});
            } else {
                showAlertErrorSimple({text: Messages.GENERIC_ERROR_TEXT});
            }

            dispatch({
                type: ACTION_REDUCER.CREATE_USER_ERROR,
                payload: error
            });
        }
    };

    return {
        ...state,
        getUsersByOwner,
        getUsersByRol,
        createUser,
    }

}
