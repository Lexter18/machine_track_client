import {takeEvery, fork, put, all, call} from "redux-saga/effects"

import {getCountries, getDepartments, getMunicipalities} from "../../helpers/backend_helper";
import {
    listCountriesSuccess,
    listCountriesFailed,
    listDepartmentsSuccess,
    listDepartmentsFailed,
    listMunicipalitiesSuccess, listMunicipalitiesFailed
} from "./actions";
import {LIST_COUNTRIES, LIST_DEPARTMENTS, LIST_MUNICIPALITIES} from "./actionTypes";


function* listCountries() {
    try {
        const response = yield call(getCountries);
        yield put(listCountriesSuccess(response))

    } catch (error) {
        console.error("Error -> ", error.message);
        yield put(listCountriesFailed("Internal Server Error"))
    }
}

function* listDepartments(idCountry) {
    try {
        const response = yield call(getDepartments, idCountry.payload);
        yield put(listDepartmentsSuccess(response))

    } catch (error) {
        console.error("Error -> ", error.message);
        yield put(listDepartmentsFailed("Internal Server Error"))
    }
}

function* listMunicipalities(idDepartment) {
    try {
        const response = yield call(getMunicipalities, idDepartment.payload);
        yield put(listMunicipalitiesSuccess(response))

    } catch (error) {
        console.error("Error -> ", error.message);
        yield put(listMunicipalitiesFailed("Internal Server Error"))
    }
}

export function* watchLocation() {
    yield takeEvery(LIST_COUNTRIES, listCountries);
    yield takeEvery(LIST_DEPARTMENTS, listDepartments);
    yield takeEvery(LIST_MUNICIPALITIES, listMunicipalities);
}

function* locationSaga() {
    yield all([fork(watchLocation)])
}

export default locationSaga
