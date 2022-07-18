import {
    AccountBox,
    BarChart,
    EmojiEvents,
    Home as HomeIcon,
    Lock,
    Mail,
} from "@mui/icons-material";
import Home from "./pages/common/home";
import About from "./pages/common/about";
import ContactUs from "./pages/common/contactUs";
import TermsOfUse from "./pages/common/termsOfUse";
import PrivacyPolicy from "./pages/common/privacyPolicy";
import Awards from "./pages/common/awards";
import ByRegion from "./pages/common/byRegion";
import SelectRegion from "./pages/common/selectRegion";

const routes = [
    {
        path: "",
        icon: <HomeIcon />,
        name: "Home",
        component: <Home />,
    },
    {
        path: "by-region",
        icon: <HomeIcon />,
        name: "By Region",
        component: <SelectRegion />,
    },
    {
        path: "about",
        icon: <BarChart />,
        name: "About",
        component: <About />,
    },
    {
        path: "contact-us",
        icon: <Mail />,
        name: "Contact Us",
        component: <ContactUs />,
    },
    {
        path: "terms-of-use",
        icon: <AccountBox />,
        name: "Terms of Use",
        component: <TermsOfUse />,
    },
    {
        path: "privacy-policy",
        icon: <Lock />,
        name: "Privacy Policy",
        component: <PrivacyPolicy />,
    },
    {
        path: "awards",
        icon: <EmojiEvents />,
        name: "Awards",
        component: <Awards />,
    },
];

export default routes;
