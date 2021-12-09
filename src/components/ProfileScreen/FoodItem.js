import React from "react";

const FoodItem = ({foodItem}) => {
    return (
        <li key={foodItem._id}>
            <img src={foodItem.image} height={"50px"}
                 alt={foodItem.title}/>
            {foodItem.title}
        </li>
    )
}

export default FoodItem;