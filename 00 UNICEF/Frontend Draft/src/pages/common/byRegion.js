import React from "react";
import MobileDesktop from "../../components/mobileDesktop";
import {ByRegion as ByRegionDesktop} from "../desktop";

function ByRegion() {
    return (
        <MobileDesktop
            mobile={<ByRegionDesktop />}
            desktop={<ByRegionDesktop />}
        />
    );
}

export default ByRegion;
