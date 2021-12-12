import React, {useEffect, useState} from "react";
import GetRestaurantMenu from "../RestaurantComponent/GetRestaurantMenu";
import {getFoodLikesByUser} from "../../services/userFoodLikesService";
import FoodItem from "../FoodIemComponent/FoodItem";
import {getRatingsOfRestaurant} from "../../services/userRestaurantRatingService";
import {getRestaurantLikesByUser} from "../../services/userRestaurantLikesService";
import UserRatingList from "../RatingComponent/UserRatingList";
import RatingBox from "../RatingComponent/RatingBox";
import RestaurantItem from "../RestaurantComponent/RestaurantItem";

const GetDetailsOfOwnProfile = ({user}) => {

    let [restaurantRatings, setRestaurantRatings] = useState([]);
    const [foodLikes, setFoodLikes] = useState([]);
    const [restaurantLikes, setRestaurantLikes] = useState([]);

    useEffect(() => {
        if (user.role === "restaurant") {
            getRatingsOfRestaurant(user).then((ratings) => setRestaurantRatings(ratings));
        } else if (user.role === "customer") {
            getFoodLikesByUser(user).then((likes) => setFoodLikes(likes));
            getRestaurantLikesByUser(user).then((likes) => setRestaurantLikes(likes));
        }
    }, [user])

    const getRoleSpecificDiv = () => {
        if (user.role === "restaurant") {
            return (
                <div className={"row"}>
                    <div className={"col-8"}>
                        <h2>
                            Menu:
                        </h2>
                        <GetRestaurantMenu restaurant={user}/>
                        <h2>
                            Ratings by users:
                        </h2>
                        <UserRatingList ratings={restaurantRatings} showUsername={true}/>
                    </div>
                </div>
            )
        } else if (user.role === "customer") {
            return (
                <div className={"row"}>
                    <>
                        <h2>
                            Liked Food:
                        </h2>
                        {foodLikes.map((like) => <FoodItem foodItem={like.foodItem}/>)}
                        <h2>
                            Liked Restaurants:
                        </h2>
                        {restaurantLikes.map(
                            (like) => <RestaurantItem restaurant={like.restaurant}/>)}
                    </>
                </div>
            )
        }
        return <></>
    }

    return (
        <>
            <h1>
                {user.name}
            </h1>
            {getRoleSpecificDiv()}
        </>
    )
}

export default GetDetailsOfOwnProfile