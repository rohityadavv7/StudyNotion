import React, { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { IoIosArrowDropdown } from "react-icons/io";
import { RiArrowDropDownLine } from "react-icons/ri";
import { useNavigate , Link} from "react-router-dom";
import { logout } from "../../../services/operations/authAPI";
import { AiOutlineCaretDown } from "react-icons/ai"
import { VscDashboard, VscSignOut } from "react-icons/vsc"
import useOnClickOutside from "../../../hooks/useOnClickOutside";


const ProfileDropDown = ()=> {
    const [open, setOpen] = useState(false)
    const ref = useRef(null)
    const navigate = useNavigate();
    const {user} = useSelector((state) => state.profile);
    const dispatch = useDispatch();

    useOnClickOutside(ref, () => setOpen(false))

    if (!user) return null

    return(
        // <div className="flex items-center">
        //     <div>
        //         <img src={user?.image}
        //             alt={`profile-${user?.firstName}`}
        //             className="w-[30px] rounded-full aspect-square"/>

        //         <RiArrowDropDownLine  className="text-white text-3xl"/>
        //     </div>


        // </div>

        <button className="relative" onClick={() => setOpen(true)}>
            <div className="flex items-center gap-x-1">
                <img
                src={user?.image}
                alt={`profile-${user?.firstName}`}
                className="aspect-square w-[30px] rounded-full object-cover"
                />
                <AiOutlineCaretDown className="text-sm text-richblack-100" />
            </div>
            {open && (
                <div
                onClick={(e) => e.stopPropagation()}
                className="absolute top-[118%] right-0 z-[1000] divide-y-[1px] divide-richblack-700 overflow-hidden rounded-md border-[1px] border-richblack-700 bg-richblack-800"
                ref={ref}
                >
                <Link to="/dashboard/my-profile" onClick={() => setOpen(false)}>
                    <div className="flex w-full items-center gap-x-1 py-[10px] px-[12px] text-sm text-richblack-100 hover:bg-richblack-700 hover:text-richblack-25">
                    <VscDashboard className="text-lg" />
                    Dashboard
                    </div>
                </Link>
                <div
                    onClick={() => {
                    dispatch(logout(navigate))
                    setOpen(false)
                    }}
                    className="flex w-full items-center gap-x-1 py-[10px] px-[12px] text-sm text-richblack-100 hover:bg-richblack-700 hover:text-richblack-25"
                >
                    <VscSignOut className="text-lg" />
                    Logout
                </div>
                </div>
            )}
            </button>
    )
}

export default ProfileDropDown;