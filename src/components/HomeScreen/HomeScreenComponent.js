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
            <>
                <button className={"btn btn-primary"} onClick={loginClickHandler}>Login</button>
                <hr/>
                <button className={"btn btn-primary"} onClick={signupClickHandler}>Sign-Up</button>
                <hr/>
            </>
        )
    }

    const getUserHome = () => {
        return (
            <>
                <h1>
                    Hello {user.username}
                </h1>
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