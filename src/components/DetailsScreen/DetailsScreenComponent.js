import React, {useEffect, useState} from "react";
import {useNavigate, useParams} from "react-router-dom";
import {getFoodItemFromId} from "../../services/foodItemService";
import {findRestaurantsFromItem} from "../../services/menuService";
import GetRestaurantsFromItem from "../RestaurantComponent/GetRestaurantsFromItem";
import {getRatingsOfFoodItem} from "../../services/userFoodRatingService";
import RatingBox from "../RatingComponent/RatingBox";
import UserRatingList from "../RatingComponent/UserRatingList";
import {addFoodLike, findFoodLike} from "../../services/userFoodLikesService";
import AddFoodItemBox from "../RestaurantComponent/AddFoodItemBox";
import LoginSignupComponent from "../LoginSignupComponent";

const DetailsScreenComponent = ({user}) => {
    const navigate = useNavigate();
    const params = useParams();

    let [itemDetails, setItemDetails] = useState({});
    let [foodRatings, setFoodRatings] = useState([]);
    let [restaurants, setRestaurants] = useState([]);

    let [liked, setLiked] = useState(false);

    useEffect(() => {
        getFoodItemFromId(params.id).then((result) => {
            setItemDetails(result)
        });
    }, [params.id]);

    useEffect(() => {
        getRatingsOfFoodItem(itemDetails).then((ratings) => setFoodRatings(ratings));
        if(user.role === "customer" || user.role === "waiter") {
            findFoodLike({user, foodItem: itemDetails}).then((response) => {
                if (response.status === 200) {
                    setLiked(true);
                }
            })
        }
        findRestaurantsFromItem(itemDetails).then((restaurants) => setRestaurants(restaurants));
    }, [user, itemDetails])

    const getAverageOfRatings = () => {
        const ratings = foodRatings.map((rating) => rating.rating);
        let totalRatings = 0;
        for (let i = 0; i < ratings.length; i++) {
            totalRatings += ratings[i];
        }
        if(ratings.length > 0) {
            return (totalRatings / ratings.length).toFixed(2);
        } else {
            return "__"
        }

    }

    const likeClickHandler = () => {
        if (user._id === undefined) {
            navigate("/login");
        }
        const like = {
            user,
            foodItem: itemDetails,
            time: new Date()
        }
        addFoodLike(like).then(navigate("/profile"));
    }

    const getRoleSpecificDiv = (user) => {
        if (user.role === "restaurant") {
            return (
                <div className={"al-margin-bottom-small"}>
                    <AddFoodItemBox restaurant={user} itemDetails={itemDetails}/>
                </div>
            )
        } else if (user.role === "customer" || user.role === "waiter") {
            return (
                <>
                    <RatingBox user={user} item={itemDetails} ratings={foodRatings}
                               setRatings={setFoodRatings}/>
                </>
            )
        } else if (user._id === undefined) {
            return (
                <LoginSignupComponent/>
            )
        }
    }

    return (
        <div className={"row"}>
            <div className={"col-12 col-lg-8 al-allside-border al-margin-bottom-small"}>
                <div
                    className={"row al-margin-bottom-small al-padding-top-small al-padding-bottom-small al-border-bottom"}>
                    <div className={"col-9"}>
                        <h1 className={""}>
                            {itemDetails.title} {getAverageOfRatings()}/5
                        </h1>
                    </div>
                    <div className={"col-3 al-flex al-h-right al-v-center"}>
                        {(user.role === "customer" || user.role === "waiter") && !liked ? <button
                            className={"btn btn-primary al-button"}
                            onClick={likeClickHandler}> Like this food
                        </button> : <></>}
                    </div>
                </div>

                <img src={itemDetails.image} alt={itemDetails.title}
                     className={"al-details-image al-border-bottom al-padding-bottom-small"}/>
                <div dangerouslySetInnerHTML={{__html: itemDetails.summary}}
                     className={"al-border-bottom"}/>
                <div className={"al-border-bottom"}>
                    <h2>
                        Restaurants Serving this item: ({restaurants.length})
                    </h2>
                    <GetRestaurantsFromItem restaurants={restaurants}/>
                </div>
                <h2>
                    Ratings by Users: ({foodRatings.length})
                </h2>
                <UserRatingList ratings={foodRatings} showUsername={true}/>
            </div>
            <div className={"col-12 col-lg-4"}>
                {getRoleSpecificDiv(user)}
            </div>
        </div>
    )
}

export default DetailsScreenComponent