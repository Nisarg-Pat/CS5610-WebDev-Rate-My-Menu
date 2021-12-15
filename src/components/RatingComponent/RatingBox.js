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
                rating: stars,
                time: new Date()
            }
            addRestaurantRating(restaurantRating).then(() => {
                setRatings([restaurantRating, ...ratings]);
                setComment("");
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
                setComment("");
            })
        }

    }

    return (
        <>
            <div className={"al-rating-box al-padding-small"}>
                <label className={"al-full"}>
                    <br/>
                    <textarea onChange={(e) => {
                        setComment(e.target.value)
                    }}
                              className={"al-comment-text"}
                    value={comment}
                    placeholder={"Enter comment"}
                    title={"Comment"}/>
                </label>
                <hr/>
                <label>
                    Stars
                    <select className={"al-margin-top-small al-stars"}
                            onChange={e => {
                                setStars(parseInt(e.target.value));
                            }}
                    value={stars}>
                        <option value="5">5</option>
                        <option value="4">4</option>
                        <option value="3">3</option>
                        <option value="2">2</option>
                        <option value="1">1</option>
                    </select>
                </label>
                <hr/>
                <div className={"al-full al-flex al-h-center"}>
                    <button className={"btn btn-primary al-button al-margin-top-small"}
                            onClick={commentClickHandler}> Comment
                    </button>
                </div>

            </div>
        </>
    )
}

export default RatingBox;