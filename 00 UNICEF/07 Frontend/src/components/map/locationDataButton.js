import { ExpandLess } from "@mui/icons-material";
import { Fab } from "@mui/material";
import React, { useContext } from "react";
import { LocationDataContext } from "../../context/map/locationDataContext";

const LocationDataButton = () => {
    const locationData = useContext(LocationDataContext);
    return (
        <Fab
            color="primary"
            size="small"
            onClick={(e) => {
                locationData.actions.setOpenLocationDataCard(true);
            }}
        >
            <ExpandLess />
        </Fab>
    );
};

export default LocationDataButton;
