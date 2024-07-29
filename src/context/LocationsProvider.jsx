import {LocationsContext} from "./LocationsContext.jsx";
import {useLocations} from "../hooks/useLocations.js";

export const LocationsProvider = ({children}) => {

    const location = useLocations();


    return (
        <LocationsContext.Provider value={
            {
                ...location
            }

        }>
            {children}
        </LocationsContext.Provider>
    )

}