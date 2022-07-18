
import { createTheme, ThemeProvider } from "@mui/material";
import React, { useMemo, useState } from "react";
import AppContext from "./appContext";

const AppContextProvider = ({ children }) => {
    const [sidebarOpen, setSidebarOpen] = useState(false);
    const [themeMode, setThemeMode] = useState("dark");

    const toggleSidebar = () => {
        setSidebarOpen((state) => !state);
    };

    const toggleTheme = () => {
        setThemeMode((state) => {
            return state === "light" ? "dark" : "light";
        });
    };

    const setSidebar = (open) => {
        setSidebarOpen(open);
    };

    const value = useMemo(
        () => ({
            sidebarOpen,
            themeMode,
            actions: {
                toggleSidebar,
                setSidebar,
                toggleTheme,
            },
        }),
        [sidebarOpen, themeMode]
    );

    const theme = React.useMemo(
        () =>
            createTheme({
                palette: {
                    mode: themeMode,
                },
            }),
        [themeMode]
    );

    return (
        <AppContext.Provider value={value}>
            <ThemeProvider theme={theme}>{children}</ThemeProvider>
        </AppContext.Provider>
    );
};

export default AppContextProvider;
