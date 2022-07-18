import { Box } from "@mui/system";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Navbar from "./components/navbar";
import Sidebar from "./components/sidebar";
import Home from "./pages/common/home";
import ByRegion from "./pages/common/byRegion";
import routes from "./routes";
import SelectProvince from "./pages/common/selectProvince";
import SelectMunicipality from "./pages/common/selectMunicipality";
import SelectBarangay from "./pages/common/selectBarangay";
import Barangay from "./pages/common/barangay";
import { Container } from "@mui/material";

function App() {
    return (
        <BrowserRouter>
            <Navbar />
            <Sidebar />
            <Container maxWidth="lg" sx={{paddingY:12}}>
                <Routes>
                    <Route path="/">
                        <Route index element={<Home />} />
                        {routes.map((route) => {
                            return (
                                <Route
                                    path={route.path}
                                    element={route.component}
                                    key={route.path}
                                />
                            );
                        })}
                    </Route>
                    <Route
                        path="/by-region/:region"
                        element={<SelectProvince />}
                    />
                    <Route
                        path="/by-province/:province"
                        element={<SelectMunicipality />}
                    />
                    <Route
                        path="/by-municipality/:municipality"
                        element={<SelectBarangay />}
                    />
                    <Route path="/barangay/:barangay" element={<Barangay />} />
                </Routes>
            </Container>
        </BrowserRouter>
    );
}

export default App;
