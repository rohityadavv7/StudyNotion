import React, { useEffect, useState } from "react";
import OtpInput from "react-otp-input";
import { useDispatch, useSelector } from "react-redux";
import CTAbutton from "../pages/Home"
import { signUp } from "../services/operations/authAPI";
import { Link, useNavigate } from "react-router-dom";
import { sendOtp } from "../services/operations/authAPI";

const VerifyEmail = () => {

    const {loading, signupData} = useSelector((state) => state.auth);
    const[otp, setOtp] = useState("");
    const dispatch = useDispatch();
    const navigate = useNavigate();

    useEffect(()=>{
        if(!signupData){
            navigate("/signup");
        }
    },[]);

    const handleSubmit = (e)=> {
        e.preventDefault();

        const {
            accountType,
            firstName,
            lastName,
            email,
            password,
            confirmPassword
        } = signupData;

        dispatch(signUp(accountType,firstName, lastName, email, password, confirmPassword, otp, navigate));
    }

    return(
        <div className="flex items-center text-white justify-center mt-[180px]">
            {
                loading? (<div>loading...</div>)
                :
                (<div className="flex flex-col items-center justify-center space-y-1">
                    <h1 className="text-2xl text-white font-bold">Verify Your Email!</h1>
                    <p className="text-richblack-100">A verification code has been sent to you. Enter the code below</p>
                    <form onSubmit={handleSubmit}>
                         <OtpInput
                            value={otp}
                            onChange={setOtp}
                            numInputs={6}
                            renderSeparator={<span className="">-</span>}
                            renderInput={(props) => <input {...props} 
                            className="bg-richblack-800 text-4xl p-1 rounded"/>}
                            />


                        <button type="submit" className="px-[12px] py-[8px] mx-auto bg-yellow-100 text-richblack-900
                        rounded-md">
                            Verify Email
                        </button>
                    </form>

                    <div>
                        <div className="text-white">
                            <Link to="/login">
                                <p>Back to Log In</p>
                            </Link>
                        </div>

                        <button onClick={() => dispatch(sendOtp(signupData.email, navigate))}
                        className="text-white">
                            Resend it?
                        </button>
                    </div>

                </div>)
            }
        </div>
    )
}

export default VerifyEmail;