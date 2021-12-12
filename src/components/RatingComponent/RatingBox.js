import React, {useState} from "react";
import {addRestaurantRating} from "../../services/userRestaurantRatingService";
import {useNavigate} from "react-router-dom";
import {addFoodRating} from "../../services/userFoodRatingService";

const RatingBox = ({user, restaurant, item, ratings, setRatings}) => {
    const navigate = useNavigate;

    let [comment, setComment] = useState("");
    let [stars, setStars] = useState(5);

    const commentClickHandler = () => {
        if (user._id === undefined) {
            navigate("/login");
        }
        if (restaurant) {
            const restaurantRating = {
                user,
                restaurant: restaurant,
                comment,
                rating: 4.5,
                time: new Date()
            }
            addRestaurantRating(restaurantRating).then(() => {
                setRatings([restaurantRating, ...ratings]);
            })
        } else {
            const foodRating = {
                user,
                foodItem: item,
                comment,
                rating: stars,
                time: new Date()
            }
            addFoodRating(foodRating).then(() => {
                setRatings([foodRating, ...ratings]);
            })
        }

    }

    return (
        <>
            <div>
                <label>
                    Comment:
                    <br/>
                    <textarea onChange={(e) => {
                        setComment(e.target.value)
                    }}/>
                </label>
                <hr/>
                <label>
                    Stars:
                    <select onChange={e => {
                        setStars(parseInt(e.target.value));
                    }}>
                        <option value="5" selected>5</option>
                        <option value="4">4</option>
                        <option value="3">3</option>
                        <option value="2">2</option>
                        <option value="1">1</option>
                    </select>
                </label>
                <hr/>
                <button className={"btn btn-primary"}
                        onClick={commentClickHandler}> Comment
                </button>
            </div>
        </>
    )
}

export default RatingBox;