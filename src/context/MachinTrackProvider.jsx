import { useRoles } from "../hooks/useRoles";
import { useUsers } from "../hooks/useUsers";
import { MachinTrackContext } from "./MachinTrackContext"

export const MachinTrackProvider = ({ children }) => {

    const {
        users,
        getUsers,
    } = useUsers();
    
    return (
        <MachinTrackContext.Provider value={
            {
                users,
                getUsers                
            }

        }>
            {children}
        </MachinTrackContext.Provider>
    )

}