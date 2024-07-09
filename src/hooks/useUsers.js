import {useReducer} from "react";
import {usersReducer} from "../reducers/usersReducer";
import {findUsers, saveInitialUser} from "../services/userServices";
import Swal from "sweetalert2";
import {Messages} from "../utils/messages.js";
import {useNavigate} from "react-router-dom";

const initialUsers = {
    users: [],
    error: null,
};

export const useUsers = () => {
    // const [users, dispatch] = useReducer(usersReducer, initialUsers);
    const [state, dispatch] = useReducer(usersReducer, initialUsers);
    const navigate = useNavigate();

    const getUsers = async () => {
        const result = await findUsers();
        dispatch({
            type: 'loadingUsers',
            payload: result.data,
        })
    }

    const createUser = async (userData) => {
        try {
            const user = await saveInitialUser(userData);
            //console.log("test " + user)
            dispatch({
                type: 'CREATE_USER_SUCCESS',
                payload: user
            });

            Swal.fire(
                Messages.USER_CREATED_SUCCESS_TITLE,
                Messages.USER_CREATED_SUCCESS_TEXT_DESC,
                Messages.USER_CREATED_SUCCESS_ICON
            ).then(() => {
                navigate('/login');
            });

        } catch (error) {
            // console.log("Status: ", error.response.status);
            // console.log("Data: ", error.response.data);
            // console.log("Headers: ", error.response.headers);
            // console.log("Request: ", error.request.response);
            // console.log("Error Message: ", error.message);

            if (error.response && error.response.data && error.response.data.errors) {
                const errorMessages = error.response.data.errors.join('<br>');
                Swal.fire(
                    Messages.GENERIC_ERROR_TITLE,
                    errorMessages,
                    Messages.GENERIC_ERROR_ICON
                );
            } else {
                Swal.fire(
                    Messages.GENERIC_ERROR_TITLE,
                    Messages.GENERIC_ERROR_TEXT,
                    Messages.GENERIC_ERROR_ICON
                );
            }

            dispatch({type: 'CREATE_USER_ERROR', payload: error});
        }
    };

    return {
        state,
        getUsers,
        createUser,
    }

}
