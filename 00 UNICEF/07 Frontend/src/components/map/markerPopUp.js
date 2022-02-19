import React, { useContext, useState } from "react";
import PropTypes from "prop-types";
import { Marker } from "react-mapbox-gl";
import { Room } from "@mui/icons-material";
import { LocationDataContext } from "../../context/map/locationDataContext";

function MarkerPopUp({ coordinates, data, color }) {
    const [showPopUp, setShowPopUp] = useState(false);
    const locationData = useContext(LocationDataContext);

    return (
        <>
            <Marker
                onClick={(e) => {
                    setShowPopUp((state) => !state);
                    locationData.actions.setLocationData(data);
                    locationData.actions.setOpenLocationDataCard(true);
                }}
                coordinates={coordinates}
                style={{ cursor: "pointer" }}
            >
                <Room
                    fontSize={locationData.locationData._id == data._id ? "large" : "medium"}
                    style={{ color: color }}
                    offset={{ bottom: 10 }}
                />
            </Marker>
        </>
    );
}

export default MarkerPopUp;

MarkerPopUp.propTypes = {
    coordinates: PropTypes.array.isRequired,
    data: PropTypes.object.isRequired,
    color: PropTypes.string.isRequired,
};
