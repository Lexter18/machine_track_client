import { useLocations } from "../../hooks/useLocations";
import { useRoles } from "../../hooks/useRoles";
import { useAuth } from "../hooks/useAuth"
import { AuthContext } from "./AuthContext"

export const AuthProvider = ({ children }) => {
    const { login, handlerLogin, handlerLogout } = useAuth();

    const location = useLocations();
    const roles = useRoles();

    return (
        <AuthContext.Provider value={
            {
                login,
                handlerLogin,
                handlerLogout,
                ...roles,                
                ...location
                
            }

        }>
            {children}
        </AuthContext.Provider>
    )

}