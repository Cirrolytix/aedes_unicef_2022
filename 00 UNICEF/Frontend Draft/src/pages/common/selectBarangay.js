import {
    Typography,
    Divider,
    Grid,
    FormControl,
    InputLabel,
    Select,
    MenuItem,
} from "@mui/material";
import { Box } from "@mui/system";
import { Link, useParams } from "react-router-dom";
import React from "react";
import SelectButton from "../../components/utils/buttons/selectButton";
import SocialMediaSharer from "../../components/social-media/socialMediaSharer";
import _ from "lodash";

const SelectBarangay = () => {
    const barangays = [
        "Alabang",
        "Ayala Alabang",
        "Bayanan	",
        "Buli",
        "Cupang",
        "Poblacion",
        "Putatan",
        "Sucat	",
        "Tunasa",
    ];

    const { municipality } = useParams();

    return (
        <>
            <Box sx={{ marginTop: 5 }}>
                <Typography>PHILIPPINES</Typography>
                <Typography
                    fontWeight="bold"
                    sx={{ marginTop: 2 }}
                    variant="h5"
                >
                  {_.upperCase(_.startCase(municipality))}
                </Typography>
                <SocialMediaSharer />
            </Box>

            <Typography sx={{ marginTop: 3, marginBottom: 2 }}>
                PHILIPPINES
            </Typography>
            <Divider />

            <FormControl fullWidth sx={{ marginTop: 3 }}>
                <InputLabel id="demo-simple-select-label">
                    Select Barangay
                </InputLabel>
                <Select>
                    {barangays.map((barangay) => {
                        return (
                            <MenuItem value={barangay} key={barangay}>
                                {barangay}
                            </MenuItem>
                        );
                    })}
                </Select>
            </FormControl>

            <Grid
                container
                sx={{ marginTop: 3 }}
                columns={5}
                columnSpacing={2}
                rowSpacing={2}
            >
                {barangays.map((barangay) => {
                    return (
                        <Grid item xs={5} md={1} key={barangay}>
                            <SelectButton
                                name={barangay}
                                component={Link}
                                to={`/barangay/${_.kebabCase(barangay)}`}
                            />
                        </Grid>
                    );
                })}
            </Grid>
        </>
    );
};

export default SelectBarangay;
