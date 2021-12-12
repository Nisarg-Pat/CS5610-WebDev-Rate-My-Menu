import React, {useEffect, useState} from "react";
import {findRestaurantsFromItem} from "../../services/menuService";
import RestaurantItem from "./RestaurantItem";

const GetRestaurantsFromItem = ({item}) => {
    let [restaurants, setRestaurants] = useState([]);
    useEffect(() => {
        findRestaurantsFromItem(item).then((restaurants) => setRestaurants(restaurants));
    }, [item]);

    return (
        <div>
            {restaurants.map(
                (restaurant) => <RestaurantItem restaurant={restaurant.restaurant} price={restaurant.price}/>)}
        </div>
    )
}

export default GetRestaurantsFromItem;