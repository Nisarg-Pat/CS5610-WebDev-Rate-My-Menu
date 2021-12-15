import React from "react";
import UserRatingItem from "./UserRatingItem";

const UserRatingList = ({
                            ratings,
                            showUsername = false,
                            showRestaurantName = false,
                            showFoodTitle = false,
                            showTitleUserName = false
                        }) => {
    return (
        <div className={"al-ratingList"}>
            {ratings.map((rating, key) => {
                return (
                    <UserRatingItem rating={rating}
                                    showUsername={showUsername}
                                    showRestaurantName={showRestaurantName}
                                    showFoodTitle={showFoodTitle}
                                    showTitleUserName={showTitleUserName}
                    key={key}/>
                )
            })}
        </div>
    )
}

export default UserRatingList;