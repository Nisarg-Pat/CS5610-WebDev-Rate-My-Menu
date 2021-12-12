import React, {useEffect, useState} from "react";
import {findMenuOfRestaurant} from "../../services/menuService";
import FoodItem from "../FoodIemComponent/FoodItem";

const GetRestaurantMenu = ({restaurant}) => {
    let [menu, setMenu] = useState([]);
    useEffect(() => {
        findMenuOfRestaurant(restaurant).then((menu) => {
            setMenu(menu);
        });
    }, [restaurant]);
    return (
        <div>
            <div>
                {menu.map((item) => <FoodItem foodItem={item.foodItem} price={item.price}/>)}
            </div>
        </div>
    )
}

export default GetRestaurantMenu;