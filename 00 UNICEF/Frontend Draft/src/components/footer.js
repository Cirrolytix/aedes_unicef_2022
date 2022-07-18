import { AppBar, Box, Toolbar } from "@mui/material";
import React from "react";

function Footer() {
    return (
        <Box sx={{ flexGrow: 1 }}>
            <AppBar position="fixed" color="primary" sx={{ top: 'auto', bottom: 0, height:50 }}>
                <Toolbar sx={{justifyContent:"center"}}>Footer</Toolbar>
            </AppBar>
        </Box>
    );
}

export default Footer;
