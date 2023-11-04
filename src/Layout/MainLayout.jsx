import { Outlet } from "react-router-dom";
import Navbar from "../Pages/Shared/NavBar/Navbar";

const mainLayout = () => {
    return (
        <div className="max-w-[1600px] mx-auto">
            <Navbar></Navbar>
            <Outlet></Outlet>
        </div>
    );
};

export default mainLayout;