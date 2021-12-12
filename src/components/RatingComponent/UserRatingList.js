import React from "react";
import UserRatingItem from "./UserRatingItem";

const UserRatingList = ({
                            ratings,
                            showUsername = false,
                            showRestaurantName = false,
                            showFoodTitle = false
                        }) => {
    return (
        <div className={"al-ratingList"}>
            {ratings.map((rating) => {
                return (
                    <UserRatingItem rating={rating}
                                    showUsername={showUsername}
                                    showRestaurantName={showRestaurantName}
                                    showFoodTitle={showFoodTitle}/>
                )
            })}
        </div>
    )
}

export default UserRatingList;