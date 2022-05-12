import React from "react";
import MobileDesktop from "../../components/mobileDesktop";
import HomeMobile from "../touch/homeMobile";
import { Home as HomeDesktop } from "../desktop";

function Home() {
    return <MobileDesktop mobile={<HomeMobile />} desktop={<HomeDesktop />} />;
}

export default Home;
