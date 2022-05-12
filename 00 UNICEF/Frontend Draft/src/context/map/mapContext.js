import { createContext, useMemo, useState } from "react";

export const MapContext = createContext({
    locationData: {},
    tableData: [],
});

const MapContextProvider = ({ children }) => {
    const [locationData, setLocationData] = useState({});
    const [tableData, setTableData] = useState({ fields: [], records: [] });
    const [openTableDataModal, setOpenTableDataModal] = useState(false);

    const value = useMemo(
        () => ({
            locationData,
            tableData,
            openTableDataModal,
            actions: {
                setLocationData,
                setTableData,
                setOpenTableDataModal,
            },
        }),
        [locationData, tableData, openTableDataModal]
    );

    return <MapContext.Provider value={value}>{children}</MapContext.Provider>;
};

export default MapContextProvider;
