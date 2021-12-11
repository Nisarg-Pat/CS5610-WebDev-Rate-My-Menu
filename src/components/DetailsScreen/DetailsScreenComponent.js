import React, {useEffect, useState} from "react";
import {useNavigate, useParams} from "react-router-dom";
import {getFoodItemFromId} from "../../services/foodItemService";
import {addMenuItemToRestaurant} from "../../services/menuService";
import GetRestaurantsFromItem from "../RestaurantComponent/GetRestaurantsFromItem";
import {addFoodRating, getRatingsOfFoodItem} from "../../services/userFoodRatingService";

const DetailsScreenComponent = ({user}) => {
    const navigate = useNavigate();
    const params = useParams();

    let [itemDetails, setItemDetails] = useState({});
    let [comment, setComment] = useState("");
    let [foodRatings, setFoodRatings] = useState([]);

    useEffect(() => {
        getFoodItemFromId(params.id).then((result) => {
            setItemDetails(result)
            getRatingsOfFoodItem(itemDetails).then((ratings) => setFoodRatings(ratings));
        });
    }, [params.id, itemDetails]);

    const commentClickHandler = () => {
        if (user._id === undefined) {
            navigate("/login");
        }
        addFoodRating(user, itemDetails, comment, 4.5).then(() => {
        })
    }

    const getRoleSpecificDiv = (user) => {
        if (user.role === "Restaurant") {
            return (
                <div>
                    <button className={"btn btn-primary"} onClick={() => {
                        addMenuItemToRestaurant(user, itemDetails).then(navigate("/profile"));
                    }}>Add FoodItem to Menu
                    </button>
                </div>
            )
        } else if (user.role === "Customer") {
            return (
                <>
                    <div>
                        <GetRestaurantsFromItem item={itemDetails}/>
                    </div>
                    <div>
                        <label>
                            <textarea onChange={(e) => {
                                setComment(e.target.value)
                            }}/>
                        </label>
                        <button className={"btn btn-primary"}
                                onClick={commentClickHandler}>Comment
                        </button>
                    </div>
                </>
            )
        }
        return (
            <div>
                {user.role}
            </div>
        )
    }

    const getAverageOfRatings = () => {
        const ratings = foodRatings.map((rating) => rating.rating);
        let totalRatings = 0;
        for (let i = 0; i < ratings.length; i++) {
            totalRatings += ratings[i];
        }
        return totalRatings / ratings.length;
    }

    return (
        <div>
            <h1>
                {itemDetails.title} {getAverageOfRatings()}
            </h1>
            <div dangerouslySetInnerHTML={{__html: itemDetails.summary}}/>
            <br/>
            <img src={itemDetails.image} alt={itemDetails.title}/>
            {user.username}
            {getRoleSpecificDiv(user)}
            <ul>
                {foodRatings.map((rating) => {
                    return (
                        <li>
                            {rating.comment}
                        </li>
                    )
                })}
            </ul>
        </div>
    )
}

export default DetailsScreenComponent