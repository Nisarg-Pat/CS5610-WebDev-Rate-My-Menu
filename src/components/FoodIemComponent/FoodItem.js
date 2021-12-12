import React from "react";
import {Link} from "react-router-dom";

const FoodItem = ({foodItem}) => {
    return (
        <Link to={`/details/${foodItem.id}`} key={foodItem._id}>
            <img src={foodItem.image} height={"50px"}
                 alt={foodItem.title}/>
            {foodItem.title}
        </Link>
    )
}

export default FoodItem;