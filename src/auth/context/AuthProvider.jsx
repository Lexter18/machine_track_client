import { useLocations } from "../../hooks/useLocations";
import { useAuth } from "../hooks/useAuth"
import { AuthContext } from "./AuthContext"

export const AuthProvider = ({ children }) => {
    const { login, handlerLogin, handlerLogout } = useAuth();

    const location = useLocations();

    return (
        <AuthContext.Provider value={
            {
                login,
                handlerLogin,
                handlerLogout,
                ...location
                
            }

        }>
            {children}
        </AuthContext.Provider>
    )

}