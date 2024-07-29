import {useEffect, useReducer} from "react";
import {stateReducer} from "../reducers/stateReducer.js";
import {listState} from "../services/stateServices.js";
import {ACTION_REDUCER} from "../utils/constants.js";


export const useStateApp = () => {
    const [state, dispatch] = useReducer(stateReducer, {
        states: []
    });

    useEffect(() => {
        const getStates = async () => {
            const states = await listState();
            dispatch({
                type: ACTION_REDUCER.LIST_STATE,
                payload: states
            });
        };
        getStates();
    }, []);

    return {
        ...state
    };

}