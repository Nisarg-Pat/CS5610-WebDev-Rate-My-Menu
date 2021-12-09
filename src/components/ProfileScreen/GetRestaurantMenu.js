import React, {useEffect, useState} from "react";
import {findMenuOfRestaurant} from "../../services/menuService";
import FoodItem from "./FoodItem";

const GetRestaurantMenu = ({restaurant}) => {
    let [menu, setMenu] = useState([]);
    useEffect(() => {
        findMenuOfRestaurant(restaurant).then((menu) => setMenu(menu))
    }, [restaurant]);
    return (
        <div>
            <ul>
                {menu.map((item) => <FoodItem foodItem={item.foodItem}/>)}
            </ul>
        </div>
    )
}

export default GetRestaurantMenu;