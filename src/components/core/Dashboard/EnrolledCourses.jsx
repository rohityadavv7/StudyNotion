import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { getUserEnrolledCourses } from "../../../services/operations/authAPI"
import ProgressBar from "@ramonak/react-progress-bar";

const EnrolledCourses = () => {
    const {token} = useSelector((state) => state.auth);

    const[enrolledCourses, setEnrolledCourses] = useState([]);

    const getEnrolledCourses = async()=> {
        try{
            const response = await getUserEnrolledCourses({token});
            setEnrolledCourses(response);
        }
        catch(error){
            console.log("could not get user enrolled courses!")
        }
    }

    useEffect(() => {
        getEnrolledCourses();
    },[])
    return(
        <div className="text-white">
            <div>
                Enrolled Courses
            </div>
            {
                !enrolledCourses ? 
                (<div>Loading...</div>)
                :
                (enrolledCourses.length === 0? 
                    (<div className="text-white">You have not enrolled into any course yet!</div>)
                    :
                    (<div>
                        <div>
                            <p>Course Name</p>
                            <p>Duration</p>
                            <p>Progress</p>
                        </div>

                        {
                            enrolledCourses.map((course, index)=>{
                                return(
                                    <div>
                                        <div>
                                            <img src={course.thumbnail}/>
                                            
                                            <div>
                                                <p>{course.courseName}</p>
                                                <p>{course.courseDescription}</p>
                                            </div>
                                        </div>

                                        <div>
                                            <p>{course?.totalDuration}</p>
                                        </div>

                                        <div>
                                            <p>Progress: {course.progressPercentage || 0}%</p>
                                            <ProgressBar
                                                completed={course.progressPercentage}
                                                isLabelVisible={false}
                                            />
                                        </div>
                                    </div>
                                )
                            })
                        }
                    </div>))
            }
        </div>
    )
}

export default EnrolledCourses;