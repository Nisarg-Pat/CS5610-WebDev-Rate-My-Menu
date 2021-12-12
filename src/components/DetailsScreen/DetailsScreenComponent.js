import React, {useEffect, useState} from "react";
import {useNavigate, useParams} from "react-router-dom";
import {getFoodItemFromId} from "../../services/foodItemService";
import {addMenuItemToRestaurant} from "../../services/menuService";
import GetRestaurantsFromItem from "../RestaurantComponent/GetRestaurantsFromItem";
import {getRatingsOfFoodItem} from "../../services/userFoodRatingService";
import RatingBox from "../RatingComponent/RatingBox";
import UserRatingList from "../RatingComponent/UserRatingList";

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

    const getRoleSpecificDiv = (user) => {
        if (user.role === "Restaurant") {
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
                            addMenuItemToRestaurant(user, itemDetails, price).then(navigate("/profile"));
                        }
                    }}>Add FoodItem to Menu
                    </button>
                    <br/>
                    {invalidPriceString}
                </div>
            )
        } else if (user.role === "Customer") {
            return (
                <>
                    <RatingBox user={user} item={itemDetails} ratings={foodRatings}
                               setRatings={setFoodRatings}/>
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
        return (totalRatings / ratings.length).toFixed(2);
    }

    return (
        <div className={"row"}>
            <div className={"col-8"}>
                <h1>
                    {itemDetails.title} {getAverageOfRatings()}/5
                </h1>
                <div dangerouslySetInnerHTML={{__html: itemDetails.summary}}/>
                <br/>
                <img src={itemDetails.image} alt={itemDetails.title}/>
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