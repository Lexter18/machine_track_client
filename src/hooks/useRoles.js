import {useEffect, useReducer} from "react";
import {rolesReducer} from "../reducers/rolesReducer";
import {listRoles} from "../services/userServices";
import {ACTION_REDUCER} from "../utils/constants.js";


export const useRoles = () => {
    const [state, dispatch] = useReducer(rolesReducer, {
        roles: []
    });

    useEffect(() => {
        const getRoles = async () => {
            const roles = await listRoles();
            dispatch({
                type: ACTION_REDUCER.LIST_ROLES,
                payload: roles
            });
        };
        getRoles();
    }, []);

    return {
        ...state
    }

}