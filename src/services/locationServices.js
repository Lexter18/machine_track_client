import axios from "axios";

const BASE_URL = 'http://localhost:8080/api/locations'

export const listCountries = async () => {
    try {
        const response =  await axios.get(BASE_URL + '/countries');
        return response.data;
    } catch (error) {
        throw error;
    }

}

export const listDepartments = async (idCountry) => {
    try {        
        const response = await axios.get(`${BASE_URL}/departments/${idCountry}`);
        return response.data;
    } catch (error) {
        throw error;
    }

}

export const listMunicipalities = async (idDepartment) => {
    try {        
        const response = await axios.get(`${BASE_URL}/municipalities/${idDepartment}`);
        return response.data;
    } catch (error) {
        throw error;
    }

}