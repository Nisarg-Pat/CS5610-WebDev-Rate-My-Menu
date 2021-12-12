import React, {useEffect, useState} from "react";
import GetRestaurantMenu from "../RestaurantComponent/GetRestaurantMenu";
import {getRatingsOfRestaurant} from "../../services/userRestaurantRatingService";
import RatingBox from "../RatingComponent/RatingBox";
import UserRatingList from "../RatingComponent/UserRatingList";
import FoodItem from "../FoodIemComponent/FoodItem";
import {addFoodLike, getFoodLikesByUser} from "../../services/userFoodLikesService";
import {useNavigate} from "react-router-dom";
import {
    addRestaurantLike,
    getRestaurantLikesByUser
} from "../../services/userRestaurantLikesService";
import RestaurantItem from "../RestaurantComponent/RestaurantItem";

const GetDetailsOfDifferentProfile = ({user, profile}) => {
    const navigate = useNavigate();

    let [restaurantRatings, setRestaurantRatings] = useState([]);
    const [foodLikes, setFoodLikes] = useState([]);
    const [restaurantLikes, setRestaurantLikes] = useState([]);

    useEffect(() => {
        if (profile.role === "restaurant") {
            getRatingsOfRestaurant(profile).then((ratings) => setRestaurantRatings(ratings));
        } else if (profile.role === "customer") {
            getFoodLikesByUser(profile).then((likes) => setFoodLikes(likes));
            getRestaurantLikesByUser(profile).then((likes) => setRestaurantLikes(likes));
        }
    }, [profile])

    const likeClickHandler = () => {
        if(user._id === undefined) {
            navigate("/login");
        }
        const like = {
            user,
            restaurant: profile,
            time: new Date()
        }
        addRestaurantLike(like).then(navigate("/profile"));
    }

    const getRoleSpecificDiv = () => {
        if (profile.role === "restaurant") {
            return (
                <div className={"row"}>
                    <div className={"col-8"}>
                        <button className={"btn btn-primary"} onClick={likeClickHandler}>Like this Restaurant</button>
                        <h2>
                            Menu:
                        </h2>
                        <GetRestaurantMenu restaurant={profile}/>
                        <h2>
                            Ratings by users:
                        </h2>
                        <UserRatingList ratings={restaurantRatings} showUsername={true}/>
                    </div>
                    <div className={"col-4"}>
                        {user.role === "customer" ?
                         <>
                             <RatingBox user={user} restaurant={profile} ratings={restaurantRatings}
                                        setRatings={setRestaurantRatings}/>
                         </> :
                         <></>
                        }
                    </div>
                </div>
            )
        } else if(profile.role === "customer") {
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
                Profile details of {profile.name}
            </h1>
            {getRoleSpecificDiv()}
        </>
    )
}

export default GetDetailsOfDifferentProfile;