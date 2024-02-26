 import React from "react";
import Sidebar from "../components/core/Dashboard/Sidebar";
import MyProfile from "../components/core/Dashboard/MyProfile";
import { Outlet } from "react-router-dom";

 const Dashboard = () => {
    return(
        <div className="flex relative">
            <Sidebar/>

            <div className="h-[clac(100vh-3.6rem)] overflow-auto">
                <div className="mx-auto w-11/12 py-18 max-w-[1000px]">
                    <Outlet/>
                </div>
            </div>

            {}

        </div>
    )
 }

 export default Dashboard;