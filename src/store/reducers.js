import { combineReducers } from "redux";

// Front
import Layout from "./layout/reducer";


// Authentication
import forgetPassword from "./auth/forgetpwd/reducer";
import login from "./auth/login/reducer";
import profile from "./auth/profile/reducer";
import account from "./auth/register/reducer";
import locations from "./locations/reducer";

const rootReducer = combineReducers({
  // public
  Layout,
  forgetPassword,
  login,
  profile,
  account,
  locations
});

export default rootReducer;
