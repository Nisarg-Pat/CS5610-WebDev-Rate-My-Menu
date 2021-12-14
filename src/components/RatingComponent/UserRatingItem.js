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
            {showUsername ?
             <div className={"al-flex"}>
                 <Link to={`/profile/${rating.user._id}`}>
                     <img src={rating.user.image}
                          alt={rating.user.username}
                          className={"al-foodItem-img "}/>
                 </Link>
                 <span className={"al-padding-left-small"}>
                     <Link to={`/profile/${rating.user._id}`}
                           className={`al-no-underline al-color-white`}>
                         {rating.user.username}
                     </Link> - Rating: {rating.rating} / 5
                 <br/>
                     {rating.comment}
                 </span>
             </div> : <></>}
            {showFoodTitle ?
             <div className={"al-flex"}>
                 <Link to={`/details/${rating.foodItem.id}`}>
                     <img src={rating.foodItem.image}
                          alt={rating.foodItem.title}
                          className={"al-foodItem-img "}/>
                 </Link>
                 <span className={"al-padding-left-small"}>
                     <Link to={`/details/${rating.foodItem.id}`}
                         className={`al-no-underline al-color-white`}>
                         {rating.foodItem.title}
                     </Link> - Rating: {rating.rating} / 5
                 <br/>
                     {rating.comment}
                 </span>
             </div> : <></>}
            {showRestaurantName ?
             <div className={"al-flex"}>
                 <Link to={`/profile/${rating.restaurant._id}`}>
                     <img src={rating.restaurant.image}
                          alt={rating.restaurant.username}
                          className={"al-foodItem-img "}/>
                 </Link>
                 <span className={"al-padding-left-small"}>
                     <Link to={`/profile/${rating.restaurant._id}`}
                           className={`al-no-underline al-color-white`}>
                         {rating.restaurant.username}
                     </Link> - Rating: {rating.rating} / 5
                 <br/>
                     {rating.comment}
                 </span>
             </div> : <></>}
        </div>
    )
}

export default UserRatingItem;