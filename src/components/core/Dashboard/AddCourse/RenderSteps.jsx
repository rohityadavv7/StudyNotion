import { FaCheck } from "react-icons/fa"
import CourseInformationForm from "./CourseForms/CourseInformationForm"
import CourseBuilderForm from "./CourseForms/CourseBuilderForm"
import PublishCourseForm from "./CourseForms/PublishCourseForm"

export default function RenderSteps(){
    const step = 1;

    const steps = [
        {
            id:1,
            title:"Course Information"
        },
        {
            id:2,
            title:"Course Builder"
        },
        {
            id:3,
            title:"Publish"
        }
    ]

    return(
        <div>
            {
                steps.map((item) => (
                    <>
                        <div>
                            <div className={`${step === item.id ? "bg-yellow-900 text-yellow-50 border-yellow-50"
                            : "border-richblack-700 bg-richblack-800 text-richblack-300"}`}>

                                {
                                    step > item.id ? (<FaCheck/>) : (item.id)
                                }

                            </div>
                            <div>
                                    {item.title}
                            </div>

                        </div>

                        <div>
                            {step === 1 && (<CourseInformationForm/>)}
                            {step === 2 && (<CourseBuilderForm/>)}
                            {step === 3 && (<PublishCourseForm/>)}
                        </div>
                    </>
                ))
            }
        </div>
    )
}