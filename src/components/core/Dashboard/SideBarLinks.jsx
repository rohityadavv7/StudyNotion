// import React from "react";
// import { NavLink, matchPath, useLocation } from "react-router-dom";
// import * as Icons from "react-icons/vsc"

// const SideBarLinks = ({link, iconName}) => {

//     const location = useLocation();
//     const Icon = Icons[iconName];

//     const matchRoute=(route)=>{
//         return matchPath({path:route}, location.pathname);
//     }

//     return(
//             <NavLink to={link.path}
//             className={`${matchRoute(link.path) ? "bg-yellow-800" : "bg-opacity-0"} relative px-8 py-2 text-sm
//             font-medium`}>
//                 <span className={`absolute top-0 left-0 bg-yellow-50 ${matchRoute(link.pathname) ? "bg-opacity-100"
//                 :"bg-opacity-0"} h-full w-[0.2rem]`}>
//                 </span>
                
//                 <div>
//                     <Icon className="text-lg"/>
//                     <span>{link.name}</span>
//                 </div>

//             </NavLink>
//     )
// }

// export default SideBarLinks;

import React from 'react'
import * as Icons from "react-icons/vsc"
import { useDispatch } from 'react-redux';
import { NavLink, matchPath, useLocation } from 'react-router-dom';

const SidebarLinks = ({link, iconName}) => {

    const Icon = Icons[iconName];
    const location  = useLocation();
    const dispatch = useDispatch();

    const matchRoute = (route) => {
        return matchPath({path:route}, location.pathname);
    }


  return (
    <NavLink
    to={link.path}
    className={ `relative px-8 py-2 text-sm font-medium ${matchRoute(link.path) ? "bg-yellow-800" :"bg-opacity-0"}
    ${matchRoute(link.path) ? "text-yellow-25" :"text-richblack-100"}`}
    >

        <span className={`absolute left-0 top-0 h-full w-[0.2rem] bg-yellow-50
        ${matchRoute(link.path) ? "opacity-100": "opacity-0"}`}>

        </span>

        <div className='flex item-center gap-x-2'>

            <Icon className="text-lg" />
            <span>{link.name}</span>
        </div>
    </NavLink>
  )
}

export default SidebarLinks
