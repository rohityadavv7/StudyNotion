import React from "react";
import HighlightText from "../HighlightText"
import Know_your_progress from "../../../assets/Images/Know_your_progress.png"
import Compare_with_others from "../../../assets/Images/Compare_with_others.png"
import plan_your_lessons from "../../../assets/Images/Plan_your_lessons.png"
import CTAbutton from "./Button";

const learning = ()=> {
    return(
        <div className="w-11/12 flex flex-col items-center mt-[140px]">

            <div>
                <div className="text-4xl font-semibold text-center">
                    Your Swiss Knife for 
                    <HighlightText active={true} text={"Learning any Language"}/>
                </div>

                <div className="text-richblack-200 font-medium mt-4 w-[65%] text-center mx-auto">
                    Using spin making learning multiple languages easy, with 0+ languages realistic voice over, progress tracking, customize schedule and more 
                </div>

                <div className="mt-6 flex items-center">
                    <img src={Know_your_progress} alt="KnowYourProgress"
                     className="-mr-32" />

                    <img src={Compare_with_others} alt="CompareWithOthers" />

                    <img src={plan_your_lessons} alt="PlanYourLessons" 
                    className="-ml-32"/>
                </div>

                <div className="w-fit mx-auto mt-4 mb-16">
                    <CTAbutton active={true} linkTo={"/signUp"} >
                        Learn More!
                    </CTAbutton>
                </div>
            </div>

        </div>
    )
}

export default learning;