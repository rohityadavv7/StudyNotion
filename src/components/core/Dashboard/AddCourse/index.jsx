import RenderSteps from "./RenderSteps"


export default function AddCourse(){
    return(
        <div className="text-white">
            {/* LEFT-SECTION */}
            <div>
                <h1>
                    Add Course
                </h1>

                <div>
                    <RenderSteps/>
                </div>
            </div>

            {/* RIGHT-SECTION */}
            <div>
                <h2>Course Upload Tips</h2>

                <ul>
                    <li>upload high quality videos</li>
                    <li>upload high quality videos</li>
                    <li>upload high quality videos</li>
                    <li>upload high quality videos</li>
                    <li>upload high quality videos</li>
                    <li>upload high quality videos</li>
                </ul>
            </div>
        </div>
    )
}