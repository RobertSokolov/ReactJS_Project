
import { Outlet } from "react-router";

import Navbar from "../components/Navbar";


const Layout = () => {

    return (
        <>
        

        <Navbar/>
        
        <div className="grid grid-cols-12">
        <div className=" min-h-screen col-span-1" />
        <div className="w-full mt-5 px-4 col-span-10">
        <Outlet />
        </div>
        <div className=" min-h-screen col-span-1" />
        </div>
        </>
    );
};

export default Layout