
import {
    Drawer,
    List,
    ListItem,
    ListItemText,
} from "@mui/material";
import React, { useContext } from "react";
import { Link, useLocation } from "react-router-dom";
import AppContext from "../context/appContext";
import routes from "../routes";

const drawerWidth = 300;

function Sidebar() {
    const app = useContext(AppContext);
    const location = useLocation()

    return (
        <Drawer
            sx={{
                "& .MuiDrawer-paper": {
                    boxSizing: "border-box",
                    width: { xs: "100vw", md: drawerWidth },
                    top: {xs:56, md:0},
                },
            }}
            open={app.sidebarOpen}
            onClose={(e) => app.actions.setSidebar(false)}
        >
            <List onClick={(e) => app.actions.setSidebar(false)} sx={{
                "& .MuiListItem-root:hover, & .Mui-selected": {
                    backgroundColor: "#f8f800 !important",
                    color: "#333"
                }
            }}>
                {routes.map((route) => {
                    return (
                        <ListItem
                            button
                            divider
                            component={Link}
                            to={route.path}
                            key={route.path}
                            selected={location.pathname === `/${route.path}` ?? true }
                        >
                            <ListItemText primary={route.name}/>
                        </ListItem>
                    );
                })}
            </List>
        </Drawer>
    );
}

export default Sidebar;
