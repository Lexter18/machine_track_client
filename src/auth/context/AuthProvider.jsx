import { useRoles } from "../../hooks/useRoles";
import { useAuth } from "../hooks/useAuth"
import { AuthContext } from "./AuthContext"

export const AuthProvider = ({ children }) => {
    const { login, handlerLogin, handlerLogout } = useAuth();

    const {
        roles,
        getRoles,
    } = useRoles();

    return (
        <AuthContext.Provider value={
            {
                login,
                handlerLogin,
                handlerLogout,
                roles,
                getRoles,
            }

        }>
            {children}
        </AuthContext.Provider>
    )

}