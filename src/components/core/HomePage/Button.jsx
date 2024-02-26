import React from "react";
import { Link } from "react-router-dom";

const CTAbutton = ({children,linkTo,active})=> {
    return(
        <Link to={linkTo}>
            <div className={`text-center text-[13px] px-6 py-3 rounded-md hover:scale-95 transition-all duration-200
            ${active ? "bg-yellow-50 text-black":"bg-richblack-800 text-white"} font-bold`}>
                {children}
            </div>

        </Link>
    )
}

export default CTAbutton;