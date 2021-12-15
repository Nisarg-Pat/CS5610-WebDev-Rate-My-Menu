import React, {useEffect, useState} from "react";
import GetRestaurantMenu from "../RestaurantComponent/GetRestaurantMenu";
import {
    getRatingsOfRestaurant,
    getRestaurantRatingsByUser
} from "../../services/userRestaurantRatingService";
import RatingBox from "../RatingComponent/RatingBox";
import UserRatingList from "../RatingComponent/UserRatingList";
import FoodItem from "../FoodIemComponent/FoodItem";
import {getFoodLikesByUser} from "../../services/userFoodLikesService";
import {Link, useNavigate} from "react-router-dom";
import {
    addRestaurantLike, findRestaurantLike,
    getRestaurantLikesByUser
} from "../../services/userRestaurantLikesService";
import UserItem from "../RestaurantComponent/UserItem";
import {findProfileById} from "../../services/userService";
import {getFoodRatingsByUser} from "../../services/userFoodRatingService";

const GetDetailsOfDifferentProfile = ({user, profile}) => {
    const navigate = useNavigate();

    let [foodRatings, setFoodRatings] = useState([]);
    let [restaurantRatings, setRestaurantRatings] = useState([]);
    const [foodLikes, setFoodLikes] = useState([]);
    const [restaurantLikes, setRestaurantLikes] = useState([]);
    let [liked, setLiked] = useState(false);
    let [active, setActive] = useState("foodItem");
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

    useEffect(() => {
        if (profile.role === "restaurant") {
            getRatingsOfRestaurant(profile).then((ratings) => setRestaurantRatings(ratings));
        } else if (profile.role === "customer") {
            getFoodRatingsByUser(profile).then((ratings) => setFoodRatings(ratings));
            getRestaurantRatingsByUser(profile).then((ratings) => setRestaurantRatings(ratings));
            getFoodLikesByUser(profile).then((likes) => setFoodLikes(likes));
            getRestaurantLikesByUser(profile).then((likes) => setRestaurantLikes(likes));
        } else if (profile.role === "waiter") {
            getFoodRatingsByUser(profile).then((ratings) => setFoodRatings(ratings));
            getRestaurantRatingsByUser(profile).then((ratings) => setRestaurantRatings(ratings));
            getFoodLikesByUser(profile).then((likes) => setFoodLikes(likes));
            getRestaurantLikesByUser(profile).then((likes) => setRestaurantLikes(likes));
            findProfileById(profile.waiterRestaurantId).then((restaurant) => setWorkingAt(restaurant));
        }
        if ((user.role === "customer" || user.role === "waiter") && profile.role === "restaurant") {
            findRestaurantLike({user, restaurant: profile}).then((response) => {
                if (response.status === 200) {
                    setLiked(true);
                }
            })
        }
    }, [user, profile])

    const likeClickHandler = () => {
        if (user._id === undefined) {
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
                    <div className={`${user.role === "restaurant" || user.role === undefined ? "col-12":"col-12 col-lg-8"}`}>
                        <h2>
                            Menu:
                        </h2>
                        <GetRestaurantMenu restaurant={profile}/>
                        <h2>
                            Ratings by users:
                        </h2>
                        <UserRatingList ratings={restaurantRatings} showUsername={true}/>
                    </div>
                    <div className={"col-12 col-lg-4 al-margin-top-small"}>
                        {user.role === "customer" || user.role === "waiter" ?
                         <div className={"al-margin-bottom-small"}>
                             <RatingBox user={user} restaurant={profile} ratings={restaurantRatings}
                                        setRatings={setRestaurantRatings}/>
                         </div> :
                         <></>
                        }
                    </div>
                </div>
            )
        } else if (profile.role === "customer" || profile.role === "waiter") {
            return (
                <div className={"row"}>
                    <div className={"col-12 col-lg-6"}>
                        <h2>
                            Liked Food:
                        </h2>
                        <div>
                            {foodLikes.map((like, key) => <FoodItem foodItem={like.foodItem} key={key}/>)}
                        </div>
                    </div>
                    <div className={"col-12 col-lg-6 al-border-left"}>
                        <h2>
                            Liked Restaurants:
                        </h2>
                        {restaurantLikes.map(
                            (like, key) => <UserItem restaurant={like.restaurant} key={key}/>)}
                    </div>
                    <div>
                        <div className={"al-border-bottom al-border-top"}>
                            <ul className="nav nav-tabs al-nav al-font-big">
                                <li className={`nav-item al-padding-small al-margin-small al-pointer ${active
                                                                                                       === "foodItem"
                                                                                                       ? "al-navbar-active"
                                                                                                       : ""}`}
                                    onClick={() => setActive("foodItem")}>
                                    Food Ratings
                                </li>
                                <li className={`nav-item al-padding-small al-margin-small al-pointer ${active
                                                                                                       === "restaurant"
                                                                                                       ? "al-navbar-active"
                                                                                                       : ""}`}
                                    onClick={() => setActive("restaurant")}>
                                    Restaurant Ratings
                                </li>
                            </ul>
                        </div>

                        <div className={"al-padding-top-small"}>
                            {active === "foodItem" ? <UserRatingList ratings={foodRatings}
                                                                     showFoodTitle={true}/> : <></>}
                            {active === "restaurant" ? <UserRatingList ratings={restaurantRatings}
                                                                       showRestaurantName={user.role
                                                                                           !== "restaurant"}
                                                                       showUsername={user.role
                                                                                     === "restaurant"}/>
                                                     : <></>}
                        </div>
                    </div>
                </div>
            )
        }
        return <></>
    }

    return (
        <>
            <div
                className={"row al-margin-bottom-small al-padding-top-small al-padding-bottom-small al-border-bottom"}>
                <div className={"col-9"}>
                    <h1>
                        Profile details of {profile.name}
                    </h1>
                </div>
                <div className={"col-3 al-flex al-h-right al-v-center"}>
                    {(user.role === "customer" || user.role === "waiter") && profile.role === "restaurant" && !liked ? <button
                        className={"btn btn-primary al-button"}
                        onClick={likeClickHandler}>Like this
                        Restaurant</button> : <></>}
                </div>
            </div>
            <div className={"al-border-bottom al-padding-bottom-small"}>
                {profile.description === "" || profile.description === undefined ? <h3>Edit profile
                                                                               to enter description</h3>
                                                                           :
                 <h3>{profile.description}</h3>}
                {profile.date !== undefined ?
                 <>
                     {profile.role === "restaurant" ? <>Open Since: </> : <>Birth
                         Date: </>} {getDateString(profile.date.substring(0, 10))}
                 </> : <></>}
                {profile.role === "waiter" ?
                 <div>
                     Working at: <Link to={`/profile/${workingAt._id}`} className = {"al-color-white al-no-underline"}>{workingAt.name}</Link>
                 </div> : <></>}
            </div>
            {getRoleSpecificDiv()}
        </>
    )
}

export default GetDetailsOfDifferentProfile;