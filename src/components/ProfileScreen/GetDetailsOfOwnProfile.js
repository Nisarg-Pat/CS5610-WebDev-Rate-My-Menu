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
import UserItem from "../RestaurantComponent/UserItem";
import {Link, useNavigate} from "react-router-dom";
import {findProfileById} from "../../services/userService";

const GetDetailsOfOwnProfile = ({user}) => {
    const navigate = useNavigate();

    let [restaurantRatings, setRestaurantRatings] = useState([]);
    const [foodLikes, setFoodLikes] = useState([]);
    const [restaurantLikes, setRestaurantLikes] = useState([]);
    const [workingAt, setWorkingAt] = useState([]);

    const getDateString = (date) => {
        const monthNames = ["January", "February", "March", "April", "May", "June",
                            "July", "August", "September", "October", "November", "December"];
        const dateObj = new Date(date);
        const month = monthNames[dateObj.getMonth()];
        const day = String(dateObj.getDate() + 1);
        const year = dateObj.getFullYear();
        return month + '\n' + day + ',' + year;
    }

    const deleteItemClickHandler = (item) => {
        if (user.role === "customer" || user.role === "waiter") {
            const like = {
                user,
                foodItem: item
            }
            deleteFoodLike(like)
                .then(() => setFoodLikes(foodLikes.filter((like) => like.foodItem !== item)));
        }
    }

    const deleteRestaurantClickHandler = (restaurant) => {
        if (user.role === "customer" || user.role === "waiter") {
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
        } else if (user.role === "waiter") {
            getFoodLikesByUser(user).then((likes) => setFoodLikes(likes));
            getRestaurantLikesByUser(user).then((likes) => setRestaurantLikes(likes));
            findProfileById(user.waiterRestaurantId).then((restaurant) => setWorkingAt(restaurant));
        }
    }, [user])

    const getRoleSpecificDiv = () => {
        if (user.role === "restaurant") {
            return (
                <div className={"row"}>
                    <div className={"col-12 al-border-bottom"}>
                        <h2>
                            Menu:
                        </h2>
                        <GetRestaurantMenu restaurant={user} showDelete={true}
                                           deleteClickHandler={deleteItemClickHandler}/>
                    </div>
                    <div>
                        <h2>
                            Ratings by users:
                        </h2>
                        <UserRatingList ratings={restaurantRatings} showUsername={true}/>
                    </div>
                </div>
            )
        } else if (user.role === "customer") {
            return (
                <div className={"row al-padding-top-small al-padding-bottom-small"}>
                    <div className={"col-12 col-lg-6"}>
                        <h2>
                            Liked Food:
                        </h2>
                        <div>
                            {foodLikes.map(
                                (like, key) => <FoodItem foodItem={like.foodItem} role={user.role}
                                                    deleteClickHandler={deleteItemClickHandler} key={key}/>)}
                        </div>
                    </div>
                    <div className={"col-12 col-lg-6 al-border-left"}>
                        <h2>
                            Liked Restaurants:
                        </h2>
                        {restaurantLikes.map(
                            (like, key) => <UserItem restaurant={like.restaurant} role={user.role}
                                                deleteClickHandler={deleteRestaurantClickHandler} key={key}/>)}
                    </div>

                </div>
            )
        } else if (user.role === "waiter") {
            return (
                <div className={"row"}>
                    <div className={"col-12 al-border-bottom"}>
                        <h2>
                            Menu of {workingAt.name}:
                        </h2>
                        <GetRestaurantMenu restaurant={workingAt}
                                           deleteClickHandler={deleteItemClickHandler}/>
                    </div>
                    <div className={"col-12 col-lg-6"}>
                        <h2>
                            Liked Food:
                        </h2>
                        <div>
                            {foodLikes.map(
                                (like) => <FoodItem foodItem={like.foodItem} role={user.role}
                                                    deleteClickHandler={deleteItemClickHandler}/>)}
                        </div>
                    </div>
                    <div className={"col 12 col-lg-6 al-border-left"}>
                        <h2>
                            Liked Restaurants:
                        </h2>
                        {restaurantLikes.map(
                            (like) => <UserItem restaurant={like.restaurant} role={user.role}
                                                deleteClickHandler={deleteRestaurantClickHandler}/>)}
                    </div>
                </div>
            )
        }
        return <></>
    }

    return (
        <>
            <div className={"row al-border-bottom al-padding-bottom-small al-padding-top-small"}>
                <div className={"col-8 col-md-9 col-lg-10"}>
                    <h1 className={"al-v-center"}>
                        {user.name}
                    </h1>
                </div>
                <div className={"col-4 col-md-3 col-lg-2 al-flex"}>
                    <button className={"al-v-center al-full btn btn-primary al-button"}
                            onClick={() => {
                                navigate("/edit_profile")
                            }}>Edit Profile
                    </button>
                </div>
            </div>
            <div className={"al-border-bottom al-padding-bottom-small"}>
                {user.description === "" || user.description === undefined ? <h3>Edit profile
                                                                               to enter description</h3>
                                                                           :
                 <h3>{user.description}</h3>}
                {user.date !== undefined ?
                 <>
                     {user.role === "restaurant" ? <>Open Since: </> : <>Birth
                         Date: </>} {getDateString(user.date.substring(0, 10))}
                 </> : <></>}
                <div>
                    Email: {user.email}
                </div>
                {user.role === "restaurant" ?
                 <div className={"al-padding-bottom-small"}>
                     <i className="fas fa-map-marker-alt"/> {user.address}
                     <br/>
                     ID for Employees: {user._id}
                 </div> : <></>}
                {user.role === "waiter" ?
                 <div className={"al-padding-bottom-small"}>
                     Working at: <Link to={`/profile/${workingAt._id}`} className = {"al-color-white al-no-underline"}>{workingAt.name}</Link>
                 </div> : <></>}
            </div>
            {getRoleSpecificDiv()}
        </>
    )
}

export default GetDetailsOfOwnProfile