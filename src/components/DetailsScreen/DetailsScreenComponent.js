import React, {useEffect, useState} from "react";
import {useNavigate, useParams} from "react-router-dom";
import {getFoodItemFromId} from "../../services/foodItemService";
import {addMenuItemToRestaurant} from "../../services/menuService";
import GetRestaurantsFromItem from "../RestaurantComponent/GetRestaurantsFromItem";
import {getRatingsOfFoodItem} from "../../services/userFoodRatingService";
import RatingBox from "../RatingComponent/RatingBox";
import UserRatingList from "../RatingComponent/UserRatingList";
import {addFoodLike} from "../../services/userFoodLikesService";

const DetailsScreenComponent = ({user}) => {
    const navigate = useNavigate();
    const params = useParams();

    let [itemDetails, setItemDetails] = useState({});
    let [foodRatings, setFoodRatings] = useState([]);
    let [price, setPrice] = useState(0.0);
    let [invalidPriceString, setInvalidPriceString] = useState("");

    useEffect(() => {
        getFoodItemFromId(params.id).then((result) => {
            setItemDetails(result)
            getRatingsOfFoodItem(itemDetails).then((ratings) => setFoodRatings(ratings));
        });
    }, [params.id, itemDetails]);

    const getAverageOfRatings = () => {
        const ratings = foodRatings.map((rating) => rating.rating);
        let totalRatings = 0;
        for (let i = 0; i < ratings.length; i++) {
            totalRatings += ratings[i];
        }
        return (totalRatings / ratings.length).toFixed(2);
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
                <div>
                    <input type={"number"}
                           step={0.01}
                           value={price}
                           onChange={(e) => {
                               setPrice(e.target.value)
                           }}/>
                    <button className={"btn btn-primary"} onClick={() => {
                        if (price <= 0 || price > 100) {
                            setInvalidPriceString("Enter the amount between 0 and 100 dollars.");
                        } else {
                            setInvalidPriceString("");
                            addMenuItemToRestaurant(user, itemDetails, price)
                                .then(navigate("/profile"));
                        }
                    }}>Add FoodItem to Menu
                    </button>
                    <br/>
                    {invalidPriceString}
                </div>
            )
        } else if (user.role === "customer") {
            return (
                <>
                    <RatingBox user={user} item={itemDetails} ratings={foodRatings}
                               setRatings={setFoodRatings}/>
                </>
            )
        } else if (user._id === undefined) {

        }
        return (
            <div>
                {user.role}
            </div>
        )
    }

    return (
        <div className={"row"}>
            <div className={"col-8 al-allside-border"}>
                <div
                    className={"row al-margin-bottom-small al-padding-top-small al-padding-bottom-small al-border-bottom"}>
                    <div className={"col-9"}>
                        <h1 className={""}>
                            {itemDetails.title} {getAverageOfRatings()}/5
                        </h1>
                    </div>
                    <div className={"col-3 al-flex al-h-right al-v-center"}>
                        {user.role === "customer" ? <button className={"btn btn-primary al-button"}
                                                            onClick={likeClickHandler}>Like this
                            Food
                        </button> : <></>}
                    </div>
                </div>

                <img src={itemDetails.image} alt={itemDetails.title}
                     className={"al-details-image al-border-bottom al-padding-bottom-small"}/>
                <div dangerouslySetInnerHTML={{__html: itemDetails.summary}}
                     className={"al-border-bottom"}/>
                <h2>
                    Restaurants Serving this item:
                </h2>
                <GetRestaurantsFromItem item={itemDetails}/>
                <h2>
                    Ratings by Users:
                </h2>
                <UserRatingList ratings={foodRatings} showUsername={true}/>
            </div>
            <div className={"col-4"}>
                {getRoleSpecificDiv(user)}
            </div>
        </div>
    )
}

export default DetailsScreenComponent