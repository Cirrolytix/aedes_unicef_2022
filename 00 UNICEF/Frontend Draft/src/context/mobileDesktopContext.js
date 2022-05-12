import { createContext, useEffect, useMemo, useState } from "react";

export const MobileDesktopContext = createContext({
    isMobile: false,
});

const mobileWidth = 768;

const MobileDesktopContextProvider = ({ children }) => {
    const [isMobile, setIsMobile] = useState(
        window.matchMedia(`(max-width:${mobileWidth}px)`).matches
    );

    useEffect(() => {
        function handleResize() {
            if(window.innerWidth > mobileWidth)
                setIsMobile(false)
            else
                setIsMobile(true)
        }
        window.addEventListener("resize", handleResize);
    });

    const value = useMemo(() => ({ isMobile }), [isMobile]);

    return (
        <MobileDesktopContext.Provider value={value}>
            {children}
        </MobileDesktopContext.Provider>
    );
};
export default MobileDesktopContextProvider;
