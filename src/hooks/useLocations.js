import {useEffect, useReducer, useState} from "react";
import {locationsReducer} from "../reducers/locationsReducer";
import {listCountries, listDepartments, listMunicipalities} from "../services/locationServices";
import {ACTION_REDUCER} from "../utils/constants.js";

export const useLocations = () => {
    const [state, dispatch] = useReducer(locationsReducer, {
        countries: [],
        departments: [],
        municipalities: []
    });

    const [isDepartmentDisabled, setIsDepartmentDisabled] = useState(true);
    const [isMunicipalityDisabled, setIsMunicipalityDisabled] = useState(true);


    useEffect(() => {
        const fetchCountries = async () => {
            const countries = await listCountries();
            dispatch({
                type: ACTION_REDUCER.LIST_COUNTRIES,
                payload: countries
            });
        };
        fetchCountries();
    }, []);

    const fetchDepartments = async (countryId) => {
        const departments = await listDepartments(countryId);
        dispatch({
            type: ACTION_REDUCER.LIST_DEPARTMENTS,
            payload: departments
        });
        setIsDepartmentDisabled(false);
    };

    const fetchMunicipalities = async (departmentId) => {
        const municipality = await listMunicipalities(departmentId);
        dispatch({
            type: ACTION_REDUCER.LIST_MUNICIPALITIES,
            payload: municipality
        });
        setIsMunicipalityDisabled(false);
    };

    return {
        ...state,
        isDepartmentDisabled,
        isMunicipalityDisabled,
        fetchDepartments,
        fetchMunicipalities,
        setIsDepartmentDisabled,
        setIsMunicipalityDisabled
    };

}