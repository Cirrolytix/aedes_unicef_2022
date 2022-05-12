import { createContext, useContext, useMemo, useState } from "react";
import { MapContext } from "./mapContext";

export const LocationDataContext = createContext({
    locationData: {},
});

const LocationDataContextProvider = ({ children }) => {
    const map = useContext(MapContext);
    const [openLocationDataCard, setOpenLocationDataCard] = useState(false);

    const value = useMemo(
        () => ({
            locationData: map.locationData,
            openLocationDataCard,
            actions: {
                setLocationData: map.actions.setLocationData,
                setOpenLocationDataCard,
            },
        }),
        [map.locationData, openLocationDataCard]
    );

    return (
        <LocationDataContext.Provider value={value}>
            {children}
        </LocationDataContext.Provider>
    );
};

export default LocationDataContextProvider;
