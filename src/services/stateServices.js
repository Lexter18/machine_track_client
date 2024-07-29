import axios from "axios";
import {config} from "../utils/ServicesUtil.js";

const BASE_URL = 'http://localhost:8080/api/state'

export const listState = async () => {
    try {
        const response = await axios.get(BASE_URL, config());
        return response.data;
    } catch (error) {
        throw error;
    }

}