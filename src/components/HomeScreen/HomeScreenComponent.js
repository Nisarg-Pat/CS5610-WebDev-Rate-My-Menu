import React, {useEffect, useState} from "react";
import {useNavigate} from "react-router-dom";
import {getFoodRatingsByUser,} from "../../services/userFoodRatingService";
import UserRatingList from "../RatingComponent/UserRatingList";
import {getRestaurantRatingsByUser} from "../../services/userRestaurantRatingService";
import LoginSignupComponent from "../LoginSignupComponent";

const HomeScreenComponent = ({user}) => {

    const navigate = useNavigate();

    let [foodRatings, setFoodRatings] = useState([]);
    let [restaurantRatings, setRestaurantRatings] = useState([]);
    let [active, setActive] = useState("foodItem");

    useEffect(() => {
        if (user._id !== undefined) {
            getFoodRatingsByUser(user).then((ratings) => setFoodRatings(ratings));
            getRestaurantRatingsByUser(user).then((ratings) => setRestaurantRatings(ratings));
        }
    }, [user]);

    const getNoUserHome = () => {
        return (
            <div className={"row"}>
                <div className={"col-10 al-allside-border"}>
                </div>
                <div className={"col-2"}>
                    <LoginSignupComponent/>
                </div>
            </div>
        )
    }

    const getUserHome = () => {
        return (
            <div className={"row al-allside-border"}>
                <div className={"al-border-bottom"}>
                    <h1 className={"col-11"}>
                        {user.name}
                    </h1>
                </div>
                {user.role === 'customer' ?
                 <div>
                     <ul className="nav nav-tabs wd-nav al-border-bottom al-font-big">
                         <li className={`nav-item al-padding-small ${active === "foodItem" ? "al-navbar-active" : ""}`}
                             onClick={() => setActive("foodItem")}>
                             Food Ratings
                         </li>
                         <li className={`nav-item al-padding-small ${active === "restaurant" ? "al-navbar-active" : ""}`}
                             onClick={() => setActive("restaurant")}>
                             Restaurant Ratings
                         </li>
                     </ul>
                     <div className={"al-padding-top-small"}>
                         {active === "foodItem" ? <UserRatingList ratings={foodRatings}
                                                                  showFoodTitle={true}/> : <></>}
                         {active === "restaurant" ? <UserRatingList ratings={restaurantRatings}
                                                                    showRestaurantName={true}/>
                                                  : <></>}
                     </div>

                 </div> :
                 <></>
                }
            </div>
        )
    }

    return (
        <div className={"al-margin-right-small"}>
            {
                user._id !== undefined ? getUserHome() : getNoUserHome()
            }
        </div>
    )
}

export default HomeScreenComponent;