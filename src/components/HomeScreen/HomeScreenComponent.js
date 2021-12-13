import React, {useEffect, useState} from "react";
import {useNavigate} from "react-router-dom";
import {getFoodRatingsByUser,} from "../../services/userFoodRatingService";
import UserRatingList from "../RatingComponent/UserRatingList";
import {getRestaurantRatingsByUser} from "../../services/userRestaurantRatingService";

const HomeScreenComponent = ({user}) => {

    const navigate = useNavigate();

    let [foodRatings, setFoodRatings] = useState([]);
    let [restaurantRatings, setRestaurantRatings] = useState([]);

    useEffect(() => {
        if(user._id !== undefined) {
            getFoodRatingsByUser(user).then((ratings) => setFoodRatings(ratings));
            getRestaurantRatingsByUser(user).then((ratings) => setRestaurantRatings(ratings));
        }
    }, [user]);

    const loginClickHandler = () => {
        navigate("/login");
    }

    const signupClickHandler = () => {
        navigate("/signup");
    }

    const getNoUserHome = () => {
        return (
            <div className={"row"}>
                <div className={"col-10"}>
                </div>
                <div className={"col-2 al-height-full"}>
                    <button className={"btn btn-primary al-full al-button"} onClick={loginClickHandler}>Login</button>

                    <button className={"btn btn-primary al-full al-button al-margin-top-large"} onClick={signupClickHandler}>Sign-Up</button>
                </div>
            </div>
        )
    }

    const getUserHome = () => {
        return (
            <>
                <div className={"al-border-bottom"}>
                    <h1 className={"col-11"}>
                        {user.name}
                    </h1>
                </div>

                {user.role === 'customer' ?
                 <div>
                     <h1>Latest Food Ratings By You: </h1>
                     <UserRatingList ratings={foodRatings} showFoodTitle={true}/>
                     <h1>Latest Restaurant Ratings By You: </h1>
                     <UserRatingList ratings={restaurantRatings} showRestaurantName={true}/>
                 </div> :
                 <></>
                }
            </>
        )
    }

    return (
        <div>
            {
                user._id !== undefined ? getUserHome() : getNoUserHome()
            }
        </div>
    )
}

export default HomeScreenComponent;