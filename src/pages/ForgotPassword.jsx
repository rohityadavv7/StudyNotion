import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import {getPasswordResetToken} from "../services/operations/authAPI"
import CTAbutton from "../components/core/HomePage/Button"

const ForgotPassword = () => {

    const[email,setEmail] = useState("");
    const [emailSent, setEmailSent] = useState(false);
    const {loading} = useSelector((state) => state.auth);
    const dispatch = useDispatch();

    const submitHandler = (e)=>{
        e.preventDefault();
        dispatch(getPasswordResetToken(email, setEmailSent));
    }

    return(
        <div className="flex justify-center items-center h-full mt-[12rem]">
            {
                loading? (<div>Loading...</div>)
                :
                (
                    <div className="flex h-full w-[40%] flex-col border border-yellow-25 justify-center items-center space-y-1">
                        <div>
                            
                        </div>
                        <h1 className="text-2xl text-white font-bold">
                            {
                                !emailSent ? 
                                ("Reset Your Password")
                                :
                                ("Check Email")
                            }
                        </h1>

                        <p className="text text-richblack-100">
                            {
                                !emailSent?
                                ("Have no fear, we'll email you instructions to reset your password. If you don't have access to your email, we can try account recovery! ")
                                :
                                (`We have sent the account recovery link to ${email}`)
                            }
                        </p>

                        <form onSubmit={submitHandler} className=" flex flex-col justify-center items-center space-y-1">
                            {
                                !emailSent && (
                                    <label>
                                        <p className="text-richblack-5">Enter your email:</p>
                                        <input
                                            className="px-2 py-1 rounded-md"
                                            required
                                            type="email"
                                            name="email"
                                            value={email}
                                            onChange={(e) => setEmail(e.target.value)}
                                            placeholder="enter you email"
                                        />
                                    </label>
                                )
                            }

                            <button type="submit" className="text-white">
                                {
                                    !emailSent? ("Reset Password")
                                    :
                                    ("Resend Email")
                                }
                            </button>
                        </form>
                        
                        <div>
                            <CTAbutton linkTo={"/login"} active={true}>
                                <p>
                                    Go back to Log In
                                </p>
                            </CTAbutton>
                        </div>
                    </div>
                )
            }
        </div>
    )
}

export default ForgotPassword;