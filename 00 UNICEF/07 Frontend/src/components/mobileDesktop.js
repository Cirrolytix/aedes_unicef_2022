import { useContext } from "react";
import { MobileDesktopContext } from "../context/mobileDesktopContext";

const MobileDesktop = ({ mobile, desktop }) => {
    const mobileDesktop = useContext(MobileDesktopContext);

    return mobileDesktop.isMobile ? mobile : desktop;
};

export default MobileDesktop;
