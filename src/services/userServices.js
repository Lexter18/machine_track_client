import axios from "axios";
import {config} from "../utils/ServicesUtil.js";

const BASE_URL = 'http://localhost:8080/api/users'

export const findUsersByOwner = async () => {
    try {
        const response = await axios.get(BASE_URL + '/byOwner', config());
        return response.data;
    } catch (error) {
        throw error;
    }

}

export const saveInitialUser = async (userData) => {
    try {
        const response = await axios.post(`${BASE_URL}/initialRegistration`, userData);
        return response.data;
    } catch (error) {
        throw error;
    }
}

export const listRoles = async () => {
    try {
        const response = await axios.get(BASE_URL + '/roles', config());
        return response.data;
    } catch (error) {
        throw error;
    }

}

export const findUsersByRol = async (idRol) => {
    try {
        const response = await axios.get(`${BASE_URL}/byRole/${idRol}`, config());
        return response.data;
    } catch (error) {
        throw error;
    }
}