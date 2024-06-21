import { useContext, useEffect } from "react";
import { RegisterBody } from "../components/users/RegisterBody";
import { AuthContext } from "../auth/context/AuthContext";


export const RegisterPage = () => {

    const {
        roles,
        getRoles, 
        countries,
        getCountries,      
    } = useContext(AuthContext);

    useEffect(() => {
        getRoles();
        getCountries();    
    }, []);

    return (
        <RegisterBody />
    );

}