import React from "react";
import {Link} from "react-router-dom";

const RestaurantItem = ({restaurant, price}) => {
    return (
        <div className={"al-restaurantListItem"}>
            <Link to={`/profile/${restaurant._id}`}>
                {restaurant.username}
            </Link>
            : ${price}
        </div>
    )
}

export default RestaurantItem