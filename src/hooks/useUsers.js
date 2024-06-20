import { useReducer } from "react";
import { usersReducer } from "../reducers/usersReducer";
import { findUsers } from "../services/userServices";

const initialUsers = [];

export const useUsers = () => {
    const [users, dispatch] = useReducer(usersReducer, initialUsers);

    const getUsers = async () => {        
        const result = await findUsers();        
        dispatch({
            type: 'loadingUsers',
            payload: result.data,
        })
    }

    return {
        users,
        getUsers,
    }

}
