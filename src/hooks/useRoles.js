import { useEffect, useReducer } from "react";
import { rolesReducer } from "../reducers/rolesReducer";
import { listRoles } from "../services/userServices";


export const useRoles = () => {
    const [state, dispatch] = useReducer(rolesReducer, {
        roles: []        
    });

    useEffect(() => {
        const getRoles = async () => {
            const roles = await listRoles();      
            dispatch({ type: 'loadingRoles', payload: roles });
        };
        getRoles();
    }, []);

    return {
        ...state
    }

}