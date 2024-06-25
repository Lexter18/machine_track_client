import {useEffect, useReducer, useState} from "react";
import {locationsReducer} from "../reducers/locationsReducer";
import {listCountries, listDepartments, listMunicipalities} from "../services/locationServices";

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
                type: 'loadingCountries',
                payload: countries
            });
        };
        fetchCountries();
    }, []);

    const fetchDepartments = async (countryId) => {
        const departments = await listDepartments(countryId);
        dispatch({
            type: 'loadingDepartments',
            payload: departments
        });
        setIsDepartmentDisabled(false);
    };

    const fetchMunicipalities = async (departmentId) => {
        const municipality = await listMunicipalities(departmentId);
        dispatch({
            type: 'loadingMunicipalities',
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