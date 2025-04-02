import { Outlet } from "react-router-dom";
import Nabar from "../component/nabar.tsx";

const RootLayout = () => {
    return (
        <>
            <Nabar />
            <Outlet />
        </>
    );
};

export default RootLayout;