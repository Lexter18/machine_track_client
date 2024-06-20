import axios from "axios";

const BASE_URL = 'http://localhost:8080/api/users'

const config = () => {
    return {
        headers: {
            "Authorization": sessionStorage.getItem('token'),
            "Content-Type": "application/json",
        }
    }
}

export const findUsers = async () => {
    try {        
        return await axios.get(BASE_URL + '/byOwner', config());
    } catch (error) {
        throw error;
    }

}

export const listRoles = async () => {
    try {        
        return await axios.get(BASE_URL + '/roles');
    } catch (error) {
        throw error;
    }

}