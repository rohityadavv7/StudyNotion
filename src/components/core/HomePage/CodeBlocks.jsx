import React from "react";
import CTAbutton from "./Button";
import HighlightText from "../HighlightText";
import {FaArrowRight} from "react-icons/fa"
import { TypeAnimation } from "react-type-animation";

const CodeBlocks = (
    {position,heading, subHeading, ctaBtn1, ctaBtn2, codeblock, codeColor, bgGradient}
) => {
    return(
        <div className={` flex ${position} justify-between my-20 gap-10`}>
            {/*Left Part*/ }
            <div className="w-[50%] flex flex-col gap-8">
                {heading}
                
                <div>
                    {subHeading}
                </div>
                
                <div className="flex gap-7 mt-7">
                    <CTAbutton active={ctaBtn1.active} linkTo={ctaBtn1.linkTo}>
                        <div className="flex items-center">
                            {ctaBtn1.btnText}
                            <FaArrowRight/>
                        </div>
                    </CTAbutton>

                    <CTAbutton active={ctaBtn2.active} linkTo={ctaBtn2.linkTo}>
                            {ctaBtn2.btnText}
                    </CTAbutton>
                </div>


            </div>


            
            {/* Right Part */}
            <div className="w-[50%] h-fit flex gap-1 px-[16px] py-[6px]">
                
                <div className="w-[10%] text-richblack-300">
                    <p>1</p>
                    <p>2</p>
                    <p>3</p>
                    <p>4</p>
                    <p>5</p>
                    <p>6</p>
                    <p>7</p>
                    <p>8</p>
                    <p>9</p>
                    <p>10</p>
                    <p>11</p>
                    <p>12</p>
                </div>

                <div className="absolute h-[200px] w-[200px] bg-blue-100 rounded-full blur-3xl right-8"></div>
                <div className={`w-[90%] font-mono ${codeColor} flex flex-col gap-2 pr-2 font-bold`} >
                        <TypeAnimation
                            sequence={[codeblock,2000,""]}
                            repeat={Infinity}
                            style={
                                {
                                    display:"block",
                                    whiteSpace:"pre-line"
                                }
                            }           
                            omitDeletionAnimation={true}

                        />
                </div>
            </div>
        </div>
    )
}

export default CodeBlocks;