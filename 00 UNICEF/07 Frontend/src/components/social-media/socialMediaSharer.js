import { Facebook, LinkedIn, Mail, Twitter } from "@mui/icons-material";
import { Box, IconButton, Typography } from "@mui/material";
import React from "react";

const SocialMediaSharer = () => {
    return (
        <Box
            sx={{
                marginTop: 3,
                display: "flex",
                alignItems: "center",
                gap: 1,
            }}
        >
            <Typography>SHARE THIS PAGE:</Typography>
            <IconButton size="small" sx={{ backgroundColor: "#1773ea" }}>
                <Facebook />
            </IconButton>
            <IconButton size="small" sx={{ backgroundColor: "#00c7f7" }}>
                <Twitter />
            </IconButton>
            <IconButton size="small" sx={{ backgroundColor: "#0073b1" }}>
                <LinkedIn />
            </IconButton>
            <IconButton size="small" sx={{ backgroundColor: "#474747" }}>
                <Mail />
            </IconButton>
        </Box>
    );
};

export default SocialMediaSharer;
