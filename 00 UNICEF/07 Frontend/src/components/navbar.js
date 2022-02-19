import {
    AppBar,
    Box,
    Button,
    Container,
    IconButton,
    Toolbar,
    Typography,
} from "@mui/material";
import { Close, Menu as MenuIcon } from "@mui/icons-material";
import React, { useContext } from "react";
import aedesLogo from "../assets/images/aedes_logo.png";
import AppContext from "../context/appContext";
import routes from "../routes";
import { MobileDesktopContext } from "../context/mobileDesktopContext";
import { Link } from "react-router-dom";

function Navbar() {
    const app = useContext(AppContext);
    const mobileDesktop = useContext(MobileDesktopContext);

    return (
        <Box sx={{ flexGrow: 1 }}>
            <AppBar>
                <Container maxWidth="lg">
                    <Toolbar sx={{paddingX: 0}}>
                        <IconButton
                            size="large"
                            edge="start"
                            color="inherit"
                            aria-label="menu"
                            onClick={(e) => {
                                app.actions.toggleSidebar();
                            }}
                            sx={{
                                display: !mobileDesktop.isMobile
                                    ? "none"
                                    : "block",
                            }}
                        >
                            {app.sidebarOpen ? <Close /> : <MenuIcon />}
                        </IconButton>
                        <Box
                            sx={{
                                display: mobileDesktop.isMobile
                                    ? "none"
                                    : "block",
                            }}
                        >
                            {routes.map((route) => {
                                return (
                                    <Button
                                        variant="text"
                                        sx={{ color: "#fff" }}
                                        component={Link}
                                        to={route.path}
                                    >
                                        {route.name}
                                    </Button>
                                );
                            })}
                        </Box>

                        <Box
                            sx={{
                                marginLeft: "auto",
                                display: "flex",
                                textTransform: "none",
                                gap: 2,
                            }}
                        >
                            <Typography
                                color="white"
                                fontSize={10}
                                textAlign="right"
                            >
                                Data Management System <br /> For Vector-borne
                                Diseases
                            </Typography>
                            <Typography color="white">|</Typography>
                            <img
                                src={aedesLogo}
                                style={{ height: 30, margin: { sm: "auto" } }}
                                alt="AEDES logo"
                            />
                        </Box>
                    </Toolbar>
                </Container>
            </AppBar>
        </Box>
    );
}

export default Navbar;
