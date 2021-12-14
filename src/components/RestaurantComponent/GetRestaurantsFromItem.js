import React from "react";
import UserItem from "./UserItem";

const GetRestaurantsFromItem = ({restaurants}) => {

    return (
        <div>
            {restaurants.map(
                (restaurant) => <UserItem restaurant={restaurant.restaurant} price={restaurant.price} key={restaurant.restaurant._id}/>)}
        </div>
    )
}

export default GetRestaurantsFromItem;