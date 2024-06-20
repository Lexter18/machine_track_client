import { useReducer } from "react";
import { rolesReducer } from "../reducers/rolesReducer";
import { listRoles } from "../services/userServices";


const initialRoles = [];

export const useRoles = () => {
    const [roles, dispatch] = useReducer(rolesReducer, initialRoles);

    const getRoles = async () => {        
        const result = await listRoles();        
        dispatch({
            type: 'loadingRoles',
            payload: result.data,
        })
    }

    return {
        roles,
        getRoles,
    }

}