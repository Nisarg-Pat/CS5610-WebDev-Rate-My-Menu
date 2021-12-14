import React, {useEffect, useState} from "react";
import GetRestaurantMenu from "../RestaurantComponent/GetRestaurantMenu";
import {getRatingsOfRestaurant} from "../../services/userRestaurantRatingService";
import RatingBox from "../RatingComponent/RatingBox";
import UserRatingList from "../RatingComponent/UserRatingList";
import FoodItem from "../FoodIemComponent/FoodItem";
import {addFoodLike, getFoodLikesByUser} from "../../services/userFoodLikesService";
import {Link, useNavigate} from "react-router-dom";
import {
    addRestaurantLike, findRestaurantLike,
    getRestaurantLikesByUser
} from "../../services/userRestaurantLikesService";
import UserItem from "../RestaurantComponent/UserItem";
import {findProfileById} from "../../services/userService";

const GetDetailsOfDifferentProfile = ({user, profile}) => {
    const navigate = useNavigate();

    let [restaurantRatings, setRestaurantRatings] = useState([]);
    const [foodLikes, setFoodLikes] = useState([]);
    const [restaurantLikes, setRestaurantLikes] = useState([]);
    let [liked, setLiked] = useState(false);
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
            getFoodLikesByUser(profile).then((likes) => setFoodLikes(likes));
            getRestaurantLikesByUser(profile).then((likes) => setRestaurantLikes(likes));
        } else if (profile.role === "waiter") {
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
                            {foodLikes.map((like) => <FoodItem foodItem={like.foodItem}/>)}
                        </div>
                    </div>
                    <div className={"col-12 col-lg-6 al-border-left"}>
                        <h2>
                            Liked Restaurants:
                        </h2>
                        {restaurantLikes.map(
                            (like) => <UserItem restaurant={like.restaurant}/>)}
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