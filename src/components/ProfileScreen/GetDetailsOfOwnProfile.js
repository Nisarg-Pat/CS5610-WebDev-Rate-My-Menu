import React, {useEffect, useState} from "react";
import GetRestaurantMenu from "../RestaurantComponent/GetRestaurantMenu";
import {deleteFoodLike, getFoodLikesByUser} from "../../services/userFoodLikesService";
import FoodItem from "../FoodIemComponent/FoodItem";
import {getRatingsOfRestaurant} from "../../services/userRestaurantRatingService";
import {
    deleteRestaurantLike,
    getRestaurantLikesByUser
} from "../../services/userRestaurantLikesService";
import UserRatingList from "../RatingComponent/UserRatingList";
import RatingBox from "../RatingComponent/RatingBox";
import RestaurantItem from "../RestaurantComponent/RestaurantItem";
import {useNavigate} from "react-router-dom";

const GetDetailsOfOwnProfile = ({user}) => {
    const navigate = useNavigate();

    let [restaurantRatings, setRestaurantRatings] = useState([]);
    const [foodLikes, setFoodLikes] = useState([]);
    const [restaurantLikes, setRestaurantLikes] = useState([]);

    const deleteItemClickHandler = (item) => {
        if (user.role === "customer") {
            const like = {
                user,
                foodItem: item
            }
            deleteFoodLike(like)
                .then(() => setFoodLikes(foodLikes.filter((like) => like.foodItem !== item)));
        }
    }

    const deleteRestaurantClickHandler = (restaurant) => {
        if (user.role === "customer") {
            const like = {
                user,
                restaurant,
            }
            deleteRestaurantLike(like).then(() => setRestaurantLikes(
                restaurantLikes.filter((like) => like.restaurant !== restaurant)));
        }
    }

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
                        <div className={"al-border-bottom"}>
                            <h2>
                                Menu:
                            </h2>
                            <GetRestaurantMenu restaurant={user} showDelete={true}
                                               deleteClickHandler={deleteItemClickHandler}/>
                        </div>
                        <h2>
                            Ratings by users:
                        </h2>
                        <UserRatingList ratings={restaurantRatings} showUsername={true}/>
                </div>
            )
        } else if (user.role === "customer") {
            return (
                <div className={"row"}>
                    <div className={"al-border-bottom"}>
                        {user.description === "" || user.description === undefined ? <>Edit profile
                                                                                       to enter description</>
                                                                                   : <>{user.description}</>}
                        <br/>
                        Birth Date: {user.date.substring(0, 10)}
                    </div>
                    <h2>
                        Liked Food:
                    </h2>
                    <div>
                        {foodLikes.map((like) => <FoodItem foodItem={like.foodItem} role={user.role}
                                                           deleteClickHandler={deleteItemClickHandler}/>)}
                    </div>
                    <h2>
                        Liked Restaurants:
                    </h2>
                    {restaurantLikes.map(
                        (like) => <RestaurantItem restaurant={like.restaurant} role={user.role}
                                                  deleteClickHandler={deleteRestaurantClickHandler}/>)}
                </div>
            )
        }
        return <></>
    }

    return (
        <>
            <div className={"row al-border-bottom al-padding-bottom-small al-padding-top-small"}>
                <div className={"col-10"}>
                    <h1 className={"al-v-center"}>
                        {user.name}
                    </h1>
                </div>
                <div className={"col-2 al-flex"}>
                    <button className={"al-v-center al-full btn btn-primary al-button"}
                            onClick={() => {
                                navigate("/edit_profile")
                            }}>Edit
                        Profile
                    </button>
                </div>
            </div>
            {getRoleSpecificDiv()}
        </>
    )
}

export default GetDetailsOfOwnProfile