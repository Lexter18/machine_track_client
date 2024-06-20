import { useContext, useEffect } from "react";
import { RegisterBody } from "../components/users/RegisterBody";
import { AuthContext } from "../auth/context/AuthContext";


export const RegisterPage = () => {

    const {
        roles,
        getRoles,       
    } = useContext(AuthContext);

    useEffect(() => {
        getRoles();    
    }, []);

    return (
        <RegisterBody />
    );

}