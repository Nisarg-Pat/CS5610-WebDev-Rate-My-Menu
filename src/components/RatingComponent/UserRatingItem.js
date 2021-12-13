import React from "react";
import {Link} from "react-router-dom";

const UserRatingItem = ({
                            rating,
                            showUsername = false,
                            showFoodTitle = false,
                            showRestaurantName = false
                        }) => {
    return (
        <div className={"al-ratingListItem al-margin-bottom-small al-padding-small"}>
            {showUsername ? <Link to={`/profile/${rating.user._id}`} className={``}>{rating.user.username}</Link> : <></>}
            {showFoodTitle ? <Link to={`/details/${rating.foodItem.id}`}>{rating.foodItem.title}</Link> : <></>}
            {showRestaurantName ? <Link to={`/profile/${rating.restaurant._id}`}>{rating.restaurant.username}</Link> : <></>}
            - Rating: {rating.rating} / 5
            <br/>
            {rating.comment}
            <br/>
        </div>
    )
}

export default UserRatingItem;