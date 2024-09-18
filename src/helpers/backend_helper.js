import {APIClient} from "./api_helper";
import * as url from "./url_helper";
import {POST_REGISTER} from "./url_helper";


const api = new APIClient();

const getLoggedInUser = () => {
    const user = localStorage.getItem("user");
    if (user) return JSON.parse(user);
    return null;
};


const postLogin = data => api.create(url.POST_LOGIN, data);
const postRegister = data => api.create(url.POST_REGISTER, data);

export {
    getLoggedInUser,
    postLogin,
    postRegister
};