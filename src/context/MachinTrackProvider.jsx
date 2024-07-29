import {useRoles} from "../hooks/useRoles";
import {useUsers} from "../hooks/useUsers";
import {MachinTrackContext} from "./MachinTrackContext"
import {useStateApp} from "../hooks/useStateApp.js";
import {usePosition} from "../hooks/usePosition.js";

export const MachinTrackProvider = ({children}) => {

    const {
        users,
        getUsersByOwner,
        getUsersByRol,
    } = useUsers();

    const roles = useRoles();
    const states = useStateApp();
    const positions = usePosition();


    return (
        <MachinTrackContext.Provider value={
            {
                users,
                getUsersByOwner,
                getUsersByRol,
                ...roles,
                ...states,
                ...positions
            }

        }>
            {children}
        </MachinTrackContext.Provider>
    )

}