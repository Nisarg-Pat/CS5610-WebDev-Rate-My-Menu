import React from "react";

const RestaurantItem = ({restaurant}) => {
    return (
        <li key={restaurant._id}>
            {restaurant.username}
        </li>
    )
}

export default RestaurantItem