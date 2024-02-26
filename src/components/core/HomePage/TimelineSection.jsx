import React from "react";
import logo1 from "../../../assets/TimeLineLogo/Logo1.svg"
import logo2 from "../../../assets/TimeLineLogo/Logo2.svg"
import logo3 from "../../../assets/TimeLineLogo/Logo3.svg"
import logo4 from "../../../assets/TimeLineLogo/Logo4.svg"
import TimeLineImage from "../../../assets/Images/TimelineImage.png"

const TimeLine = [
    
    {
        Logo:logo1,
        Heading:"Leadership",
        Description:"Fully Commited to success company"
    },
    {
        Logo:logo2,
        Heading:"Leadership",
        Description:"Fully Commited to success company"
    },
    {
        Logo:logo3,
        Heading:"Leadership",
        Description:"Fully Commited to success company"
    },
    {
        Logo:logo4,
        Heading:"Leadership",
        Description:"Fully Commited to success company"
    }

]

const TimelineSection = () => {
    return (
        <div>

            <div className="flex items-center gap-10">
                <div className="w-[45%] flex flex-col gap-5">
                    {
                        TimeLine.map((element, index)=>{
                            return(
                                <div className="flex gap-7" key={index}>
                                    <div className="h-[50px] w-[50px] bg-white">
                                        <img src={element.Logo}/>
                                    </div>

                                    <div className="flex flex-col text-[18px]">
                                        <h2 className="font-semibold">
                                            {element.Heading}
                                        </h2>
                                        <p>
                                            {element.Description}
                                        </p>
                                        
                                    </div>
                                </div>
                            )
                        })
                    }

                </div>

                <div className="relative shadow-blue-300 object-fill">
                    <img src={TimeLineImage} alt="TimeLineImage"/>

                    <div className="absolute py-6 text-white bg-caribbeangreen-700 uppercase
                     flex  left-[5%] translate-x-6 translate-y-[-40%]">

                        <div className="flex gap-5 items-center  border-r border-caribbeangreen-300 px-7">
                            <p className="text-3xl font-semibold">10</p>
                            <p className="flex text-sm text-caribbeangreen-400">Years of Experience</p>
                        </div>

                        <div className="flex gap-5 items-center px-7">
                            <p className="text-3xl font-semibold">250</p>
                            <p className="flex text-sm text-caribbeangreen-400">Type pf Courses</p>
                        </div>
                    </div>
                </div>
            </div>

        </div>
    )
}

export default TimelineSection;