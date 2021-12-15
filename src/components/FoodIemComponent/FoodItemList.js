import React from "react";
import FoodItem from "./FoodItem";

const FoodItemList = ({items}) => {
    return (
        <div>
            {
                items.map((item, key) => <FoodItem foodItem={item} key={key}/>)
            }
        </div>
    )
}

export default FoodItemList