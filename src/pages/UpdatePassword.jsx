import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import{useForm} from "react-hook-form"
import { resetPassword } from "../services/operations/authAPI";
import { Link, useLocation } from "react-router-dom";
import { HiEye } from "react-icons/hi";
import { HiEyeOff } from "react-icons/hi";
import CTAbutton from "../components/core/HomePage/Button";


const UpdatePassword = () => {
    const{register, handleSubmit} = useForm();
    const location = useLocation();
    const [showPassword, setShowPassword] = useState(false);
    const dispatch = useDispatch();
    const{loading} = useSelector((state) => state.auth);

    const updatePassword=async(data,e)=>{
        e.preventDefault();
        const updateData = {
            ...data
        };
        const token = location.pathname.split("/").at(-1);
        console.log("token -> ", token);
        dispatch(resetPassword(updateData.password, updateData.ConfirmPassword,token))
    }

    return(
        <div>
            {
                loading?(<div>loading...</div>)
                :
                (
                    <div className="flex flex-col space-y-1 justify-center items-center">
                        <h1 className="text-3xl text-white font-semibold">
                            Choose New Password!
                        </h1>

                        <p className=" text-richblack-100">Almost Done! Enter your new password and you are all set...</p>

                        <form onSubmit={handleSubmit(updatePassword)}>
                            <label>
                                <p className="text-richblack-100">New Password</p>
                                <input
                                    required
                                    name="password"
                                    type={showPassword?"text":"password"}
                                    placeholder="enter new password"
                                    {...register("password")}
                                />
                                <span onClick={() => setShowPassword((prev)=> !prev)}>
                                    {
                                        showPassword?<HiEye className="text-xl text-white" />:<HiEyeOff className="text-xl text-white"/>
                                    }
                                </span>
                            </label>
                            <label>
                                <p className="text-richblack-100">Confirm New Password</p>
                                <input
                                    required
                                    name="ConfirmPassword"
                                    type={showPassword?"text":"password"}
                                    placeholder="Confirm new password"
                                    {...register("ConfirmPassword")}
                                />
                                <span onClick={() => setShowPassword((prev) => !prev)}>
                                    {
                                        showPassword?<HiEye className="text-xl text-white" />:<HiEyeOff className="text-xl text-white"/>
                                    }
                                </span>
                            </label>

                            <button type="submit" className="text-white">
                                Reset Password
                            </button>
                        </form>

                        <div>
                            <CTAbutton active={true} linkTo={"/login"}>
                                <p>Back to Log In</p>
                            </CTAbutton>
                        </div>
                    </div>
                )
            }
        </div>
    )

}

export default UpdatePassword;