import {call, put, takeEvery} from "redux-saga/effects";

// Login Redux States
import {LOGIN_USER, LOGOUT_USER} from "./actionTypes";
import {apiError, loginSuccess, logoutUserSuccess} from "./actions";

import {postLogin} from "../../../helpers/backend_helper";

function* loginUser({payload: {user, history}}) {
    try {
        const response = yield call(postLogin, user);
        const token = response.access_token;
        const claims = JSON.parse(window.atob(token.split(".")[1]))
        const currentUser = {username: claims.sub}
        const rol = JSON.parse(claims.authorities)[0]
        localStorage.setItem('authUser', JSON.stringify({
            isAuth: true,
            rol,
            currentUser,
        }));
        yield put(loginSuccess(response));
        history("/dashboard");


    } catch (error) {
        //console.log("USER = ", JSON.stringify(error, null, 2))
        if (error.response) {
            const {status} = error.response;
            if (status === 401 || status === 403) {
                yield put(apiError("Usuario o password invalidos"));
            } else {
                yield put(apiError(error.response.message));
            }
        } else {
            console.error("Error -> ", error.message);
            yield put(apiError("Internal Server Error"));
        }
    }
}

function* logoutUser() {
    try {
        localStorage.removeItem("authUser");
        yield put(logoutUserSuccess(LOGOUT_USER, true));

    } catch (error) {
        yield put(apiError(LOGOUT_USER, error));
    }
}

function* authSaga() {
    yield takeEvery(LOGIN_USER, loginUser);
    yield takeEvery(LOGOUT_USER, logoutUser);
}

export default authSaga;
