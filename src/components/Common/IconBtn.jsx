import React from "react";

const IconBtn = ({text, onclick, children,disabled, outline= false,customClasses, type}) => {
    return(
        <button disabled={disabled} onClick={onclick} type={type} 
        className="flex  bg-yellow-100 text-black font-semibold ">
            {
                children?(
                    <>
                        <span>
                            {text}
                            {children}
                        </span>
                    </>
                ):
                (text)
            }
        </button>
    )
}

export default IconBtn;