import {useEffect, useReducer} from "react";
import {positionsReducer} from "../reducers/positionsReducer.js";
import {listPositions} from "../services/positionService.js";
import {ACTION_REDUCER} from "../utils/constants.js";


export const usePosition = () => {
    const [state, dispatch] = useReducer(positionsReducer, {
        positions: []
    });

    useEffect(() => {
        const getPositions = async () => {
            const positions = await listPositions();
            dispatch({
                type: ACTION_REDUCER.LIST_POSITIONS,
                payload: positions
            });
        };
        getPositions();
    }, []);

    return {
        ...state
    };

}