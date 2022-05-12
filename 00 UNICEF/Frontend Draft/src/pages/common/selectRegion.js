import { Typography, Divider, Grid } from "@mui/material";
import { Box } from "@mui/system";
import { Link } from "react-router-dom";
import React from "react";
import SelectButton from "../../components/utils/buttons/selectButton";
import SocialMediaSharer from "../../components/social-media/socialMediaSharer";
import _ from "lodash";

const SelectRegion = () => {
    const regions = [
        "NCR",
        "CAR",
        "Ilocos Region",
        "Cagayan Valley",
        "Central Luzon",
        "CALABARZON",
        "MIMAROPA",
        "Bicol Region",
        "Western Visayas",
        "Central Visayas",
        "Eastern Visayas",
        "Zamboanga Peninsula",
        "Northern Midnanao",
        "Davao Region",
        "SOCCSKSARGEN",
        "Caraga Region",
        "ARMM",
    ];

    return (
        <>
            <Box sx={{ marginTop: 5 }}>
                <Typography>PHILIPPINES</Typography>
                <Typography
                    fontWeight="bold"
                    sx={{ marginTop: 2 }}
                    variant="h5"
                >
                    BY REGION
                </Typography>
                <SocialMediaSharer />
            </Box>

            <Typography sx={{ marginTop: 3, marginBottom: 2 }}>
                PHILIPPINES
            </Typography>
            <Divider />

            <Grid
                container
                sx={{ marginTop: 3 }}
                columnSpacing={2}
                rowSpacing={2}
            >
                {regions.map((region) => {
                    return (
                        <Grid item xs={12} md={2} key={region}>
                            <SelectButton
                                name={region}
                                component={Link}
                                to={`/by-region/${_.kebabCase(region)}`}
                            />
                        </Grid>
                    );
                })}
            </Grid>
        </>
    );
};

export default SelectRegion;
