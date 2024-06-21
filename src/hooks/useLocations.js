import { useReducer } from "react";
import { locationsReducer } from "../reducers/locationsReducer";
import { listCountries } from "../services/locationServices";

const initialCountry = [];

export const useLocations = () => {
    const [countries, dispatch] = useReducer(locationsReducer, initialCountry);

    const getCountries = async () => {        
        const result = await listCountries();        
        dispatch({
            type: 'loadingCountries',
            payload: result.data,
        })
    }

    return {
        countries,
        getCountries,
    }

}