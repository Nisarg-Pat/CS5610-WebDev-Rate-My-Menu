import React from "react";
import {Link} from "react-router-dom";

const FoodItem = ({foodItem, price, role, deleteClickHandler}) => {
    return (
        <div className={"al-foodItem al-margin-bottom-small"}>
            <div className={"row"}>
                <div className={"col-10"}>
                    <Link to={`/details/${foodItem.id}`}
                          key={foodItem._id}
                          className={"al-no-underline al-flex al-v-center"}>
                        <img src={foodItem.image}
                             alt={foodItem.title}
                             className={"al-foodItem-img"}/>
                        <span className={"al-font-large al-padding-left-medium al-color-white"}>{foodItem.title} {price !== undefined ? <>: ${price}</> : <></>}</span>

                    </Link>
                </div>
                <div className={"col-2 al-flex al-v-center al-h-right"}>
                    {role === "customer" ?
                     <button className={"btn btn-primary al-button"} onClick={() => deleteClickHandler(foodItem)}>
                         Unlike
                     </button> :
                     <></>}
                    {role === "restaurant" ?
                     <button className={"btn btn-primary al-button"} onClick={() => deleteClickHandler(foodItem)}>
                         Remove
                     </button> :
                     <></>}
                </div>
            </div>

        </div>
    )
}

export default FoodItem;