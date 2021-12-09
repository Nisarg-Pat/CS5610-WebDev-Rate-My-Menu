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
            <ul>
                {restaurants.map(
                    (restaurant) => <RestaurantItem restaurant={restaurant.restaurant}/>)}
            </ul>
        </div>
    )
}

export default GetRestaurantsFromItem;