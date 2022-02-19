import {
    Card,
    CardContent,
    CardHeader,
    IconButton,
    List,
    ListItem,
    ListItemText,
} from "@mui/material";
import React, { useContext } from "react";
import _ from "lodash";
import { ExpandMore } from "@mui/icons-material";
import { LocationDataContext } from "../../context/map/locationDataContext";

const LocationData = () => {
    const locationData = useContext(LocationDataContext);
    return (
        <Card
            sx={{
                height: 300,
                display: locationData.openLocationDataCard ? "block" : "none",
            }}
        >
            <CardHeader
                title="Location Data"
                action={
                    <IconButton aria-label="settings">
                        <ExpandMore
                            onClick={(e) => {
                                locationData.actions.setOpenLocationDataCard(
                                    false
                                );
                            }}
                        />
                    </IconButton>
                }
            />
            <CardContent sx={{ height: "100%", overflowY: "scroll" }}>
                <List>
                    {_.keys(locationData.locationData).map((e) => {
                        return (
                            <ListItem key={e}>
                                <ListItemText
                                    primary={locationData.locationData[e]}
                                    secondary={_.upperCase(_.startCase(e))}
                                ></ListItemText>
                            </ListItem>
                        );
                    })}
                </List>
            </CardContent>
        </Card>
    );
};

export default LocationData;
