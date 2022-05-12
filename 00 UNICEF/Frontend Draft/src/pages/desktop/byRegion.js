import { Box } from "@mui/material";
import React from "react";
import LocationData from "../../components/map/locationData";
import LocationDataButton from "../../components/map/locationDataButton";
import RemoteSensingMap from "../../components/map/remoteSensingMap";
import TableDataButton from "../../components/map/tableDataButton";
import TableDataModal from "../../components/map/tableDataModal";
import LocationDataContextProvider from "../../context/map/locationDataContext";
import MapContextProvider from "../../context/map/mapContext";

const styles = {
    mapContainer: {
        height: "100vh",
        width: "100vw",
        position: "absolute",
        top: 0,
        left: 0,
    },
    locationData: {
        position: "fixed",
        bottom: 60,
        right: 20,
        zIndex: 999,
    },
    locationDataBtn: {
        position: "fixed",
        bottom: 60,
        right: 20,
        zIndex: 888,
    },
    tableDataBtn: {
        position: "fixed",
        top: 70,
        right: 20,
        zIndex: 999,
    },
};

function ByRegion() {
    return (
        <Box sx={styles.mapContainer}>
            <MapContextProvider>
                <LocationDataContextProvider>
                    <RemoteSensingMap />
                    <Box sx={styles.locationData}>
                        <LocationData />
                    </Box>
                    <Box sx={styles.locationDataBtn}>
                        <LocationDataButton />
                    </Box>
                    <Box sx={styles.tableDataBtn}>
                        <TableDataButton />
                    </Box>
                    <TableDataModal />
                </LocationDataContextProvider>
            </MapContextProvider>
        </Box>
    );
}

export default ByRegion;
