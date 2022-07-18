import { Typography, Divider, Grid } from "@mui/material";
import { Box } from "@mui/system";
import { Link, useParams } from "react-router-dom";
import React from "react";
import SelectButton from "../../components/utils/buttons/selectButton";
import SocialMediaSharer from "../../components/social-media/socialMediaSharer";
import _ from "lodash";

const SelectMunicipality = () => {
    const municipalities = [
        "Las Piñas",
        "Makati",
        "Muntinlupa",
        "Parañaque",
        "Pasay",
        "Pateros",
        "Taguig",
    ];

    const { province } = useParams();

    return (
        <>
            <Box sx={{ marginTop: 5 }}>
                <Typography>PHILIPPINES</Typography>
                <Typography
                    fontWeight="bold"
                    sx={{ marginTop: 2 }}
                    variant="h5"
                >
                    {_.upperCase(_.startCase(province))}
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
                columns={5}
                columnSpacing={2}
                rowSpacing={2}
            >
                {municipalities.map((municipality) => {
                    return (
                        <Grid item xs={5} md={1} key={municipality}>
                            <SelectButton
                                name={municipality}
                                component={Link}
                                to={`/by-municipality/${_.kebabCase(
                                    municipality
                                )}`}
                            />
                        </Grid>
                    );
                })}
            </Grid>
        </>
    );
};

export default SelectMunicipality;
