import { takeEvery, fork, put, all, call } from "redux-saga/effects"

import {getCountries} from "../../helpers/backend_helper";
import {listCountriesSuccess, listCountriesFailed} from "./actions";
import {LIST_COUNTRIES} from "./actionTypes";


function* listCountries() {
  try {

    const response = yield call(getCountries);
    yield put(listCountriesSuccess(response))

  } catch (error) {
     console.error("Error -> ", error.message);
     yield put(listCountriesFailed("Internal Server Error"))
  }
}

export function* watchLocation() {
  yield takeEvery(LIST_COUNTRIES, listCountries)
}

function* locationSaga() {
  yield all([fork(watchLocation)])
}

export default locationSaga
