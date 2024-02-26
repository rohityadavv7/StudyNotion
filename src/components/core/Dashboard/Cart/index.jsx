import React from "react";
import { useSelector } from "react-redux";
import RenderCartCourse from "../Cart/RenderCartCourse"
import RenderTotalAmount from "../Cart/RenderTotalAmount"

const Cart = () => {

    const{totoalItems, total} = useSelector((state) => state.Cart);

    return(
        <div className="text-white">
            <h1>My Cart</h1>
            <p>{totoalItems} in the cart</p>

            {
                totoalItems > 0?
                (<div>
                    <RenderCartCourse/>
                    <RenderTotalAmount/>
                </div>)
                :
                (<div>
                    Your Cart is Empty!
                </div>)
            }
        </div>
    )
}

export default Cart;