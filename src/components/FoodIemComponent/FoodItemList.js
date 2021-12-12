import React from "react";
import FoodItem from "./FoodItem";

const FoodItemList = ({items}) => {
    return (
        <div>
            {
                items.map((item) => <FoodItem foodItem={item}/>)
            }
        </div>
    )
}

export default FoodItemList