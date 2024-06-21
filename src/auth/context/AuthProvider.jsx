import { useLocations } from "../../hooks/useLocations";
import { useRoles } from "../../hooks/useRoles";
import { useAuth } from "../hooks/useAuth"
import { AuthContext } from "./AuthContext"

export const AuthProvider = ({ children }) => {
    const { login, handlerLogin, handlerLogout } = useAuth();

    const {
        roles,
        getRoles,
    } = useRoles();

    const {
        countries,
        getCountries
    } = useLocations();

    return (
        <AuthContext.Provider value={
            {
                login,
                handlerLogin,
                handlerLogout,
                roles,
                getRoles,
                countries,
                getCountries
            }

        }>
            {children}
        </AuthContext.Provider>
    )

}