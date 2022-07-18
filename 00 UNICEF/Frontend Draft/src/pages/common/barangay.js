import { Typography, Divider } from "@mui/material";
import { Box } from "@mui/system";
import { useParams } from "react-router-dom";
import React from "react";
import SocialMediaSharer from "../../components/social-media/socialMediaSharer";
import _ from "lodash";

const Barangay = () => {
    const { barangay } = useParams();

    return (
        <>
            <Box sx={{ marginTop: 5 }}>
                <Typography>PHILIPPINES</Typography>
                <Typography
                    fontWeight="bold"
                    sx={{ marginTop: 2 }}
                    variant="h5"
                >
                    {_.upperCase(_.startCase(barangay))}
                </Typography>
                <SocialMediaSharer />
            </Box>
            <Divider sx={{marginY:3}}/>
            Some Data
        </>
    );
};

export default Barangay;
