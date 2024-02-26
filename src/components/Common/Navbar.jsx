import React from "react";
import { Link, matchPath, matchRoutes } from "react-router-dom";
import {NavbarLinks} from "../../data/navbar-links"
import logo from "../../assets/Logo/Logo-Full-Light.png"
import { useLocation } from "react-router-dom";
import { useSelector } from "react-redux";
import { useState, useEffect } from "react";
import ProfileDropDown from "../core/Auth/profileDropDown";
import { apiConnector } from "../../services/apiConnector";
import { categories } from "../../services/apis";
import { IoIosArrowDropdownCircle } from "react-icons/io";

const Navbar = ()=> {
    const location = useLocation();

    const{token} = useSelector((state) => state.auth);
    const {user} = useSelector( (state) => state.profile);
    const {totalItems} = useSelector( (state) => state.cart);

    const matchRoute = (route)=>{
        return matchPath({path:route}, location.pathname)
    }

    const [subLinks, setsubLinks] = useState([]);

    const fetchSublinks = async()=> {
        const result = apiConnector("GET", categories.CATEGORIES_API);
        console.log("printing result -> ", result);
        setsubLinks(result);
    }

    useEffect(() => {
        fetchSublinks();
    },[])
    
    return(
        <div className="border-b-[1px] flex h-14 border-b-richblack-700 mx-auto w-full items-center">
            <div className="w-11/12 flex max-w-maxContent mx-auto items-center justify-between">

                {/* Image */}
                <Link to={"/"}>
                    <img src={logo} alt="Logo" width={160} height={42} loading="lazy"/>
                </Link>

                {/* Navbar Links */}

                <nav>
                    <ul className="flex gap-x-4">
                        {
                            NavbarLinks.map( (link, index) => {
                                return(
                                    <li key={index}>
                                        {
                                            link.title === "Catalog" ? 
                                            (<div className="flex gap-x-1 items-center text-richblack-25 relative group">
                                                <p>{link.title}</p>
                                                <IoIosArrowDropdownCircle />
                                                

                         
                                                <div className=" invisible opacity-0 flex flex-col bg-richblack-5 absolute 
                                                lg:w-[200px] group-hover:opacity-100 top-10
                                                group-hover:visible transition-all duration-200 rounded-md p-4"> 
                                                
                                                    <div className=" absolute bg-richblack-5 rounded-md rotate-45 lg:left-[52px] 
                                                    lg:w-[10px] lg:-translate-y-6 transition-all duration-200 p-4">

                                                    </div>

                                                    {/* {
                                                        subLinks.map((link, index) => {
                                                            return(
                                                                <p key={index}>
                                                                    {link.data.allCategory.categoryName}
                                                                </p>
                                                            )
                                                        })
                                                    } */}
                                                </div>
                                            </div>) :
                                            
                                            (<Link to={link?.path} className={`${matchRoute(link?.path) ? "text-yellow-25" : "text-richblack-25"}`}>
                                                {link.title}
                                            </Link>)
                                        }
                                    </li>
                                )
                            })
                        }
                    </ul>
                </nav>

                {/* Login/signup/dashboard */}

                <div className=" flex gap-x-4 items-center">
                    {
                        user && user?.accountType !== "Instructor" && (
                            <Link to="/dashboard/cart">
                                {
                                    totalItems > 0 && (
                                        {totalItems}
                                    )
                                    
                                }
                            </Link>
                        )
                    }
                    {
                        token === null && (
                            <Link to="/login">
                                <button className="border rounded-md border-richblack-700 bg-richblack-800 text-richblack-100
                                px-[12px] py-[8px]">
                                    Log in
                                </button>
                            </Link>
                        )
                    }

                     {
                        token === null && (
                            <Link to="/signUp">
                                <button className="border rounded-md border-richblack-700 bg-richblack-800 text-richblack-100
                                px-[12px] py-[8px]">
                                    Sign up
                                </button>
                            </Link>
                        )
                    }

                    {
                        user && token !== null && (<ProfileDropDown/>)
                    }
                </div>

            </div>
        </div>
    )
}

export default Navbar;