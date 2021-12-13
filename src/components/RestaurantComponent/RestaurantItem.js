import React from "react";
import {Link} from "react-router-dom";

const RestaurantItem = ({restaurant, price, role, deleteClickHandler}) => {
    return (
        <div className={"al-restaurantListItem"}>
            <Link to={`/profile/${restaurant._id}`}>
                {restaurant.name}
            </Link>
            {price !== undefined ? <>: ${price}</> : <></>}
            {role === "customer" ?
             <button className={"btn btn-danger"} onClick={() => deleteClickHandler(restaurant)}>
                 Unlike
             </button> :
             <></>}
        </div>
    )
}

export default RestaurantItem