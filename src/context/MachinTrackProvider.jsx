import { useRoles } from "../hooks/useRoles";
import { useUsers } from "../hooks/useUsers";
import { MachinTrackContext } from "./MachinTrackContext"

export const MachinTrackProvider = ({ children }) => {

    const {
        users,
        getUsersByOwner,
        getUsersByRol,
    } = useUsers();
    
    return (
        <MachinTrackContext.Provider value={
            {
                users,
                getUsersByOwner,
                getUsersByRol
            }

        }>
            {children}
        </MachinTrackContext.Provider>
    )

}