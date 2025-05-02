import { Outlet } from "react-router-dom";
import Nabar from "../components/navar";

const RootLayout = () => {
    return (
        <>
            <Nabar />
            <Outlet />
        </>
    );
};

export default RootLayout;