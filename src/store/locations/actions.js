import {
    LIST_COUNTRIES, LIST_COUNTRIES_FAILED, LIST_COUNTRIES_SUCCESS,
    LIST_DEPARTMENTS, LIST_DEPARTMENTS_FAILED, LIST_DEPARTMENTS_SUCCESS,
    LIST_MUNICIPALITIES, LIST_MUNICIPALITIES__FAILED, LIST_MUNICIPALITIES_FAILED, LIST_MUNICIPALITIES_SUCCESS
} from "./actionTypes"


export const listCountries = countries => {
    return {
        type: LIST_COUNTRIES
    }
}

export const listDepartments = (idCountry) => {
    return {
        type: LIST_DEPARTMENTS,
        payload: idCountry,
    }
}

export const listMunicipality = (idDepartment) => {
    return {
        type: LIST_MUNICIPALITIES,
        payload: idDepartment,
    }
}

export const listCountriesSuccess = countries => {
    console.log("ROLES 2 = ", JSON.stringify(countries, null, 2))
    return {
        type: LIST_COUNTRIES_SUCCESS,
        payload: countries,
    }
}

export const listDepartmentsSuccess = departments => {
    return {
        type: LIST_DEPARTMENTS_SUCCESS,
        payload: departments,
    }
}

export const listMunicipalitiesSuccess = municipalities => {
    return {
        type: LIST_MUNICIPALITIES_SUCCESS,
        payload: municipalities,
    }
}

export const listCountriesFailed = countries => {
    return {
        type: LIST_COUNTRIES_FAILED,
        payload: countries,
    }
}

export const listDepartmentsFailed = departments => {
    return {
        type: LIST_DEPARTMENTS_FAILED,
        payload: departments,
    }
}

export const listMunicipalitiesFailed = municipalities => {
    return {
        type: LIST_MUNICIPALITIES__FAILED,
        payload: municipalities,
    }
}
