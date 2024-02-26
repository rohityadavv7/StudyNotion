import React from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import IconBtn from "../../Common/IconBtn";
import { FiEdit } from "react-icons/fi";


const MyProfile = () => {
    const {user} = useSelector((state) => state.profile);
    const navigate = useNavigate();
    return(
        <div className="text-white absolute ml-[9rem] space-y-8 flex flex-col min-w-[1000px] mt-10">
            
            <h1 className="text-white text-2xl font-bold">
                My Profile
            </h1>

            <div className="flex justify-between rounded-md p-7 bg-richblack-800">
                <div className="flex items-center gap-2">
                    <img src={user?.image} height={68} width={68} alt={`profile-${user?.firstName}`}
                    className="w-[18]px aspect-square rounded-full"/>

                    <div>
                        <p className="text-xl font-semibold">{user?.firstName + " " + user?.lastName}</p>
                        <p className="text-richblack-100">{user?.email}</p>
                    </div>
                </div>
                <div className="flex items-center">
                    <button className="flex gap-2 bg-yellow-100 items-center px-4 py-1 rounded-md">
                        <p className="text-black font-medium">Edit</p>
                        <FiEdit  className="text-black"/>
                    </button>

                </div>

            </div>
        </div>
    )
}

export default MyProfile;