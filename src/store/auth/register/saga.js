import { takeEvery, fork, put, all, call } from "redux-saga/effects"

//Account Redux states
import { REGISTER_USER } from "./actionTypes"
import { registerUserSuccessful, registerUserFailed } from "./actions"

//Include Both Helper File with needed methods
import { getFirebaseBackend } from "../../../helpers/firebase_helper"
import {
  postFakeRegister,
  postJwtRegister,
} from "../../../helpers/fakebackend_helper"
import {postLogin, postRegister} from "../../../helpers/backend_helper";
import {apiError} from "../login/actions";

// initialize relavant method of both Auth
const fireBaseBackend = getFirebaseBackend()

// Is user register successfull then direct plot user in redux.
function* registerUser({ payload: { user } }) {
  try {

    const response = yield call(postRegister, user);
    yield put(registerUserSuccessful(response))

    if (process.env.REACT_APP_DEFAULTAUTH === "firebase") {
      const response = yield call(
        fireBaseBackend.registerUser,
        user.email,
        user.password
      )
      yield put(registerUserSuccessful(response))
    } else if (process.env.REACT_APP_DEFAULTAUTH === "jwt") {
      const response = yield call(postJwtRegister, "/post-jwt-register", user)
      yield put(registerUserSuccessful(response))
    } else if (process.env.REACT_APP_DEFAULTAUTH === "fake") {
      const response = yield call(postFakeRegister, user)
      yield put(registerUserSuccessful(response))
    }


  } catch (error) {
    if (error.response) {
            const {status} = error.response;
            if (status) {
                const errorMessages = error.response.data.errors.join('\n');
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
