import React, {useEffect, useState} from "react";
import {deleteMenuItem, findMenuOfRestaurant} from "../../services/menuService";
import FoodItem from "../FoodIemComponent/FoodItem";

const GetRestaurantMenu = ({restaurant, showDelete}) => {
    let [menu, setMenu] = useState([]);

    const deleteItemClickHandler = (item) => {
        const menuItem = {
            restaurant,
            foodItem: item
        }
        deleteMenuItem(menuItem)
            .then((status) => setMenu(menu.filter((menuItem) => menuItem.foodItem !== item)))
    }

    useEffect(() => {
        findMenuOfRestaurant(restaurant).then((menu) => {
            setMenu(menu);
        });
    }, [restaurant]);
    return (
        <div>
            <div>
                {showDelete ? menu.map((item, key) => <FoodItem foodItem={item.foodItem}
                                                                role={restaurant.role}
                                                                price={item.price}
                                                                deleteClickHandler={deleteItemClickHandler}
                            />)
                            : menu.map((item, key) => <FoodItem foodItem={item.foodItem}
                                                                price={item.price}
                                                                key={key}
                    />)
                }
            </div>
        </div>
    )
}

export default GetRestaurantMenu;