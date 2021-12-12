import React, {useEffect, useState} from "react";
import {findMenuOfRestaurant} from "../../services/menuService";
import FoodItem from "../FoodIemComponent/FoodItem";

const GetRestaurantMenu = ({restaurant}) => {
    let [menu, setMenu] = useState([]);
    useEffect(() => {
        findMenuOfRestaurant(restaurant).then((menu) => {
            setMenu(menu);
            console.log(menu);
        });
    }, [restaurant]);
    return (
        <div>
            <h2>
                Menu
            </h2>
            <div>
                {menu.map((item) => <FoodItem foodItem={item.foodItem}/>)}
            </div>
        </div>
    )
}

export default GetRestaurantMenu;