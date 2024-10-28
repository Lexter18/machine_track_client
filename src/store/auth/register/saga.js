import { takeEvery, fork, put, all, call } from "redux-saga/effects"

//Account Redux states
import { REGISTER_USER } from "./actionTypes"
import { registerUserSuccessful, registerUserFailed } from "./actions"

//Include Both Helper File with needed methods
import {postRegister} from "../../../helpers/backend_helper";


function* registerUser({ payload: { user } }) {
  try {
    const response = yield call(postRegister, user);
    yield put(registerUserSuccessful(response))

  } catch (error) {
    if (error.response) {
            const {status} = error.response;
            if (status) {
                const errorMessages = error.response.data.errors.join('<br>');
                yield put(registerUserFailed(errorMessages));

            } else {
                yield put(registerUserFailed(error.response.message));
            }
        } else {
            console.error("Error -> ", error.message);
            yield put(registerUserFailed("Internal Server Error"))
        }

  }
}

export function* watchUserRegister() {
  yield takeEvery(REGISTER_USER, registerUser)
}

function* accountSaga() {
  yield all([fork(watchUserRegister)])
}

export default accountSaga
