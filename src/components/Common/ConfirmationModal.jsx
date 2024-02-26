import React from "react";
import IconBtn from "./IconBtn";

const ConfirmationModal = ({modalData})=> {
    return(
        <div className="text-white relative">
            <div>
                <p>{modalData.text1}</p>
                <p>{modalData.text2}</p>

                <div>
                    <IconBtn onClick={modalData?.btn1handler} text={modalData?.btn1text}/>

                    <IconBtn onClick={modalData?.btn2handler} text={modalData?.btn2text}/>
                </div>
            </div>
        </div>
    )
}

export default ConfirmationModal;