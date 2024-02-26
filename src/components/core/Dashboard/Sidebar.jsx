import React from "react";
import { useState } from "react";
import  {dashboardLinks}  from "../../../data/dashboard-links";
import { useDispatch, useSelector } from "react-redux";
import SideBarLinks from "../Dashboard/SideBarLinks"
import { logout } from "../../../services/operations/authAPI";
import { useNavigate } from "react-router-dom";
import { VscSignOut } from "react-icons/vsc";
import ConfirmationModal from "../../Common/ConfirmationModal";


const Sidebar = () => {
    const {loading:authLoading} = useSelector((state) => state.auth);
    const {user, loading: profileLoading} = useSelector((state)=> state.profile);
    const[confirmationModal, setConfirmationModal] = useState(null);
    const dispatch = useDispatch();
    const navigate = useNavigate();

    if(profileLoading || authLoading){
        return(
            <div className="mt-10">
                Loading...
            </div>
        )
    }


    return (
        <div className="relative">
           <div className="flex relative min-w-[222px] flex-col border-r-[1px] border-r-richblack-700 bg-richblack-800
           py-10 h-[calc(100vh-3.5rem)]">
                <div className="flex flex-col">
                    {
                        dashboardLinks.map((link) => {
                            if(link.type && user?.accountType !== link.type) return null;
                            return(
                                <SideBarLinks key={link.id} link={link} iconName={link.icon}/>
                            )
                            
                        })
                    }
                </div>

                <div className="h-1 mt-6 mb-6 w-[180px] mx-auto bg-richblack-700"></div>

                <div className="flex flex-col">
                    <SideBarLinks
                        link={{name:"Settings" , path:"dashboard/settings"}}
                        iconName="VscSettingsGear"
                    />

                    <button className="relative px-8 py-2 text-sm font-medium text-richblack-100"
                        onClick={()=>setConfirmationModal({
                            text1:"Are You Sure?",
                            text2 : "you will be logged out from your account",
                            btn1text : "Logout",
                            btn2text : "cancel",
                            btn1handler : () => dispatch(logout(navigate)),
                            btn2handler : () => setConfirmationModal(null)
                        })}>
                            
                            <div  className="flex items-center gap-2">
                                <VscSignOut className="text-lg"/>
                                <span>Logout</span>
                            </div>

                    </button>
                </div>
           </div>

           {confirmationModal && <ConfirmationModal modalData={confirmationModal}/>}
        </div>
    )
}

export default Sidebar;