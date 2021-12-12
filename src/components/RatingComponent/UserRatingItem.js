import React from "react";
import {Link} from "react-router-dom";

const UserRatingItem = ({
                            rating,
                            showUsername = false,
                            showFoodTitle = false,
                            showRestaurantName = false
                        }) => {
    return (
        <div className={"al-ratingListItem"}>
            {showUsername ? <Link to={`/profile/${rating.user._id}`}>{rating.user.username}</Link> : <></>}
            {showFoodTitle ? <Link to={`/details/${rating.foodItem.id}`}>{rating.foodItem.title}</Link> : <></>}
            {showRestaurantName ? <Link to={`/profile/${rating.restaurant._id}`}>{rating.restaurant.username}</Link> : <></>}
            <br/>
            {rating.comment}
            <br/>
            {rating.rating}
        </div>
    )
}

export default UserRatingItem;