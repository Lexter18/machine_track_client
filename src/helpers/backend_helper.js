import {APIClient} from "./api_helper";
import * as url from "./url_helper";


const api = new APIClient();

const getLoggedInUser = () => {
    const user = localStorage.getItem("user");
    if (user) return JSON.parse(user);
    return null;
};


const postLogin = data => api.create(url.POST_LOGIN, data);
const postRegister = data => api.create(url.POST_REGISTER, data);
const getCountries = data => api.get(url.GET_COUNTRIES);
const getDepartments = idCountry  => api.get(url.GET_DEPARTMENTS,  { params: { idCountry } });
const getMunicipalities = idDepartment  => api.get(url.GET_MUNICIPALITIES,  { params: { idDepartment } });

export {
    getLoggedInUser,
    postLogin,
    postRegister,
    getCountries,
    getDepartments,
    getMunicipalities
};
