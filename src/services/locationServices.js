import axios from "axios";

const BASE_URL = 'http://localhost:8080/api/locations'

const config = () => {
    return {
        headers: {
            "Authorization": sessionStorage.getItem('token'),
            "Content-Type": "application/json",
        }
    }
}

export const listCountries = async () => {
    try {        
        return await axios.get(BASE_URL + '/countries', config());
    } catch (error) {
        throw error;
    }

}

export const listDepartments = async (id_country) => {
    try {        
        return await axios.get(`${BASE_URL}/departments/${id_country}`);
    } catch (error) {
        throw error;
    }

}