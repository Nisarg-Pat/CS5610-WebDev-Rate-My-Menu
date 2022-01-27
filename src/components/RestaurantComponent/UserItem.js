import React from "react";
import {Link} from "react-router-dom";

const UserItem = ({restaurant, price, role, deleteClickHandler}) => {
    return (
        <div className={"al-restaurantListItem al-padding-small al-margin-bottom-small"}>
            <div className={"al-flex"}>
                <Link to={`/profile/${restaurant._id}`} className={"col-10 al-no-underline"}>
                        <img src={restaurant.image}
                             alt={restaurant.username}
                             className={"al-foodItem-img "}/>
                        <span className={"al-font-large al-padding-left-medium al-color-white"}>
                        {restaurant.username} {price !== undefined ? <>: ${price}</> : <></>}
                    </span>
                </Link>
                <div className={"col-2 al-flex al-v-center al-h-right"}>
                    {role === "customer" || role === "waiter"?
                     <button className={"btn btn-primary al-button"} onClick={() => deleteClickHandler(restaurant)}>
                         Unlike
                     </button> :
                     <></>}
                </div>
            </div>
        </div>
    )
}

export default UserItem