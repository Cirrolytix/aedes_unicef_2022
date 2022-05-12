import React, { useContext, useEffect, useState } from "react";
import ReactMapboxGl from "react-mapbox-gl";
import "mapbox-gl/dist/mapbox-gl.css";
import { fetchRemoteSensingGeoJson } from "../../services/CKANApiService";
import { scaleSequential, schemeSet1 } from "d3";
import MarkerPopUp from "./markerPopUp";
import { getBounds } from "../../utils/map";
import { MapContext } from "../../context/map/mapContext";

const MAPBOX_TOKEN = process.env.REACT_APP_MAPBOX_TOKEN;

const Map = new ReactMapboxGl({
    accessToken: MAPBOX_TOKEN,
});

const PHLboundingBox = [
    [117.17427453, 5.58100332277],
    [126.537423944, 18.5052273625],
];

function RemoteSensingMap() {
    const [viewport, setViewport] = useState({
        style: "mapbox://styles/mapbox/dark-v10",
        containerStyle: {
            height: "100%",
            width: "100%",
        },

        zoom: [4],
        fitBoundsOptions: {
            offset: [0, 0],
            padding: {
                top: 150,
                bottom: 150,
                left: 150,
                right: 150,
            },
        },
        fitBounds: PHLboundingBox,
    });

    const [data, setData] = useState([]);
    const markerColor = scaleSequential(schemeSet1);
    const map = useContext(MapContext);

    useEffect(() => {
        (async () => {
            try {
                const res = await fetchRemoteSensingGeoJson();
                const records = res.result.records;
                map.actions.setTableData(res.result);
                setData(records);

                markerColor.domain(records.map((d) => d.label));
                const coordinates = getBounds(
                    records.map((d) => [d.longitude, d.latitude])
                );
                setViewport((state) => ({ ...state, fitBounds: coordinates }));
            } catch (error) {
                console.log(error);
            }
        })();
    }, []);

    return (
        <Map {...viewport}>
            {data.map((d) => {
                return (
                    <MarkerPopUp
                        coordinates={[d.longitude, d.latitude]}
                        color={markerColor(d.label)}
                        data={d}
                        key={d._id}
                    />
                );
            })}
        </Map>
    );
}

export default RemoteSensingMap;
