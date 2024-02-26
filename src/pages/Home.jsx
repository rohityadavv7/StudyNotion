import React from "react";
import { Link } from "react-router-dom";
import {FaArrowRight} from "react-icons/fa"
import HighlightText from "../components/core/HighlightText";
import CTAbutton from "../components/core/HomePage/Button";
import Banner from "../assets/Images/banner.mp4"
import CodeBlocks from "../components/core/HomePage/CodeBlocks";
import TimelineSection from "../components/core/HomePage/TimelineSection";
import Learning from "../components/core/HomePage/LearningLanguageSection";
import InstructorImage from "../../src/assets/Images/Instructor.png"


const Home = () => {
    return(
        <div>
            {/*SECTION - 1 */ }
            
            <div className="relative w-11/12 flex max-w-[950px] flex-col items-center justify-between mx-auto text-white">

                <Link to={"/signUp"}>

                    <div className=" group mt-16 p-1 mx-auto font-bold transition-all duration-200 hover:scale-95
                     bg-richblack-800 rounded-full w-fit text-richblack-200">

                        <div className="flex flex-row items-center gap-2 rounded-full transition-all duration-200
                         px-10 py-[5px] group-hover:bg-richblack-900">
                            <p>
                              Become an Instructor
                            </p>

                            <FaArrowRight/>
                        </div>
                    </div>
                </Link>

                <div className="mt-7 text-4xl font-semibold">
                    Empower your Future with
                    <HighlightText text={"Coding Skills"}/>
                </div>

                <div className="mt-4 text-lg text-center leading-6 text-richblack-200">
                    With our Online Coding Courses, you can learn at your own pace, from anywhere in the World, and 
                    get access to a wealth of resources, including hands-on projects, quizzes and personalised feedback from Instructors.
                </div>

                <div className="flex gap-7 mt-8">
                    <CTAbutton className="text-white" active={true} linkTo={"/signUp"}>
                        Learn More
                    </CTAbutton>

                    <CTAbutton active={false} linkTo={"/logIn"}>
                        Book a Demo
                    </CTAbutton>
                </div>

                <div className="shadow-blue-200 mx-3 my-12">
                    <video muted autoPlay loop >
                        <source src={Banner}></source>
                    </video>
                </div>

                {/**CODEBLOCK - 1 */}
                <div>
                    <CodeBlocks
                        position={"lg:flex-row"}
                        heading={
                            <div className="text-2xl font-semibold">
                                Unlock your 
                                <HighlightText text={"Coding Potential"}/>
                                with out Online Courses.
                            </div>
                        }
                        subHeading={"Our Courses are designed and taught by industry experts who have years of experience in coding and are passionate about sharing their knowledge with you."}
                        ctaBtn1={
                            {
                                btnText:"Try it Yourself",
                                linkTo:"/signUp",
                                active:true
                            }
                        }

                        ctaBtn2={
                            {
                                btnText:"Learn More",
                                linkTo:"/logIn",
                                active:false
                            }
                        }

                        codeblock={`<!DOCTYPE html>\n<html>\n<title>Example<\title><linkrel ="stylesheet" href="style.css/>\n">`}
                        codeColor={"text-yellow-5"}
                    />
                </div>
                
                {/**CODEBLOCK - 2 */}
                <div>
                    <CodeBlocks
                        position={"lg:flex-row-reverse"}
                        heading={
                            <div className="text-2xl font-semibold">
                                Unlock your 
                                <HighlightText text={"Coding Potential"}/>
                                with out Online Courses.
                            </div>
                        }
                        subHeading={"Our Courses are designed and taught by industry experts who have years of experience in coding and are passionate about sharing their knowledge with you."}
                        ctaBtn1={
                            {
                                btnText:"Try it Yourself",
                                linkTo:"/signUp",
                                active:true
                            }
                        }

                        ctaBtn2={
                            {
                                btnText:"Learn More",
                                linkTo:"/logIn",
                                active:false
                            }
                        }

                        codeblock={`<!DOCTYPE html>\n<html>\n<title>Example<\title><linkrel ="stylesheet" href="style.css/>\n">`}
                        codeColor={"text-yellow-5"}
                    />
                </div>

                
            </div>

            {/*SECTION - 2 */ }
            <div className="flex flex-col bg-pure-greys-5 mb-5"> 
                    <div className="h-[310px] bg">

                            <div className="w-11/12 mx-auto flex flex-col">
                                
                                <div className="h-[150px]"></div>

                                <div className="flex gap-7 items-center justify-center">
            
                                    <CTAbutton active={true} linkTo={"/logIn"}>
                                        <div className="flex items-center gap-3">
                                            Explore Full Catalog
                                            <FaArrowRight/>
                                        </div>
                                        
                                    </CTAbutton>
                                

                                    <CTAbutton active={false} linkTo={"/signUp"}>
                                        <div>Learn More!</div>
                                    </CTAbutton>

                                </div>
                                <div className="h-[150px]"></div>

                            </div>
                    </div>    

                    <div className="w-11/12 mx-auto max-w-maxContent flex flex-col items-center justify-between gap-7">

                        <div className="flex mx-auto items-center justify-center mt-[70px] gap-3">
                            {/**Left part */}
                            <div className="w-[50%] text-[40px] font-semibold">
                                <p>Get the skills you need for a
                                    <HighlightText text={"job that is in Demand."}/>
                                </p>
                            </div>

                            {/**right part */}
                            <div className="w-[50%] mt-8">
                                <p className="flex flex-col text-xl text-richblack-300">
                                    The modern StudyNotion is a declaration of its own terms. Today, to be a competitive
                                    Spacialist requires more than professional Skills.
                                </p>

                                <div className="w-[20%] mt-10 ">
                                    <CTAbutton active={true} linkTo={"/signUp"}>
                                        Learn More
                                    </CTAbutton>
                                </div>
                            </div>
                        </div>

                        <TimelineSection></TimelineSection>

                        <Learning></Learning>

                    </div>

            </div>

            {/*SECTION - 3 */ }
            <div className="w-11/12 flex flex-col bg-richblack-900 text-white justify-center mx-auto items-center gap-3 mt-6">
                <div className="flex items-center justify-center gap-4">
                    <div className="w-[50%] flex items-center justify-center m-6 p-6">
                        <img src={InstructorImage} 
                        alt="InstructorImage" className="h-[450px]"
                        />
                    </div>

                    <div className="w-[50%]">
                            <div className="text-4xl font-semibold">
                                Become an<br/>
                                <HighlightText text={"Instructor"}/>
                            </div>

                            <div className="font-small mt-3 text-richblack-200 text-left w-[70%]">
                                instructors from around the world, teach millions of Students on StudyNotion. We provide the tools and skills to achieve what you Love!
                            </div>

                            <div className="w-fit mt-16">
                                <CTAbutton active={true} linkTo={"/signUp"}>
                                    <div className="flex gap-2 items-center">
                                        Start Teaching Today 
                                        <FaArrowRight/>
                                    </div>
                                </CTAbutton>
                            </div>


                    </div>
                </div>

                <div className="mt-20 mx-auto">
                    <div className="text-4xl font-semibold">
                        Reviews from Other Learners.
                    </div>

                </div>
            </div>

            {/*FOOTER */ }
        </div>
    )
}

export default Home;