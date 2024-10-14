import {
  LIST_COUNTRIES, LIST_COUNTRIES_FAILED,
  LIST_DEPARTMENTS,
  LIST_MUNICIPALITIES, LIST_MUNICIPALITIES_FAILED
} from "./actionTypes"


export const listCountriesSuccess = countries => {
  return {
    type: LIST_COUNTRIES,
    payload: { countries },
  }
}

export const listDepartments = departments => {
  return {
    type: LIST_DEPARTMENTS,
    payload: departments,
  }
}

export const listMunicipality = municipality => {
  return {
    type: LIST_MUNICIPALITIES,
    payload: municipality,
  }
}

export const listCountriesFailed = countries => {
  return {
    type: LIST_COUNTRIES_FAILED,
    payload: countries,
  }
}
