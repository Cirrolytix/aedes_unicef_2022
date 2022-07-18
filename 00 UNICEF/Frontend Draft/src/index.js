import React from "react";
import ReactDOM from "react-dom";
import App from "./App";
import reportWebVitals from "./reportWebVitals";
import "./assets/css/index.css";
import AppContextProvider from "./context/appContextProvider";
import MobileDesktopContextProvider from "./context/mobileDesktopContext";

ReactDOM.render(
    <React.StrictMode>
        <MobileDesktopContextProvider>
            <AppContextProvider>
                <App />
            </AppContextProvider>
        </MobileDesktopContextProvider>
    </React.StrictMode>,
    document.getElementById("root")
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
