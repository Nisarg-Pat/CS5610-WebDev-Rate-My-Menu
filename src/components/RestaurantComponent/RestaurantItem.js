import React from "react";
import {Link} from "react-router-dom";

const RestaurantItem = ({restaurant}) => {
    return (
        <Link to={`/profile/${restaurant._id}`}>
            <li key={restaurant._id}>
                {restaurant.username}
            </li>
        </Link>
    )
}

export default RestaurantItem